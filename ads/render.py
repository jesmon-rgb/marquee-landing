"""Render each 1200x1200 ad creative in creatives.html to ads/images/<id>.png."""
from pathlib import Path
from playwright.sync_api import sync_playwright

here = Path(__file__).parent
with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome")
    page = browser.new_page(viewport={"width": 1300, "height": 1300})
    page.goto((here / "creatives.html").as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    for ad in page.query_selector_all(".ad"):
        name = ad.get_attribute("id")
        ad.screenshot(path=str(here / "images" / f"{name}.png"))
        print("rendered", name)
    browser.close()
