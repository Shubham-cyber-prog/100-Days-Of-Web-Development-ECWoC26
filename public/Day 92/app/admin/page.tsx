'use client';

import { useEffect, useState } from 'react';
import { RegistrationResponse } from '@/types';

export default function AdminPage() {
    const [registrations, setRegistrations] = useState<RegistrationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await fetch('/api/registrations');
            const data = await response.json();

            if (data.success) {
                setRegistrations(data.data);
            } else {
                setError('Failed to load registrations');
            }
        } catch {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter(reg =>
        reg.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.leader_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.leader_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-2xl text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Total Registrations: {registrations.length}</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by team name, leader name, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRegistrations.map((reg) => (
                        <div key={reg.id} className="glass-card p-6 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-orange-400">{reg.team_name}</h3>
                                <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm">
                                    {reg.experience_level}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-400">Leader:</span>
                                    <p className="text-white">{reg.leader_name}</p>
                                </div>

                                <div>
                                    <span className="text-gray-400">Email:</span>
                                    <p className="text-white break-all">{reg.leader_email}</p>
                                </div>

                                <div>
                                    <span className="text-gray-400">Phone:</span>
                                    <p className="text-white">{reg.leader_phone}</p>
                                </div>

                                <div>
                                    <span className="text-gray-400">Team Size:</span>
                                    <p className="text-white">{reg.team_size} members</p>
                                </div>

                                <div>
                                    <span className="text-gray-400">Tech Stack:</span>
                                    <p className="text-white">{reg.tech_stack}</p>
                                </div>

                                <div>
                                    <span className="text-gray-400">Project Idea:</span>
                                    <p className="text-white text-xs line-clamp-3">{reg.project_idea}</p>
                                </div>

                                {reg.members && reg.members.length > 0 && (
                                    <div>
                                        <span className="text-gray-400">Members:</span>
                                        <ul className="text-white text-xs mt-1 space-y-1">
                                            {reg.members.map((member, idx) => (
                                                <li key={idx}>• {member.name} {member.role && `(${member.role})`}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 pt-2 border-t border-white/10">
                                    Registered: {new Date(reg.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRegistrations.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No registrations found
                    </div>
                )}
            </div>
        </div>
    );
}
