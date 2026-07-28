import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";
import { motion } from "motion/react";
import { reviews, reviewStats } from "@/data/reviews";
import { TrustStars } from "@/components/TrustStars";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer reviews — Anyking" },
      { name: "description", content: "Real reviews from real Anyking customers." },
      { property: "og:title", content: "Customer reviews" },
      { property: "og:description", content: "Real reviews from real customers." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t, lang } = useLang();
  const jaReviews = [
    [
      "作業効率がすぐに上がりました",
      "期待以上のスクリーンエクステンダーです。画面は滑らかで鮮明、100% sRGBで色も正確です。学習、調査、動画視聴に毎日使っています。14インチのノートPCにぴったりで、頑丈なのにかさばりません。接続も簡単でした。",
    ],
    [
      "とても快適です",
      "リクライニングチェアと膝上デスクでも二画面を使えるようになりました。軽く、ノートPC背面にしっかり固定できます。",
    ],
    [
      "ノートPC用拡張画面",
      "今のところとても良い製品です。これから仕事で使うのが楽しみで、将来は二画面タイプへアップグレードしたいです。",
    ],
    ["軽量", "とても軽く、ノートPCにも問題なく接続できました。気に入っています。"],
    [
      "期待以上で、購入する価値があります",
      "明るく鮮明で、100% sRGBの色もきれいです。プラグ＆プレイで簡単に接続でき、仕事、ゲーム、動画視聴、出張にちょうどよいサイズです。軽いのにしっかりしています。",
    ],
    [
      "快適に使えます—事前にシステム確認を",
      "とても気に入っています。ノートPC側に必要なUSB-Cがなかったためアクセサリーを追加しましたが、接続後は画面が快適に動作しました。",
    ],
    [
      "左側と右側、どちらで使う？",
      "第一印象は良好です。USB-Cは映像出力非対応だったためHDMIで問題なく使えました。取り付け方向だけは事前に確認した方がよいです。",
    ],
    [
      "現代のプロに役立つ生産性ツール",
      "1080P IPS画面は鮮明で、100% sRGBにより色も正確です。私のノートPCではUSB-C一本で電源と映像を接続できました。軽量で、分析、コーディング、複数作業に欠かせません。",
    ],
    [
      "モバイルオフィスに最高の追加",
      "非常に頑丈で画面も鮮明、本当にプラグ＆プレイです。以前の製品ではDellへの接続に時間がかかりましたが、これは数分で使えました。",
    ],
    [
      "驚きました",
      "出張中の仕事で画面を増やしたくて購入しました。自宅以外で作業するときにとても便利で、セットアップも簡単でした。",
    ],
    ["ノートPCに最適", "問題なく動作します。移動中の仕事がずっと楽になりました。"],
    [
      "もっと早く欲しかった",
      "セットアップは簡単で説明も分かりやすいです。色はマットブラックで、見た目もよく取り付けやすいです。",
    ],
    ["素晴らしい", "探していた通りの、とても良い製品です。"],
    ["抜群です", "非常に頑丈で、ビルドクオリティも優れています。"],
  ] as const;
  return (
    <SiteLayout>
      <section className="border-b border-border/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(246,248,251,0.96))] text-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.reviewsSec.title}</h1>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-lg md:text-xl font-medium">
              {lang === "ja" ? "優秀" : "Excellent"}
            </span>
            <span className="text-2xl md:text-3xl font-bold">
              {reviewStats.average.toFixed(1)} / 5
            </span>
            <TrustStars rating={reviewStats.average} size={28} />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground md:text-base">
            <span>{lang === "ja" ? "全" : "based on"}</span>
            <span className="font-medium text-foreground underline underline-offset-4">
              {reviewStats.totalLabel}
            </span>
            <span>{lang === "ja" ? "件のレビュー" : "reviews"}</span>
            <ShieldCheck className="w-5 h-5 ml-1 text-[#00b67a]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="flex flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-sm"
          >
            <TrustStars rating={r.stars} size={22} />
            <h3 className="mt-5 text-lg font-semibold">
              {lang === "ja" ? jaReviews[i]?.[0] : r.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
              {lang === "ja" ? jaReviews[i]?.[1] : r.body}
            </p>
            <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.name}</span>
              <span>{r.product}</span>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}
