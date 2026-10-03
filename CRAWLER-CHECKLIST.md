# OpenAI crawler checklist for this landing page

The page is built to pass OAI-AdsBot review:

- **Static HTML.** All headlines, prices, event details and FAQ answers are in the HTML. No JavaScript needed to read the content, no login, no app-store-only links, no redirects.
- **No external images.** All artwork is CSS gradients, so there's no image host that could return a 403.
- **`robots.txt`** explicitly allows `OAI-AdsBot` and `OAI-SearchBot`.
- Policy pages are linked in the footer (terms, privacy, refunds, contact). Make sure they really exist before you submit.

## Before you submit the ad

1. Replace `https://www.example.com` (in `index.html`, `robots.txt`, `sitemap.xml`) and `hello@example.com` with your real domain and email.
2. Deploy `index.html`, `robots.txt` and `sitemap.xml` to the site root.
3. Test the page as the crawler would see it. You should get `200 OK`, not 403 or 429:

   ```bash
   curl -I -A "Mozilla/5.0 (compatible; OAI-AdsBot/1.0; +https://openai.com/adsbot)" https://www.example.com/
   ```

   ```bash
   curl -A "OAI-AdsBot" https://www.example.com/robots.txt
   ```

## If you're behind Cloudflare / a WAF

- OAI-AdsBot is a Cloudflare **verified bot**. Check Security → Bots: "Allow verified bots" should be on. Bot Fight Mode can still challenge some bots, so turn it off or exempt this page if the test fails.
- Add a WAF custom rule with **Skip** for managed rules, rate limiting and Super Bot Fight Mode:
  `(cf.client.bot) or (http.user_agent contains "OAI-AdsBot") or (http.user_agent contains "OAI-SearchBot")`
  Matching on user agent alone can be spoofed. Pair it with `cf.client.bot` or with OpenAI's published IP ranges:
  https://openai.com/adsbot.json and https://openai.com/searchbot.json
- Don't put a CAPTCHA, JS challenge, cookie wall, age gate or geo-block on this URL.
- Upload ads in small batches so you don't trip rate limits (429).
