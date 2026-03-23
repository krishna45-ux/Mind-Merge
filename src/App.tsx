/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherReview from './components/TeacherReview';
import StudentHub from './components/StudentHub';

type AppStage = 'landing' | 'teacher-upload' | 'teacher-review' | 'student-view';

export default function App() {
  const [currentStage, setCurrentStage] = useState<AppStage>('landing');

  return (
    <div className="page-shell min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStage === 'landing' && (
          <LandingPage 
            onSelectRole={(role) => setCurrentStage(role === 'teacher' ? 'teacher-upload' : 'student-view')} 
          />
        )}
        {currentStage === 'teacher-upload' && (
          <TeacherDashboard 
            onGenerate={() => setCurrentStage('teacher-review')} 
            onPublishDirectly={() => setCurrentStage('student-view')}
            onLogout={() => setCurrentStage('landing')}
          />
        )}
        {currentStage === 'teacher-review' && (
          <TeacherReview 
            onPublish={() => setCurrentStage('student-view')} 
            onBack={() => setCurrentStage('teacher-upload')}
          />
        )}
        {currentStage === 'student-view' && (
          <StudentHub 
            onLogout={() => setCurrentStage('landing')}
          />
        )}
      </AnimatePresence>

      {/* Development Navigation - Remove in production */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-50 panel-surface p-2 rounded-full shadow-lg">
        <button 
          onClick={() => setCurrentStage('landing')}
          className={`px-3 py-1 text-xs font-medium rounded-full ${currentStage === 'landing' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          Landing
        </button>
        <button 
          onClick={() => setCurrentStage('teacher-upload')}
          className={`px-3 py-1 text-xs font-medium rounded-full ${currentStage === 'teacher-upload' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          Stage 1
        </button>
        <button 
          onClick={() => setCurrentStage('teacher-review')}
          className={`px-3 py-1 text-xs font-medium rounded-full ${currentStage === 'teacher-review' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          Stage 2
        </button>
        <button 
          onClick={() => setCurrentStage('student-view')}
          className={`px-3 py-1 text-xs font-medium rounded-full ${currentStage === 'student-view' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          Stage 3
        </button>
      </div>
    </div>
  );
}
