import React, { useEffect, useMemo, useState } from 'react';
import { contactApiService } from '../services';
import type { Contact } from '../types';

export const ManageContacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<Contact | null>(null);
    const [marking, setMarking] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await contactApiService.getContacts();
                if (!mounted) return;
                // Use the declared return type: ApiResponse<Contact[]>
                const data = Array.isArray(res.data) ? res.data : [];
                setContacts(data);
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
            <h2 className="text-xl font-semibold text-mainTheme-color mb-4">Contacts</h2>

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
                            <th className="px-4 py-3">Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedContacts.map((c, idx) => (
                            <tr
                                key={c._id || String(c.id)}
                                className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelected(c)}
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
                                <td className="px-4 py-3 text-gray-500">
                                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}
                                </td>
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
                                        const id = selected._id || selected.id;
                                        if (!id) throw new Error('Missing message id');
                                        await contactApiService.markAsRead(String(id));
                                        // Update local state to reflect read status
                                        setContacts((prev) => prev.map((c) => (c._id === selected._id || c.id === selected.id ? { ...c, isRead: true } : c)));
                                        setSelected({ ...selected, isRead: true });
                                    } catch (err) {
                                        console.error(err);
                                    } finally {
                                        setMarking(false);
                                    }
                                }}
                            >
                                {marking ? 'Marking…' : 'OK'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
