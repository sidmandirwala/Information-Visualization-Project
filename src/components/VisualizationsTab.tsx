"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ObservableNotebook } from "./ObservableNotebook";

interface Visualization {
    id: string;
    number: string;
    question: string;
    cellName: string;
    analysis: {
        whatWeFound: string;
        whyItWorks: string;
        whatItMeans: string;
    };
}

const visualizations: Visualization[] = [
    {
        id: "q1",
        number: "Q1",
        question: "How have overall crime patterns changed over time in NYC?",
        cellName: "chart_q1",
        analysis: {
            whatWeFound: "Looking at this line chart, three distinct phases jump out: Pre-COVID Stability (2015-2019) where crime hovered between 35K-43K incidents per month; The COVID Crash (Early 2020) where crime dropped 36% almost overnight; and Post-COVID Surge (2021-2024) where crime exceeded pre-pandemic levels, consistently seeing 48K-50K incidents per month.",
            whyItWorks: "We chose a line chart with temporal filtering because line charts are optimal for continuous temporal data—they let you trace trends and spot inflection points like the COVID dip immediately. The connected points emphasize time's continuity.",
            whatItMeans: "Current crime levels are at a 10-year high and have been sustained for 3 years. We're in a new equilibrium, not experiencing a temporary deviation. COVID may have reset what 'normal' crime levels look like in NYC."
        }
    },
    {
        id: "q2",
        number: "Q2",
        question: "Where are crime hotspots located across NYC's five boroughs?",
        cellName: "chart_q2",
        analysis: {
            whatWeFound: "Brooklyn leads by a significant margin—200K+ more crimes than Manhattan over the decade. Rankings are consistent: Brooklyn (1.4M), Manhattan (1.18M), Bronx (1.05M), Queens (1.02M), Staten Island (210K).",
            whyItWorks: "We chose a bar chart with sequential color encoding because bar charts are optimal for comparing quantities across categories. The sequential blue color scheme reinforces the magnitude ordering.",
            whatItMeans: "The consistency of these rankings across time periods suggests structural factors (population, density, economic conditions) drive spatial patterns more than temporary shocks. Even COVID didn't fundamentally reshape the geographic distribution."
        }
    },
    {
        id: "q3",
        number: "Q3",
        question: "What types of crimes are most prevalent, and how do they vary by location?",
        cellName: "chart_q3",
        analysis: {
            whatWeFound: "Manhattan's Petit Larceny dominance is striking—nearly double Brooklyn's despite lower total crime. Each borough shows a distinct profile: Manhattan is property crime heavy, while Bronx is assault-heavy.",
            whyItWorks: "We chose grouped bar charts because they're optimal for comparing multiple categories (crime types) across multiple groups (boroughs) simultaneously.",
            whatItMeans: "Different boroughs need different interventions. Manhattan needs retail/commercial security, while Brooklyn and Bronx need more focus on assault prevention and community conflict resolution."
        }
    },
    {
        id: "q4",
        number: "Q4",
        question: "How do different crime types exhibit distinct temporal patterns?",
        cellName: "chart_q4",
        analysis: {
            whatWeFound: "Crime follows a clear diurnal rhythm: lowest at 5-6am, rising to an afternoon peak at 5pm. The noon spike suggests crimes of opportunity during lunch hours.",
            whyItWorks: "We chose an area chart to emphasize the cumulative 'volume' of crime throughout the day. The 24-hour x-axis balances detail with readability.",
            whatItMeans: "Resources should flex throughout the day. 5-6am minimum suggests reduced patrols are reasonable, but afternoon/evening demand 4x higher coverage."
        }
    },
    {
        id: "q5",
        number: "Q5",
        question: "How do crime patterns evolve across both space and time?",
        cellName: "chart_q5",
        analysis: {
            whatWeFound: "The V-shaped COVID disruption is universal but uneven. Manhattan's drop was most dramatic (16%), while Staten Island remained remarkably flat. Post-COVID, Brooklyn surged 28% and Manhattan 36%.",
            whyItWorks: "We chose a multi-line chart to show multiple time series simultaneously. Each borough gets its own color-coded line, making it easy to track individual trajectories.",
            whatItMeans: "Manhattan's volatility suggests its crime is highly sensitive to external economic shocks. Brooklyn's sustained surge is particularly concerning as it's 17% above its pre-COVID baseline."
        }
    },
    {
        id: "q6",
        number: "Q6",
        question: "Where do different types of crimes typically occur?",
        cellName: "chart_q6",
        analysis: {
            whatWeFound: "Street dominates as the primary crime location. Petit Larceny shows diverse distribution (Chain Store, Subway, Grocery). Assault concentrates in Street and Residence.",
            whyItWorks: "We chose a Sankey diagram because it's optimal for visualizing flow relationships between categorical dimensions. Flow width encodes quantity.",
            whatItMeans: "Petit larceny's spread suggests it's opportunistic, requiring environmental design strategies. Residential assault concentration suggests social service interventions may be more effective."
        }
    },
    {
        id: "q7",
        number: "Q7",
        question: "How do crime rates vary across NYC's police precincts?",
        cellName: "chart_q7",
        analysis: {
            whatWeFound: "Crime hotspots are geographically concentrated and stable. Central Bronx and Central Brooklyn precincts consistently rank highest. Staten Island remains distinctly low-crime.",
            whyItWorks: "We chose a choropleth map because it's optimal for visualizing geographic distributions. The sequential color scheme intuitively maps to crime intensity.",
            whatItMeans: "The persistence of hotspots suggests chronic structural issues requiring sustained intervention. Geographic inequality is stark across NYC."
        }
    },
    {
        id: "q8",
        number: "Q8",
        question: "What insights emerge when filtering by multiple dimensions simultaneously?",
        cellName: "chart_q8",
        analysis: {
            whatWeFound: "The dashboard enables hypothesis testing. Time period filtering reveals pandemic impact. Borough + Crime filtering exposes unique signatures like Brooklyn's Petit Larceny afternoon peaks.",
            whyItWorks: "We chose an interactive dashboard with linked filters because static views can't capture multi-dimensional complexity. The area chart remains consistent across filters.",
            whatItMeans: "This dashboard transforms crime data from passive reporting to active exploration, enabling precise resource allocation and personalized safety planning."
        }
    }
];

