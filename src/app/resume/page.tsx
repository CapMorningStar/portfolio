'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Linkedin,
  Github,
} from 'lucide-react';

export default function ResumePage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-[#070707] text-white flex flex-col selection:bg-cyan-500/30 overflow-x-hidden"
    >
      {/* Top Fixed Header with Slide-Down Reveal */}
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 26, delay: 0.05 }}
        className="sticky top-0 z-50 bg-[#111111]/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl"
      >
        {/* Interactive Back to Portfolio Button with Tactile Feedback */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:-translate-x-1.5" />
            <span>Back to Portfolio</span>
          </motion.button>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>KYAW SOE LWIN // EXECUTIVE RESUME</span>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            href="/api/resume"
            download="Kyaw_Soe_Lwin_AI_ML_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>Download PDF</span>
          </motion.a>
        </div>
      </motion.header>

      {/* Main Document Body with Cinematic Spring Entry */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.1 }}
          className="bg-[#111111] border border-white/15 rounded-[2.5rem] p-8 sm:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.85)] text-gray-200 relative overflow-hidden"
        >
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

          {/* HEADER: Identity & Contacts */}
          <div className="border-b border-white/10 pb-6 mb-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  KYAW SOE LWIN
                </h1>
                <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest mt-1">
                  Data Science &amp; AI/ML Engineer
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-gray-300 font-mono">
                <span className="text-gray-400">San Diego, CA</span>
                <a href="mailto:kylwin@ucsd.edu" className="text-cyan-400 hover:underline">
                  kylwin@ucsd.edu
                </a>
                <span>(+1) 650-609-8498</span>
              </div>
            </div>

            {/* Quick Links Row */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-gray-400">
              <a
                href="https://linkedin.com/in/kyaw-soe-lwin-687643314"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>linkedin.com/in/kyaw-soe-lwin</span>
              </a>
              <a
                href="https://github.com/CapMorningStar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>github.com/CapMorningStar</span>
              </a>
            </div>
          </div>

          {/* SECTION 1: PROFESSIONAL SUMMARY */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">Data Science student at UC San Diego (4.0 GPA)</span> and AI/ML Engineer with deep hands-on expertise building production machine learning pipelines, Retrieval-Augmented Generation (RAG) systems, and real-time computer vision engines in Python. Proven track record in parameter-efficient fine-tuning (PEFT/LoRA), leakage-free tabular modeling (0.844 ROC-AUC), and cloud deployment across AWS and GCP (Vertex AI). Backed by national <span className="text-cyan-400 font-semibold">Jack Kent Cooke Semifinalist</span> honors and 9 verified credentials in Deep Learning and Generative AI.
            </p>
          </section>

          {/* SECTION 2: TECHNICAL SKILLS */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Programming &amp; Data</span>
                <span className="text-gray-400">Python, SQL, Java, Bash/Linux, Pandas, NumPy, Feature Engineering</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Machine Learning</span>
                <span className="text-gray-400">Scikit-Learn, XGBoost, Optuna (Bayesian Tuning), SHAP Explainability, ROI Modeling</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Deep Learning &amp; GenAI</span>
                <span className="text-gray-400">PyTorch, TensorFlow, Keras, Hugging Face, PEFT/LoRA, RAG, ChromaDB, Claude API</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Cloud &amp; MLOps</span>
                <span className="text-gray-400">GCP (Vertex AI, GKE), AWS, Docker, Kubernetes, Git/GitHub, Streamlit</span>
              </div>
            </div>
          </section>

          {/* SECTION 3: EDUCATION */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Education</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-white">University of California, San Diego (UCSD)</h3>
                  <p className="text-xs text-gray-400">Bachelor of Science in Data Science</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                  Class of 2028
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-black text-white">Skyline College</h3>
                  <p className="text-xs text-gray-400">Associate Studies in Data Science · Coursework: DSA, Linear Algebra, Calc</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                  4.0 GPA
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 4: TECHNICAL PROJECTS */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Projects</span>
            </h2>
            <div className="space-y-5">
              {/* Project 1 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    Local Expert &mdash; Private PDF QA Engine (RAG Pipeline)
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2">
                  Python, Hugging Face, ChromaDB, Anthropic Claude API, Streamlit
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Architected an end-to-end local RAG pipeline for grounded question-answering over private PDFs with page-by-page chunking.</li>
                  <li>Built local document ingestion embedding text via Hugging Face sentence-transformers into Chroma vector DB for high-precision retrieval.</li>
                  <li>Designed swappable LLM provider interface (Claude API &amp; local Ollama) delivering grounded answers with source file and page citations.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    LoRA TinyLlama-1.1B Instruction Fine-Tuning
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2">
                  PyTorch, Hugging Face, PEFT / LoRA, Google Colab (T4 GPU)
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Configured Parameter-Efficient Fine-Tuning (PEFT/LoRA) on TinyLlama-1.1B-Chat, reducing trainable parameters by &gt;95%.</li>
                  <li>Engineered custom prompt formatting templates, sequence length bucketing, and gradient accumulation for resource-constrained training.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    Telco Customer Churn Prediction &amp; ROI Pipeline
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2">
                  Python, Scikit-Learn, XGBoost, Optuna, SHAP, Streamlit
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Constructed ColumnTransformer-based preprocessing on stratified 70/15/15 splits to guarantee leakage-free evaluation on 7,043 records.</li>
                  <li>Executed 30-trial Optuna Bayesian search, achieving 0.844 ROC-AUC / 0.671 PR-AUC with &lt;3.5 point generalization gap.</li>
                  <li>Deployed multi-tab Streamlit dashboard with TreeSHAP explainability and cost-sensitive ROI retention modeling ($20 cost / $200 LTV).</li>
                </ul>
              </div>

              {/* Project 4 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    Real-Time Facial Emotion Detection Engine
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2">
                  Python, OpenCV, TensorFlow, Keras, mini-XCEPTION (FER-2013)
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Trained lightweight mini-XCEPTION CNN with depthwise separable convolutions on FER-2013 dataset.</li>
                  <li>Engineered low-latency, multi-frame OpenCV inference pipeline rendering probability distributions across 7 emotion classes in real time.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 5: HONORS & CERTIFICATIONS */}
          <section className="relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Honors &amp; Verified Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Scholarships &amp; Honors</span>
                <p className="text-gray-400">
                  • Jack Kent Cooke Semifinalist (2026)<br />
                  • Sterling Redman &amp; F.L. Griffin Scholarships
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Specializations</span>
                <p className="text-gray-400">
                  • DeepLearning.AI &amp; AWS Generative AI<br />
                  • DeepLearning.AI Deep Learning &amp; Math<br />
                  • Google Cloud Skills Boost Vertex AI Portfolio
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </motion.div>
  );
}
