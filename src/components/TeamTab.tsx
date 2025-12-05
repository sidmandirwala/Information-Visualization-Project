"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamContent = {
    members: [
        {
            name: "Siddh Mandirwala",
            id: "sm12505",
            photo: "/siddh.jpg", // Placeholder, will fallback if not found
            contributions: [
                "Data preprocessing",
                "Visualizations: Q1, Q3, Q5, Q7",
                "Technical infrastructure"
            ]
        },
        {
            name: "Krish Murjani",
            id: "km6520",
            photo: "/krish.jpg", // Placeholder
            contributions: [
                "Question formulation",
                "Visualizations: Q2, Q4, Q6, Q8",
                "Documentation & writing"
            ]
        }
    ]
};

export function TeamTab() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center mb-20"
            >
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">The Team</h1>
                <p className="text-xl text-text/60">Contributors behind this project.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
                {/* Team Members Row */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 mb-20">
                    {teamContent.members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-accent/30 shadow-2xl shadow-accent/10 group-hover:scale-105 group-hover:border-accent/60 group-hover:shadow-accent/30 transition-all duration-500 bg-surface">
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-1">{member.name}</h3>
                            <p className="text-text/50 font-mono text-sm">{member.id}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contributions Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass p-8 md:p-12 rounded-3xl"
                >
                    <h2 className="text-2xl font-heading font-bold mb-8 text-center border-b border-white/10 pb-4">
                        Team Contributions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {teamContent.members.map((member) => (
                            <div key={member.id}>
                                <h3 className="text-lg font-bold mb-4 text-accent">{member.name} - 50%</h3>
                                <ul className="space-y-3">
                                    {member.contributions.map((contribution, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text/80">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                            <span>{contribution}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
