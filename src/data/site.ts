import coverEnglish from "@/assets/cover-english.png.asset.json";
import coverHindi from "@/assets/cover-hindi.png.asset.json";
import portrait from "@/assets/adarsh-portrait.png.asset.json";
import pdfEnglish from "@/assets/aam-zindagi-english.pdf.asset.json";
import pdfHindi from "@/assets/aam-zindagi-hindi.pdf.asset.json";
import art1 from "@/assets/classical-art-1.jpg.asset.json";
import art2 from "@/assets/classical-art-2.jpg.asset.json";
import art3 from "@/assets/classical-art-3.jpg.asset.json";
import art4 from "@/assets/classical-art-4.jpg.asset.json";
import art5 from "@/assets/classical-art-5.jpg.asset.json";
import art6 from "@/assets/classical-art-6.jpg.asset.json";

export const covers = {
  english: { url: coverEnglish.url, title: "Aam Zindagi!", language: "English" },
  hindi: { url: coverHindi.url, title: "आम ज़िंदगी!", language: "हिन्दी" },
};

export const pdfs = {
  english: { url: pdfEnglish.url, title: "Aam Zindagi!", language: "English" },
  hindi: { url: pdfHindi.url, title: "आम ज़िंदगी!", language: "हिन्दी" },
};

export const portraitUrl = portrait.url;

export const classicalArts = [
  {
    url: art1.url,
    alt: "Folk elephant frieze with temple borders and garland motifs",
    caption: "Elephant frieze",
    note: "temple borders & toran garlands",
  },
  {
    url: art2.url,
    alt: "Large mandala in warm peach tones",
    caption: "Mandala",
    note: "the geometry of stillness",
  },
  {
    url: art3.url,
    alt: "Sage-green print with elephants and botanicals",
    caption: "Pichwai & botanicals",
    note: "elephants in sage and vine",
  },
  {
    url: art4.url,
    alt: "Woven rug texture with cane placemats",
    caption: "Woven craft",
    note: "rugs, cane and everyday texture",
  },
  {
    url: art5.url,
    alt: "Warli art frieze of dancing figures and drummers",
    caption: "Warli",
    note: "the dance of the harvest",
  },
  {
    url: art6.url,
    alt: "Cream fabric with repeating hand-block buti print",
    caption: "Hand-block buti",
    note: "the quiet art of repetition",
  },
];

export const AUTHOR_EMAIL = "anandadarsh942@gmail.com";
export const CONTACT_EMAIL = "hello@qambakht.in";
