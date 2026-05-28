"use client";

import * as React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Download, BookOpen, Clock, Settings, LogOut, Library } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardContentProps {
 user: {
 name?: string | null;
 email?: string | null;
 };
 library: any[];
 orders: any[];
}

const TABS = [
 { id: "library", label: "My Library", icon: Library },
 { id: "orders", label: "Order History", icon: Clock },
 { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardContent({ user, library, orders }: DashboardContentProps) {
 const [activeTab, setActiveTab] = React.useState("library");

 return (
 <div className="pt-32 pb-20 min-h-screen bg-gray-50/50">
 <div className="container mx-auto px-4 max-w-6xl">
 {/* Profile Header */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
 <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
 <div className="w-20 h-20 bg-gradient-to-br from-primary to-brand-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
 {user?.name?.charAt(0)?.toUpperCase() || "U"}
 </div>
 <div className="text-center sm:text-left flex-1">
 <h1 className="text-3xl font-bold text-primary">
 {user?.name || "Reader"}
 </h1>
 <p className="text-gray-500 mt-1">{user?.email}</p>
 <p className="text-sm text-brand-secondary mt-2 flex items-center justify-center sm:justify-start gap-1">
 <BookOpen className="w-4 h-4" />
 {library.length} books in your library
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
 {library.length > 0 ? (
 library.map((item) => (
 <div
 key={item.id}
 className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
 >
 <div className="flex p-6 gap-5">
 <div className="relative w-24 h-36 rounded-lg overflow-hidden shadow-md flex-shrink-0">
 <Image src={item.book.coverImage} alt={item.book.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
 <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-r from-black/20 to-transparent" />
 </div>
 <div className="flex flex-col justify-between flex-1">
 <div>
 <h3 className="font-bold text-lg text-primary line-clamp-1">{item.book.title}</h3>
 <p className="text-sm text-gray-500 mb-2">{item.book.author}</p>
 <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
 <div 
 className="bg-brand-secondary h-full transition-all duration-500" 
 style={{ width: `${item.progress}%` }}
 />
 </div>
 <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
 {item.progress}% Read
 </span>
 </div>
 <p className="text-xs text-gray-400">
 Last read: {new Date(item.lastRead).toLocaleDateString()}
 </p>
 </div>
 </div>
 <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex flex-col gap-2">
 <Button size="sm" className="w-full rounded-full gap-2">
 <BookOpen className="w-4 h-4" />
 Read Online
 </Button>
 <div className="flex gap-2">
 <Button variant="outline" size="sm" className="flex-1 rounded-full gap-2 text-xs">
 <Download className="w-3 h-3" />
 EPUB
 </Button>
 <Button variant="outline" size="sm" className="flex-1 rounded-full gap-2 text-xs">
 <Download className="w-3 h-3" />
 PDF
 </Button>
 </div>
 </div>
 </div>
 ))
 ) : (
 <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
 <Library className="w-12 h-12 text-gray-300 mx-auto mb-4" />
 <h3 className="text-xl font-bold text-primary mb-2">Your library is empty</h3>
 <p className="text-gray-500 mb-8">Start your reading journey by exploring our catalog.</p>
 <Button asChild className="rounded-full">
 <a href="/catalog">Browse Catalog</a>
 </Button>
 </div>
 )}
 </motion.div>
 )}

 {activeTab === "orders" && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
 >
 {orders.length > 0 ? (
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-gray-100 bg-gray-50/50">
 <th className="text-left p-4 font-semibold text-gray-600">Order ID</th>
 <th className="text-left p-4 font-semibold text-gray-600">Items</th>
 <th className="text-left p-4 font-semibold text-gray-600">Date</th>
 <th className="text-right p-4 font-semibold text-gray-600">Amount</th>
 </tr>
 </thead>
 <tbody>
 {orders.map((order) => (
 <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
 <td className="p-4 text-gray-500 font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</td>
 <td className="p-4 font-medium text-primary">
 {order.items.map((i: any) => i.book.title).join(", ")}
 </td>
 <td className="p-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
 <td className="p-4 text-right font-bold">${order.totalAmount.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 ) : (
 <div className="py-20 text-center">
 <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
 <h3 className="text-xl font-bold text-primary mb-2">No orders yet</h3>
 <p className="text-gray-500">Your order history will appear here once you make a purchase.</p>
 </div>
 )}
 </motion.div>
 )}

 {activeTab === "settings" && (
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl"
 >
 <h2 className="text-xl font-bold mb-6">Account Settings</h2>
 <div className="space-y-6">
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
 <input
 type="text"
 defaultValue={user?.name || ""}
 className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
 <input
 type="email"
 defaultValue={user?.email || ""}
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
