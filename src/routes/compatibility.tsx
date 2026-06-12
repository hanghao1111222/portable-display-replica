import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Laptop2, PlugZap, Search, Usb } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLang } from "@/i18n/LangContext";
import {
  brandSnapshots,
  laptopProfiles,
  normalizeQuery,
  trendRows,
} from "@/data/laptopCompatibility";
import cableGuideImage from "@/assets/anyking-cable-guide.png";

export const Route = createFileRoute("/compatibility")({
  head: () => ({
    meta: [
      { title: "Laptop compatibility checker — Anyking" },
      {
        name: "description",
        content:
          "Check whether your laptop can connect directly to an Anyking portable monitor or needs an adapter cable.",
      },
    ],
  }),
  component: CompatibilityPage,
});

type MatchResult = {
  profile: (typeof laptopProfiles)[number] | null;
  label: string;
  summary: string;
};

type CableGuide = {
  key: (typeof laptopProfiles)[number]["cableKey"];
  name: string;
  badge: string;
  note: string;
  connector: "usb-a-to-c" | "usb-c-to-c" | "hdmi-to-type-c" | "h5-hdmi-adapter";
};

const cableGuides: CableGuide[] = [
  {
    key: "usb-a-to-c",
    name: "USB-A to USB-C",
    badge: "Power / helper cable",
    note: "Use this only as a helper path for power or data. Standard USB-A does not carry display video by itself.",
    connector: "usb-a-to-c",
  },
  {
    key: "usb-c-to-c",
    name: "USB-C to USB-C",
    badge: "Best direct connection",
    note: "Use this when the laptop USB-C port supports DisplayPort Alt Mode, USB4, or Thunderbolt video output.",
    connector: "usb-c-to-c",
  },
  {
    key: "hdmi-to-type-c",
    name: "HDMI to Type-C",
    badge: "HDMI fallback",
    note: "Use this for laptops with HDMI output when USB-C video support is missing or unclear.",
    connector: "hdmi-to-type-c",
  },
  {
    key: "h5-hdmi-adapter",
    name: "H5 HDMI Adapter",
    badge: "Older laptop rescue cable",
    note: "Use this when the laptop can output HDMI but cannot drive the monitor directly through USB-C.",
    connector: "h5-hdmi-adapter",
  },
];

function CableIllustration({ connector }: Pick<CableGuide, "connector">) {
  if (connector === "usb-a-to-c") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-hidden="true">
        <path
          d="M86 62 v52 c0 42 148 42 148 0 V80"
          fill="none"
          stroke="#8f9499"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="56" y="28" width="60" height="50" rx="5" fill="#9da1a5" />
        <rect
          x="61"
          y="8"
          width="50"
          height="24"
          rx="3"
          fill="#f4f5f6"
          stroke="#8f9499"
          strokeWidth="5"
        />
        <rect x="78" y="18" width="9" height="9" fill="#8f9499" />
        <rect x="96" y="18" width="9" height="9" fill="#8f9499" />
        <rect x="216" y="65" width="36" height="58" rx="6" fill="#9da1a5" />
        <rect
          x="223"
          y="47"
          width="22"
          height="20"
          rx="2"
          fill="#f4f5f6"
          stroke="#8f9499"
          strokeWidth="5"
        />
      </svg>
    );
  }

  if (connector === "hdmi-to-type-c") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-hidden="true">
        <path
          d="M92 70 v44 c0 42 136 42 136 0 V84"
          fill="none"
          stroke="#8f9499"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="60" y="20" width="64" height="64" rx="8" fill="#9da1a5" />
        <rect
          x="73"
          y="10"
          width="38"
          height="18"
          rx="3"
          fill="#f4f5f6"
          stroke="#8f9499"
          strokeWidth="5"
        />
        <rect x="78" y="52" width="28" height="5" rx="2" fill="#f4f5f6" />
        <rect x="78" y="64" width="28" height="5" rx="2" fill="#f4f5f6" />
        <rect x="210" y="70" width="36" height="56" rx="6" fill="#9da1a5" />
        <rect
          x="217"
          y="52"
          width="22"
          height="20"
          rx="2"
          fill="#f4f5f6"
          stroke="#8f9499"
          strokeWidth="5"
        />
      </svg>
    );
  }

  if (connector === "h5-hdmi-adapter") {
    return (
      <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-hidden="true">
        <path
          d="M102 88 v34 c0 34 116 34 116 0 V92"
          fill="none"
          stroke="#8f9499"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="69" y="34" width="66" height="78" rx="10" fill="#9da1a5" />
        <path
          d="M84 54 h36 v13 l-6 7 H90 l-6 -7 Z"
          fill="#f4f5f6"
          stroke="#676b70"
          strokeWidth="4"
        />
        <rect x="91" y="83" width="22" height="4" rx="2" fill="#676b70" />
        <rect x="91" y="94" width="22" height="4" rx="2" fill="#676b70" />
        <rect x="202" y="78" width="36" height="54" rx="6" fill="#9da1a5" />
        <rect
          x="209"
          y="60"
          width="22"
          height="20"
          rx="2"
          fill="#f4f5f6"
          stroke="#8f9499"
          strokeWidth="5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-hidden="true">
      <path
        d="M92 64 v54 c0 40 136 40 136 0 V64"
        fill="none"
        stroke="#8f9499"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="74" y="48" width="36" height="58" rx="6" fill="#9da1a5" />
      <rect
        x="81"
        y="30"
        width="22"
        height="20"
        rx="2"
        fill="#f4f5f6"
        stroke="#8f9499"
        strokeWidth="5"
      />
      <rect x="210" y="48" width="36" height="58" rx="6" fill="#9da1a5" />
      <rect
        x="217"
        y="30"
        width="22"
        height="20"
        rx="2"
        fill="#f4f5f6"
        stroke="#8f9499"
        strokeWidth="5"
      />
    </svg>
  );
}

