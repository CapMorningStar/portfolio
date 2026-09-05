# Generates public/resume.pdf, the file served by /api/resume and /api/resume/preview
# (the "Download PDF" button and preview iframe on the /resume page, and the "Download"
# button on the homepage).
#
# Content here mirrors the finalized general/master resume built and approved in the
# separate D:\Projects\Resume repo (build_resume_general.py), which is kept in sync with:
#   D:\MSI\Scholarship Document\Kyaw Soe Lwin\JOB\MY CV\MASTER_BACKGROUND.md  (source of truth)
#   D:\MSI\Scholarship Document\Kyaw Soe Lwin\JOB\MY CV\Kyaw_Soe_Lwin_Resume.pdf (approved copy)
#   src/data/portfolioData.ts                                                (site + chatbot data)
#   src/app/resume/page.tsx                                                  (on-site HTML preview)
#
# Section order: Summary -> Education -> Technical Skills -> Technical Projects ->
# Experience & Honors. No separate Certifications section (folded into Technical Skills
# instead, per feedback to favor skills/experience over listing certs). No GPA line and
# no Skyline College entry (dropped per feedback). Project GitHub links and header
# LinkedIn/GitHub/Portfolio/email links are real clickable link annotations (plain
# black underlined text, not blue) to signal they're links without color.
#
# Requires: pip install reportlab pypdf
# Run from anywhere: python scripts/generate_resume_pdf.py

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import black
from reportlab.platypus import SimpleDocTemplate, Paragraph, HRFlowable, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO_ROOT, "public", "resume.pdf")

doc = SimpleDocTemplate(
    OUT, pagesize=letter,
    topMargin=0.25 * inch, bottomMargin=0.20 * inch,
    leftMargin=0.50 * inch, rightMargin=0.50 * inch,
    title="Kyaw Soe Lwin - Resume",
    author="Kyaw Soe Lwin",
)

name_style = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22, alignment=TA_CENTER, spaceAfter=3, leading=24)
contact_style = ParagraphStyle('contact', fontName='Helvetica', fontSize=9.3, alignment=TA_CENTER, spaceAfter=5, leading=11.2)
h2_style = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=9.7, spaceBefore=5, spaceAfter=1.9, leading=11)
body_style = ParagraphStyle('body', fontName='Helvetica', fontSize=8.9, alignment=TA_JUSTIFY, leading=11.9, spaceAfter=1.9)
skill_style = ParagraphStyle('skill', fontName='Helvetica', fontSize=8.7, leading=11.7, spaceAfter=1.9)
proj_meta_style = ParagraphStyle('projmeta', fontName='Helvetica-Oblique', fontSize=8.4, leading=10.8, spaceAfter=1.8)
bullet_style = ParagraphStyle('bullet', fontName='Helvetica', fontSize=8.7, leading=11.3, leftIndent=12, bulletIndent=2, spaceAfter=1.8)
row_label_style = ParagraphStyle('rowlabel', fontName='Helvetica-Bold', fontSize=8.9, leading=11.3)
row_date_style = ParagraphStyle('rowdate', fontName='Helvetica', fontSize=8.7, leading=11.3, alignment=2)
plain_style = ParagraphStyle('plain', fontName='Helvetica', fontSize=8.7, leading=11.3, spaceAfter=1.9)


def hr():
    return HRFlowable(width="100%", thickness=1.0, color=black, spaceBefore=0, spaceAfter=4)


def row(left, right, lstyle=row_label_style, rstyle=row_date_style):
    t = Table([[Paragraph(left, lstyle), Paragraph(right, rstyle)]], colWidths=[5.5 * inch, 2.0 * inch], hAlign='LEFT')
    t.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


story = []

story.append(Paragraph("Kyaw Soe Lwin", name_style))
story.append(Paragraph(
    '<link href="https://linkedin.com/in/kyaw-soe-lwin-687643314"><u>LinkedIn</u></link> | '
    '<link href="https://github.com/CapMorningStar"><u>GitHub</u></link> | '
    '<link href="https://kyawsoelwin.vercel.app"><u>Portfolio</u></link> | '
    '<link href="mailto:kylwin@ucsd.edu"><u>kylwin@ucsd.edu</u></link> | '
    '(+1) 650-609-8498',
    contact_style))

story.append(Paragraph("PROFESSIONAL SUMMARY", h2_style))
story.append(hr())
story.append(Paragraph(
    "Data Science undergraduate at UC San Diego (4.0 GPA) building leakage-free ML pipelines, Generative AI/LLM "
    "systems (RAG, PEFT/LoRA), and computer vision applications in Python. Proficient in Scikit-Learn, XGBoost, "
    "PyTorch, and SQL, with hands-on cloud deployment across AWS and GCP (Vertex AI).",
    body_style))

story.append(Paragraph("EDUCATION", h2_style))
story.append(hr())
story.append(row("<b>University of California, San Diego (UCSD)</b> \u2013 San Diego, CA", "Expected June 2028", row_label_style, row_date_style))
story.append(Paragraph("Bachelor of Science in Data Science", plain_style))
story.append(Paragraph("<b>Relevant Coursework:</b> Advanced Machine Learning, Data Engineering, Statistical Modeling, Algorithmic Data Analysis, Linear Algebra, Multivariable Calculus, Data Structures &amp; Algorithms, Object-Oriented Programming (Java)", plain_style))

