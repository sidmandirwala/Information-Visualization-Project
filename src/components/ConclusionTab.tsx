"use client";

import React from "react";
import { motion } from "framer-motion";

const conclusionContent = {
    summary: [
        "COVID-19 caused a dramatic 36% drop in crime in early 2020, but the recovery was swift and exceeded pre-pandemic levels.",
        "We have entered a 'new normal' of elevated crime: current monthly incidents (48K-50K) are 15-20% higher than the 2015-2019 baseline.",
        "Geographic patterns are remarkably stable: Brooklyn consistently leads in volume, followed by Manhattan, Bronx, Queens, and Staten Island.",
        "Manhattan is property-crime heavy (25% Petit Larceny), while the Bronx and Brooklyn have higher concentrations of assault.",
        "Crime follows a strong diurnal rhythm, peaking in the afternoon (3pm-6pm) and bottoming out at 5-6am.",
        "Staten Island remains a distinct low-crime environment, accounting for only 4% of citywide crime despite its size.",
        "Hotspots in Central Bronx and Central Brooklyn have persisted for a decade, unaffected by the pandemic's disruptions."
    ],
    recommendations: {
        nypd: "Deploy 3-4x more patrol resources during afternoon/evening hours (3pm-8pm). Focus on commercial security in Manhattan and assault prevention in Brooklyn/Bronx residential areas.",
        planners: "Improve lighting and sight lines in residential hotspots. Continue investment in transit security to maintain its relative safety.",
        community: "Implement youth programs during peak crime hours (3pm-8pm). Expand domestic violence and conflict resolution services in residential assault hotspots.",
        residents: "Plan high-risk activities around safer times (early morning). Research precinct-level crime intensity when choosing neighborhoods, as within-borough variation is high."
    },
    limitations: `Our analysis relies on reported crime data, which may underrepresent unreported incidents like domestic violence. Approximately 5% of records lacked geographic coordinates and were excluded from spatial maps. We also did not integrate socioeconomic or demographic data, so we can describe 'where' and 'when' crime happens, but not fully explain 'why'.`,
    futureWork: `Future extensions could integrate census data to build predictive models for crime hotspots. We could also track hotspot migration over time using spatial autocorrelation. Expanding the temporal analysis to include day-of-week patterns and the impact of weather or special events would provide deeper context.`
};

const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="max-w-4xl mx-auto py-12 px-6"
    >
        <h2 className="text-3xl font-heading font-bold mb-8 text-text border-b border-white/10 pb-4">
            {title}
        </h2>
        <div className="text-lg text-text/80 leading-relaxed">
            {children}
        </div>
    </motion.section>
);

export function ConclusionTab() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center mb-16 px-6"
            >
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Conclusions & Recommendations</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">Synthesizing our findings into actionable insights.</p>
            </motion.div>

            <Section title="Summary of Key Findings">
                <ul className="space-y-4">
                    {conclusionContent.summary.map((finding, index) => (
                        <li key={index} className="flex gap-4 items-start">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold mt-1">
                                {index + 1}
                            </span>
                            <span>{finding}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section title="Recommendations">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="glass p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-3 text-accent">For NYPD & Law Enforcement</h3>
                        <p className="text-sm">{conclusionContent.recommendations.nypd}</p>
                    </div>
                    <div className="glass p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-3 text-accent">For City Planners</h3>
                        <p className="text-sm">{conclusionContent.recommendations.planners}</p>
                    </div>
                    <div className="glass p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-3 text-accent">For Community Orgs</h3>
                        <p className="text-sm">{conclusionContent.recommendations.community}</p>
                    </div>
                    <div className="glass p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-3 text-accent">For Residents</h3>
                        <p className="text-sm">{conclusionContent.recommendations.residents}</p>
                    </div>
                </div>
            </Section>

            <Section title="Limitations of the Study">
                <div className="glass p-8 rounded-2xl border-l-4 border-yellow-500/50">
                    <p>{conclusionContent.limitations}</p>
                </div>
            </Section>

            <Section title="Future Work & Extensions">
                <div className="glass p-8 rounded-2xl border-l-4 border-green-500/50">
                    <p>{conclusionContent.futureWork}</p>
                </div>
            </Section>
        </div>
    );
}