function getCableGuide(cableKey?: (typeof laptopProfiles)[number]["cableKey"]) {
  if (!cableKey) return undefined;
  return cableGuides.find((guide) => guide.key === cableKey);
}

function getYear(query: string) {
  const yearMatch = query.match(/(19|20)\d{2}/);
  return yearMatch ? Number(yearMatch[0]) : null;
}

function hasTerm(query: string, term: string) {
  return new RegExp(`(^|\\s)${term.replace(/\s+/g, "\\s+")}(\\s|$)`).test(query);
}

function pickMatch(query: string): MatchResult {
  const normalized = normalizeQuery(query);

  if (!normalized) {
    return {
      profile: null,
      label: "Waiting",
      summary:
        "Enter a full model name and we will tell you whether it can connect directly and which cable to use.",
    };
  }

  const year = getYear(normalized);

  let bestProfile: (typeof laptopProfiles)[number] | null = null;
  let bestScore = 0;

  for (const profile of laptopProfiles) {
    const aliases = [profile.family, ...profile.aliases].map(normalizeQuery);
    let score = 0;

    for (const alias of aliases) {
      if (normalized === alias) score += 12;
      if (normalized.includes(alias)) score += 8;
      if (alias.includes(normalized) && normalized.length >= 8) score += 3;
    }

    if (year !== null && year >= profile.yearRange[0] && year <= profile.yearRange[1]) {
      score += 4;
    }

    if (year !== null && (year < profile.yearRange[0] || year > profile.yearRange[1])) {
      score -= 6;
    }

    if (score > bestScore) {
      bestScore = score;
      bestProfile = profile;
    }
  }

  if (!bestProfile || bestScore < 6) {
    const hasKnownBrand = [
      "apple",
      "macbook",
      "dell",
      "lenovo",
      "thinkpad",
      "hp",
      "acer",
      "asus",
      "surface",
      "microsoft",
      "huawei",
      "honor",
      "samsung",
    ].some((term) => hasTerm(normalized, term));

    return {
      profile: null,
      label: hasKnownBrand ? "Needs more detail" : "No exact match",
      summary: hasKnownBrand
        ? "This brand is supported, but the series or year is missing. Add the full model, for example “Dell Inspiron 15 2019” or “Lenovo Yoga 7i 2022”."
        : "Add the brand, year, or full model name, for example “MacBook Pro 14 2023”.",
    };
  }

  const label =
    bestProfile.confidenceLabel === "High"
      ? "High match"
      : bestProfile.confidenceLabel === "Strong"
        ? "Strong match"
        : "Brand-level match";

  return {
    profile: bestProfile,
    label,
    summary:
      bestProfile.fitLabel === "High"
        ? "This laptop will most likely connect directly to the portable monitor."
        : "This laptop may need an adapter cable, so it is worth checking the video output port carefully.",
  };
}

