import a6Product from "@/assets/product-a6-a.jpg";
import s10Product from "@/assets/product-s10pro-a.jpg";

type HelpArticleSection = {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type HelpCenterArticle = {
  slug: string;
  name: string;
  shortName: string;
  image: string;
  heroTitle: string;
  heroBody: string;
  compatibility: string[];
  connectionMethods: string[];
  reminders: string[];
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
    heroTitle: "A6 setup, compatibility, and troubleshooting",
    heroBody:
      "Everything customers need before buying or setting up the AnyKing A6, including compatible laptop types, connection methods, no-signal fixes, display settings, and warranty support.",
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
    reminders: [
      "Confirm the USB-C port supports DisplayPort Alt Mode before using a single-cable setup.",
      "If the screen flickers or turns off, test with direct connection and extra power first.",
      "Use Extend mode for the best multitasking experience.",
    ],
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
    heroTitle: "S10 Pro setup, third-screen fixes, and support",
    heroBody:
      "A guided help article for the AnyKing S10 Pro covering port requirements, three connection methods, third-screen detection issues, brightness and flicker fixes, and warranty support.",
    compatibility: [
      "Works with laptops that have two full-function USB-C ports.",
      "Also works with one full-function USB-C port plus one HDMI port.",
      "Can work with one power-only USB-C port, one USB-A port, and one HDMI port by using the included H5 cable and driver.",
      "Phones and tablets are not recommended because only one screen can work and power is often unstable.",
    ],
    connectionMethods: [
      "Dual USB-C method: connect two full-function USB-C cables directly to the laptop.",
      "USB-C + HDMI method: use USB-C for power and one display signal, then HDMI for the second screen signal.",
      "USB-A + HDMI + H5 method: USB-A provides power, HDMI drives one screen, and the H5 cable with driver activates the extra display signal.",
    ],
    reminders: [
      "When one USB-C port does not support video, keep the working USB-C cable and add HDMI.",
      "If you need the third screen without a video-capable second USB-C port, connect the H5 cable and install its driver.",
      "Avoid hubs or low-quality adapters during initial setup.",
    ],
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
              "The S10 Pro works with most Windows laptops, MacBooks, and Chromebooks under three port configurations: two full-function USB-C ports, one full-function USB-C plus one HDMI port, or one power-only USB-C plus one USB-A and one HDMI port when using the included H5 cable and driver.",
          },
          {
            question: "How do I know if my USB-C port supports video output?",
            answer:
              "Your USB-C port must support DisplayPort Alt Mode to send video to the S10 Pro. If the port supports charging or data only, use HDMI or the H5-based method instead depending on your laptop ports.",
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
              "There are three connection methods: use two full-function USB-C cables, use one full-function USB-C plus one HDMI cable, or use USB-A for power together with HDMI and the included H5 cable for the extra display signal when the laptop lacks a second video-capable USB-C port.",
          },
          {
            question: 'Why is my laptop not detecting the third screen or showing "No Signal"?',
            answer:
              "First, reconnect all cables and ports firmly. If you are using two USB-C cables, one port may not support video, so keep the working USB-C cable and add HDMI. If you are using USB-A power plus HDMI, you still need the included H5 cable and DisplayLink driver to activate the third screen.",
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
];

export function getHelpCenterArticle(slug: string) {
  return helpCenterArticles.find((article) => article.slug === slug);
}
