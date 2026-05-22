"use client";

import * as React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Download, BookOpen, Clock, Settings, LogOut, Library } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Mock purchased books
const PURCHASED_BOOKS = [
  {
    id: "1",
    title: "The Art of Simplicity",
    author: "Elena Rossi",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop",
    purchasedAt: "May 18, 2026",
    format: "EPUB, PDF",
  },
  {
    id: "3",
    title: "Design Systems",
    author: "Sarah Drasner",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    purchasedAt: "May 15, 2026",
    format: "EPUB, PDF",
  },
  {
    id: "5",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    purchasedAt: "May 10, 2026",
    format: "EPUB",
  },
];

const TABS = [
  { id: "library", label: "My Library", icon: Library },
  { id: "orders", label: "Order History", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = React.useState("library");

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-highlight rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold font-jost text-primary">
                {session?.user?.name || "Reader"}
              </h1>
              <p className="text-gray-500 mt-1">{session?.user?.email}</p>
              <p className="text-sm text-highlight mt-2 flex items-center justify-center sm:justify-start gap-1">
                <BookOpen className="w-4 h-4" />
                {PURCHASED_BOOKS.length} books in your library
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full gap-2 text-gray-500"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-500 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "library" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PURCHASED_BOOKS.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex p-6 gap-5">
                  <div className="relative w-24 h-36 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                    <Image src={book.cover} alt={book.title} fill className="object-cover" />
                    <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-lg text-primary line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                      <span className="inline-block text-xs bg-highlight/10 text-highlight px-2 py-1 rounded-full font-medium">
                        {book.format}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Purchased: {book.purchasedAt}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex gap-3">
                  <Button size="sm" className="flex-1 rounded-full gap-2">
                    <Download className="w-4 h-4" />
                    EPUB
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-full gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left p-4 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Book</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                  <th className="text-right p-4 font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {PURCHASED_BOOKS.map((book, i) => (
                  <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-gray-500 font-mono text-xs">#ORD-{1000 + i}</td>
                    <td className="p-4 font-medium text-primary">{book.title}</td>
                    <td className="p-4 text-gray-500">{book.purchasedAt}</td>
                    <td className="p-4 text-right font-bold">${(14.99 + i * 5).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl"
          >
            <h2 className="text-xl font-bold font-jost mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
                <input
                  type="text"
                  defaultValue={session?.user?.name || ""}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-highlight focus:ring-1 focus:ring-highlight outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
                />
              </div>
              <Button className="rounded-full">Save Changes</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
