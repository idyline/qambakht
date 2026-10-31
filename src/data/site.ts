import coverEnglish from "@/assets/cover-english.png.asset.json";
import coverHindi from "@/assets/cover-hindi.png.asset.json";
import portrait from "@/assets/adarsh-portrait.png.asset.json";
import pdfEnglish from "@/assets/aam-zindagi-english.pdf.asset.json";
import pdfHindi from "@/assets/aam-zindagi-hindi.pdf.asset.json";
import siteDamask from "@/assets/site-damask.jpg.asset.json";
import siteMandala from "@/assets/site-mandala.jpg.asset.json";
import siteCarpet from "@/assets/site-carpet-strip.jpg.asset.json";
import siteFrieze from "@/assets/site-elephant-band.jpg.asset.json";
import sitePichwai from "@/assets/site-pichwai.jpg.asset.json";
import siteWarli from "@/assets/site-warli-band.png.asset.json";
import siteButi from "@/assets/site-buti.jpg.asset.json";
import logo from "@/assets/qambakht-logo.png.asset.json";
import filigree from "@/assets/filigree-gold.png.asset.json";

export const covers = {
  english: { url: coverEnglish.url, title: "Aam Zindagi!", language: "English" },
  hindi: { url: coverHindi.url, title: "आम ज़िंदगी!", language: "हिन्दी" },
};

export const pdfs = {
  english: { url: pdfEnglish.url, title: "Aam Zindagi!", language: "English" },
  hindi: { url: pdfHindi.url, title: "आम ज़िंदगी!", language: "हिन्दी" },
};

export const portraitUrl = portrait.url;

/**
 * The Indian classical arts, each with a fixed role in the site's atmosphere:
 *  - damask: faint full-page wallpaper texture (blended with the mandala)
 *  - mandala: large soft mandala bloom in the site background
 *  - carpet: regal tapestry border along the left edge of the site
 *  - frieze: elephant procession band used as section dividers & card cornices
 *  - pichwai: elephant/floral motif spread as quiet atmospheric accents
 *  - warli: vertical warli ribbon framing the book covers
 *  - buti: hand-block buti pattern behind descriptions & empty-space fillers
 */
export const arts = {
  damask: siteDamask.url,
  mandala: siteMandala.url,
  carpet: siteCarpet.url,
  frieze: siteFrieze.url,
  pichwai: sitePichwai.url,
  warli: siteWarli.url,
  buti: siteButi.url,
};

export const logoUrl = logo.url;
export const filigreeUrl = filigree.url;

export const HERO_LINES = [
  "शब्द वो हैं जो ठहर जाएँ — काग़ज़ पर नहीं, साँसों में।",
  "हर आम शाम में एक अनकही किस्सा छिपा है।",
  "चाय की भाप, गली की गूँज — और ज़िंदगी ख़ुद एक कहानी।",
  "जो बात दिल में ठहर जाए, वही साहित्य है।",
  "पन्ने ख़ामोश हैं, पर जो कहते हैं, वो साथ चलते हैं।",
];

export const AUTHOR_EMAIL = "anandadarsh942@gmail.com";
export const CONTACT_EMAIL = "hello@qambakht.in";
