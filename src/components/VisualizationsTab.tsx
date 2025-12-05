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
        whatWeFound: React.ReactNode;
        whyItWorks: React.ReactNode;
        whatItMeans: React.ReactNode;
    };
}

const visualizations: Visualization[] = [
    {
        id: "q1",
        number: "Q1",
        question: "How have overall crime patterns changed over time in NYC?",
        cellName: "chart_q1",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Looking at this line chart, three distinct phases jump out:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Pre-COVID Stability (2015-2019):</strong> Crime hovered between 35K-43K incidents per month with predictable seasonal patterns.</li>
                        <li><strong className="text-accent">The COVID Crash (Early 2020):</strong> Crime dropped 36% almost overnight, from 39K to 25K—the lowest point in the decade.</li>
                        <li><strong className="text-accent">Post-COVID Surge (2021-2024):</strong> Crime didn't just recover; it exceeded pre-pandemic levels, consistently seeing 48K-50K incidents per month.</li>
                    </ul>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose a <strong className="text-accent">line chart with temporal filtering</strong> because it is optimal for continuous temporal data.</p>
                    <p>It allows you to trace trends and spot inflection points like the COVID dip immediately. The connected points emphasize time's continuity better than disconnected bars would.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">Current crime levels are at a 10-year high and have been sustained for 3 years (2022-2024).</p>
                    <p>We are in a new equilibrium, not experiencing a temporary deviation. COVID may have reset what "normal" crime levels look like in NYC, with a 15-20% increase over the pre-2020 baseline.</p>
                </>
            )
        }
    },
    {
        id: "q2",
        number: "Q2",
        question: "Where are crime hotspots located across NYC's five boroughs?",
        cellName: "chart_q2",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Brooklyn leads by a significant margin—200K+ more crimes than Manhattan over the decade. The rankings are remarkably consistent:</p>
                    <ol className="list-decimal pl-5 space-y-1 mb-4">
                        <li>Brooklyn (1.4M)</li>
                        <li>Manhattan (1.18M)</li>
                        <li>Bronx (1.05M)</li>
                        <li>Queens (1.02M)</li>
                        <li>Staten Island (210K)</li>
                    </ol>
                    <p>Staten Island remains an anomaly, consistently representing only 4% of citywide crime despite being 10% of the land area.</p>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose a <strong className="text-accent">bar chart with sequential color encoding</strong>.</p>
                    <p>Bar charts are optimal for comparing quantities across categories. The sequential blue color scheme (darker = higher crime) reinforces the magnitude ordering visually.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">The consistency of these rankings across time periods suggests structural factors (population, density, economic conditions) drive spatial patterns more than temporary shocks.</p>
                    <p>Even the massive disruption of COVID didn't fundamentally reshape the geographic distribution—it just scaled everything down proportionally.</p>
                </>
            )
        }
    },
    {
        id: "q3",
        number: "Q3",
        question: "What types of crimes are most prevalent, and how do they vary by location?",
        cellName: "chart_q3",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Manhattan's <strong className="text-accent">Petit Larceny</strong> dominance is striking—nearly double Brooklyn's count despite lower total crime. Each borough shows a distinct profile:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Manhattan:</strong> Property crime heavy (Petit & Grand Larceny dominate).</li>
                        <li><strong className="text-accent">Bronx:</strong> Assault-heavy (nearly matching larceny counts).</li>
                        <li><strong className="text-accent">Brooklyn:</strong> Balanced mix of assault and property crime.</li>
                    </ul>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose <strong className="text-accent">grouped bar charts</strong> because they are optimal for comparing multiple categories (crime types) across multiple groups (boroughs) simultaneously.</p>
                    <p>The categorical color palette helps track specific crime types across different boroughs.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">Different boroughs need different interventions. One-size-fits-all policies fail here.</p>
                    <p>Manhattan needs retail/commercial security and transit policing for property crimes. Brooklyn and Bronx need more focus on assault prevention and community conflict resolution.</p>
                </>
            )
        }
    },
    {
        id: "q4",
        number: "Q4",
        question: "How do different crime types exhibit distinct temporal patterns?",
        cellName: "chart_q4",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Crime follows a clear diurnal rhythm:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Lowest:</strong> 5-6am (~220 incidents).</li>
                        <li><strong className="text-accent">Noon Spike:</strong> Crimes of opportunity during lunch hours.</li>
                        <li><strong className="text-accent">Peak:</strong> 5pm (~920 incidents), staying elevated through the evening.</li>
                    </ul>
                    <p className="mt-4">During COVID, this curve flattened significantly, but the classic rhythm has since returned.</p>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose an <strong className="text-accent">area chart</strong> to emphasize the cumulative "volume" of crime throughout the day.</p>
                    <p>The 24-hour x-axis balances detail with readability, showing the flow of crime from morning to night.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">Resources should flex throughout the day.</p>
                    <p>The 5-6am minimum suggests reduced patrols are reasonable, but afternoon/evening (3pm-8pm) demand 4x higher coverage. The noon spike indicates a need for midday presence in commercial areas.</p>
                </>
            )
        }
    },
    {
        id: "q5",
        number: "Q5",
        question: "How do crime patterns evolve across both space and time?",
        cellName: "chart_q5",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">The V-shaped COVID disruption is universal but uneven:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Manhattan:</strong> Most dramatic drop (16%) due to loss of commuters/tourists.</li>
                        <li><strong className="text-accent">Staten Island:</strong> Remained remarkably flat, unaffected by the pandemic.</li>
                        <li><strong className="text-accent">Post-COVID:</strong> Brooklyn surged 28% and Manhattan 36%, both overshooting pre-pandemic levels.</li>
                    </ul>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose a <strong className="text-accent">multi-line chart</strong> to show multiple time series simultaneously.</p>
                    <p>Each borough gets its own color-coded line, making it easy to track individual trajectories and compare recovery rates.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">Manhattan's volatility suggests its crime is highly sensitive to external economic shocks.</p>
                    <p>Brooklyn's sustained surge is particularly concerning as it is 17% above its pre-COVID baseline. The recent plateau suggests we have reached a new, higher equilibrium.</p>
                </>
            )
        }
    },
    {
        id: "q6",
        number: "Q6",
        question: "Where do different types of crimes typically occur?",
        cellName: "chart_q6",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Street dominates as the primary location, but nuances exist:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Petit Larceny:</strong> Diverse spread (Chain Store, Subway, Grocery) reflecting opportunism.</li>
                        <li><strong className="text-accent">Assault:</strong> Concentrates in Street and Residence (domestic incidents).</li>
                        <li><strong className="text-accent">Robbery:</strong> Overwhelmingly street-centric, requiring escape routes.</li>
                    </ul>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose a <strong className="text-accent">Sankey diagram</strong> because it is optimal for visualizing flow relationships.</p>
                    <p>The flow width encodes quantity, making it immediately apparent which crime-premise combinations dominate (e.g., the thick flow from Robbery to Street).</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">Petit larceny's spread requires environmental design strategies (surveillance, access control) across many venue types.</p>
                    <p>Residential assault concentration suggests that social service interventions (domestic violence programs) may be more effective than traditional street policing for these cases.</p>
                </>
            )
        }
    },
    {
        id: "q7",
        number: "Q7",
        question: "How do crime rates vary across NYC's police precincts?",
        cellName: "chart_q7",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">Crime hotspots are geographically concentrated and stable.</p>
                    <p className="mb-4"><strong className="text-accent">Central Bronx</strong> and <strong className="text-accent">Central Brooklyn</strong> precincts consistently rank highest (dark red) across all years.</p>
                    <p>Staten Island remains distinctly low-crime (pale yellow). Even during COVID, the relative rankings of precincts didn't change.</p>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose a <strong className="text-accent">choropleth map</strong> for visualizing geographic distributions.</p>
                    <p>The sequential color scheme (yellow to red) intuitively maps to crime intensity. Precinct-level granularity provides actionable detail for resource allocation.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">The persistence of hotspots suggests chronic structural issues requiring sustained intervention, not just temporary surges.</p>
                    <p>Geographic inequality is stark: residents in "red" precincts face a fundamentally different safety environment than those in "yellow" ones.</p>
                </>
            )
        }
    },
    {
        id: "q8",
        number: "Q8",
        question: "What insights emerge when filtering by multiple dimensions simultaneously?",
        cellName: "chart_q8",
        analysis: {
            whatWeFound: (
                <>
                    <p className="mb-4">The dashboard enables hypothesis testing. For example:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-accent">Pandemic Impact:</strong> Filtering by time reveals the dramatic drop and subsequent surge.</li>
                        <li><strong className="text-accent">Unique Signatures:</strong> Brooklyn Petit Larceny shows a distinct afternoon peak (3-4pm) tied to shopping hours, unlike the evening peaks of other crimes.</li>
                    </ul>
                </>
            ),
            whyItWorks: (
                <>
                    <p className="mb-4">We chose an <strong className="text-accent">interactive dashboard</strong> because static views can't capture multi-dimensional complexity.</p>
                    <p>The consistent area chart allows users to compare patterns across 1,500+ possible filter combinations without learning a new visualization.</p>
                </>
            ),
            whatItMeans: (
                <>
                    <p className="mb-4">This transforms crime data from passive reporting to active exploration.</p>
                    <p>It enables precise resource allocation—if Manhattan larceny peaks at 2pm but Bronx assault peaks at 9pm, patrol schedules can be optimized accordingly.</p>
                </>
            )
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
                                                <div className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whatWeFound}</div>
                                            </div>
                                            <div className="glass p-8 rounded-2xl">
                                                <h3 className="text-xl font-heading font-bold mb-4 text-accent">Why It Works</h3>
                                                <div className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whyItWorks}</div>
                                            </div>
                                            <div className="glass p-8 rounded-2xl">
                                                <h3 className="text-xl font-heading font-bold mb-4 text-accent">What It Means</h3>
                                                <div className="text-lg text-text/90 leading-relaxed">{selectedViz.analysis.whatItMeans}</div>
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