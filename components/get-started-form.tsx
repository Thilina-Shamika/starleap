"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, Briefcase, MessageSquareText, ArrowRight } from "lucide-react";

type GetStartedFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
};

export function GetStartedForm({ open, onOpenChange, defaultService }: GetStartedFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  
  // Map service names to dropdown values
  const getServiceValue = (serviceName?: string): string => {
    if (!serviceName) return '';
    const name = serviceName.toLowerCase();
    if (name.includes('video') || name.includes('editing')) return 'video';
    if (name.includes('web') || name.includes('development')) return 'web';
    return '';
  };
  
  const selectedService = getServiceValue(defaultService);

  // Update select value when defaultService changes
  useEffect(() => {
    if (open && selectRef.current) {
      selectRef.current.value = selectedService;
    }
  }, [open, selectedService]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setSent(false);
      setLoading(false);
      setError(null);
      if (selectRef.current) {
        selectRef.current.value = '';
      }
    }
  }, [open]);

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
        onOpenChange(false);
        setSent(false);
        setError(null);
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to submit form. Please try again.');
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
              ref={selectRef}
              name="service_wanted"
              required
              defaultValue={selectedService}
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

          <button
            type="submit"
            disabled={loading || sent}
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

