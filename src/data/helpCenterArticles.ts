import a6Product from "@/assets/product-a6-a.jpg";
import s10Product from "@/assets/product-s10pro-a.jpg";
import p7Product from "@/assets/product-p7-156-main.jpg";
import s15PlusPlaceholder from "@/assets/product-s15-plus-placeholder.svg";

type HelpArticleSection = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

type HelpArticleLink = {
  label: string;
  href: string;
  external?: boolean;
};

type HelpArticleSpec = {
  label: string;
  value: string;
};

type HelpArticleVideo = {
  title: string;
  body: string;
  youtubeId?: string;
  src?: string;
};

export type HelpCenterArticle = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  asin: string;
  amazonUrl: string;
  heroTitle: string;
  heroBody: string;
  connectionVideo?: HelpArticleVideo;
  overview: {
    listingTitle: string;
    designSummary: string;
    highlights: string[];
    productLinks: HelpArticleLink[];
  };
  specifications: HelpArticleSpec[];
  compatibility: string[];
  connectionMethods: string[];
  setup: {
    tutorialTitle: string;
    tutorialBody: string;
    accessories: string[];
    compatibilityNotes: string[];
  };
  reminders: string[];
  downloads: {
    manual: HelpArticleLink;
    firmware: HelpArticleLink;
    note: string;
  };
  support: {
    email: string;
    phone: string;
    whatsapp?: string;
    warranty: string;
  };
  sections: HelpArticleSection[];
};

