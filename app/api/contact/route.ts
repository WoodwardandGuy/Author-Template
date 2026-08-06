import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Addresses are configured via env so no inbox is ever exposed in the client bundle.
// CONTACT_FROM_EMAIL must be on a domain verified in your Resend account.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || '';

function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!TO_EMAIL) {
      console.error('CONTACT_TO_EMAIL is not configured.');
      return NextResponse.json({ error: 'Contact is not configured' }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || 'General');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const { data, error } = await resend.emails.send({
      from: `Website Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `New message: ${safeSubject} — ${safeName}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Georgia,'Times New Roman',serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="background-color:#2A2733;padding:24px 32px;">
                    <h1 style="margin:0;color:#ffffff;font-size:20px;">New message from your website</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;color:#333;">
                    <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
                    <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
                    <p style="margin:0 0 16px;"><strong>Subject:</strong> ${safeSubject}</p>
                    <hr style="border:none;border-top:1px solid #e0e0e0;margin:0 0 16px;" />
                    <p style="margin:0;line-height:1.6;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
