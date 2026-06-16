import React from 'react'
import { Link } from 'react-router-dom'

function getAttackName(attack) {
    const atk = String(attack).trim().toLowerCase()
    
    if (atk === '0' || atk === 'normal') return 'Normal'
    if (atk === '1' || atk === 'dos / ddos' || atk.includes('ddos') || atk.includes('dos')) return 'DoS / DDoS'
    if (atk === '2' || atk === 'network flooding' || atk.includes('flooding')) return 'Network Flooding'
    if (atk === '3' || atk === 'packet drop attack' || atk.includes('packet drop') || atk.includes('drop')) return 'Packet Drop Attack'
    if (atk === '4' || atk === 'jitter attack' || atk.includes('jitter')) return 'Jitter Attack'
    if (atk === '5' || atk === 'performance anomaly' || atk.includes('performance') || atk.includes('anomaly')) return 'Performance Anomaly'
    if (atk.includes('brute') || atk.includes('force')) return 'Brute Force'
    if (atk.includes('scan') || atk.includes('port')) return 'Port Scan'
    if (atk.includes('malware')) return 'Malware'
    const strAtk = String(attack);
    return strAtk.charAt(0).toUpperCase() + strAtk.slice(1);
}

function getRecommendedAction(attack) {
    const name = getAttackName(attack).toLowerCase()
    if (name.includes('dos') || name.includes('ddos')) return 'Block IP / Enable Rate Limiting'
    if (name.includes('flooding')) return 'Rate Limit Traffic / Block Host IP'
    if (name.includes('packet drop') || name.includes('drop')) return 'Reroute Traffic / Verify Node Health'
    if (name.includes('jitter')) return 'Implement Traffic Shaping / Packet Buffering'
    if (name.includes('performance') || name.includes('anomaly')) return 'Check Link Congestion / Reroute Traffic'
    if (name.includes('brute')) return 'Block IP / Enforce Password Lockout'
    if (name.includes('scan')) return 'Close Unused Ports / Enable Firewall IPS'
    if (name.includes('malware')) return 'Quarantine Host / Scan System Files'
    return 'Block IP / Analyze Payload'
}

