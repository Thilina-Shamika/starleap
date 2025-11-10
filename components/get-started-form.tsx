"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Briefcase, MessageSquareText, ArrowRight } from "lucide-react";

type GetStartedFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GetStartedForm({ open, onOpenChange }: GetStartedFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/api/lead', { method: 'POST', body: data });
      setSent(true);
      form.reset();
      setTimeout(() => {
        onOpenChange(false);
        setSent(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95vw] bg-black/90 text-white border-white/20">
        <DialogTitle className="text-xl font-semibold mb-4">Get Started</DialogTitle>
        <form onSubmit={submit} className="grid gap-4" autoComplete="off" data-lpignore="true" data-lastpass-ignore="true">
          <input type="hidden" name="source" value="get-started" />
          
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

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/40 via-purple-600/40 to-purple-500/40 border border-purple-400/40 hover:from-purple-500/50 hover:via-purple-600/50 hover:to-purple-500/50 disabled:opacity-60 transition-all"
          >
            {sent ? 'Message sent!' : loading ? 'Sending…' : 'Send message'}
            {!loading && !sent && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

