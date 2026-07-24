import { HumanMessage, AIMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";
import { StateGraph, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ALL_TOOLS, getAggregatedTools } from "../tools/autonomous-tools";
import { getOpenAIKey } from "@/lib/secrets";
import { RunnableConfig } from "@langchain/core/runnables";

// --- State Definition ---
export type AgentState = {
    messages: BaseMessage[];
    sender?: string;
    targetAgent?: string;
    userId?: string;
};

// --- Model Initialization ---
const getModel = async () => {
    const apiKey = await getOpenAIKey();
    const tools = await getAggregatedTools();

    const primaryModel = new ChatOpenAI({
        modelName: "gpt-5.6-terra",
        temperature: 0.9,
        apiKey: apiKey,
        streaming: true,
    }).bindTools(tools);

    const fallbackModel = new ChatOpenAI({
        modelName: "gpt-5.4-mini",
        temperature: 0.9,
        apiKey: apiKey,
        streaming: true,
    }).bindTools(tools);

    return primaryModel.withFallbacks({ fallbacks: [fallbackModel] });
};

// --- Nodes ---

// 1. Supervisor Node: Coordinates complex workflows and A2A delegation
const supervisorNode = async (state: AgentState, config?: RunnableConfig) => {
    const messages = state.messages;
    const lastUserMsg = messages[messages.length - 1]?.content || "";

    // Supervisor inspection for A2A orchestration
    console.log(`[Supervisor] Inspecting workflow turn: "${typeof lastUserMsg === 'string' ? lastUserMsg.slice(0, 50) : 'message'}"`);
    return { sender: "supervisor" };
};

// 2. Agent Node: Calls the LLM with tool capabilities
const agentNode = async (state: AgentState, config?: RunnableConfig) => {
    const model = await getModel();
    const { messages } = state;
    const response = await model.invoke(messages, config);
    return { messages: [response], sender: "agent" };
};

// 3. Tool Node: Executes tools (Tavily, Nodemailer, Handoff, Consult, MCP)
const toolNode = async (state: AgentState) => {
    const tools = await getAggregatedTools();
    const toolExecutor = new ToolNode(tools);
    return toolExecutor.invoke(state);
};

// --- Conditional Edge ---
const shouldContinue = (state: AgentState) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;

    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
        return "tools";
    }
    return END;
};

// --- Graph Definition ---
const workflow = new StateGraph<AgentState>({
    channels: {
        messages: {
            reducer: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
        },
        sender: null,
        targetAgent: null,
        userId: null,
    }
})
    .addNode("supervisor", supervisorNode)
    .addNode("agent", agentNode)
    .addNode("tools", toolNode)
    .addEdge("__start__", "supervisor")
    .addEdge("supervisor", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");

// Compile the graph
export const appGraph = workflow.compile();

