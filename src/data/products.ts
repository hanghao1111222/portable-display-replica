import s10proA from "@/assets/product-s10pro-a.jpg";
import a6A from "@/assets/product-a6-a.jpg";
import s10proA11 from "@/assets/product-s10pro-1.1.jpg";
import s10proA700x900 from "@/assets/product-s10pro-700x900-1.1.jpg";
import s10g1 from "@/assets/s10pro-gallery-1-multitasking.jpg";
import s10g2 from "@/assets/s10pro-gallery-2-display.jpg";
import s10g3 from "@/assets/s10pro-gallery-3-modes.jpg";
import s10g4 from "@/assets/s10pro-gallery-4-fit.jpg";
import s10g5 from "@/assets/s10pro-gallery-5-slim.jpg";
import s10g6 from "@/assets/s10pro-gallery-6-devices.jpg";
import s10g7 from "@/assets/s10pro-gallery-7-anywhere.jpg";
import aplusHero from "@/assets/s10pro-aplus-hero.jpg";
import aplusDisplay from "@/assets/s10pro-aplus-display.jpg";
import aplusMeeting from "@/assets/s10pro-aplus-meeting.jpg";
import aplusTeaching from "@/assets/s10pro-aplus-teaching.jpg";
import aplusTravel from "@/assets/s10pro-aplus-travel.jpg";
import aplusAnywhere from "@/assets/s10pro-aplus-anywhere.jpg";
import aplusEcosystem from "@/assets/s10pro-aplus-ecosystem.jpg";

// Curated A6 gallery images
import a6g2 from "@/assets/a6-gallery-2.jpg";
import a6g3 from "@/assets/a6-gallery-3.jpg";
import a6g4 from "@/assets/a6-gallery-4.jpg";
import a6g6 from "@/assets/a6-gallery-6.jpg";
import a6g8 from "@/assets/a6-gallery-8.jpg";

// New A6 A+ banners
import a6b1 from "@/assets/a6-aplus-banner-1.jpg";
import a6b2 from "@/assets/a6-aplus-banner-2.jpg";
import a6b3 from "@/assets/a6-aplus-banner-3.jpg";
import a6b4 from "@/assets/a6-aplus-banner-4.jpg";
import a6b5 from "@/assets/a6-aplus-banner-5.jpg";
import a6b6 from "@/assets/a6-aplus-banner-6.jpg";
import a6b7_1 from "@/assets/a6-aplus-banner-7-1.jpg";
import a6b7_2 from "@/assets/a6-aplus-banner-7-2.jpg";
import a6b8 from "@/assets/a6-aplus-banner-8.jpg";
import a6b9 from "@/assets/a6-aplus-banner-9.jpg";
import a6b10 from "@/assets/a6-aplus-banner-10.jpg";
import a6b11 from "@/assets/a6-aplus-banner-11.jpg";
import a6b12 from "@/assets/a6-aplus-banner-12.jpg";
import a6b14 from "@/assets/a6-aplus-banner-14.jpg";

export type Product = {
  slug: string;
  name: string;
  amazonUrl?: string;
  tagline: { en: string; ja: string };
  description: { en: string; ja: string };
  price: number;
  compareAt: number;
  rating: number;
  reviews: number;
  images: string[];
  gallery?: string[];
  gallerySection?: {
    heroTitle: { en: string; ja: string };
    clarityHeading: { en: string; ja: string };
    clarityCards: {
      eyebrow: { en: string; ja: string };
      title: { en: string; ja: string };
    }[];
    deployTitle: { en: string; ja: string };
    deployBody: { en: string; ja: string };
  };
  aplus?: {
    hero?: string;
    display?: string;
    ecosystem?: string;
    scenesHeading?: { en: string; ja: string };
    scenes?: { image: string; label: { en: string; ja: string } }[];
    banners?: string[];
    sliders?: {
      title?: { en: string; ja: string };
      slides: string[];
    }[];
    comfort?: {
      image: string;
      title: { en: string; ja: string };
    };
    clarity?: {
      title: { en: string; ja: string };
      items: {
        image: string;
        eyebrow: { en: string; ja: string };
        label: { en: string; ja: string };
      }[];
    };
    deploy?: {
      image: string;
      title: { en: string; ja: string };
      body: { en: string; ja: string };
    };
  };
  badge?: { en: string; ja: string };
  specs: { label: { en: string; ja: string }; value: string }[];
  features: { image?: string; title: { en: string; ja: string }; body: { en: string; ja: string } }[];
};

