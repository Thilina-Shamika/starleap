"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Rocket, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';

type PackageInfo = {
  heading?: string;
  items: string[];
};

type Pkg = {
  id: number;
  name?: string;
  price?: string;
  subtitle?: string;
  info: PackageInfo[];
};

export function PackagesClient({ packages }: { packages: Pkg[] }) {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();
  const [selectedMeta, setSelectedMeta] = useState<{ id?: number; name?: string; price?: string } | undefined>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submitLead(formData: FormData) {
    setLoading(true);
    setDone(false);
    try {
      // Placeholder email sending API
      await fetch('/api/lead', { method: 'POST', body: formData });
      setDone(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const icons = [Rocket, TrendingUp, Zap];

  return (
    <section id="packages" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Our Packages</h2>
          <p className="mt-2 text-white/70">Our packages to select from</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => {
            const Icon = icons[idx % icons.length];
            const isFeatured = idx === 1;
            return (
              <div
                key={pkg.id}
                className={
                  'relative rounded-3xl overflow-hidden border backdrop-blur-xl ' +
                  (isFeatured
                    ? 'border-purple-400/30 bg-gradient-to-b from-purple-500/10 via-purple-600/10 to-transparent'
                    : 'border-white/10 bg-black/60')
                }
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4 text-white/80">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full">
                      {pkg.name}
                    </span>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {pkg.price}
                    <span className="text-sm align-super text-white/60"> /mo</span>
                  </div>
                  {pkg.subtitle && (
                    <p className="text-white/70 text-sm md:text-base mb-6">{pkg.subtitle}</p>
                  )}

                  {/* List */}
                  <ul className="space-y-3 text-white/85 mb-8">
                    {pkg.info.map((row, i) => (
                      <li key={i}>
                        {row.heading && (
                          <div className="mb-2 text-[15px] font-medium text-white/95">
                            {row.heading}
                          </div>
                        )}
                        {row.items?.length ? (
                          <ul className="pl-0 space-y-1">
                            {row.items.map((it, k) => (
                              <li key={k} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 mt-1 text-purple-400" />
                                <span className="text-[15px] leading-relaxed">{it}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <button
                        className={
                          'w-full rounded-full px-6 py-3 font-medium text-white transition ' +
                          (isFeatured
                            ? 'bg-gradient-to-r from-purple-500/40 via-purple-600/40 to-purple-500/40 hover:from-purple-500/50 hover:via-purple-600/50 hover:to-purple-500/50 border border-purple-400/40 shadow-lg'
                            : 'bg-white/10 hover:bg-white/15 border border-white/20')
                        }
                        onClick={() => {
                          setSelectedPlan(`${pkg.name}`);
                          setSelectedMeta({ id: pkg.id, name: pkg.name, price: pkg.price });
                        }}
                      >
                        Get started
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg w-[95vw] bg-black/90 text-white border-white/20">
                      <div className="p-2">
                        <DialogTitle className="text-xl font-semibold mb-2">Get started — {selectedPlan}</DialogTitle>
                        {selectedMeta && (
                          <div className="mb-3 text-sm text-white/80">
                            <span className="mr-2">Selected:</span>
                            <span className="font-medium">{selectedMeta.name}</span>
                            {selectedMeta.price ? (
                              <span className="ml-2 text-white/60">{selectedMeta.price} /mo</span>
                            ) : null}
                          </div>
                        )}
                        <form
                          action={async (formData) => {
                            await submitLead(formData as any);
                          }}
                          className="grid gap-3"
                        >
                          <input type="hidden" name="plan" value={selectedPlan} />
                          <input type="hidden" name="plan_id" value={selectedMeta?.id ?? ''} />
                          <input type="hidden" name="plan_price" value={selectedMeta?.price ?? ''} />
                          <input
                            name="name"
                            placeholder="Your name"
                            required
                            className="rounded-md bg-white/5 border border-white/15 px-3 py-2"
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email (placeholder send)"
                            required
                            className="rounded-md bg-white/5 border border-white/15 px-3 py-2"
                          />
                          <input
                            name="company"
                            placeholder="Company"
                            className="rounded-md bg-white/5 border border-white/15 px-3 py-2"
                          />
                          <textarea
                            name="message"
                            placeholder="Tell us about your goals"
                            rows={4}
                            className="rounded-md bg-white/5 border border-white/15 px-3 py-2"
                          />
                          <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 rounded-full px-5 py-2 bg-gradient-to-r from-purple-500/40 via-purple-600/40 to-purple-500/40 border border-purple-400/40 disabled:opacity-60"
                          >
                            {loading ? 'Sending…' : done ? 'Sent!' : 'Submit'}
                          </button>
                          <p className="text-xs text-white/50">
                            We’ll send this to our placeholder email and follow up shortly.
                          </p>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


