# Generates public/resume.pdf, the file served by /api/resume and /api/resume/preview
# (the "Download PDF" button and preview iframe on the /resume page).
#
# Content here should stay in sync with:
#   D:\MSI\Scholarship Document\Kyaw Soe Lwin\JOB\MY CV\MASTER_BACKGROUND.md  (source of truth)
#   src/data/portfolioData.ts                                                (site + chatbot data)
#   src/app/resume/page.tsx                                                  (on-site HTML preview)
#
# Format follows the ATS-friendly guidelines from the tailored-resume-generator skill
# (D:\MSI\Scholarship Document\Kyaw Soe Lwin\JOB\MY CV\SKILL.md): standard section headings,
# no tables/graphics, action-verb bullets, reverse-chronological order.
#
# Requires: pip install reportlab
# Run from anywhere: python scripts/generate_resume_pdf.py

import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem
)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(REPO_ROOT, "public", "resume.pdf")

DARK = HexColor("#111111")
ACCENT = HexColor("#0e7490")  # cyan-ish, print-safe
GRAY = HexColor("#444444")
LIGHT_GRAY = HexColor("#666666")

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20, leading=22, textColor=DARK, alignment=TA_CENTER, spaceAfter=2),
    "headline": ParagraphStyle("headline", fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=6),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.5, leading=11, textColor=GRAY, alignment=TA_CENTER, spaceAfter=10),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=ACCENT, spaceBefore=10, spaceAfter=4, letterSpacing=0.6),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=DARK),
    "meta": ParagraphStyle("meta", fontName="Helvetica-Oblique", fontSize=8, leading=10, textColor=LIGHT_GRAY, spaceAfter=2),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8.5, leading=11.5, textColor=GRAY),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=8.3, leading=11, textColor=GRAY, leftIndent=10, spaceAfter=1.5),
    "skillval": ParagraphStyle("skillval", fontName="Helvetica", fontSize=8.3, leading=11, textColor=GRAY, spaceAfter=4),
}


def hr():
    return HRFlowable(width="100%", thickness=0.6, color=HexColor("#cccccc"), spaceBefore=2, spaceAfter=6)


def section_title(text):
    return Paragraph(text.upper(), styles["section"])


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(item, styles["bullet"]), leftIndent=10, bulletColor=GRAY) for item in items],
        bulletType="bullet", bulletFontSize=6, start="circle", leftIndent=12, spaceBefore=1, spaceAfter=4,
    )


def project_block(title, meta, desc_items):
    return [
        Paragraph(title, styles["role"]),
        Paragraph(meta, styles["meta"]),
        bullets(desc_items),
    ]


