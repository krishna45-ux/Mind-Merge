import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Home, Folder, Settings, FileText, UploadCloud, FileType2, FileText as FileWord, Menu, X, Sparkles, Upload, CheckCircle2, LogOut } from 'lucide-react';

interface TeacherDashboardProps {
  onGenerate: () => void;
  onPublishDirectly?: () => void;
  onLogout?: () => void;
}

export default function TeacherDashboard({ onGenerate, onPublishDirectly, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardTab, setDashboardTab] = useState('ai-generation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-shell flex h-screen font-sans text-slate-800 relative"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 panel-surface border-r border-white/60 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="font-display text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="headline-gradient">MindMerge</span> <span className="text-slate-500">Teacher</span>
          </h1>
          <button className="md:hidden text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <button onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'dashboard' ? 'text-blue-700 bg-blue-50/80 shadow-sm ring-1 ring-blue-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Home className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`} /> Dashboard
          </button>
          <button onClick={() => { setActiveTab('classes'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'classes' ? 'text-blue-700 bg-blue-50/80 shadow-sm ring-1 ring-blue-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <FileText className={`w-5 h-5 ${activeTab === 'classes' ? 'text-blue-600' : 'text-slate-400'}`} /> Classes
          </button>
          <button onClick={() => { setActiveTab('resources'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'resources' ? 'text-blue-700 bg-blue-50/80 shadow-sm ring-1 ring-blue-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Folder className={`w-5 h-5 ${activeTab === 'resources' ? 'text-blue-600' : 'text-slate-400'}`} /> Resources
          </button>
          <button onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'settings' ? 'text-blue-700 bg-blue-50/80 shadow-sm ring-1 ring-blue-100/50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}`} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <LogOut className="w-5 h-5 text-slate-400" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 panel-surface border-b border-white/60 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-slate-700 hidden sm:block">Teacher Workspace</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Dr. Anjali Sharma</span>
              <img src="https://picsum.photos/seed/anjali/32/32" alt="Profile" className="w-8 h-8 rounded-full ring-2 ring-slate-100" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-transparent">
          {activeTab === 'dashboard' && (
            <div className="max-w-5xl mx-auto mesh-card rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.1)] border border-white/70 overflow-hidden">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-white/70 bg-white/40 px-4 md:px-8 pt-2 hide-scrollbar">
                <button 
                  onClick={() => setDashboardTab('ai-generation')}
                  className={`whitespace-nowrap px-4 md:px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 ${dashboardTab === 'ai-generation' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Sparkles className="w-4 h-4" /> AI Master Note
                </button>
                <button 
                  onClick={() => setDashboardTab('raw-upload')}
                  className={`whitespace-nowrap px-4 md:px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 ${dashboardTab === 'raw-upload' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Upload className="w-4 h-4" /> Raw Notes Upload
                </button>
                <button 
                  onClick={() => setDashboardTab('settings')}
                  className={`whitespace-nowrap px-4 md:px-6 py-4 text-sm font-semibold transition-colors flex items-center gap-2 ${dashboardTab === 'settings' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Settings className="w-4 h-4" /> Dashboard Settings
                </button>
              </div>

              <div className="p-6 md:p-10">
                {dashboardTab === 'ai-generation' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 md:space-y-10">
                      <div className="panel-dark rounded-[1.75rem] p-6 md:p-7 text-white relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                        <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3">Creative Workflow</p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl md:text-3xl font-bold">Shape source material into a polished release</h3>
                            <p className="mt-2 max-w-2xl text-slate-300">Use AI to draft, then review tone, structure, and coverage before students ever see it.</p>
                          </div>
                          <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                            4 source files ready
                          </div>
                        </div>
                      </div>
                      {/* Topic Input */}
                      <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Topic / Subject Matter</label>
                      <input 
                        type="text" 
                        defaultValue="Introduction to Artificial Neural Networks"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 text-base md:text-lg shadow-sm"
                      />
                    </div>

                    {/* Upload Slots */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-slate-700">Source Materials</label>
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">Up to 5 files</span>
                      </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
                        {/* Slot 1: PPT */}
                        <div className="border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileType2 className="w-6 h-6 md:w-7 md:h-7" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 text-center truncate w-full">Lecture_Slides.pptx</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-blue-500 w-[90%] rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold tracking-wider">90%</span>
                        </div>

                        {/* Slot 2: PDF */}
                        <div className="border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-red-100 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6 md:w-7 md:h-7" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 text-center truncate w-full">Note_1_Basics.pdf</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold tracking-wider">DONE</span>
                        </div>

                        {/* Slot 3: DOC */}
                        <div className="border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileWord className="w-6 h-6 md:w-7 md:h-7" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 text-center truncate w-full">Deep_Learning.doc</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold tracking-wider">DONE</span>
                        </div>

                        {/* Slot 4: PDF */}
                        <div className="border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-red-100 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6 md:w-7 md:h-7" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 text-center truncate w-full">Network_Arch.pdf</span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold tracking-wider">60%</span>
                        </div>

                        {/* Slot 5: Empty */}
                        <button className="border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 group hover:-translate-y-1 min-h-[140px]">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                            <UploadCloud className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <span className="text-xs font-semibold text-slate-500 text-center group-hover:text-blue-700">Drag & Drop<br/>or Click</span>
                        </button>
                      </div>
                    </div>

                    {/* Settings & Action */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pt-6 border-t border-slate-100 gap-6">
                      <div className="space-y-4 flex-1 w-full max-w-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <label className="text-sm font-semibold text-slate-700 whitespace-nowrap sm:w-28">Focus Areas:</label>
                          <select className="flex-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all">
                            <option>Key Definitions, Important Formulas, Application Examples</option>
                            <option>Historical Context, Core Theories, Criticisms</option>
                          </select>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <label className="text-sm font-semibold text-slate-700 whitespace-nowrap sm:w-28">Output Format:</label>
                          <select className="flex-1 w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all">
                            <option>Study Guide + Imp Questions + Quick Quiz</option>
                            <option>Comprehensive Notes Only</option>
                            <option>Flashcards & Summary</option>
                          </select>
                        </div>
                      </div>
                      
                      <button 
                        onClick={onGenerate}
                        className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" /> Generate AI Master Note
                      </button>
                    </div>
                  </motion.div>
                )}

                {dashboardTab === 'raw-upload' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">Direct Note Upload</h3>
                      <p className="text-slate-500 text-sm">Upload your existing notes directly to the student hub without AI processing.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Note Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Chapter 4: Backpropagation"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 text-base md:text-lg shadow-sm"
                      />
                    </div>

                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/30 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer group">
                      <div className="w-16 h-16 rounded-full bg-white shadow-sm group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="text-center">
                        <span className="text-base font-semibold text-slate-700 group-hover:text-blue-700 block mb-1">Drag & Drop your files here</span>
                        <span className="text-sm text-slate-500">Supports PDF, DOCX, PPTX (Max 50MB)</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                      <button 
                        onClick={onPublishDirectly}
                        className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-xl font-bold tracking-wide shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" /> Upload & Publish Directly
                      </button>
                    </div>
                  </motion.div>
                )}

                {dashboardTab === 'settings' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Dashboard Preferences</h3>
                    
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <div>
                          <h4 className="font-semibold text-slate-800">Default AI Model</h4>
                          <p className="text-sm text-slate-500 mt-1">Select the default model for generating notes.</p>
                        </div>
                        <select className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                          <option>Gemini 1.5 Pro</option>
                          <option>Gemini 1.5 Flash</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <div>
                          <h4 className="font-semibold text-slate-800">Auto-Publish</h4>
                          <p className="text-sm text-slate-500 mt-1">Automatically publish raw notes upon upload.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mesh-card rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.1)] border border-white/70 p-6 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">My Classes</h2>
                <button onClick={() => showToast('Class created successfully')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm hover:shadow-md active:scale-95">+ Create New Class</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-slate-50/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors relative z-10">CS 401: Artificial Intelligence</h3>
                  <p className="text-slate-500 text-sm mt-2 font-medium relative z-10">45 Students &bull; Fall Semester</p>
                  <div className="mt-6 flex items-center gap-3 relative z-10">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/s1/32/32" alt="Student" />
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/s2/32/32" alt="Student" />
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/s3/32/32" alt="Student" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+42</div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 hover:underline">View Roster</span>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-slate-50/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors relative z-10">CS 405: Machine Learning</h3>
                  <p className="text-slate-500 text-sm mt-2 font-medium relative z-10">32 Students &bull; Fall Semester</p>
                  <div className="mt-6 flex items-center gap-3 relative z-10">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/s4/32/32" alt="Student" />
                      <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/s5/32/32" alt="Student" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+30</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 hover:underline">View Roster</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mesh-card rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.1)] border border-white/70 p-6 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Resource Library</h2>
                <button onClick={() => showToast('Resource uploaded successfully')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Upload Resource
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer gap-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"><FileText className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-1">Neural_Networks_Syllabus.pdf</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Added 2 days ago &bull; 2.4 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <button onClick={() => showToast('Downloading Neural_Networks_Syllabus.pdf')} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">Download</button>
                    <button onClick={() => showToast('Viewing Neural_Networks_Syllabus.pdf')} className="text-blue-600 text-sm font-bold hover:underline sm:opacity-0 group-hover:opacity-100 transition-opacity">View</button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer gap-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"><FileType2 className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                    <div>
                      <p className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-1">Week_1_Intro_Slides.pptx</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">Added 1 week ago &bull; 5.1 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <button onClick={() => showToast('Downloading Week_1_Intro_Slides.pptx')} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">Download</button>
                    <button onClick={() => showToast('Viewing Week_1_Intro_Slides.pptx')} className="text-blue-600 text-sm font-bold hover:underline sm:opacity-0 group-hover:opacity-100 transition-opacity">View</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mesh-card rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.1)] border border-white/70 p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Account Settings</h2>
              <div className="max-w-2xl space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                  <div className="relative group cursor-pointer">
                    <img src="https://picsum.photos/seed/anjali/100/100" alt="Profile" className="w-24 h-24 rounded-full ring-4 ring-slate-50 shadow-md" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Profile Picture</h3>
                    <p className="text-sm text-slate-500 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                    <button onClick={() => showToast('Profile picture updated')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">Upload New</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" defaultValue="Dr. Anjali Sharma" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" defaultValue="anjali.sharma@university.edu" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 shadow-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
                    <input type="text" defaultValue="Computer Science" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 shadow-sm" />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Notification Preferences</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Email Notifications</p>
                        <p className="text-sm text-slate-500">Receive emails when AI notes are generated</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white transition-colors cursor-pointer">
                      <div>
                        <p className="font-bold text-slate-800">Student Activity</p>
                        <p className="text-sm text-slate-500">Get notified when students complete quizzes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button onClick={() => showToast('Settings saved successfully')} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95">Save Changes</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
