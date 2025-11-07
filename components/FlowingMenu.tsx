"use client";

import React, { useState } from 'react';
import { gsap } from 'gsap';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './FlowingMenu.css';

type ImageType = {
  url?: string;
  sizes?: Record<string, string>;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
};

type MenuItemType = {
  link?: string;
  text?: string;
  images?: ImageType[];
};

type FlowingMenuProps = {
  items?: MenuItemType[];
};

function FlowingMenu({ items = [] }: FlowingMenuProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: ImageType[] | undefined, clickedImageIndex = 0) => {
    console.log('openLightbox called with images:', images, 'clicked index:', clickedImageIndex);
    if (images && images.length > 0) {
      const slides = images.map(img => ({
        src: img.url || img.sizes?.['large'] || img.sizes?.['medium_large'] || img.sizes?.['medium'] || img.url,
        alt: img.alt || img.title || '',
        width: img.width || 1920,
        height: img.height || 1080
      }));
      console.log('Lightbox slides:', slides);
      setLightboxSlides(slides);
      setLightboxIndex(clickedImageIndex);
      setLightboxOpen(true);
    } else {
      console.log('No images to show in lightbox');
    }
  };

  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem 
            key={idx} 
            {...item} 
            onImageClick={(imageIndex) => openLightbox(item.images, imageIndex)} 
          />
        ))}
      </nav>
      
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        render={{
          buttonPrev: lightboxSlides.length <= 1 ? () => null : undefined,
          buttonNext: lightboxSlides.length <= 1 ? () => null : undefined,
        }}
        styles={{
          container: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      />
    </div>
  );
}

type MenuItemProps = {
  link?: string;
  text?: string;
  images?: ImageType[];
  onImageClick?: (imageIndex: number) => void;
};

function MenuItem({ link, text, images = [], onImageClick }: MenuItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    // Check if the mouse is moving to an image within the marquee
    const relatedTarget = ev.relatedTarget;
    if (relatedTarget && relatedTarget instanceof HTMLElement && relatedTarget.classList.contains('marquee__img')) {
      return; // Don't hide marquee if moving to an image
    }
    
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, imageIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Image clicked, images:', images, 'image index:', imageIndex);
    if (onImageClick) {
      onImageClick(imageIndex);
    }
  };

  // Create repeated content with all gallery images
  const repeatedMarqueeContent = Array.from({ length: 8 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      {images.map((img, imgIdx) => (
        <div 
          key={imgIdx}
          className="marquee__img" 
          style={{ 
            backgroundImage: `url(${img.url || img.sizes?.['large'] || img.sizes?.['medium_large'] || img.sizes?.['medium'] || img.url})` 
          }}
          onClick={(e) => handleImageClick(e, imgIdx)}
        />
      ))}
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {text}
      </a>
      <div 
        className="marquee" 
        ref={marqueeRef}
        onMouseEnter={() => {
          // Keep marquee visible when hovering over it
          if (marqueeRef.current) {
            gsap.set(marqueeRef.current, { y: '0%' });
            if (marqueeInnerRef.current) {
              gsap.set(marqueeInnerRef.current, { y: '0%' });
            }
          }
        }}
        onMouseLeave={() => {
          // Hide marquee when leaving the marquee area
          if (marqueeRef.current && marqueeInnerRef.current) {
            gsap
              .timeline({ defaults: animationDefaults })
              .to(marqueeRef.current, { y: '-101%' }, 0)
              .to(marqueeInnerRef.current, { y: '101%' }, 0);
          }
        }}
      >
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
