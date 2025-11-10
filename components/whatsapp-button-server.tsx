import { getWhatsAppConfig } from '@/lib/wordpress';
import { WhatsAppButton } from './whatsapp-button';

export default async function WhatsAppButtonServer() {
  const whatsapp = await getWhatsAppConfig();
  const phoneNumber = whatsapp?.acf?.whatsapp_number;

  return <WhatsAppButton phoneNumber={phoneNumber} />;
}

