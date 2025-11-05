import { getPageBySlug } from '@/lib/wordpress';
import { AboutSectionClient } from './about-section-client';

export default async function AboutSection() {
  const homePage = await getPageBySlug('home');
  const acf = homePage?.acf ?? {};

  return (
    <AboutSectionClient
      subheading={acf.about_subheading}
      heading={acf.about_heading}
      description={acf.about_description}
      buttonText={acf.about_button_text as string | undefined}
      buttonLink={(acf.about_button_link && (acf.about_button_link as any).url) as string | undefined}
      buttonTarget={(acf.about_button_link && (acf.about_button_link as any).target) as string | undefined}
    />
  );
}

