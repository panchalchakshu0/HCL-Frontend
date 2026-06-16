import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Upload() {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        if (!file) {
            setMessage({ type: 'error', text: 'Please select a CSV file to upload.' })
            return
        }
        setLoading(true)
        setMessage(null)

        try {
            const fd = new FormData()
            fd.append('file', file)
            const up = await api.post('/upload', fd)
            const filename = up.data.filename
            const res = await api.post('/predict', { filename })
            localStorage.setItem('last_results', JSON.stringify(res.data))
            setLoading(false)
            navigate('/results')
        } catch (error) {
            setLoading(false)
            setMessage({ type: 'error', text: 'Upload failed, please try again.' })
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-semibold">Upload Network Traffic</h1>
                <p className="text-slate-600">Upload a CSV of traffic flows to analyze for attacks and anomalies.</p>
            </div>

            {message && (
                <div className={`rounded-2xl p-4 ${message.type === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700">Select CSV file</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={e => setFile(e.target.files[0])}
                        className="mt-2 block w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2"
                    />
                </div>

                <div className="mb-4 text-sm text-slate-500">
                    {file ? `Selected file: ${file.name}` : 'Choose a network traffic CSV file from your computer.'}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    {loading ? 'Analyzing...' : 'Analyze Traffic'}
                </button>
            </form>
        </div>
    )
}
