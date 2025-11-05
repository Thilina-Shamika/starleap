"use client";

import LogoLoop from './LogoLoop';
import { 
  // Web Development
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiNodedotjs, 
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiFigma,
  SiShopify,
  // Video Editing
  SiAdobepremierepro, 
  SiAdobeaftereffects, 
  SiDavinciresolve, 
  SiAdobe,
  SiAdobephotoshop,
  // Mobile App Development
  SiReact, 
  SiFlutter, 
  SiAndroid, 
  SiApple 
} from 'react-icons/si';

const techLogos = [
  // Web Development
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiShopify />, title: "Shopify", href: "https://www.shopify.com" },
  // Video Editing
  { node: <SiAdobepremierepro />, title: "Adobe Premiere Pro", href: "https://www.adobe.com/products/premiere.html" },
  { node: <SiAdobeaftereffects />, title: "Adobe After Effects", href: "https://www.adobe.com/products/aftereffects.html" },
  { node: <SiDavinciresolve />, title: "DaVinci Resolve", href: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { node: <SiAdobephotoshop />, title: "Adobe Photoshop", href: "https://www.adobe.com/products/photoshop.html" },
  { node: <SiAdobe />, title: "Adobe Creative Suite", href: "https://www.adobe.com/creativecloud.html" },
  // Mobile App Development
  { node: <SiReact />, title: "React Native", href: "https://reactnative.dev" },
  { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
  { node: <SiAndroid />, title: "Android", href: "https://www.android.com" },
  { node: <SiApple />, title: "iOS", href: "https://www.apple.com/ios" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

export function LogoCarousel() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Web Development, Video Editing, and Mobile App Development Technologies"
      />
    </div>
  );
}

