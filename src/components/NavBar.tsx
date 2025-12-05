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
        <div className="backdrop-blur-md bg-rgb(17, 23, 41)/10 fixed py-5 left-1/2 -translate-x-1/2 z-50 w-full  flex justify-center px-2 sm:px-4">
            <nav className="glass-nav rounded-full p-1 sm:p-2 flex items-center gap-1 sm:gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={twMerge(
                            "relative px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap",
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