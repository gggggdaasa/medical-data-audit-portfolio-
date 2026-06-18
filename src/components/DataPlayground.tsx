import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Database, FileSpreadsheet, Loader2, ArrowRight } from 'lucide-react';
import TiltWrapper from './TiltWrapper';

interface DirtyRecord {
  id: number;
  orderId: string;
  date: string;
  price: string;
  product: string;
  status: string;
}

interface CleanRecord {
  id: number;
  orderId: string;
  date: string;
  price: number;
  product: string;
  status: string;
  _meta?: {
    imputed?: boolean;
    dateStandardized?: boolean;
    productCleaned?: boolean;
    duplicate?: boolean;
  };
}

const DEFAULT_DIRTY_DATA: DirtyRecord[] = [
  { id: 1, orderId: "ORD-9021", date: "18-06-2026", price: "1280", product: "  lapTop pRo ", status: "COMPLETED" },
  { id: 2, orderId: "ORD-9022", date: "2026/06/19", price: "240", product: "smart WATCH", status: "PENDING" },
  { id: 3, orderId: "ORD-9021", date: "18-06-2026", price: "1280", product: "  lapTop pRo ", status: "COMPLETED" }, // Duplicate
  { id: 4, orderId: "ORD-9023", date: "Null", price: "", product: "tablet s", status: "completed" }, // Missing values & messy casing
  { id: 5, orderId: "ORD-9024", date: "21-06-2026", price: "450", product: " smart WATCH ", status: "FAILED" },
  { id: 6, orderId: "ORD-9025", date: "22/06/2026", price: "Null", product: "lapTop pRo", status: "COMPLETED" } // Missing price
];

const CATEGORY_MEDIANS: { [key: string]: number } = {
  "laptop pro": 1280,
  "smart watch": 345,
  "tablet s": 450
};

