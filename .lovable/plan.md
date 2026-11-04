# Qambakht. — Repair + Premium Redesign Pass

One run: fix the broken build, remove everything you flagged, then lift the whole site to a polished, designer-grade look. Your books, bio, feedback delivery, purchase links, routes, cup logo, peach mandala background and the "फिर मिलते हैं!" exit all stay.

## 1. Fix the broken build first (P0)

The last redesign left compile errors, so the preview is stuck:
- The `Art` component was rewritten without the `look` prop that every page still passes (multiply/print styling). Restore a clean `look` prop on `Art` and wire it properly.
- Type errors in the art pipeline (null handling, canvas `toBlob` callback, timer types) and in the swipe-navigation hook.
- Confirm zero type errors and a green build before moving on.

## 2. Remove everything you called out (P0)

- The "दीवार" gallery-wall section, museum plates and captions — gone.
- The train-like scrolling word ribbon (ठहर · सुनाओ · …) — gone.
- The swan drifting beside the hero, the doves flying across every page, the roaming cloud — gone. Doves survive only as a quiet success accent on the feedback "sent" state.
- The "Qambakht. Lending Card" block in Library — gone.
- Double-fonted bilingual titles (Hindi overprinted on English) — every book gets ONE script: "Aam Zindagi!" in the Chonburi display face, "आम ज़िंदगी!" in Rozha One.
- Feedback form: the postage stamp no longer overlaps the Name/Email lines; every field label and input is clearly readable.
- Menu button: a clearly visible glass capsule at 100% zoom, comfortably sized with soft shadow — no need to zoom out to find it.
- Illustration clusters (3–4 pieces in one spot, e.g. the hero collage) — reduced to at most two intentional pieces per screen.

## 3. Art that belongs to the interface, not pasted on (P0)

- Illustrations with white patches inside (sculptures, flowers) get a deeper cutout: enclosed near-white regions are also lifted, so cutouts float clean on the peach paper. Cache version bumped so everything reprocesses.
- Every kept illustration gets colour balance (warm harmonising filter) plus layered warm shadow/lighting so it looks printed onto the site, not dropped on it.
- Meaningful placement instead of decoration: a woman peeking from behind a wall with a pot gazing at the reader, art as the header/footer's classical borders, a piece peeping from a bottom corner, art accents on the menu and page transitions.

## 4. The premium lift (P1)

- **Bento Home**: hero, welcome note and the two book cards arranged as an elegant bento of cream glass cards — airy, max two dense zones per viewport.
- **Glassmorphism + Soft UI**: translucent blurred surfaces with warm thin borders and soft raised shadows for header, menu, cards and buttons.
- **Micro-interactions**: buttons with hover glow/expand and ≤8px magnetic pull, cards with ≤6° pointer tilt and soft shadow bloom, focus rings, all disabled under reduced-motion.
- **Typography**: one confident system — Chonburi/Rozha One display, Fraunces body, Tiro Devanagari Hindi, hand-lettered accents kept only where they earn their place.
- **Motion**: smooth page-reveal and interstitial transitions kept, refined.

## 5. Intro screen = your signature page (P1)

Redesigned as an end-card you can post with reels: peach stage, cup with rising steam, the angular Qambakht. wordmark large, "कहानियाँ, जो ठहर जाएँ" beneath, an elegant gold flourish that draws itself and holds a beat — fast, captivating, once per session with an easy skip.

## 6. Pages

- **Library**: clean reading-room cards (no lending card, no clusters), sharp full-opacity covers, tilt hover.
- **Author**: portrait in its arch, the existing note and signature, Recommended Hindi card, at most two accents.
- **Feedback**: clean postcard form — Name, Email (optional), cup rating, thoughts — unchanged delivery to anandadarsh942@gmail.com (mailto default, Web3Forms key optional).
- **Buy**: unchanged behaviour (only the three purchase links open new tabs), tidied visuals.
- Footer keeps cup + wordmark left, copyright right, no nav tabs.

## 7. Verification

Typecheck, existing routing/swipe tests, and Playwright screenshots at 360 / 768 / 1440 across Home, Library, Author, Feedback, Buy, menu and intro — checking no white boxes, no overlaps, no clusters, no marquee.
