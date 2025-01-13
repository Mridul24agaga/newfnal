'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Search, Menu, ExternalLink, ChevronDown, Loader2 } from 'lucide-react'
import { User } from '@supabase/auth-helpers-nextjs'
import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'

type Backlink = {
  name: string
  website: string
  category: string
  da: number
}

const backlinks: Backlink[] = [
  { name: "Tech | Time", website: "https://time.com/section/tech/", category: "Media", da: 94 },
  { name: "Huffingtonpost", website: "http://www.huffingtonpost.com/", category: "Media", da: 94 },
  { name: "Forbes Technology", website: "http://www.forbes.com/technology/", category: "Media", da: 94 },
  { name: "Guardian Technology", website: "http://www.theguardian.com/uk/technology", category: "Media", da: 94 },
  { name: "HuffPost", website: "https://www.huffpost.com/", category: "Media", da: 94 },
  { name: "SourceForge", website: "https://sourceforge.net/software/vendors/new", category: "Directory", da: 93 },
  { name: "The Verge", website: "https://www.theverge.com/", category: "Media", da: 93 },
  { name: "The Wall Street Journal", website: "https://www.wsj.com/", category: "Media", da: 93 },
  { name: "Mashable", website: "http://mashable.com/", category: "Media", da: 93 },
  { name: "Mashable India", website: "https://in.mashable.com/", category: "Media", da: 93 },
  { name: "CNET", website: "https://www.cnet.com/news/", category: "Media", da: 93 },
  { name: "Engadget", website: "http://www.engadget.com/", category: "Media", da: 93 },
  { name: "Gizmodo", website: "http://www.gizmodo.com/", category: "Media", da: 93 },
  { name: "Psychology Today", website: "https://www.psychologytoday.com/us", category: "Media", da: 93 },
  { name: "TechCrunch", website: "https://techcrunch.com/", category: "Media", da: 93 },
  { name: "Wired", website: "http://www.wired.com/", category: "Media", da: 93 },
  { name: "Quora", website: "www.quora.com", category: "Q&A platform", da: 93 },
  { name: "Behance", website: "http://behance.net/", category: "Creative", da: 92 },
  { name: "Dribbble", website: "https://dribbble.com/", category: "Design", da: 92 },
  { name: "Slide Share", website: "https://www.slideshare.net/", category: "Directories", da: 92 },
  { name: "Source Forge", website: "https://sourceforge.net/", category: "Directories", da: 92 },
  { name: "Softonic", website: "https://en.softonic.com/android", category: "Directory", da: 92 },
  { name: "BostInno Startups, Tech News and Events", website: "bizjournals.com", category: "Media", da: 92 },
  { name: "Digg", website: "digg.com", category: "Media", da: 92 },
  { name: "Entrepreneur", website: "Entrepreneur.com", category: "Media", da: 92 },
  { name: "Fast Company", website: "https://www.fastcompany.com/", category: "Media", da: 92 },
  { name: "Fastcompany", website: "http://www.fastcompany.com/", category: "Media", da: 92 },
  { name: "PCMag", website: "https://www.pcmag.com/", category: "Media", da: 92 },
  { name: "Slate", website: "https://slate.com/pitch", category: "Media", da: 92 },
  { name: "about me", website: "https://about.me/", category: "Your personal homepage", da: 92 },
  { name: "ProductHunt", website: "producthunt.com", category: "Community", da: 91 },
  { name: "Crunchbase", website: "crunchbase.com", category: "Directory", da: 91 },
  { name: "GetApp", website: "https://www.gartner.com/en/digital-markets/basic-listing", category: "Directory", da: 91 },
  { name: "Crunchbase", website: "https://www.crunchbase.com/", category: "Discord", da: 91 },
  { name: "MIT Technology Review", website: "https://www.technologyreview.com/", category: "Media", da: 91 },
  { name: "Android Authority", website: "androidauthority.com", category: "Media", da: 91 },
  { name: "Android Central", website: "https://www.androidcentral.com/", category: "Media", da: 91 },
  { name: "Healthline", website: "healthline.com", category: "Media", da: 91 },
  { name: "Inc. Magazine", website: "https://www.inc.com/", category: "Media", da: 91 },
  { name: "PC World", website: "https://www.pcworld.com/", category: "Media", da: 91 },
  { name: "Venture Beat", website: "https://venturebeat.com/", category: "Media", da: 91 },
  { name: "Stripe", website: "https://stripe.com/en-in/partner-proqram", category: "Partner Program", da: 91 },
  { name: "About .me", website: "http://about.me/signup/start", category: "directory", da: 90 },
  { name: "Business Insider India", website: "https://www.businessinsider.in/", category: "Media", da: 90 },
  { name: "Make Use of", website: "https://www.makeuseof.com/contributor/", category: "Media", da: 90 },
  { name: "MakeUseOf", website: "http://www.makeuseof.com/", category: "Media", da: 90 },
  { name: "ArtStation", website: "https://www.artstation.com/", category: "ArtStation is the leading showcase platform for games, film, media & entertainment artists.", da: 89 },
  { name: "Atlassian", website: "https://www.atlassian.com/blog/trello/trello-collection-atlassian-community", category: "Community", da: 89 },
  { name: "HackerNews", website: "https://news.ycombinator.com/showhn.html", category: "Forum", da: 89 },
  { name: "Hacker News", website: "https://news.ycombinator.com/", category: "Hacker News", da: 89 },
  { name: "Smashing Magazine", website: "https://www.smashingmagazine.com/", category: "Media", da: 89 },
  { name: "The Register UK", website: "http://www.theregister.co.uk/", category: "Media", da: 89 },
  { name: "Geekwire", website: "Geekwire.com", category: "Directory", da: 88 },
  { name: "Tech in Asia", website: "https://www.techinasia.com/companies/create", category: "Directory", da: 88 },
  { name: "FreeCodeCamp", website: "https://forum.freecodecamp.org/", category: "Forum", da: 88 },
  { name: "TechRepublic", website: "https://www.techrepublic.com/", category: "Forums", da: 88 },
  { name: "HackerNoon", website: "https://hackernoon.com/", category: "Media", da: 88 },
  { name: "AlternativeTo", website: "http://alternativeto.net/", category: "Directory", da: 87 },
  { name: "SitePoint Forums", website: "https://www.sitepoint.com/community/", category: "Community", da: 86 },
  { name: "YourStory", website: "https://yourstory.com/", category: "Media", da: 86 },
  { name: "InfoWorld", website: "https://www.infoworld.com/", category: "Media", da: 86 },
  { name: "InstaPaper", website: "https://www.instapaper.com", category: "Directories", da: 85 },
  { name: "GoodFirms", website: "https://www.goodfirms.co/", category: "directory", da: 85 },
  { name: "Addictive Tips", website: "https://www.addictivetips.com/tip-us/", category: "media", da: 85 },
  { name: "Android Headlines", website: "https://www.androidheadlines.com/", category: "Media", da: 85 },
  { name: "SiliconANGLE", website: "https://siliconangle.com/", category: "Media", da: 85 },
  { name: "Towards Data Science", website: "https://towardsdatascience.com/", category: "Publication", da: 85 },
  { name: "DEV Community", website: "http://dev.to/", category: "Community", da: 84 },
  { name: "Devpost", website: "https://devpost.com/software", category: "Community", da: 84 },
  { name: "Get App", website: "https://www.getapp.com/", category: "Directories", da: 84 },
  { name: "CodeProject", website: "https://www.codeproject.com/", category: "Platform", da: 84 },
  { name: "Mac Stories", website: "http://www.macstories.net/", category: "Media", da: 82 },
  { name: "Tech.co", website: "https://tech.co/", category: "Media", da: 82 },
  { name: "Media Index Kochava", website: "https://media-index.kochava.com/", category: "Directories", da: 80 },
  { name: "G2", website: "http://g2.com/products/new", category: "Directory", da: 80 },
  { name: "Read .cv", website: "http://read.cv", category: "directory", da: 80 },
  { name: "Biggerpockets.com", website: "Biggerpockets.com", category: "Community", da: 79 },
  { name: "solo to", website: "https://solo.to/", category: "A platform for creating a unified online presence.", da: 78 },
  { name: "ActiveSearch", website: "https://www.activesearchresults.com/", category: "Directories", da: 78 },
  { name: "WebWiki", website: "https://www.webwiki.com/info/add-website.html", category: "directory", da: 78 },
  { name: "Inc42", website: "https://inc42.com/startup-submission/", category: "Media", da: 78 },
  { name: "G2crowd.com", website: "g2.com", category: "Directories", da: 77 },
  { name: "e27", website: "https://e27.co/", category: "Media", da: 77 },
  { name: "Aapsense", website: "https://www.apsense.com/", category: "Directories", da: 76 },
  { name: "DealRoom", website: "https://app.dealroom.co/companies/fintern", category: "directory", da: 76 },
  { name: "Startup Digest: More Than Just a Newsletter | Techstars", website: "https://www.techstars.com/communities/startup-digest", category: "Events", da: 76 },
  { name: "Getting Smart", website: "https://www.gettingsmart.com/", category: "Media", da: 75 },
  { name: "Software World", website: "https://www.softwareworld.co/", category: "Directories", da: 74 },
  { name: "Sitejabber", website: "https://www.sitejabber.com/", category: "Directory", da: 74 },
  { name: "Alternative Me", website: "https://alternative.me/", category: "Directories", da: 73 },
  { name: "Alternative To", website: "https://alternativeto.net/", category: "Directories", da: 73 },
  { name: "Vccircle", website: "https://www.vccircle.com/company/directory", category: "Directory", da: 73 },
  { name: "Babel Slack", website: "https://slack.babeljs.io/", category: "Slack community", da: 73 },
  { name: "Alternative .me", website: "http://alternative.me/how-to/submit-software", category: "ai directory", da: 72 },
  { name: "F6S", website: "https://www.f6s.com/", category: "Community", da: 72 },
  { name: "All top startups", website: "http://alltopstartups.com/submit-startup/", category: "Directory", da: 72 },
  { name: "AllTopStartups", website: "https://alltopstartups.com/", category: "Media", da: 72 },
  { name: "FinancesOnline.com", website: "FinancesOnline.com", category: "Media", da: 72 },
  { name: "Vator", website: "https://vator.tv", category: "Media", da: 72 },
  { name: "Crowd Reviews", website: "http://crowdreviews.com/", category: "Directories", da: 71 },
  { name: "Software Review", website: "https://provider.softwarereviews.com/", category: "Directories", da: 71 },
  { name: "EU Tech", website: "https://tech.eu/", category: "Media", da: 71 },
  { name: "Libhunt", website: "https://www.libhunt.com/", category: "Directories", da: 70 },
  { name: "Built in Chicago", website: "https://www.builtinchicago.org/contact/send_us_tip", category: "Media", da: 70 },
  { name: "Cloud Native Computing Foundation", website: "https://slack.cncf.io/", category: "Slack community", da: 70 },
  { name: "Startups UK", website: "startups.co.uk", category: "Directories", da: 69 },
  { name: "All Top", website: "https://alltop.com/", category: "Directory", da: 69 },
  { name: "Tekpon", website: "http://tekpon.com/get-listed", category: "directory", da: 69 },
  { name: "Site Jabber", website: "sitejabber.com", category: "Directories", da: 68 },
  { name: "Cool mom picks", website: "coolmompicks.com", category: "Directories", da: 67 },
  { name: "Dang", website: "http://dang.ai/submit", category: "directory", da: 67 },
  { name: "EU-Startups Database", website: "https://www.eu-startups.com/directory/", category: "Directory", da: 67 },
  { name: "Growth hackers", website: "https://community.growthhackers.com/", category: "Forum", da: 67 },
  { name: "Growth Hackers", website: "growthhackers.com", category: "Community", da: 66 },
  { name: "StartupRanking", website: "https://www.startupranking.com/", category: "directory", da: 66 },
  { name: "List Your Software & Get Qualified Leads", website: "https://www.softwareadvice.com/vendors/", category: "MarketPlace", da: 66 },
  { name: "Alltopstartups.com", website: "alltopstartups.com", category: "Directories", da: 65 },
  { name: "Springwise", website: "springwise.com", category: "Directories", da: 65 },
  { name: "Startup Grind", website: "https://www.startupgrind.com/", category: "Slack Community", da: 65 },
  { name: "Bunity", website: "https://www.bunity.com/", category: "Community", da: 64 },
  { name: "Foundr", website: "Foundr.com", category: "Media", da: 64 },
  { name: "SaaStr", website: "https://www.saastr.com/", category: "B2B SaaS Training, Events & More to Scale Your Business", da: 63 },
  { name: "Tricky Enough", website: "https://www.trickyenough.com/", category: "Directories", da: 61 },
  { name: "AppSumo", website: "https://sell.appsumo.com/", category: "Launch Platform", da: 61 },
  { name: "Cloud Foundry", website: "https://slack.cloudfoundry.org/", category: "Slack community", da: 61 },
  { name: "TechnologyAdvice", website: "https://technologyadvice.com/", category: "B2B Media Services for Technology Companies", da: 60 },
  { name: "Killerstartups", website: "killerstartups.com", category: "Directories", da: 60 },
  { name: "Betalist", website: "http://betalist.com/", category: "Directory", da: 60 },
  { name: "All my faves", website: "https://allmyfaves.com/", category: "Tools", da: 60 },
  { name: "Famous AI Tools", website: "https://famousaitools.ai/", category: "AI Marketing Company", da: 59 },
  { name: "Startupxplore", website: "https://startupxplore.com/en/startups", category: "Directory", da: 59 },
  { name: "Slant", website: "http://slant.co", category: "Community", da: 58 },
  { name: "Uplabs", website: "https://www.uplabs.com/submit", category: "Directories", da: 58 },
  { name: "Makerlog", website: "https://getmakerlog.com/", category: "directory", da: 58 },
  { name: "Webrazzi", website: "http://webrazzi.com/en/startup-form/", category: "Media", da: 58 },
  { name: "People Ops & HR Community", website: "https://lattice.com/community/rfh", category: "Slack Community", da: 58 },
  { name: "SaaS Tools", website: "https://saasaitools.com/", category: "Community", da: 57 },
  { name: "EU startups", website: "eu-startups.com", category: "Directories", da: 57 },
  { name: "hotfrog", website: "https://www.hotfrog.com/", category: "Get found online", da: 57 },
  { name: "Slant.co", website: "https://www.slant.co/", category: "PRODUCT RANKINGS FOR ALL YOUR SHOPPING NEEDS", da: 57 },
  { name: "StackShare", website: "https://stackshare.io/", category: "Tech Stack Intelligence", da: 57 },
  { name: "Devhunt", website: "https://devhunt.org/", category: "ai directory", da: 56 },
  { name: "Mind the product", website: "http://slack.mindtheproduct.com/", category: "Community", da: 56 },
  { name: "Data Quest", website: "https://www.dataquest.io/chat", category: "Community", da: 56 },
  { name: "All Software Categories - GoodFirms", website: "https://www.goodfirms.co/directories/software", category: "Directory", da: 55 },
  { name: "Alternative.me", website: "http://alternative.me/", category: "Directory", da: 55 },
  { name: "WIP", website: "http://wip.co/projects/new", category: "directory", da: 55 },
  { name: "Tech directory", website: "http://techdirectory.io/get-listed", category: "Directory", da: 55 },
  { name: "NextBigWhat", website: "https://nextbigwhat.com/", category: "Media", da: 55 },
  { name: "WP Newsify", website: "https://wpnewsify.com/", category: "Media", da: 55 },
  { name: "TechDirectory", website: "https://www.techdirectory.io/", category: "Technology Business Directory", da: 55 },
  { name: "FiveTaco", website: "http://fivetaco.com/submit", category: "directory", da: 54 },
  { name: "Indiehackers", website: "https://www.indiehackers.com/", category: "Forum", da: 54 },
  { name: "Changelog", website: "https://changelog.com/news/submit", category: "Media", da: 54 },
  { name: "Venture Village", website: "http://venturevillage.eu/", category: "Media", da: 54 },
  { name: "Product School", website: "https://www.productschool.com/slack-community/", category: "Slack Community", da: 54 },
  { name: "AI TOOL GURU", website: "https://aitoolguru.com/", category: "AI tools directory", da: 53 },
  { name: "Tracxn", website: "https://tracxn.com/", category: "Startup platform", da: 53 },
  { name: "NoCodeDevs", website: "https://www.nocodedevs.com/", category: "Directories", da: 52 },
  { name: "NoCodeFounders", website: "https://nocodefounders.com/", category: "Directories", da: 52 },
  { name: "Software Suggest", website: "https://www.softwaresuggest.com/vendors", category: "Directory", da: 52 },
  { name: "CoFoundersLab", website: "https://cofounderslab.com/", category: "Community", da: 51 },
  { name: "DevDojo", website: "https://devdojo.com/", category: "Dev Community", da: 50 },
  { name: "Snap Munk", website: "https://startups.snapmunk.com/", category: "Directory", da: 50 },
  { name: "Techli", website: "https://techli.com/", category: "Media", da: 50 },
  { name: "Betabound", website: "https://betabound.com/", category: "Beta testing", da: 49 },
  { name: "Beta Bound", website: "betabound.com", category: "Directory", da: 49 },
  { name: "Serchen", website: "https://www.serchen.com/get-listed/", category: "Directory", da: 49 },
  { name: "Netted", website: "http://netted.net/contact-us/", category: "Media", da: 49 },
  { name: "Designer News", website: "designernews.co", category: "Community", da: 48 },
  { name: "devRant", website: "https://devrant.com/", category: "Community", da: 48 },
  { name: "Web Design Inspiration", website: "webdesign-inspiration.com", category: "Directories", da: 48 },
  { name: "PitchWall", website: "https://pitchwall.co/", category: "Directory", da: 48 },
  { name: "Startup Stash", website: "https://startupstash.com/add-listing/", category: "Directory", da: 48 },
  { name: "Starter Story", website: "https://www.starterstory.com/", category: "Interviews", da: 48 },
  { name: "Lobsters", website: "https://lobste.rs/", category: "Launch Platform", da: 48 },
  { name: "Elpha", website: "https://elpha.com", category: "Community", da: 47 },
  { name: "eCommerceFuel", website: "https://www.ecommercefuel.com/", category: "Community", da: 47 },
  { name: "LaunchingNext", website: "https://www.launchingnext.com/submit/", category: "directory", da: 47 },
  { name: "SideProjectors", website: "https://www.sideprojectors.com/", category: "Directory", da: 46 },
  { name: "Fastlane Forum", website: "https://www.thefastlaneforum.com/community/", category: "Community", da: 45 },
  { name: "Indie Hackers", website: "indiehackers.com", category: "Community", da: 45 },
  { name: "Ben's Bites News", website: "http://news.bensbites.co/submit", category: "directory", da: 45 },
  { name: "BigStartups", website: "https://bigstartups.co/", category: "directory", da: 45 },
  { name: "Insidr AI Tools", website: "http://insidr.ai/submit-tools", category: "directory", da: 45 },
  { name: "Venture Radar", website: "https://www.ventureradar.com/database/", category: "Directory", da: 45 },
  { name: "Workspaces", website: "http://workspaces.xyz/submit-a-workspace-workspaces", category: "directory", da: 45 },
  { name: "Thingtesting", website: "https://thingtesting.com/submit-brand", category: "Directory", da: 45 },
  { name: "Land Book", website: "https://land-book.com", category: "Design", da: 44 },
  { name: "Cabinet M", website: "cabinetm.com", category: "Directories", da: 44 },
  { name: "Mars AI Directory", website: "http://marsx.dev/ai-startups", category: "directory", da: 44 },
  { name: "Startup Buffer", website: "http://startupbuffer.com/", category: "Directory", da: 44 },
  { name: "There's An AI For That", website: "https://theresanaiforthat.com/", category: "Directory", da: 44 },
  { name: "Tiny Startups", website: "http://tally.so/r/wMzP8X", category: "directory", da: 44 },
  { name: "Startupbeat", website: "http://startupbeat.com/", category: "Media", da: 44 },
  { name: "StartUp Beat", website: "https://startupbeat.com/", category: "Media", da: 44 },
  { name: "Read.cv", website: "https://read.cv/", category: "Platform", da: 44 },
  { name: "Real World Beta Testing", website: "https://betatesting.com/beta-testing", category: "Beta testing", da: 43 },
  { name: "Remote Tools", website: "https://www.remote.tools/", category: "Community", da: 43 },
  { name: "Buffer apps", website: "https://www.bufferapps.com/", category: "Directory", da: 43 },
  { name: "Product HQ", website: "https://www.productmanagerhq.com/join-the-community/", category: "Community", da: 42 },
  { name: "Sidebar.io", website: "Sidebar.io", category: "Directories", da: 42 },
  { name: "webcatalog", website: "https://webcatalog.io/en/apps", category: "Find the right software and services.", da: 42 },
  { name: "Online Geniuses", website: "https://onlinegeniuses.com/marketplace", category: "Slack community", da: 42 },
  { name: "Online Geniuses", website: "https://onlinegeniuses.com/", category: "Slack Community", da: 42 },
  { name: "land-book", website: "land-book.com", category: "Directories", da: 41 },
  { name: "SaaS Genius", website: "https://www.saasgenius.com/", category: "Directory", da: 41 },
  { name: "SaasGenius", website: "https://www.saasgenius.com/get-listed/", category: "Directory", da: 41 },
  { name: "Superb Crew", website: "http://www.superbcrew.com/", category: "Media", da: 41 },
  { name: "Future Startup", website: "https://futurestartup.com/", category: "Publication", da: 41 },
  { name: "Futurepedia", website: "https://www.futurepedia.io/", category: "AI directory", da: 40 },
  { name: "Find Gift", website: "https://www.findgift.com/", category: "Directories", da: 40 },
  { name: "Phygital", website: "https://library.phygital.plus", category: "Directories", da: 40 },
  { name: "SaaS Hub", website: "Saashub.com", category: "Directory", da: 40 },
  { name: "SaaS Worthy", website: "https://www.saasworthy.com/", category: "Directory", da: 40 },
  { name: "Landing Folio", website: "https://www.landingfolio.com", category: "Directory", da: 40 },
  { name: "SaaSHub", website: "http://saashub.com/", category: "Directory", da: 40 },
  { name: "Tech Pluto", website: "https://techpluto.com/", category: "Media", da: 40 },
  { name: "TechPluto", website: "http://www.techpluto.com/submit-a-startup/", category: "Media", da: 40 },
  { name: "Hcilab", website: "http://Hcilab.org/ai-tools-directory", category: "The hcilab.org research website", da: 40 },
  { name: "Launching Next", website: "http://launchingnext.com/", category: "Directory", da: 39 },
  { name: "fyple", website: "https://www.fyple.com/", category: "Find businesses and services in United States", da: 39 },
  { name: "Supertools", website: "https://supertools.therundown.ai/", category: "AI directory", da: 38 },
  { name: "startup lister", website: "https://startuplister.com/", category: "Directories", da: 38 },
  { name: "Tech Tools Directory", website: "https://www.nocode.tech/tools", category: "Directory", da: 38 },
  { name: "buildspace", website: "https://sage.buildspace.so/", category: "Platform", da: 38 },
  { name: "TopAI.tools", website: "https://topai.tools/", category: "AI directory", da: 37 },
  { name: "Web Tools Weekly", website: "http://webtoolsweekly.com/submit", category: "Directory", da: 37 },
  { name: "Submit A Startup", website: "http://thetechpanda.com/submit-a-startup/", category: "Media", da: 37 },
  { name: "OpenAlternative", website: "http://openalternative.co/submit", category: "directory", da: 36 },
  { name: "Classical Finance", website: "https://www.classicalfinance.com/your-story/", category: "Media", da: 36 },
  { name: "Crazy About Startups", website: "https://www.crazyaboutstartups.com/", category: "Media", da: 36 },
  { name: "The Startup Pitch", website: "https://thestartuppitch.com/", category: "Website/Directory", da: 36 },
  { name: "dang ai", website: "https://dang.ai/", category: "AI Tools Directory", da: 35 },
  { name: "Admire The Web", website: "https://www.admiretheweb.com/", category: "Design", da: 35 },
  { name: "AIxploria", website: "https://www.aixploria.com/en/add-ai/", category: "Directories", da: 35 },
  { name: "Top Apps", website: "https://topapps.ai/submit", category: "Directories", da: 35 },
  { name: "Foundr.ai", website: "https://foundr.ai/", category: "Discover The Best AI Tools", da: 35 },
  { name: "Women in Technology", website: "http://witchat.github.io/", category: "Slack Community", da: 35 },
  { name: "Techboard", website: "https://techboard.com.au/", category: "startup data", da: 35 },
  { name: "Toolify", website: "https://www.toolify.ai/", category: "AI directory", da: 34 },
  { name: "Ctrl Alt", website: "https://ctrlalt.cc/", category: "Directories", da: 34 },
  { name: "Romanian Startups", website: "https://www.romanianstartups.com/", category: "Directory", da: 34 },
  { name: "Startup Tracker", website: "https://startuptracker.io/", category: "Directory", da: 34 },
  { name: "Future Tools", website: "https://www.futuretools.io/", category: "Future Tools - Find The Exact AI Tool For Your Needs", da: 34 },
  { name: "Startups List", website: "https://www.startups-list.com/", category: "List", da: 34 },
  { name: "Startup88", website: "https://startup88.com/", category: "Media", da: 34 },
  { name: "Top Similar Sites", website: "http://www.topsimilarsites.com/add.aspx", category: "Similar sites", da: 34 },
  { name: "Vic Trays", website: "https://victrays.com/", category: "Directories", da: 33 },
  { name: "Promotehour", website: "https://promotehour.com/", category: "Directory", da: 33 },
  { name: "RobinGood", website: "https://tools.robingood.com/", category: "Directory", da: 33 },
  { name: "Startuplister", website: "http://startuplister.com", category: "directory", da: 33 },
  { name: "Robin Good's Tools", website: "http://tools.robingood.com/", category: "Directory", da: 33 },
  { name: "New Startups", website: "http://new-startups.com/", category: "Media", da: 33 },
  { name: "No Code Founders", website: "https://nocodefounders.com/startups", category: "Slack Community", da: 33 },
  { name: "Peerlist", website: "https://peerlist.io/", category: "Directory", da: 32 },
  { name: "iOS Developers", website: "https://ios-developers.io/", category: "Slack community", da: 32 },
  { name: "Product-Led Alliance", website: "https://www.productledalliance.com/", category: "Slack Community", da: 32 },
  { name: "Hive Index", website: "https://thehiveindex.com/submit/", category: "Directory", da: 31 },
  { name: "GenZ VCs", website: "https://www.genzvcs.com/join-us", category: "Slack Community", da: 31 },
  { name: "Getworm.com", website: "getworm.com", category: "Directories", da: 30 },
  { name: "Robin Good's T5", website: "http://tools.robingood.com/", category: "Directories", da: 30 },
  { name: "AllThingsAI", website: "https://allthingsai.com/", category: "AI Tools Directory", da: 29 },
  { name: "Creative Tribes", website: "http://creativetribes.co/", category: "Community", da: 29 },
  { name: "founderio", website: "https://www.founderio.com/", category: "Community", da: 29 },
  { name: "Appsthunder", website: "https://appsthunder.com", category: "Directories", da: 29 },
  { name: "Digital Marketing Hints", website: "https://ads.digitalmarketinghints.com/", category: "Directories", da: 29 },
  { name: "Spectacle", website: "https://spectacle.is/submit", category: "Directories", da: 29 },
  { name: "Webapprater", website: "https://webapprater.com", category: "Directories", da: 29 },
  { name: "Startup inspiration", website: "https://www.startupinspire.com/", category: "Directory", da: 29 },
  { name: "Inspiration gallery for startups", website: "http://startupinspire.com/startups", category: "Directory", da: 29 },
  { name: "Startuptabs", website: "http://startuptabs.com/", category: "Directory", da: 29 },
  { name: "Techendo", website: "http://techendo.com/beta", category: "Directory", da: 29 },
  { name: "Worm", website: "https://getworm.com/submit-startup", category: "Directory", da: 29 },
  { name: "Startups.watch", website: "https://startups.watch/", category: "MarketPlace", da: 29 },
  { name: "Allthingsai.com", website: "http://Allthingsai.com", category: "Supercharge Your Career With AI", da: 29 },
  { name: "Front-End Developers", website: "http://frontenddevelopers.org/", category: "Community", da: 28 },
  { name: "9Sites.net", website: "https://www.9sites.net/addurl.php", category: "Directory", da: 28 },
  { name: "Startup Collections", website: "http://startupcollections.com/", category: "Launch site", da: 28 },
  { name: "aitools.fyi", website: "https://aitools.fyi/", category: "AI directory", da: 27 },
  { name: "Easy With AI", website: "https://easywithai.com/", category: "AI directory", da: 27 },
  { name: "AI Library", website: "https://library.phygital.plus/", category: "AI Library", da: 27 },
  { name: "Phygital.plus", website: "http://library.phygital.plus", category: "AI Library", da: 27 },
  { name: "IndieHackerStacks", website: "http://indiehackerstacks.com", category: "directory", da: 27 },
  { name: "Startup Inspire", website: "http://startupinspire.com/dashboard/startup/create", category: "directory", da: 27 },
  { name: "Easywithai.com", website: "http://Easywithai.com", category: "Easy With AI - Best AI Tools & Services", da: 27 },
  { name: "TechLondon", website: "https://techlondon.io/", category: "Slack Community", da: 27 },
  { name: "AI Toolkit", website: "https://www.aitoolkit.org/", category: "Directories", da: 26 },
  { name: "Landscape", website: "https://www.landscape.vc/community", category: "Slack Community", da: 26 },
  { name: "AI Scout", website: "https://aiscout.net/", category: "AI directory", da: 25 },
  { name: "OpenTools", website: "https://opentools.ai/", category: "AI Tools Directory", da: 25 },
  { name: "Android United", website: "http://android-united.community/", category: "Community", da: 25 },
  { name: "Unita", website: "https://www.unita.co/", category: "Community reviews", da: 25 },
  { name: "AI Mojo", website: "https://aimojo.pro/", category: "Directories", da: 25 },
  { name: "Owwly", website: "https://owwly.com/", category: "Directory", da: 25 },
  { name: "Startup Spotlight", website: "http://tally.so/r/nrLJRp", category: "directory", da: 25 },
  { name: "The Startup Project", website: "https://www.startupproject.org/", category: "Interviews", da: 25 },
  { name: "Ai Tool Hunt", website: "https://www.aitoolhunt.com/", category: "AI directory", da: 24 },
  { name: "Fazier.com", website: "https://fazier.com/", category: "Directories", da: 24 },
  { name: "Startupbase", website: "https://startupbase.io/", category: "Directory", da: 24 },
  { name: "The Startup INC", website: "https://www.thestartupinc.com/", category: "media", da: 24 },
  { name: "Remotely One", website: "https://www.remotelyone.com/", category: "Slack Community", da: 24 },
  { name: "AITopTools", website: "https://aitoptools.com/", category: "AI Tools Directory", da: 23 },
  { name: "AItoptools.com", website: "http://AItoptools.com", category: "AI Tools Directory", da: 23 },
  { name: "NoCodeList", website: "https://nocodelist.co/", category: "Find NoCode Software", da: 23 },
  { name: "AI Center", website: "https://aicenter.ai/?", category: "Find the Best AI Tool for Your Work", da: 23 },
  { name: "SaaS AI Tools", website: "https://saasaitools.com/", category: "AI directory", da: 22 },
  { name: "ToolPilot AI", website: "https://www.toolpilot.ai/", category: "AI directory", da: 22 },
  { name: "#TechMasters", website: "https://techmasters.chat/", category: "Community", da: 22 },
  { name: "Launched!", website: "https://launched.io/", category: "Community", da: 22 },
  { name: "Fuse.kiwi", website: "https://www.fuse.kiwi/", category: "Design", da: 22 },
  { name: "Nocode Devs", website: "https://www.nocodedevs.com/browse-the-directory", category: "Directory", da: 22 },
  { name: "Startups .fyi", website: "http://tally.so/r/3lOGLk", category: "directory", da: 22 },
  { name: "Favird.com", website: "http://favird.com", category: "Fabulously Awesome and Valuable Internet Resource Directory", da: 22 },
  { name: "Kernal", website: "https://kern.al/", category: "Idea platform", da: 22 },
  { name: "FindMyAITool", website: "https://findmyaitool.com/", category: "List of AI Tools", da: 22 },
  { name: "Alternatives.Co", website: "https://alternatives.co/software/ai-tools/", category: "World's Largest AI Tools Directory", da: 22 },
  { name: "AI Finder", website: "https://ai-finder.net/", category: "AI directory", da: 21 },
  { name: "GPTE", website: "https://gpte.ai/", category: "AI directory", da: 21 },
  { name: "SEOUL Startups", website: "https://www.seoulstartups.com/", category: "Slack Community", da: 21 },
  { name: "Ben Bites News", website: "https://news.bensbites.com/", category: "AI directory", da: 20 },
  { name: "TEXTIFY", website: "https://textify.ai/directory/", category: "AI directory", da: 20 },
  { name: "Tool Scout", website: "https://toolscout.ai/", category: "AI directory", da: 20 },
  { name: "iLib.com", website: "https://www.ilib.com/", category: "AI Tools Directory", da: 20 },
  { name: "Firebase", website: "https://firebase-community.appspot.com/", category: "Community", da: 20 },
  { name: "Promote Project", website: "promoteproject.com", category: "Directories", da: 20 },
  { name: "Uneed", website: "https://www.uneed.best/submit-a-tool", category: "Directory", da: 20 },
  { name: "Appiod.com", website: "http://appiod.com/submit-app-for-review/", category: "Directory", da: 20 },
  { name: "AwesomeIndie", website: "https://awesomeindie.com/", category: "Launch Platform", da: 20 },
  { name: "Uneed.best", website: "https://www.uneed.best/", category: "A launch platform for your products", da: 19 },
  { name: "beta candy", website: "betacandy.com", category: "Directories", da: 19 }
]

