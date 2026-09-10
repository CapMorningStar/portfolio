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
  Globe,
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
            download="Kyaw_Soe_Lwin_Resume.pdf"
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
              <a
                href="https://kyawsoelwin.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>kyawsoelwin.vercel.app</span>
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
              <span className="text-white font-semibold">Data Science student at UC San Diego (4.0 GPA)</span> building leakage-free ML pipelines, Generative AI/LLM systems (RAG, PEFT/LoRA), and computer vision applications in Python. Proficient in Scikit-Learn, XGBoost, PyTorch, and SQL, with hands-on cloud deployment across AWS and GCP (Vertex AI). Backed by national <span className="text-cyan-400 font-semibold">Jack Kent Cooke Semifinalist</span> honors.
            </p>
          </section>

          {/* SECTION 2: EDUCATION */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Education</span>
            </h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-black text-white">University of California, San Diego (UCSD)</h3>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 w-fit">
                  Expected June 2028
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Bachelor of Science in Data Science &middot; San Diego, CA</p>
              <p className="text-[11px] text-gray-400">
                <span className="font-bold text-gray-300">Relevant Coursework:</span> Machine Learning, Deep Learning, Computer Vision, Statistical Natural Language Processing
              </p>
            </div>
          </section>

          {/* SECTION 3: TECHNICAL SKILLS */}
          <section className="mb-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Statistics &amp; Experimentation</span>
                <span className="text-gray-400">A/B Testing, Hypothesis Testing, Leakage Audits, Generalization Validation, Bayesian Optimization (Optuna), Time Series Analysis, Geospatial Analysis (Getis-Ord Gi*)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Data Science &amp; Machine Learning</span>
                <span className="text-gray-400">Scikit-Learn, XGBoost, PyTorch, TensorFlow/Keras, SHAP Interpretability, Feature Engineering, CNNs, Computer Vision (OpenCV)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Programming &amp; Data Systems</span>
                <span className="text-gray-400">Python, SQL, Java, Bash/Linux, Pandas, NumPy, Exploratory Data Analysis, Data Auditing &amp; Schema Standardization</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">GenAI, LLMs &amp; Agents</span>
                <span className="text-gray-400">Hugging Face Transformers, RAG Architectures, ChromaDB, LLM APIs (Anthropic Claude), Prompt Engineering, PEFT/LoRA Fine-Tuning, RLHF</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Cloud &amp; MLOps</span>
                <span className="text-gray-400">AWS, GCP (Vertex AI), Docker, Kubernetes (GKE), Streamlit, Git/GitHub, Agile/Scrum, CI/CD</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">AI-Assisted Development</span>
                <span className="text-gray-400">Anthropic Claude Code, Google Antigravity, Agentic Coding Workflows</span>
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
                    Local Expert &mdash; Offline PDF QA Engine (RAG Pipeline)
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2 flex flex-wrap items-center gap-2">
                  <span>Python, Hugging Face sentence-transformers, ChromaDB, Anthropic Claude API, Streamlit</span>
                  <a href="https://github.com/CapMorningStar/-local-expert-rag" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:underline">
                    <Github className="w-3 h-3" /> Repo
                  </a>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Built a fully offline, hand-coded RAG pipeline (no LangChain) that answers questions about your own PDFs and cites the exact source page, covering chunking, embedding, vector search, and prompt assembly end to end.</li>
                  <li>Split PDFs into overlapping ~800-character chunks, embedded them locally with sentence-transformers, and indexed them in a local Chroma vector database for private, offline retrieval.</li>
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
                <p className="text-[11px] font-mono text-gray-400 mb-2 flex flex-wrap items-center gap-2">
                  <span>PyTorch, Hugging Face, PEFT / LoRA, bitsandbytes, Google Colab (T4 GPU)</span>
                  <a href="https://github.com/CapMorningStar/lora-tinyllama-finetune" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:underline">
                    <Github className="w-3 h-3" /> Repo
                  </a>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Fine-tuned TinyLlama-1.1B with LoRA, adapting only the attention projection layers (q/k/v/o) to cut trainable parameters by over 95% while keeping the base model frozen.</li>
                  <li>Used 4-bit quantization to fit the entire training run on a free Colab T4 GPU, then diagnosed and fixed a KV-cache/gradient-checkpointing conflict that was causing garbled output at inference.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-baseline mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    Telco Customer Churn Pipeline &amp; Profit Thresholding
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">2026</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2 flex flex-wrap items-center gap-2">
                  <span>Python, Scikit-Learn, XGBoost, Optuna, SHAP, Streamlit</span>
                  <a href="https://github.com/CapMorningStar/telco-churn-pipeline" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:underline">
                    <Github className="w-3 h-3" /> Repo
                  </a>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Built a leakage-audited preprocessing pipeline and tuned an XGBoost model via a 30-trial Optuna search, reaching 0.844 ROC-AUC and 0.671 PR-AUC on a held-out test set of 1,057 customers.</li>
                  <li>Built a Streamlit dashboard with SHAP explainability and a profit-threshold analysis that weighs outreach cost against customer lifetime value to recommend an action cutoff.</li>
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
                <p className="text-[11px] font-mono text-gray-400 mb-2 flex flex-wrap items-center gap-2">
                  <span>Python, OpenCV, TensorFlow, Keras, mini-XCEPTION (FER-2013)</span>
                  <a href="https://github.com/CapMorningStar/emotion-detector" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:underline">
                    <Github className="w-3 h-3" /> Repo
                  </a>
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Built a real-time webcam pipeline using OpenCV face detection and a pretrained mini-XCEPTION model (FER-2013, ~66% accuracy) to classify emotions live.</li>
                  <li>Rendered live bounding boxes, emotion labels, and a probability bar chart across all 7 emotion categories with low-latency OpenCV rendering.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 5: EXPERIENCE & HONORS */}
          <section className="relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Experience &amp; Honors</span>
            </h2>
            <div className="space-y-4 mb-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <h3 className="text-sm font-black text-white">
                    Data Science Volunteer &mdash; Data Science Alliance
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 whitespace-nowrap">Sep 2026 &ndash; Present</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400 mb-2">San Diego, CA &middot; Part-time</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                  <li>Designed and executed an end-to-end data auditing and validation pipeline, cross-referencing multi-year counts against source reports to ensure high data integrity (97.5%+ fidelity).</li>
                  <li>Standardized schemas and built geospatial crosswalks across 380+ downtown blocks and neighborhood boundaries to enable spatial panel modeling.</li>
                  <li>Preparing datasets for time-series decomposition, spatial hotspot analysis (Getis-Ord Gi*), and predictive modeling.</li>
                </ul>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs">
              <span className="font-bold text-white block mb-1">Honors</span>
              <p className="text-gray-400">
                • Jack Kent Cooke Undergraduate Scholarship &mdash; National Semifinalist (2026): Named a National Semifinalist for the Jack Kent Cooke Undergraduate Scholarship, recognizing top-tier high-achieving undergraduates nationwide.
              </p>
            </div>
          </section>

          {/* SECTION 6: CERTIFICATIONS */}
          <section className="mt-8 relative z-10">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Generative AI with Large Language Models</span>
                <span className="text-gray-400">DeepLearning.AI &amp; AWS</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/verify/5QI73UPMCSYY" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Deep Learning Specialization</span>
                <span className="text-gray-400">DeepLearning.AI</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/specialization/DDUQD294T6YG" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Machine Learning Specialization</span>
                <span className="text-gray-400">Stanford Online &amp; DeepLearning.AI</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/specialization/APSG10B8RIFD" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Mathematics for Machine Learning and Data Science</span>
                <span className="text-gray-400">DeepLearning.AI</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/specialization/XXZEJ28KIL6B" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Google Cloud Skills Boost Portfolio</span>
                <span className="text-gray-400">Vertex AI, LLM Prompting, Model Tuning &middot; Google Cloud</span>{' '}
                <a href="https://www.skills.google/public_profiles/7fbe1d02-3600-47d0-b4e3-ad475c1e9425" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Profile</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Python for Everybody Specialization</span>
                <span className="text-gray-400">University of Michigan</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/specialization/H7S9D5HB2ARL" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Python for Data Science, AI &amp; Development</span>
                <span className="text-gray-400">IBM</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/verify/GX0PKGYXUS5H" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Introduction to Agile Development and Scrum</span>
                <span className="text-gray-400">IBM</span>{' '}
                <a href="https://www.coursera.org/account/accomplishments/verify/SR3OHZRW0HNE" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Verify</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">CS50P: Introduction to Programming with Python</span>
                <span className="text-gray-400">Harvard (CS50)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="font-bold text-white block mb-1">Frontier Tech Leaders Programme &mdash; ML Bootcamp</span>
                <span className="text-gray-400">UNDP</span>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </motion.div>
  );
}
