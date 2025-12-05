"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { HomeTab } from "@/components/HomeTab";
import { VisualizationsTab } from "@/components/VisualizationsTab";
import { ConclusionTab } from "@/components/ConclusionTab";
import { TeamTab } from "@/components/TeamTab";

type Tab = "home" | "visualizations" | "conclusion" | "team";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <main className="min-h-screen bg-background text-text selection:bg-accent selection:text-white overflow-x-hidden">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "home" && <HomeTab />}
          {activeTab === "visualizations" && <VisualizationsTab />}
          {activeTab === "conclusion" && <ConclusionTab />}
          {activeTab === "team" && <TeamTab />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
