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
  const footerGridRef = useRef<HTMLDivElement>(null);
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
        footerGridRef.current,
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
        footerGridRef.current,
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
      id="contact"
      ref={sectionRef}
      className="relative bg-linear-to-br from-climate-green-light/20 via-climate-green-light/10 to-neutral-off-white py-12 sm:py-16 md:py-20 touch-pan-y"
      aria-label="Footer section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
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

        {/* Footer Content Grid */}
        <div
          ref={footerGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logos/kcic-logo.png"
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
                  <span className="text-base font-heading font-bold text-climate-green">
                    KCIC
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-brown-gray leading-relaxed">
              Driving climate innovation across Africa through collaboration, investment, and sustainable solutions for a greener future.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-climate-green/10 hover:bg-partner-agra hover:text-white text-climate-green flex items-center justify-center transition-all duration-300 touch-manipulation"
                    aria-label={`Visit our ${social.platform} page`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-climate-green">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">About Us</a></li>
              <li><a href="#pillars" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Our Pillars</a></li>
              <li><a href="#activities" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Activities</a></li>
              <li><a href="#fund" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Climate Fund</a></li>
              <li><a href="#platform" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Innovation Platform</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-climate-green">Support</h3>
            <ul className="space-y-2">
              <li><a href="#help" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Help Center</a></li>
              <li><a href="#contact" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Contact Us</a></li>
              <li><a href="#faq" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">FAQ</a></li>
              <li><a href="#privacy" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-sm text-neutral-brown-gray hover:text-climate-green transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-climate-green">Stay Updated</h3>
            <p className="text-sm text-neutral-brown-gray">
              Get the latest climate innovation news and opportunities delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="bg-climate-green hover:bg-partner-agra text-white px-4"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {submitMessage && (
                <p className={`text-xs ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div
          ref={logoRef}
          className="border-t border-climate-green/20 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-neutral-brown-gray">
              © {new Date().getFullYear()} Kenya Climate Innovation Centre. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-brown-gray">
              <a href="#accessibility" className="hover:text-climate-green transition-colors touch-manipulation">
                Accessibility
              </a>
              <a href="#cookies" className="hover:text-climate-green transition-colors touch-manipulation">
                Cookies
              </a>
              <a href="#sitemap" className="hover:text-climate-green transition-colors touch-manipulation">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
