import React, { useEffect, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { contactApiService } from '../services';
import type { Contact } from '../types';

export const ManageContacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<Contact | null>(null);
    const [marking, setMarking] = useState(false);
    const [markError, setMarkError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await contactApiService.getContacts();
                if (!mounted) return;
                // Use the declared return type: ApiResponse<Contact[]>
                const raw = Array.isArray(res.data) ? res.data : [];
                // Normalize each contact to guarantee a stable identifier for updates
                const normalized = raw.map((c, i) => {
                    const key = c._id ?? (c.id !== undefined ? String(c.id) : undefined);
                    return {
                        ...c,
                        _id: key ?? `local-${i}`,
                    } as Contact;
                });
                setContacts(normalized);
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message || 'Failed to load contacts');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const sortedContacts = useMemo(() => {
        // Newest first by createdAt (fallback: keep order)
        return [...contacts].sort((a, b) => {
            const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bt - at;
        });
    }, [contacts]);

    const filteredContacts = useMemo(() => {
        if (statusFilter === 'all') return sortedContacts;
        if (statusFilter === 'read') return sortedContacts.filter(c => c.isRead);
        return sortedContacts.filter(c => !c.isRead);
    }, [sortedContacts, statusFilter]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-6">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-mainTheme-color border-t-transparent" aria-label="Loading contacts" />
                <span className="ml-3 text-sm text-gray-600">Loading contacts…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 rounded border border-red-200 bg-red-50 text-red-700">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (!contacts.length) {
        return (
            <div className="p-4 rounded border border-gray-200 bg-white text-gray-600">
                No contacts found.
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-mainTheme-color">Contacts</h2>
                <div className="inline-flex overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                    {(['all', 'read', 'unread'] as const).map(f => {
                        const active = statusFilter === f;
                        const label = f === 'all' ? 'All' : f === 'read' ? 'Read' : 'Unread';
                        return (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setStatusFilter(f)}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-mainTheme-color text-white' : 'text-gray-600 hover:bg-gray-50'} ${f !== 'unread' ? 'border-r border-gray-200' : ''}`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-3 w-12">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Phone</th>
                            <th className="px-4 py-3">Message</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.map((c, idx) => (
                            <tr
                                key={c._id || String(c.id)}
                                className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                                onClick={() => { setSelected(c); setMarkError(null); }}
                            >
                                <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                                <td className="px-4 py-3">
                                    <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a>
                                </td>
                                <td className="px-4 py-3">
                                    {c.phone ? (
                                        <a href={`tel:${c.phone}`} className="text-blue-600 hover:underline">{c.phone}</a>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 max-w-[28rem]">
                                    <p className="line-clamp-3 whitespace-pre-wrap">{c.message}</p>
                                </td>
                                <td className="px-4 py-3">
                                    {c.isRead ? (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Read</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">Unread</span>
                                    )}
                                </td>
                                {/* Received column removed as per request */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
                    <div className="w-full max-w-lg rounded-lg bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="border-b px-4 py-3">
                            <h3 className="text-lg font-semibold text-gray-900">Message from {selected.name}</h3>
                            <p className="text-sm text-gray-500">{selected.email}{selected.phone ? ` • ${selected.phone}` : ''}</p>
                        </div>
                        <div className="p-4">
                            <p className="whitespace-pre-wrap text-gray-800">{selected.message}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
                            {markError && (
                                <div className="mr-auto pl-1 text-xs text-red-600" role="alert">{markError}</div>
                            )}
                            <button
                                className="rounded px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setSelected(null)}
                            >
                                Close
                            </button>
                            <button
                                className="inline-flex items-center rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                disabled={marking}
                                onClick={async () => {
                                    if (!selected) return;
                                    try {
                                        setMarking(true);
                                        setMarkError(null);
                                        const id = selected._id || selected.id;
                                        if (!id) throw new Error('Missing message id');
                                        await contactApiService.markAsRead(String(id));
                                        // Update local state to reflect read status
                                        setContacts((prev) => {
                                            const selKey = selected._id ?? (selected.id !== undefined ? String(selected.id) : null);
                                            return prev.map((c) => {
                                                const cKey = c._id ?? (c.id !== undefined ? String(c.id) : null);
                                                if (!selKey || !cKey || cKey !== selKey) return c;
                                                return { ...c, isRead: true };
                                            });
                                        });
                                        setSelected((prevSel) => prevSel ? { ...prevSel, isRead: true } : prevSel);
                                        // Auto close after brief timeout to allow UI update
                                        setTimeout(() => setSelected(null), 50);
                                    } catch (err) {
                                        console.error(err);
                                        const msg = (err as any)?.message || 'Failed to mark as read';
                                        setMarkError(msg);
                                    } finally {
                                        setMarking(false);
                                    }
                                }}
                            >
                                {marking ? 'Marking…' : <FaCheck className="text-lg" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
