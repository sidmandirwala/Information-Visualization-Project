"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Tab = "home" | "visualizations" | "conclusion" | "team";

interface NavBarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "visualizations", label: "Visualizations" },
    { id: "conclusion", label: "Conclusion" },
    { id: "team", label: "Team" },
];

export function NavBar({ activeTab, setActiveTab }: NavBarProps) {
    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px] flex justify-center px-4">
            <nav className="glass-nav rounded-full p-2 flex items-center gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={twMerge(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                            activeTab === tab.id ? "text-text" : "text-text/70 hover:text-text hover:bg-white/5"
                        )}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-accent/20 border border-accent/40 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