function sanitizeRecommendations(recs) {
    if (!recs) return [];
    if (Array.isArray(recs)) {
        return recs.map(item => {
            if (typeof item === 'string') return item;
            if (typeof item === 'object' && item !== null) {
                const vals = Object.values(item);
                if (vals.length > 0) return String(vals[0]);
            }
            return String(item);
        });
    }
    if (typeof recs === 'object' && recs !== null) {
        const sortedKeys = Object.keys(recs).sort((a, b) => {
            const numA = parseInt(a), numB = parseInt(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
        return sortedKeys.map(k => String(recs[k]));
    }
    return [String(recs)];
}

export default function Results() {
    const data = JSON.parse(localStorage.getItem('last_results') || 'null')
    if (!data) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold">Results</h1>
                <p className="mt-4 text-slate-600">No analysis result found. Upload a CSV to analyze traffic.</p>
                <Link to="/upload" className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-white font-semibold hover:bg-slate-800 transition-colors">Upload CSV</Link>
            </div>
        )
    }

    const final = data.final || {}
    const records = data.per_record || []
    const recommendationsList = sanitizeRecommendations(final.recommendations)
    
    // Filter to ONLY anomalous records (exclude normal records)
    const anomalousRecords = records.filter(r => 
        r.predicted_anomaly === true || 
        r.predicted_anomaly === 'true' || 
        r.predicted_anomaly === 1 || 
        r.predicted_anomaly === '1'
    )

    const severityLower = final.severity?.toLowerCase() || 'normal'
    const severityColor = severityLower === 'critical' || severityLower === 'high' 
        ? 'text-rose-600 bg-rose-50 border-rose-100' 
        : (severityLower === 'medium' ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100')

    return (
        <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Analysis Results</h1>
                        <p className="text-slate-500 text-sm mt-1">Real-time threat evaluation report generated for uploaded logs.</p>
                    </div>
                    <div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${severityColor}`}>
                            <span className="h-2 w-2 rounded-full bg-current"></span>
                            Risk Level: {final.severity || 'Normal'}
                        </span>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Summary card (2cols on large) */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:col-span-2 shadow-xs flex flex-col justify-between">
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Security Summary</p>
                        <p className="mt-4 text-slate-700 text-base leading-relaxed font-medium">
                            {typeof final.summary === 'string' ? final.summary : (final.summary ? JSON.stringify(final.summary) : 'Traffic logs successfully classified.')}
                        </p>
                    </div>

                    {/* Dynamic Key Metrics */}
                    {final.key_metrics && Object.entries(final.key_metrics).map(([key, val]) => (
                        <div key={key} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between">
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">{key}</p>
                            <div className="mt-6">
                                <p className="text-3xl font-black text-slate-900 tracking-tight">
                                    {typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Threat Alerts (Exclusively anomalous records) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Threat Alerts ({anomalousRecords.length})</h2>
                        <p className="text-xs text-slate-400 mt-1">Logs identified as active anomalies requiring mitigation.</p>
                    </div>
                </div>

                {anomalousRecords.length === 0 ? (
                    <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/20 p-6 border-l-4 border-l-emerald-500">
                        <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                            🛡️ System Secured
                        </h3>
                        <p className="mt-1 text-slate-600 text-sm">No abnormal data packets or attack behaviors were detected in this analysis.</p>
                    </div>
                ) : (
                    <div className="mt-6 max-h-[600px] overflow-y-auto pr-2 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {anomalousRecords.map((row, idx) => {
                                const atkLabel = getAttackName(row.predicted_attack)
                                const isCritical = row.predicted_severity?.toLowerCase() === 'critical'
                                const isHigh = row.predicted_severity?.toLowerCase() === 'high'
                                const tagColor = isCritical 
                                    ? 'bg-rose-100 text-rose-800' 
                                    : (isHigh ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800')

                                return (
                                    <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200">
                                        <div>
                                            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                                                    <span className="text-rose-500 text-sm">⚠️</span> Threat Alert
                                                </h3>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${tagColor}`}>
                                                    {row.predicted_severity || 'HIGH'}
                                                </span>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Attack Type</p>
                                                    <p className="mt-1.5 font-bold text-slate-800 text-sm">{atkLabel}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Confidence</p>
                                                    <p className="mt-1.5 font-mono font-bold text-slate-800 text-sm">{row.predicted_confidence}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Anomaly</p>
                                                    <p className="mt-1.5 font-bold text-rose-600 text-sm">YES</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Recommended Action</p>
                                                    <p className="mt-1.5 font-bold text-indigo-600 text-sm">{getRecommendedAction(row.predicted_attack)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <details className="mt-5 border-t border-slate-100 pt-3">
                                            <summary className="text-[11px] font-bold text-slate-500 cursor-pointer hover:text-slate-800 focus:outline-none">
                                                Inspect Network Metrics
                                            </summary>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                {Object.entries(row)
                                                    .filter(([k]) => !['predicted_attack', 'predicted_confidence', 'predicted_anomaly', 'predicted_severity', 'anomaly', 'severity', 'confidence', 'attack'].includes(k))
                                                    .map(([k, v]) => (
                                                        <div key={k} className="truncate">
                                                            <span className="text-slate-400">{k.replace('_', ' ')}:</span> {typeof v === 'number' ? (v % 1 === 0 ? v : v.toFixed(2)) : String(v)}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </details>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Dynamic Recommendations */}
            {recommendationsList.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800">Actionable Recommendations</h2>
                    <p className="text-xs text-slate-400 mt-1">Recommended firewalls or network changes to secure the system.</p>
                    <ul className="mt-6 space-y-4">
                        {recommendationsList.map((rec, idx) => (
                            <li key={idx} className="flex gap-4 items-start text-slate-700 leading-relaxed text-sm">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold">
                                    {idx + 1}
                                </span>
                                <span className="font-medium">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