function DeviceInfo() {
  const [os, setOs] = useState("Detecting");
  const [browser, setBrowser] = useState("Detecting");
  const [screen, setScreen] = useState("Detecting");
  const [model, setModel] = useState("Not available");

  useEffect(() => {
    const ua = navigator.userAgent;
    const platform = navigator.platform || "";
    const browserName = /Edg\//.test(ua)
      ? "Edge"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : /Firefox\//.test(ua)
            ? "Firefox"
            : "Unknown browser";

    const osName =
      /Mac/.test(platform) || /Mac OS/.test(ua)
        ? "macOS"
        : /Win/.test(platform) || /Windows/.test(ua)
          ? "Windows"
          : /Linux/.test(platform)
            ? "Linux"
            : "Unknown OS";

    setOs(osName);
    setBrowser(browserName);
    setScreen(`${window.screen.width} × ${window.screen.height}`);

    const uaData = navigator.userAgentData;
    if (uaData?.getHighEntropyValues) {
      void uaData.getHighEntropyValues(["model", "platform", "platformVersion"]).then((info) => {
        if (info.model) {
          setModel(info.model);
        } else {
          setModel("Browser does not expose the exact model");
        }
      });
    } else {
      setModel("Browser does not expose the exact model");
    }
  }, []);

  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardDescription>Current device</CardDescription>
        <CardTitle className="text-xl">Auto-detected info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3 text-sm">
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">OS</dt>
            <dd className="mt-1 font-medium">{os}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">Browser</dt>
            <dd className="mt-1 font-medium">{browser}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">Screen</dt>
            <dd className="mt-1 font-medium">{screen}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">Model</dt>
            <dd className="mt-1 font-medium">{model}</dd>
          </div>
        </dl>
        <p className="text-sm leading-6 text-muted-foreground">
          Browsers usually cannot read the exact laptop model directly, so we only auto-detect the
          device environment and combine it with your input.
        </p>
      </CardContent>
    </Card>
  );
}

