import { getServices, getPageBySlug } from '@/lib/wordpress';
import { ServicesSectionClient } from './services-section-client';

export default async function ServicesSection() {
  const [services, homePage] = await Promise.all([
    getServices(),
    getPageBySlug('home')
  ]);
  
  const acf = homePage?.acf ?? {};
  
  return (
    <ServicesSectionClient 
      services={services}
      heading={acf.service_heading}
      subheading={acf.service_subheading}
      description={acf.service_description}
      buttonText={acf.service_button_text}
      buttonLink={acf.service_button_link}
    />
  );
}