const s10ProSpecs = [
  { label: { en: "Brand", ja: "ブランド" }, value: "Anyking" },
  { label: { en: "Model", ja: "モデル" }, value: "S10 Pro" },
  { label: { en: "Screen size", ja: "画面サイズ" }, value: '14" × 2' },
  { label: { en: "Display type", ja: "ディスプレイタイプ" }, value: "LED" },
  { label: { en: "Display technology", ja: "ディスプレイ技術" }, value: "IPS" },
  { label: { en: "Resolution", ja: "解像度" }, value: "FHD 1080p (1920 × 1080)" },
  { label: { en: "Aspect ratio", ja: "アスペクト比" }, value: "16:9" },
  { label: { en: "Refresh rate", ja: "リフレッシュレート" }, value: "60 Hz" },
  { label: { en: "Response time", ja: "応答速度" }, value: "0.1 ms" },
  { label: { en: "Contrast ratio", ja: "コントラスト比" }, value: "1000:1" },
  { label: { en: "Screen finish", ja: "画面仕上げ" }, value: "Matte" },
  { label: { en: "Picture enhancement", ja: "画質補正" }, value: "Eye Care, Color Enhancement" },
  { label: { en: "Connectivity", ja: "接続方式" }, value: "USB Type-C, mini HDMI" },
  { label: { en: "Ports", ja: "ポート" }, value: "4× USB-C, 2× mini HDMI" },
  { label: { en: "HDMI ports", ja: "HDMIポート" }, value: "2" },
  { label: { en: "Item dimensions", ja: "本体サイズ" }, value: '1.05"D × 13.2"W × 8"H' },
  { label: { en: "Weight", ja: "重量" }, value: "1.6 kg (3.53 lbs)" },
  { label: { en: "Color", ja: "カラー" }, value: "Black" },
  { label: { en: "Warranty", ja: "保証" }, value: "2 Years Manufacturer" },
  { label: { en: "Manufacturer", ja: "製造元" }, value: "Shenzhen Baijiayoupu Technology Co., Ltd" },
  { label: { en: "ASIN", ja: "ASIN" }, value: "B0GJSXHDCG" },
];

const a6Specs = [
  { label: { en: "Brand", ja: "ブランド" }, value: "Anyking" },
  { label: { en: "Model", ja: "モデル" }, value: "A6" },
  { label: { en: "Screen size", ja: "画面サイズ" }, value: '14"' },
  { label: { en: "Display type", ja: "ディスプレイタイプ" }, value: "LED" },
  { label: { en: "Display technology", ja: "ディスプレイ技術" }, value: "IPS" },
  { label: { en: "Resolution", ja: "解像度" }, value: "FHD 1080p (1920 × 1080)" },
  { label: { en: "Aspect ratio", ja: "アスペクト比" }, value: "16:9" },
  { label: { en: "Refresh rate", ja: "リフレッシュレート" }, value: "60 Hz" },
  { label: { en: "Response time", ja: "応答速度" }, value: "0.1 ms" },
  { label: { en: "Contrast ratio", ja: "コントラスト比" }, value: "1000:1" },
  { label: { en: "Screen finish", ja: "画面仕上げ" }, value: "Matte" },
  { label: { en: "Picture enhancement", ja: "画質補正" }, value: "Anti-Glare Screen, Blue Light Filter" },
  { label: { en: "Connectivity", ja: "接続方式" }, value: "USB Type-C, mini HDMI" },
  { label: { en: "Ports", ja: "ポート" }, value: "2× USB-C, 1× mini HDMI, 1x Audio Jack" },
  { label: { en: "HDMI ports", ja: "HDMIポート" }, value: "1" },
  { label: { en: "Item dimensions", ja: "本体サイズ" }, value: '0.35"D × 13.38"W × 7.87"H' },
  { label: { en: "Weight", ja: "重量" }, value: "850 g (1.87 lbs)" },
  { label: { en: "Color", ja: "カラー" }, value: "Black" },
  { label: { en: "Warranty", ja: "保証" }, value: "1 Year Manufacturer" },
  { label: { en: "Manufacturer", ja: "製造元" }, value: "Shenzhen Baijiayoupu Technology Co., Ltd" },
  { label: { en: "ASIN", ja: "ASIN" }, value: "B0GJS4XGDJ" },
];

