<div align="center">
  <h1>🧠 Mind Merge</h1>
  <p>An AI-powered educational platform connecting teachers and students through dynamic, AI-generated content.</p>
</div>

## 📖 About the Project

Mind Merge is an innovative application built to streamline the educational workflow. By leveraging the power of Google's Gemini AI, it allows educators to quickly generate, review, and publish learning materials, which students can then access through a dedicated hub. 

The application provides a seamless, beautifully animated user experience divided into four main stages:
- **Landing Page**: Role selection for Teachers and Students.
- **Teacher Dashboard**: Upload materials and generate AI-driven study content.
- **Teacher Review**: Review, edit, and perfect the AI-generated content before publishing.
- **Student Hub**: An engaging interface for students to access and interact with the published lessons.

## ✨ Features

- 🤖 **AI-Powered Content Generation**: Fast and context-aware educational material generation using the Google GenAI SDK.
- 🎨 **Premium Modern UI**: Built with React, TailwindCSS, and Framer Motion for a fluid, glassmorphic, and highly interactive user experience.
- 👥 **Role-Based Workflows**: Distinct, tailored interfaces for both educators and learners.
- ⚡ **Lightning Fast**: Powered by Vite for instant server start and rapid HMR.

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: `@google/genai` (Gemini)
- **Backend/Server**: Express (for API handling)

## 🛠️ Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Rename `.env.example` to `.env.local` (or `.env`) and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.
