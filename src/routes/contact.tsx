import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";

const contactSchema = z
  .object({
    fullName: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(40),
    platform: z.enum(["Anyking Store", "Amazon", "eBay", "Walmart", "Other"]),
    orderNumber: z.string().trim().max(100),
    productModel: z.enum(["S10 Pro", "P7", "A6", "Other"]),
    laptopMake: z.string().trim().max(100),
    laptopModel: z.string().trim().max(160),
    laptopYear: z.string().trim().max(20),
    message: z.string().trim().min(10).max(4000),
    consent: z.literal(true),
    website: z.string().max(200),
  })
  .strict();

const submitContactFn = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    if (data.website) return { success: true };

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Contact form is running in local mock mode.");
        return { success: true, isMock: true };
      }

      return {
        success: false,
        message: "Contact service is temporarily unavailable. Please email us directly.",
      };
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
          platform: data.platform,
          order_number: data.orderNumber || null,
          product_model: data.productModel,
          laptop_make: data.laptopMake || null,
          laptop_model: data.laptopModel || null,
          laptop_year: data.laptopYear || null,
          message: data.message,
          source_page: "/contact",
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Contact submission database error:", await response.text());
        return {
          success: false,
          message: "We could not save your request. Please try again or email us directly.",
        };
      }

      return { success: true };
    } catch (error) {
      console.error("Contact submission failed:", error);
      return {
        success: false,
        message: "Network error. Please try again or email us directly.",
      };
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Anyking — Customer Service & Product Support" },
      {
        name: "description",
        content:
          "Contact Anyking customer service for order help, compatibility guidance, setup support, and product questions.",
      },
    ],
  }),
  component: ContactPage,
});

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  platform: "Amazon" as const,
  orderNumber: "",
  productModel: "S10 Pro" as const,
  laptopMake: "",
  laptopModel: "",
  laptopYear: "",
  message: "",
  consent: false,
  website: "",
};

