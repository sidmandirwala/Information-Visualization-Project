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

                {/* Collaborative Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass p-8 md:p-12 rounded-3xl"
                >
                    <h2 className="text-2xl font-heading font-bold mb-10 text-center border-b border-white/10 pb-4">
                        Our Collaborative Process
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">Strategic Ideation</h3>
                            <p className="text-text/70 text-sm leading-relaxed">
                                We collectively formulated research questions and designed the visualization strategy to ensure a cohesive narrative.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">Unified Development</h3>
                            <p className="text-text/70 text-sm leading-relaxed">
                                Every technical challenge was approached as a team, with constant code reviews and synchronous problem-solving sessions.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">Problem Solving</h3>
                            <p className="text-text/70 text-sm leading-relaxed">
                                We resolved issues together, using AI tools only for deadends. We also used AI for visualizations we were less familiar with.
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
