import React, { useEffect, useMemo, useState } from 'react';
import { FaCheck, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
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
                const raw = Array.isArray(res.data) ? res.data : [];
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

    const handleMarkAsRead = async () => {
        if (!selected) return;
        try {
            setMarking(true);
            setMarkError(null);
            const id = selected._id || selected.id;
            if (!id) throw new Error('Missing message id');
            await contactApiService.markAsRead(String(id));
            setContacts((prev) => {
                const selKey = selected._id ?? (selected.id !== undefined ? String(selected.id) : null);
                return prev.map((c) => {
                    const cKey = c._id ?? (c.id !== undefined ? String(c.id) : null);
                    if (!selKey || !cKey || cKey !== selKey) return c;
                    return { ...c, isRead: true };
                });
            });
            setSelected((prevSel) => prevSel ? { ...prevSel, isRead: true } : prevSel);
            setTimeout(() => setSelected(null), 50);
        } catch (err) {
            console.error(err);
            const msg = (err as any)?.message || 'Failed to mark as read';
            setMarkError(msg);
        } finally {
            setMarking(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] p-4 sm:p-6">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-mainTheme-color border-t-transparent" aria-label="Loading contacts" />
                <span className="ml-3 text-xs sm:text-sm text-gray-600">Loading contacts…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-4 sm:m-6 p-4 sm:p-6 rounded-lg border border-red-200 bg-red-50 text-red-700">
                <p className="font-semibold text-sm sm:text-base mb-1">Error</p>
                <p className="text-xs sm:text-sm">{error}</p>
            </div>
        );
    }

    if (!contacts.length) {
        return (
            <div className="m-4 sm:m-6 p-4 sm:p-6 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm sm:text-base">
                No contacts found.
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-50">
            {/* Header - Fixed at top */}
            <div className="bg-white border-b-2 border-gray-200 shadow-sm">
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-mainTheme-color">
                            Contacts ({filteredContacts.length})
                        </h2>
                        {/* Filter Buttons */}
                        <div className="inline-flex w-full sm:w-auto overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-sm">
                            {(['all', 'read', 'unread'] as const).map(f => {
                                const active = statusFilter === f;
                                const label = f === 'all' ? 'All' : f === 'read' ? 'Read' : 'Unread';
                                return (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setStatusFilter(f)}
                                        className={`flex-1 sm:flex-none px-5 sm:px-7 lg:px-9 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-200 ${
                                            active ? 'bg-mainTheme-color text-white shadow-inner' : 'text-gray-700 hover:bg-gray-100'
                                        } ${f !== 'unread' ? 'border-r-2 border-gray-300' : ''}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Table View - Full Page */}
            <div className="hidden lg:block bg-white">
                <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                        <tr className="border-b-2 border-gray-300">
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">No</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Name</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Email</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Phone</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Message</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Status</th>
                            <th className="px-4 lg:px-6 py-4 lg:py-5 text-left text-sm lg:text-base font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredContacts.map((c, idx) => (
                            <tr
                                key={c._id || String(c.id)}
                                className="hover:bg-blue-50 cursor-pointer transition-all duration-200"
                                role="button"
                                tabIndex={0}
                                onClick={() => { setSelected(c); setMarkError(null); }}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setSelected(c);
                                        setMarkError(null);
                                    }
                                }}
                            >
                                <td className="px-4 lg:px-6 py-5 lg:py-6 text-base lg:text-lg text-gray-600 font-semibold whitespace-nowrap align-middle">{idx + 1}</td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 text-base lg:text-lg font-bold text-gray-900 whitespace-nowrap align-middle">{c.name}</td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 min-w-[200px] align-middle">
                                    <a 
                                        href={`mailto:${c.email}`} 
                                        className="flex items-center gap-2.5 text-base lg:text-lg text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium" 
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaEnvelope className="text-sm lg:text-base flex-shrink-0" />
                                        <span className="truncate">{c.email}</span>
                                    </a>
                                </td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 whitespace-nowrap align-middle">
                                    {c.phone ? (
                                        <a 
                                            href={`tel:${c.phone}`} 
                                            className="flex items-center gap-2.5 text-base lg:text-lg text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium" 
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaPhone className="text-sm lg:text-base flex-shrink-0" />
                                            <span>{c.phone}</span>
                                        </a>
                                    ) : (
                                        <span className="text-base lg:text-lg text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 max-w-md align-middle">
                                    <p className="line-clamp-2 whitespace-pre-wrap text-base lg:text-lg text-gray-800 leading-relaxed">{c.message}</p>
                                </td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 whitespace-nowrap align-middle">
                                    {c.isRead ? (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3.5 py-1.5 text-sm lg:text-base font-bold text-green-700 border border-green-300">
                                            Read
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3.5 py-1.5 text-sm lg:text-base font-bold text-yellow-800 border border-yellow-300">
                                            Unread
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 lg:px-6 py-5 lg:py-6 whitespace-nowrap align-middle">
                                    {c.createdAt ? (
                                        <div className="space-y-1">
                                            <div className="font-semibold text-sm lg:text-base text-gray-900">{new Date(c.createdAt).toLocaleDateString(undefined, { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}</div>
                                            <div className="text-sm lg:text-base text-gray-600">{new Date(c.createdAt).toLocaleTimeString(undefined, {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</div>
                                        </div>
                                    ) : (
                                        <span className="text-base lg:text-lg text-gray-400">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden overflow-y-auto p-4 sm:p-5 space-y-3 bg-gray-50">
                {filteredContacts.map((c, idx) => (
                    <div
                        key={c._id || String(c.id)}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                        onClick={() => { setSelected(c); setMarkError(null); }}
                    >
                        <div className="p-3.5 sm:p-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-gray-400">#{idx + 1}</span>
                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                            {c.name}
                                        </h3>
                                    </div>
                                </div>
                                {c.isRead ? (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 shrink-0">
                                        Read
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800 shrink-0">
                                        Unread
                                    </span>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 mb-3">
                                <a
                                    href={`mailto:${c.email}`}
                                    className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaEnvelope className="shrink-0 text-xs" />
                                    <span className="truncate">{c.email}</span>
                                </a>
                                {c.phone && (
                                    <a
                                        href={`tel:${c.phone}`}
                                        className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:underline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaPhone className="shrink-0 text-xs" />
                                        <span>{c.phone}</span>
                                    </a>
                                )}
                            </div>

                            {/* Message Preview */}
                            <div className="bg-gray-50 rounded-md p-2.5 sm:p-3">
                                <p className="text-xs sm:text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap leading-relaxed">
                                    {c.message}
                                </p>
                            </div>

                            {/* Timestamp */}
                            {c.createdAt && (
                                <p className="text-xs text-gray-500 mt-2.5 font-medium">
                                    {new Date(c.createdAt).toLocaleDateString()} at {new Date(c.createdAt).toLocaleTimeString()}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal - Responsive for all devices */}
            {selected && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 sm:p-4 lg:p-6" 
                    onClick={() => setSelected(null)}
                >
                    <div 
                        className="w-full h-full sm:h-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:rounded-xl bg-white shadow-2xl sm:max-h-[90vh] flex flex-col overflow-hidden" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="border-b-2 border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 break-words">
                                        Message from {selected.name}
                                    </h3>
                                    <div className="space-y-2 lg:space-y-2.5">
                                        <a 
                                            href={`mailto:${selected.email}`} 
                                            className="flex items-center gap-2.5 text-xs sm:text-sm lg:text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaEnvelope className="shrink-0 text-sm lg:text-base" />
                                            <span className="truncate">{selected.email}</span>
                                        </a>
                                        {selected.phone && (
                                            <a 
                                                href={`tel:${selected.phone}`} 
                                                className="flex items-center gap-2.5 text-xs sm:text-sm lg:text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FaPhone className="shrink-0 text-sm lg:text-base" />
                                                <span>{selected.phone}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="p-2 lg:p-2.5 rounded-full hover:bg-gray-200 transition-colors shrink-0"
                                    aria-label="Close"
                                >
                                    <FaTimes className="text-gray-600 text-lg lg:text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 sm:p-5 lg:p-6 border border-gray-200">
                                <p className="whitespace-pre-wrap text-sm sm:text-base lg:text-lg leading-relaxed text-gray-900 break-words">
                                    {selected.message}
                                </p>
                            </div>
                            {selected.createdAt && (
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-4 lg:mt-5 font-medium">
                                    Received on {new Date(selected.createdAt).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} at {new Date(selected.createdAt).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t-2 border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
                            {markError && (
                                <div className="mb-4 p-3 lg:p-3.5 rounded-lg bg-red-50 border border-red-300">
                                    <p className="text-xs sm:text-sm lg:text-base text-red-700 font-medium" role="alert">{markError}</p>
                                </div>
                            )}
                            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                                <button
                                    className="w-full sm:w-auto rounded-lg px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
                                    onClick={() => setSelected(null)}
                                >
                                    Close
                                </button>
                                {!selected.isRead && (
                                    <button
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-green-600 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                        disabled={marking}
                                        onClick={handleMarkAsRead}
                                    >
                                        {marking ? (
                                            <>
                                                <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                <span>Marking…</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCheck className="text-sm sm:text-base" />
                                                <span>Mark as Read</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};