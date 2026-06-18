import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Github, FileDown, Quote } from 'lucide-react';
import TiltWrapper from './TiltWrapper';

interface AboutProps {
  lang: 'en' | 'ar';
  dict: any;
}

export default function About({ lang, dict }: AboutProps) {
  const isRtl = lang === 'ar';
  const ab = dict.about;

  const contacts = [
    { icon: <MapPin className="w-4 h-4 text-cyan-400" />, label: lang === 'en' ? "Location" : "الموقع", value: ab.location, link: null },
    { icon: <Phone className="w-4 h-4 text-cyan-400" />, label: lang === 'en' ? "Phone" : "الهاتف", value: ab.phone, link: `tel:${ab.phone}` },
    { icon: <Mail className="w-4 h-4 text-cyan-400" />, label: lang === 'en' ? "Email" : "البريد الإلكتروني", value: "shroh1520132020sh@gmail.com", link: "mailto:shroh1520132020sh@gmail.com" },
    { icon: <Linkedin className="w-4 h-4 text-cyan-400" />, label: "LinkedIn", value: "Mustafa Mahmoud", link: "https://www.linkedin.com/in/mustafa-mahmoud-ali-583a04354" },
    { icon: <Github className="w-4 h-4 text-cyan-400" />, label: "GitHub", value: "gggggdaasa", link: "https://github.com/gggggdaasa" }
  ];

  return (
    <section id="about" className="py-24 bg-[#080d1a] border-b border-slate-900 scroll-mt-12 relative overflow-hidden">
      {/* Dynamic light glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">{ab.title}</span>
          <h2 className="font-space text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight section-title-3d">
            {lang === 'en' ? "Holographic Data Philosophy" : "فلسفة نزاهة وفحص البيانات"}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Column 1: Philosophy Text */}
          <div className="md:col-span-3 space-y-6">
            <div className="relative p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl preserve-3d">
              {/* Backside neon blur element */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-lg opacity-40 select-none pointer-events-none" />
              <Quote className="w-8 h-8 text-cyan-500/15 absolute -top-4 -left-2 rotate-185" />
              <p className="text-xs sm:text-sm font-space font-medium text-cyan-300 italic relative z-10 leading-relaxed mb-1">
                "{ab.subtitle}"
              </p>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-350 leading-relaxed font-medium">
              <p className="border-l-2 border-cyan-500/30 pl-3">{ab.p1}</p>
              <p>{ab.p2}</p>
              <p className="bg-slate-900/30 p-4 rounded-xl border border-slate-900 text-slate-400">{ab.p3}</p>
            </div>
          </div>

          {/* Column 2: Profile Contact (Wrapped in 3D perspective Tilt) */}
          <div className="md:col-span-2 w-full">
            <TiltWrapper maxRotation={12}>
              <div className="bg-slate-900/90 border border-slate-850 p-6 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-[30px] pointer-events-none group-hover:bg-cyan-500/10 transition-all" />
                
                <h3 className="font-space font-extrabold text-sm sm:text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {ab.infoTitle}
                </h3>

                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex gap-3 items-center group/item text-slate-350 hover:text-white transition-colors">
                      <div className="p-2.5 bg-slate-850 text-cyan-400 rounded-xl flex-shrink-0 group-hover/item:bg-cyan-950/45 transition-colors border border-slate-800">
                        {contact.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                          {contact.label}
                        </div>
                        {contact.link ? (
                          <a
                            href={contact.link}
                            target={contact.link.startsWith('http') ? '_blank' : undefined}
                            referrerPolicy="no-referrer"
                            className="text-xs font-bold text-slate-200 hover:text-cyan-400 transition-colors truncate block"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span className="text-xs font-bold text-slate-200 truncate block">{contact.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resume Download action */}
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => alert(lang === 'en' ? "Full PDF resume ready for delivery! Please mail shroh1520132020sh@gmail.com directly." : "ملف السيرة الذاتية PDF جاهز للنقل! يرجى التواصل فوراً مع shroh1520132020sh@gmail.com.")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-cyan-950/30 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 hover:border-cyan-500/30 hover:text-cyan-300"
                  >
                    <FileDown className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'en' ? "Download Analytical CV" : "تحميل ملف السيرة الذاتية"}</span>
                  </button>
                </div>
              </div>
            </TiltWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
