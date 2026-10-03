# Playroom: ChatGPT Ads launch campaign (Singapore)

Drafted 3 October 2026. Everything here is a draft to review before anything is uploaded or any money is spent.

**Files in this folder**

| File | What it is |
|---|---|
| `CAMPAIGN.md` | This plan: setup, structure, budget, targeting, measurement, review checklist |
| `CAMPAIGN-ADS.md` | Every ad: title, description, character counts, image and tracked URL (generated) |
| `ads.csv` | The same ads as a spreadsheet, for review or upload |
| `images/*.png` | Five 1200×1200 square ad images |
| `campaign.py` | Source of the copy. Edit here, then run `python ads/campaign.py` to re-check lengths and regenerate |
| `creatives.html`, `render.py` | Source of the images. Edit the HTML, then run `python ads/render.py` |

---

## 1. Read first: what must be true before launch

These are blockers. The ad review checks the advertiser, the creative and the landing page, and any one of them can sink the campaign.

1. **Advertiser identity must be real and match the site.** OpenAI verifies who the advertiser is. Accounts are ineligible if their *primary business* is in a disallowed category, and gambling is disallowed, including "gaming platforms that offer cash prizes". If the business behind this account, or behind **c88gaming.com**, runs or promotes gambling, the account is likely to be rejected however clean Playroom is. Running a harmless page to get gambling-linked ads approved breaks the policies on destination integrity and circumvention, and can get the account suspended. The safe route is to advertise Playroom from a business that only does this, on a neutral domain.
2. **Connect the real domain.** The site is live at `playroom-mu.vercel.app`. The ads, sitemap and canonical tags all point to `c88gaming.com`, which is not connected yet. Change `DOMAIN` in `campaign.py` if you use a different domain.
3. **Add contact details.** Reviewers look for a real support contact. Add a contact email (and business name) to the site. Nothing has been invented.
4. **Add analytics, or the UTM links are pointless.** The site has no analytics today. The easiest option is Vercel Web Analytics, which is cookie-free. Turn it on, add its one script tag and update `privacy.html` to mention it. Without it you only see ChatGPT Ads' own click numbers.
5. **Crawler access.** Already done: `robots.txt` allows OAI-AdsBot and OAI-SearchBot, and every page returns 200. Re-test on the real domain once it's connected (see `CRAWLER-CHECKLIST.md`).

---

## 2. Facts about ChatGPT Ads this plan relies on

| Item | What we know | Source |
|---|---|---|
| Singapore | Self-serve ads opened in Singapore (with Indonesia, Malaysia, Philippines, Thailand, Vietnam, Taiwan) on 23 Sep 2026 | OpenAI announcement, trade press |
| Ad format | Sponsored card under a ChatGPT answer: advertiser name, logo (site favicon), title, description, square image, link | Spec guides |
| Title | Max 50 characters. Phones cut off around 30, so most titles here are 30 or fewer | Spec guides |
| Description | Max 100 characters | Spec guides |
| Image | Square 1:1, PNG or JPG. Our files are 1200×1200 PNG, which fits every published spec | Spec guides |
| Targeting | Matched to conversation context and intent, plus the advertiser's context hints per ad group and the landing page content. No keyword bidding. Location targeting is available | OpenAI help centre, spec guides |
| Who sees ads | Logged-in Free and Go users aged 18+. Not Plus, Pro or Business, and not anyone OpenAI predicts is under 18 | Spec guides |
| Bidding | CPC (pay per click) or CPM (pay per 1,000 views). Commonly suggested starting CPC is US$3–5 | Third-party guides, **verify in Ads Manager** |
| Minimum budget | Reported as US$25/day | Third-party guide, **verify in Ads Manager** |
| Best practice | Many distinct ads per offer, benefit-focused and specific copy, link to the most relevant page, UTMs on each ad | OpenAI help centre |

Third-party numbers change quickly. Confirm budgets, bids and currency in Ads Manager before you commit.

---

## 3. Campaign setup

| Setting | Value |
|---|---|
| Campaign name | `Playroom | SG | Launch Oct 2026` |
| Objective / bidding | Clicks, CPC bidding. We want people to play, not just see the ad |
| Location | Singapore |
| Language | English |
| Daily budget | US$25 (the reported minimum) to start |
| Test length | 14 days, then review |
| Test spend | About US$350 maximum |
| Max CPC | Start at the low end of what Ads Manager suggests. A free game earns no revenue per click, so don't chase US$5 clicks |
| Schedule | Always on. The system decides placement by conversation, not time of day |
| Advertiser name | Must be your real, verified business or brand name |
| Logo | Taken from the site favicon (`assets/playroom-logo.png`) |

---

## 4. Structure: 6 ad groups, 19 ads

Each ad group targets one kind of conversation, has its own context hints, sends people to the matching drill, and uses one image. Full copy is in `CAMPAIGN-ADS.md`.

| # | Ad group | The person in ChatGPT is asking about… | Lands on | Image | Ads |
|---|---|---|---|---|---|
| 1 | Reaction time test | reaction tests, reflexes, getting faster at games | `/?drill=reaction` (opens Doors Closing) | `reaction.png` | 4 |
| 2 | Aim trainer | aim practice, warming up before ranked, mouse accuracy | `/?drill=aim` (opens Chope!) | `aim.png` | 3 |
| 3 | Typing speed test | WPM tests, typing faster | `/?drill=typing` (opens Kopi Order) | `typing.png` | 3 |
| 4 | Memory game | memory or brain games, something short for a break | `/?drill=memory` (opens Hawker Recall) | `memory.png` | 3 |
| 5 | Game night and squad | game night ideas, questions for friends, Discord activities | `/#lobby` | `combine.png` | 3 |
| 6 | The Combine (broad) | free browser games, testing gaming skills, things to do when bored | `/` | `combine.png` | 3 |

