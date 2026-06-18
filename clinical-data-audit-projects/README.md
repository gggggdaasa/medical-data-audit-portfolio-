# Clinical Data Auditing & Systems Integration Projects
# مشاريع تدقيق البيانات الطبية والربط الأنظمة الآمن

This directory contains the actual high-quality source code for the 3 clinical analysis projects highlighted in the portfolio website. You can run these locally or integrate them into your production workflows.

يحتوي هذا المجلد على الأكواد البرمجية الحقيقية وعالية الجودة للمشاريع الثلاثة التي تم إبرازها واستعراضها في موقعك الشخصي لتدقيق السجلات والتحليل الإحصائي الإكلينيكي.

---

## 🚀 How to Upload This to Your Personal GitHub Account
## 🚀 طريقة رفع ودفع هذه المشاريع مباشرة على حسابك الشخصي في GitHub

Your complete portfolio application—including these **3 real-world backend projects**—is stored inside this AI Studio Workspace. You can export them directly to your GitHub in one of two super easy ways:

إن تطبيق معرض أعمالك الإكلينيكي كاملاً - بما في ذلك **أكواد هذه المشاريع الثلاثة الحية** - محفوظ داخل مساحة العمل هذه. يمكنك رفعها فوراً ومباشرتها لحسابك الشخصي على جيت هَب بإحدى طريقتين بسيطتين للغاية:

### Method 1: The One-Click GitHub Export inside AI Studio (الخيار الأسرع بنقرة واحدة)
1. Look at the top right header panel/navigation sidebar inside the **AI Studio** editor workspace.
2. Open the **Settings Menu** (or look for the **Export / Push to GitHub** button).
3. Connect your personal GitHub account securely.
4. Name your new repository (e.g. `medical-data-audit-portfolio`) and click **Export / Create Repository**.
5. AI Studio will automatically configure and push all files, components, and these real-life Python/R script projects to your account instantly!

1. انظر إلى شريط الإعدادات والتحكم في الزاوية العلوية لمساحة عمل **Google AI Studio**.
2. افتح قائمة **إرسال/تصدير (Export / Push to GitHub)** لتوصيل حسابك بأمان.
3. اكتب الاسم المرغوب للمستودع الخاص بك (مثلاً: `medical-data-audit-portfolio`) ثم انقر فوق زر **رفع التغييرات (Export)**.
4. سيقوم محرك المشروع تلقائياً برفع كامل الكود المصدري بما فيه هذه الملفات إلى حسابك مباشرة بنقرة واحدة!

### Method 2: Local ZIP Download (تنزيل الملفات محلياً)
1. Click the menu next to the project title and select **Export as ZIP Archive**.
2. Unzip it locally on your machine, initialize a git repository manually (`git init`), add your remote (`git remote add origin ...`), and push it on your GitHub dashboard!

1. اختر **تحميل كملف مضغوط (Export as ZIP)** لتحميله على حاسوبك برابط مباشر.
2. فك الضغط عن الملف، ثم افتح موجّه الأوامر واكتب برمجياً:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of full medical portfolio projects"
   git remote add origin <رابط-مستودعك-على-جيت-هب>
   git branch -M main
   git push -u origin main
   ```

---

## 📁 Projects Breakdown & How to Execute Them 
## 📁 تفصيل المشاريع الثلاثة وطريقة تشغيل الأكواد برمجياً

### 1️⃣ Project 1: Advanced Patient Sheet Cleaning (Python) 
**File**: `project1_data_cleaning.py`
* **What it does**: Automatically targets missing data rows, standardizes diverse clinic dates representation into standard ISO 8601, filters extreme clinical outliers with physiology bounds, and saves a customized, beautifully colored spreadsheet using `openpyxl`.
* **How to Run**:
  ```bash
  pip install pandas numpy openpyxl
  python project1_data_cleaning.py
  ```
* **Output**: A fully stylized dashboard spreadsheet named `Cleaned_Patient_Medical_Audit.xlsx` highlights severe clinical anomalies in warning fills for swift medical correction.

---

### 2️⃣ Project 2: Biostatistical Imputation & Profile Visualizer (R Language)
**File**: `project2_biostats_profiling.R`
* **What it does**: Harnesses the statistical power of standard clinical analysis (`dplyr`) to impute missing biostatistical fields (Age, Heart Rate, Cholesterol) relative to patient clinic group demographics, and plots analytical outlier density figures (`ggplot2`).
* **How to Run**:
  Ensure you have **R** installed on your terminal, then run:
  ```bash
  Rscript project2_biostats_profiling.R
  ```
* **Output**: It generates a fully compiled scientific research quality visualization report PDF named `clinical_biostats_profiling.pdf` detailing the density curves before and after strategic imputation.

---

### 3️⃣ Project 3: AI-Powered Privacy MCP Server (Python Server)
**File**: `project3_mcp_ethics_server.py`
* **What it does**: Provides a standard Model Context Protocol (MCP) server over standard JSON-RPC stdio. Features custom built-in privacy filter middleware representing state-of-the-art **AI Ethics** paradigms; strictly redacts full names, SSNs, and identity keys before exposure to large language model agents.
* **How to Run (Interactive Test Mode)**:
  ```bash
  python project3_mcp_ethics_server.py --test
  ```
* **What it returns**: Live, securely aggregated diagnostic terminal diagnostics showing safe redacted records to LLMs, alongside exact duplicate accounts recommended for clinical file merge databases.
