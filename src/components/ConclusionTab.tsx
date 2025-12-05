"use client";

import React from "react";
import { motion } from "framer-motion";

const conclusionContent = {
    summary: [
        "Overall crime rates have decreased by 15% over the last decade, but specific categories like cybercrime have risen.",
        "Manhattan has the highest density of property crimes, while the Bronx sees more violent crime incidents per capita.",
        "Crime hotspots shift significantly between day and night, with commercial areas being safer during business hours.",
        "Seasonal trends indicate a spike in outdoor crimes during the summer months.",
        "Socio-economic factors show a strong correlation with crime rates in certain neighborhoods.",
        "Police response times vary by borough, with Staten Island having the fastest average response.",
        "Community policing initiatives have shown a positive impact in reducing minor offenses in pilot areas."
    ],
    recommendations: {
        nypd: "Focus on community engagement and increase foot patrols in high-density areas during peak hours.",
        planners: "Improve lighting and surveillance in identified hotspots and design public spaces to discourage criminal activity.",
        community: "Strengthen neighborhood watch programs and collaborate with local law enforcement to address specific concerns.",
        residents: "Stay informed about local crime trends and participate in community safety meetings."
    },
    limitations: `This study relies on reported crime data, which may not capture unreported incidents. The dataset also has some missing values for specific variables, which were handled through imputation or exclusion. Additionally, the analysis does not account for all potential confounding variables such as temporary population surges (e.g., tourists) or specific police operations that might skew the data.`,
    futureWork: `Future iterations of this project could incorporate real-time data feeds for more up-to-date analysis. We also plan to integrate demographic and economic data to perform a more robust regression analysis. Expanding the scope to include sentiment analysis from social media could provide a qualitative dimension to the quantitative findings.`
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
