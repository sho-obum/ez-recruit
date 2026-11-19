"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import TextCta from "../TextCta";

// Public EmailJS values from the current site, so demo requests keep landing in the same inbox.
const EMAILJS = { url: "https://api.emailjs.com/api/v1.0/email/send", service_id: "service_t1ylhs8", template_id: "template_9czjpne", user_id: "TmHjoSDuBGdYabUGg" };
const SUPPORT = "support@ezrecruit.ai";
const SIZES = ["1 to 5", "6 to 15", "16 to 50", "50+"];

type Field = { name: string; label: string; type?: string; placeholder: string; required?: boolean; auto?: string };
const ROWS: Field[][] = [
  [{ name: "name", label: "Name", placeholder: "Asha Verma", required: true, auto: "name" },
   { name: "email", label: "Work email", type: "email", placeholder: "asha@agency.com", required: true, auto: "email" }],
  [{ name: "company", label: "Company", placeholder: "Your agency", required: true, auto: "organization" }],
];

const LABEL = "text-sm leading-[18px] font-medium tracking-[-0.14px]";
const INPUT = `w-full rounded-xl border-[0.8px] border-line bg-fill-2 px-3.5 text-[15px] leading-[19.5px] text-ink outline-none
  transition-[background-color,border-color,box-shadow] duration-300 placeholder:text-faint focus:border-[#9fd8ff] focus:bg-white focus:shadow-[0_0_0_3px_#e4f3ff]`;
const DARK = "roll-trigger inline-flex w-full items-center justify-center gap-2 overflow-clip rounded-full bg-ink px-4 py-3 text-white transition-colors duration-300 hover:bg-[#262626] text-[15px] leading-[18px] font-medium tracking-[-0.15px] md:text-base md:leading-[19.2px] md:tracking-[-0.16px]";

function Roll({ label }: { label: string }) {
  return (
    <>
      <span className="roll h-[18px] md:h-[19.2px]"><span>{label}</span><span aria-hidden="true">{label}</span></span>
      <span className="icon-roll" aria-hidden="true"><Icon name="chevron" /><Icon name="chevron" /></span>
    </>
  );
}

// A pill that toggles on and off; the hidden checkbox keeps it usable from the keyboard.
function Pill({ label, on, toggle, type }: { label: string; on: boolean; toggle: () => void; type: "radio" | "checkbox" }) {
  return (
    <label className={`flex cursor-pointer items-center gap-1.5 rounded-full border-[0.8px] px-3.5 py-2 text-[13px] leading-[17px] font-medium transition-colors duration-200
      has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#bfe3ff]
      ${on ? "border-blue-deep bg-blue-soft text-blue-deep" : "border-line bg-white text-ink hover:border-[#9fd8ff] hover:bg-[#f4faff]"}`}>
      <input type={type} checked={on} onChange={toggle} className="sr-only" />
      {on && <Icon name="tick" size={12} stroke={3} />}{label}
    </label>
  );
}

export default function DemoForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [size, setSize] = useState("");
  const [summary, setSummary] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);
  // A question the visitor asked Nyra that she could not answer is carried into the message.
  const [asked, setAsked] = useState("");
  useEffect(() => {
    try { const q = sessionStorage.getItem("ez-question"); if (q) { setAsked(q); sessionStorage.removeItem("ez-question"); } } catch {}
  }, []);

  async function send() {
    const f = form.current;
    if (!f) return;
    const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
    // Bots fill the hidden field; show them success and send nothing.
    if (d.fax) return setState("sent");
    setState("sending");
    const { name, email, company } = d;
    const message = [d.message, size && `Recruiting team size: ${size}`].filter(Boolean).join("\n\n");
    setSummary({ Name: name, Email: email, Company: company, ...(size && { "Team size": size }) });
    try {
      const res = await fetch(EMAILJS.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.service_id, template_id: EMAILJS.template_id, user_id: EMAILJS.user_id,
          template_params: { name, email, phone: "", designation: "", company, company_website: "", message, title: `Demo Request - ${company}` },
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  const shell = "rounded-[28px] border border-line bg-white p-6 md:rounded-[40px] md:p-9";

  if (state === "sent") {
    return (
      <div role="status" className={`${shell} flex flex-col justify-center gap-7`}>
        <div className="flex flex-col items-start gap-4">
          <span className="grid size-12 place-items-center rounded-full bg-blue-soft text-blue-deep shadow-[inset_0_0_0_1px_#bfe3ff]"><Icon name="tick" size={22} stroke={2.4} /></span>
          <h2 className="text-[30px] leading-[1.05] font-medium tracking-[-0.04em] md:text-[38px]">Request received.</h2>
          <p className="text-base leading-6 text-muted">Thanks, we will get back to you soon.</p>
        </div>
        <dl className="flex flex-col rounded-2xl border border-line">
          {Object.entries(summary).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr] gap-3 border-t border-line px-4 py-3 text-[15px] leading-[22px] first:border-t-0">
              <dt className="text-muted">{k}</dt><dd className="min-w-0 font-medium break-words">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm leading-5 text-muted">While you wait, see what Nyra can do.</p>
          <TextCta href="/nyra/">Meet Nyra</TextCta>
          <p className="text-sm leading-5 text-muted">Need help sooner? <a href={`mailto:${SUPPORT}`} className="text-ink underline decoration-line underline-offset-2">{SUPPORT}</a></p>
        </div>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={e => { e.preventDefault(); send(); }} className={`${shell} relative flex flex-col justify-center gap-5 lg:min-h-0`}>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[26px] leading-[1.1] font-medium tracking-[-0.035em] md:text-[32px]">Tell us about your agency</h2>
        
      </div>

      {ROWS.map(row => (
        <div key={row[0].name} className="flex flex-col gap-4 md:flex-row md:gap-3">
          {row.map(f => (
            <label key={f.name} className="flex flex-1 flex-col gap-2">
              <span className={LABEL}>{f.label}{!f.required && <span className="font-normal text-faint"> (optional)</span>}</span>
              <input name={f.name} type={f.type || "text"} placeholder={f.placeholder} required={f.required} autoComplete={f.auto} className={`${INPUT} h-12`} />
            </label>
          ))}
        </div>
      ))}

      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${LABEL} mb-2.5`}>How many recruiters are on your team?<span className="font-normal text-faint"> (optional)</span></legend>
        <div className="flex flex-wrap gap-2">{SIZES.map(s => <Pill key={s} type="radio" label={s} on={size === s} toggle={() => setSize(size === s ? "" : s)} />)}</div>
      </fieldset>

      <input type="hidden" name="message" defaultValue={asked ? `I asked Nyra: "${asked}"` : ""} key={asked} />
      <input name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />

      {state === "error" ? (
        <div role="alert" className="flex flex-col items-center gap-3 rounded-2xl bg-fill-2 p-4 text-center">
          <p className="text-sm leading-[20.3px] text-muted">Your request did not go through. Email us and we will reply there.</p>
          <a href={`mailto:${SUPPORT}?subject=Demo%20request`} className={DARK}><Roll label="Email us instead" /></a>
          <button type="submit" className="cursor-pointer text-xs leading-[15.6px] font-medium text-muted underline decoration-line underline-offset-2 hover:text-ink">Try again</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
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
