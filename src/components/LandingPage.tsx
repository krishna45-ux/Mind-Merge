import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BookOpen, GraduationCap, Sparkles, ArrowRight, X, Mail, Lock, User, Layers, Target } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: 'teacher' | 'student') => void;
}

export default function LandingPage({ onSelectRole }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [modalRole, setModalRole] = useState<'teacher' | 'student'>('student');

  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleRoleClick = (role: 'teacher' | 'student') => {
    setModalRole(role);
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    onSelectRole(modalRole);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-shell min-h-screen flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="h-20 panel-surface border-b border-white/60 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-lagoon-500 via-violet-400 to-sun-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200/60">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-black tracking-tight">
            <span className="headline-gradient">MindMerge AI</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-blue-600 transition-colors">How it Works</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLoginClick}
            className="hidden md:block font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-grid flex-1 flex flex-col items-center justify-center pt-20 pb-32 px-6 md:px-12 relative overflow-hidden min-h-[92vh]">
        {/* Parallax Background decorations */}
        <motion.div style={{ y: yBg1 }} className="absolute top-1/5 left-[8%] w-[30rem] h-[30rem] bg-lagoon-300/30 rounded-full blur-3xl -z-10 mix-blend-multiply"></motion.div>
        <motion.div style={{ y: yBg2 }} className="absolute bottom-[8%] right-[6%] w-[28rem] h-[28rem] bg-sun-300/35 rounded-full blur-3xl -z-10 mix-blend-multiply"></motion.div>
        <div className="absolute inset-x-0 top-24 mx-auto max-w-6xl h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent -z-10"></div>
        <div className="absolute top-32 right-[14%] hidden lg:block w-28 h-28 rounded-[2rem] border border-white/60 bg-white/50 backdrop-blur-xl shadow-lg rotate-12 -z-10"></div>
        <div className="absolute bottom-24 left-[12%] hidden lg:block w-16 h-16 rounded-full border border-white/60 bg-white/60 backdrop-blur-xl shadow-lg -z-10"></div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl mx-auto mb-16 z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full panel-surface text-slate-700 font-semibold text-sm mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Notes, diagrams, quizzes, and flashcards in one learning studio</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[0.95]">
              Turn classroom material into a <span className="headline-gradient">living study experience</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              MindMerge AI gives teachers a cinematic workflow for publishing learning content and gives students a hub that feels crafted for curiosity, not just coursework.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-600">
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm ring-1 ring-white/70">AI lesson synthesis</span>
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm ring-1 ring-white/70">Interactive practice</span>
              <span className="rounded-full bg-white/70 px-4 py-2 shadow-sm ring-1 ring-white/70">Teacher review controls</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 z-10">
          {/* Teacher Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleRoleClick('teacher')}
            className="group mesh-card rounded-[2rem] p-8 md:p-10 border border-white/70 shadow-[0_28px_80px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-lagoon-300/10 opacity-80"></div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-[0.2em] uppercase">Creator Mode</div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-lagoon-500 to-blue-600 text-white rounded-[1.35rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-200/70">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-3">Build a studio for your class</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-base">
                Upload lectures, handouts, and raw notes. Shape them into polished master notes, guided review questions, and publish-ready student materials.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 text-sm font-semibold text-slate-700">
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">Review drafts before publishing</div>
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">Mix raw uploads with AI output</div>
              </div>
              <div className="flex items-center text-lagoon-500 font-bold group-hover:translate-x-2 transition-transform">
                Enter Teacher Portal <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.div>

          {/* Student Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => handleRoleClick('student')}
            className="group mesh-card rounded-[2rem] p-8 md:p-10 border border-white/70 shadow-[0_28px_80px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-sun-300/10 opacity-80"></div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 text-slate-700 text-xs font-bold tracking-[0.2em] uppercase shadow-sm">Learner Mode</div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-sun-500 to-rose-400 text-white rounded-[1.35rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-200/70">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-3">Study inside a guided hub</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-base">
                Move from reading to practicing without friction. Notes, quizzes, flashcards, and AI help sit together in one focused learning flow.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 text-sm font-semibold text-slate-700">
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">Ask AI while you revise</div>
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">Flip cards and test recall</div>
              </div>
              <div className="flex items-center text-sun-500 font-bold group-hover:translate-x-2 transition-transform">
                Enter Student Hub <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 w-full relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">A learning product with stage presence</h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">Every screen is designed to guide momentum, from teacher curation to student recall practice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -6 }} className="mesh-card p-8 rounded-[2rem] border border-white/70 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-lagoon-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-200/70">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-slate-800">Editorial-grade AI notes</h3>
              <p className="text-slate-600 leading-relaxed">Transform rough source files into cleaner, more teachable content with stronger structure and clearer emphasis.</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="mesh-card p-8 rounded-[2rem] border border-white/70 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-sun-500 to-rose-400 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-200/70">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-slate-800">Memory-first study tools</h3>
              <p className="text-slate-600 leading-relaxed">Flashcards and question banks feel built into the lesson, not bolted on after the fact.</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="mesh-card p-8 rounded-[2rem] border border-white/70 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-lagoon-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-200/70">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-slate-800">Practice with built-in feedback</h3>
              <p className="text-slate-600 leading-relaxed">Students can read, answer, flip, and ask for help without breaking their concentration.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 text-white w-full relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="panel-dark section-glow text-center mb-20 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Three steps, one creative workflow</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Three simple steps to revolutionize your classroom.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
              <span className="rounded-full bg-white/10 px-4 py-2">Upload source material</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Review AI output</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Publish to learners</span>
            </div>
          </div>
          <div className="panel-dark rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-lagoon-500/20 via-white/20 to-sun-500/20 -translate-y-1/2 z-0"></div>
            
            {/* Step 1 */}
            <div className="flex-1 text-center z-10 relative">
              <div className="w-20 h-20 mx-auto bg-white/10 border border-white/10 text-lagoon-300 rounded-[1.75rem] flex items-center justify-center text-3xl font-black mb-6 shadow-xl">1</div>
              <h3 className="text-2xl font-bold mb-3">Upload</h3>
              <p className="text-slate-400 leading-relaxed">Teachers upload their raw lecture materials, PDFs, or presentations.</p>
            </div>
            {/* Step 2 */}
            <div className="flex-1 text-center z-10 relative">
              <div className="w-20 h-20 mx-auto bg-white/10 border border-white/10 text-violet-400 rounded-[1.75rem] flex items-center justify-center text-3xl font-black mb-6 shadow-xl">2</div>
              <h3 className="text-2xl font-bold mb-3">Generate</h3>
              <p className="text-slate-400 leading-relaxed">MindMerge AI processes the content and creates comprehensive study guides.</p>
            </div>
            {/* Step 3 */}
            <div className="flex-1 text-center z-10 relative">
              <div className="w-20 h-20 mx-auto bg-white/10 border border-white/10 text-sun-300 rounded-[1.75rem] flex items-center justify-center text-3xl font-black mb-6 shadow-xl">3</div>
              <h3 className="text-2xl font-bold mb-3">Learn</h3>
              <p className="text-slate-400 leading-relaxed">Students access their personalized hub to study, practice, and succeed.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 text-sm relative z-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-lagoon-500" />
          <span className="font-display font-bold text-slate-800 text-lg">MindMerge AI</span>
        </div>
        <p>&copy; {new Date().getFullYear()} MindMerge AI. All rights reserved.</p>
      </footer>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md mesh-card rounded-[2rem] shadow-2xl overflow-hidden border border-white/70"
            >
              <div className="p-8">
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {authMode === 'login' ? 'Welcome back' : 'Create an account'}
                  </h3>
                  <p className="text-slate-500">
                    {authMode === 'login' 
                      ? 'Enter your details to access your portal.' 
                      : 'Sign up to start transforming your learning experience.'}
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-5">
                  {/* Role Selector */}
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setModalRole('teacher')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        modalRole === 'teacher' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" /> Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalRole('student')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        modalRole === 'student' 
                          ? 'bg-white text-orange-600 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" /> Student
                    </button>
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="email" 
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="password" 
                        required
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all ${
                      modalRole === 'teacher' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    {authMode === 'login' ? 'Log In' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                  {authMode === 'login' ? (
                    <p>
                      Don't have an account?{' '}
                      <button onClick={() => setAuthMode('signup')} className="text-blue-600 font-semibold hover:underline">
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{' '}
                      <button onClick={() => setAuthMode('login')} className="text-blue-600 font-semibold hover:underline">
                        Log in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
