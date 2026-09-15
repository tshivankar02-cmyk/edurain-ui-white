import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  BookOpen, 
  Library, 
  Crosshair, 
  ChevronRight, 
  LayoutGrid, 
  Terminal, 
  HelpCircle, 
  Bot, 
  Users, 
  Swords, 
  Cpu, 
  FileText, 
  Sparkles, 
  X,
  AlignLeft,
  Wifi,
  ChevronDown
} from 'lucide-react';
import { UpgradeModal } from './components/Modals/UpgradeModal';
import { DoubtSolverModal } from './components/Modals/DoubtSolverModal';
import { VaultDetailModal } from './components/Modals/VaultDetailModal';
import { NotificationDrawer } from './components/Modals/NotificationDrawer';
import { CoursesView } from './components/CoursesView';
import { TestSeriesView } from './components/TestSeriesView';
import { ArenaView } from './components/ArenaView';
import { VaultResource, NotificationItem } from './types';

export function App() {
  // Navigation States
  const [activeNav, setActiveNav] = useState<'study-central' | 'pi' | 'library' | 'courses' | 'test-series' | 'arena'>('study-central');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('12th - IIT JEE');
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [isDrawerBatchOpen, setIsDrawerBatchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isDoubtSolverOpen, setIsDoubtSolverOpen] = useState(false);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultResource | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Mock Test 04 Result Published',
      description: 'You scored 148/180 in JEE Advanced All-India Mock 04. Estimated All-India Rank: #42.',
      time: '15m ago',
      read: false,
      type: 'test'
    },
    {
      id: 'n2',
      title: 'PI Doubt Answered',
      description: 'Step-by-step solution for "Carnot Engine Entropy" has been synthesized with derivation.',
      time: '1h ago',
      read: false,
      type: 'doubt'
    },
    {
      id: 'n3',
      title: '14-Day Streak Bonus',
      description: 'You earned +150 XP for completing your daily revision quota 14 days in a row.',
      time: '4h ago',
      read: true,
      type: 'streak'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const batches = ['12th - IIT JEE', '11th - IIT JEE', 'Dropper - JEE Advanced', 'NEET-UG Premier'];

  const vaultItems: VaultResource[] = [
    {
      id: 'vault-physics',
      title: 'Physics Intel',
      subject: 'Physics',
      countLabel: '12 PDFs',
      tags: ['Rotational Motion', 'Wave Optics', 'Electrodynamics'],
      iconType: 'book',
      description: 'Comprehensive high-yield notes, derivation sheets, and Irodov problem breakdowns curated by IIT Top 100 rankers.',
      downloadSize: '48.2 MB',
      rating: 4.9,
    },
    {
      id: 'vault-chemistry',
      title: 'Chemistry Intel',
      subject: 'Chemistry',
      countLabel: '3 Books',
      tags: ['Reaction Maps', 'Coordination Chem', 'Thermodynamics'],
      iconType: 'archive',
      description: 'Master organic synthesis pathways, NCERT line-by-line highlight maps, and inorganic memorization mnemonics.',
      downloadSize: '64.5 MB',
      rating: 4.8,
    },
    {
      id: 'vault-combat',
      title: 'Mock Tests',
      subject: 'Mock Tests',
      countLabel: 'LIVE NOW',
      tags: ['Full Syllabus', 'Real NTA Engine', 'AIR Predictor'],
      iconType: 'combat',
      isLive: true,
      statusText: 'LIVE NOW',
      description: 'Live 3-hour adaptive mock test mirroring actual JEE Advanced CBT interface with instant percentile and weak area diagnosis.',
      downloadSize: 'Online CBT',
      rating: 5.0,
    },
    {
      id: 'vault-math',
      title: 'Math Analytics',
      subject: 'Mathematics',
      countLabel: 'Starts in 2 hrs',
      tags: ['Coordinate Geometry', 'Calculus Drill', 'Vectors & 3D'],
      iconType: 'analytics',
      description: 'Step-by-step calculus mastery modules, graphical shortcuts, and high-difficulty algebra problem sets.',
      downloadSize: '32.1 MB',
      rating: 4.9,
    },
  ];

  const studyPlans = [
    {
      id: 'sp1',
      title: 'ONE - ON - ONE MENTORSHIP',
      subtitle: '2 Active Enrollments',
      icon: Users,
      action: () => setIsUpgradeOpen(true),
    },
    {
      id: 'sp2',
      title: 'ASK YOUR DOUBT',
      subtitle: 'Physics - Thermodynamics',
      icon: HelpCircle,
      action: () => setIsDoubtSolverOpen(true),
    },
    {
      id: 'sp3',
      title: 'AI- MENTOR',
      subtitle: '1 Resolved, 2 Pending',
      icon: Bot,
      action: () => setIsDoubtSolverOpen(true),
    }
  ];

  const filteredStudyPlans = studyPlans.filter(p => 
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVaultItems = vaultItems.filter(v =>
    !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.subject.toLowerCase().includes(searchQuery.toLowerCase()) || v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen w-full font-sans antialiased text-[#175A67] bg-transparent selection:bg-[#175A67] selection:text-[#EAE3DE]">
      
      {/* 1. DEDICATED FULLY VISIBLE VIDEO BACKGROUND CONTAINER */}
      <div className="fixed inset-0 -z-50 w-full h-full pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
          className="w-full h-full object-cover object-bottom"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 2. TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#EAE3DE]/40 backdrop-blur-md border-b border-[#175A67]/15 flex items-center justify-between px-3 sm:px-6 shadow-sm">
        
        {/* Left: Brand + Hamburger + Desktop Target Selector */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden bg-[#175A67] hover:bg-[#124853] text-[#EAE3DE] p-2 sm:p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center active:scale-95"
            title="Open Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#EAE3DE]" />
          </button>

          <div 
            onClick={() => setActiveNav('study-central')} 
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#175A67] flex items-center justify-center text-[#EAE3DE] shadow-md">
              <Sparkles className="w-4 h-4 fill-[#EAE3DE]" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#175A67]">
              Edu<span className="text-[#175A67]/90 font-black">Rain</span>
            </span>
          </div>

          {/* Desktop Batch Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsBatchOpen(!isBatchOpen)}
              className="border border-[#175A67]/30 text-[#175A67] bg-white/40 hover:bg-white/70 backdrop-blur-md rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{selectedBatch} &gt;</span>
            </button>

            {isBatchOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-[#EAE3DE]/95 backdrop-blur-2xl border border-[#175A67]/30 shadow-2xl p-2 z-50 animate-fadeIn">
                {batches.map((batch) => (
                  <button
                    key={batch}
                    onClick={() => {
                      setSelectedBatch(batch);
                      setIsBatchOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      selectedBatch === batch
                        ? 'bg-[#175A67] text-white font-bold'
                        : 'text-[#175A67] hover:bg-white/60'
                    }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Search Bar (Desktop) */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8 relative hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#2A707C] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Resources"
              className="bg-white/50 border border-[#175A67]/30 text-[#175A67] placeholder-[#2A707C] pl-10 pr-8 py-1.5 rounded-full w-full text-xs sm:text-sm focus:outline-none focus:border-[#175A67] focus:ring-2 focus:ring-[#175A67]/20 transition-all shadow-inner backdrop-blur-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#2A707C] hover:text-[#175A67]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action: Mobile Search Toggle + CTA Button + Notification + User Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 rounded-full text-[#175A67] hover:bg-white/50 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5 text-[#175A67]" />
          </button>

          {/* Upgrade CTA */}
          <button
            onClick={() => setIsUpgradeOpen(true)}
            className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] sm:text-xs px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1 shrink-0"
          >
            <span>UPGRADE TO PRO</span>
          </button>

          {/* Bell Notifications */}
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 rounded-full text-[#175A67] hover:bg-white/50 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#175A67]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981] ring-2 ring-[#EAE3DE]" />
            )}
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-3 border-l border-[#175A67]/20">
            <div className="text-right hidden sm:block leading-tight">
              <span className="text-xs font-bold text-[#175A67] tracking-wide block">Hi, ABHINAV</span>
            </div>
            <div 
              className="relative cursor-pointer" 
              onClick={() => setIsUpgradeOpen(true)}
              title="Abhinav - Target JEE 2027"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#175A67] to-[#2A707C] p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-[#EAE3DE] flex items-center justify-center text-xs font-bold text-[#175A67]">
                  AB
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#EAE3DE]" />
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Expandable Search Bar */}
      {isMobileSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-[#EAE3DE]/90 backdrop-blur-xl border-b border-[#175A67]/20 p-3 md:hidden animate-fadeIn">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#2A707C] pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Resources"
              className="bg-white/60 border border-[#175A67]/30 text-[#175A67] placeholder-[#2A707C] pl-10 pr-8 py-2 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#175A67]/20 shadow-inner"
            />
            <button 
              onClick={() => {
                setSearchQuery('');
                setIsMobileSearchOpen(false);
              }}
              className="absolute right-3 text-[#2A707C] hover:text-[#175A67] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. SLIDE-OUT MOBILE NAVIGATION DRAWER */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        {/* Drawer Panel */}
        <aside 
          className={`relative w-[280px] max-w-[85vw] h-full bg-[#EAE3DE]/95 backdrop-blur-2xl border-r border-[#175A67]/30 shadow-2xl flex flex-col justify-between p-5 transform transition-transform duration-300 ease-out ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header with Brand & Close */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#175A67]/15">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#175A67] flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4 fill-white" />
                </div>
                <span className="text-lg font-bold text-[#175A67]">
                  Edu<span className="font-black">Rain</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-full bg-white/60 text-[#175A67] hover:bg-white transition-colors"
                title="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile User Card & Batch Selector */}
            <div className="mb-5 p-3 rounded-2xl bg-white/50 border border-[#175A67]/20 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#2A707C]">USER PROFILE</span>
                <span className="text-[10px] bg-[#10B981]/20 text-[#059669] font-bold px-2 py-0.5 rounded-full">PRO ACTIVE</span>
              </div>
              <div className="text-xs font-bold text-[#175A67]">Abhinav Sharma</div>
              
              {/* Batch Selector inside mobile drawer */}
              <div className="mt-2 relative">
                <button
                  onClick={() => setIsDrawerBatchOpen(!isDrawerBatchOpen)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/70 border border-[#175A67]/20 text-xs font-semibold text-[#175A67]"
                >
                  <span>{selectedBatch}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {isDrawerBatchOpen && (
                  <div className="mt-1 w-full rounded-xl bg-[#EAE3DE] border border-[#175A67]/30 shadow-lg p-1">
                    {batches.map((b) => (
                      <button
                        key={b}
                        onClick={() => {
                          setSelectedBatch(b);
                          setIsDrawerBatchOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedBatch === b ? 'bg-[#175A67] text-white' : 'text-[#175A67] hover:bg-white/60'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nav Group: MENU */}
            <div className="text-[11px] font-bold text-[#2A707C] px-2 mb-2 tracking-wider uppercase">
              MENU
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveNav('study-central');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'study-central'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Study Central</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('pi');
                  setIsDoubtSolverOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'pi'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>PI</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('library');
                  setSelectedVaultItem(vaultItems[0]);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'library'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Library className="w-4 h-4" />
                <span>LIBRARY</span>
              </button>
            </div>

            {/* Nav Group: YOUR STUDY */}
            <div className="text-[11px] font-bold text-[#2A707C] px-2 mt-5 mb-2 tracking-wider uppercase">
              YOUR STUDY
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveNav('courses');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'courses'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>COURSES</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('test-series');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'test-series'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>TEST SERIES</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('arena');
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full font-semibold rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'arena'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>ARENA</span>
              </button>
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="pt-4 border-t border-[#175A67]/15">
            <button
              onClick={() => {
                setIsUpgradeOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              className="w-full bg-[#175A67] hover:bg-[#124853] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span className="text-amber-400">★</span>
              <span>UPGRADE TO PRO</span>
            </button>
          </div>
        </aside>
      </div>

      {/* 4. DESKTOP FIXED SIDEBAR */}
      <div className="pt-16 flex">
        
        <aside className="hidden lg:flex fixed top-16 left-0 bottom-0 w-[250px] backdrop-blur-md bg-[#EAE3DE]/35 border-r border-[#175A67]/20 p-4 z-30 flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            {/* Group: MENU */}
            <div className="text-xs font-bold text-[#2A707C] px-3 mb-2 tracking-wider uppercase">
              MENU
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveNav('study-central')}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'study-central'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Study Central</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('pi');
                  setIsDoubtSolverOpen(true);
                }}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'pi'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>PI</span>
              </button>

              <button
                onClick={() => {
                  setActiveNav('library');
                  setSelectedVaultItem(vaultItems[0]);
                }}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'library'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Library className="w-4 h-4" />
                <span>LIBRARY</span>
              </button>
            </div>

            {/* Group: YOUR STUDY */}
            <div className="text-xs font-bold text-[#2A707C] px-3 mt-6 mb-2 tracking-wider uppercase">
              YOUR STUDY
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveNav('courses')}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'courses'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>COURSES</span>
              </button>

              <button
                onClick={() => setActiveNav('test-series')}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'test-series'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>TEST SERIES</span>
              </button>

              <button
                onClick={() => setActiveNav('arena')}
                className={`w-full font-semibold rounded-xl px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeNav === 'arena'
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'text-[#175A67] hover:bg-[#175A67]/10'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>ARENA</span>
              </button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-4">
            <button
              onClick={() => setIsUpgradeOpen(true)}
              className="w-full bg-[#175A67] hover:bg-[#124853] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span className="text-amber-400">★</span>
              <span>UPGRADE TO PRO</span>
            </button>
          </div>
        </aside>

        {/* 5. MAIN DASHBOARD BODY */}
        <main className="flex-1 lg:ml-[250px] px-4 sm:px-8 py-5 sm:py-6 max-w-[1600px] w-full overflow-hidden">
          
          {/* Active View Switching */}
          {activeNav === 'courses' ? (
            <CoursesView 
              onBack={() => setActiveNav('study-central')}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
            />
          ) : activeNav === 'test-series' ? (
            <TestSeriesView 
              onBack={() => setActiveNav('study-central')}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
            />
          ) : activeNav === 'arena' ? (
            <ArenaView 
              onBack={() => setActiveNav('study-central')}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
            />
          ) : (
            <>
              {/* Subheader & Wi-Fi Sync Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="text-[#175A67] font-medium text-base sm:text-lg">
                    Welcome back, operative. Continue your mission.
                  </div>
                  <div className="text-xs text-[#2A707C]">
                    Target: IIT-JEE Advanced • Current Batch: <span className="font-bold text-[#175A67]">{selectedBatch}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-[#175A67]/20 text-[11px] text-[#175A67] font-semibold self-start sm:self-auto backdrop-blur-md">
                  <Wifi className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Wi-Fi Preview Active: 192.168.29.39:5173</span>
                </div>
              </div>

              {/* Study Plans Row */}
              <section className="mb-8 sm:mb-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <Cpu className="w-5 h-5 text-[#175A67]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#175A67]">Study Plans</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredStudyPlans.map((plan) => {
                    const IconComponent = plan.icon;
                    return (
                      <div 
                        key={plan.id}
                        onClick={plan.action}
                        className="backdrop-blur-md bg-[#EAE3DE]/35 hover:bg-[#EAE3DE]/50 border border-[#175A67]/20 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[160px] active:scale-[0.98]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#175A67] text-white rounded-xl flex items-center justify-center shadow-md">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#175A67] transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#175A67] text-base sm:text-lg mt-3 leading-tight">
                            {plan.title}
                          </h3>
                          <p className="text-[#2A707C] text-xs sm:text-sm mt-1">{plan.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Library Row */}
              <section className="pb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <AlignLeft className="w-5 h-5 text-[#175A67]" />
                    <h2 className="text-lg sm:text-xl font-bold text-[#175A67]">Library</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedVaultItem(vaultItems[0])}
                    className="text-xs sm:text-sm font-semibold text-[#175A67] hover:underline flex items-center gap-1"
                  >
                    <span>View All Resources</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredVaultItems.map((item) => {
                    const iconMap: Record<string, any> = {
                      book: BookOpen,
                      archive: Library,
                      combat: Swords,
                      analytics: Crosshair
                    };
                    const IconComp = iconMap[item.iconType] || BookOpen;

                    return (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedVaultItem(item)}
                        className="backdrop-blur-md bg-[#EAE3DE]/35 hover:bg-[#EAE3DE]/50 border border-[#175A67]/20 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-between min-h-[190px] sm:min-h-[220px] active:scale-[0.98]"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#175A67] text-white rounded-2xl flex items-center justify-center shadow-md mb-2 sm:mb-3">
                          <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-[#175A67] text-center text-base sm:text-lg">{item.title}</h3>
                          <p className={`text-xs text-center mt-1 ${
                            item.isLive ? 'text-[#10B981] font-bold' : 'text-[#2A707C]'
                          }`}>
                            {item.countLabel}
                          </p>
                        </div>
                        <span className="text-[#175A67] text-xs text-center block mt-2 sm:mt-3 font-semibold hover:underline">
                          Enter Library &gt;
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

        </main>
      </div>

      {/* 6. MODALS */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      />

      <DoubtSolverModal
        isOpen={isDoubtSolverOpen}
        onClose={() => setIsDoubtSolverOpen(false)}
      />

      <VaultDetailModal
        item={selectedVaultItem}
        onClose={() => setSelectedVaultItem(null)}
        onOpenUpgrade={() => {
          setSelectedVaultItem(null);
          setIsUpgradeOpen(true);
        }}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
      />

    </div>
  );
}

export default App;
