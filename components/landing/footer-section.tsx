'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createScrollReveal, prefersReducedMotion } from '@/lib/animations';
import gsap from 'gsap';
import { 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  Mail,
  Loader2
} from 'lucide-react';

export interface CTAButton {
  label: string;
  href: string;
  role: 'innovator' | 'investor' | 'partner';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Linkedin;
}

export interface FooterSectionProps {
  ctaButtons?: CTAButton[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
}

const defaultCTAButtons: CTAButton[] = [
  { label: 'Join as Innovator', href: '#join-innovator', role: 'innovator' },
  { label: 'Join as Investor', href: '#join-investor', role: 'investor' },
  { label: 'Partner with Us', href: '#partner', role: 'partner' },
];

const defaultSocialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/kcic', icon: Linkedin },
  { platform: 'Twitter', url: 'https://twitter.com/kcic', icon: Twitter },
  { platform: 'Facebook', url: 'https://facebook.com/kcic', icon: Facebook },
  { platform: 'Instagram', url: 'https://instagram.com/kcic', icon: Instagram },
];

export function FooterSection({
  ctaButtons = defaultCTAButtons,
  socialLinks = defaultSocialLinks,
  showNewsletter = true,
}: FooterSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!prefersReducedMotion()) {
      // Scroll reveal animation for the section
      const elements = [
        headingRef.current,
        ctaContainerRef.current,
        newsletterRef.current,
        logoRef.current,
      ].filter(Boolean);

      elements.forEach((element, index) => {
        if (element) {
          createScrollReveal(element, {
            trigger: sectionRef.current!,
            start: 'top 80%',
            delay: index * 0.15,
          });
        }
      });
    } else {
      // Apply final state immediately for reduced motion
      const elements = [
        headingRef.current,
        ctaContainerRef.current,
        newsletterRef.current,
        logoRef.current,
      ].filter(Boolean);
      
      elements.forEach((element) => {
        if (element) {
          gsap.set(element, { opacity: 1, y: 0 });
        }
      });
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call - replace with actual implementation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="relative bg-linear-to-br from-climate-green-light/20 via-climate-green-light/10 to-neutral-off-white py-6 sm:py-8 md:py-10 touch-pan-y"
      aria-label="Footer section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
          <h2
            ref={headingRef}
            className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-climate-green mb-3 sm:mb-4 px-4"
          >
            Be part of Africa&apos;s climate innovation movement
          </h2>

          {/* CTA Buttons */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row gap-2 justify-center items-stretch sm:items-center px-4 sm:px-0"
          >
            {ctaButtons.map((cta, index) => (
              <Button
                key={index}
                asChild
                size="sm"
                className="bg-climate-green hover:bg-partner-agra text-white transition-all duration-300 w-full sm:w-auto sm:min-w-[160px] group touch-manipulation"
              >
                <a href={cta.href} className="flex items-center justify-center gap-2">
                  {cta.label}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div
          ref={logoRef}
          className="border-t border-climate-green/20 pt-3 sm:pt-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src="/images/logos/kcic-logo.svg"
                  alt="KCIC"
                  fill
                  className="object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm sm:text-base font-heading font-bold text-climate-green">
                    KCIC
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-brown-gray">
                © {new Date().getFullYear()} KCIC
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-climate-green/10 hover:bg-partner-agra hover:text-white text-climate-green flex items-center justify-center transition-all duration-300 touch-manipulation"
                    aria-label={`Visit our ${social.platform} page`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-3 pt-3 border-t border-climate-green/10">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-neutral-brown-gray">
              <a href="#privacy" className="hover:text-climate-green transition-colors touch-manipulation">
                Privacy
              </a>
              <a href="#terms" className="hover:text-climate-green transition-colors touch-manipulation">
                Terms
              </a>
              <a href="#contact" className="hover:text-climate-green transition-colors touch-manipulation">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
