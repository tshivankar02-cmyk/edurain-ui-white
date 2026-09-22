import React from 'react';
import { X, Receipt, IndianRupee, CheckCircle2, Clock3, Download } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Purchase {
  id: string;
  title: string;
  category: 'IIT-JEE' | 'NEET' | 'UPSC';
  type: 'Course' | 'Test Series' | 'Subscription';
  amount: number;
  date: string;
  status: 'Active' | 'Completed' | 'Expired';
}

interface PurchasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases?: Purchase[];
}

const DEFAULT_PURCHASES: Purchase[] = [
  { id: 'ord_1', title: 'PRO Subscription — 12 Months', category: 'IIT-JEE', type: 'Subscription', amount: 4999, date: '02 Aug 2026', status: 'Active' },
  { id: 'ord_2', title: 'Rotational Dynamics Mastery', category: 'IIT-JEE', type: 'Course', amount: 149, date: '18 Aug 2026', status: 'Active' },
  { id: 'ord_3', title: 'JEE Main Full Syllabus Test Series', category: 'IIT-JEE', type: 'Test Series', amount: 299, date: '25 Aug 2026', status: 'Active' },
  { id: 'ord_4', title: 'Organic Reactions Vault', category: 'IIT-JEE', type: 'Course', amount: 199, date: '05 Sep 2026', status: 'Completed' },
  { id: 'ord_5', title: 'Electrostatics from Zero', category: 'IIT-JEE', type: 'Course', amount: 99, date: '10 Jun 2026', status: 'Expired' },
];

const STATUS_STYLES: Record<Purchase['status'], string> = {
  Active: 'bg-[#10B981]/15 text-[#059669]',
  Completed: 'bg-[#175A67]/10 text-[#175A67]',
  Expired: 'bg-red-50 text-red-500',
};

/* ------------------------------------------------------------------ */
/*  Main modal                                                         */
/* ------------------------------------------------------------------ */

export function PurchasesModal({ isOpen, onClose, purchases = DEFAULT_PURCHASES }: PurchasesModalProps) {
  if (!isOpen) return null;

  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);
  const activeCount = purchases.filter((p) => p.status === 'Active').length;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[88vh] bg-[#F8FAFC] rounded-3xl shadow-2xl border border-white/80 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#175A67] to-[#2A707C] p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-1.5 rounded-full hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 text-white">
            <Receipt className="w-5 h-5" />
            <h2 className="text-lg font-bold">My Purchases</h2>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wide">Total Spent</p>
              <p className="text-lg font-bold text-white flex items-center">
                <IndianRupee className="w-4 h-4" />
                {totalSpent.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wide">Active Items</p>
              <p className="text-lg font-bold text-white">{activeCount}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          {purchases.length === 0 ? (
            <div className="text-center py-10">
              <Receipt className="w-10 h-10 text-[#175A67]/30 mx-auto mb-2" />
              <p className="text-sm text-[#2A707C]">No purchases yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="bg-white/60 border border-white/80 rounded-2xl p-4 flex items-start justify-between gap-3 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#175A67] leading-snug">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] font-bold bg-[#175A67]/10 text-[#175A67] px-2 py-0.5 rounded-full">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-semibold text-[#2A707C]">{p.type}</span>
                    </div>
                    <p className="text-[11px] text-[#2A707C] mt-1.5 flex items-center gap-1">
                      <Clock3 className="w-3 h-3" /> {p.date}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#175A67] flex items-center justify-end">
                      <IndianRupee className="w-3.5 h-3.5" />
                      {p.amount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status]}`}
                    >
                      {p.status === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                      {p.status}
                    </span>
                    <button
                      title="Download invoice"
                      className="flex items-center gap-1 text-[10px] font-semibold text-[#2A707C] hover:text-[#175A67] mt-2 ml-auto"
                    >
                      <Download className="w-3 h-3" /> Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchasesModal;