function CompatibilityPage() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const result = useMemo(() => pickMatch(query), [query]);
  const recommendedCable = getCableGuide(result.profile?.cableKey);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5">
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              Laptop port checker
            </Badge>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                Enter your laptop model and we will tell you how to connect it.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground leading-8">
                We first check whether the laptop can connect directly over USB-C or Thunderbolt. If
                not, we will tell you whether you need HDMI, Mini DisplayPort, Surface Connect, or
                another adapter.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="For example: MacBook Pro M2 / ThinkPad X1 Carbon / XPS 13"
                  className="h-12 rounded-xl pl-9 text-base"
                />
              </div>
              <Button
                type="button"
                size="lg"
                className="h-12 rounded-xl px-6"
                onClick={() => setQuery(query.trim())}
              >
                Match now
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "MacBook Air M2",
                "MacBook Air 2017",
                "Dell Inspiron 15 2019",
                "Dell XPS 13 2022",
                "Lenovo Yoga 7i 2022",
                "Acer Aspire 5 2018",
              ].map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <DeviceInfo />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <Card className="border-border/70 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>Match result</CardDescription>
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl md:text-3xl">
                {result.profile ? result.profile.family : "Start by entering a model"}
              </CardTitle>
              <Badge variant={result.profile ? "default" : "secondary"}>{result.label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="max-w-2xl text-muted-foreground leading-7">{result.summary}</p>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Connection
                </p>
                <p className="mt-2 text-sm font-semibold leading-6">
                  {result.profile ? result.profile.connection : "Pending"}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Recommended cable
                </p>
                <p className="mt-2 text-sm font-semibold leading-6">
                  {result.profile ? result.profile.cable : "Pending"}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Fit level
                </p>
                <p className="mt-2 text-sm font-semibold leading-6">
                  {result.profile ? result.profile.fitLabel : "Unknown"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Notes
              </h3>
              <ul className="space-y-3 text-sm leading-7 text-foreground/80">
                {result.profile ? (
                  result.profile.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <Usb className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{note}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex gap-3">
                      <Laptop2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        Try a more complete model name, for example “MacBook Pro 14 2023”.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <PlugZap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>
                        You can also click one of the popular models above to see the output format.
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
              <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
                <div className="rounded-xl border border-border/60 bg-white p-3">
                  {recommendedCable ? (
                    <CableIllustration connector={recommendedCable.connector} />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center text-muted-foreground">
                      <PlugZap className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Badge className="rounded-full px-3 py-1">
                    {recommendedCable ? recommendedCable.badge : "No cable selected yet"}
                  </Badge>
                  <h3 className="text-xl font-semibold">
                    {recommendedCable ? recommendedCable.name : "Enter a full laptop model"}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {recommendedCable
                      ? recommendedCable.note
                      : "After the page recognizes the model, this area highlights the exact cable image shoppers should recognize."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>{t.grid.title}</CardDescription>
            <CardTitle className="text-2xl">How our monitors connect best</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Primary option
              </p>
              <p className="mt-2 text-sm leading-6">
                A full-featured USB-C cable. If the laptop supports video output, this is usually
                the most reliable direct connection.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                H5 support case
              </p>
              <p className="mt-2 text-sm leading-6">
                If the laptop only has HDMI, or its USB-C port does not support video output, the H5
                HDMI Adapter is the cable our support team can use to solve the connection issue.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Reminder</p>
              <p className="mt-2 text-sm leading-6">
                Automatic detection in the browser usually cannot get the exact model, so the final
                decision still depends on the full model the user enters.
              </p>
            </div>
            <Button asChild className="w-full rounded-xl">
              <Link to="/products">
                View products <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">— Cable guide</p>
            <h2 className="text-3xl font-bold md:text-4xl">Show the cable, not just the name</h2>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground leading-6">
            These visual cards help shoppers recognize the connector shape right away, so they know
            which cable to grab before they buy.
          </p>
        </div>

        <div className="mb-5 overflow-hidden rounded-xl border border-border/70 bg-white">
          <img
            src={cableGuideImage}
            alt="USB-A to USB-C, USB-C to USB-C, HDMI to Type-C, and H5 HDMI Adapter cable guide"
            className="w-full object-cover"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cableGuides.map((guide) => (
            <Card
              key={guide.name}
              className="overflow-hidden border-border/70 bg-card/90 shadow-sm"
            >
              <div className="border-b border-border/60 bg-white p-4">
                <div className="rounded-xl border border-border/60 bg-white p-3">
                  <CableIllustration connector={guide.connector} />
                </div>
              </div>
              <CardContent className="space-y-3 p-4">
                <div className="space-y-1">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {guide.badge}
                  </Badge>
                  <CardTitle className="text-lg">{guide.name}</CardTitle>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{guide.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
              — Brand interface reference
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Common ports by brand, before you type the model
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground leading-6">
            This is the quick mental map support teams use: which brands are usually USB-C direct,
            and which ones often fall back to HDMI or H5.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {brandSnapshots.map((brand) => (
            <Card key={brand.brand} className="border-border/70 bg-card/85 shadow-sm">
              <CardHeader className="space-y-2">
                <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
                  {brand.brand}
                </Badge>
                <CardTitle className="text-xl">{brand.commonPorts}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-foreground/70">
                    Direct path
                  </p>
                  <p className="mt-1">{brand.directPath}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-foreground/70">
                    Fallback path
                  </p>
                  <p className="mt-1">{brand.fallbackPath}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
              — Interface trends over the last decade
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Start with brand, then narrow by year
            </h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground leading-6">
            This table is a quick filter for users who only know the brand and rough year. The final
            answer still depends on the exact model.
          </p>
        </div>

        <Card className="border-border/70 bg-card/80 backdrop-blur">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Brand</TableHead>
                  <TableHead className="min-w-[220px]">2015 - 2017</TableHead>
                  <TableHead className="min-w-[220px]">2018 - 2020</TableHead>
                  <TableHead className="min-w-[220px]">2021 - 2026</TableHead>
                  <TableHead className="min-w-[220px]">Common fit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendRows.map((row) => (
                  <TableRow key={row.brand}>
                    <TableCell className="font-semibold align-top">{row.brand}</TableCell>
                    <TableCell className="align-top leading-6 text-muted-foreground">
                      {row.early}
                    </TableCell>
                    <TableCell className="align-top leading-6 text-muted-foreground">
                      {row.middle}
                    </TableCell>
                    <TableCell className="align-top leading-6 text-muted-foreground">
                      {row.recent}
                    </TableCell>
                    <TableCell className="align-top leading-6 text-muted-foreground">
                      <Badge
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {row.adapter}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}