function SignInOverlay() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In Required</h2>
        <p className="text-gray-600 text-center mb-8">
          To access the Backlink Directory, please sign in or create an account. It's quick and easy!
        </p>
        <div className="space-y-4">
          <Link
            href="/auth-form"
            className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            Sign In
            <ExternalLink className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/auth-form"
            className="w-full bg-white text-orange-500 px-6 py-3 rounded-lg font-medium border-2 border-orange-500 hover:bg-orange-50 transition-colors flex items-center justify-center"
          >
            Create an Account
            <ExternalLink className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BacklinkDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof Backlink>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showNameSortDropdown, setShowNameSortDropdown] = useState(false)
  const itemsPerPage = 30

  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [supabase.auth])

  const filteredBacklinks = backlinks.filter(backlink =>
    backlink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backlink.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backlink.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedBacklinks = [...filteredBacklinks].sort((a, b) => {
    if (sortColumn === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    } else if (sortColumn === 'da') {
      return sortDirection === 'asc'
        ? a.da - b.da
        : b.da - a.da
    }
    return 0
  })

  const totalPages = Math.ceil(sortedBacklinks.length / itemsPerPage)
  const paginatedBacklinks = sortedBacklinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (column: keyof Backlink) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
    setShowNameSortDropdown(false)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleAutoSubmit = (website: string) => {
    router.push(`/auto-submit?website=${encodeURIComponent(website)}`)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#FBFCFE] shadow-sm">
          <div className="max-w-7xl mx-auto py-3 md:py-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-20">
                <a href="/backlinks" className="hover:text-gray-700">Backlinks</a>
                <span>/</span>
                <span className="text-gray-900">Backlink Directory</span>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            </nav>
            <h1 className="mt-1 md:mt-2 text-2xl font-semibold text-gray-900">Backlink Directory</h1>
            <p className="mt-0.5 text-sm text-gray-500">A list of directories to submit your startup or tool to.</p>
            <div className="relative max-w-lg mt-2 md:mt-3">
              <input
                type="text"
                placeholder="Search Links"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div></div>
              <button
                onClick={() => router.push('/auto-submit')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Auto Submit
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FBFCFE] relative">
          {!user && <SignInOverlay />}
          <div className={`max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ${!user ? 'filter blur-sm' : ''}`}>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <span>Name</span>
                          <button
                            className="ml-2 focus:outline-none"
                            onClick={() => setShowNameSortDropdown(!showNameSortDropdown)}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          {showNameSortDropdown && (
                            <div className="absolute mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  onClick={() => handleSort('name')}
                                >
                                  Sort Ascending
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  onClick={() => {
                                    setSortDirection('desc')
                                    handleSort('name')
                                  }}
                                >
                                  Sort Descending
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Website
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('da')}
                      >
                        DA {sortColumn === 'da' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBacklinks.map((backlink, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {backlink.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={backlink.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {backlink.website}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {backlink.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                            {backlink.da}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedBacklinks.length)} of {sortedBacklinks.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button 
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

