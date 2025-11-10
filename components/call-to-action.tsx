"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, User, Briefcase, MessageSquareText, ArrowRight } from "lucide-react";

export default function CallToAction() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('/api/lead', { method: 'POST', body: data });
      const result = await response.json();
      
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Failed to submit form. Please try again.');
      }
      
      setSent(true);
      form.reset();
      setTimeout(() => {
        setSent(false);
        setError(null);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="px-4 py-20">
      <div className="w-full">
        <div className="relative w-full rounded-[28px] md:rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] py-16 md:py-24">
          {/* soft gradient like hero (purple → light purple → light red) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-400/25 to-rose-500/25" />

          <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-12" suppressHydrationWarning>
            <div className="grid md:grid-cols-2 gap-10 items-center" suppressHydrationWarning>
              {/* Left text */}
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Let’s Build Your Content Empire
                </h2>
                <p className="mt-4 text-white/80 text-[16px]">
                  Ready to turn your message into a movement? Let’s build your content empire and grow your impact with ease.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-3 text-white/90">
                  <a href="mailto:starleapglobal@gmail.com" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition">
                    <Mail className="h-5 w-5" />
                    <span>starleapglobal@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <MapPin className="h-5 w-5" />
                    <span>Based in Sedona — Serving clients worldwide</span>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
                {mounted && (
                <form onSubmit={submit} className="grid gap-3 text-white" autoComplete="off" data-lpignore="true" data-lastpass-ignore="true">
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                    <User className="h-4 w-4 text-white/70 flex-shrink-0" />
                    <input
                      name="contact_name"
                      placeholder="Your name"
                      required
                      className="w-full bg-transparent outline-none text-sm placeholder:text-white/50"
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      data-lpignore="true"
                      data-lastpass-ignore="true"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                    <Mail className="h-4 w-4 text-white/70 flex-shrink-0" />
                    <input
                      type="email"
                      name="contact_email"
                      placeholder="Email"
                      required
                      className="w-full bg-transparent outline-none text-sm placeholder:text-white/50"
                      autoComplete="new-password"
                      data-lpignore="true"
                      data-lastpass-ignore="true"
                    />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                    <Briefcase className="h-4 w-4 text-white/70 flex-shrink-0" />
                    <select
                      name="service_wanted"
                      required
                      className="w-full bg-transparent outline-none text-sm text-white appearance-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-black text-white">Service wanted</option>
                      <option value="video" className="bg-black text-white">Video</option>
                      <option value="web" className="bg-black text-white">Web</option>
                    </select>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/15 px-3 py-2">
                    <MessageSquareText className="h-4 w-4 mt-1 text-white/70 flex-shrink-0" />
                    <textarea
                      name="contact_goals"
                      placeholder="Tell us about your goals"
                      rows={4}
                      required
                      className="w-full bg-transparent outline-none text-sm placeholder:text-white/50 resize-none"
                      autoComplete="off"
                      data-lpignore="true"
                      data-lastpass-ignore="true"
                    />
                  </div>
                  <input type="hidden" name="source" value="cta" />
                  
                  {error && (
                    <div className="rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-3 text-sm text-red-200">
                      {error}
                    </div>
                  )}
                  
                  {sent && (
                    <div className="rounded-lg bg-green-500/20 border border-green-500/50 px-4 py-3 text-sm text-green-200">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading || sent}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/40 via-purple-600/40 to-purple-500/40 border border-purple-400/40 hover:from-purple-500/50 hover:via-purple-600/50 hover:to-purple-500/50 disabled:opacity-60 transition-all"
                    >
                      {sent ? 'Message sent!' : loading ? 'Sending…' : 'Send message'}
                      {!loading && !sent && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