story.append(Paragraph("TECHNICAL SKILLS", h2_style))
story.append(hr())
skills = [
    ("Statistics &amp; Experimentation:", "A/B Testing, Hypothesis Testing, Statistical Data Analysis, Leakage Audits, Generalization Validation, Bayesian Optimization (Optuna), Time Series Analysis, Geospatial Analysis (Getis-Ord Gi*)"),
    ("Data Science &amp; Machine Learning:", "Scikit-Learn, XGBoost, PyTorch, TensorFlow/Keras, Supervised/Unsupervised Learning, SHAP Interpretability, Feature Engineering, ColumnTransformer Pipelines, CNNs, Computer Vision (OpenCV)"),
    ("Programming &amp; Data Systems:", "Python, SQL (Querying &amp; Aggregations), Java, Bash/Linux, Pandas, NumPy, Exploratory Data Analysis, Data Auditing &amp; Schema Standardization"),
    ("GenAI, LLMs &amp; Agents:", "Hugging Face Transformers, RAG Architectures, Chroma Vector DB, LLM APIs (Anthropic Claude), Prompt Engineering, PEFT/LoRA Fine-Tuning, RLHF"),
    ("Cloud &amp; MLOps:", "AWS, GCP (Vertex AI), Docker, Kubernetes (GKE), Streamlit, Git/GitHub, Agile/Scrum, Automated Unit Testing, CI/CD"),
    ("AI-Assisted Development:", "Anthropic Claude Code, Google Antigravity, Agentic Coding Workflows"),
]
for label, val in skills:
    story.append(Paragraph(f"<b>{label}</b> {val}", skill_style))

story.append(Paragraph("TECHNICAL PROJECTS", h2_style))
story.append(hr())

projects = [
    ("Telco Customer Churn Prediction &amp; Profit Thresholding", "2026",
     "https://github.com/CapMorningStar/telco-churn-pipeline",
     "Python, SQL, Scikit-Learn, XGBoost, Optuna, SHAP, Streamlit",
     [
        "Formulated a leakage-free predictive ML framework on 7,043 customer records, enforcing a stratified 70/15/15 train/val/test split to guarantee generalization.",
        "Executed a 30-trial Bayesian hyperparameter search (Optuna) with cross-validation, achieving 0.844 ROC-AUC / 0.671 PR-AUC with a &lt;3.5-point generalization gap.",
        "Interpreted model decisions using TreeSHAP attribution and mapped findings to a cost-sensitive ROI matrix ($20 cost / $200 LTV) via an interactive Streamlit dashboard.",
     ]),
    ("Priceout Collective \u2014 Affordability Policy Simulator", "2026",
     "https://github.com/eliseoa-dev/priceoutcollective",
     "Python, Pandas, XGBoost, Scikit-Learn, JavaScript \u00b7 Building for Good Hackathon",
     [
        "Modeled 1.17M household records across 4 policy dimensions, precomputing 945 scenario combinations for zero-latency, stakeholder-facing simulation.",
        "Diagnosed and eliminated target leakage in an XGBoost model, reaching 97.3% accuracy / 0.998 AUC, and validated results against ALICE and HUD CHAS housing benchmarks.",
     ]),
    ("Local Expert \u2014 Offline PDF QA Engine (RAG Pipeline)", "2026",
     "https://github.com/CapMorningStar/-local-expert-rag",
     "Python, Hugging Face Transformers, Chroma, Anthropic Claude API, Streamlit",
     [
        "Architected an end-to-end Retrieval-Augmented Generation system, hand-crafting chunking, sentence embeddings, and vector indexing to deliver citation-grounded answers over private documents.",
        "Designed a swappable LLM provider interface (Anthropic Claude API and local Ollama) behind a shared configuration layer.",
     ]),
    ("LoRA TinyLlama-1.1B Instruction Fine-Tuning", "2026",
     "https://github.com/CapMorningStar/lora-tinyllama-finetune",
     "PyTorch, Hugging Face, PEFT/LoRA, Transformers, Google Colab",
     [
        "Configured low-rank adaptation (LoRA) matrices targeting attention projection layers, reducing trainable parameter footprint by &gt;95% on a resource-constrained T4 GPU.",
     ]),
]

for title, date, repo_url, meta, bullets in projects:
    story.append(row(title, date, row_label_style, row_date_style))
    story.append(Paragraph(
        f'{meta} &nbsp;\u00b7&nbsp; <link href="{repo_url}"><u>GitHub Repo</u></link>',
        proj_meta_style))
    for b in bullets:
        story.append(Paragraph(f"- {b}", bullet_style))

story.append(Paragraph("EXPERIENCE &amp; HONORS", h2_style))
story.append(hr())
story.append(row("<b>Data Science Alliance</b> \u2013 <i>Data Science Volunteer</i>", "Sep 2026 \u2013 Present"))
story.append(Paragraph("- Built an end-to-end data auditing/validation pipeline on longitudinal unsheltered-homelessness data across Downtown San Diego (2012\u2013present), cross-referencing multi-year counts to reach 97.5%+ fidelity.", bullet_style))
story.append(Paragraph("- Standardized schemas and built geospatial crosswalks across 380+ downtown blocks, preparing datasets for time-series decomposition and spatial hotspot forecasting (Getis-Ord Gi*).", bullet_style))
story.append(row("<b>Teacher Ni Language Centre</b> \u2013 <i>Academic Tutor</i>", "Oct 2022 \u2013 Dec 2023"))
story.append(Paragraph("- Mentored 40+ students through structured technical curricula, delivering clear, actionable feedback via weekly evaluations.", bullet_style))
story.append(Paragraph("<b>Honors:</b> Jack Kent Cooke Transfer Scholarship Semifinalist (2026) \u00b7 Sterling Redman &amp; F.L. Griffin Scholar (2025\u20132026)", plain_style))

doc.build(story)

reader = PdfReader(OUT)
print(f"Build successful! Total pages: {len(reader.pages)}")
assert len(reader.pages) == 1, "Must be exactly 1 page!"
