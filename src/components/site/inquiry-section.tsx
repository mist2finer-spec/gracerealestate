"use client";

import { useState } from "react";
import { Mail, Send, Phone, User, MessageSquare, Home, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSearchStore } from "@/store/search-store";
import { AGENTS as FALLBACK_AGENTS, formatPriceFull, Agent, PropertyListing } from "@/lib/data";
import { toast } from "sonner";

interface InquirySectionProps {
  /** When "inline" the section renders as a full-width banner below listings.
   *  When "dialog" it renders inside a Dialog (controlled by inquiryOpen). */
  variant?: "inline" | "dialog";
}

export function InquirySection({ variant = "inline" }: InquirySectionProps) {
  const { inquiryOpen, setInquiryOpen, inquiryPropertyId } = useSearchStore();
  const properties = useSearchStore((s) => s.properties);
  const agents = useSearchStore((s) => s.siteContent.agents);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Find the property this inquiry is about (if any)
  const property: PropertyListing | null = inquiryPropertyId
    ? properties.find((p) => p.id === inquiryPropertyId) || null
    : null;
  const agent: Agent | null = property
    ? agents.find((a) => a.id === property.agentId) ||
      FALLBACK_AGENTS.find((a) => a.id === property.agentId) ||
      null
    : null;

  // Pre-fill message with property context if we have one
  const defaultMsg = property
    ? `Hi ${agent?.name ?? "there"},\n\nI'm interested in "${property.title}" at ${property.address}, ${property.city}, ${property.state} ${property.zip} (listed at ${formatPriceFull(
        property.price,
        property.status
      )}).\n\nCould you share more details and arrange a viewing?\n\nThanks!`
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast("Missing fields", {
        description: "Name, email, and message are required.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Invalid email", { description: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          propertyTitle: property?.title,
          propertyAddress: property
            ? `${property.address}, ${property.city}, ${property.state} ${property.zip}`
            : undefined,
          propertyPrice: property
            ? formatPriceFull(property.price, property.status)
            : undefined,
          agentName: agent?.name,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send inquiry");
      }
      setSubmitted(true);
      toast.success("Inquiry sent!", {
        description:
          data.mode === "dev"
            ? "Logged to server (SMTP not configured)."
            : "We'll get back to you within 24 hours.",
      });
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      // Auto-close dialog after 2.5s
      if (variant === "dialog") {
        setTimeout(() => {
          setInquiryOpen(false);
          setSubmitted(false);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Send failed", {
        description: (err as Error).message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ============ Dialog variant (modal) ============
  if (variant === "dialog") {
    if (!inquiryOpen) return null;
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Property inquiry form"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setInquiryOpen(false)}
        />
        {/* Panel */}
        <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-background shadow-2xl">
          <InquiryFormContent
            name={name}
            email={email}
            phone={phone}
            message={message}
            defaultMsg={defaultMsg}
            submitted={submitted}
            submitting={submitting}
            property={property}
            agent={agent}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onMessageChange={setMessage}
            onSubmit={handleSubmit}
            onClose={() => setInquiryOpen(false)}
            variant="dialog"
          />
        </div>
      </div>
    );
  }

  // ============ Inline variant (banner section) ============
  return (
    <section id="inquiry" className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-10">
          <InquiryFormContent
            name={name}
            email={email}
            phone={phone}
            message={message}
            defaultMsg={defaultMsg}
            submitted={submitted}
            submitting={submitting}
            property={property}
            agent={agent}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onMessageChange={setMessage}
            onSubmit={handleSubmit}
            variant="inline"
          />
        </div>
      </div>
    </section>
  );
}

interface FormContentProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  defaultMsg: string;
  submitted: boolean;
  submitting: boolean;
  property: PropertyListing | null;
  agent: Agent | null;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onMessageChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose?: () => void;
  variant: "inline" | "dialog";
}

function InquiryFormContent({
  name,
  email,
  phone,
  message,
  defaultMsg,
  submitted,
  submitting,
  property,
  agent,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onMessageChange,
  onSubmit,
  onClose,
  variant,
}: FormContentProps) {
  // Initialise the message on first render if it's empty + we have a default
  if (!message && defaultMsg) {
    onMessageChange(defaultMsg);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">Inquiry sent!</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thanks for reaching out. {agent ? `${agent.name} ` : "An agent "}will
          get back to you within 24 hours. Check your inbox (and spam folder)
          for a reply.
        </p>
        {variant === "dialog" && onClose && (
          <Button onClick={onClose} className="mt-6">
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                Send an inquiry
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Reach the listing agent directly — we&apos;ll respond within 24 hours.
              </p>
            </div>
          </div>
          {variant === "dialog" && onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Property context card */}
      {property && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
          <img
            src={property.image}
            alt={property.title}
            className="h-12 w-16 shrink-0 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{property.title}</div>
            <div className="truncate text-xs text-muted-foreground">
              {property.address}, {property.city}, {property.state}
            </div>
          </div>
          <Badge className="shrink-0 bg-primary text-primary-foreground">
            {formatPriceFull(property.price, property.status)}
          </Badge>
        </div>
      )}

      {/* Agent badge */}
      {agent && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
          <img
            src={agent.image}
            alt={agent.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold">{agent.name}</div>
            <div className="text-xs text-muted-foreground">{agent.title}</div>
          </div>
          <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {agent.phone}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {agent.email}
            </span>
          </div>
        </div>
      )}

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="inq-name" className="text-xs">
            <User className="inline h-3 w-3 mr-1" />
            Your name *
          </Label>
          <Input
            id="inq-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Jane Doe"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="inq-email" className="text-xs">
            <Mail className="inline h-3 w-3 mr-1" />
            Email *
          </Label>
          <Input
            id="inq-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="jane@example.com"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="inq-phone" className="text-xs">
            <Phone className="inline h-3 w-3 mr-1" />
            Phone (optional)
          </Label>
          <Input
            id="inq-phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="(212) 555-0123"
            className="mt-1"
          />
        </div>
        {variant === "inline" && (
          <div className="flex items-end">
            <div className="text-xs text-muted-foreground">
              <Home className="inline h-3 w-3 mr-1" />
              Your inquiry goes directly to {agent?.name ?? "the listing agent"}.
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="inq-msg" className="text-xs">
          <MessageSquare className="inline h-3 w-3 mr-1" />
          Message *
        </Label>
        <Textarea
          id="inq-msg"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Tell us what you're looking for, your timeline, preferred viewing times..."
          required
          rows={variant === "dialog" ? 6 : 5}
          className="mt-1 min-h-[120px]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting} className="gap-1.5">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send inquiry
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          We respect your privacy. Your details are only used to contact you
          about this inquiry.
        </p>
      </div>
    </form>
  );
}
