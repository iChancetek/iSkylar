import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
import type { Conversation, ConversationMessage } from './types';

const CONVERSATIONS_COLLECTION = 'conversations';

export async function createConversation(userId: string, agentId: string): Promise<string> {
  const collectionRef = collection(db, CONVERSATIONS_COLLECTION);
  const convRef = doc(collectionRef);
  
  const conversation: Conversation = {
    userId,
    agentId,
    messages: [],
    startTime: Timestamp.now(),
  };
  
  await setDoc(convRef, conversation);
  return convRef.id;
}

export async function appendMessage(
  conversationId: string, 
  speaker: 'user' | 'system' | 'agent', 
  text: string, 
  agentId: string,
  userId: string
): Promise<void> {
  const convRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  
  const message: ConversationMessage = {
    id: `${speaker}-${Date.now()}`,
    speaker,
    agentId,
    text,
    timestamp: Timestamp.now(),
  };
  
  // Use setDoc with merge: true so it creates the document if it doesn't exist (e.g., on first message)
  await setDoc(convRef, {
    userId,
    agentId,
    messages: arrayUnion(message)
  }, { merge: true });
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
  const convRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  const snapshot = await getDoc(convRef);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as Conversation;
}

export async function getRecentConversations(userId: string, agentId?: string, limitCount = 5): Promise<Conversation[]> {
  const collectionRef = collection(db, CONVERSATIONS_COLLECTION);
  let q;
  
  if (agentId) {
    q = query(
      collectionRef, 
      where('userId', '==', userId),
      where('agentId', '==', agentId),
      orderBy('startTime', 'desc'),
      limit(limitCount)
    );
  } else {
    q = query(
      collectionRef, 
      where('userId', '==', userId),
      orderBy('startTime', 'desc'),
      limit(limitCount)
    );
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Conversation));
}

export async function endConversation(conversationId: string): Promise<void> {
  const convRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);
  
  const snapshot = await getDoc(convRef);
  if (!snapshot.exists()) return;
  
  const data = snapshot.data() as Conversation;
  const duration = Math.floor((Date.now() - data.startTime.toMillis()) / 1000);
  
  await updateDoc(convRef, {
    endTime: Timestamp.now(),
    duration
  });
}
