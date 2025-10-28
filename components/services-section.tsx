import FlowingMenu from './FlowingMenu'
import { ServicesHeading } from './services-heading'
import { getServices, getPageBySlug } from '@/lib/wordpress'

export default async function ServicesSection() {
  const [services, homePage] = await Promise.all([
    getServices(),
    getPageBySlug('home')
  ]);
  
  // Transform WordPress services data to FlowingMenu format
  const menuItems = services.map(service => ({
    link: service.link || '#',
    text: service.acf?.service_name || service.title?.rendered || 'Service',
    images: service.acf?.gallery || []
  }));

  const acf = homePage?.acf ?? {};

  return (
    <>
      <ServicesHeading
        heading={acf.service_heading}
        subheading={acf.service_subheading}
        description={acf.service_description}
        buttonText={acf.service_button_text}
        buttonLink={acf.service_button_link}
      />
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={menuItems} />
      </div>
    </>
  );
}