export const helpCenterArticles: HelpCenterArticle[] = [
  {
    slug: "a6-portable-monitor",
    name: "AnyKing A6 Portable Monitor",
    shortName: "A6 Portable Monitor",
    image: a6Product,
    asin: "B0GJS4XGDJ",
    amazonUrl: "https://www.amazon.com/dp/B0GJS4XGDJ",
    heroTitle: "A6 setup, compatibility, and troubleshooting",
    heroBody:
      "Everything customers need before buying or setting up the AnyKing A6, including compatible laptop types, connection methods, no-signal fixes, display settings, and warranty support.",
    connectionVideo: {
      title: "A6 connection tutorial",
      body: "Watch this setup video first to understand the recommended A6 connection workflow before checking cable requirements or troubleshooting no-signal issues.",
      youtubeId: "theaUO0U5xQ",
    },
    overview: {
      listingTitle:
        "Laptop Screen Extender, 14-inch FHD 1080P Portable Monitor for Laptop with 100% sRGB, Plug-and-Play External Display for 13-17.3 inch laptops.",
      designSummary:
        "The A6 is a single 14-inch portable laptop monitor built for dual-screen work. Its slim travel-ready body combines a carbon-fiber-inspired finish, matte anti-glare panel, integrated kickstand, and ambient ring-light styling for modern desk setups.",
      highlights: [
        "14-inch FHD 1080P IPS display with 100% sRGB, 300 nits brightness, and 60 Hz refresh rate.",
        "Designed for 13-17.3 inch laptops and positioned as a plug-and-play second screen for Windows and macOS.",
        "Single USB-C workflow when the laptop port supports video output, with HDMI plus separate power as fallback.",
        "Travel-friendly form factor focused on coding, analysis, business travel, and home office multitasking.",
      ],
      productLinks: [
        {
          label: "Product purchase page",
          href: "https://www.amazon.com/dp/B0GJS4XGDJ",
          external: true,
        },
        { label: "Product detail page", href: "/products/a6" },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "A6" },
      { label: "ASIN", value: "B0GJS4XGDJ" },
      { label: "Screen size", value: '14"' },
      { label: "Resolution", value: "FHD 1080P, 1920 x 1080" },
      { label: "Display technology", value: "IPS, LED" },
      { label: "Aspect ratio", value: "16:9" },
      { label: "Refresh rate", value: "60 Hz" },
      { label: "Contrast ratio", value: "1000:1" },
      { label: "Screen finish", value: "Matte / anti-glare" },
      { label: "Viewing angle", value: "180 degrees" },
      { label: "Color gamut", value: "100% sRGB" },
      { label: "Picture enhancement", value: "FHD display, blue light filter, anti-glare screen" },
      { label: "Dimensions", value: '13.38" W x 7.87" H x 0.35" D' },
      { label: "Compatible laptop size", value: '13" to 17.3"' },
      {
        label: "Connectivity",
        value: "USB-C for plug-and-play, HDMI plus power for fallback setups",
      },
      { label: "Color", value: "Black" },
      { label: "Warranty", value: "1 Year Manufacturer" },
      { label: "Manufacturer", value: "Shenzhen Baijiayoupu Technology Co., Ltd" },
    ],
    compatibility: [
      "Works with laptops that have a full-function USB-C port with video output.",
      "Also works with laptops that use HDMI for video plus USB-A or USB-C for power.",
      "USB-A alone cannot send video to the A6.",
      "Phones and tablets may work only when they have a full-function USB-C port, but we do not recommend them because power is often unstable.",
    ],
    connectionMethods: [
      "Single-cable method: connect the laptop and A6 with one full-function USB-C cable.",
      "HDMI method: use HDMI for video and a USB-A or USB-C cable for power.",
      "For best stability, connect directly to the laptop instead of using a hub, dock, or splitter.",
    ],
    setup: {
      tutorialTitle: "Plug-and-play A6 setup",
      tutorialBody:
        "A6 is designed as a quick second-screen setup for productivity. If your USB-C port supports video output, a single cable can handle signal and power. If not, switch to HDMI for video and add a separate USB power connection.",
      accessories: [
        "A6 portable monitor body",
        "USB-C connection cable",
        "HDMI connection workflow for fallback laptop setups",
        "Integrated kickstand for desk use and travel deployment",
      ],
      compatibilityNotes: [
        "Best fit is for laptops from 13 to 17.3 inches.",
        "Windows and macOS are the primary supported workflows.",
        "No driver is expected for the standard A6 plug-and-play setup.",
      ],
    },
    reminders: [
      "Confirm the USB-C port supports DisplayPort Alt Mode before using a single-cable setup.",
      "If the screen flickers or turns off, test with direct connection and extra power first.",
      "Use Extend mode for the best multitasking experience.",
    ],
    downloads: {
      manual: {
        label: "Download A6 User Manual",
        href: "/manuals/A6_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request firmware support",
        href: "mailto:service@anykingscreen.com?subject=A6%20Firmware%20Support",
      },
      note: "The A6 User Manual is now available for direct download. For firmware support, please contact our service team.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      whatsapp: "+1 (657) 395-7180",
      warranty: "1-year warranty",
    },
    sections: [
      {
        title: "Compatibility & Before You Buy",
        items: [
          {
            question: "What laptop models are compatible with the AnyKing A6?",
            answer:
              "There are two compatible situations for laptops: laptops equipped with a full-function Type-C port, and laptops with both USB-A and HDMI ports. This covers most Windows laptops, MacBooks, and Chromebooks.",
          },
          {
            question: "How do I know if my laptop USB-C port supports video output?",
            answer:
              "The USB-C port must support DisplayPort Alt Mode to send video to the A6. Some USB-C ports support charging or data only. Check your laptop manual or specs. If the port does not support video, use the HDMI connection method instead.",
          },
          {
            question: "Can I use the AnyKing A6 with a USB-A only port?",
            answer:
              "No. USB-A cannot transmit video to the A6. It can only provide power. For video output, use a video-capable USB-C port or a standard HDMI connection.",
          },
          {
            question: "Can I use the A6 with a docking station or USB hub?",
            answer:
              "We do not recommend it. Hubs and docks can cause unstable signal transmission, insufficient power, flickering, or the screen not being detected. Direct connection to the laptop is best.",
          },
        ],
      },
      {
        title: "Connection & Setup",
        items: [
          {
            question: "How do I set up the AnyKing A6?",
            answer:
              "There are two connection methods: use one full-function USB-C cable for video and power, or use USB-A for power together with HDMI for video. The HDMI method is recommended when the laptop USB-C port does not support video output.",
          },
          {
            question: 'Why does my A6 screen show "No Signal"?',
            answer:
              "Common reasons are that the connected port does not support video output, the cable is loose, or the wrong connection method is being used. Reconnect all cables firmly, confirm whether the USB-C port supports video, switch to HDMI when needed, and make sure the A6 receives enough power.",
          },
        ],
      },
      {
        title: "Power, Display, and Daily Use",
        items: [
          {
            question: "Why is the screen flickering or turning off?",
            answer:
              "This is usually caused by insufficient power, unstable connection, or a low-quality hub or adapter. Connect external power, reconnect all cables securely, avoid hubs or splitters, and lower brightness to test stability.",
          },
          {
            question: "How do I set extended or duplicate display mode?",
            answer:
              "Open your laptop display settings and choose Extend, Duplicate, or Second Screen Only. For the best multitasking experience, choose Extend mode and drag the screen layout to match your physical setup.",
          },
          {
            question: "How do I rotate the screen to portrait mode?",
            answer:
              "Open your computer display settings, select the A6 screen, and choose the landscape or portrait orientation you want.",
          },
          {
            question: "Why is the screen dim or not bright enough?",
            answer:
              "Low brightness usually comes from insufficient power or low screen brightness settings. Use the included power cable, avoid low-power USB ports, and adjust brightness using the monitor controls.",
          },
          {
            question: "Why do the colors or resolution look different from the laptop screen?",
            answer:
              "Portable external screens can look slightly different from a built-in laptop display because of panel and system color differences. Confirm the recommended resolution in Display Settings and adjust brightness, contrast, and color settings if needed.",
          },
          {
            question: "What are the unfolding and tilt adjustment ranges?",
            answer:
              "The horizontal unfolding angle is 180 degrees, and the tilt adjustment angle is 90 degrees.",
          },
          {
            question: "Is mild heating normal during operation?",
            answer:
              "Yes. Slight warmth is normal during extended multi-screen use. Keep the vents uncovered and use the screen extender in a well-ventilated area.",
          },
          {
            question: "Can I close my laptop while using the screen extender?",
            answer:
              "Yes, if your laptop supports clamshell mode. Some laptops also require external power, keyboard, and mouse depending on system settings.",
          },
        ],
      },
      {
        title: "Warranty & Support",
        items: [
          {
            question: "What should I do if the monitor arrives damaged or does not work properly?",
            answer:
              "Contact support with your order number, laptop model, photos or video of the issue, and your connection method. We will help troubleshoot and provide a replacement solution if the product is confirmed defective.",
          },
          {
            question: "Does the AnyKing A6 have built-in speakers?",
            answer:
              "Yes. The A6 includes built-in speakers, but for better sound quality we recommend using laptop speakers, headphones, or other audio devices.",
          },
          {
            question: "What is the warranty period?",
            answer: "The AnyKing A6 includes a 1-year warranty.",
          },
        ],
      },
    ],
  },
  {
    slug: "s10-pro-extender",
    name: "AnyKing S10 Pro Extender",
    shortName: "S10 Pro Extender",
    image: s10Product,
    asin: "B0GJSXHDCG",
    amazonUrl: "https://www.amazon.com/dp/B0GJSXHDCG",
    heroTitle: "S10 Pro setup, third-screen fixes, and support",
    heroBody:
      "A guided help article for the AnyKing S10 Pro covering port requirements, connection methods, third-screen detection issues, brightness and flicker fixes, and warranty support.",
    connectionVideo: {
      title: "S10 Pro connection tutorial",
      body: "Watch this setup video first to see the recommended cable workflow before checking specs or troubleshooting steps.",
      youtubeId: "00AuHJqtL6o",
    },
    overview: {
      listingTitle:
        "Laptop Screen Extender, Triple Screen Laptop Monitor Extender for 13-17.3 inch laptops, 14-inch 1080P FHD IPS portable monitor with 100% sRGB, plug-and-play extension for travel, coding, and work.",
      designSummary:
        "The S10 Pro is a triple-screen laptop extender with two attached 14-inch side displays. It uses a travel-friendly folding structure, adjustable kickstand, eye-care matte IPS panels, and supports extend, mirror, and portrait workflows.",
      highlights: [
        "Dual 14-inch FHD 1080P IPS side panels for a full triple-screen workstation.",
        "100% sRGB, 300 nits brightness, matte finish, and low blue light eye-care design.",
        "Fits laptops from 13 to 17.3 inches and targets business travel, coding, presentations, and multitasking.",
        "Base M1/M2 MacBooks, base M3 MacBooks with the lid open, and MacBook Neo support only one native external display, so both S10 Pro side screens require the H5 DisplayLink workflow. M4/M5 MacBooks can support two native external displays with the lid open, subject to the exact model specification.",
      ],
      productLinks: [
        {
          label: "Product purchase page",
          href: "https://www.amazon.com/dp/B0GJSXHDCG",
          external: true,
        },
        { label: "Product detail page", href: "/products/s10-pro" },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "S10 Pro" },
      { label: "ASIN", value: "B0GJSXHDCG" },
      { label: "Screen size", value: '14" x 2 side displays' },
      { label: "Resolution", value: "FHD 1080P, 1920 x 1080" },
      { label: "Display technology", value: "IPS, LED" },
      { label: "Aspect ratio", value: "16:9" },
      { label: "Refresh rate", value: "60 Hz" },
      { label: "Contrast ratio", value: "1000:1" },
      { label: "Screen finish", value: "Matte / anti-glare" },
      { label: "Picture enhancement", value: "Eye care, color enhancement" },
      { label: "Dimensions", value: '13.2" W x 8" H x 1.05" D' },
      { label: "Compatible laptop size", value: '13" to 17.3"' },
      {
        label: "Connection paths",
        value: "USB-C workflow plus HDMI-assisted compatibility options",
      },
      { label: "HDMI ports", value: "1 HDMI output" },
      { label: "Response time", value: "0.1 ms" },
      { label: "Color", value: "Yellow variant" },
      { label: "Warranty", value: "1 Year Manufacturer" },
      { label: "Manufacturer", value: "Shenzhen Baijiayoupu Technology Co., Ltd" },
    ],
    compatibility: [
      "Native triple-screen use requires the laptop GPU to support the internal display plus two external displays and to expose two independent video-output paths.",
      "Direct connection can use two video-capable USB-C outputs, or one video-capable USB-C output plus one HDMI output.",
      "If the laptop supports only one native external display, both S10 Pro side screens require the H5 DisplayLink adapter or another compatible DisplayLink device.",
      "USB-C shape, charging, SS, 5Gbps, or USB4 labeling alone does not prove that two independent displays are supported.",
      "Phones and tablets are not recommended because only one screen can work and power is often unstable.",
    ],
    connectionMethods: [
      "Dual USB-C method: connect two independent video-capable USB-C outputs directly to the laptop.",
      "USB-C + HDMI method: use one video-capable USB-C output for one screen and HDMI-to-Type-C for the other screen.",
      "Limited-output method: install the H5 DisplayLink adapter and driver when the laptop cannot output two external displays natively.",
    ],
    setup: {
      tutorialTitle: "Triple-screen setup workflow",
      tutorialBody:
        "S10 Pro is designed as a flexible portable workstation for 13-17.3 inch laptops. Native use requires two independent video signals while the laptop screen remains on. Verify the full model or SKU, GPU display limit, port capabilities, cables, and power before purchase. Laptops limited to one native external display require the H5 DisplayLink workflow for both side screens.",
      accessories: [
        "S10 Pro triple-screen main body with two side displays",
        "Adjustable kickstand structure",
        "USB-C signal and power workflow",
        "HDMI-assisted fallback workflow for broader compatibility",
      ],
      compatibilityNotes: [
        "Compatibility must be assessed by exact model, SKU, part number, or MTM because ports can differ inside the same laptop series.",
        "Avoid hubs during first setup unless the verified result specifically requires a Thunderbolt/USB4 dock or H5 DisplayLink device.",
        "Official-spec support is not the same as per-device testing; BIOS, regional SKU, cables, drivers, and power can affect the result.",
      ],
    },
    reminders: [
      "When one USB-C port does not support video, keep the working USB-C cable and add HDMI.",
      "If you need dual side screens on a limited-output laptop, confirm the H5 DisplayLink path with support before buying extra accessories.",
      "Avoid hubs or low-quality adapters during initial setup.",
    ],
    downloads: {
      manual: {
        label: "Download S10 Pro User Manual",
        href: "/manuals/S10_Pro_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request firmware support",
        href: "mailto:service@anykingscreen.com?subject=S10%20Pro%20Firmware%20Support",
      },
      note: "The S10 Pro User Manual is now available for direct download. For firmware or adapter guidance, please contact our support team.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "1-year warranty",
    },
    sections: [
      {
        title: "Compatibility & Before You Buy",
        items: [
          {
            question: "What laptop models are compatible with the AnyKing S10 Pro?",
            answer:
              "Use the Compatibility page and enter the full laptop model or SKU. Native triple-screen use requires support for the laptop screen plus two external displays and two independent video paths: two video-capable USB-C outputs, or one video-capable USB-C output plus HDMI. A series name alone is not enough because ports can vary by SKU.",
          },
          {
            question: "How do I know if my USB-C port supports video output?",
            answer:
              "A USB-C port must support video output such as DisplayPort Alt Mode, Thunderbolt, or an explicitly documented display output. USB-C shape, charging, SS, 5Gbps, and even the USB4 name alone do not prove that the laptop can drive two independent displays. Check the full model specification or use the Compatibility page.",
          },
          {
            question: "Does the S10 Pro work with phones or tablets?",
            answer:
              "It works only with devices that have a full-function USB-C port, and only one screen can be used. We do not recommend it because mobile devices often do not provide enough power for stable use.",
          },
        ],
      },
      {
        title: "Connection & Setup",
        items: [
          {
            question: "How do I set up the AnyKing S10 Pro?",
            answer:
              "If the laptop provides two independent video signals, use two video-capable USB-C outputs or one USB-C video output plus HDMI-to-Type-C. If it supports only one native external display, install the H5 DisplayLink adapter and driver. Add 5V/2A power if brightness is low or either screen restarts.",
          },
          {
            question: 'Why is my laptop not detecting the third screen or showing "No Signal"?',
            answer:
              "Test each side separately, swap the cables, and add 5V/2A power. If both screens work individually but only one works at a time, the laptop may expose only one independent native video path. Check the exact model result above; limited-output models require the H5 DisplayLink adapter and driver for two independent side screens.",
          },
        ],
      },
      {
        title: "Power, Display, and Daily Use",
        items: [
          {
            question: "Why is the screen flickering or turning off?",
            answer:
              "This is usually caused by insufficient power, unstable connection, or a low-quality hub or adapter. Connect external power, reconnect all cables securely, avoid hubs or splitters, and lower brightness to test stability.",
          },
          {
            question: "How do I set extended or duplicate display mode?",
            answer:
              "Go to your laptop display settings and choose Extend, Duplicate, or Second Screen Only. Extend mode is recommended for the best productivity setup.",
          },
          {
            question: "How do I rotate the screen to portrait mode?",
            answer:
              "Open display settings on your computer, select the target screen, and switch it to portrait or landscape orientation.",
          },
          {
            question: "Why is the screen dim or not bright enough?",
            answer:
              "Low brightness can be caused by insufficient power or screen settings. Use the included power cable, avoid low-power ports, and raise the brightness from the monitor controls.",
          },
          {
            question: "Why do the colors or resolution look different from the laptop screen?",
            answer:
              "This usually comes from panel differences and system color settings. Confirm the recommended resolution and adjust brightness, contrast, and color settings if needed.",
          },
          {
            question: "What are the unfolding and tilt adjustment ranges?",
            answer:
              "The horizontal unfolding angle is 180 degrees, and the tilt adjustment range is 90 degrees.",
          },
          {
            question: "Is mild heating normal during operation?",
            answer:
              "Yes. Slight warmth is normal during extended multi-screen use. Keep vents clear and use the S10 Pro in a well-ventilated environment.",
          },
          {
            question: "Can I close my laptop while using the S10 Pro?",
            answer:
              "Yes, if your laptop supports clamshell mode. You may also need external power, keyboard, and mouse depending on your laptop settings.",
          },
        ],
      },
      {
        title: "Warranty & Support",
        items: [
          {
            question: "What should I do if the monitor arrives damaged or does not work properly?",
            answer:
              "Please contact support with your order number, laptop model, photos or video of the problem, and a description of the connection method. We will help troubleshoot and provide a replacement solution if the product is confirmed defective.",
          },
          {
            question: "Does the AnyKing S10 Pro have built-in speakers?",
            answer:
              "Yes. The S10 Pro has built-in speakers, but for better audio quality we recommend using laptop speakers, headphones, or another external audio device.",
          },
          {
            question: "What is the warranty period?",
            answer: "The AnyKing S10 Pro includes a 1-year warranty.",
          },
        ],
      },
    ],
  },
  {
    slug: "p7-156-extender",
    name: 'AnyKing P7 15.6" Extender',
    shortName: 'P7 15.6" Extender',
    image: p7Product,
    asin: "B0H25VMK6H",
    amazonUrl: "https://www.amazon.com/dp/B0H25VMK6H",
    heroTitle: "P7 setup, triple-screen compatibility, and support",
    heroBody:
      "Everything customers need before buying or setting up the AnyKing P7 15.6-inch laptop screen extender, including laptop fit, two-side-screen output requirements, connection methods, modes, and support.",
    connectionVideo: {
      title: "P7 connection tutorial",
      body: "Watch this setup video first to understand the recommended P7 cable workflow before checking compatibility details or troubleshooting display signal issues.",
      youtubeId: "RR-CwA9Xq6M",
    },
    overview: {
      listingTitle:
        "Laptop Screen Extender, 15.6-inch FHD 1080P IPS Triple Screen Laptop Monitor Extender for 13-17.3 inch laptops, 100% sRGB portable dual monitor extender for meetings, spreadsheets, coding, travel, and work.",
      designSummary:
        "The P7 is a larger 15.6-inch dual-side laptop screen extender for users who want more workspace than a standard 14-inch setup. It combines two FHD IPS side panels, a folding rear support structure, adjustable side screens, and a travel bag-friendly body for desk, office, and mobile workflows.",
      highlights: [
        "Dual 15.6-inch FHD 1080P IPS side panels create a spacious triple-screen workstation.",
        "100% sRGB, 300 nits brightness, 1000:1 contrast, 16:9 aspect ratio, and low blue light support for clearer daily work.",
        "Fits 13-17.3 inch laptops, with a rear grip range designed for roughly 11.8-15 inch laptop screen widths.",
        "Supports mirror, extend, and portrait workflows for spreadsheets, meetings, coding, gaming, presentations, and multitasking.",
        "Base M1/M2 MacBooks, base M3 MacBooks with the lid open, and MacBook Neo support only one native external display, so both P7 side screens require the H5 DisplayLink workflow. M4/M5 MacBooks can support two native external displays with the lid open, subject to the exact model specification.",
      ],
      productLinks: [
        {
          label: "Product purchase page",
          href: "https://www.amazon.com/dp/B0H25VMK6H",
          external: true,
        },
        { label: "Product detail page", href: "/products/p7-156-extender" },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "P7" },
      { label: "ASIN", value: "B0H25VMK6H" },
      { label: "Screen size", value: '15.6" x 2 side displays' },
      { label: "Resolution", value: "FHD 1080P, 1920 x 1080" },
      { label: "Display technology", value: "IPS, LED" },
      { label: "Aspect ratio", value: "16:9" },
      { label: "Refresh rate", value: "60 Hz" },
      { label: "Brightness", value: "300 nits" },
      { label: "Contrast ratio", value: "1000:1" },
      { label: "Color gamut", value: "100% sRGB" },
      { label: "Color depth", value: "16.7 million colors" },
      { label: "Screen finish", value: "Matte / low blue light" },
      { label: "Compatible laptop size", value: '13" to 17.3"' },
      { label: "Laptop grip range", value: '11.8" to 15"' },
      {
        label: "Viewing adjustment",
        value: "180-degree adjustable side screens, 90-degree tilt stand",
      },
      { label: "Weight", value: "3.9 lbs" },
      {
        label: "Connection paths",
        value: "USB-C workflow plus HDMI-assisted compatibility options",
      },
      { label: "Color", value: "Black" },
      { label: "Warranty", value: "1 Year Manufacturer" },
    ],
    compatibility: [
      "Native triple-screen use requires the laptop GPU to support the internal display plus two external displays and to expose two independent video-output paths.",
      "Direct connection can use two video-capable USB-C outputs, or one video-capable USB-C output plus one HDMI output.",
      "If the laptop supports only one native external display, both P7 side screens require the H5 DisplayLink adapter or another compatible DisplayLink device.",
      "USB-C shape, charging, SS, 5Gbps, or USB4 labeling alone does not prove that two independent displays are supported.",
      "Best fit is for 13-17.3 inch laptops with enough rear screen width for the extender grip.",
    ],
    connectionMethods: [
      "Dual USB-C method: connect two independent video-capable USB-C outputs directly to the laptop.",
      "USB-C + HDMI method: use one video-capable USB-C output for one screen and HDMI-to-Type-C for the other screen.",
      "Limited-output method: install the H5 DisplayLink adapter and driver when the laptop cannot output two external displays natively.",
      "Mirror mode duplicates your laptop screen, Extend mode creates more workspace, and Portrait mode can be used for vertical documents or dashboards.",
    ],
    setup: {
      tutorialTitle: "P7 triple-screen setup workflow",
      tutorialBody:
        "Open the rear grip, attach the P7, and unfold both 15.6-inch side panels. Native use requires two independent video signals while the laptop screen remains on. Verify the full model or SKU, GPU display limit, port capabilities, cables, and power before purchase. Limited-output laptops require the H5 DisplayLink workflow for both side screens.",
      accessories: [
        "P7 triple-screen main body with two 15.6-inch side displays",
        "Rear grip and adjustable support stand",
        "USB-C signal and power workflow",
        "HDMI-assisted workflow for broader laptop compatibility",
        "Travel bag for carrying the larger screen extender",
      ],
      compatibilityNotes: [
        "Compatibility must be assessed by exact model, SKU, part number, or MTM because ports can differ inside the same laptop series.",
        "Avoid hubs during first setup unless the verified result specifically requires a Thunderbolt/USB4 dock or H5 DisplayLink device.",
        "Official-spec support is not the same as per-device testing; BIOS, regional SKU, cables, drivers, and power can affect the result.",
      ],
    },
    reminders: [
      "Use the Compatibility page and confirm the exact laptop SKU before purchase.",
      "If you need both side screens on a limited-output laptop, confirm the H5 DisplayLink path with support before buying extra accessories.",
      "Use Extend mode to get the full productivity benefit of the dual side screens.",
    ],
    downloads: {
      manual: {
        label: "Download P7 Pro User Manual",
        href: "/manuals/P7_Pro_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request firmware support",
        href: "mailto:service@anykingscreen.com?subject=P7%2015.6%20Firmware%20Support",
      },
      note: "The P7 Pro User Manual is now available for direct download. For the older P7 model, you can download the [P7 standard manual](/manuals/P7_User_Manual.pdf). For firmware support, please contact us.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "1-year warranty",
    },
    sections: [
      {
        title: "Compatibility & Before You Buy",
        items: [
          {
            question: "What laptop models are compatible with the AnyKing P7?",
            answer:
              "Use the Compatibility page and enter the full laptop model or SKU. Native triple-screen use requires support for the laptop screen plus two external displays and two independent video paths: two video-capable USB-C outputs, or one video-capable USB-C output plus HDMI. A series name alone is not enough because ports can vary by SKU.",
          },
          {
            question: "Will the P7 work with my MacBook?",
            answer:
              "Base M1/M2 MacBooks, base M3 MacBooks with the lid open, and MacBook Neo support only one native external display, so both P7 side screens require the H5 DisplayLink adapter and driver. M4/M5 MacBooks can support two native external displays with the lid open, subject to the exact model specification.",
          },
          {
            question: "Can I use the P7 with consoles, phones, or tablets?",
            answer:
              "Some devices can work when they provide a compatible HDMI or full-function USB-C video output, but laptops are the primary recommended workflow. Mobile devices may require extra power and may not support both screens.",
          },
        ],
      },
      {
        title: "Connection & Setup",
        items: [
          {
            question: "How do I set up the AnyKing P7?",
            answer:
              "Attach the rear grip and unfold both side screens. If the laptop provides two independent video signals, use two video-capable USB-C outputs or one USB-C video output plus HDMI-to-Type-C. If it supports only one native external display, install the H5 DisplayLink adapter and driver. Then choose Extend, Mirror, or Portrait mode in display settings.",
          },
          {
            question: 'Why does one screen show "No Signal"?',
            answer:
              "Test each side separately, swap the cables, and add external power. If both screens work individually but only one works at a time, the laptop may expose only one independent native video path. Check the exact model result above; limited-output models require the H5 DisplayLink adapter and driver for two independent side screens.",
          },
        ],
      },
      {
        title: "Power, Display, and Daily Use",
        items: [
          {
            question: "Why is the screen flickering or turning off?",
            answer:
              "Flicker is usually caused by insufficient power, an unstable cable, or a weak adapter. Connect directly, add external power, lower brightness for testing, and confirm the cable supports video.",
          },
          {
            question: "Which display mode should I use?",
            answer:
              "Extend mode is best for multitasking. Mirror mode is useful for presentations, and Portrait mode is helpful for long documents, chat, dashboards, or coding side panels.",
          },
          {
            question: "Is the P7 too large for travel?",
            answer:
              "The P7 is larger than the 14-inch models because it uses dual 15.6-inch side screens, but it is still designed as a foldable portable extender and includes a travel bag workflow.",
          },
        ],
      },
      {
        title: "Warranty & Support",
        items: [
          {
            question: "What should I send support if I need help?",
            answer:
              "Please send your order number, laptop model, operating system, connection method, and a short video or photo of the issue so support can identify whether it is a cable, power, port, or adapter problem.",
          },
          {
            question: "What is the warranty period?",
            answer: "The AnyKing P7 includes a 1-year warranty.",
          },
        ],
      },
    ],
  },
  {
    slug: "s15-plus-extender",
    name: "AnyKing S15 Plus",
    shortName: "S15 Plus",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "S15 Plus setup video and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing S15 Plus. The connection tutorial is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    connectionVideo: {
      title: "S15 Plus connection tutorial",
      body: "Watch this setup video first. Full S15 Plus product details are reserved and will be completed after the final product information is added.",
      youtubeId: "H87DfRJeQXE",
    },
    overview: {
      listingTitle: "S15 Plus product information will be added soon.",
      designSummary:
        "S15 Plus is reserved in the Help Center so customers can access the connection tutorial first. Detailed product copy, images, specifications, and compatibility guidance will be completed later.",
      highlights: [
        "Connection tutorial is available now.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for S15 Plus",
          href: "mailto:service@anykingscreen.com?subject=S15%20Plus%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "S15 Plus" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final S15 Plus product information is confirmed.",
      "For now, watch the setup tutorial and contact support with your laptop model if you need help.",
    ],
    connectionMethods: [
      "Watch the connection tutorial at the top of this article first.",
      "Detailed cable workflows will be updated when final S15 Plus documentation is available.",
    ],
    setup: {
      tutorialTitle: "S15 Plus setup workflow",
      tutorialBody:
        "S15 Plus setup details are reserved for the final documentation. The video above is the primary setup reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download S15 Plus User Manual",
        href: "/manuals/S15_Plus_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request S15 Plus firmware support",
        href: "mailto:service@anykingscreen.com?subject=S15%20Plus%20Firmware%20Support",
      },
      note: "The S15 Plus User Manual is now available for direct download. Detailed specifications will be updated when final product information is ready.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will S15 Plus product details be added?",
            answer:
              "This article is currently reserved for S15 Plus. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
  {
    slug: "f4-extender",
    name: "AnyKing F4 Extender",
    shortName: "F4 Extender",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "F4 setup and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing F4. The user manual is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    overview: {
      listingTitle: "F4 product information will be added soon.",
      designSummary:
        "The F4 is a magnetic, multi-function, plug-and-play dual-screen laptop monitor. Detailed product copy, images, and compatibility guidance will be completed later.",
      highlights: [
        "F4 User Manual is available for download.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for F4",
          href: "mailto:service@anykingscreen.com?subject=F4%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "F4" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final F4 product information is confirmed.",
      "For now, download the manual and contact support with your laptop model if you need help.",
    ],
    connectionMethods: [
      "Detailed cable workflows will be updated when final F4 documentation is available.",
      "Please refer to the F4 User Manual for setup instructions.",
    ],
    setup: {
      tutorialTitle: "F4 setup workflow",
      tutorialBody:
        "F4 setup details are reserved for the final documentation. The manual below is the primary reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download F4 User Manual",
        href: "/manuals/F4_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request F4 firmware support",
        href: "mailto:service@anykingscreen.com?subject=F4%20Firmware%20Support",
      },
      note: "The F4 User Manual is now available for direct download. For firmware or setup questions, contact support.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will F4 product details be added?",
            answer:
              "This article is currently reserved for the AnyKing F4. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
  {
    slug: "m5-extender",
    name: "AnyKing M5",
    shortName: "M5 Extender",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "M5 setup and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing M5. The user manual is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    overview: {
      listingTitle: "M5 product information will be added soon.",
      designSummary:
        "The M5 is a portable laptop monitor. Detailed product copy, images, and compatibility guidance will be completed later.",
      highlights: [
        "M5 User Manual is available for download.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for M5",
          href: "mailto:service@anykingscreen.com?subject=M5%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "M5" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final M5 product information is confirmed.",
    ],
    connectionMethods: ["Please refer to the M5 User Manual for setup instructions."],
    setup: {
      tutorialTitle: "M5 setup workflow",
      tutorialBody:
        "M5 setup details are reserved for the final documentation. The manual below is the primary reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download M5 User Manual",
        href: "/manuals/M5_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request M5 firmware support",
        href: "mailto:service@anykingscreen.com?subject=M5%20Firmware%20Support",
      },
      note: "The M5 User Manual is now available for direct download. For firmware or setup questions, contact support.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will M5 product details be added?",
            answer:
              "This article is currently reserved for the AnyKing M5. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
  {
    slug: "s12-extender",
    name: "AnyKing S12",
    shortName: "S12 Extender",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "S12 setup and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing S12. The user manual is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    overview: {
      listingTitle: "S12 product information will be added soon.",
      designSummary:
        "The S12 is a portable laptop screen extender. Detailed product copy, images, and compatibility guidance will be completed later.",
      highlights: [
        "S12 User Manual is available for download.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for S12",
          href: "mailto:service@anykingscreen.com?subject=S12%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "S12" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final S12 product information is confirmed.",
    ],
    connectionMethods: ["Please refer to the S12 User Manual for setup instructions."],
    setup: {
      tutorialTitle: "S12 setup workflow",
      tutorialBody:
        "S12 setup details are reserved for the final documentation. The manual below is the primary reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download S12 User Manual",
        href: "/manuals/S12_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request S12 firmware support",
        href: "mailto:service@anykingscreen.com?subject=S12%20Firmware%20Support",
      },
      note: "The S12 User Manual is now available for direct download. For firmware or setup questions, contact support.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will S12 product details be added?",
            answer:
              "This article is currently reserved for the AnyKing S12. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
  {
    slug: "s13-extender",
    name: "AnyKing S13",
    shortName: "S13 Extender",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "S13 setup and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing S13. The user manual is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    overview: {
      listingTitle: "S13 product information will be added soon.",
      designSummary:
        "The S13 is a portable laptop screen extender. Detailed product copy, images, and compatibility guidance will be completed later.",
      highlights: [
        "S13 User Manual is available for download.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for S13",
          href: "mailto:service@anykingscreen.com?subject=S13%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "S13" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final S13 product information is confirmed.",
    ],
    connectionMethods: ["Please refer to the S13 User Manual for setup instructions."],
    setup: {
      tutorialTitle: "S13 setup workflow",
      tutorialBody:
        "S13 setup details are reserved for the final documentation. The manual below is the primary reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download S13 User Manual",
        href: "/manuals/S13_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request S13 firmware support",
        href: "mailto:service@anykingscreen.com?subject=S13%20Firmware%20Support",
      },
      note: "The S13 User Manual is now available for direct download. For firmware or setup questions, contact support.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will S13 product details be added?",
            answer:
              "This article is currently reserved for the AnyKing S13. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
  {
    slug: "z3-extender",
    name: "AnyKing Z3",
    shortName: "Z3 Extender",
    image: s15PlusPlaceholder,
    asin: "TBD",
    amazonUrl: "#",
    heroTitle: "Z3 setup and coming-soon guide",
    heroBody:
      "A placeholder help article for the AnyKing Z3. The user manual is available now; product specs, compatibility notes, and purchase links will be added when final product information is ready.",
    overview: {
      listingTitle: "Z3 product information will be added soon.",
      designSummary:
        "The Z3 is a portable laptop screen extender. Detailed product copy, images, and compatibility guidance will be completed later.",
      highlights: [
        "Z3 User Manual is available for download.",
        "Product specifications are pending final confirmation.",
        "Compatibility notes and accessories will be updated after product details are provided.",
      ],
      productLinks: [
        {
          label: "Contact support for Z3",
          href: "mailto:service@anykingscreen.com?subject=Z3%20Support",
        },
      ],
    },
    specifications: [
      { label: "Brand", value: "Anyking" },
      { label: "Model", value: "Z3" },
      { label: "ASIN", value: "TBD" },
      { label: "Status", value: "Product details pending" },
    ],
    compatibility: [
      "Compatibility guidance will be added after final Z3 product information is confirmed.",
    ],
    connectionMethods: ["Please refer to the Z3 User Manual for setup instructions."],
    setup: {
      tutorialTitle: "Z3 setup workflow",
      tutorialBody:
        "Z3 setup details are reserved for the final documentation. The manual below is the primary reference for now.",
      accessories: ["Accessory list pending final product information."],
      compatibilityNotes: ["Compatibility notes pending final product information."],
    },
    reminders: [
      "This is a reserved article. Product specifications and purchase links will be completed later.",
    ],
    downloads: {
      manual: {
        label: "Download Z3 User Manual",
        href: "/manuals/Z3_User_Manual.pdf",
        external: true,
      },
      firmware: {
        label: "Request Z3 firmware support",
        href: "mailto:service@anykingscreen.com?subject=Z3%20Firmware%20Support",
      },
      note: "The Z3 User Manual is now available for direct download. For firmware or setup questions, contact support.",
    },
    support: {
      email: "service@anykingscreen.com",
      phone: "+1 (888) 688-5025",
      warranty: "Warranty details pending",
    },
    sections: [
      {
        title: "Coming Soon",
        items: [
          {
            question: "When will Z3 product details be added?",
            answer:
              "This article is currently reserved for the AnyKing Z3. Product images, specifications, compatibility notes, and purchase links will be added after the final product information is provided.",
          },
        ],
      },
    ],
  },
];

export function getHelpCenterArticle(slug: string) {
  return helpCenterArticles.find((article) => article.slug === slug);
}
