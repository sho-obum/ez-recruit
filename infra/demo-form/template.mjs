// The email a demo request produces: an HTML card (inline styles and tables, so mail apps render it) plus a plain-text copy.
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function buildEmail({ name, email, company, size, message, page }) {
  const first = name.split(" ")[0] || name;
  const rows = [["Name", name], ["Work email", email], ["Company", company], size && ["Recruiting team", `${size} recruiters`], ["Sent from", page]].filter(Boolean);
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Your EZRecruit demo")}`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", message || "(no message)"].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#eef5fb;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef5fb;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#0b0b0d;">
  <tr><td style="background:#0f6fb8;padding:22px 32px;">
    <span style="font-size:20px;font-weight:700;letter-spacing:-0.3px;color:#ffffff;">EZRecruit</span>
    <span style="font-size:13px;color:#cfe9fd;padding-left:10px;">New demo request</span>
  </td></tr>
  <tr><td style="padding:32px 32px 8px;">
    <div style="font-size:13px;color:#5b6773;">${esc(name)} would like a demo</div>
    <div style="font-size:28px;line-height:1.15;font-weight:600;letter-spacing:-0.8px;padding-top:6px;">${esc(company)}</div>
  </td></tr>
  <tr><td style="padding:16px 32px 8px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e9f2;border-radius:14px;border-collapse:separate;">
      ${rows.map(([k, v], i) => `<tr><td style="padding:12px 16px;width:130px;font-size:13px;color:#5b6773;${i ? "border-top:1px solid #e3e9f2;" : ""}">${esc(k)}</td><td style="padding:12px 16px;font-size:15px;font-weight:500;${i ? "border-top:1px solid #e3e9f2;" : ""}">${k === "Work email" ? `<a href="${mailto}" style="color:#0f6fb8;text-decoration:none;">${esc(v)}</a>` : esc(v)}</td></tr>`).join("")}
    </table>
  </td></tr>
  <tr><td style="padding:16px 32px 8px;">
    <div style="font-size:13px;color:#5b6773;padding-bottom:8px;">Message</div>
    <div style="background:#e4f3ff;border-radius:14px;padding:16px 18px;font-size:15px;line-height:1.55;white-space:pre-wrap;">${message ? esc(message) : '<span style="color:#5b6773;">No message.</span>'}</div>
  </td></tr>
  <tr><td style="padding:24px 32px 32px;">
    <a href="${mailto}" style="display:inline-block;background:#0b0b0d;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:13px 24px;border-radius:999px;">Reply to ${esc(first)}</a>
  </td></tr>
  <tr><td style="border-top:1px solid #e3e9f2;padding:16px 32px;font-size:12px;color:#7a8794;">
    Sent from the Book a demo form. Replying to this email goes straight to ${esc(email)}.
  </td></tr>
</table>
</td></tr></table></body></html>`;

  return { text, html };
}
