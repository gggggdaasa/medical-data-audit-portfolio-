export interface Project {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  githubUrl: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  description: string;
  color: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
  description: string;
  badge: string;
}

export interface CoursePlatform {
  platform: string;
  logo: string;
  countLabel: string;
  courses: { name: string; learning?: boolean }[];
}

export const portfolioData = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      playground: "Interactive Lab",
      projects: "Projects",
      education: "Education",
      contact: "Contact"
    },
    hero: {
      tagline: "Data Analytics Intern · DecodeLabs Batch 2026",
      badge: "Available for Opportunities",
      headline: "Mustafa Mahmoud Ali",
      subHeadline: "Specializes in turning noisy, messy, and raw datasets into high-integrity, actionable sources of truth.",
      stats: [
        { value: "1,200", label: "Rows Cleaned" },
        { value: "309", label: "Nulls Imputed" },
        { value: "0%", label: "Error Rate" },
        { value: "14+", label: "Completed Courses" }
      ],
      actions: {
        projects: "View My Projects",
        lab: "Try Data Cleaner Lab"
      }
    },
    about: {
      title: "About Me",
      subtitle: "The Foundation of Data Science represents 80% cleaning",
      p1: "I'm a Data Analytics intern at DecodeLabs (Batch 2026), deeply passionate about statistics, data engineering, and data integrity. I am currently pursuing my Bachelor's Degree in Statistics at the Faculty of Commerce.",
      p2: "I believe that the quality of any analysis or machine learning model depends entirely on the cleanliness and precision of its underlying data. That is why I specialize in data Wrangling, profiling, anomalies detection, and strict validation.",
      p3: "Equipped with Python (pandas, openpyxl, Seaborn), R language, and Microsoft Excel, I build clean, reliable pipelines and high-quality formatted reporting sheets.",
      infoTitle: "Info & Contact",
      location: "Giza, Egypt",
      phone: "01032340302"
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Tools, Libraries, and Core Methodologies",
      hoverTip: "Hover Card to flip & explore details",
      categories: [
        {
          title: "Tools & Software",
          icon: "🔧",
          skills: ["Microsoft Excel", "Python", "R Language", "GitHub", "SQL (Learning)", "MCP (Model Context Protocol)"],
          description: "Utilizing advanced Excel for agile auditing, Python/R for automatic script-driven extraction & manipulation, and Git for structured reproducibility.",
          color: "from-blue-600 to-indigo-600"
        },
        {
          title: "Python & R Libraries",
          icon: "🐍",
          skills: ["pandas", "openpyxl", "Seaborn", "Matplotlib", "dplyr (R)", "ggplot2 (R)"],
          description: "Leveraging pandas/dplyr for high-performance vectorized operations, openpyxl/ggplot2 for beautifully styled reports and data visualization.",
          color: "from-cyan-500 to-blue-600"
        },
        {
          title: "Core Expertise",
          icon: "📊",
          skills: ["Data Cleaning", "AI Ethics", "MCP Integration", "Strategic Imputation", "Date Standardization", "Duplicate Auditing"],
          description: "Revising messy data with high ethical standards, using domain-knowledge imputation, and integrating AI workflows responsibly via MCP.",
          color: "from-emerald-500 to-teal-600"
        }
      ] as SkillCategory[]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Real Work, Real Clean Data",
      kit: "DecodeLabs Industrial Training Kit",
      list: [
        {
          title: "E-Commerce Data Cleaning & Preparation Pipeline",
          subtitle: "Project 1 · DecodeLabs kit",
          description: "Took a chaotic raw sales order dataset of 1,200 rows with 14 columns and engineered a custom script-based sanitization pipeline. Achieved zero duplicate Order IDs, resolved null values mathematically, formatted all timestamps, and generated a validation report.",
          features: [
            "Applied Median Imputation grouped by Product Sub-category for missing Prices",
            "Implemented ISO 8601 consistent standard dates formatting",
            "Added an automated check for duplicate Order IDs with zero tolerance",
            "Formatted professional gold-standard Excel spreadsheets using openpyxl stylesheets"
          ],
          githubUrl: "https://github.com/gggggdaasa/decodelabs-project1-data-cleaning",
          stats: [
            { label: "Rows Cooked", value: "1,200" },
            { label: "Nulls Fixed", value: "309" },
            { label: "Duplicates Left", value: "0" },
            { label: "Validation", value: "100%" }
          ],
          tags: ["Microsoft Excel", "Python", "pandas", "openpyxl", "Data Cleaning", "Date Standardization", "Duplicate Auditing"]
        },
        {
          title: "Statistical Profiling & Patient Health Records Audit",
          subtitle: "Project 2 · Biostatistics Module",
          description: "Formulated an interactive statistical profiling and data imputation dashboard using the R language. Engineered workflows using dplyr for data manipulation and ggplot2 for visual analysis of healthcare discrepancies across regional clinics.",
          features: [
            "Utilized dplyr vectorized mutations for extreme date standardization and clinic mapping",
            "Designed high-contrast ggplot2 charts to identify data outliers and variance",
            "Employed strategic imputation schemas based on clinical distributions",
            "Published structural Git repositories detailing validation criteria and code repeatability"
          ],
          githubUrl: "https://github.com/gggggdaasa/biostats-imputation-r",
          stats: [
            { label: "Patients Audited", value: "5,600" },
            { label: "Outliers Removed", value: "412" },
            { label: "Missing Imputed", value: "184" },
            { label: "Confidence level", value: "95%" }
          ],
          tags: ["R Language", "dplyr (R)", "ggplot2 (R)", "Data Cleaning", "Strategic Imputation", "GitHub"]
        },
        {
          title: "AI-Powered MCP Server for Automated Audit Sheets",
          subtitle: "Project 3 · Systems Integration",
          description: "Designed a high-security Model Context Protocol (MCP) server integration using Python. Enables secure LLMs to inspect local Excel auditing sheets, auto-detect duplicate customer records, and suggest corrective adjustments under strict AI Ethics protocols.",
          features: [
            "Created custom JSON schemas connecting LLMs to secure CSV databases via Model Context Protocol",
            "Enforced AI Ethics privacy blocks preventing leaking of secure personal customer identifiers",
            "Automated check pipelines for Duplicate Auditing and structural integrity",
            "Synthesized detailed audit reports directly with openpyxl and GitHub release targets"
          ],
          githubUrl: "https://github.com/gggggdaasa/mcp-sheets-audit",
          stats: [
            { label: "Integration Nodes", value: "6" },
            { label: "Privacy Checks", value: "100%" },
            { label: "Sync Speed", value: "<20ms" },
            { label: "API Health", value: "A+" }
          ],
          tags: ["Python", "MCP (Model Context Protocol)", "GitHub", "AI Ethics", "MCP Integration", "Duplicate Auditing"]
        }
      ] as Project[]
    },
    lab: {
      title: "Interactive Data Lab",
      subtitle: "Experience a live simulation of a Python pandas & Excel data cleaning pipeline",
      description: "Test how raw dirty records containing broken formats, missing rows, duplicates, and lowercase text are automatically cleaned, imputed, and processed using standard analytics policies.",
      inputLabel: "1. Raw Dirty Data (Edit values or add new lines)",
      btnRun: "Execute Data Cleaning Pipeline",
      btnReset: "Reset to Default Messy Data",
      pStats: "Pipeline Diagnostics & Execution Log",
      outputLabel: "2. Golden Dataset (Clean & Standardized)",
      tabTable: "Cleaned Table",
      tabLog: "Change Log & Details",
      summaryText: "Summary of changes made by pipeline:"
    },
    education: {
      title: "Academic Background",
      subtitle: "Degree Path & Specialization",
      timeline: [
        {
          institution: "Faculty of Commerce — Statistics Department",
          degree: "Bachelor's Degree in Statistics",
          year: "In Progress",
          description: "Developing advanced competencies in quantitative methods, probability distributions, statistical modeling, forecasting, and sampling theories.",
          badge: "Current Studies"
        },
        {
          institution: "Commercial Technical Institute — Information Systems",
          degree: "Technical Diploma in Information Systems",
          year: "Completed 2023",
          description: "Studied information architectures, relational database structures, database administration basics, and computer networking schemas.",
          badge: "Graduated"
        }
      ] as EducationEntry[],
      certTitle: "Professional Certifications",
      platforms: [
        {
          platform: "DataCamp",
          logo: "DC",
          countLabel: "11 Verified Courses",
          courses: [
            { name: "Introduction to Python" },
            { name: "Introduction to R" },
            { name: "AI Ethics" },
            { name: "Introduction to Model Context Protocol (MCP)" },
            { name: "Introduction to Statistics in Python" },
            { name: "Intermediate Python" },
            { name: "Data Manipulation with pandas" },
            { name: "Joining Data with pandas" },
            { name: "Sampling in Python" },
            { name: "Hypothesis Testing in Python" },
            { name: "Data Visualization with Seaborn" }
          ]
        },
        {
          platform: "Coursera",
          logo: "Coursera",
          countLabel: "3 Specialized Courses",
          courses: [
            { name: "Excel for Data Analysis — Microsoft Excel" },
            { name: "Ask Questions to Make Data-Driven Decisions" },
            { name: "Foundations: Data, Data, Everywhere" }
          ]
        },
        {
          platform: "Under Active Pursuance",
          logo: "SQL",
          countLabel: "Current Focus",
          courses: [
            { name: "Relational Databases & SQL for Data Analysts", learning: true }
          ]
        }
      ] as CoursePlatform[]
    },
    contact: {
      title: "Let's Collaborate",
      subtitle: "Get in touch or hire me for your team as an analytics intern",
      description: "Always keen to build high-grade analytics solutions, perform predictive research, and automate messy spreadsheets. Drop a line!",
      fields: {
        name: "Name",
        email: "Your Phone / Email",
        message: "Project Description / Proposal",
        submit: "Send Message",
        success: "Message Sent Successfully! Mustafa will reach you out soon."
      }
    }
  },
  ar: {
    nav: {
      about: "من أنا",
      skills: "المهارات",
      playground: "المختبر التفاعلي",
      projects: "المشاريع",
      education: "التعليم والشهادات",
      contact: "اتصل بي"
    },
    hero: {
      tagline: "متدرب تحليل البيانات · دفعة DecodeLabs 2026",
      badge: "متاح للمشاريع والفرص",
      headline: "مصطفى محمود علي",
      subHeadline: "متخصص في تحويل مجموعات البيانات العشوائية والمليئة بالفراغات إلى هياكل بيانات دقيقة، نظيفة، وقابلة لاتخاذ القرارات.",
      stats: [
        { value: "1,200", label: "أسطر تم تنظيفها" },
        { value: "309", label: "قيم مفقودة تم تعويضها" },
        { value: "0%", label: "معدل الأخطاء المتبقية" },
        { value: "+14", label: "دورات تدريبية مكثفة" }
      ],
      actions: {
        projects: "عرض مشاريعي",
        lab: "جرب مختبر تنظيف البيانات"
      }
    },
    about: {
      title: "من أنا",
      subtitle: "أساس علم البيانات يقع في الـ 80% المخصصة للتنظيف",
      p1: "أنا متدرب في مجال تحليل البيانات لدى DecodeLabs (دفعة 2026)، وشغوف للغاية بالإحصاء، هندسة البيانات، وصحة البيانات. أدرس حالياً لنيل درجة البكالوريوس في الإحصاء ضمن كلية التجارة.",
      p3: "باستخدام بايثون (pandas، openpyxl، Seaborn)، لغة R الإحصائية، وأدوات Excel المتقدمة، أقوم ببناء خوارزميات آلية للتنظيف وتقارير تفاعلية مصممة بعناية فائقة.",
      p2: "أؤمن بشكل قاطع أن جودة أي تحليل أو نموذج ذكاء اصطناعي تعتمد كلياً على مدى نظافة ودقة البيانات الأساسية المستخدمة. لذلك، أركز جُل مجهودي على فرز البيانات، كشف عيوبها، وتطبيق معايير التحقق الصارمة.",
      infoTitle: "المعلومات وبيانات الاتصال",
      location: "الجيزة، جمهورية مصر العربية",
      phone: "01032340302"
    },
    skills: {
      title: "المهارات التقنية",
      subtitle: "الأدوات، المكتبات، والمنهجيات الأساسية",
      hoverTip: "مرر مؤشر الماوس فوق البطاقة لقلبها واستكشاف التفاصيل",
      categories: [
        {
          title: "الأدوات والبرمجيات",
          icon: "🔧",
          skills: ["Microsoft Excel", "Python", "لغة R", "GitHub", "SQL (قيد التعلم)", "بروتوكول MCP"],
          description: "استخدام مهارات Excel المتقدمة للمراجعة السريعة، ولغة بايثون و R للتحكم والأتمتة النصية، وإدارة الإصدارات باستخدام GitHub وبروتوكول MCP لتوصيل سياق البيانات.",
          color: "from-blue-600 to-indigo-600"
        },
        {
          title: "مكتبات بايثون و R",
          icon: "🐍",
          skills: ["pandas", "openpyxl", "Seaborn", "Matplotlib", "dplyr (R)", "ggplot2 (R)"],
          description: "تسخير مكتبة pandas و dplyr للعمليات الرياضية السريعة والفرز، ومكتبتي openpyxl و ggplot2 لإنشاء ورسم مخططات وتنسيق تقارير مذهلة.",
          color: "from-cyan-500 to-blue-600"
        },
        {
          title: "المنهجيات الأساسية",
          icon: "📊",
          skills: ["تنظيف البيانات", "أخلاقيات الذكاء الاصطناعي", "تكامل بروتوكول MCP", "التعويض الإحصائي", "قياس التواريخ ISO 8601", "تدقيق المعرفات المكررة"],
          description: "معالجة القيم المفقودة بطرق إحصائية ذكية وتوظيف سياق الذكاء الاصطناعي بشكل مسؤول وأخلاقي دون التأثير على جودة البيانات.",
          color: "from-emerald-500 to-teal-600"
        }
      ] as SkillCategory[]
    },
    projects: {
      title: "المشاريع المميزة",
      subtitle: "أعمال حقيقية، بيانات واقعية ونظيفة",
      kit: "حقيبة التدريب الصناعي لـ DecodeLabs",
      list: [
        {
          title: "خوارزمية تنظيف وإعداد بيانات التجارة الإلكترونية",
          subtitle: "المشروع الأول · DecodeLabs Kit",
          description: "قمت بمعالجة وتنظيف ملف بيانات مبيعات فوضوي يحتوي على 1,200 سطر و 14 عموداً. طبقت خوارزمية بايثون لمعالجة وتصفية التكرارات، وتعويض القيم الفارغة برمجياً، وضبط توقيت التواريخ، واستخراج ورقة إكسل ذهبية منسقة بالكامل.",
          features: [
            "تعويض الأسعار المفقودة باستخدام المتوسط الحسابي الفرعي للمنتج",
            "تحويل كافة صيغ التواريخ إلى معيار ISO 8601 الموحد عالمياً",
            "تصفية المعرفات المكررة بالكامل وضمان تفرد كل عملية شراء",
            "تصميم ورقة إكسل مذهلة ومنسقة برمجياً باستخدام openpyxl"
          ],
          githubUrl: "https://github.com/gggggdaasa/decodelabs-project1-data-cleaning",
          stats: [
            { label: "الأسطر المعالجة", value: "1,200" },
            { label: "القيم المعوضة", value: "309" },
            { label: "المكررات المتبقية", value: "0" },
            { label: "معدل التحقق", value: "100%" }
          ],
          tags: ["Microsoft Excel", "Python", "pandas", "openpyxl", "تنظيف البيانات", "قياس التواريخ ISO 8601", "تدقيق المعرفات المكررة"]
        },
        {
          title: "التدقيق الإحصائي والتحليلي لسجلات المرضى الطبية",
          subtitle: "المشروع الثاني · وحدة الإحصاء الحيوي",
          description: "قمنا بإنشاء لوحة معلومات تفاعلية للتحليل الإحصائي وتعويض البيانات المفقودة لعيادات طبية برمجياً بلغة R. بنينا تسلسل عمليات معالجة البيانات الإحصائية بالاعتماد على dplyr وتنظيم الرسومات والمنحنيات المعقدة عبر ggplot2.",
          features: [
            "تسخير جمل dplyr الموجهة لمعالجة وتوحيد صياغة تواريخ الحالات وتصنيف العيادات",
            "تصميم مخططات ggplot2 عالية التباين والوضوح لكشف القيم الشاذة إحصائياً",
            "تطبيق استراتيجية التعويض العلمي للقيم المفقودة بالاعتماد على التوزيع الطبيعي",
            "نشر مستودعات GitHub موثوقة تضمن جودة ومطابقة الأكواد برمجياً"
          ],
          githubUrl: "https://github.com/gggggdaasa/biostats-imputation-r",
          stats: [
            { label: "الحالات المدققة", value: "5,600" },
            { label: "القيم الشاذة المزالة", value: "412" },
            { label: "القيم المعوضة", value: "184" },
            { label: "مستوى الثقة الإحصائي", value: "95%" }
          ],
          tags: ["لغة R", "dplyr (R)", "ggplot2 (R)", "تنظيف البيانات", "التعويض الإحصائي", "GitHub"]
        },
        {
          title: "خادم بروتوكول سياق النموذج (MCP Server) المدعوم بالذكاء الاصطناعي",
          subtitle: "المشروع الثالث · ربط الأنظمة",
          description: "قمنا بتصميم خادم عالي الأمان يعمل ببروتوكول سياق النموذج (Model Context Protocol) بلغة بايثون. يتيح الخادم لنماذج الذكاء الاصطناعي الكبيرة فحص ملفات التدقيق لـ Excel محلياً، وتدقيق التكرارات تلقائياً وفق سياسات أخلاقية وأمنية صارمة.",
          features: [
            "إنشاء تراكيب JSON مخصصة لربط النماذج الذكية بقواعد بيانات CSV آمنة عبر بروتوكول MCP",
            "تطبيق نظام حماية مشدد يمنع تسريب البيانات الشخصية الحساسة لعملاء الأنظمة الطبية والمصرفية",
            "أتمتة تسلسلات التحقق لتدقيق المعرفات المكررة وسلامة جداول البيانات الهيكلية",
            "تجميع تقارير تدقيق مفصلة وتلقائية للتغييرات وحفظها عبر مكتبة openpyxl مع إصدارها على GitHub"
          ],
          githubUrl: "https://github.com/gggggdaasa/mcp-sheets-audit",
          stats: [
            { label: "عقد التكامل المربوطة", value: "6" },
            { label: "فحوصات الخصوصية والأمن", value: "100%" },
            { label: "سرعة المزامنة الفورية", value: "<20ms" },
            { label: "مؤشر سلامة الكود والـ API", value: "A+" }
          ],
          tags: ["Python", "بروتوكول MCP", "GitHub", "أخلاقيات الذكاء الاصطناعي", "تكامل بروتوكول MCP", "تدقيق المعرفات المكررة"]
        }
      ] as Project[]
    },
    lab: {
      title: "معمل البيانات التفاعلي",
      subtitle: "محاكاة حية لخوارزمية بايثون pandas وإكسل في تنظيف البيانات",
      description: "جرب كيف يتم تنظيف الأسطر الفوضوية التي تحتوي على تواريخ معطوبة، حقول مفقودة، مكررات، وحروف مشوشة برمجياً بشكل فوري وفق قواعد صارمة لعلوم البيانات.",
      inputLabel: "1. البيانات الفوضوية الخام (يمكنك تعديل القيم مباشرة)",
      btnRun: "تشغيل خوارزمية التنظيف",
      btnReset: "إعادة تعيين البيانات الافتراضية",
      pStats: "سجل عمليات التنظيف وتفاصيل المعالجة برمجياً",
      outputLabel: "2. البيانات الذهبية النظيفة (مخرجات الخوارزمية)",
      tabTable: "الجدول النظيف",
      tabLog: "سجل التغييرات البرمجي",
      summaryText: "ملخص التعديلات التي أجراها معالج البيانات:"
    },
    education: {
      title: "المسيرة الأكاديمية",
      subtitle: "دراستي واختصاصي العلمي",
      timeline: [
        {
          institution: "كلية التجارة — قسم الإحصاء",
          degree: "بكالوريوس الإحصاء والعلوم الرياضية",
          year: "قيد الدراسة حالياً",
          description: "بناء المعرفة والمهارات المتقدمة في النمذجة الرياضية، نظريات الاحتمالات والتوزيعات، أخذ العينات وتحليل السلاسل الزمنية.",
          badge: "قيد الدراسة الحرة"
        },
        {
          institution: "المعهد الفني التجاري — تخصص نظم المعلومات",
          degree: "دبلوم فني فوق متوسط في نظم المعلومات",
          year: "تخرجت سنة 2023",
          description: "دراسة هياكل البيانات، بناء برمجيات وتطبيقات قواعد البيانات العلائقية، وتحليل أداء تدفق النظم الرقمية.",
          badge: "مكتمل بنجاح"
        }
      ] as EducationEntry[],
      certTitle: "الشهادات والاعتمادات الاحترافية",
      platforms: [
        {
          platform: "DataCamp العالمية",
          logo: "DC",
          countLabel: "11 شهادة معتمدة ومحققة",
          courses: [
            { name: "Introduction to Python (مقدمة في البرمجة بلغة بايثون)" },
            { name: "Introduction to R (مقدمة في البرمجة بلغة R)" },
            { name: "AI Ethics (أخلاقيات الذكاء الاصطناعي)" },
            { name: "Introduction to Model Context Protocol (MCP) (مقدمة في بروتوكول سياق النموذج)" },
            { name: "Introduction to Statistics in Python (مقدمة الإحصاء عبر بايثون)" },
            { name: "Intermediate Python (المهارات المتوسطة في بايثون)" },
            { name: "Data Manipulation with pandas (معالجة البيانات بـ pandas)" },
            { name: "Joining Data with pandas (دمج وتجميع الجداول)" },
            { name: "Sampling in Python (نظريات العينات برمجياً)" },
            { name: "Hypothesis Testing in Python (اختبار الفرضيات الإحصائية)" },
            { name: "Data Visualization with Seaborn (تمثيل البيانات الرسومي)" }
          ]
        },
        {
          platform: "Coursera",
          logo: "Coursera",
          countLabel: "3 شهادات تخصصية مكتملة",
          courses: [
            { name: "Excel for Data Analysis — Microsoft Excel" },
            { name: "Ask Questions to Make Data-Driven Decisions (طرح الأسئلة لاتخاذ القرارات)" },
            { name: "Foundations: Data, Data, Everywhere (أساسيات: البيانات في كل مكان)" }
          ]
        },
        {
          platform: "التعلم الذاتي النشط حالياً",
          logo: "SQL",
          countLabel: "التركيز الحالي",
          courses: [
            { name: "SQL for Data Analysis & Database Engineering (لغة قواعد البيانات)", learning: true }
          ]
        }
      ] as CoursePlatform[]
    },
    contact: {
      title: "لنتعاون معاً",
      subtitle: "دعنا نتواصل لتطوير مشروعك القادم أو تعييني متدرباً",
      description: "هل تحتاج إلى محلل بيانات حريص على أدق التفاصيل ويبسط جداول العمل الفوضوية؟ يسعدني تلقي عرضك والتواصل معك فوراً.",
      fields: {
        name: "الاسم الكريم",
        email: "البريد الإلكتروني / رقم الهاتف",
        message: "أخبرني عن مشروعك أو طلبك",
        submit: "إرسال الرسالة",
        success: "تم الإرسال بنجاح! سيتواصل معك مصطفى في أقرب وقت ممكن مجهّزاً بحلول البيانات المفيدة."
      }
    }
  }
};