export function VisualizationsTab() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedViz = visualizations.find((v) => v.id === selectedId);
    const selectedIndex = visualizations.findIndex((v) => v.id === selectedId);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedId]);



    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-[95vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {visualizations.map((viz, index) => (
                    <motion.div
                        key={viz.id}
                        layoutId={`card-${viz.id}`}
                        onClick={() => setSelectedId(viz.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="glass-card rounded-3xl p-8 cursor-pointer group hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/30 transition-all duration-300 aspect-[4/3] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <span className="bg-accent/20 text-accent px-3 py-1.5 rounded-lg text-sm font-bold">
                                {viz.number}
                            </span>
                            {/* <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                <svg className="w-5 h-5 text-text/70 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </div> */}
                        </div>
                        <h3 className="font-heading font-bold text-2xl leading-tight line-clamp-4 group-hover:text-accent transition-colors text-left">
                            {viz.question}
                        </h3>

                        <div className="text-sm text-text/50 uppercase tracking-wider group-hover:text-text/80 transition-colors font-medium">

                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {selectedId && selectedViz && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-background/90 backdrop-blur-md z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 35,
                                    mass: 0.8
                                }}
                                className="pointer-events-auto w-full h-full md:w-[90vw] md:h-[90vh] bg-surface/95 backdrop-blur-2xl border border-white/10 md:rounded-3xl overflow-hidden flex flex-col shadow-2xl relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedId(null);
                                    }}
                                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center transition-all z-50"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Content Container */}
                                <motion.div
                                    className="flex-1 overflow-y-auto p-8 md:p-12"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="max-w-7xl mx-auto">
                                        <span className="text-accent font-bold mb-2 block text-xl">{selectedViz.number}</span>
                                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-10">{selectedViz.question}</h2>

                                        {/* Observable Visualization Container */}
                                        <div className="w-full min-h-[600px] bg-white rounded-2xl overflow-hidden mb-16 border border-white/5 p-6 flex justify-center items-center text-black shadow-xl">
                                            <ObservableNotebook cellName={selectedViz.cellName} />
                                        </div>

                                        {/* Analysis Sections */}
                                        <div className="grid md:grid-cols-3 gap-12">
                                            <div className="glass p-8 rounded-2xl">
                                                <h3 className="text-xl font-heading font-bold mb-4 text-accent">What We Found</h3>
                                                <p className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whatWeFound}</p>
                                            </div>
                                            <div className="glass p-8 rounded-2xl">
                                                <h3 className="text-xl font-heading font-bold mb-4 text-accent">Why It Works</h3>
                                                <p className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whyItWorks}</p>
                                            </div>
                                            <div className="glass p-8 rounded-2xl">
                                                <h3 className="text-xl font-heading font-bold mb-4 text-accent">What It Means</h3>
                                                <p className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whatItMeans}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}