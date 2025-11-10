"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

type WhatsAppButtonProps = {
  phoneNumber?: string;
};

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  if (!phoneNumber) return null;

  // Format phone number: remove spaces, parentheses, dashes, and keep only digits and +
  const formattedNumber = phoneNumber.replace(/[\s()\-]/g, '');

  // WhatsApp link format: https://wa.me/[number] works for both mobile and desktop
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">WhatsApp</span>
    </Link>
  );
}

