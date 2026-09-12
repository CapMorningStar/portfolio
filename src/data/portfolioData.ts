// SOURCE OF TRUTH NOTE:
// The canonical, human-maintained record of Kyaw's full background (education,
// experience, projects, skills, certifications, honors) lives in:
//   D:\MSI\Scholarship Document\Kyaw Soe Lwin\JOB\MY CV\MASTER_BACKGROUND.md
// Whenever Kyaw reports a new achievement, job, project, cert, or award, check
// that file first (or ask him to update it), then mirror the change here so the
// portfolio site and its AI chatbot (see src/lib/chatGroundedPrompt.ts) stay
// grounded in the latest information.

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'GenAI & LLMs' | 'Machine Learning' | 'Computer Vision' | 'MLOps & Tools';
  year: string;
  description: string;
  bullets: string[];
  tags: string[];
  github: string;
  liveUrl?: string;
  apiDocs?: string;
  demoVideo?: string;
  metrics?: string;
  gradient: string;
  badge: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level?: string;
    category?: string;
    iconName: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  tools: string[];
}

export interface EducationItem {
  school: string;
  location: string;
  degree: string;
  period: string;
  gpa?: string;
  coursework?: string[];
  badge?: string;
}

export interface CertItem {
  name: string;
  issuer: string;
  link: string;
}

export interface CertificationCategory {
  issuer: string;
  category: string;
  period: string;
  certs: CertItem[];
}

export interface HonorItem {
  title: string;
  award: string;
  year: string;
  detail: string;
  link?: string;
}

