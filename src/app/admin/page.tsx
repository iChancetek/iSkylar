"use client";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  ShieldAlert,
  Users,
  Activity,
  Clock,
  RefreshCw,
  Brain,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  UserCheck,
  MessageSquare,
  LogOut,
  LogIn,
  Calendar,
  Volume2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const ADMIN_EMAIL = "chancellor@ichancetek.com";

interface TrackedUserDoc {
  id: string;
  email: string | null;
  fullName: string | null;
  username: string | null;
  role: string;
  language?: string;
  createdAt?: any;
  createdDateString?: string;
  lastLogin?: any;
  lastSignInTime?: string;
  lastLogout?: any;
  lastSignOutTime?: string;
}

interface TrackedSessionDoc {
  id: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  companionId?: string;
  companionName?: string;
  startTime?: any;
  endTime?: any;
  duration: number; // in seconds
  timestamp: any;
  themes: string[];
  emotionalPatterns: string[];
  insights: string[];
  transcript: { speaker: string; text: string; timestamp?: number }[];
}

function formatFirestoreTimestamp(ts: any, isoString?: string): string {
  if (ts?.seconds) {
    return new Date(ts.seconds * 1000).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  if (isoString) {
    try {
      return new Date(isoString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  }
  return "N/A";
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export default function AdminDashboardPage() {
  const { user, userProfile, loading: authLoading } = useAuthContext();
  const { toast } = useToast();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [usersList, setUsersList] = useState<TrackedUserDoc[]>([]);
  const [sessionsList, setSessionsList] = useState<TrackedSessionDoc[]>([]);

  const currentUserEmail = userProfile?.email || user?.email || "";
  const isAdmin = currentUserEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const fetchRealData = async () => {
    setIsLoadingData(true);
    try {
      // 1. Query Real Users from Firestore
      const usersSnap = await getDocs(collection(db, "users"));
      const fetchedUsers: TrackedUserDoc[] = [];
      usersSnap.forEach((docSnap) => {
        const data = docSnap.data();
        fetchedUsers.push({
          id: docSnap.id,
          email: data.email || null,
          fullName: data.fullName || null,
          username: data.username || null,
          role: data.role || "user",
          language: data.language || "en",
          createdAt: data.createdAt,
          createdDateString: data.createdDateString,
          lastLogin: data.lastLogin,
          lastSignInTime: data.lastSignInTime,
          lastLogout: data.lastLogout,
          lastSignOutTime: data.lastSignOutTime,
        });
      });
      setUsersList(fetchedUsers);

      // 2. Query Real Session Memories from Firestore
      const sessionsSnap = await getDocs(collection(db, "session_memories"));
      const fetchedSessions: TrackedSessionDoc[] = [];
      sessionsSnap.forEach((docSnap) => {
        const data = docSnap.data();

        // Determine active companion from companionName / companionId or transcript analysis
        let compName = data.companionName;
        let compId = data.companionId;
        if (!compName && data.transcript?.length > 0) {
          const firstBot = data.transcript.find((t: any) => t.speaker !== "user");
          if (firstBot?.speaker) {
            compName = firstBot.speaker;
            compId = firstBot.speaker.toLowerCase();
          }
        }

        fetchedSessions.push({
          id: docSnap.id,
          userId: data.userId || "anonymous",
          userEmail: data.userEmail,
          userName: data.userName,
          companionId: compId || "skylar",
          companionName: compName || "Skylar",
          startTime: data.startTime || data.timestamp,
          endTime: data.endTime,
          duration: data.duration || 0,
          timestamp: data.timestamp,
          themes: data.conversationalThemes || [],
          emotionalPatterns: data.emotionalPatterns || [],
          insights: data.keyInsights || [],
          transcript: data.transcript || [],
        });
      });

      // Sort by newest session first
      fetchedSessions.sort((a, b) => {
        const tA = a.timestamp?.seconds || 0;
        const tB = b.timestamp?.seconds || 0;
        return tB - tA;
      });

      setSessionsList(fetchedSessions);
    } catch (error: any) {
      console.error("Failed to sync Firestore tracking metrics:", error);
      toast({
        title: "Firestore Sync Warning",
        description: error?.message || "Error fetching live user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRealData();
    }
  }, [isAdmin]);

  // Aggregate Stats by Companion
  const companionStats: Record<string, { name: string; count: number; totalSeconds: number; color: string; voice: string }> = {
    skylar: { name: "Skylar", count: 0, totalSeconds: 0, color: "#8b5cf6", voice: "Nova" },
    chancellor: { name: "Chancellor", count: 0, totalSeconds: 0, color: "#3b82f6", voice: "Onyx" },
    sydney: { name: "Sydney", count: 0, totalSeconds: 0, color: "#f59e0b", voice: "Shimmer" },
    hailey: { name: "Hailey", count: 0, totalSeconds: 0, color: "#ec4899", voice: "Fable" },
    chris: { name: "Chris", count: 0, totalSeconds: 0, color: "#10b981", voice: "Echo" },
  };

  sessionsList.forEach((s) => {
    const key = (s.companionId || s.companionName || "skylar").toLowerCase();
    if (companionStats[key]) {
      companionStats[key].count += 1;
      companionStats[key].totalSeconds += s.duration || 0;
    } else {
      companionStats.skylar.count += 1;
      companionStats.skylar.totalSeconds += s.duration || 0;
    }
  });

  const companionPieData = Object.values(companionStats).map((item) => ({
    name: `${item.name} (${item.voice})`,
    value: item.count || 1,
    color: item.color,
  }));

  const totalUsersCount = usersList.length;
  const totalSessionsCount = sessionsList.length;
  const totalVoiceSeconds = sessionsList.reduce((acc, s) => acc + (s.duration || 0), 0);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#07060b] text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-purple-400" />
          <span className="text-sm font-medium">Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#07060b] text-white flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-black/60 border border-red-500/30 backdrop-blur-2xl p-8 text-center space-y-6 rounded-3xl shadow-2xl">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The iSkylar Admin Dashboard is restricted exclusively to authorized administrators.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono">
            Attempted Identity: <span className="text-red-400">{currentUserEmail || "Unauthenticated User"}</span>
          </div>
          <Link href="/dashboard" className="block">
            <Button className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Companion Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07060b] text-white selection:bg-purple-500/30 font-sans p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-transparent pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Brain className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                iSkylar User & Session Tracking Console
              </h1>
              <p className="text-xs text-purple-300 font-medium flex items-center gap-1.5 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Real-time tracking of accounts, sign ins/offs, session lengths, and companions
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Admin: {currentUserEmail}
          </div>
          <Button
            onClick={fetchRealData}
            disabled={isLoadingData}
            variant="outline"
            size="sm"
            className="h-9 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoadingData ? "animate-spin" : ""}`} /> Refresh Firestore
          </Button>
          <Link href="/dashboard">
            <Button size="sm" className="h-9 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to App
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tracked Accounts</span>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">{totalUsersCount}</div>
            <p className="text-xs text-purple-300 font-medium mt-1">Created account history logged</p>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tracked Sessions</span>
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">{totalSessionsCount}</div>
            <p className="text-xs text-blue-300 font-medium mt-1">Start & end times tracked</p>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Session Length</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">{formatDuration(totalVoiceSeconds)}</div>
            <p className="text-xs text-amber-300 font-medium mt-1">Active voice interaction time</p>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Companions</span>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white">5</div>
            <p className="text-xs text-emerald-400 font-medium mt-1">Skylar, Chancellor, Sydney, Hailey, Chris</p>
          </div>
        </Card>
      </div>

      {/* Companion Tracking Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" /> Companion Usage & Length Tracking
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(companionStats).map(([key, stat]) => (
            <Card key={key} className="bg-white/5 border-white/10 backdrop-blur-md p-4 rounded-2xl text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-medium">
                  <Volume2 className="w-2.5 h-2.5 inline mr-1" />{stat.voice}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-white">{stat.count} <span className="text-xs font-normal text-zinc-400">sessions</span></div>
              <p className="text-xs text-zinc-300 font-mono">Length: {formatDuration(stat.totalSeconds)}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* TABLE 1: User Accounts, Creation Date/Time & Sign In / Sign Off Tracking */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-3xl p-6 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-400" /> Account Creation & Sign In / Sign Off Log
            </h3>
            <p className="text-xs text-zinc-400">Track who created an account, creation date/time, sign in time, and sign off time</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">
            {usersList.length} User Accounts
          </span>
        </div>

        <div className="overflow-x-auto max-h-[380px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/10 text-zinc-300 uppercase text-[10px] tracking-wider font-bold sticky top-0 backdrop-blur-md">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3"><Calendar className="w-3 h-3 inline mr-1" /> Account Created Date/Time</th>
                <th className="p-3"><LogIn className="w-3 h-3 inline mr-1 text-emerald-400" /> Last Signed In</th>
                <th className="p-3"><LogOut className="w-3 h-3 inline mr-1 text-rose-400" /> Last Signed Off</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {usersList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-zinc-400 italic">
                    No account records found in Firestore.
                  </td>
                </tr>
              ) : (
                usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5">
                    <td className="p-3 font-semibold text-white">{u.fullName || u.username || "Anonymous User"}</td>
                    <td className="p-3 text-purple-300">{u.email || "N/A"}</td>
                    <td className="p-3 text-zinc-300">{formatFirestoreTimestamp(u.createdAt, u.createdDateString)}</td>
                    <td className="p-3 text-emerald-300">{formatFirestoreTimestamp(u.lastLogin, u.lastSignInTime)}</td>
                    <td className="p-3 text-rose-300">{formatFirestoreTimestamp(u.lastLogout, u.lastSignOutTime)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase font-sans font-bold">
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* TABLE 2: Session Start Time, End Time, Length & Companion Tracking */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-md rounded-3xl p-6 text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" /> Session Start Time, End Time, Length & Companion Log
            </h3>
            <p className="text-xs text-zinc-400">Track session user, companion worked with, start date/time, end date/time, and exact duration</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">
            {sessionsList.length} Sessions Logged
          </span>
        </div>

        <div className="overflow-x-auto max-h-[420px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/10 text-zinc-300 uppercase text-[10px] tracking-wider font-bold sticky top-0 backdrop-blur-md">
              <tr>
                <th className="p-3">Session ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Companion / Voice</th>
                <th className="p-3"><LogIn className="w-3 h-3 inline mr-1 text-emerald-400" /> Session Start Date/Time</th>
                <th className="p-3"><LogOut className="w-3 h-3 inline mr-1 text-amber-400" /> Session End Date/Time</th>
                <th className="p-3"><Clock className="w-3 h-3 inline mr-1 text-purple-400" /> Session Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {sessionsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-zinc-400 italic">
                    No session memory logs recorded yet.
                  </td>
                </tr>
              ) : (
                sessionsList.map((s) => {
                  const compName = s.companionName || "Skylar";
                  const compKey = (s.companionId || compName).toLowerCase();
                  const compColor = companionStats[compKey]?.color || "#8b5cf6";
                  const compVoice = companionStats[compKey]?.voice || "Nova";

                  return (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="p-3 font-semibold text-purple-300">{s.id.slice(0, 12)}...</td>
                      <td className="p-3 text-white font-medium">
                        {s.userName || s.userEmail || s.userId.slice(0, 10)}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold px-2 py-0.5 rounded-full text-[11px] bg-white/10 border border-white/10" style={{ color: compColor }}>
                          {compName} ({compVoice})
                        </span>
                      </td>
                      <td className="p-3 text-emerald-300">{formatFirestoreTimestamp(s.startTime || s.timestamp)}</td>
                      <td className="p-3 text-amber-300">{formatFirestoreTimestamp(s.endTime || s.timestamp)}</td>
                      <td className="p-3 font-bold text-purple-300">{formatDuration(s.duration)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer */}
      <div className="pt-4 border-t border-transparent text-center text-xs text-zinc-400">
        iSkylar™ User & Session Tracking Console • Live Firestore Records • ChanceTEK LLC
      </div>
    </div>
  );
}
