import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Laptop2, PlugZap, Search, ShieldAlert, Usb } from "lucide-react";
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
import {
  s10ProCompatibilitySummary,
  s10ProStatusDetails,
  searchS10ProCompatibility,
  type S10ProCompatibilityRecord,
} from "@/data/s10ProCompatibility";
import cableGuideImage from "@/assets/anyking-cable-guide.png";

export const Route = createFileRoute("/compatibility")({
  head: () => ({
    meta: [
      { title: "Laptop compatibility checker — Anyking" },
      {
        name: "description",
        content:
          "Check whether your laptop can drive both Anyking S10 Pro or P7 side screens directly or needs DisplayLink, a dock, or SKU verification.",
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

const statusToneClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
} as const;

const riskLabels = {
  低: "Low risk",
  中: "Medium risk",
  高: "High risk",
} as const;

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
    name: "H5 DisplayLink Adapter",
    badge: "Limited-display expansion",
    note: "Use this with the DisplayLink driver when the laptop cannot provide enough independent native video outputs.",
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

function getFirstSourceUrl(sourceUrl: string) {
  return sourceUrl.split(/\s*\|\s*|\s+(?=https?:\/\/)/)[0];
}

function getExactMatchCableKey(record: S10ProCompatibilityRecord) {
  if (record.status === "需DisplayLink" || record.status === "不适配原生直连") {
    return "h5-hdmi-adapter" as const;
  }

  if (record.status === "原生直连") {
    return record.ports.includes("HDMI") ? ("hdmi-to-type-c" as const) : ("usb-c-to-c" as const);
  }

  return undefined;
}

function ExactCompatibilityResult({ record }: { record: S10ProCompatibilityRecord }) {
  const { lang } = useLang();
  const ja = lang === "ja";
  const status = s10ProStatusDetails[record.status];
  const sourceUrl = getFirstSourceUrl(record.sourceUrl);

  return (
    <article className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {record.brand} · {record.generation}
          </p>
          <h3 className="mt-2 text-xl font-bold">{record.model}</h3>
        </div>
        <span
          className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusToneClasses[status.tone]}`}
        >
          {status.label}
        </span>
      </div>

      <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
        <div>
          <dt className="font-semibold">{ja ? "確認済みポート" : "Documented ports"}</dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{record.ports}</dd>
        </div>
        <div>
          <dt className="font-semibold">{ja ? "判定リスク" : "Assessment risk"}</dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{riskLabels[record.risk]}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold">
            {ja ? "S10 Pro／P7 推奨構成" : "S10 Pro / P7 recommendation"}
          </dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{status.recommendation}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold">{ja ? "ケーブル・アクセサリー" : "Cable or accessory"}</dt>
          <dd className="mt-1 leading-6 text-muted-foreground">{status.accessory}</dd>
        </div>
      </dl>

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-primary underline-offset-4 hover:underline"
        >
          {ja ? "公式仕様を確認" : "View official evidence"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}

function SelfCheckGuide({ profile }: { profile: (typeof laptopProfiles)[number] | null }) {
  const { lang } = useLang();
  const ja = lang === "ja";
  const steps = ja
    ? [
        {
          title: "1. 完全な型番またはSKUを確認",
          body: "Windowsでは Win＋R を押して msinfo32 と入力し、「システムモデル」を確認します。MacではAppleメニューから「このMacについて」を開き、モデル、年式、チップを確認してください。本体底面ラベル、注文ページ、SKU、部品番号、Lenovo MTMも確認します。",
        },
        {
          title: "2. 3画面同時表示の上限を確認",
          body: "ノートPCまたはGPUの公式仕様で、内蔵画面を表示したまま外部2画面へ出力できるか確認します。外部1画面のみの対応ではS10 Pro／P7の左右両画面を使用できません。",
        },
        {
          title: "3. 独立した映像出力を数える",
          body: "映像対応USB-C／Thunderboltが2系統、または映像対応USB-C 1系統とHDMIがあるか確認します。USB-Cの形状、充電、SS、5Gbps、データ、USB4の表記だけでは2系統の映像出力を保証しません。",
        },
        {
          title: "4. 条件に合う接続方法を選ぶ",
          body: "独立出力が2系統なら直接接続、外部1画面のみならH5 DisplayLinkとドライバーを使用します。GPUは2画面対応でも適切なポートがない場合は、対応Thunderbolt／USB4ドックを使用してください。",
        },
      ]
    : ([
        {
          title: "1. Find the complete model or SKU",
          body: "Windows: press Win + R, enter msinfo32, and copy System Model. Mac: open Apple menu → About This Mac and record the model, year, and chip. Also check the bottom label, order page, SKU, part number, or Lenovo MTM.",
        },
        {
          title: "2. Confirm the three-display limit",
          body: "In the official laptop or GPU specification, verify that the internal laptop screen can stay on together with two external displays. Support for one external display is not enough for both S10 Pro or P7 side screens.",
        },
        {
          title: "3. Count independent video paths",
          body: "Look for two video-capable USB-C/Thunderbolt outputs, or one video-capable USB-C output plus HDMI. USB-C shape, charging, SS, 5Gbps, data, or USB4 wording alone does not prove two independent display outputs.",
        },
        {
          title: "4. Choose the matching connection result",
          body: "Two independent paths: native direct connection. Only one native external display: use H5 DisplayLink and its driver. GPU supports two displays but suitable ports are missing: use a compatible Thunderbolt/USB4 dock. If the specification is unclear, do not promise compatibility yet.",
        },
      ] as const);

  return (
    <div className="space-y-5">
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-bold">
            {ja
              ? "確認済みデータがありません—次の4ステップで確認してください"
              : "No verified record found — check it with these four steps"}
          </p>
          <p className="mt-1">
            {ja
              ? "USB-C端子の形状だけで判断しないでください。公式仕様とポート情報を確認し、左右2画面を使用できるか判定します。"
              : "Do not judge by the USB-C connector alone. Follow the official specification and port evidence below to determine whether both side screens can work."}
          </p>
        </div>
      </div>

      {profile && (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {ja
              ? "シリーズ参考情報—最終判定ではありません"
              : "Preliminary family reference — not a final verdict"}
          </p>
          <p className="mt-2 font-bold">{profile.family}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {ja
              ? `一般的な接続：${profile.connection}。代表的なケーブル：${profile.cable}。購入前に正確なSKUと外部2画面対応をご確認ください。`
              : `Common connection: ${profile.connection}. Typical cable reference: ${profile.cable}. Confirm the exact SKU and two-display capability before purchase.`}
          </p>
        </div>
      )}

      <ol className="grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <li key={step.title} className="rounded-xl border border-border/60 bg-white p-5">
            <h3 className="font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
        <h3 className="font-bold">
          {ja
            ? "判断できない場合は、次の情報をサポートへお送りください"
            : "Still unsure? Send these details to support"}
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {ja
            ? "完全な型番／SKUまたはMTM、CPU／GPU、OS、ノートPC左右側面の鮮明な写真、公式仕様ページのリンクをお送りください。S10 Pro／P7の接続方法を確認します。"
            : "Full model/SKU or MTM, CPU/GPU, operating system, clear photos of both laptop sides, and the official specification link. We can then confirm the S10 Pro / P7 connection path."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="sm" className="rounded-full">
            <a href="mailto:service@anykingscreen.com?subject=S10%20Pro%20%2F%20P7%20Compatibility%20Check">
              {ja ? "互換性情報をメールで送る" : "Email compatibility details"}
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <a href="#cable-guide">{ja ? "ケーブルガイドを見る" : "Review the cable guide"}</a>
          </Button>
        </div>
      </div>
    </div>
  );
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
        "Enter the full laptop model or SKU to check whether it can drive both side screens on an S10 Pro or P7.",
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
      "This is a brand- or family-level reference only. It is not enough to verify two independent side screens; add the exact model, SKU, part number, or MTM for a final S10 Pro / P7 assessment.",
  };
}

function DeviceInfo() {
  const { lang } = useLang();
  const ja = lang === "ja";
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

    const uaData = (
      navigator as Navigator & {
        userAgentData?: {
          getHighEntropyValues?: (hints: string[]) => Promise<{ model?: string }>;
        };
      }
    ).userAgentData;
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
        <CardDescription>{ja ? "現在のデバイス" : "Current device"}</CardDescription>
        <CardTitle className="text-xl">{ja ? "自動検出情報" : "Auto-detected info"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3 text-sm">
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">OS</dt>
            <dd className="mt-1 font-medium">{os}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {ja ? "ブラウザ" : "Browser"}
            </dt>
            <dd className="mt-1 font-medium">{browser}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {ja ? "画面" : "Screen"}
            </dt>
            <dd className="mt-1 font-medium">{screen}</dd>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
            <dt className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
              {ja ? "モデル" : "Model"}
            </dt>
            <dd className="mt-1 font-medium">{model}</dd>
          </div>
        </dl>
        <p className="text-sm leading-6 text-muted-foreground">
          {ja
            ? "ブラウザからノートPCの正確な型番を直接取得することはできないため、デバイス環境を自動検出し、入力された型番と組み合わせて確認します。"
            : "Browsers usually cannot read the exact laptop model directly, so we only auto-detect the device environment and combine it with your input."}
        </p>
      </CardContent>
    </Card>
  );
}

function CompatibilityPage() {
  const { t, lang } = useLang();
  const ja = lang === "ja";
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim();
  const exactMatches = useMemo(() => searchS10ProCompatibility(normalizedQuery), [normalizedQuery]);
  const hasExactMatches = exactMatches.length > 0;
  const shouldShowSelfCheck = normalizedQuery.length >= 2 && !hasExactMatches;
  const result = useMemo(() => pickMatch(query), [query]);
  const exactCableKey =
    exactMatches.length === 1 ? getExactMatchCableKey(exactMatches[0]) : undefined;
  const recommendedCable = getCableGuide(exactCableKey);

  const resultTitle = hasExactMatches
    ? exactMatches.length === 1
      ? exactMatches[0].model
      : ja
        ? `${exactMatches.length}件の確認済みバリエーション`
        : `${exactMatches.length} verified variants found`
    : shouldShowSelfCheck
      ? ja
        ? "確認済みデータベースに型番が見つかりません"
        : "Model not found in the verified database"
      : result.profile
        ? result.profile.family
        : ja
          ? "型番を入力してください"
          : "Start by entering a model";

  const resultSummary = hasExactMatches
    ? ja
      ? "この確認結果はS10 ProとP7の両方に適用されます。どちらもノートPC画面を表示したまま、左右2画面へ独立して出力する必要があります。"
      : "This verified assessment applies to both S10 Pro and P7 because each product must run two independent side screens while the laptop screen stays on."
    : shouldShowSelfCheck
      ? ja
        ? "入力された型番について確認済みの判定を出せませんでした。以下の手順でS10 Pro／P7の正しい接続方法をご確認ください。"
        : "We could not issue a verified verdict for this input. Use the guided checks below to determine the correct S10 Pro / P7 connection path."
      : ja
        ? "ノートPCの完全な型番またはSKUを入力すると、S10 Pro／P7の左右2画面を使用できるか確認できます。"
        : result.summary;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5">
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              {ja
                ? `S10 Pro／P7 互換性チェック・確認済み ${s10ProCompatibilitySummary.total}件`
                : `S10 Pro / P7 checker · ${s10ProCompatibilitySummary.total} verified records`}
            </Badge>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                {ja
                  ? "ノートPCの型番を入力して、左右2画面の互換性を確認。"
                  : "Enter your laptop model to check both extender screens."}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground leading-8">
                {ja
                  ? "ノートPC画面を表示したまま、S10 ProまたはP7の左右2画面へ独立して出力できるかを確認します。直接接続、H5 DisplayLink、ドック、または正確なSKU確認のどれが必要かをご案内します。"
                  : "We check whether the laptop can keep its internal screen on while independently driving both side screens on an S10 Pro or P7. The result will identify native connection, H5 DisplayLink, dock, or exact-SKU verification requirements."}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={
                    ja
                      ? "例：MacBook Air M2 / Inspiron 15 3530 / 21KC..."
                      : "For example: MacBook Air M2 / Inspiron 15 3530 / 21KC..."
                  }
                  className="h-12 rounded-xl pl-9 text-base"
                />
              </div>
              <Button
                type="button"
                size="lg"
                className="h-12 rounded-xl px-6"
                onClick={() => setQuery(query.trim())}
              >
                {ja ? "今すぐ確認" : "Match now"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "MacBook Air M2",
                "Dell Inspiron 15 3530",
                "Surface Laptop 6",
                "ThinkPad X1 Carbon Gen 12",
                "HP EliteBook 840 G11",
                "Acer Aspire 5 A515-58M",
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
            <CardDescription>{ja ? "確認結果" : "Match result"}</CardDescription>
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="text-2xl md:text-3xl">{resultTitle}</CardTitle>
              <Badge variant={hasExactMatches || result.profile ? "default" : "secondary"}>
                {hasExactMatches
                  ? ja
                    ? "確認済みモデルデータ"
                    : "Verified model data"
                  : shouldShowSelfCheck
                    ? ja
                      ? "手動確認が必要"
                      : "Self-check required"
                    : result.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="max-w-2xl text-muted-foreground leading-7">{resultSummary}</p>

            {hasExactMatches ? (
              <div className="space-y-4">
                {exactMatches.length > 1 && (
                  <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>
                      {ja
                        ? "同じモデル名に複数のハードウェア構成があります。ケーブルを選ぶ前に、世代、筐体、SKU、部品番号、MTMを照合してください。"
                        : "This model name has multiple hardware variants. Match the generation, chassis, SKU, part number, or MTM before choosing a cable."}
                    </p>
                  </div>
                )}
                {exactMatches.map((record) => (
                  <ExactCompatibilityResult key={record.id} record={record} />
                ))}
              </div>
            ) : shouldShowSelfCheck ? (
              <SelfCheckGuide profile={result.profile} />
            ) : (
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {ja ? "接続方式" : "Connection"}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    {result.profile ? result.profile.connection : ja ? "確認待ち" : "Pending"}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {ja ? "推奨ケーブル" : "Recommended cable"}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    {result.profile ? result.profile.cable : ja ? "確認待ち" : "Pending"}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {ja ? "一致レベル" : "Match level"}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    {result.profile ? result.profile.confidenceLabel : ja ? "不明" : "Unknown"}
                  </p>
                </div>
              </div>
            )}

            {!shouldShowSelfCheck && (
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {ja ? "注意事項" : "Notes"}
                </h3>
                <ul className="space-y-3 text-sm leading-7 text-foreground/80">
                  {hasExactMatches ? (
                    <>
                      <li className="flex gap-3">
                        <Laptop2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          The assessment assumes the laptop screen stays on while both side screens
                          on the S10 Pro or P7 run as independent extended displays.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <Usb className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          “Official-spec supported” is not the same as per-device testing. Regional
                          SKU, BIOS, cables, drivers, and power can still affect the final result.
                        </span>
                      </li>
                    </>
                  ) : result.profile ? (
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
                          Try a full model or SKU, for example “Dell Inspiron 15 3530” or “21KC”.
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <PlugZap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          You can also click one of the popular models above to see the output
                          format.
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {!shouldShowSelfCheck && (
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
                      {recommendedCable
                        ? recommendedCable.badge
                        : hasExactMatches
                          ? "Variant-specific connection"
                          : "No cable selected yet"}
                    </Badge>
                    <h3 className="text-xl font-semibold">
                      {recommendedCable
                        ? recommendedCable.name
                        : hasExactMatches
                          ? "Follow the exact result above"
                          : "Enter a full laptop model"}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {recommendedCable
                        ? recommendedCable.note
                        : hasExactMatches
                          ? "The matched variants require different cables or accessories, so confirm the exact SKU before connecting both side screens."
                          : "After the page recognizes the model, this area highlights the exact cable image shoppers should recognize."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardDescription>{t.grid.title}</CardDescription>
            <CardTitle className="text-2xl">
              {ja ? "最適なモニター接続方法" : "How our monitors connect best"}
            </CardTitle>
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
                H5 DisplayLink support case
              </p>
              <p className="mt-2 text-sm leading-6">
                If the laptop cannot provide enough independent native video outputs, the H5
                DisplayLink Adapter and driver can add the required display path.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {ja ? "ご注意" : "Reminder"}
              </p>
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

      <section id="cable-guide" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-8 lg:px-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">— Cable guide</p>
            <h2 className="text-3xl font-bold md:text-4xl">
              {ja ? "名前だけでなく、ケーブル形状で確認" : "Show the cable, not just the name"}
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground leading-6">
            These visual cards help shoppers recognize the connector shape right away, so they know
            which cable to grab before they buy.
          </p>
        </div>

        <div className="mb-5 overflow-hidden rounded-xl border border-border/70 bg-white">
          <img
            src={cableGuideImage}
            alt="USB-A to USB-C, USB-C to USB-C, HDMI to Type-C, and H5 DisplayLink Adapter cable guide"
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
            and which ones may require HDMI or H5 DisplayLink.
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
                  <TableHead className="min-w-[140px]">{ja ? "ブランド" : "Brand"}</TableHead>
                  <TableHead className="min-w-[220px]">2015 - 2017</TableHead>
                  <TableHead className="min-w-[220px]">2018 - 2020</TableHead>
                  <TableHead className="min-w-[220px]">2021 - 2026</TableHead>
                  <TableHead className="min-w-[220px]">
                    {ja ? "一般的な接続" : "Common fit"}
                  </TableHead>
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
