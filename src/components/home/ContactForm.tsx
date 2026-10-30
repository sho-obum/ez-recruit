"use client";

import { useRef, useState } from "react";
import Icon from "../Icon";

// Public EmailJS values from the current site, so demo requests keep landing in the same inbox.
const EMAILJS = { url: "https://api.emailjs.com/api/v1.0/email/send", service_id: "service_t1ylhs8", template_id: "template_9czjpne", user_id: "TmHjoSDuBGdYabUGg" };
const SUPPORT = "support@ezrecruit.ai";

type Field = { name: string; label: string; type?: string; placeholder: string; required?: boolean; auto?: string };
const ROWS: Field[][] = [
  [{ name: "name", label: "Name", placeholder: "Asha Verma", required: true, auto: "name" },
   { name: "email", label: "Work email", type: "email", placeholder: "asha@agency.com", required: true, auto: "email" }],
  [{ name: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210", auto: "tel" },
   { name: "designation", label: "Designation", placeholder: "Founder", auto: "organization-title" }],
  [{ name: "company", label: "Company", placeholder: "Your agency", required: true, auto: "organization" },
   { name: "company_website", label: "Company website", type: "url", placeholder: "agency.com", auto: "url" }],
];

const LABEL = "text-sm leading-[18.2px] font-medium tracking-[-0.14px]";
const INPUT = `w-full rounded-xl border-[0.8px] border-line bg-fill-2 px-3.5 text-[15px] leading-[19.5px] text-ink outline-none
  transition-[background-color,border-color] duration-300 placeholder:text-faint focus:border-[#c2c2c2] focus:bg-white`;
const DARK = "roll-trigger inline-flex w-full items-center justify-center gap-2 overflow-clip rounded-full bg-ink px-4 py-2.5 text-white transition-colors duration-300 hover:bg-[#262626] text-[15px] leading-[18px] font-medium tracking-[-0.15px] md:text-base md:leading-[19.2px] md:tracking-[-0.16px]";

function Roll({ label }: { label: string }) {
  return (
    <>
      <span className="roll h-[18px] md:h-[19.2px]"><span>{label}</span><span aria-hidden="true">{label}</span></span>
      <span className="icon-roll" aria-hidden="true"><Icon name="chevron" /><Icon name="chevron" /></span>
    </>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  async function send() {
    const f = form.current;
    if (!f) return;
    const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
    // Bots fill the hidden field; show them success and send nothing.
    if (d.fax) return setState("sent");
    setState("sending");
    const { name, email, phone, designation, company, company_website, message } = d;
    try {
      const res = await fetch(EMAILJS.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.service_id, template_id: EMAILJS.template_id, user_id: EMAILJS.user_id,
          template_params: { name, email, phone, designation, company, company_website, message, title: `Demo Request - ${company}` },
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-ink"><Icon name="tick" size={22} stroke={2.2} /></span>
        <p className="text-xl leading-[25px] font-medium tracking-[-0.4px]">Thanks, we will get back to you soon.</p>
        <p className="text-sm leading-[20.3px] text-muted">Need help sooner? Email <a href={`mailto:${SUPPORT}`} className="text-ink underline decoration-line underline-offset-2">{SUPPORT}</a></p>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={e => { e.preventDefault(); send(); }} className="relative flex flex-col gap-4">
      {ROWS.map(row => (
        <div key={row[0].name} className="flex flex-col gap-4 md:flex-row md:gap-3">
          {row.map(f => (
            <label key={f.name} className="flex flex-1 flex-col gap-2">
              <span className={LABEL}>{f.label}{!f.required && <span className="font-normal text-faint"> (optional)</span>}</span>
              <input name={f.name} type={f.type || "text"} placeholder={f.placeholder} required={f.required} autoComplete={f.auto}
                className={`${INPUT} h-12`} />
            </label>
          ))}
        </div>
      ))}
      <label className="flex flex-col gap-2">
        <span className={LABEL}>Message<span className="font-normal text-faint"> (optional)</span></span>
        <textarea name="message" rows={4} placeholder="We place 40 roles a month across 12 clients and..." className={`${INPUT} h-28 resize-none py-3`} />
      </label>
      <input name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />

      {state === "error" ? (
        <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl bg-fill-2 p-4 text-center">
          <p className="text-sm leading-[20.3px] text-muted">Your request did not go through. Email us and we will reply there.</p>
          <a href={`mailto:${SUPPORT}?subject=Demo%20request`} className={DARK}><Roll label="Email us instead" /></a>
          <button type="submit" className="cursor-pointer text-xs leading-[15.6px] font-medium text-muted underline decoration-line underline-offset-2 hover:text-ink">Try again</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <button type="submit" disabled={state === "sending"} className={`${DARK} cursor-pointer disabled:cursor-wait disabled:opacity-70`}>
            {state === "sending" ? <span className="h-[18px] md:h-[19.2px]">Sending...</span> : <Roll label="Book my demo" />}
          </button>
          <p className="text-xs leading-[15.6px] font-medium text-muted">
            Prefer email? <a href={`mailto:${SUPPORT}`} className="text-ink underline decoration-line underline-offset-2">{SUPPORT}</a>
          </p>
        </div>
      )}
    </form>
  );
}
