"""Source of truth for the ChatGPT Ads launch campaign.

Run `python ads/campaign.py` to validate lengths and regenerate
ads/CAMPAIGN-ADS.md (copy tables) and ads/ads.csv (for upload or review).
"""
import csv
from pathlib import Path

TITLE_MAX, DESC_MAX = 50, 100       # hard limits
TITLE_SOFT = 30                     # roughly where phones start truncating
DOMAIN = "https://c88gaming.com"
CAMPAIGN = "sg_launch_oct26"

AD_GROUPS = [
    {
        "id": "reaction", "name": "Reaction time test", "image": "reaction.png",
        "path": "/?drill=reaction",
        "hints": ["reaction time test", "how fast are my reflexes", "improve reaction time for gaming",
                  "reflex test for esports", "quick game to test my speed"],
        "ads": [
            ("Free reaction time test", "Tap when the MRT doors signal flashes. Five tries, averaged in milliseconds."),
            ("How fast are your reflexes?", "A one-minute reflex drill for gamers. Get your average in ms, then beat it."),
            ("Reaction test, SG style", "Squeeze in before the MRT doors close. Free in your browser, no sign-up."),
            ("Check your reaction speed", "Esports-style reflex drill: five taps, one average score. Under a minute."),
        ],
    },
    {
        "id": "aim", "name": "Aim trainer", "image": "aim.png",
        "path": "/?drill=aim",
        "hints": ["free aim trainer", "warm up aim before ranked", "fps aim practice in browser",
                  "improve mouse accuracy", "aim test online"],
        "ads": [
            ("Free aim trainer, no download", "Hit 20 targets as fast as you can. See your time per target and accuracy."),
            ("Warm up your aim in a minute", "A quick target drill before ranked. Runs in your browser, no account."),
            ("Chope 20 seats. Fast.", "An aim drill set in a hawker centre lunch rush. Tracks speed and misses."),
        ],
    },
    {
        "id": "typing", "name": "Typing speed test", "image": "typing.png",
        "path": "/?drill=typing",
        "hints": ["typing speed test", "wpm test", "how fast do I type", "improve typing speed",
                  "fun typing game"],
        "ads": [
            ("Typing test with kopi orders", 'Type 12 orders like "kopi o kosong" as fast as you can. Scored in WPM.'),
            ("Free typing speed test", "See your words per minute in under a minute. A typing drill with an SG twist."),
            ("Can you out-type the queue?", "Kopi Order: type teh c siew dai, milo dinosaur and more against the clock."),
        ],
    },
    {
        "id": "memory", "name": "Memory game", "image": "memory.png",
        "path": "/?drill=memory",
        "hints": ["memory game", "sequence memory test", "quick brain game", "short game to play on a break",
                  "test my memory"],
        "ads": [
            ("Quick memory game", "Repeat the order the hawker stalls light up. One more step every round."),
            ("How long a sequence can you hold?", "Watch the pattern, repeat it, add one more step. See how far you get."),
            ("A brain game for your break", "Hawker Recall takes two minutes and runs in your browser. No sign-up."),
        ],
    },
    {
        "id": "squad", "name": "Game night and squad", "image": "combine.png",
        "path": "/#lobby",
        "hints": ["game night ideas", "questions to ask friends while gaming", "icebreakers for gamers",
                  "things to do with friends online", "discord voice chat games"],
        "ads": [
            ("Questions for game night", "24 lobby questions for your squad while everyone loads in. Free to use."),
            ("Icebreakers for gamers", "Draw a question for the voice channel. Prata, McSpicy or mala after?"),
            ("Get the squad together", "Name your session, copy a link for the group chat, then compare ranks."),
        ],
    },
    {
        "id": "combine", "name": "The Combine (broad)", "image": "combine.png",
        "path": "/",
        "hints": ["free browser games no download", "esports skills test", "games to play when bored",
                  "fun things to do online singapore", "test my gaming skills"],
        "ads": [
            ("Free esports skill test", "Five quick drills: reaction, aim, click speed, memory and typing. Get ranked."),
            ("Bored? Try The Combine", "Five short skill drills with a Singapore twist. Free, no download needed."),
            ("What's your gamer rank?", "From Blur Like Sotong to Steady Pom Pi Pi. Clear five drills to find out."),
        ],
    },
]

# Words that would break OpenAI's ad policy or our own honesty rules if they slip into copy.
BANNED = ["win", "prize", "cash", "bet", "jackpot", "casino", "reward", "chatgpt", "openai",
          "best", "#1", "guarantee", "free credit", "bonus"]


def url(group, n):
    base, _, frag = group["path"].partition("#")
    sep = "&" if "?" in base else "?"
    utm = f"utm_source=chatgpt&utm_medium=cpc&utm_campaign={CAMPAIGN}&utm_content={group['id']}_{n}"
    return f"{DOMAIN}{base}{sep}{utm}" + (f"#{frag}" if frag else "")


def check():
    problems = []
    for g in AD_GROUPS:
        for i, (t, d) in enumerate(g["ads"], 1):
            tag = f"{g['id']} #{i}"
            if len(t) > TITLE_MAX: problems.append(f"{tag}: title {len(t)} > {TITLE_MAX}")
            if len(d) > DESC_MAX: problems.append(f"{tag}: description {len(d)} > {DESC_MAX}")
            words = (t + " " + d).lower().replace(",", " ").replace(".", " ").split()
            for b in BANNED:
                if (" " in b and b in (t + " " + d).lower()) or b in words:
                    problems.append(f"{tag}: contains '{b}'")
    return problems


def write():
    here = Path(__file__).parent
    rows, md = [], ["# Ad copy (generated by ads/campaign.py — edit that file, not this one)", ""]
    for g in AD_GROUPS:
        md += [f"## Ad group: {g['name']}", "",
               f"- **Image:** `ads/images/{g['image']}`",
               f"- **Context hints:** {'; '.join(g['hints'])}", "",
               "| # | Title | Chars | Description | Chars | Destination URL |",
               "|---|---|---|---|---|---|"]
        for i, (t, d) in enumerate(g["ads"], 1):
            u = url(g, i)
            flag = " ⚠" if len(t) > TITLE_SOFT else ""
            md.append(f"| {i} | {t} | {len(t)}{flag} | {d} | {len(d)} | `{u}` |")
            rows.append({"ad_group": g["name"], "ad": i, "title": t, "title_chars": len(t),
                         "description": d, "description_chars": len(d), "image": g["image"],
                         "destination_url": u, "context_hints": "; ".join(g["hints"])})
        md.append("")
    md.append(f"⚠ = over {TITLE_SOFT} characters, so it may be cut off on phones. Still within the {TITLE_MAX}-character limit.")
    (here / "CAMPAIGN-ADS.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    with open(here / "ads.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader(); w.writerows(rows)
    return len(rows)


if __name__ == "__main__":
    issues = check()
    if issues:
        raise SystemExit("Fix these first:\n" + "\n".join(issues))
    print(f"OK: {write()} ads written to ads/CAMPAIGN-ADS.md and ads/ads.csv")
