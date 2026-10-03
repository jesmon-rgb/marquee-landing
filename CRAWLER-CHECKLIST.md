# ChatGPT Ads preparation — Playroom

Updated 3 October 2026. These changes prepare the landing page for review; they do not guarantee ad approval.

## What this site offers

- The Combine: five free, single-player skill drills with a Singapore theme. Doors Closing (reaction), Chope! (aim), Queue Rush (click speed), Hawker Recall (memory), Kopi Order (typing). Finishing all five gives a fun rank.
- Lobby talk conversation questions, a one-minute breathing timer (no medical claims), and squad invite links.
- Pages: home, about.html (how scoring works), privacy.html, terms.html, 404.html.
- No accounts, leaderboards, chat, online multiplayer, payments, wagering, prizes or cash value.

Drill descriptions, scoring rules and policies are static HTML and readable without JavaScript. Playing the drills requires JavaScript. Nothing is stored: scores live only in the open tab and the squad name goes only into the link. The only external requests are Google Fonts.

## Before submitting

1. Deploy the site to a public HTTPS domain. The local file URL cannot serve as an ad destination.
2. The canonical URL, Open Graph URL, sitemap, and robots sitemap reference are configured for https://c88gaming.com/. Confirm the domain points to the deployed site.
3. Verify the deployed landing page returns HTTP 200 to OAI-AdsBot. Check robots.txt, hosting firewall/CDN rules, CAPTCHA, redirects, and rate limits. Also allow OAI-SearchBot.
4. The page uses no external photos. Make sure `assets/playroom-logo.png` is deployed and reachable by OAI-SearchBot.
5. Provide accurate advertiser/business identity and a real support contact before launch. No business name, address, or email has been invented here.
6. Match each ad to the feature actually offered. Do not describe invite ideas as live rooms, promise online multiplayer, or imply ChatGPT/OpenAI endorsement.
7. Review the deployed page, privacy disclosure, and assets against current policies and the actual hosting configuration.

## Suggested ad copy

Title: How fast are your reflexes?
Description: Five free esports-style drills with a Singapore twist. Beat the MRT doors, chope seats, type kopi orders. Get your rank.
Destination: https://c88gaming.com/

Title: Free reaction time test
Description: Wait for the doors to close, then tap. Five tries, averaged in milliseconds. No download, no sign-up.
Destination: https://c88gaming.com/#arena

Title: Lobby questions for your squad
Description: Draw a question for the voice channel while everyone loads in. Free in your browser.
Destination: https://c88gaming.com/#lobby

Anchor links select a section; they do not start a drill automatically.

## Official sources

- https://help.openai.com/en/articles/20001212-create-ads-for-chatgpt-ads
- https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
- https://openai.com/policies/ad-policies/
