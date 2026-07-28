import type { Lang } from "./strings";
import type { HelpCenterArticle } from "@/data/helpCenterArticles";

const uiJa: Record<string, string> = {
  "Setup Guide": "セットアップガイド",
  Products: "製品",
  "FAQ Articles": "よくあるご質問",
  "Can't find answers?": "解決しない場合",
  Troubleshooting: "トラブルシューティング",
  "Warranty & Returns": "保証・返品",
  "Contact Support": "サポートへ問い合わせ",
  "Laptop Compatibility": "ノートPCの互換性",
  "Cable & Port Guide": "ケーブル・ポートガイド",
  "Portable Monitor Guides": "ポータブルモニターガイド",
  "Portable Monitors": "ポータブルモニター",
  "Laptop Extenders": "ノートPC用拡張ディスプレイ",
  Compatibility: "互換性チェック",
  "A6 Portable Monitor": "A6 ポータブルモニター",
  "S10 Pro Extender": "S10 Pro 拡張ディスプレイ",
  'P7 15.6" Extender': "P7 15.6インチ 拡張ディスプレイ",
  "F4 Extender": "F4 拡張ディスプレイ",
  "M5 Extender": "M5 拡張ディスプレイ",
  "S12 Extender": "S12 拡張ディスプレイ",
  "S13 Extender": "S13 拡張ディスプレイ",
  "Z3 Extender": "Z3 拡張ディスプレイ",
  "AnyKing A6 Portable Monitor": "AnyKing A6 ポータブルモニター",
  "AnyKing S10 Pro Extender": "AnyKing S10 Pro 拡張ディスプレイ",
  'AnyKing P7 15.6" Extender': "AnyKing P7 15.6インチ 拡張ディスプレイ",
  "Connection Help": "接続サポート",
  "Getting Started": "はじめに",
  "Account & Orders": "アカウント・注文",
  "Call us": "電話で問い合わせ",
  "Email us": "メールで問い合わせ",
  "Open live chat": "ライブチャットを開く",
  "+1 (657) 395-7180. Message us directly on WhatsApp.":
    "+1 (657) 395-7180 へWhatsAppから直接メッセージを送れます。",
  "Prefer to speak with us? Call Anyking support at +1 (888) 688-5025.":
    "お電話をご希望の場合は、Anykingサポート +1 (888) 688-5025 までご連絡ください。",
  "Send details to service@anykingscreen.com and our team will help with the next step.":
    "service@anykingscreen.com へ詳細をお送りください。担当チームが次の手順をご案内します。",
  "View guide": "ガイドを見る",
  "Read article": "記事を読む",
  "Search the help center": "ヘルプセンターを検索",
  "Search setup, compatibility, cables, warranty...":
    "セットアップ、互換性、ケーブル、保証などを検索",
  "No exact matches": "一致する結果がありません",
  "Ask smart support": "スマートサポートに質問",
  "Popular help topics": "よく見られているトピック",
  "Browse by product": "製品から探す",
  "Frequently asked questions": "よくあるご質問",
  "Still need help?": "まだ解決しませんか？",
  "Help Center": "ヘルプセンター",
  "Back to Help Center": "ヘルプセンターへ戻る",
  "Article not found": "記事が見つかりません",
  "Connection Tutorial": "接続チュートリアル",
  "Watch setup video": "セットアップ動画を見る",
  "1. Product Overview": "1. 製品概要",
  "1.1 Design & look": "1.1 デザイン・外観",
  "1.2 Key highlights": "1.2 主な特長",
  "1.3 Product page links": "1.3 製品ページ",
  "2. Specifications": "2. 製品仕様",
  "2.1 Core specs": "2.1 基本仕様",
  "3. Setup, Install & Accessories": "3. セットアップ・付属品",
  "3.1 Setup workflow": "3.1 セットアップ手順",
  "3.2 Accessories & compatibility": "3.2 付属品・互換性",
  "4. Downloads": "4. ダウンロード",
  "4.1 User manual": "4.1 ユーザーマニュアル",
  "4.2 Firmware": "4.2 ファームウェア",
  "5. Common Questions": "5. よくあるご質問",
  "Activate Your 1-Year Warranty": "1年間の保証を有効にする",
  "Activate Warranty": "保証を有効にする",
  "Start here": "まずはこちら",
  "Open on YouTube": "YouTubeで開く",
  "PRODUCT OVERVIEW": "製品概要",
  "Design & look": "デザイン・外観",
  "Key highlights": "主な特長",
  "Product page links": "製品ページ",
  SPECIFICATIONS: "製品仕様",
  "Core specifications": "基本仕様",
  "SETUP, INSTALL & ACCESSORIES": "セットアップ・付属品",
  "Setup workflow": "セットアップ手順",
  "Accessories & compatibility": "付属品・互換性",
  "Compatibility notes": "互換性に関する注意",
  "Connection methods": "接続方法",
  "Before you connect": "接続前の確認",
  DOWNLOADS: "ダウンロード",
  "User manual": "ユーザーマニュアル",
  Firmware: "ファームウェア",
  "COMMON QUESTIONS": "よくあるご質問",
  "Contact support": "サポートへ問い合わせ",
  "Warranty support": "保証サポート",
  "Live chat": "ライブチャット",
  "Table of contents": "目次",
  "Our support team is ready to help with setup, compatibility, warranty, and returns.":
    "セットアップ、互換性、保証、返品についてサポートチームがご案内します。",
  "Check whether your laptop provides the required video outputs or needs an H5 DisplayLink adapter.":
    "ノートPCに必要な映像出力があるか、H5 DisplayLinkアダプターが必要かを確認できます。",
  "Understand USB-C, HDMI, USB-A power, and when each cable is required.":
    "USB-C、HDMI、USB-A給電の違いと、必要なケーブルを確認できます。",
  "Unbox, connect, and set up your Anyking portable display.":
    "開梱から接続、Anykingポータブルディスプレイの初期設定までをご案内します。",
  "Fix common signal, display, and power issues quickly.":
    "映像信号、表示、給電に関する一般的な問題をすばやく解決します。",
  "Warranty coverage, replacements, and return guidance.":
    "保証範囲、交換、返品の手順をご案内します。",
  "Order tracking, delivery, and shipping address help.":
    "注文追跡、配送状況、配送先住所についてご案内します。",
  "What should I check before the first setup?": "初回セットアップ前に何を確認すればよいですか？",
  "How do I connect with one USB-C cable?": "USB-Cケーブル1本で接続する方法を教えてください。",
  "How do I connect with HDMI?": "HDMIで接続する方法を教えてください。",
  "How do I enable extended display on Windows or Mac?":
    "WindowsまたはMacで拡張表示を有効にする方法を教えてください。",
  "Which devices are compatible?": "どのデバイスに対応していますか？",
  "Why does the display show no signal or a black screen?":
    "画面に「信号なし」と表示される、または黒いままなのはなぜですか？",
  "What should I do if the screen flickers or flashes?":
    "画面が点滅する場合はどうすればよいですか？",
  "Why are the colors or resolution incorrect?": "色や解像度が正しく表示されないのはなぜですか？",
  "Why won't the monitor turn on?": "モニターの電源が入らないのはなぜですか？",
  "Why are the USB ports not working?": "USBポートが動作しないのはなぜですか？",
  "How long is the warranty?": "保証期間はどのくらいですか？",
  "How do I request a replacement?": "交換を依頼するにはどうすればよいですか？",
  "What is the return policy?": "返品ポリシーを教えてください。",
  "How long does a replacement take?": "交換品が届くまでどのくらいかかりますか？",
  "How do I track my order?": "注文を追跡するにはどうすればよいですか？",
  "Can I change my shipping address?": "配送先住所を変更できますか？",
  "What if my package is delayed?": "荷物が遅れている場合はどうすればよいですか？",
  "What if tracking says delivered but I cannot find the package?":
    "追跡情報が配達済みなのに荷物が見つからない場合はどうすればよいですか？",
  "What if tracking says delivered but I did not receive it?":
    "追跡情報が配達済みなのに荷物を受け取っていない場合はどうすればよいですか？",
  "Confirm the monitor, bracket, video cable, and power cable are in the box. Then check your laptop ports. A video-capable USB-C or Thunderbolt port can usually connect directly. HDMI-only or older USB-A laptops usually need HDMI video plus USB power, and limited-output models may need the H5 DisplayLink adapter.":
    "モニター、ブラケット、映像ケーブル、電源ケーブルが同梱されているか確認し、次にノートPCのポートを確認してください。映像出力対応USB-CまたはThunderboltは通常そのまま接続できます。HDMIのみ、または古いUSB-A搭載機種ではHDMI映像入力とUSB給電が必要で、映像出力に制限がある機種ではH5 DisplayLinkアダプターが必要です。",
  "Use the supplied USB-C cable from a laptop USB-C or Thunderbolt port that supports video output to the Anyking display. If the screen turns on but shows no signal, the port may only support charging/data and you should use HDMI plus USB power instead.":
    "付属USB-Cケーブルで、映像出力対応のUSB-CまたはThunderboltポートとAnykingディスプレイを接続します。電源は入るのに映像が表示されない場合、そのポートは充電・データ通信専用の可能性があります。HDMIとUSB給電を併用してください。",
  "Plug HDMI from the laptop to the Anyking display for video, then connect USB-C power from the laptop, charger, or USB-A power cable. HDMI carries the picture only, so the display still needs a separate power connection.":
    "ノートPCとAnykingディスプレイをHDMIで接続し、別途ノートPC、充電器、またはUSB-A電源ケーブルからUSB-C給電を行います。HDMIは映像のみを送るため、別の電源接続が必要です。",
  "On Windows, open Display Settings and choose Extend these displays. On Mac, open System Settings, choose Displays, then arrange the screens and turn off mirroring if needed.":
    "Windowsでは「ディスプレイ設定」を開いて「表示画面を拡張する」を選びます。Macでは「システム設定」から「ディスプレイ」を開き、画面を配置して必要に応じてミラーリングを解除します。",
  "Most modern laptops with Thunderbolt, full-featured USB-C, HDMI, Mini DisplayPort, or DisplayPort can work with Anyking. For model-specific cable advice, use the compatibility checker and search your laptop model.":
    "Thunderbolt、映像対応USB-C、HDMI、Mini DisplayPort、DisplayPortを備えた多くの現行ノートPCで使用できます。機種ごとのケーブル構成は互換性チェッカーで型番を検索してください。",
  "First reconnect the cable firmly, then verify the laptop output supports video. If you are using USB-C and the screen has power but no image, try HDMI plus USB power. If the laptop lacks enough native display outputs, use the H5 DisplayLink adapter and driver.":
    "まずケーブルをしっかり挿し直し、ノートPCのポートが映像出力に対応しているか確認してください。USB-C接続で電源は入るのに映像が出ない場合は、HDMIとUSB給電をお試しください。映像出力数が不足する場合はH5 DisplayLinkアダプターとドライバーを使用します。",
  "Flickering is often caused by unstable power or a low-bandwidth cable. Use the original cable, connect an external charger if needed, lower the refresh rate to 60Hz, and avoid USB hubs during setup.":
    "点滅は給電の不安定さや帯域不足のケーブルが原因になることがあります。付属ケーブルを使用し、必要に応じて外部充電器を接続し、リフレッシュレートを60Hzに下げ、初期設定時はUSBハブを避けてください。",
  "Open your laptop display settings and choose the recommended resolution for the Anyking screen. If colors look washed out, switch the color profile back to default and reconnect the display after saving the setting.":
    "ノートPCのディスプレイ設定を開き、Anyking画面の推奨解像度を選択してください。色が薄く見える場合はカラープロファイルを標準に戻し、設定保存後にディスプレイを接続し直してください。",
  "Check whether the power cable is connected to a port that can supply enough power. HDMI alone cannot power the monitor. Try a wall charger, another USB-C cable, or another USB-A power source.":
    "電源ケーブルが十分な電力を供給できるポートへ接続されているか確認してください。HDMIだけでは給電できません。壁面充電器、別のUSB-Cケーブル、または別のUSB-A電源をお試しください。",
  "USB hub functions need a data-capable USB connection, not only HDMI. Connect the USB cable between the laptop and display, then reconnect the accessory after the monitor is detected.":
    "USBハブ機能にはHDMIだけでなく、データ通信対応USB接続が必要です。ノートPCとディスプレイをUSBケーブルで接続し、モニターが認識された後に周辺機器を接続し直してください。",
  "Anyking products include a 12-month warranty for eligible manufacturing defects. Keep your order number and product photos ready so support can verify the case faster.":
    "Anyking製品には、対象となる製造上の不具合に対して12か月の保証が付属します。確認をスムーズにするため、注文番号と製品写真をご用意ください。",
  "Contact support with your order number, full laptop model or SKU, connection method, and a short video or photo of the issue. If the problem is caused by the laptop display-output limit, support may recommend the H5 DisplayLink adapter instead of replacing the full product.":
    "注文番号、ノートPCの完全な型番またはSKU、接続方法、症状が分かる短い動画または写真を添えてサポートへご連絡ください。ノートPCの映像出力制限が原因の場合、製品交換ではなくH5 DisplayLinkアダプターをご案内する場合があります。",
  "Return eligibility depends on order channel, purchase date, and product condition. Contact support before returning so the team can confirm whether a cable solution, replacement, or return is the best next step.":
    "返品の可否は購入先、購入日、製品状態によって異なります。返送前にサポートへ連絡し、ケーブル対応、交換、返品のどれが最適かをご確認ください。",
  "After support confirms the issue and shipping address, replacement timing depends on inventory and local carrier speed. The team will share the next step by email.":
    "サポートが症状と配送先を確認した後、交換時期は在庫と現地配送業者の状況により決まります。次の手順はメールでお知らせします。",
  "Use the tracking link from your order confirmation email. If you cannot find it, email service@anykingscreen.com with your order number and purchase platform.":
    "注文確認メールに記載された追跡リンクをご利用ください。見つからない場合は、注文番号と購入先を添えて service@anykingscreen.com へご連絡ください。",
  "Check your mailbox, front desk, parcel locker, and neighbors first. If the package is still missing, contact the carrier and then send support your order number and tracking screenshot.":
    "郵便受け、受付、宅配ボックス、近隣への誤配がないか確認してください。見つからない場合は配送業者へ連絡し、注文番号と追跡画面のスクリーンショットをサポートへお送りください。",
  "Contact support as soon as possible. Address changes can only be made before the order ships. Once shipped, the carrier may need to handle any redirect request.":
    "できるだけ早くサポートへご連絡ください。住所変更は発送前に限り対応できます。発送後は配送業者へ転送を依頼する必要があります。",
};

