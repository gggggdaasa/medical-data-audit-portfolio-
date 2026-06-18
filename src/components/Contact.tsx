import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle, Github, Linkedin, AlertCircle, Copy } from 'lucide-react';
import TiltWrapper from './TiltWrapper';
import confetti from 'canvas-confetti';
import { playHoverSound } from '../utils/audio';

interface ContactProps {
  lang: 'en' | 'ar';
  dict: any;
}

export default function Contact({ lang, dict }: ContactProps) {
  const isRtl = lang === 'ar';
  const cText = dict.contact;
  const fields = cText.fields;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg(lang === 'en' ? 'All fields are strictly required.' : 'جميع الحقول مطلوبة لإرسال الرسالة.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    // Play successful audio cue sound
    playHoverSound('success');

    // Trigger colorful confetti explosion for high interactivity!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#10b981', '#f43f5e', '#eab308']
    });

    // Automatically trigger mailto link to direct form content to the user's Gmail inbox
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hello Mustafa,\n\nYou have received a new message from your portfolio website form:\n\n` +
      `----------------------------------------\n` +
      `Sender Name: ${form.name}\n` +
      `Sender Contact (Email/Phone): ${form.email}\n` +
      `----------------------------------------\n\n` +
      `Message:\n${form.message}\n\n` +
      `Best regards,\nPortfolio Assistant`
    );
    
    // Perform redirection to pre-fill their email composer client
    setTimeout(() => {
      window.location.href = `mailto:shroh1520132020sh@gmail.com?subject=${subject}&body=${body}`;
    }, 800);

    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#030712] border-t border-slate-900 text-white scroll-mt-12 relative overflow-hidden">
      {/* Absolute background visual highlights */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06b6d4]">{cText.title}</span>
          <h2 className="font-space text-2xl sm:text-4xl font-black mt-2 tracking-tight section-title-3d">
            {cText.subtitle}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-450 mt-3 leading-relaxed font-semibold">
            {cText.description}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start max-w-3xl mx-auto">
          {/* Direct channels (Wrapped in Tilt) */}
          <div className="md:col-span-2 w-full">
            <TiltWrapper maxRotation={15}>
              <div className="bg-slate-900/90 border border-slate-850 p-6 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[25px] pointer-events-none" />
                
                <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400 font-bold block">
                  {lang === 'en' ? "Communication Hub" : "قنوات الاتصال الفوري"}
                </span>

                <div className="space-y-3.5">
                  <div
                    className="relative flex items-center justify-between gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-xl transition-all hover:border-slate-700 group/email"
                  >
                    <a
                      href="mailto:shroh1520132020sh@gmail.com"
                      className="flex items-center gap-3 min-w-0 flex-1 hover:text-cyan-400 transition-colors"
                      title={lang === 'en' ? "Click to open email composer" : "اضغط لفتح تطبيق البريد"}
                    >
                      <div className="p-2.5 bg-slate-900 text-cyan-400 rounded-xl border border-slate-800 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[8px] font-mono uppercase tracking-widest text-slate-550">
                          {lang === 'en' ? "Email (Click to Email)" : "البريد الإلكتروني (اضغط للمراسلة)"}
                        </div>
                        <div className="text-xs font-bold text-slate-200 truncate">shroh1520132020sh@gmail.com</div>
                      </div>
                    </a>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText('shroh1520132020sh@gmail.com');
                        setCopied(true);
                        playHoverSound('success');
                        setTimeout(() => setCopied(false), 2500);
                      }}
                      className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all shrink-0 relative group"
                      title={lang === 'en' ? "Copy Email Address" : "نسخ البريد الإلكتروني"}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-start gap-2.5 pt-2">
                    <a
                      href="https://www.linkedin.com/in/mustafa-mahmoud-ali-583a04354"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-950/80 hover:bg-sky-950/30 text-slate-200 hover:text-cyan-400 rounded-xl transition-all border border-slate-800 hover:border-cyan-500/35 text-xs font-black"
                    >
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/gggggdaasa"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-950/80 hover:bg-slate-850 text-slate-200 hover:text-white rounded-xl transition-all border border-slate-800 hover:border-slate-700 text-xs font-black"
                    >
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </TiltWrapper>
          </div>

          {/* Contact form block */}
          <div className="md:col-span-3 w-full">
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-space font-black text-base text-white">
                        {lang === 'en' ? "Dispatched!" : "تم تسليم الرسالة!"}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        {fields.success}
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-250 rounded-xl text-xs font-bold border border-slate-700 transition"
                    >
                      {lang === 'en' ? "Send Another" : "إرسال رسالة أخرى"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {errorMsg && (
                      <div className="p-3 bg-red-550/10 border border-red-800/30 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-455" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
                          {fields.name}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={lang === 'en' ? "Mustafa Mahmoud" : "الاسم الكريم"}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:bg-slate-950/80 px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none placeholder-slate-650 text-white font-semibold"
                        />
                      </div>

                      {/* Email info input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
                          {fields.email}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={lang === 'en' ? "email@example.com" : "رقم هاتف أو بريد إلكتروني"}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:bg-slate-950/80 px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none placeholder-slate-650 text-white font-semibold"
                        />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block">
                        {fields.message}
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        placeholder={lang === 'en' ? "How can we collaborate on the analytics project?" : "أكتب تفاصيل مشروعك هنا..."}
                        className="w-full bg-slate-950 border border-slate-805 focus:border-cyan-500 focus:bg-slate-950/80 px-4 py-3 rounded-xl text-xs transition-all focus:outline-none placeholder-slate-650 text-white font-semibold resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-lg border border-cyan-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>{fields.submit}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex items-center gap-3.5 bg-slate-900/95 border border-cyan-500/40 px-5 py-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md`}
          >
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shrink-0">
              <CheckCircle className="w-4 h-4 animate-bounce" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white leading-none">
                {lang === 'en' ? "Email Copied!" : "تم نسخ البريد الإلكتروني!"}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold font-mono mt-1">
                shroh1520132020sh@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
