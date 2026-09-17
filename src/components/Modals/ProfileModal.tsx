import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Pencil,
  Check,
  Trophy,
  BookOpen,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UserProfileData {
  fullName: string;
  mobile: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dob: string; // yyyy-mm-dd
  targetExam: 'IIT-JEE' | 'NEET' | 'UPSC';
  targetYear: string;
  classGrade: string;
  schoolOrCoaching: string;
  city: string;
  state: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfileData;
  onSave?: (profile: UserProfileData) => void;
}

const DEFAULT_PROFILE: UserProfileData = {
  fullName: 'Abhinav Sharma',
  mobile: '+91 98765 43210',
  email: 'abhinav.sharma@example.com',
  gender: 'Male',
  dob: '2008-04-12',
  targetExam: 'IIT-JEE',
  targetYear: '2027',
  classGrade: 'Class 12th',
  schoolOrCoaching: 'Delhi Public School, Jaipur',
  city: 'Jaipur',
  state: 'Rajasthan',
};

/* ------------------------------------------------------------------ */
/*  Small field components                                             */
/* ------------------------------------------------------------------ */

function ReadField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-[#175A67]/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#175A67]" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-[#2A707C] uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-[#175A67] mt-0.5 break-words">{value || '—'}</p>
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = 'text',
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date';
  options?: string[];
}) {
  return (
    <label className="block py-2">
      <span className="text-[11px] font-semibold text-[#2A707C] uppercase tracking-wide">{label}</span>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full bg-white/80 border border-[#175A67]/20 text-[#175A67] text-sm font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#175A67]/25"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full bg-white/80 border border-[#175A67]/20 text-[#175A67] text-sm font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#175A67]/25"
        />
      )}
    </label>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-1 mt-6 first:mt-0">
      <Icon className="w-4 h-4 text-[#175A67]" />
      <h3 className="text-sm font-bold text-[#175A67]">{title}</h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main modal                                                         */
/* ------------------------------------------------------------------ */

export function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [data, setData] = useState<UserProfileData>(profile ?? DEFAULT_PROFILE);
  const [draft, setDraft] = useState<UserProfileData>(profile ?? DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const initials = data.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const startEdit = () => {
    setDraft(data);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(data);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setData(draft);
    setIsEditing(false);
    onSave?.(draft);
  };

  const update = (key: keyof UserProfileData) => (value: string) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const view = isEditing ? draft : data;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[88vh] bg-[#F8FAFC] rounded-3xl shadow-2xl border border-white/80 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#175A67] to-[#2A707C] p-6 pb-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-1.5 rounded-full hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center text-xl font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white truncate">{data.fullName}</h2>
              <p className="text-xs text-white/80 mt-0.5">{data.targetExam} · Target {data.targetYear}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold bg-white/15 text-white px-2.5 py-1 rounded-full">
                <Trophy className="w-3 h-3 text-amber-300" /> PRO ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {!isEditing ? (
            <>
              <SectionTitle icon={User} title="Personal Information" />
              <div className="divide-y divide-[#175A67]/10">
                <ReadField icon={Phone} label="Mobile Number" value={view.mobile} />
                <ReadField icon={Mail} label="Email Address" value={view.email} />
                <ReadField icon={User} label="Gender" value={view.gender} />
                <ReadField icon={Calendar} label="Date of Birth" value={view.dob} />
                <ReadField icon={MapPin} label="Location" value={`${view.city}, ${view.state}`} />
              </div>

              <SectionTitle icon={GraduationCap} title="Academic Details" />
              <div className="divide-y divide-[#175A67]/10">
                <ReadField icon={GraduationCap} label="Target Exam" value={view.targetExam} />
                <ReadField icon={Calendar} label="Target Year" value={view.targetYear} />
                <ReadField icon={BookOpen} label="Class / Grade" value={view.classGrade} />
                <ReadField icon={BookOpen} label="School / Coaching" value={view.schoolOrCoaching} />
              </div>
            </>
          ) : (
            <>
              <SectionTitle icon={User} title="Personal Information" />
              <EditField label="Full Name" value={draft.fullName} onChange={update('fullName')} />
              <EditField label="Mobile Number" value={draft.mobile} onChange={update('mobile')} type="tel" />
              <EditField label="Email Address" value={draft.email} onChange={update('email')} type="email" />
              <EditField
                label="Gender"
                value={draft.gender}
                onChange={update('gender')}
                options={['Male', 'Female', 'Other', 'Prefer not to say']}
              />
              <EditField label="Date of Birth" value={draft.dob} onChange={update('dob')} type="date" />
              <div className="grid grid-cols-2 gap-3">
                <EditField label="City" value={draft.city} onChange={update('city')} />
                <EditField label="State" value={draft.state} onChange={update('state')} />
              </div>

              <SectionTitle icon={GraduationCap} title="Academic Details" />
              <EditField
                label="Target Exam"
                value={draft.targetExam}
                onChange={update('targetExam')}
                options={['IIT-JEE', 'NEET', 'UPSC']}
              />
              <div className="grid grid-cols-2 gap-3">
                <EditField label="Target Year" value={draft.targetYear} onChange={update('targetYear')} />
                <EditField label="Class / Grade" value={draft.classGrade} onChange={update('classGrade')} />
              </div>
              <EditField
                label="School / Coaching"
                value={draft.schoolOrCoaching}
                onChange={update('schoolOrCoaching')}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#175A67]/10 bg-white/50 shrink-0 flex gap-3">
          {!isEditing ? (
            <button
              onClick={startEdit}
              className="w-full flex items-center justify-center gap-2 bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={cancelEdit}
                className="flex-1 bg-white/80 border border-[#175A67]/20 text-[#175A67] font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
