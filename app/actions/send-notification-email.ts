"use server"

interface SendEmailProps {
  to: string
  subject: string
  textContent: string
  htmlContent: string
}

export async function sendNotificationEmail({ to, subject, textContent, htmlContent }: SendEmailProps) {
  console.log("Attempting to send email to:", to)

  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set in environment variables")
    return { success: false, error: "API key not configured" }
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "krissmann@markupxbrands.com",
          name: "GetMoreBacklinks",
        },
        to: [{ email: to }],
        subject,
        textContent,
        htmlContent,
      }),
    })

    const responseData = await response.json()
    console.log("Brevo API response:", responseData)

    if (!response.ok) {
      throw new Error(`Email sending failed: ${response.statusText}`)
    }

    console.log("Email sent successfully")
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to send email" }
  }
}