Every URL carries `utm_source=chatgpt&utm_medium=cpc&utm_campaign=sg_launch_oct26&utm_content=<group>_<n>`, so you can see which single ad brought each visitor once analytics is on.

**Sample ads (one per group):**

| Ad group | Title | Description |
|---|---|---|
| Reaction | Free reaction time test | Tap when the MRT doors signal flashes. Five tries, averaged in milliseconds. |
| Aim | Free aim trainer, no download | Hit 20 targets as fast as you can. See your time per target and accuracy. |
| Typing | Typing test with kopi orders | Type 12 orders like "kopi o kosong" as fast as you can. Scored in WPM. |
| Memory | Quick memory game | Repeat the order the hawker stalls light up. One more step every round. |
| Squad | Questions for game night | 24 lobby questions for your squad while everyone loads in. Free to use. |
| Broad | What's your gamer rank? | From Blur Like Sotong to Steady Pom Pi Pi. Clear five drills to find out. |

**Deliberately left out:** the breathing timer. Anything that sounds like a mental-health benefit runs into OpenAI's health and wellness rules, and ads are not shown in mental-health conversations anyway.

---

## 5. Copy rules (built into `campaign.py`)

- **Say exactly what you get:** a free drill, in the browser, no download, no sign-up. Every claim is true on the page it links to.
- **Banned words, checked automatically:** win, prize, cash, bet, jackpot, casino, reward, bonus, free credit, best, #1, guarantee, ChatGPT, OpenAI. Gambling-style language is the fastest way to get rejected, and naming ChatGPT can count as imitating the interface.
- **No other game brands** in copy or context hints (for example a specific FPS title). That avoids trademark problems.
- **Singlish in small doses.** It works in titles like "Reaction test, SG style", while the descriptions stay plain so the review system and non-Singaporean reviewers understand them.
- **No made-up numbers.** The 214 ms, 486 ms and 71 wpm shown in the images are clearly example scores, not claims about players.

---

## 6. Images

| File | Shows | Used by |
|---|---|---|
| `images/reaction.png` | The lime "GO GO GO!" panel with an example 214 ms | Reaction |
| `images/aim.png` | A target on a grid with a crosshair | Aim |
| `images/typing.png` | "KOPI O KOS" being typed | Typing |
| `images/memory.png` | 3×3 stall grid with a lit 1-2-3 path | Memory |
| `images/combine.png` | Scorecard ending in rank "SHIOK" | Squad, Broad |

All are 1200×1200 PNGs, 16–41 KB. Each has one clear object with almost no baked-in text, as OpenAI recommends. They match the site's look, so the jump from ad to page feels like the same product.

---

## 7. Measurement and what "good" looks like

Set these as targets for the 14-day test. They are starting guesses, not benchmarks. Nobody has public ChatGPT Ads benchmarks for this category yet.

| Metric | Where to read it | First-test target |
|---|---|---|
| Click-through rate | Ads Manager | Compare ad groups with each other. Pause the bottom third of ads by day 7 |
| Cost per click | Ads Manager | Below the max CPC you set |
| Drill started (visitor clicks Start/Tap) | Analytics event, needs adding | 50%+ of ad visitors |
| All five drills cleared | Analytics event, needs adding | 10%+ of ad visitors |
| Squad links made | Analytics event, needs adding | Any. This is the free word-of-mouth loop |

Analytics events would need a few lines added to `combine.js` once analytics is chosen. I can add them.

---

## 8. 14-day test plan

| When | What to do |
|---|---|
| Day 0 | Fix the blockers in section 1. Upload all 6 ad groups and 19 ads. Check every ad shows "approved" |
| Days 1–3 | Don't touch anything. Let the system learn which conversations fit |
| Day 4 | Check that every ad group is getting impressions. If one has none, add 2–3 more context hints and one new ad with a different angle |
| Day 7 | Pause the weakest third of ads by CTR. Write replacements with new angles for the best ad groups |
| Day 14 | Keep the ad groups with the lowest cost per drill started. Move budget there and decide whether to scale |

**If ads are rejected:** read the reason, fix the copy or page, and resubmit. If the reason is crawler access, re-test with the `curl` command in `CRAWLER-CHECKLIST.md`. Upload in small batches. Don't ask support for a manual bypass; OpenAI says it won't give one.

---

## 9. Pre-upload checklist

- [ ] Advertiser account verified with the real business name, and that business has no gambling connection
- [ ] Domain connected in Vercel; `https://<domain>/` returns 200 to OAI-AdsBot
- [ ] `DOMAIN` in `campaign.py` matches, and `python ads/campaign.py` re-run
- [ ] Contact email and business name on the site
- [ ] Analytics on, and `privacy.html` updated to mention it
- [ ] Every destination URL opens the right drill (try each one in a browser)
- [ ] Budget, max CPC and currency confirmed in Ads Manager
- [ ] Someone other than the writer has read all 19 ads once

---

### Sources

- OpenAI Help Center, "Create ads for ChatGPT Ads": https://help.openai.com/en/articles/20001212-create-ads-for-chatgpt-ads
- OpenAI Help Center, "Advertiser guidance for allowing OpenAI web crawlers": https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
- OpenAI Ad policies (v1.6, Sep 2026): https://openai.com/policies/ad-policies/
- OpenAI, "ChatGPT Ads expands to Southeast Asia and Taiwan": https://openai.com/index/chatgpt-ads-expands-southeast-asia-taiwan/
- Spec guides: https://www.indexlab.ai/guides/chatgpt-ads/creative-specs, https://www.accuracast.com/faq/openai-ads-specs/, https://makelocalads.com/blog/chatgpt-ads-examples-and-specs