def build():
    doc = SimpleDocTemplate(
        OUT_PATH, pagesize=LETTER,
        topMargin=0.55 * inch, bottomMargin=0.55 * inch,
        leftMargin=0.65 * inch, rightMargin=0.65 * inch,
        title="Kyaw Soe Lwin - AI/ML Engineer Resume",
        author="Kyaw Soe Lwin",
    )

    story = []

    # Header
    story.append(Paragraph("KYAW SOE LWIN", styles["name"]))
    story.append(Paragraph("Data Science &amp; AI/ML Engineer", styles["headline"]))
    story.append(Paragraph(
        "San Diego, CA &nbsp;|&nbsp; kylwin@ucsd.edu &nbsp;|&nbsp; (+1) 650-609-8498 &nbsp;|&nbsp; "
        "linkedin.com/in/kyaw-soe-lwin-687643314 &nbsp;|&nbsp; github.com/CapMorningStar",
        styles["contact"],
    ))
    story.append(hr())

    # Professional Summary
    story.append(section_title("Professional Summary"))
    story.append(Paragraph(
        "Data Science &amp; AI/ML Engineer with deep hands-on expertise building production machine learning "
        "pipelines, Retrieval-Augmented Generation (RAG) systems, and real-time computer vision engines. Proven "
        "track record in parameter-efficient fine-tuning (PEFT/LoRA), leakage-free tabular modeling "
        "(0.844 ROC-AUC), and cloud deployment across AWS and GCP (Vertex AI). Backed by a 4.0 GPA at UC San "
        "Diego, national Jack Kent Cooke Semifinalist honors, and 9 verified industry credentials in "
        "Generative AI and Deep Learning.",
        styles["body"],
    ))

    # Professional Experience
    story.append(section_title("Professional Experience"))
    story.append(Paragraph("Data Science Volunteer &mdash; Data Science Alliance", styles["role"]))
    story.append(Paragraph("San Diego, CA (Part-time) &middot; Sep 2026 &ndash; Present", styles["meta"]))
    story.append(bullets([
        "Contributing to a public-interest data science project analyzing longitudinal unsheltered homelessness "
        "data across Downtown San Diego (2012&ndash;present) in partnership with municipal stakeholders.",
        "Designed and executed an end-to-end data auditing and validation pipeline, cross-referencing multi-year "
        "counts against source reports to ensure high data integrity (97.5%+ fidelity).",
        "Standardized schemas and built geospatial crosswalks across 380+ downtown blocks and neighborhood "
        "boundaries to enable spatial panel modeling.",
        "Preparing datasets for time-series decomposition, spatial hotspot analysis (Getis-Ord Gi*), and "
        "predictive forecasting models. <i>Tools: Python, Pandas, NumPy, GeoJSON, Asana.</i>",
    ]))
    story.append(Paragraph("Academic Tutor &mdash; Teacher Ni Language Centre", styles["role"]))
    story.append(Paragraph("International &middot; Oct 2022 &ndash; Dec 2023", styles["meta"]))
    story.append(bullets([
        "Mentored cohorts of 40+ students through structured technical curricula, conducting weekly evaluations "
        "and providing individualized feedback.",
    ]))

    # Technical Skills (plain paragraphs, no tables/graphics -- ATS-safe per resume-generator skill)
    story.append(section_title("Technical Skills"))
    skills_data = [
        ("Programming &amp; Data", "Python, SQL, Java, Bash/Linux, Pandas, NumPy, Feature Engineering"),
        ("Machine Learning", "Scikit-Learn, XGBoost, Optuna (Bayesian Hyperparameter Tuning), SHAP Explainability, ROI Modeling"),
        ("Deep Learning &amp; Generative AI", "PyTorch, TensorFlow, Keras, Hugging Face Transformers, PEFT/LoRA Fine-Tuning, Retrieval-Augmented Generation (RAG), ChromaDB, Anthropic Claude API"),
        ("Cloud &amp; MLOps", "Amazon Web Services (AWS), Google Cloud Platform (Vertex AI, GKE), Docker, Kubernetes, Git/GitHub, Streamlit, CI/CD"),
        ("AI-Assisted Development", "Google Antigravity, Anthropic Claude (Claude Code), Agentic Coding Workflows"),
    ]
    for label, value in skills_data:
        story.append(Paragraph(f"<b>{label}:</b> {value}", styles["skillval"]))

    # Education
    story.append(section_title("Education"))
    story.append(Paragraph("University of California, San Diego (UCSD) &mdash; Bachelor of Science in Data Science &middot; Class of 2028", styles["body"]))
    story.append(Paragraph("Skyline College &mdash; Associate Studies in Data Science &middot; GPA: 4.0/4.0 &middot; Aug 2024 &ndash; May 2026", styles["body"]))
    story.append(Paragraph(
        "<i>Relevant Coursework:</i> Data Structures &amp; Algorithms, Object-Oriented Programming (Java), "
        "Linear Algebra, Multivariable Calculus",
        styles["body"],
    ))

    # Technical Projects
    story.append(section_title("Technical Projects"))
    story.extend(project_block(
        "Local Expert &mdash; Offline PDF QA Engine (RAG Pipeline)",
        "Python, Hugging Face, ChromaDB, Anthropic Claude API, Ollama, Streamlit &middot; 2026",
        [
            "Architected an end-to-end local RAG pipeline for grounded question-answering over private PDFs "
            "with page-by-page chunking, local embeddings, and Chroma vector indexing.",
            "Designed a swappable LLM provider interface (Claude API &amp; local Ollama) delivering answers "
            "grounded with source file and page citations.",
        ],
    ))
    story.extend(project_block(
        "LoRA TinyLlama-1.1B Instruction Fine-Tuning",
        "PyTorch, Hugging Face, PEFT/LoRA, Google Colab (T4 GPU) &middot; 2026",
        [
            "Configured Parameter-Efficient Fine-Tuning (PEFT/LoRA) on TinyLlama-1.1B-Chat, reducing trainable "
            "parameters by &gt;95% while retaining baseline perplexity.",
        ],
    ))
    story.extend(project_block(
        "Telco Customer Churn Prediction &amp; ROI Pipeline",
        "Python, Scikit-Learn, XGBoost, Optuna, SHAP, Streamlit &middot; 2026",
        [
            "Built a leakage-free ML pipeline on 7,043 records with stratified 70/15/15 splits; 30-trial Optuna "
            "search achieved 0.844 ROC-AUC / 0.671 PR-AUC.",
            "Deployed a multi-tab Streamlit dashboard with SHAP explainability and cost-sensitive ROI modeling "
            "($20 cost / $200 LTV).",
        ],
    ))
    story.extend(project_block(
        "Priceout Collective &mdash; Affordability Policy Simulator",
        "Python, Pandas, XGBoost, Scikit-Learn, JavaScript &middot; Building for Good Hackathon &middot; 2026",
        [
            "Modeled 1.17M household records across 4 policy dimensions, precomputing 945 scenario combinations "
            "for zero-latency interactive simulation.",
            "Diagnosed and eliminated target leakage in an XGBoost model, reaching 97.3% accuracy / 0.998 AUC, "
            "validated against ALICE and HUD CHAS housing benchmarks.",
        ],
    ))
    story.extend(project_block(
        "Real-Time Facial Emotion Detection Engine",
        "Python, OpenCV, TensorFlow, Keras, mini-XCEPTION (FER-2013) &middot; 2026",
        [
            "Trained a lightweight mini-XCEPTION CNN with depthwise separable convolutions on FER-2013.",
            "Engineered a low-latency, multi-frame OpenCV inference pipeline rendering live probability "
            "distributions across 7 emotion classes.",
        ],
    ))

    # Certifications
    story.append(section_title("Certifications &amp; Specialized Training"))
    story.append(Paragraph(
        "<b>DeepLearning.AI, Stanford Online &amp; AWS</b> (2025&ndash;2026): Generative AI with Large Language "
        "Models &middot; Deep Learning Specialization &middot; Machine Learning Specialization &middot; "
        "Mathematics for Machine Learning and Data Science",
        styles["body"],
    ))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Google Cloud, IBM &amp; University Programs</b> (2025&ndash;2026): Google Cloud Skills Boost "
        "Portfolio (Vertex AI, LLM Prompting, Model Tuning) &middot; Frontier Tech Leaders Programme (UNDP) "
        "&middot; Applied Python &amp; Software Development (Harvard CS50P) &middot; Agile Scrum (IBM) &middot; "
        "Python for Everybody (Univ. of Michigan)",
        styles["body"],
    ))

    # Honors
    story.append(section_title("Honors &amp; Leadership"))
    story.append(bullets([
        "<b>Jack Kent Cooke Undergraduate Transfer Scholarship</b> &mdash; National Semifinalist (2026)",
        "<b>Sterling Redman Scholarship &amp; F.L. Griffin Scholarship</b> &mdash; Skyline College Recipient (2025&ndash;2026)",
        "<b>Teacher Ni Language Centre</b> &mdash; Academic Tutor, mentored 40+ students (2022&ndash;2023)",
    ]))

    doc.build(story)
    print("Wrote", OUT_PATH)


if __name__ == "__main__":
    build()
