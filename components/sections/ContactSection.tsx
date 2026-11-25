"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Mail, Phone,  ExternalLink, Clock, CalendarCheck } from "lucide-react";

export function ContactSection() {
  const { contact } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <SectionHeading
        number="07"
        title="Contact & Engagements"
        caption="Direct communication channels for AI developer roles, full-stack engineering, and technical discussion."
        id="contact-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Direct Email, Phone & Copy Action */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 sm:p-8">
            <h3 className="font-mono text-xl sm:text-2xl font-bold text-text">
              {contact.headline}
            </h3>

            <p className="font-sans text-sm sm:text-base text-text-muted mt-3 leading-relaxed">
              {contact.subheadline}
            </p>

            {/* Contact Channels */}
            <div className="mt-8 space-y-3">
              {/* Email Box */}
              <div className="p-4 rounded-lg bg-surface-subtle border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-accent-subtle border border-accent/20 text-accent">
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted">Direct Email:</div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-mono text-sm sm:text-base font-semibold text-text hover:text-accent transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={handleCopyEmail}
                    variant={copied ? "primary" : "secondary"}
                    size="sm"
                    className="gap-1.5 w-full sm:w-auto"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Copy email</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Phone Box */}
              <div className="p-4 rounded-lg bg-surface-subtle border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-md bg-accent-subtle border border-accent/20 text-accent">
                    <Phone className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted">Direct Phone / WhatsApp:</div>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-mono text-sm sm:text-base font-semibold text-text hover:text-accent transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-xs px-3 py-2 rounded-md border border-border bg-surface text-text hover:text-accent hover:border-accent transition-colors text-center"
                >
                  Call Now →
                </a>
              </div>
            </div>

            {/* Status / Availability Note */}
            <div className="mt-6 pt-6 border-t border-border space-y-3 font-mono text-xs text-text-muted">
              <div className="flex items-start gap-2">
                <CalendarCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-text font-medium">Availability: </strong>
                  {contact.availability}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong className="text-text font-medium">Schedule: </strong>
                  {contact.officeHours}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Social channels */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {"// External Channels & Profiles"}
          </h3>

          <div className="space-y-2">
            {contact.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg bg-surface border border-border hover:border-border-hover hover:bg-surface-hover transition-colors font-mono text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-text group-hover:text-accent transition-colors">
                    {social.platform}
                  </span>
                  <span className="text-xs text-text-muted">
                    {social.handle}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
