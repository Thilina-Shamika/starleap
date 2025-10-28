"use client";

import { motion } from "framer-motion";

type AnimatedGradientProps = {
  className?: string;
};

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={className}>
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        initial={{ opacity: 0.7 }}
        animate={{
          background: [
            "radial-gradient(60% 60% at 20% 20%, var(--purple-500)/.4 0%, transparent 60%), radial-gradient(50% 50% at 80% 20%, var(--purple-300)/.35 0%, transparent 60%), radial-gradient(60% 60% at 50% 80%, var(--purple-700)/.35 0%, transparent 60%)",
            "radial-gradient(60% 60% at 25% 25%, var(--purple-500)/.4 0%, transparent 60%), radial-gradient(50% 50% at 70% 25%, var(--purple-300)/.35 0%, transparent 60%), radial-gradient(60% 60% at 55% 75%, var(--purple-700)/.35 0%, transparent 60%)",
            "radial-gradient(60% 60% at 30% 30%, var(--purple-500)/.4 0%, transparent 60%), radial-gradient(50% 50% at 60% 30%, var(--purple-300)/.35 0%, transparent 60%), radial-gradient(60% 60% at 60% 70%, var(--purple-700)/.35 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}