export default function DataPlayground({ lang, dict }: { lang: 'en' | 'ar'; dict: any }) {
  const [dirtyData, setDirtyData] = useState<DirtyRecord[]>(() => JSON.parse(JSON.stringify(DEFAULT_DIRTY_DATA)));
  const [isRunning, setIsRunning] = useState(false);
  const [runStage, setRunStage] = useState(0);
  const [cleaningLogs, setCleaningLogs] = useState<string[]>([]);
  const [cleanData, setCleanData] = useState<CleanRecord[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'log'>('table');

  const handleCellChange = (index: number, field: keyof DirtyRecord, value: string) => {
    const updated = [...dirtyData];
    updated[index] = { ...updated[index], [field]: value };
    setDirtyData(updated);
  };

  const resetData = () => {
    setDirtyData(JSON.parse(JSON.stringify(DEFAULT_DIRTY_DATA)));
    setCleanData([]);
    setCleaningLogs([]);
    setShowResult(false);
    setRunStage(0);
  };

  const runPipeline = () => {
    setIsRunning(true);
    setRunStage(1);
    setCleaningLogs([]);
    setShowResult(false);

    const stages = [
      { text: lang === 'en' ? "Initializing Pandas Dataframe... Loading 14 columns equivalent" : "تهيئة Pandas Dataframe... قراءة الأعمدة المماثلة للتجارة الإلكترونية", ms: 600 },
      { text: lang === 'en' ? "Auditing and dropping exact duplicates from row indices..." : "فحص وإزالة الصفوف المكررة تماماً بناءً على رقم المعرف (ID)...", ms: 1200 },
      { text: lang === 'en' ? "Applying ISO 8601 standard dates mapping..." : "توحيد صيغ وطوابع التواريخ وفق معيار ISO 8601 العالمي...", ms: 1800 },
      { text: lang === 'en' ? "Executing group-by statistical median imputation for empty cells..." : "استبدال الحقول المفقودة والقيم الفارغة عبر الوسيط الحسابي للمجموعات...", ms: 2400 },
      { text: lang === 'en' ? "Standardizing casings & trimming whitespaces for product list..." : "تعديل أحرف المنتجات وإزالة المسافات العشوائية الزائدة...", ms: 3000 },
      { text: lang === 'en' ? "Compiling gold-standard openpyxl formatted worksheet output..." : "تصميم وإنتاج ورقة الإكسل الذهبية النهائية المنسقة برمجياً...", ms: 3650 }
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setRunStage(idx + 1);
        setCleaningLogs(prev => [...prev, `[STAGE ${idx + 1}] ${stage.text}`]);
        
        if (idx === stages.length - 1) {
          processData();
        }
      }, stage.ms);
    });
  };

  const processData = () => {
    const logs: string[] = [];
    const seenOrderIds = new Set<string>();
    const cleanedList: CleanRecord[] = [];

    dirtyData.forEach((row, index) => {
      const trimmedOrderId = row.orderId.trim();
      if (seenOrderIds.has(trimmedOrderId)) {
        logs.push(
          lang === 'en'
            ? `[DUPLICATE DROP] Row #${index + 1}: Found Duplicate OrderID '${trimmedOrderId}'. Removed row.`
            : `[إزالة تكرار] الصف رقم ${index + 1}: تم العثور على معرف مكرر '${trimmedOrderId}'. تم إلغاء الصف.`
        );
        return;
      }
      seenOrderIds.add(trimmedOrderId);

      const record: CleanRecord = {
        id: row.id,
        orderId: trimmedOrderId,
        date: row.date,
        price: 0,
        product: row.product,
        status: row.status.toUpperCase().trim(),
        _meta: {}
      };

      // Trim & Title Case Product
      let cleanProd = row.product.trim().toLowerCase();
      cleanProd = cleanProd.replace(/\s+/g, ' ');
      const formattedProd = cleanProd.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (formattedProd !== row.product) {
        record.product = formattedProd;
        record._meta!.productCleaned = true;
        logs.push(
          lang === 'en'
            ? `[STRING REFINING] Cleaned product name '${row.product}' to '${formattedProd}'`
            : `[تنظيف النصوص] تم تعديل اسم المنتج من '${row.product}' إلى '${formattedProd}'`
        );
      } else {
        record.product = formattedProd;
      }

      // Impute price
      const rawPrice = row.price.toLowerCase().trim();
      if (rawPrice === "" || rawPrice === "null" || isNaN(Number(rawPrice))) {
        const prodKey = cleanProd.replace(/\s+/g, ' ');
        const imputedValue = CATEGORY_MEDIANS[prodKey] || 350;
        record.price = imputedValue;
        record._meta!.imputed = true;
        logs.push(
          lang === 'en'
            ? `[IMPUTATION] Imputed missing Price for order '${trimmedOrderId}' with category median ($${imputedValue})`
            : `[تعويض إحصائي] تم ملء السعر الفارغ للطلب '${trimmedOrderId}' بالوسيط الحسابي للفئة ($${imputedValue})`
        );
      } else {
        record.price = Number(rawPrice);
      }

      // Standardize dates
      let rawDate = row.date.toLowerCase().trim();
      if (rawDate === "" || rawDate === "null" || rawDate === "undefined") {
        record.date = "2026-06-18";
        record._meta!.dateStandardized = true;
        logs.push(
          lang === 'en'
            ? `[DATE REPAIR] Missing date on '${trimmedOrderId}'. Imputed current date '2026-06-18'`
            : `[إصلاح التواريخ] تاريخ غير محدد للطلب '${trimmedOrderId}'. تم تعيين التاريخ التلقائي '2026-06-18'`
        );
      } else {
        if (rawDate.includes('/')) {
          const parts = rawDate.split('/');
          if (parts[0].length === 4) {
            record.date = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
          } else {
            record.date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          }
          record._meta!.dateStandardized = true;
          logs.push(
            lang === 'en'
              ? `[DATE STANDARDIZED] Converted '${row.date}' to standard ISO 'YYYY-MM-DD'`
              : `[توحيد التاريخ] تم تنظيم '${row.date}' إلى صيغة ISO 'YYYY-MM-DD'`
          );
        } else if (rawDate.includes('-')) {
          const parts = rawDate.split('-');
          if (parts[0].length === 4) {
            record.date = rawDate;
          } else {
            record.date = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            record._meta!.dateStandardized = true;
            logs.push(
              lang === 'en'
                ? `[DATE STANDARDIZED] Converted '${row.date}' to standard ISO YYYY-MM-DD`
                : `[توحيد التاريخ] تم تنظيم '${row.date}' إلى صيغة YYYY-MM-DD`
            );
          }
        } else {
          record.date = row.date;
        }
      }

      cleanedList.push(record);
    });

    setCleanData(cleanedList);
    setCleaningLogs(prev => [...prev, ...logs, lang === 'en' ? "✅ PIPELINE EXECUTED SUCCESSFULLY WITH ZERO CRITICAL WARNINGS." : "✅ تم تشغيل خوارزمية تنظيف البيانات بنجاح تام وبدون أي أخطاء متبقية."]);
    setIsRunning(false);
    setShowResult(true);
  };

  return (
    <div id="playground" className="bg-slate-950 rounded-3xl border border-slate-900 shadow-3xl overflow-hidden mt-12 relative">
      {/* Absolute background visual highlights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Lab Header */}
      <div className="bg-[#0b0f19] px-6 py-6 border-b border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-950/40 text-cyan-400 rounded-2xl border border-cyan-800/35">
            <Database className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">{dict.nav.playground}</span>
            <h3 className="text-lg sm:text-xl font-black font-space text-white tracking-tight">{dict.lab.title}</h3>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={resetData}
            title={dict.lab.btnReset}
            className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl transition border border-slate-800 flex items-center justify-center gap-2 text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">{lang === 'en' ? "Reset Pipeline" : "إعادة افتراضي"}</span>
          </button>
          <button
            disabled={isRunning}
            onClick={runPipeline}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl transition font-black flex items-center justify-center gap-2.5 text-xs shadow-lg border border-cyan-400/20 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{lang === 'en' ? "Cleaning Matrix..." : "جاري المعالجة..."}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-white fill-white" />
                <span>{dict.lab.btnRun}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lab Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Raw Messy Input */}
        <div className="space-y-4">
          <div>
            <h4 className="font-space font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <span className="text-yellow-500 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 inline-block animate-bounce" /> 
                Dirty Raw Dataframe
              </span>
              <span className="text-[9px] bg-yellow-950/40 text-yellow-500 px-2.5 py-0.5 rounded-full border border-yellow-800/30 uppercase font-mono tracking-wider">
                {lang === 'en' ? "messy data" : "بيانات ملوثة"}
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dict.lab.description}</p>
          </div>

          <div className="overflow-x-auto border border-slate-905 rounded-2xl bg-slate-950">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono">
                  <th className="p-3 border-r border-slate-800 text-center text-[10px]">Row</th>
                  <th className="p-3 border-r border-slate-800 text-[10px]">OrderID</th>
                  <th className="p-3 border-r border-slate-800 text-[10px]">Date</th>
                  <th className="p-3 border-r border-slate-800 text-[10px]">Price ($)</th>
                  <th className="p-3 text-[10px]">Product Name</th>
                </tr>
              </thead>
              <tbody>
                {dirtyData.map((row, idx) => {
                  const isDup = idx === 2;
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-slate-900/60 hover:bg-slate-900/40 transition-colors ${
                        isDup ? "bg-red-950/20" : ""
                      }`}
                    >
                      <td className="p-3 text-center text-slate-500 font-mono border-r border-slate-850">{idx + 1}</td>
                      <td className="p-3 border-r border-slate-850">
                        <input
                          type="text"
                          value={row.orderId}
                          onChange={(e) => handleCellChange(idx, 'orderId', e.target.value)}
                          className={`w-full bg-slate-900/50 focus:bg-slate-900 px-2 py-1 border border-slate-800 focus:border-cyan-500 rounded-lg font-mono text-slate-200 text-xs transition-all ${
                            isDup ? "text-rose-500 line-through font-bold" : ""
                          }`}
                        />
                      </td>
                      <td className="p-3 border-r border-slate-850">
                        <input
                          type="text"
                          value={row.date}
                          onChange={(e) => handleCellChange(idx, 'date', e.target.value)}
                          className="w-full bg-slate-900/50 focus:bg-slate-900 px-2 py-1 border border-slate-800 focus:border-cyan-500 rounded-lg font-mono text-slate-200 text-xs transition-all"
                        />
                      </td>
                      <td className="p-3 border-r border-slate-850">
                        <input
                          type="text"
                          value={row.price}
                          placeholder="Null"
                          onChange={(e) => handleCellChange(idx, 'price', e.target.value)}
                          className={`w-full bg-slate-900/50 focus:bg-slate-900 px-2 py-1 border border-slate-800 focus:border-cyan-500 rounded-lg font-mono text-xs font-bold transition-all ${
                            row.price.toLowerCase() === "null" || row.price === "" ? "text-amber-400 border-amber-800/40" : "text-slate-200"
                          }`}
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.product}
                          onChange={(e) => handleCellChange(idx, 'product', e.target.value)}
                          className="w-full bg-slate-900/50 focus:bg-slate-900 px-2 py-1 border border-slate-800 focus:border-cyan-500 rounded-lg text-slate-200 font-medium text-xs transition-all"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex gap-2.5 text-[11px] text-slate-400 bg-slate-900/40 rounded-2xl p-4 border border-slate-850">
            <span className="font-extrabold text-cyan-400">{lang === 'en' ? "💡 Standard tip:" : "💡 تلميح تقني:"}</span>
            <span>{lang === 'en' ? "You can click on any cell directly to edit values before running pipeline. Watch how imputed prices calculate dynamically!" : "يمكنك تعديل أي مدخل في الجدول يدوياً بالنقر عليه، ثم انقر تشغيل الخوارزمية لتراقب كيف يقوم المصفي الرياضي بتصحيحها!"}</span>
          </div>
        </div>

        {/* Right Side: Log Console / Clean Golden Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h4 className="font-space font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 inline-block text-cyan-400" /> 
                {showResult ? "Polished Golden Dataframe" : "Execution Logs"}
              </span>
            </h4>
            {showResult && (
              <div className="flex bg-slate-900 rounded-xl p-0.5 border border-slate-850">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-3 py-1 text-xs rounded-lg transition font-mono ${
                    activeTab === 'table' ? "bg-cyan-505 text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-800/25" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {dict.lab.tabTable}
                </button>
                <button
                  onClick={() => setActiveTab('log')}
                  className={`px-3 py-1 text-xs rounded-lg transition font-mono ${
                    activeTab === 'log' ? "bg-cyan-505 text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-800/25" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {dict.lab.tabLog}
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[250px] bg-slate-950 text-slate-350 rounded-2xl p-5 font-mono text-[11px] flex flex-col overflow-hidden shadow-inner border border-slate-850">
            {isRunning ? (
              <div className="flex-1 flex flex-col justify-center items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-850 border-t-cyan-400 animate-spin"></div>
                  <Loader2 className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="text-cyan-400 font-extrabold tracking-widest uppercase animate-pulse">{lang === 'en' ? "Executing SQL/Pandas Engine..." : "جاري تصفية وفرز البيانات إحصائياً..."}</div>
                <div className="text-[10px] text-slate-500 text-center max-w-xs font-mono">
                  Applying Median imputation & standard ISO conversion...
                </div>
                <div className="w-48 bg-slate-900 h-1 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(runStage / 6) * 100}%` }}
                    transition={{ ease: "easeInOut", duration: 0.35 }}
                    className="h-full bg-cyan-400"
                  />
                </div>
              </div>
            ) : showResult ? (
              <AnimatePresence mode="wait">
                {activeTab === 'table' ? (
                  <motion.div
                    key="clean-table"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="overflow-x-auto w-full h-full flex-1"
                  >
                    <table className="w-full text-left font-mono border-collapse">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-cyan-400">
                          <th className="p-2 border-r border-slate-800 text-center text-[10px]">Row</th>
                          <th className="p-2 border-r border-slate-800 text-[10px]">OrderID</th>
                          <th className="p-2 border-r border-slate-800 text-[10px]">Date</th>
                          <th className="p-2 border-r border-slate-800 text-[10px]">Price</th>
                          <th className="p-2 text-[10px]">Product</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cleanData.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-slate-900 hover:bg-slate-900/30 transition-colors"
                          >
                            <td className="p-2 text-center text-slate-500 border-r border-slate-800 font-mono">{idx + 1}</td>
                            <td className="p-2 border-r border-slate-800 font-bold text-white">
                              {row.orderId}
                            </td>
                            <td className="p-2 border-r border-slate-800 text-emerald-400 font-bold">
                              {row.date}
                              {row._meta?.dateStandardized && (
                                <span className="ml-1 text-[8px] bg-emerald-950/50 text-emerald-450 border border-emerald-900/50 px-1 rounded uppercase tracking-tighter">Fix</span>
                              )}
                            </td>
                            <td className="p-2 border-r border-slate-800 text-cyan-300 font-extrabold">
                              ${row.price}
                              {row._meta?.imputed && (
                                <span className="ml-1 text-[8px] bg-purple-950/50 text-purple-300 border border-purple-900/40 px-1 rounded uppercase tracking-tighter font-semibold">
                                  {lang === 'en' ? "imputed" : "رياضي"}
                                </span>
                              )}
                            </td>
                            <td className="p-2 text-slate-300 font-sans font-bold">
                              {row.product}
                              {row._meta?.productCleaned && (
                                <span className="ml-1.5 text-[8px] bg-cyan-950/50 text-cyan-400 border border-cyan-800/30 px-1 rounded">Trim</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                ) : (
                  <motion.div
                    key="clean-logs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col space-y-2 overflow-y-auto max-h-[300px] text-[10.5px] leading-relaxed text-slate-400 pr-2"
                  >
                    <div className="text-cyan-400 border-b border-slate-900 pb-1.5 mb-2 font-bold tracking-wider uppercase font-space">
                      {dict.lab.summaryText}
                    </div>
                    {cleaningLogs.map((log, index) => {
                      let color = "text-slate-400";
                      if (log.startsWith("[STAGE")) color = "text-cyan-400 font-extrabold";
                      if (log.startsWith("[DUPLICATE")) color = "text-rose-450/80 line-through decoration-rose-500/50";
                      if (log.startsWith("[IMPUTATION")) color = "text-purple-300 font-bold";
                      if (log.startsWith("[DATE")) color = "text-emerald-450";
                      if (log.startsWith("✅")) color = "text-emerald-400 font-bold bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30 mt-4";
                      return (
                        <div key={index} className={`${color} font-mono pl-1`}>
                          {log}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-slate-500">
                <Database className="w-12 h-12 text-slate-800 mb-3" />
                <p className="font-medium text-slate-400 text-xs leading-relaxed max-w-sm">
                  {lang === 'en' ? "Click 'Run Data Clean Engine' above to trace Python Pandas dataframe standardizations, date parse algorithms, and categorical median group-by processes." : "انقر فوق زر تشغيل الخوارزمية أعلاه لتتبع معالجات Python Pandas وتصفية القيم الشاذة بالوسيط الحسابي الفوري."}
                </p>
              </div>
            )}
          </div>

          {showResult && (
            <div className="bg-emerald-950/20 rounded-2xl p-4 border border-emerald-800/30 text-emerald-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-xs">{lang === 'en' ? "Gold Standard Excel Sheet Built!" : "تم تخطيط ورقة البيانات الذهبية بنجاح!"}</h5>
                  <p className="text-[10px] text-slate-400">{lang === 'en' ? "Duplicates dropped seamlessly, empty values imputed mathematically, formatted beautifully." : "تم حذف الصفوف المكررة تماماً، وتعويض القيم بـ Pandas، وتنسيق الألوان."}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  alert(lang === 'en' ? 'Excel Spreadsheet format simulation triggered! Verified content ready.' : 'تم تهيئة ملف إكسل افتراضي (openpyxl) جاهز للتنزيل ومطابق للبيانات.');
                }}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition text-xs font-black shadow-md flex items-center gap-1.5 flex-shrink-0 border border-emerald-500"
              >
                {lang === 'en' ? "Mock Export .xlsx" : "تنزيل إكسل"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
