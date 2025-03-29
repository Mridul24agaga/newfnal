// Configuration for the blog system
export const BLOG_CONFIG = {
    apiKey: process.env.BLOG_API_KEY || "your-api-key-here",
    defaultImage: "/brain.png",
    siteUrl: "https://www.getmorebacklinks.org",
    siteName: "GetMoreBacklinks",
    // Add this line to set up the cron job URL
    cronUrl: "/api/cron/publish-scheduled",
  }
  
  