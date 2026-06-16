import React, { useEffect, useState } from 'react'
import api from '../services/api'

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

export default function History() {
    const [rows, setRows] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/history')
            .then(r => {
                setRows(r.data)
                setLoading(false)
            })
            .catch(() => {
                setError('Unable to load analysis history.')
                setLoading(false)
            })
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Analysis History</h1>
                <p className="text-slate-500 text-sm mt-1">Audit log of previously uploaded traffic files and evaluated threat levels.</p>
            </div>

            {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 text-sm font-semibold">
                    ⚠️ {error}
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left text-sm">
                        <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Analysis Date</th>
                                <th className="px-6 py-4">Uploaded File</th>
                                <th className="px-6 py-4">Primary Classification</th>
                                <th className="px-6 py-4">Anomaly</th>
                                <th className="px-6 py-4">Overall Severity</th>
                                <th className="px-6 py-4">Avg Confidence</th>
                                <th className="px-6 py-4">Log Count</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-slate-400 font-medium">
                                        Loading history records...
                                    </td>
                                </tr>
                            ) : rows.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-medium">
                                        No traffic audits recorded yet. Upload a CSV to get started.
                                    </td>
                                </tr>
                            ) : (
                                rows.map(r => {
                                    const attackName = getAttackName(r.attack_type)
                                    const isNormal = attackName.toLowerCase() === 'normal'
                                    const attackColor = isNormal ? 'text-emerald-600' : 'text-rose-600'

                                    const rawSev = r.severity?.toLowerCase() || 'normal'
                                    const severityBadge = rawSev === 'critical'
                                        ? 'bg-rose-100 text-rose-800 border-rose-200/50'
                                        : (rawSev === 'high' 
                                            ? 'bg-orange-100 text-orange-800 border-orange-200/50'
                                            : (rawSev === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200/50' : 'bg-emerald-100 text-emerald-800 border-emerald-200/50'))

                                    return (
                                        <tr key={r.id} className="hover:bg-slate-50/50 transition-colors duration-150">
                                            <td className="px-6 py-4 font-semibold text-slate-700 whitespace-nowrap">
                                                {new Date(r.created_at).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-500 truncate max-w-[180px]" title={r.filename || 'Direct Input'}>
                                                {r.filename || <span className="italic text-slate-400">Direct Upload</span>}
                                            </td>
                                            <td className={`px-6 py-4 font-bold whitespace-nowrap ${attackColor}`}>
                                                {attackName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                    r.anomaly 
                                                        ? 'bg-rose-50 text-rose-700 border-rose-200/30' 
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200/30'
                                                }`}>
                                                    {r.anomaly ? 'YES' : 'NO'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${severityBadge}`}>
                                                    {r.severity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                                                {Number(r.confidence).toFixed(2)}%
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-500 whitespace-nowrap">
                                                {r.total_records} records
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