const specLabels: Record<string, string> = {
  Brand: "ブランド",
  Model: "モデル",
  ASIN: "ASIN",
  "Screen size": "画面サイズ",
  Resolution: "解像度",
  "Display technology": "ディスプレイ方式",
  "Aspect ratio": "アスペクト比",
  "Refresh rate": "リフレッシュレート",
  "Contrast ratio": "コントラスト比",
  "Screen finish": "画面仕上げ",
  "Viewing angle": "視野角",
  "Color gamut": "色域",
  "Picture enhancement": "画質機能",
  Dimensions: "本体サイズ",
  "Compatible laptop size": "対応ノートPCサイズ",
  Connectivity: "接続方式",
  "Connection paths": "接続経路",
  "HDMI ports": "HDMIポート",
  "Response time": "応答速度",
  Color: "カラー",
  Warranty: "保証",
  Manufacturer: "製造元",
};

function technicalValue(value: string) {
  return value
    .replace(/Matte \/ anti-glare/gi, "マット／非光沢")
    .replace(/Matte/gi, "マット")
    .replace(/Black/gi, "ブラック")
    .replace(/Yellow variant/gi, "イエロー")
    .replace(/1 Year Manufacturer/gi, "メーカー1年保証")
    .replace(/2 Years Manufacturer/gi, "メーカー2年保証")
    .replace(/degrees/gi, "度")
    .replace(/side displays/gi, "サイドディスプレイ")
    .replace(/laptops/gi, "ノートPC")
    .replace(/Eye care/gi, "アイケア")
    .replace(/color enhancement/gi, "色補正")
    .replace(/blue light filter/gi, "ブルーライト軽減")
    .replace(/anti-glare screen/gi, "非光沢画面");
}

