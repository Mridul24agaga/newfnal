import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, notifyEmail } = await request.json()
    const apiKey = process.env.SENDINBLUE_API_KEY

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!apiKey) {
      console.error("SENDINBLUE_API_KEY environment variable is not set")
      return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
    }

    // Add contact to Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          SIGNUP_SOURCE: "Popup Form",
          SIGNUP_DATE: new Date().toISOString(),
        },
        listIds: [9], // You may need to adjust this list ID based on your Brevo account
        updateEnabled: true,
      }),
    })

    // Check if the response is valid before parsing
    let data
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json()
      } catch (error) {
        console.error("Failed to parse response as JSON:", error)
        data = { message: "Invalid response from Brevo API" }
      }
    } else {
      // Handle non-JSON responses
      const text = await response.text()
      console.error("Non-JSON response:", text)
      data = { message: "Unexpected response format from Brevo API" }
    }

    if (!response.ok) {
      console.error("Brevo API error:", data)
      return NextResponse.json(
        { success: false, message: data.message || "Failed to subscribe" },
        { status: response.status },
      )
    }

    // Send notification email to founder
    if (notifyEmail) {
      const notifyResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "Website Notification",
            email: "noreply@yourdomain.com",
          },
          to: [
            {
              email: notifyEmail,
              name: "Founder",
            },
          ],
          subject: "New Directory List Subscriber",
          htmlContent: `
            <html>
              <body>
                <h1>New Subscriber Alert</h1>
                <p>A new user has subscribed to your directory list:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </body>
            </html>
          `,
        }),
      })

      // Handle notification response similarly
      if (!notifyResponse.ok) {
        console.warn("Failed to send notification email, but subscription was successful")
      }
    }

    // Send confirmation email to the subscriber
    try {
      const confirmationResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "Directory List",
            email: "founder@markupxbrands.com",
          },
          to: [
            {
              email: email,
            },
          ],
          subject: "Thanks for Subscribing to Our Directory List",
          htmlContent: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #2c3e50; margin-bottom: 10px;">Thank You for Subscribing!</h1>
                  <p style="font-size: 16px; margin-bottom: 25px;">We're excited to have you join our community.</p>
                </div>
                
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                  <p style="font-size: 16px; margin-bottom: 15px;">Here's your exclusive access to our list of 100+ directories to help boost your backlinks:</p>
                  
                  <div style="text-align: center;">
                    <a href="http://getmorebacklinks.org/list" style="display: inline-block; background-color: #3498db; color: white; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold; margin: 10px 0;">Access Your Directory List</a>
                  </div>
                </div>
                
                <p style="font-size: 14px; color: #7f8c8d; text-align: center; margin-top: 30px;">
                  If you have any questions, feel free to reply to this email.
                </p>
              </body>
            </html>
          `,
        }),
      })

      // Check and log the confirmation email response
      let confirmationData
      try {
        confirmationData = await confirmationResponse.json()
      } catch (error) {
        const text = await confirmationResponse.text()
        console.error("Failed to parse confirmation email response:", text)
        confirmationData = { message: "Invalid response from Brevo API" }
      }

      if (!confirmationResponse.ok) {
        console.error("Failed to send confirmation email:", confirmationData)
      } else {
        console.log("Confirmation email sent successfully to:", email)
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