export const portfolioData = {
  personal: {
    name: "Kyaw Soe Lwin",
    initials: "KSL",
    badge: "UC San Diego · Data Science",
    gpa: "4.0 GPA",
    headline: "Data Science @ UC San Diego · AI & ML Engineer",
    bio: "Data Science student at UC San Diego with a 4.0 GPA building end-to-end machine learning pipelines, computer vision applications, and Generative AI/LLM systems in Python. Hands-on with RAG, fine-tuning (PEFT/LoRA), model evaluation, and cloud deployment across AWS and GCP (Vertex AI).",
    location: "San Diego, California",
    coordinates: "32.8801° N, 117.2340° W",
    email: "kylwin@ucsd.edu",
    phone: "(+1) 650-609-8498",
    linkedin: "https://linkedin.com/in/kyaw-soe-lwin-687643314",
    github: "https://github.com/CapMorningStar",
    quote: "From raw data to grounded intelligence. Building machine learning and generative AI systems with purpose and rigor.",
  },
  
  introWords: [
    "KYAW SOE LWIN",
    "DATA SCIENCE @ UC SAN DIEGO",
    "AI & ML ENGINEER",
    "RAG & GENERATIVE AI SYSTEMS",
    "ENTER PORTFOLIO"
  ],

  stats: [
    { label: "Data Science GPA", value: "4.0" },
    { label: "ML & GenAI Repos", value: "7+" },
    { label: "Specializations & Certs", value: "10+" },
    { label: "Students Mentored", value: "40+" }
  ],

  projects: [
    {
      id: "multimodal-ragops-platform",
      number: "01",
      title: "Enterprise Corrective Multimodal RAGOps Platform (GCP)",
      category: "GenAI & LLMs",
      year: "2026",
      description: "An enterprise-grade Corrective Multimodal RAG platform on GCP parsing complex 10-Ks with Document AI, 1408-d Vertex AI embeddings, LangGraph CRAG state machine, Gemini 2.5 Flash, and Ragas CI/CD evals.",
      bullets: [
        "Built an enterprise multimodal CRAG platform on GCP using Document AI Layout Parser and Vertex AI 1408-d embeddings to index text, Markdown tables, and cropped chart figures.",
        "Implemented a cyclic LangGraph state machine with dynamic relevance grading and grounded Gemini 2.5 Flash synthesis; evaluated via Ragas CI/CD (0.7519 Faithfulness) on Cloud Run.",
        "Containerized with zero-idle serverless deployment on Google Cloud Run with automated CI/CD and interactive Streamlit & FastAPI interfaces."
      ],
      tags: ["GCP", "Vertex AI", "Document AI", "LangGraph", "CRAG", "Gemini 2.5", "Cloud Run", "FastAPI", "Streamlit", "Ragas"],
      github: "https://github.com/CapMorningStar/multimodal-ragops-platform",
      liveUrl: "https://multimodal-crag-platform-381348374222.us-central1.run.app",
      apiDocs: "https://multimodal-crag-platform-381348374222.us-central1.run.app/docs",
      demoVideo: "https://www.loom.com/share/44f7e3e96d944c248fc26facb877b5a8",
      metrics: "39/39 Passing Tests (100%), Ragas Evals: Faithfulness 0.7519, Relevance 0.7333, Recall 0.7778, Strict Zero-Idle Burn ($0.00 idle)",
      gradient: "from-blue-600/30 via-cyan-900/20 to-black",
      badge: "GCP & Multimodal CRAG"
    },
    {
      id: "lora-tinyllama",
      number: "02",
      title: "LoRA TinyLlama-1.1B Instruction Fine-Tuning",
      category: "GenAI & LLMs",
      year: "2026",
      description: "Parameter-Efficient Fine-Tuning (PEFT/LoRA) of TinyLlama-1.1B-Chat on conversational instruction datasets, optimized for resource-constrained T4 GPU training.",
      bullets: [
        "Configured low-rank adaptation (LoRA) matrices targeting attention projection layers to drastically reduce trainable parameter footprint by >95%.",
        "Engineered custom prompt formatting templates, sequence length bucketing, and gradient accumulation for memory-efficient training on free-tier Colab T4 GPUs.",
        "Evaluated instruction-following quality, perplexity improvements, and response coherence against base baseline checkpoints."
      ],
      tags: ["PyTorch", "Hugging Face", "PEFT / LoRA", "Transformers", "LLM Fine-Tuning", "Google Colab"],
      github: "https://github.com/CapMorningStar/lora-tinyllama-finetune",
      metrics: ">95% parameter reduction via low-rank adaptation, 4-bit QLoRA on free Colab T4 GPU",
      gradient: "from-purple-600/30 via-indigo-900/20 to-black",
      badge: "PEFT / LoRA"
    },
    {
      id: "zenithml-sandbox",
      number: "03",
      title: "ZenithML — Model Risk & Drift Monitoring Sandbox",
      category: "MLOps & Tools",
      year: "2026",
      description: "Interactive model risk management, feature drift detection, and fairness evaluation sandbox built for production ML reliability.",
      bullets: [
        "Developed interactive simulation tools for assessing concept drift, data covariate shift, and population stability indexes (PSI).",
        "Engineered real-time visual dashboards in TypeScript for stress-testing model performance across edge-case scenarios.",
        "Integrated threshold alerting and fairness disparity metrics for governance audits."
      ],
      tags: ["TypeScript", "MLOps", "Model Risk", "Data Drift", "Interactive UI", "Governance"],
      github: "https://github.com/CapMorningStar/zenithml-model-risk-sandbox",
      metrics: "Interactive PSI drift detection, feature stability scoring, and fairness disparity metrics",
      gradient: "from-cyan-600/30 via-blue-900/20 to-black",
      badge: "Model Risk / MLOps"
    },
    {
      id: "telco-churn",
      number: "04",
      title: "Telco Customer Churn Pipeline & Profit Thresholding",
      category: "Machine Learning",
      year: "2026",
      description: "End-to-end churn prediction pipeline on 7,043 customer records featuring leakage-audited preprocessing, Optuna-tuned XGBoost, and SHAP explainability.",
      bullets: [
        "Constructed ColumnTransformer-based preprocessing on stratified 70/15/15 splits to guarantee leakage-free model evaluation.",
        "Executed 30-trial Optuna Bayesian hyperparameter search, achieving 0.844 ROC-AUC / 0.671 PR-AUC with <3.5 point generalization gap.",
        "Deployed a multi-tab Streamlit dashboard with what-if simulation, SHAP value plots, and cost-sensitive ROI modeling ($20 cost / $200 LTV)."
      ],
      tags: ["Python", "Scikit-Learn", "XGBoost", "Optuna", "SHAP", "Streamlit"],
      github: "https://github.com/CapMorningStar/telco-churn-pipeline",
      metrics: "30-trial Optuna Bayesian search, 0.844 ROC-AUC / 0.671 PR-AUC, <3.5% generalization gap, $20 cost / $200 LTV profit thresholding",
      gradient: "from-emerald-700/30 via-teal-950/20 to-black",
      badge: "0.844 ROC-AUC"
    },
    {
      id: "emotion-detector",
      number: "05",
      title: "Real-Time Facial Emotion Detection Engine",
      category: "Computer Vision",
      year: "2026",
      description: "Real-time computer vision application using a lightweight mini-XCEPTION CNN with depthwise separable convolutions pretrained on the FER-2013 dataset.",
      bullets: [
        "Trained a lightweight mini-XCEPTION CNN on the FER-2013 dataset utilizing depthwise separable convolutions and residual skip connections.",
        "Engineered a low-latency, multi-frame OpenCV inference pipeline in Python rendering real-time probability distributions across 7 emotion categories.",
        "Optimized inference throughput for live video stream processing with instant HUD visual feedback."
      ],
      tags: ["Python", "OpenCV", "TensorFlow", "Keras", "mini-XCEPTION", "FER-2013"],
      github: "https://github.com/CapMorningStar/emotion-detector",
      metrics: "mini-XCEPTION CNN on FER-2013 with depthwise separable convolutions, real-time OpenCV HUD inference",
      gradient: "from-rose-600/30 via-red-950/20 to-black",
      badge: "Live Edge CV"
    },
    {
      id: "daly-city-weather",
      number: "06",
      title: "Daly City Meteorological Forecasting Pipeline",
      category: "Machine Learning",
      year: "2025",
      description: "Tabular forecasting workflow analyzing microclimate atmospheric sensor data with robust feature engineering and gradient-boosted decision trees.",
      bullets: [
        "Preprocessed and imputed microclimate atmospheric sensor data with outlier treatment and feature transformation.",
        "Tuned gradient-boosted decision trees (XGBoost) against baseline regressors to minimize root mean square error (RMSE)."
      ],
      tags: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "NumPy", "Regression"],
      github: "https://github.com/CapMorningStar/daly-city-weather-ml",
      metrics: "Microclimate feature pipeline, tuned XGBoost regressor vs. baselines minimizing RMSE",
      gradient: "from-amber-600/30 via-orange-950/20 to-black",
      badge: "Regression ML"
    },
    {
      id: "cat-classifier",
      number: "07",
      title: "TensorFlow Deep Convolutional Cat Classifier",
      category: "Computer Vision",
      year: "2025",
      description: "Binary image classification system trained using deep Convolutional Neural Networks (CNN) in TensorFlow and Keras.",
      bullets: [
        "Engineered end-to-end image data augmentation and normalization pipeline for training deep convolutional architectures.",
        "Built multi-layer convolutional feature extraction blocks with dropout regularization to prevent overfitting on visual datasets."
      ],
      tags: ["Python", "TensorFlow", "Keras", "CNNs", "Computer Vision", "Deep Learning"],
      github: "https://github.com/CapMorningStar/cat-classifier",
      metrics: "Deep CNN in TensorFlow/Keras with data augmentation pipeline and dropout regularization",
      gradient: "from-sky-600/30 via-slate-900/20 to-black",
      badge: "CNN Classification"
    },
    {
      id: "priceout-collective",
      number: "08",
      title: "Priceout Collective — Affordability Policy Simulator",
      category: "Machine Learning",
      year: "2026",
      description: "A household affordability policy simulator built at the Building for Good Hackathon, modeling 1.17M household records across 4 policy dimensions for zero-latency interactive scenario exploration.",
      bullets: [
        "Preprocessed and modeled 1.17M household records across 4 policy dimensions, precomputing 945 scenario combinations for zero-latency interactive simulation.",
        "Diagnosed and eliminated target leakage in an XGBoost classification model through rigorous feature evaluation, reaching 97.3% accuracy / 0.998 AUC.",
        "Validated model results against ALICE and HUD CHAS housing affordability benchmarks."
      ],
      tags: ["Python", "Pandas", "XGBoost", "Scikit-Learn", "JavaScript"],
      github: "https://github.com/eliseoa-dev/priceoutcollective/tree/main",
      metrics: "1.17M household records modeled across 4 policy dimensions, 945 precomputed scenario combinations, 97.3% accuracy / 0.998 AUC XGBoost",
      gradient: "from-lime-600/30 via-green-950/20 to-black",
      badge: "Building for Good Hackathon"
    }
  ] as ProjectItem[],

  skillsData: [
    {
      title: "Programming & Data",
      skills: [
        { name: "Python", iconName: "python" },
        { name: "SQL", iconName: "database" },
        { name: "Java", iconName: "code" },
        { name: "Bash / Linux", iconName: "terminal" },
        { name: "Pandas", iconName: "table" },
        { name: "NumPy", iconName: "binary" },
        { name: "Feature Engineering", iconName: "cpu" },
        { name: "Data Preprocessing", iconName: "filter" }
      ]
    },
    {
      title: "Machine Learning & Deep Learning",
      skills: [
        { name: "PyTorch", iconName: "flame" },
        { name: "TensorFlow & Keras", iconName: "brain" },
        { name: "Scikit-Learn", iconName: "activity" },
        { name: "XGBoost", iconName: "zap" },
        { name: "Optuna (Bayesian)", iconName: "sliders" },
        { name: "SHAP Explainability", iconName: "eye" },
        { name: "OpenCV (Computer Vision)", iconName: "camera" },
        { name: "CNNs (mini-XCEPTION)", iconName: "layers" }
      ]
    },
    {
      title: "Generative AI, LLMs & Cloud",
      skills: [
        { name: "RAG Architecture", iconName: "network" },
        { name: "Hugging Face", iconName: "smile" },
        { name: "ChromaDB (Vector DB)", iconName: "database" },
        { name: "PEFT / LoRA Fine-Tuning", iconName: "git-merge" },
        { name: "RLHF & Prompt Eng", iconName: "sparkles" },
        { name: "Anthropic Claude API", iconName: "bot" },
        { name: "AWS & GCP (Vertex AI)", iconName: "cloud" },
        { name: "Docker & Kubernetes (GKE)", iconName: "container" }
      ]
    },
    {
      title: "AI-Assisted Development",
      skills: [
        { name: "Google Antigravity", iconName: "sparkles" },
        { name: "Anthropic Claude (Claude Code)", iconName: "bot" },
        { name: "Agentic Coding Workflows", iconName: "workflow" }
      ]
    }
  ] as SkillCategory[],

  experience: [
    {
      role: "Data Science Volunteer",
      company: "Data Science Alliance",
      location: "San Diego, CA",
      period: "Sep 2026 – Present",
      type: "Part-time",
      bullets: [
        "Contributing to a public-interest data science project analyzing longitudinal unsheltered homelessness data across Downtown San Diego (2012–present) in partnership with municipal stakeholders.",
        "Designed and executed an end-to-end data auditing and validation pipeline, cross-referencing multi-year counts against source reports to ensure high data integrity (97.5%+ fidelity).",
        "Standardized schemas and built geospatial crosswalks across 380+ downtown blocks and neighborhood boundaries to enable spatial panel modeling.",
        "Preparing datasets for time-series decomposition, spatial hotspot analysis (Getis-Ord Gi*), and predictive forecasting models."
      ],
      tools: ["Python", "Pandas", "NumPy", "Time Series Analysis", "Geospatial Data (GeoJSON)", "Asana"]
    }
  ] as ExperienceItem[],

  education: [
    {
      school: "University of California, San Diego (UCSD)",
      location: "San Diego, CA",
      degree: "Bachelor of Science in Data Science",
      period: "Class of 2028",
      badge: "UC San Diego",
      coursework: [
        "Advanced Machine Learning",
        "Data Engineering",
        "Statistical Modeling",
        "Algorithmic Data Analysis"
      ]
    },
    {
      school: "Skyline College",
      location: "San Bruno, CA",
      degree: "Associate Studies in Data Science",
      period: "Aug 2024 – May 2026",
      gpa: "4.0 GPA",
      badge: "4.0 GPA",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java)",
        "Linear Algebra",
        "Multivariable Calculus"
      ]
    }
  ] as EducationItem[],

  certifications: [
    {
      issuer: "DeepLearning.AI, Stanford Online & AWS",
      category: "Coursera Credentials",
      period: "2025 – 2026",
      certs: [
        {
          name: "Generative AI with Large Language Models",
          issuer: "DeepLearning.AI & AWS",
          link: "https://www.coursera.org/account/accomplishments/verify/5QI73UPMCSYY"
        },
        {
          name: "Deep Learning Specialization (CNNs, Sequence Models, Optimization)",
          issuer: "DeepLearning.AI",
          link: "https://www.coursera.org/account/accomplishments/specialization/DDUQD294T6YG"
        },
        {
          name: "Machine Learning Specialization (Supervised/Unsupervised, RL)",
          issuer: "Stanford Online & DeepLearning.AI",
          link: "https://www.coursera.org/account/accomplishments/specialization/APSG10B8RIFD"
        },
        {
          name: "Mathematics for Machine Learning and Data Science",
          issuer: "DeepLearning.AI",
          link: "https://www.coursera.org/account/accomplishments/specialization/XXZEJ28KIL6B"
        }
      ]
    },
    {
      issuer: "Google Cloud, IBM & University Programs",
      category: "Industry Credentials",
      period: "2025 – 2026",
      certs: [
        {
          name: "Google Cloud Skills Boost Portfolio (Vertex AI, LLM Prompting, Model Tuning, Chaiyo GCP)",
          issuer: "Google Cloud",
          link: "https://www.skills.google/public_profiles/7fbe1d02-3600-47d0-b4e3-ad475c1e9425"
        },
        {
          name: "Frontier Tech Leaders Programme (Myanmar Machine Learning Bootcamp)",
          issuer: "UNDP",
          link: "https://drive.google.com/drive/folders/13HOfL--zlcfJl6qbSEeXNSstzEL-gkC8?usp=sharing"
        },
        {
          name: "Applied Python & Software Development",
          issuer: "Harvard (CS50P)",
          link: "https://www.coursera.org/account/accomplishments/verify/GX0PKGYXUS5H"
        },
        {
          name: "Agile Scrum Methodologies",
          issuer: "IBM",
          link: "https://www.coursera.org/account/accomplishments/verify/SR3OHZRW0HNE"
        },
        {
          name: "Python for Everybody Specialization",
          issuer: "University of Michigan",
          link: "https://www.coursera.org/account/accomplishments/specialization/H7S9D5HB2ARL"
        }
      ]
    }
  ] as CertificationCategory[],

  honors: [
    {
      title: "Jack Kent Cooke Scholarship",
      award: "National Semifinalist",
      year: "2026",
      detail: "Prestigious national scholarship recognizing top-tier high-achieving undergraduate scholars across the United States.",
      link: "https://www.jkcf.org/our-stories/2026-transfer-scholarship-semifinalists/"
    },
    {
      title: "Sterling Redman Scholarship & F.L. Griffin Scholarship",
      award: "Skyline College Recipient",
      year: "2025 – 2026",
      detail: "Merit-based scholarships awarded for academic excellence and outstanding contributions in mathematics and data science.",
      link: "https://drive.google.com/drive/folders/1sMsyuERvumyvM1TJFPBT6aW9CWM-5No6?usp=sharing"
    },
    {
      title: "Teacher Ni Language Centre",
      award: "Academic Tutor",
      year: "Oct 2022 – Dec 2023",
      detail: "Mentored cohorts of 40+ students through structured technical curricula, conducting weekly evaluations and individualized feedback."
    }
  ] as HonorItem[],

  services: [
    {
      title: "Generative AI & RAG Pipelines",
      icon: "bot",
      description: "End-to-end document intelligence systems with local vector embeddings, citation groundings, and multi-provider LLM integrations."
    },
    {
      title: "Tabular Machine Learning & Modeling",
      icon: "activity",
      description: "Leakage-free ML architectures with automated Optuna Bayesian tuning, SHAP explainability, and cost-benefit ROI analysis."
    },
    {
      title: "Computer Vision & Edge Inference",
      icon: "camera",
      description: "Lightweight CNN model training (mini-XCEPTION) and high-throughput, low-latency OpenCV inference pipelines for real-time video."
    },
    {
      title: "Cloud Deployment & MLOps",
      icon: "cloud",
      description: "Containerized model deployment using Docker, Kubernetes (GKE), Streamlit dashboards, Vertex AI, and GCP/AWS infrastructure."
    }
  ]
};