function ContactPage() {
  const { lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const copy =
    lang === "ja"
      ? {
          eyebrow: "カスタマーサポート",
          title: "お問い合わせ・ご注文登録",
          body: "ご注文、接続互換性、セットアップについてお知らせください。通常1営業日以内に返信します。",
          formTitle: "サポートリクエスト",
          formBody: "正確な製品とノートPC情報を入力すると、より早くご案内できます。",
          name: "お名前",
          phone: "電話番号",
          platform: "購入先",
          order: "注文番号",
          product: "購入製品",
          make: "ノートPCメーカー",
          model: "ノートPC型番",
          year: "購入年 / 発売年",
          message: "お問い合わせ内容",
          consent: "サポート対応のため、Anykingがこの情報を保存・利用することに同意します。",
          submit: "送信する",
          sending: "送信中…",
          success: "お問い合わせを受け付けました",
          successBody: "サポートチームが内容を確認し、入力されたメールアドレスへ返信します。",
          another: "別のお問い合わせを送信",
          direct: "直接お問い合わせ",
          hours: "営業時間",
          business: "法人・販売に関するお問い合わせ",
        }
      : {
          eyebrow: "Customer support",
          title: "Contact us or register your order",
          body: "Tell us about your order, laptop compatibility, or setup issue. We usually reply within one business day.",
          formTitle: "Support request",
          formBody: "Accurate product and laptop details help our team give you a faster answer.",
          name: "Name",
          phone: "Phone number",
          platform: "Platform",
          order: "Order number",
          product: "Product purchased",
          make: "Laptop make",
          model: "Laptop model",
          year: "Purchase / model year",
          message: "Message",
          consent:
            "I agree that Anyking may store and use this information to respond to my request.",
          submit: "Submit request",
          sending: "Sending…",
          success: "Your request has been received",
          successBody:
            "Our support team will review it and reply to the email address you provided.",
          another: "Send another request",
          direct: "Contact us directly",
          hours: "Service hours",
          business: "Business inquiries",
        };

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const result = await submitContactFn({
        data: {
          ...form,
          platform: form.platform as "Anyking Store" | "Amazon" | "eBay" | "Walmart" | "Other",
          productModel: form.productModel as "S10 Pro" | "P7" | "A6" | "Other",
          consent: form.consent as true,
        },
      });

      if (result.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setError(result.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Please check the form and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <SiteLayout>
      <section className="border-b border-border/60 bg-gradient-to-br from-slate-50 via-white to-amber-50/60">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {copy.body}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10 lg:py-20">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-9">
          {submitted ? (
            <div className="flex min-h-[520px] items-center justify-center text-center">
              <div className="max-w-md">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h2 className="mt-6 text-2xl font-bold">{copy.success}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{copy.successBody}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"
                >
                  {copy.another}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{copy.formTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.formBody}</p>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(event) => update("website", event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}{" "}
                    <a href="mailto:service@anykingscreen.com" className="font-semibold underline">
                      service@anykingscreen.com
                    </a>
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium">
                    {copy.name} <span className="text-sale">*</span>
                    <input
                      value={form.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                      className={fieldClass}
                      autoComplete="name"
                      maxLength={120}
                      required
                    />
                  </label>
                  <label className="text-sm font-medium">
                    Email <span className="text-sale">*</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      className={fieldClass}
                      autoComplete="email"
                      placeholder="you@example.com"
                      maxLength={254}
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium">
                    {copy.phone}
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className={fieldClass}
                      autoComplete="tel"
                      maxLength={40}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    {copy.platform} <span className="text-sale">*</span>
                    <select
                      value={form.platform}
                      onChange={(event) => update("platform", event.target.value)}
                      className={fieldClass}
                      required
                    >
                      {["Anyking Store", "Amazon", "eBay", "Walmart", "Other"].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium">
                    {copy.order}
                    <input
                      value={form.orderNumber}
                      onChange={(event) => update("orderNumber", event.target.value)}
                      className={fieldClass}
                      placeholder="123-1234567-1234567"
                      maxLength={100}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    {copy.product} <span className="text-sale">*</span>
                    <select
                      value={form.productModel}
                      onChange={(event) => update("productModel", event.target.value)}
                      className={fieldClass}
                      required
                    >
                      {["S10 Pro", "P7", "A6", "Other"].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <label className="text-sm font-medium">
                    {copy.make}
                    <input
                      value={form.laptopMake}
                      onChange={(event) => update("laptopMake", event.target.value)}
                      className={fieldClass}
                      placeholder="Dell / Lenovo / Apple"
                      maxLength={100}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    {copy.model}
                    <input
                      value={form.laptopModel}
                      onChange={(event) => update("laptopModel", event.target.value)}
                      className={fieldClass}
                      placeholder="Inspiron 15 3530"
                      maxLength={160}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    {copy.year}
                    <input
                      value={form.laptopYear}
                      onChange={(event) => update("laptopYear", event.target.value)}
                      className={fieldClass}
                      placeholder="2024"
                      maxLength={20}
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium">
                  {copy.message} <span className="text-sale">*</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="mt-2 min-h-40 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    placeholder={
                      lang === "ja"
                        ? "症状、使用しているケーブル、各画面の表示内容をご記入ください。"
                        : "Please describe the issue, the cables used, and what appears on each screen."
                    }
                    minLength={10}
                    maxLength={4000}
                    required
                  />
                  <span className="mt-1 block text-right text-xs text-muted-foreground">
                    {form.message.length}/4000
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                    required
                  />
                  <span>{copy.consent}</span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  {submitting ? copy.sending : copy.submit}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl bg-foreground p-7 text-background">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Headphones className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-2xl font-bold">{copy.direct}</h2>
            <div className="mt-6 space-y-4 text-sm">
              <a
                href="mailto:service@anykingscreen.com"
                className="flex items-center gap-3 text-white/85 transition hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                service@anykingscreen.com
              </a>
              <a
                href="tel:+18886885025"
                className="flex items-center gap-3 text-white/85 transition hover:text-primary"
              >
                <Phone className="h-5 w-5" />
                +1 (888) 688-5025
              </a>
            </div>
            <div className="mt-7 border-t border-white/15 pt-6">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Clock3 className="h-4 w-4" /> {copy.hours}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {lang === "ja"
                  ? "月〜金 9:00〜18:00（米国東部時間）"
                  : "Mon–Fri, 9:00 AM–6:00 PM EST"}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-bold">{copy.business}</h3>
            <a
              href="mailto:service@anykingscreen.com?subject=Anyking%20Business%20Inquiry"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              service@anykingscreen.com <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-amber-50/70 p-7">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-bold">
              {lang === "ja" ? "より早い回答が必要ですか？" : "Need an answer sooner?"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {lang === "ja"
                ? "接続や互換性については、ヘルプセンターとモデル検索もご利用ください。"
                : "Use the Help Center or laptop model checker for connection and compatibility guidance."}
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              <Link
                to="/compatibility"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                Compatibility checker <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/help-center" className="inline-flex items-center gap-2 hover:text-primary">
                Help Center <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
