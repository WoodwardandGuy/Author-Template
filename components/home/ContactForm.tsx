'use client';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CompanyInfo, SiteContent } from '@/lib/types';

interface ContactFormProps {
  companyInfo: CompanyInfo;
  content?: Pick<SiteContent, 'contactHeadline' | 'contactSubtext' | 'contactInfoTitle' | 'contactButtonText'> | null;
}

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;

function captureUtmParams() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utmData[key] = value;
  }
  if (Object.keys(utmData).length > 0) {
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
  }
}

function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem('utm_data') || '{}');
  } catch {
    return {};
  }
}

export function ContactForm({ companyInfo, content }: ContactFormProps) {
  useEffect(() => {
    captureUtmParams();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const utmData = getUtmParams();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...utmData }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');

      // Push form submission event to GTM dataLayer
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission',
          service_type: formData.service,
        });
      }

      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-tree-green/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-tree-green mb-4">
            {content?.contactHeadline || 'Get Your Free Quote'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content?.contactSubtext || 'Fill out the form below and we\u2019ll get back to you within 24 hours with a detailed estimate'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="bg-tree-green text-white rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">{content?.contactInfoTitle || 'Contact Information'}</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Call Us</p>
                    <a
                      href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                      className="text-gray-100 hover:text-white transition-colors text-lg"
                    >
                      {companyInfo.phone}
                    </a>
                    <p className="text-sm text-gray-300 mt-1">
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email Us</p>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-gray-100 hover:text-white transition-colors"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {companyInfo.address?.street && (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Visit Us</p>
                      <p className="text-gray-100">
                        {companyInfo.address.street}
                        <br />
                        {companyInfo.address.city}, {companyInfo.address.state}{' '}
                        {companyInfo.address.zip}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <p className="text-gray-100">{companyInfo.hours.weekday}</p>
                <p className="text-gray-100 mt-1">{companyInfo.hours.weekend}</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(717) 555-0123"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Service Needed *
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tree-removal">Tree Removal</SelectItem>
                    <SelectItem value="tree-trimming">
                      Tree Trimming & Pruning
                    </SelectItem>
                    <SelectItem value="stump-grinding">
                      Stump Grinding
                    </SelectItem>
                    <SelectItem value="emergency">
                      Emergency Tree Service
                    </SelectItem>
                    <SelectItem value="tree-health">
                      Tree Health & Disease
                    </SelectItem>
                    <SelectItem value="land-clearing">Land Clearing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your tree service needs..."
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-orange hover:bg-accent-orange-dark text-white h-12 text-lg"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {content?.contactButtonText || 'Request Free Quote'}
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  Thank you! We&apos;ll contact you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  Something went wrong. Please call us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