export function jaText(lang: Lang, text: string) {
  return lang === "ja" ? (uiJa[text] ?? text) : text;
}

export function localizeHelpValue<T>(value: T, lang: Lang): T {
  if (lang !== "ja") return value;
  if (typeof value === "string") return (uiJa[value] ?? value) as T;
  if (Array.isArray(value)) return value.map((item) => localizeHelpValue(item, lang)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        localizeHelpValue(item, lang),
      ]),
    ) as T;
  }
  return value;
}

export function localizeHelpArticle(article: HelpCenterArticle, lang: Lang): HelpCenterArticle {
  if (lang !== "ja") return article;

  const model = uiJa[article.shortName] ?? article.shortName;
  const isA6 = article.slug.includes("a6");
  const isTriple = !isA6;
  const connectionSummary = isA6
    ? "映像出力対応USB-Cならケーブル1本で接続できます。対応していない場合は、HDMI映像入力とUSB給電を併用してください。"
    : "左右2画面を使用するには、ノートPCから独立した2系統の映像出力が必要です。1画面分しか出力できない機種ではH5 DisplayLinkアダプターを使用します。";

  return {
    ...article,
    name: uiJa[article.name] ?? article.name,
    shortName: model,
    heroTitle: `${model}のセットアップ・互換性・トラブル解決`,
    heroBody: `${model}の購入前確認、接続方法、表示設定、よくある問題、保証サポートをまとめたガイドです。`,
    connectionVideo: article.connectionVideo
      ? {
          ...article.connectionVideo,
          title: `${model} 接続チュートリアル`,
          body: "ケーブル要件やトラブル解決を確認する前に、推奨される接続手順を動画でご覧ください。",
        }
      : undefined,
    overview: {
      ...article.overview,
      listingTitle: `${model} ポータブル・ノートPC用拡張ディスプレイ`,
      designSummary: `${model}は、外出先でも効率的なマルチディスプレイ環境を構築できるポータブルモニターです。折りたたみ構造と安定したスタンドを備え、仕事、出張、学習に適しています。`,
      highlights: [
        `${model}専用に設計されたフルHD IPSディスプレイ。`,
        "WindowsとmacOSの主要なノートPC環境に対応します。",
        connectionSummary,
        "持ち運びやすく、自宅、オフィス、出張先でのマルチタスクに適しています。",
      ],
      productLinks: article.overview.productLinks.map((link, index) => ({
        ...link,
        label: index === 0 ? "製品購入ページ" : "製品詳細ページ",
      })),
    },
    specifications: article.specifications.map((spec) => ({
      label: specLabels[spec.label] ?? spec.label,
      value: technicalValue(spec.value),
    })),
    compatibility: [
      connectionSummary,
      "USB-C端子の形状だけでは映像出力対応か判断できません。ノートPCの正式な仕様をご確認ください。",
      "機種名だけでなく、完全な型番、SKU、CPU／GPU構成まで確認してください。",
      "ハブやドックを使用すると給電不足や信号不安定が起きる場合があるため、まずはノートPCへ直接接続してください。",
    ],
    connectionMethods: isTriple
      ? [
          "USB-C×2：映像出力対応の独立したUSB-Cポート2系統へ接続します。",
          "USB-C＋HDMI：片側を映像対応USB-C、もう片側をHDMI経由で接続します。",
          "出力制限がある機種：H5 DisplayLinkアダプターと専用ドライバーを使用します。",
        ]
      : [
          "USB-C接続：映像出力対応USB-Cポートとモニターを付属ケーブルで接続します。",
          "HDMI接続：HDMIで映像を送り、USB-CまたはUSB-Aケーブルで給電します。",
          "安定性を高めるため、ハブを介さずノートPCへ直接接続してください。",
        ],
    setup: {
      tutorialTitle: `${model} セットアップ手順`,
      tutorialBody: `${model}を安定して使用するには、接続前にノートPCの映像出力仕様を確認してください。${connectionSummary}`,
      accessories: [
        `${model} 本体`,
        "USB-C信号・給電ケーブル",
        "対応機種向けHDMI接続ケーブル",
        "ユーザーマニュアル",
      ],
      compatibilityNotes: [
        "ご購入前にノートPCの完全な型番とポート仕様をご確認ください。",
        "WindowsおよびmacOSが主な対応環境です。",
        "画面が映らない場合は、ケーブルの挿し直しと追加給電を最初にお試しください。",
      ],
    },
    reminders: [
      "USB-CポートがDisplayPort Alt Modeに対応しているか確認してください。",
      "点滅や電源断が起きる場合は、直接接続と外部給電をお試しください。",
      "マルチタスクにはディスプレイ設定の「拡張」モードがおすすめです。",
    ],
    downloads: {
      ...article.downloads,
      manual: { ...article.downloads.manual, label: `${model} ユーザーマニュアルをダウンロード` },
      firmware: { ...article.downloads.firmware, label: "ファームウェアについて問い合わせる" },
      note: "ユーザーマニュアルをダウンロードできます。ファームウェアについてはサポートチームへお問い合わせください。",
    },
    support: {
      ...article.support,
      warranty: "1年間保証",
    },
    sections: [
      {
        title: "互換性・購入前の確認",
        items: [
          {
            question: `${model}は私のノートPCに対応していますか？`,
            answer: `${connectionSummary} 正確な判断には、ノートPCの完全な型番、映像出力仕様、OSをご確認ください。`,
          },
          {
            question: "USB-Cポートが映像出力に対応しているか確認する方法は？",
            answer:
              "ノートPCの公式仕様でDisplayPort Alt ModeまたはThunderbolt対応をご確認ください。充電やデータ通信のみ対応するUSB-Cポートからは映像を出力できません。",
          },
        ],
      },
      {
        title: "接続・セットアップ",
        items: [
          {
            question: `${model}を接続する方法は？`,
            answer: connectionSummary,
          },
          {
            question: "「信号なし」と表示される場合は？",
            answer:
              "すべてのケーブルを挿し直し、接続ポートが映像出力に対応しているか確認してください。必要に応じてHDMI接続や追加給電、H5 DisplayLink接続をお試しください。",
          },
        ],
      },
      {
        title: "表示・日常使用",
        items: [
          {
            question: "画面が点滅したり消えたりする場合は？",
            answer:
              "給電不足やケーブルの接触不良が主な原因です。付属ケーブルで直接接続し、外部電源を追加して、リフレッシュレートを60Hzに設定してください。",
          },
          {
            question: "拡張表示または複製表示に設定する方法は？",
            answer:
              "Windowsでは「ディスプレイ設定」、Macでは「システム設定」からディスプレイを開き、「拡張」または「ミラーリング」を選択してください。",
          },
        ],
      },
      {
        title: "保証・サポート",
        items: [
          {
            question: "製品が破損している、または正常に動作しない場合は？",
            answer:
              "注文番号、ノートPCの型番、接続方法、症状が分かる写真または動画を添えてサポートへご連絡ください。確認後、最適な解決方法をご案内します。",
          },
          {
            question: "保証期間はどのくらいですか？",
            answer:
              "対象となる製造上の不具合には1年間の保証が付属します。購入記録と注文番号を保管してください。",
          },
        ],
      },
    ],
  };
}

export function localizeHelpArticles(articles: HelpCenterArticle[], lang: Lang) {
  return articles.map((article) => localizeHelpArticle(article, lang));
}
