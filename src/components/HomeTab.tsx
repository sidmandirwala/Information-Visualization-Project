"use client";

import React from "react";
import { motion } from "framer-motion";

const homeContent = {
    title: "NYC Crime Patterns: A Spatio-Temporal Analysis of Public Safety",
    problemStatement: `New York City, as one of the most populous and dynamic urban centers in the world, faces complex challenges related to public safety. Crime rates fluctuate based on a multitude of factors including location, time of day, season, and socio-economic conditions. Understanding these patterns is crucial not just for law enforcement, but for policymakers, community leaders, and residents who strive to make the city safer. However, raw crime data is often overwhelming and difficult to interpret without proper visualization and context.`,
    motivation: `The motivation behind this project stems from a desire to democratize access to public safety data. We believe that by transforming abstract numbers into interactive, spatio-temporal visualizations, we can uncover hidden trends that might otherwise go unnoticed. Whether it's identifying hotspots for specific types of crimes or understanding how safety profiles shift between day and night, this analysis aims to empower stakeholders with actionable insights. Our goal is to move beyond simple statistics and provide a narrative-driven exploration of NYC's crime landscape.`,
    dataDescription: (
        <>
            <p className="mb-6">
                This analysis utilizes the NYPD Complaint Data Historic dataset (2015-2024), comprising over 7 million records of reported felonies, misdemeanors, and violations.
            </p>

            <div className="space-y-6">
                <div>
                    <strong className="text-accent block mb-2 text-lg">Attributes Used</strong>
                    <p>We analyze temporal fields (date, time), spatial attributes (latitude, longitude, precinct), and categorical variables (offense description, premises type).</p>
                </div>

                <div>
                    <strong className="text-accent block mb-2 text-lg">Preprocessing</strong>
                    <p>Data cleaning involved removing records with missing coordinates (~5%), standardizing offense descriptions, and filtering for the 10-year period to focus on recent trends.</p>
                </div>

                <div>
                    <strong className="text-accent block mb-2 text-lg">Data Quality & Ethics</strong>
                    <p>While the dataset is comprehensive, it represents <em>reported</em> crimes only. We acknowledge that reporting rates vary by community and crime type. Our analysis focuses on spatio-temporal patterns rather than victim/suspect demographics to avoid stigmatization.</p>
                </div>
            </div>
        </>
    )
};

const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="max-w-4xl mx-auto py-20 px-6"
    >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-text border-b-2 border-accent/50 inline-block pb-2">
            {title}
        </h2>
        <div className="text-lg md:text-xl text-text/80 leading-relaxed space-y-6">
            {children}
        </div>
    </motion.section>
);

export function HomeTab() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-8 max-w-5xl"
                >
                    {homeContent.title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text/50"
                >
                    <span className="text-sm uppercase tracking-widest">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-6 h-10 border-2 border-text/30 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-text/50 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Content Sections */}
            <Section title="Problem Statement">
                <p>{homeContent.problemStatement}</p>
            </Section>

            <Section title="Motivation">
                <p>{homeContent.motivation}</p>
            </Section>

            <Section title="Data Description">
                {homeContent.dataDescription}
            </Section>

            <Section title="Links">
                <a href="https://observablehq.com/d/053b56acfb9cc2db" target="_blank" rel="noopener noreferrer">
                    <button className="bg-accent text-text px-6 py-2 mr-5 rounded-full hover:bg-accent/80 transition-colors duration-200">
                        Open Observable Notebook
                    </button>
                </a>
                <a href="https://github.com/sidmandirwala/Information-Visualization-Project" target="_blank" rel="noopener noreferrer">
                    <button className="bg-accent text-text px-6 py-2 rounded-full hover:bg-accent/80 transition-colors duration-200">
                        Open GitHub Repository
                    </button>
                </a>
            </Section>
        </div>
    );
}
