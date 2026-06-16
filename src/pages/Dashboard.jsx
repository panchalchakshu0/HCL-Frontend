import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Dashboard() {
    const [stats, setStats] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get('/stats')
            .then(r => setStats(r.data))
            .catch(() => setError('Unable to load dashboard stats.'))
    }, [])

    return (
        <div className="space-y-10">
            {/* Header Welcome Card */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-indigo-500/20 to-rose-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-12 h-32 w-32 bg-indigo-600/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Enterprise Network Security System</h1>
                    <div className="pt-2">
                        <Link to="/upload" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-all shadow-sm">
                            Analyze Network Traffic
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm font-semibold">
                    ⚠️ {error}
                </div>
            )}

            {/* Statistics Cards */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-5">System Statistics</h2>
                {stats ? (
                    <div className="grid gap-6 sm:grid-cols-3">
                        {/* Stat 1 */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total Analyses</p>
                                <p className="text-3xl font-extrabold text-slate-900">{stats.total_analyses}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Attacks Flagged</p>
                                <p className="text-3xl font-extrabold text-rose-600">{stats.attacks}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Anomalies Detected</p>
                                <p className="text-3xl font-extrabold text-amber-600">{stats.anomalies}</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-slate-500 text-sm animate-pulse">
                        Loading system statistics...
                    </div>
                )}
            </div>
        </div>
    )
}