export const products: Product[] = [
  {
    slug: "s10-pro",
    name: "Anyking S10 Pro",
    amazonUrl: "https://www.amazon.com/dp/B0GJSXHDCG",
    tagline: {
      en: "Triple‑screen workstation, anywhere.",
      ja: "どこでもトリプルスクリーンのワークステーション。",
    },
    description: {
      en: 'Two 14" FHD IPS panels clip onto either side of your laptop to form an instant triple‑display setup. Anti‑glare coating, HDR10+, and a precision hinge that holds exactly where you set it.',
      ja: '14インチのフルHD IPSパネル2枚をノートPCの両側にクリップで装着し、瞬時にトリプルディスプレイ環境を構築。アンチグレア加工、HDR10+対応、設定した角度を正確に保つ高精度ヒンジを搭載。',
    },
    price: 189.98,
    compareAt: 239.99,
    rating: 4.81,
    reviews: 412,
    images: [
      s10proA11,
      s10g1,
      s10g2,
      s10g6,
    ],
    gallery: [s10g1, s10g2, s10g3, s10g4, s10g5, s10g6, s10g7],
    gallerySection: {
      heroTitle: { en: "Be comfortable everywhere", ja: "どこでも快適に" },
      clarityHeading: {
        en: "Unmatched clarity, superior quality",
        ja: "比類なき鮮明さ、優れた品質",
      },
      clarityCards: [
        {
          eyebrow: { en: "Twice the screen space", ja: "2倍の画面領域" },
          title: { en: "Dual 14-inch", ja: "デュアル14インチ" },
        },
        {
          eyebrow: { en: "High-end features", ja: "ハイエンド機能" },
          title: { en: "HDR and IPS", ja: "HDRとIPS" },
        },
        {
          eyebrow: { en: "Vibrant colors", ja: "鮮やかな色彩" },
          title: { en: "Full HD", ja: "フルHD" },
        },
        {
          eyebrow: { en: "Spacious and convenient", ja: "広々と快適" },
          title: { en: "4 million pixels", ja: "400万ピクセル" },
        },
      ],
      deployTitle: { en: "Deploy it", ja: "展開する" },
      deployBody: {
        en: 'Introducing the Anyking S10 Pro: effortlessly attach the dual 14" panels to the back of your Mac or Windows laptop with the integrated kickstand. Connect with a single USB-C cable and watch your three-screen workstation spring into action.',
        ja: 'Anyking S10 Proのご紹介：内蔵キックスタンドで14インチデュアルパネルをMacまたはWindowsノートPCの背面に簡単に装着。USB-Cケーブル1本で接続し、3画面ワークステーションが瞬時に展開します。',
      },
    },
    aplus: {
      hero: aplusHero,
      display: aplusDisplay,
      ecosystem: aplusEcosystem,
      scenesHeading: {
        en: "Built for every scenario",
        ja: "あらゆるシーンに対応",
      },
      scenes: [
        { image: s10g1, label: { en: "Multitasking Workspace", ja: "マルチタスクワークスペース" } },
        { image: s10g3, label: { en: "Flexible Presentation Mode", ja: "プレゼンテーション・共有" } },
        { image: s10g5, label: { en: "Ultra-slim Portability", ja: "極薄で持ち運びも簡単" } },
        { image: s10g7, label: { en: "Work Anywhere", ja: "どこでも快適に作業" } },
      ],
      deploy: {
        image: s10proA700x900,
        title: { en: "Deploy it", ja: "展開する" },
        body: {
          en: 'Introducing the Anyking S10 Pro: effortlessly attach the dual 14" panels to the back of your Mac or Windows laptop with the integrated kickstand. Connect with a single USB-C cable and watch your three-screen workstation spring into action.',
          ja: 'Anyking S10 Proのご紹介：内蔵キックスタンドで14インチデュアルパネルをMacまたはWindowsノートPCの背面に簡単に装着。USB-Cケーブル1本で接続し、3画面ワークスペースが瞬時に展開します。',
        },
      },
    },
    badge: { en: "Flagship", ja: "フラッグシップ" },
    specs: s10ProSpecs,
    features: [
      {
        image: aplusHero,
        title: { en: "Three screens, one cable", ja: "3画面、ケーブル1本" },
        body: {
          en: "Daisy‑chain over USB-C for a true triple‑monitor mobile setup — no driver, no dock required.",
          ja: "USB-Cでデイジーチェーン接続し、ドライバ不要・ドック不要で真のトリプルモニター環境を実現。",
        },
      },
      {
        image: aplusDisplay,
        title: { en: "Precision swing hinge", ja: "高精度スイングヒンジ" },
        body: {
          en: "Each side panel slides and rotates independently, snapping into place with satisfying resistance.",
          ja: "両サイドのパネルは独立してスライド・回転し、心地よい抵抗感でしっかりと固定されます。",
        },
      },
      {
        image: s10g4,
        title: { en: "100% sRGB · HDR10+", ja: "100% sRGB · HDR10+" },
        body: {
          en: 'Color‑accurate 14" IPS panels with anti‑glare coating, ready for design, video and gameplay.',
          ja: '色精度の高い14インチIPSパネルにアンチグレア加工を施し、デザイン、動画、ゲームに最適。',
        },
      },
    ],
  },
  {
    slug: "a6",
    name: "Anyking A6",
    amazonUrl: "https://www.amazon.com/dp/B0GJS4XGDJ",
    tagline: {
      en: "One extra screen. Zero compromise.",
      ja: "もう一画面、妥協なし。",
    },
    description: {
      en: 'A featherlight 14" portable monitor that clips onto your laptop in seconds. 1080P FHD IPS, just 1.87 lb, with full USB-C plug‑and‑play and an integrated RGB ambient light.',
      ja: '14インチの超軽量ポータブルモニター、ノートPCに数秒で装着。1080PフルHD IPS、わずか1.87lb、USB-Cプラグ＆プレイ対応、RGBアンビエントライト内蔵。',
    },
    price: 99.98,
    compareAt: 135.99,
    rating: 4.76,
    reviews: 287,
    images: [
      a6A,
      a6g2,
      a6g3,
      a6g4,
      a6g6,
    ],
    aplus: {
      banners: [a6b1, a6b2, a6b3, a6b4, a6b5, a6b6],
      sliders: [
        {
          title: { en: "Details you don't notice. Until you do.", ja: "細部に宿るこだわり。違いを実感。" },
          slides: [a6b7_1, a6b7_2],
        },
        {
          title: { en: "Dual Cable Connection", ja: "デュアルケーブル接続" },
          slides: [a6b8, a6b9],
        },
        {
          title: { en: "Lifestyle Scenes", ja: "ライフスタイル・シーン" },
          slides: [a6b10, a6b11, a6b12, a6b14],
        },
      ],
      comfort: {
        image: a6g8,
        title: { en: "Be comfortable everywhere", ja: "どこでも快適に" },
      },
      deploy: {
        image: a6A,
        title: { en: "Deploy it", ja: "展開する" },
        body: {
          en: 'Introducing the Anyking A6 14": effortlessly place it next to your Mac or Windows laptop with its integrated kickstand. Connect it with a USB-C cable and watch as your dual-screen workstation springs into action.',
          ja: 'Anyking A6 14インチのご紹介：内蔵キックスタンドでMacまたはWindowsノートPCの隣に簡単に設置。USB-Cケーブルで接続すれば、デュアルスクリーンワークステーションが瞬時に展開します。',
        },
      },
    },
    badge: { en: "Bestseller", ja: "ベストセラー" },
    specs: a6Specs,
    features: [
      {
        image: a6b6,
        title: { en: "Package List", ja: "同梱内容" },
        body: {
          en: "Everything you need in the box: screen extender, user guide, manual, and cables.",
          ja: "スクリーンエクステンダー、本体ガイド、マニュアル、各種ケーブルを同梱。",
        },
      },
      {
        image: a6b3,
        title: { en: "Adaptive Fit", ja: "幅広い対応力" },
        body: {
          en: "Secure hold for 13 to 17-inch laptops, with a clean side-by-side display layout.",
          ja: "13〜17インチのノートPCにしっかり対応し、横並びの表示を実現。",
        },
      },
      {
        image: a6b4,
        title: { en: "Rear Support System", ja: "リアサポートシステム" },
        body: {
          en: "The back structure, hinge, and support frame work together for stability and easy setup.",
          ja: "背面構造、ヒンジ、サポートフレームが連動し、安定性と設置のしやすさを両立。",
        },
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
