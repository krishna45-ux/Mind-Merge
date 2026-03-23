import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Sparkles, BookOpen, HelpCircle, Target, Layers, ChevronRight, CheckCircle2, X, Send, Menu, LogOut } from 'lucide-react';

interface StudentHubProps {
  onLogout?: () => void;
}

export default function StudentHub({ onLogout }: StudentHubProps) {
  const [activeTab, setActiveTab] = useState('master-note');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: 'Hi Rahul! I am your AI study assistant. What would you like to know about Artificial Neural Networks?' }
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setChatHistory([...chatHistory, { role: 'user', content: chatMessage }]);
    setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'That is a great question! In simple terms, an Artificial Neural Network (ANN) is inspired by how the human brain works. It uses interconnected nodes (like neurons) to process information and learn patterns from data.' }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-shell flex flex-col h-screen font-sans text-slate-800"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl font-medium flex items-center gap-2"
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

      {/* Header */}
      <header className="h-16 panel-surface border-b border-white/60 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3 md:gap-6">
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-black tracking-tight flex items-center gap-2">
            <span className="headline-gradient hidden sm:block">MindMerge</span>
            <span className="bg-gradient-to-r from-sun-500 to-rose-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <h2 className="text-base md:text-lg font-bold text-slate-700 hidden sm:block">Student Learning Hub</h2>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-3 md:pl-5 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Rahul Kumar</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Class 10-A</p>
            </div>
            <img src="https://picsum.photos/seed/rahul/32/32" alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-white shadow-sm" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Sidebar - Navigation */}
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 md:w-72 panel-surface border-r border-white/60 flex flex-col py-4 md:py-6 shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl md:shadow-[1px_0_10px_rgba(0,0,0,0.02)]`}>
          <div className="flex items-center justify-between px-4 mb-4 md:hidden">
            <h2 className="font-bold text-slate-800">Menu</h2>
            <button className="text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 md:gap-3 px-4">
            <button 
              onClick={() => { setActiveTab('master-note'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl font-bold transition-all border ${activeTab === 'master-note' ? 'text-orange-700 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200'}`}
            >
              <BookOpen className={`w-5 h-5 ${activeTab === 'master-note' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span>Master Note</span>
            </button>
            <button 
              onClick={() => { setActiveTab('important-questions'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl font-bold transition-all border ${activeTab === 'important-questions' ? 'text-orange-700 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200'}`}
            >
              <HelpCircle className={`w-5 h-5 ${activeTab === 'important-questions' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span>Important Questions</span>
            </button>
            <button 
              onClick={() => { setActiveTab('practice-quiz'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl font-bold transition-all border ${activeTab === 'practice-quiz' ? 'text-orange-700 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200'}`}
            >
              <Target className={`w-5 h-5 ${activeTab === 'practice-quiz' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span>Practice Quiz</span>
            </button>
            <button 
              onClick={() => { setActiveTab('flashcards'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl font-bold transition-all border ${activeTab === 'flashcards' ? 'text-orange-700 bg-gradient-to-r from-orange-50 to-rose-50 border-orange-200 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200'}`}
            >
              <Layers className={`w-5 h-5 ${activeTab === 'flashcards' ? 'text-orange-500' : 'text-slate-400'}`} />
              <span>Flashcards</span>
            </button>
          </nav>

          {/* Progress Card in Sidebar */}
          <div className="px-4 mt-auto pt-8">
            <div className="panel-dark rounded-[1.75rem] p-5 text-white shadow-lg relative overflow-hidden mb-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h4 className="font-bold text-lg mb-1 relative z-10">Your Progress</h4>
              <p className="text-slate-300 text-sm mb-4 relative z-10">Artificial Neural Networks</p>
              <div className="w-full bg-slate-700/50 rounded-full h-2.5 mb-2 relative z-10 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full w-[65%]"></div>
              </div>
              <p className="text-right text-xs font-bold text-emerald-400 relative z-10">65% Completed</p>
            </div>
            
            <button onClick={onLogout} className="w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl font-bold transition-all border text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent hover:border-slate-200">
              <LogOut className="w-5 h-5 text-slate-400" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right Panel - Reading Area */}
        <section className="flex-1 overflow-y-auto bg-transparent relative">
          <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-8 pb-40">
            
            <AnimatePresence mode="wait">
              {activeTab === 'master-note' && (
                <motion.div key="master-note" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {/* Note Header */}
                  <div className="mb-10 md:mb-12 rounded-[2rem] mesh-card p-8 md:p-10 border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md uppercase tracking-wide">Published</span>
                      <span className="text-sm font-medium text-slate-500">Updated today</span>
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Master Note: Introduction to Artificial Neural Networks</h1>
                    
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
                      <img src="https://picsum.photos/seed/anjali/32/32" alt="Dr. Anjali Sharma" className="w-10 h-10 md:w-12 md:h-12 rounded-full ring-4 ring-white shadow-sm" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-slate-800 text-base md:text-lg leading-none">Dr. Anjali Sharma</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">Computer Science Dept.</p>
                      </div>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="prose prose-lg md:prose-xl prose-slate max-w-none rounded-[2rem] bg-white/70 backdrop-blur-xl p-8 md:p-10 border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg shadow-sm">1</div>
                      Core Concepts
                    </h2>
                    <ul className="list-disc pl-6 space-y-4 mb-12 text-slate-700 leading-relaxed marker:text-orange-400">
                      <li>ANNs are computing systems inspired by the biological neural networks that constitute animal brains.</li>
                      <li>An ANN is based on a collection of connected units or nodes called artificial neurons.</li>
                      <li>Each connection, like the synapses in a biological brain, can transmit a signal to other neurons.</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg shadow-sm">2</div>
                      Architecture
                    </h2>
                    <ul className="list-disc pl-6 space-y-4 mb-12 text-slate-700 leading-relaxed marker:text-orange-400">
                      <li><strong>Input Layer:</strong> Receives the initial data.</li>
                      <li><strong>Hidden Layers:</strong> Intermediate layers where complex computations and feature extraction occur.</li>
                      <li><strong>Output Layer:</strong> Produces the final result or prediction.</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg shadow-sm">3</div>
                      Activation Functions
                    </h2>
                    <div className="border border-slate-200 rounded-3xl p-8 bg-white flex flex-col items-center justify-center h-64 text-slate-400 italic shadow-sm mb-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50"></div>
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <Sparkles className="w-10 h-10 text-orange-400" />
                      </div>
                      <span className="relative z-10 font-medium text-slate-500">Interactive Diagram: Activation Functions</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'important-questions' && (
                <motion.div key="important-questions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Important Questions</h2>
                    <p className="text-slate-500 font-medium">Review these key Q&A pairs to test your understanding.</p>
                  </div>
                  
                  <div className="mesh-card border border-white/70 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">Q1</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg md:text-xl mb-3">Explain the concept of a Perceptron.</h4>
                        <div className="p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-slate-700 leading-relaxed">A perceptron is the fundamental unit of a neural network, acting as a linear classifier. It takes multiple inputs, applies weights to them, sums them up, and passes the result through an activation function to produce an output.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mesh-card border border-white/70 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">Q2</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg md:text-xl mb-3">Why are activation functions necessary?</h4>
                        <div className="p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-slate-700 leading-relaxed">Activation functions introduce non-linearity into the network. Without them, no matter how many layers the network has, it would still behave like a single-layer linear model, making it unable to learn complex patterns.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'practice-quiz' && (
                <motion.div key="practice-quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Practice Quiz</h2>
                    <p className="text-slate-500 font-medium">Test your knowledge with these multiple-choice questions.</p>
                  </div>

                  <div className="mesh-card border border-white/70 rounded-[2rem] p-6 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Question 1 of 5</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Medium</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xl mb-6">Which of the following is NOT a common activation function?</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setSelectedAnswer(0)}
                        className={`w-full text-left p-4 border-2 rounded-2xl transition-all font-medium flex items-center justify-between ${selectedAnswer === 0 ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-slate-700'}`}
                      >
                        <span>A. ReLU</span>
                        <div className={`w-6 h-6 rounded-full border-2 ${selectedAnswer === 0 ? 'border-rose-500 bg-rose-500' : 'border-slate-200'}`}></div>
                      </button>
                      <button 
                        onClick={() => setSelectedAnswer(1)}
                        className={`w-full text-left p-4 border-2 rounded-2xl transition-all font-medium flex items-center justify-between ${selectedAnswer === 1 ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-slate-700'}`}
                      >
                        <span>B. Sigmoid</span>
                        <div className={`w-6 h-6 rounded-full border-2 ${selectedAnswer === 1 ? 'border-rose-500 bg-rose-500' : 'border-slate-200'}`}></div>
                      </button>
                      <button 
                        onClick={() => setSelectedAnswer(2)}
                        className={`w-full text-left p-4 border-2 rounded-2xl transition-all font-bold flex items-center justify-between shadow-sm ${selectedAnswer === 2 ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-slate-700'}`}
                      >
                        <span>C. Linear Regression</span>
                        {selectedAnswer === 2 ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>}
                      </button>
                      <button 
                        onClick={() => setSelectedAnswer(3)}
                        className={`w-full text-left p-4 border-2 rounded-2xl transition-all font-medium flex items-center justify-between ${selectedAnswer === 3 ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-slate-700'}`}
                      >
                        <span>D. Tanh</span>
                        <div className={`w-6 h-6 rounded-full border-2 ${selectedAnswer === 3 ? 'border-rose-500 bg-rose-500' : 'border-slate-200'}`}></div>
                      </button>
                    </div>
                    
                    {selectedAnswer !== null && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <p className="text-slate-700 font-medium">
                          {selectedAnswer === 2 ? (
                            <span className="text-emerald-600 font-bold">Correct!</span>
                          ) : (
                            <span className="text-rose-600 font-bold">Incorrect.</span>
                          )} Linear Regression is a machine learning algorithm, not an activation function used within neural networks.
                        </p>
                      </motion.div>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                      <button onClick={() => showToast('Next Question loaded')} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                        Next Question <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'flashcards' && (
                <motion.div key="flashcards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Flashcards</h2>
                    <p className="text-slate-500 font-medium">Flip to reveal the answers and memorize key terms.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Flashcard 1 */}
                    <div className="group perspective-1000 h-64 cursor-pointer">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg border border-white/10">
                          <span className="absolute top-6 left-6 text-xs font-bold text-white/60 uppercase tracking-wider">Term</span>
                          <h3 className="text-3xl font-bold text-white">Backpropagation</h3>
                          <div className="absolute bottom-6 right-6 text-white/60">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg border border-slate-200">
                          <span className="absolute top-6 left-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Definition</span>
                          <p className="text-lg font-medium text-slate-700">An algorithm used to calculate the gradient of the loss function with respect to the weights in an ANN.</p>
                        </div>
                      </div>
                    </div>

                    {/* Flashcard 2 */}
                    <div className="group perspective-1000 h-64 cursor-pointer">
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg border border-white/10">
                          <span className="absolute top-6 left-6 text-xs font-bold text-white/60 uppercase tracking-wider">Term</span>
                          <h3 className="text-3xl font-bold text-white">Epoch</h3>
                          <div className="absolute bottom-6 right-6 text-white/60">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg border border-slate-200">
                          <span className="absolute top-6 left-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Definition</span>
                          <p className="text-lg font-medium text-slate-700">One complete pass of the training dataset through the algorithm.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Floating Ask AI Button */}
          <div className="fixed bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 md:ml-36 z-20 w-[90%] md:w-auto">
            <AnimatePresence>
              {isAiChatOpen ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="mesh-card rounded-[2rem] shadow-2xl border border-white/70 w-full md:w-[400px] overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
                >
                  <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-1.5 rounded-full">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold">AI Study Assistant</span>
                    </div>
                    <button onClick={() => setIsAiChatOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'}`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Ask a question..." 
                        className="w-full bg-slate-100 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <button 
                        type="submit"
                        disabled={!chatMessage.trim()}
                        className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-slate-400 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <button 
                  onClick={() => setIsAiChatOpen(true)}
                  className="w-full md:w-auto group flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-6 md:px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-900/20 transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 border border-slate-700"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  Ask AI a Question
                </button>
              )}
            </AnimatePresence>
          </div>

        </section>

      </main>
    </motion.div>
  );
}
