import authorProfile from "@/assets/adarsh-profile.png.asset.json";
import pdfHindi from "@/assets/aam-zindagi-hindi.pdf.asset.json";

/** Site name — always with its period. */
export const SITE_NAME = "Qambakht.";

export const LOGO = "/assets/logo/qambakht-cup-192.png";
export const MANDALA = "/assets/mandala-peach.jpg";

export const covers = {
  english: { url: "/assets/books/cover-english.png", title: "Aam Zindagi!", language: "English" },
  hindi: { url: "/assets/books/cover-hindi.png", title: "आम ज़िंदगी!", language: "Hindi" },
};

export const pdfs = {
  english: {
    url: "/assets/books/aam-zindagi-english.pdf",
    title: "Aam Zindagi!",
    language: "English",
  },
  // The Hindi PDF is larger than the repo's 10 MB file limit, so it lives on the asset CDN.
  hindi: { url: pdfHindi.url, title: "आम ज़िंदगी!", language: "Hindi" },
};

export const portraitUrl = authorProfile.url;

export const AUTHOR_EMAIL = "anandadarsh942@gmail.com";
export const CONTACT_EMAIL = "hello@qambakht.in";
export const CONNECT_ILLUSTRATION =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2855%29-E0dyNTOXQyFoJREjBadqQxMHwHqxpR.jpg";
export const INSTAGRAM_ICON = "https://thesvg.org/icons/instagram/default.svg";
export const GMAIL_ICON = "https://thesvg.org/icons/gmail-2026/default.svg";

export const BLURBS = {
  english:
    "An evening in English — the same small storms and quieter braveries, in words that feel like they were always yours. Pull up a chair.",
  hindi:
    "The original Hindi edition — unhurried, with every line settling like steam from a cup of chai.",
};

/** Crop as fractions of the source image: top, right, bottom, left. Used to hide artist marks. */
export type Crop = [number, number, number, number];
export type ArtPiece = {
  src: string;
  w: number;
  h: number;
  crop?: Crop | undefined;
  patch?: undefined | { x: number; y: number; w: number; h: number; color: string };
};

const a = (
  file: string,
  w: number,
  h: number,
  crop?: Crop,
  patch?: ArtPiece["patch"],
): ArtPiece => ({
  src: `/assets/art/${file}`,
  w,
  h,
  crop,
  patch,
});

/** All 48 licensed illustrations, by catalogue number. */
export const ART = {
  1: a("01-lotus-woman-green.jpg", 736, 736, [0, 0, 0, 0.25]),
  2: a("02-hand-lotus-linen.jpg", 735, 912, [0, 0, 0.1, 0]),
  3: a("03-elephants-pair-linen.jpg", 735, 912, [0.44, 0, 0.1, 0]),
  4: a("04-veena-woman-linen.jpg", 736, 913, [0.1, 0, 0.08, 0]),
  5: a("05-peacock-kraft.jpg", 720, 720, [0, 0, 0.14, 0]),
  6: a("06-cloud-gold.jpg", 735, 917),
  7: a("07-bouquet-kraft-sticker.jpg", 736, 736),
  8: a("08-daisy-sticker.webp", 686, 642),
  9: a("09-elephant-doodle.jpg", 736, 736),
  10: a("10-singer-sewing.jpg", 736, 1308),
  11: a("11-log-kya-kahenge-eyes.png", 473, 277, [0.03, 0.13, 0, 0.03]),
  12: a("12-nazar-mask.png", 454, 557, [0.04, 0.11, 0.03, 0.03], {
    x: 0.7,
    y: 0.52,
    w: 0.14,
    h: 0.08,
    color: "#e2d8c9",
  }),
  13: a("13-sun-moon-kraft.jpg", 736, 736, [0, 0, 0.14, 0]),
  14: a("14-woman-lotus-frame.jpg", 524, 662),
  15: a("15-maple-corner.jpg", 380, 585),
  16: a("16-stamp-log-kya.jpg", 736, 736),
  17: a("17-damask-cream.jpg", 605, 1008),
  18: a("18-mandala-peach-bg.jpg", 736, 1308),
  19: a("19-mandala-corners-white.jpg", 736, 1308),
  20: a("20-swan.jpg", 675, 1200),
  21: a("21-peeking-faces.jpg", 645, 1159),
  22: a("22-woman-red-profile.jpg", 736, 1041),
  23: a("23-woman-chin-hand.jpg", 735, 595),
  24: a("24-arch-niche-ochre.jpg", 719, 1024),
  25: a("25-carpet-corner-white.jpg", 647, 1153),
  26: a("26-carpet-corner-cream.jpg", 675, 1200),
  27: a("27-baskets-corner.jpg", 597, 639),
  28: a("28-carpet-arch-frame.jpg", 736, 1308),
  29: a("29-waves-blue.webp", 736, 410),
  30: a("30-peonies.jpg", 633, 929),
  31: a("31-daisy-bouquet.jpg", 675, 1200),
  32: a("32-border-strips-maroon.jpg", 735, 1105),
  33: a("33-border-geometric-tan.jpg", 736, 1308),
  34: a("34-warli-sheet.jpg", 735, 1105),
  35: a("35-temple-pillar-sketch.jpg", 736, 1318),
  36: a("36-parrot-kraft.jpg", 735, 925, [0, 0, 0.14, 0]),
  37: a("37-woman-mirror-oval.jpg", 735, 1040),
  38: a("38-peacock-oval.jpg", 736, 920),
  39: a("39-banana-tree.jpg", 563, 673),
  40: a("40-elephant-embroidery.jpg", 736, 914),
  41: a("41-baraat-procession.jpg", 736, 390),
  42: a("42-woman-plant.jpg", 736, 964, [0, 0, 0.13, 0]),
  43: a("43-woman-braid-sticker.jpg", 736, 1031, [0, 0, 0.11, 0]),
  44: a("44-doves.jpg", 422, 576),
  45: a("45-gramophone.jpg", 400, 628),
  46: a("46-woman-dupatta-painting.jpg", 736, 957, [0, 0, 0.09, 0]),
  47: a("47-woman-birdcage-circle.jpg", 736, 736),
  48: a("48-brass-apsara.jpg", 736, 1584),
} as const;

export type ArtNo = keyof typeof ART;

export const NAV = [
  { label: "घर", to: "/", english: "Home", interstitial: 24 as ArtNo },
  { label: "पुस्तकालय", to: "/library", english: "Library", interstitial: 47 as ArtNo },
  { label: "कम्बख़्त", to: "/author", english: "Author", interstitial: 12 as ArtNo },
  { label: "और सुनाओ?", to: "/connect", english: "Connect", interstitial: 42 as ArtNo },
  { label: "किताब ले लो!", to: "/buy", english: "Buy the book", interstitial: 48 as ArtNo },
] as const;

/** Same title on every route, by request. */
export const pageHead = (description: string) => ({
  meta: [
    { title: SITE_NAME },
    { name: "description", content: description },
    { property: "og:title", content: SITE_NAME },
    { name: "twitter:title", content: SITE_NAME },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    {
      property: "og:image",
      content: "https://qambakht.lovable.app/assets/logo/qambakht-cup-192.png",
    },
    {
      name: "twitter:image",
      content: "https://qambakht.lovable.app/assets/logo/qambakht-cup-192.png",
    },
  ],
});
