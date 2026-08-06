import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, email, service, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid } = await request.json();

    const hasUtm = utm_source || utm_medium || utm_campaign || gclid;
    const utmSection = hasUtm ? `
        <hr />
        <h3>Ad Attribution</h3>
        ${utm_source ? `<p><strong>Source:</strong> ${utm_source}</p>` : ''}
        ${utm_medium ? `<p><strong>Medium:</strong> ${utm_medium}</p>` : ''}
        ${utm_campaign ? `<p><strong>Campaign:</strong> ${utm_campaign}</p>` : ''}
        ${utm_term ? `<p><strong>Keyword:</strong> ${utm_term}</p>` : ''}
        ${utm_content ? `<p><strong>Ad Content:</strong> ${utm_content}</p>` : ''}
        ${gclid ? `<p><strong>Google Click ID:</strong> ${gclid}</p>` : ''}
      ` : '';

    // Send lead notification to business
    const { data, error } = await resend.emails.send({
      from: 'Harrisburg Tree Service <hello@treeprofessionalsofharrisburg.com>',
      to: ['lyle.voorhees@treeprofessionalsofharrisburg.com'],
      subject: `New Quote Request: ${service} - ${name}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="background-color:#1b5e20;padding:24px 32px;">
                    <h1 style="margin:0;color:#ffffff;font-size:22px;">New Quote Request</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e0e0e0;">
                          <strong style="color:#555;">Name</strong><br/>
                          <span style="font-size:16px;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e0e0e0;">
                          <strong style="color:#555;">Phone</strong><br/>
                          <a href="tel:${phone}" style="font-size:16px;color:#1b5e20;">${phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e0e0e0;">
                          <strong style="color:#555;">Email</strong><br/>
                          <a href="mailto:${email}" style="font-size:16px;color:#1b5e20;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e0e0e0;">
                          <strong style="color:#555;">Service Requested</strong><br/>
                          <span style="font-size:16px;">${service}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <strong style="color:#555;">Message</strong><br/>
                          <span style="font-size:16px;">${message || 'No message provided'}</span>
                        </td>
                      </tr>
                    </table>
                    ${utmSection ? `
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background-color:#f9f9f9;border-radius:6px;padding:16px;">
                      <tr><td>
                        <strong style="color:#555;font-size:14px;">Ad Attribution</strong>
                        <div style="margin-top:8px;font-size:13px;color:#666;">
                          ${utm_source ? `<div>Source: ${utm_source}</div>` : ''}
                          ${utm_medium ? `<div>Medium: ${utm_medium}</div>` : ''}
                          ${utm_campaign ? `<div>Campaign: ${utm_campaign}</div>` : ''}
                          ${utm_term ? `<div>Keyword: ${utm_term}</div>` : ''}
                          ${utm_content ? `<div>Ad Content: ${utm_content}</div>` : ''}
                          ${gclid ? `<div>Google Click ID: ${gclid}</div>` : ''}
                        </div>
                      </td></tr>
                    </table>` : ''}
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

    // Send confirmation email to the customer
    await resend.emails.send({
      from: 'Harrisburg Tree Service <hello@treeprofessionalsofharrisburg.com>',
      to: [email],
      subject: `We received your request - Tree Professionals of Harrisburg`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="background-color:#1b5e20;padding:24px 32px;">
                    <h1 style="margin:0;color:#ffffff;font-size:22px;">Tree Professionals of Harrisburg</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <p style="font-size:16px;color:#333;margin:0 0 16px;">Hi ${name},</p>
                    <p style="font-size:16px;color:#333;margin:0 0 16px;">Thank you for reaching out! We've received your request for <strong>${service}</strong> and a member of our team will get back to you shortly.</p>
                    <p style="font-size:16px;color:#333;margin:0 0 24px;">If you need immediate assistance, feel free to give us a call:</p>
                    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                      <tr>
                        <td style="background-color:#1b5e20;border-radius:6px;padding:12px 24px;">
                          <a href="tel:+17179028425" style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;">(717) 902-8425</a>
                        </td>
                      </tr>
                    </table>
                    <p style="font-size:14px;color:#888;margin:0;">Tree Professionals of Harrisburg<br/>Licensed &amp; Insured &bull; Free Estimates</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
