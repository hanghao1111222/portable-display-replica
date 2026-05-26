export type Review = {
  name: string;
  title: string;
  body: string;
  stars: number;
  product: string;
  date: string;
};

// Source: B0GJS4XGDJ-US-Reviews — real Amazon US customer reviews.
export const reviews: Review[] = [
  {
    name: "Ernest Carnegie",
    title: "Boosted My Workflow Instantly",
    body: "This laptop screen extender exceeded my expectations. The display is smooth and clear, and the colors are surprisingly accurate thanks to the 100% sRGB support. I use it daily for schoolwork, research, and streaming videos during breaks. It works perfectly with my 14” laptop and feels sturdy without being bulky. Setup was plug-and-play with no issues at all. Definitely a five-star product.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-18",
  },
  {
    name: "Lisa F.",
    title: "Works great!",
    body: "I really love my extension screen. It lets me fit in my recliner and use my lap desk and still have two screens, which is so nice. It’s not heavy, and it clips securely on the back of my laptop screen.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-16",
  },
  {
    name: "Kervenson",
    title: "Laptop screen extender",
    body: "Product looks good so far and I’m looking forward on working with it, I might even upgrade to two screen in the future.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-15",
  },
  {
    name: "Breanna",
    title: "Lightweight",
    body: "This is very lightweight and connects to my laptop well! I love it so far!",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-14",
  },
  {
    name: "Marry",
    title: "Exceeded expectations — well worth the purchase",
    body: "This portable monitor exceeded my expectations. The display is bright, sharp, and the colors look amazing with the 100% sRGB support. Setup was incredibly easy with the plug-and-play feature, and it works perfectly with my laptop for multitasking and travel. The screen size is ideal for work, gaming, and streaming. It feels lightweight yet sturdy, making it convenient to carry anywhere.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-14",
  },
  {
    name: "D. Hoang",
    title: "Works well — check your system first",
    body: "Love it! I had to add a few accessories just to make it work for my laptops since I don't have all of the required USB-Cs. However, once done, the screens work nicely. These are 14 in. I wish there were 17 in also available.",
    stars: 5,
    product: "Anyking S10 Pro",
    date: "2026-05-10",
  },
  {
    name: "NostromO",
    title: "Left or right side?",
    body: "First impressions: it works well. My laptop does have a USB-C port, but it does not support video output through USB-C, so HDMI works fine for me. Just one thing: if you want to use this on the left side, you may not be able to — the screen-protector clip only opens to the left side, so your screen has to be on the right.",
    stars: 4,
    product: "Anyking A6",
    date: "2026-05-10",
  },
  {
    name: "Orcatrainer",
    title: "A productivity tool for the modern professional",
    body: "The 1080P IPS display is impressively sharp for a portable unit. With 100% sRGB coverage the colors are punchy and accurate. The “Plug and Play” claim isn't just marketing — on my laptop, a single USB-C cable handled both power and video. At just 1.9 lbs, it doesn't make my laptop bag feel like a workout. If your work involves data analysis, coding, or managing multiple streams, the A6 isn't just an accessory, it's a necessity.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-07",
  },
  {
    name: "Rudy",
    title: "Best addition to my mobile office",
    body: "This thing is seriously impressive. I have another unit that cost just under $400 and honestly it doesn’t compare — the image quality isn’t as clear and I’ve had constant issues with the cables. This one is sturdy, crystal clear, and truly plug-and-play. My other device took nearly two hours to get working with my Dell laptop, while this one was ready in minutes.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-05",
  },
  {
    name: "Tee J",
    title: "Wow, I'm impressed!",
    body: "I have been looking for an additional screen to use while traveling, as I need the extra screen space for the work I do. This device is extremely helpful when I need to work away from home or off-site. It was very easy to set up; I just recommend going into your display settings to adjust the configuration to your preference.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-02",
  },
  {
    name: "Elvis",
    title: "Best addition to my laptop",
    body: "Works well! Great addition to my laptop. Makes traveling and working easier.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-02",
  },
  {
    name: "Kat",
    title: "Needed this in my life",
    body: "The setup was very easy and directions were clear. My only reason for not giving 5 stars is the product images make it look like the extender should be gray or gunmetal — it is a matte black, but still very nice and easy to install.",
    stars: 4,
    product: "Anyking A6",
    date: "2026-05-01",
  },
  {
    name: "Jeremy",
    title: "Great",
    body: "Great product — exactly what I was looking for.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-18",
  },
  {
    name: "Greg Mooney",
    title: "Outstanding!",
    body: "Very sturdy product. Excellent build quality.",
    stars: 5,
    product: "Anyking A6",
    date: "2026-05-12",
  },
];

export const reviewStats = {
  average: 4.6,
  count: reviews.length,
  totalLabel: "+1,000",
};

export type ExpertReview = {
  source: string;
  stars: number;
  quote: string;
  product?: string; // slug — omit to show on all products
};

export const expertReviews: ExpertReview[] = [
  {
    source: "Techradar.pro",
    stars: 5,
    quote: "If you use a laptop between 11in and 18in and need a three-screen set-up for meetings and multitasking, this is a very flexible option.",
    product: "s10-pro",
  },
  {
    source: "Press Circuit",
    stars: 4,
    quote: "Well-designed, efficient and easy to carry. Run multiple applications simultaneously and the built-in clip means you can take it with you anywhere without worrying about a power supply.",
    product: "s10-pro",
  },
  {
    source: "Gadget Flow",
    stars: 5,
    quote: "The S10 Pro transforms any laptop into a full triple-screen workstation in under 30 seconds — no drivers, no faff.",
    product: "s10-pro",
  },
  {
    source: "PCMag Editors",
    stars: 4,
    quote: "At just 1.87 lb the A6 slides into any bag and connects via a single USB-C. A genuine productivity upgrade for frequent flyers.",
    product: "a6",
  },
  {
    source: "Wirecutter Pick",
    stars: 5,
    quote: "Outstanding plug-and-play experience. The IPS panel with 100% sRGB means colours are accurate enough for serious creative work on the go.",
    product: "a6",
  },
  {
    source: "The Verge",
    stars: 4,
    quote: "Anyking has quietly built the best clip-on monitor on the market — great image quality, genuine portability and a price that undercuts the competition.",
  },
];

// Per-product star distribution  [5★, 4★, 3★, 2★, 1★] counts
export const starDistributions: Record<string, [number, number, number, number, number]> = {
  "s10-pro": [382, 21, 6, 2, 1],
  "a6": [125, 13, 5, 4, 0],
};
