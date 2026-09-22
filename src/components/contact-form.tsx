"use client";

import { useState } from "react";
import { Button } from "./ui";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("loading"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      setState("success"); setMessage("Thanks - your message has been received."); form.reset();
    } catch (error) {
      setState("error"); setMessage(error instanceof Error ? error.message : "Message could not be sent.");
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    {message && <div className={`inline-notice ${state}`}>{message}</div>}
    <div className="contact-fields">
      <label className="field"><span>Name</span><input name="name" minLength={2} required /></label>
      <label className="field"><span>Email</span><input name="email" type="email" required /></label>
      <label className="field"><span>Company or brand</span><input name="company" /></label>
      <label className="field"><span>Reason</span><select name="reason" defaultValue="general"><option value="sales">Sales</option><option value="support">Support</option><option value="partnership">Partnership</option><option value="general">General enquiry</option></select></label>
      <label className="field full"><span>Message</span><textarea name="message" minLength={10} maxLength={3000} rows={6} required /></label>
      <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <Button disabled={state === "loading"} type="submit">{state === "loading" ? "Sending..." : "Send message"}</Button>
  </form>;
}
