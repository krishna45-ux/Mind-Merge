import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle2, FileText, FileType2, FileText as FileWord, RefreshCw, Sparkles, ChevronDown, ChevronUp, Edit2, Plus, Save, X } from 'lucide-react';

interface TeacherReviewProps {
  onPublish: () => void;
  onBack: () => void;
}

export default function TeacherReview({ onPublish, onBack }: TeacherReviewProps) {
  const [activeTab, setActiveTab] = useState('master-note');
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<number | null>(null);
  const [editingFlashcard, setEditingFlashcard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleCard = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-shell flex flex-col h-screen font-sans text-slate-800 relative"
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
      {/* Header */}
      <header className="h-16 panel-surface border-b border-white/60 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4 md:gap-6">
          <h1 className="font-display text-xl font-bold flex items-center gap-2">
            <span className="headline-gradient hidden sm:block">MindMerge</span>
            <span className="bg-gradient-to-r from-sun-500 to-rose-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <h2 className="text-base md:text-lg font-semibold text-slate-700">Review & Publish</h2>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-3 md:pl-5 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 leading-none">Dr. Anjali Sharma</p>
              <p className="text-xs text-slate-500 mt-1">Computer Science</p>
            </div>
            <img src="https://picsum.photos/seed/anjali/32/32" alt="Profile" className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-white shadow-sm" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 md:p-6 gap-4 md:gap-6 relative">
        
        {/* Mobile Sources Toggle */}
        <div className="lg:hidden bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden shrink-0">
          <button 
            onClick={() => setIsSourcesOpen(!isSourcesOpen)}
            className="w-full p-4 flex items-center justify-between bg-gradient-to-b from-slate-50 to-white"
          >
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              Source Documents <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-[10px]">5</span>
            </h3>
            {isSourcesOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          
          <AnimatePresence>
            {isSourcesOpen && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-3 bg-slate-50/50 border-t border-slate-100 max-h-60 overflow-y-auto">
                  {/* Source Items (Mobile) */}
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm">
                    <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center shrink-0"><FileType2 className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">Lecture_Slides.pptx</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm">
                    <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">Note_1_Basics.pdf</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0"><FileWord className="w-4 h-4" /></div>
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">Deep_Learning_Intro.doc</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Panel - Sources (Desktop) */}
        <aside className="hidden lg:flex w-80 flex-col mesh-card rounded-[2rem] border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)] overflow-hidden shrink-0 relative">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              Source Documents <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-[10px]">5</span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            
            {/* Source Item 1 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileType2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-700 transition-colors">Lecture_Slides.pptx</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>

            {/* Source Item 2 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-700 transition-colors">Note_1_Basics.pdf</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>

            {/* Source Item 3 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileWord className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-700 transition-colors">Deep_Learning_Intro.doc</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>

            {/* Source Item 4 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-700 transition-colors">Network_Arch.pdf</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>

            {/* Source Item 5 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-4 p-3 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileWord className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-700 truncate flex-1 group-hover:text-blue-700 transition-colors">Application_Examples.rtf</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>

          </div>
        </aside>

        {/* Right Panel - Editor */}
        <section className="flex-1 flex flex-col mesh-card rounded-[2rem] border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.08)] overflow-hidden relative min-h-[500px]">
          
          {/* Editor Header */}
          <div className="p-4 md:p-8 pb-0 border-b border-white/70 bg-gradient-to-b from-white/60 to-white/30 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md uppercase tracking-wide">Draft</span>
              <h3 className="text-sm font-medium text-slate-500">AI Generated Content</h3>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8 tracking-tight">Introduction to Artificial Neural Networks</h2>
            
            {/* Editor Tabs */}
            <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('master-note')}
                className={`pb-4 text-sm font-bold whitespace-nowrap relative transition-colors ${activeTab === 'master-note' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Master Note
                {activeTab === 'master-note' && <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-blue-600 rounded-t-full"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('important-questions')}
                className={`pb-4 text-sm font-bold whitespace-nowrap relative transition-colors ${activeTab === 'important-questions' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Important Questions
                {activeTab === 'important-questions' && <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-blue-600 rounded-t-full"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('quiz-flashcards')}
                className={`pb-4 text-sm font-bold whitespace-nowrap relative transition-colors ${activeTab === 'quiz-flashcards' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Quiz & Flashcards
                {activeTab === 'quiz-flashcards' && <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-blue-600 rounded-t-full"></span>}
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full pb-32">
            
            {activeTab === 'master-note' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="prose prose-slate prose-blue max-w-none">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" /> What are ANNs?
                </h3>
                <ul className="list-disc pl-5 space-y-3 mb-10 text-slate-600 leading-relaxed marker:text-blue-400">
                  <li>Artificial Neural Networks are computing models inspired by how biological neurons communicate through connected pathways.</li>
                  <li>Each artificial neuron receives inputs, applies learned weights, adds a bias term, and sends the result through an activation function.</li>
                  <li>ANNs are well suited for pattern recognition tasks such as image classification, language understanding, forecasting, and recommendation systems.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" /> Perceptron Structure
                </h3>
                <ul className="list-disc pl-5 space-y-3 mb-10 text-slate-600 leading-relaxed marker:text-blue-400">
                  <li>A perceptron is the simplest decision-making unit in a neural network and forms the foundation for deeper models.</li>
                  <li>It combines weighted inputs into a single value and determines whether the neuron should activate.</li>
                  <li>Stacking many perceptrons across hidden layers allows the network to represent more complex decision boundaries.</li>
                  <li>During training, the model updates its weights to reduce error and improve future predictions.</li>
                  <li>This structure gives ANNs the ability to learn meaningful representations instead of relying on fixed hand-written rules.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" /> Activation Functions
                </h3>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 flex flex-col items-center justify-center h-48 text-slate-400 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <span className="font-medium">Diagram Placeholder: Activation Functions</span>
                  <span className="text-sm mt-1">Click to edit or upload image</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'important-questions' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className={`bg-white border ${editingQuestion === 1 ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200'} rounded-2xl p-6 shadow-sm transition-all`}>
                  {editingQuestion === 1 ? (
                    <div className="space-y-4">
                      <input type="text" defaultValue="Q1. Explain the concept of a Perceptron." className="w-full font-bold text-slate-800 text-lg p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                      <textarea defaultValue="A perceptron is the fundamental unit of a neural network, acting as a linear classifier..." className="w-full text-slate-600 p-2 border border-slate-200 rounded-lg h-24 focus:outline-none focus:border-blue-500"></textarea>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingQuestion(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium text-sm transition-colors">Cancel</button>
                        <button onClick={() => { setEditingQuestion(null); showToast('Question updated successfully!'); }} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">Q1. Explain the concept of a Perceptron.</h4>
                      <p className="text-slate-600 mb-4">A perceptron is the fundamental unit of a neural network, acting as a linear classifier...</p>
                      <button onClick={() => setEditingQuestion(1)} className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1"><Edit2 className="w-4 h-4" /> Edit Answer</button>
                    </>
                  )}
                </div>
                
                <div className={`bg-white border ${editingQuestion === 2 ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200'} rounded-2xl p-6 shadow-sm transition-all`}>
                  {editingQuestion === 2 ? (
                    <div className="space-y-4">
                      <input type="text" defaultValue="Q2. Why are activation functions necessary?" className="w-full font-bold text-slate-800 text-lg p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                      <textarea defaultValue="Activation functions introduce non-linearity into the network, allowing it to learn complex patterns..." className="w-full text-slate-600 p-2 border border-slate-200 rounded-lg h-24 focus:outline-none focus:border-blue-500"></textarea>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingQuestion(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium text-sm transition-colors">Cancel</button>
                        <button onClick={() => { setEditingQuestion(null); showToast('Question updated successfully!'); }} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">Q2. Why are activation functions necessary?</h4>
                      <p className="text-slate-600 mb-4">Activation functions introduce non-linearity into the network, allowing it to learn complex patterns...</p>
                      <button onClick={() => setEditingQuestion(2)} className="text-blue-600 font-medium text-sm hover:underline flex items-center gap-1"><Edit2 className="w-4 h-4" /> Edit Answer</button>
                    </>
                  )}
                </div>

                {showAddQuestion ? (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
                    <div className="space-y-4">
                      <input type="text" placeholder="Enter question title..." className="w-full font-bold text-slate-800 text-lg p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white" />
                      <textarea placeholder="Enter question answer..." className="w-full text-slate-600 p-3 border border-slate-200 rounded-xl h-24 focus:outline-none focus:border-blue-500 bg-white"></textarea>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setShowAddQuestion(false)} className="px-4 py-2 text-slate-500 hover:bg-blue-100 rounded-lg font-medium text-sm transition-colors">Cancel</button>
                        <button onClick={() => { setShowAddQuestion(false); showToast('Question added successfully!'); }} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"><Plus className="w-4 h-4" /> Add Question</button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <button onClick={() => setShowAddQuestion(true)} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Add Custom Question
                  </button>
                )}
              </motion.div>
            )}

            {activeTab === 'quiz-flashcards' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" /> Generated Flashcards
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative aspect-video">
                      {editingFlashcard === 1 ? (
                        <div className="absolute inset-0 bg-white border-2 border-blue-400 rounded-2xl p-4 flex flex-col gap-3 shadow-sm z-10">
                          <input type="text" defaultValue="Backpropagation" className="w-full font-bold text-slate-800 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Term" />
                          <textarea defaultValue="The algorithm used to calculate gradients of the loss function with respect to the weights in an ANN." className="w-full text-slate-600 p-2 border border-slate-200 rounded-lg flex-1 resize-none focus:outline-none focus:border-blue-500" placeholder="Definition"></textarea>
                          <div className="flex justify-end gap-2 mt-auto">
                            <button onClick={() => setEditingFlashcard(null)} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg font-medium text-xs transition-colors">Cancel</button>
                            <button onClick={() => { setEditingFlashcard(null); showToast('Flashcard updated successfully!'); }} className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-xs transition-colors flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => toggleCard(1)}
                          className={`w-full h-full cursor-pointer perspective-1000`}
                        >
                          <motion.div 
                            className="w-full h-full absolute inset-0 preserve-3d transition-all duration-500"
                            animate={{ rotateY: flippedCards[1] ? 180 : 0 }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
                              <button onClick={(e) => { e.stopPropagation(); setEditingFlashcard(1); }} className="absolute top-3 right-3 p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <span className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wider">Front (Click to flip)</span>
                              <h4 className="font-bold text-slate-800 text-xl">Backpropagation</h4>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg" style={{ transform: 'rotateY(180deg)' }}>
                              <button onClick={(e) => { e.stopPropagation(); setEditingFlashcard(1); }} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <span className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Back</span>
                              <p className="font-medium text-white text-base">The algorithm used to calculate gradients of the loss function with respect to the weights in an ANN.</p>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative aspect-video">
                      {editingFlashcard === 2 ? (
                        <div className="absolute inset-0 bg-white border-2 border-blue-400 rounded-2xl p-4 flex flex-col gap-3 shadow-sm z-10">
                          <input type="text" defaultValue="Sigmoid Function" className="w-full font-bold text-slate-800 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Term" />
                          <textarea defaultValue="An activation function that maps any input value to a value between 0 and 1." className="w-full text-slate-600 p-2 border border-slate-200 rounded-lg flex-1 resize-none focus:outline-none focus:border-blue-500" placeholder="Definition"></textarea>
                          <div className="flex justify-end gap-2 mt-auto">
                            <button onClick={() => setEditingFlashcard(null)} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg font-medium text-xs transition-colors">Cancel</button>
                            <button onClick={() => { setEditingFlashcard(null); showToast('Flashcard updated successfully!'); }} className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-xs transition-colors flex items-center gap-1"><Save className="w-3 h-3" /> Save</button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => toggleCard(2)}
                          className={`w-full h-full cursor-pointer perspective-1000`}
                        >
                          <motion.div 
                            className="w-full h-full absolute inset-0 preserve-3d transition-all duration-500"
                            animate={{ rotateY: flippedCards[2] ? 180 : 0 }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-50 to-rose-50 border border-orange-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
                              <button onClick={(e) => { e.stopPropagation(); setEditingFlashcard(2); }} className="absolute top-3 right-3 p-1.5 text-orange-400 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <span className="text-sm font-semibold text-orange-600 mb-2 uppercase tracking-wider">Front (Click to flip)</span>
                              <h4 className="font-bold text-slate-800 text-xl">Sigmoid Function</h4>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg" style={{ transform: 'rotateY(180deg)' }}>
                              <button onClick={(e) => { e.stopPropagation(); setEditingFlashcard(2); }} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <span className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Back</span>
                              <p className="font-medium text-white text-base">An activation function that maps any input value to a value between 0 and 1.</p>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" /> Practice Quiz (MCQs)
                  </h3>
                  <div className={`bg-white border ${editingQuiz === 1 ? 'border-blue-400 ring-4 ring-blue-50' : 'border-slate-200'} rounded-2xl p-6 shadow-sm transition-all`}>
                    {editingQuiz === 1 ? (
                      <div className="space-y-4">
                        <input type="text" defaultValue="Which of the following is NOT a common activation function?" className="w-full font-bold text-slate-800 text-lg p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="radio" name="correct-answer" className="w-4 h-4 text-blue-600" />
                            <input type="text" defaultValue="ReLU" className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="radio" name="correct-answer" className="w-4 h-4 text-blue-600" />
                            <input type="text" defaultValue="Sigmoid" className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="radio" name="correct-answer" defaultChecked className="w-4 h-4 text-blue-600" />
                            <input type="text" defaultValue="Linear Regression" className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="radio" name="correct-answer" className="w-4 h-4 text-blue-600" />
                            <input type="text" defaultValue="Tanh" className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setEditingQuiz(null)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium text-sm transition-colors">Cancel</button>
                          <button onClick={() => { setEditingQuiz(null); showToast('Quiz updated successfully!'); }} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-800">1. Which of the following is NOT a common activation function?</h4>
                          <button onClick={() => setEditingQuiz(1)} className="text-slate-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-2">
                          <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors">A. ReLU</div>
                          <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors">B. Sigmoid</div>
                          <div className="p-3 border border-emerald-500 rounded-xl bg-emerald-50 text-emerald-800 font-bold shadow-sm ring-1 ring-emerald-500 flex justify-between items-center">
                            <span>C. Linear Regression (Correct)</span>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors">D. Tanh</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Floating Actions */}
          <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-end gap-3 md:gap-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              <button onClick={onBack} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all hover:shadow text-sm md:text-base">
                <X className="w-4 h-4" /> <span className="hidden sm:inline">Back to Upload</span>
                <span className="sm:hidden">Back</span>
              </button>
              <button onClick={() => showToast('Regenerating content...')} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-3 md:py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all hover:shadow text-sm md:text-base">
                <RefreshCw className="w-4 h-4" /> <span className="hidden sm:inline">Regenerate</span>
              </button>
              <button 
                onClick={() => { onPublish(); showToast('Content approved and published!'); }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base"
              >
                <CheckCircle2 className="w-5 h-5" />
                PUBLISH <span className="hidden sm:inline">& DISTRIBUTE</span>
              </button>
            </div>
          </div>

        </section>

      </main>
    </motion.div>
  );
}
