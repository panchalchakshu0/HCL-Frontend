import React from 'react'

export default function About() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800 text-2xl shadow-sm mb-4">
                    🛡️
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">About the Developer</h1>
                <p className="text-slate-500 text-lg">Meet the minds behind the Enterprise Intrusion Detection System.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-bl-full -z-10 opacity-70"></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="h-24 w-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xl font-bold border-4 border-slate-100 shadow-md shrink-0">
                        AP
                    </div>
                    
                    <div className="space-y-6 text-center md:text-left">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Akshu Panchal</h2>
                            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mt-1">Cybersecurity Specialist & Developer</p>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-base">
                            I am a cybersecurity professional focused on building next-generation intrusion detection systems. 
                            This system combines advanced ML models (Random Forest, SVM) and unsupervised clustering (DBSCAN) 
                            with the Groq LLM API to deliver instant, explainable, and actionable threat mitigations for network operators.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                            <a 
                                href="mailto:panchalchakshu0@gmail.com" 
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                Email Me
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/akshu-panchal-b658bb241?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-[#0A66C2]">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Platform Summary</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    This software runs a hybrid Intrusion Detection System. Ingested traffic logs are processed through a 
                    multi-stage machine learning engine. First, traffic metrics (packet loss, latency, congestion, throughput, and jitter) 
                    are evaluated against baseline cybersecurity conditions. Next, SVM and Random Forest classifiers assign risk labels, 
                    cross-verified by DBSCAN outlier scoring. High-severity threats are summarized dynamically by artificial intelligence 
                    using the Llama 3.1 8B model over Groq API, recommending actionable blocks to protect core servers.
                </p>
            </div>
        </div>
    )
}
