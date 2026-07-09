import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/SiteLayout";
import { getHelpCenterArticle } from "@/data/helpCenterArticles";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

function openSmartSupport() {
  const chatHost = document.getElementById("nextop-chat");
  const chatFrame = document.querySelector<HTMLIFrameElement>('iframe[title="nextop live chat"]');
  const clickable = chatHost?.querySelector<HTMLElement>(
    'button, [role="button"], a, iframe, [class*="bubble"], [class*="launcher"], [class*="chat"]'
  );

  clickable?.click();
  chatHost?.click();
  chatFrame?.click();
}

const activateWarrantyFn = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { orderId: string; fullName: string; email: string; phone?: string; model: string } }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Server-side validation
    const orderPattern = /^\d{3}-\d{7}-\d{7}$/;
    if (!orderPattern.test(data.orderId)) {
      return { success: false, message: "Invalid Order ID format." };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      return { success: false, message: "Invalid email format." };
    }

    // Fallback Mock mode if env keys are not present
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase env credentials are not configured. Running in Mock Mode.");
      return { success: true, isMock: true, message: "Successfully activated (Mock mode)." };
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/warranties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseServiceKey,
          "Authorization": `Bearer ${supabaseServiceKey}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          order_id: data.orderId,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
          product_model: data.model,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Supabase Database Error Response:", errText);
        return { success: false, message: "Database rejected the warranty registration. Please verify details." };
      }

      return { success: true };
    } catch (err: any) {
      console.error("Supabase Connection Failure:", err);
      return { success: false, message: "Database connection failed. Please try again later." };
    }
  });

export const Route = createFileRoute("/help-articles/$article")({
  head: ({ params }) => {
    const article = getHelpCenterArticle(params.article);

    return {
      meta: [
        { title: article ? `${article.shortName} Help Center` : "Help Center Article" },
        {
          name: "description",
          content: article
            ? article.heroBody
            : "Portable display setup, compatibility, and troubleshooting help.",
        },
      ],
    };
  },
  component: HelpCenterArticlePage,
});

function HelpCenterArticlePage() {
  const { article: articleSlug } = Route.useParams();
  const article = getHelpCenterArticle(articleSlug);

  // Warranty Extended Activation states
  const [isWarrantyOpen, setIsWarrantyOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isWarrantyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWarrantyOpen]);

  const handleWarrantySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!orderId.trim() || !fullName.trim() || !email.trim()) {
      setFormStatus("error");
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    // Basic Amazon Order ID validation (format: 3 digits - 7 digits - 7 digits)
    const orderPattern = /^\d{3}-\d{7}-\d{7}$/;
    if (!orderPattern.test(orderId.trim())) {
      setFormStatus("error");
      setErrorMsg("Please enter a valid Amazon Order ID (e.g., 123-4567890-1234567).");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setFormStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await activateWarrantyFn({
        data: {
          orderId: orderId.trim(),
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          model: article.name,
        }
      });

      if (response.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setErrorMsg(response.message || "Failed to activate warranty. Please check your order details.");
      }
    } catch (err: any) {
      console.error("Submit Error:", err);
      setFormStatus("error");
      setErrorMsg(err.message || "A system error occurred. Please try again later.");
    }
  };

  const closeWarrantyModal = () => {
    setIsWarrantyOpen(false);
    // Reset form states if it was a success
    if (formStatus === "success") {
      setOrderId("");
      setFullName("");
      setEmail("");
      setPhone("");
      setFormStatus("idle");
    }
  };

  if (!article) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-4xl px-5 py-20 lg:px-10">
          <Link
            to="/help-center"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <div className="mt-8 rounded-lg border border-border/60 bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-foreground">Article not found</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We couldn't find that help article. Please return to the help center and choose a supported guide.
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const faqLinks = article.sections.map((section, index) => ({
    id: `faq-${index + 1}`,
    label: `5.${index + 1} ${section.title}`,
  }));

  const toc = [
    ...(article.connectionVideo
      ? [
          {
            title: "Connection Tutorial",
            items: [{ id: "connection-video", label: "Watch setup video" }],
          },
        ]
      : []),
    {
      title: "1. Product Overview",
      items: [
        { id: "design-look", label: "1.1 Design & look" },
        { id: "key-highlights", label: "1.2 Key highlights" },
        { id: "product-links", label: "1.3 Product page links" },
      ],
    },
    {
      title: "2. Specifications",
      items: [{ id: "specs", label: "2.1 Core specs" }],
    },
    {
      title: "3. Setup, Install & Accessories",
      items: [
        { id: "setup-video", label: "3.1 Setup workflow" },
        { id: "compatibility-accessories", label: "3.2 Accessories & compatibility" },
      ],
    },
    {
      title: "4. Downloads",
      items: [
        { id: "user-manual", label: "4.1 User manual" },
        { id: "firmware", label: "4.2 Firmware" },
      ],
    },
    {
      title: "5. Common Questions",
      items: faqLinks,
    },
  ];

  return (
    <SiteLayout>
      <header className="border-b border-border/50 bg-[#f3f6f9]">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
          <Link
            to="/help-center"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Help Center
          </Link>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {article.shortName} Guide
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Get step-by-step setup guides, manuals, and common issue resolutions.
              </p>
            </div>
            
            {/* Warranty Promotion Card in Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-amber-500/5 to-white p-4 shadow-sm max-w-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-foreground leading-tight">Activate 1-Year Extended Warranty</h3>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                    Register your Anyking purchase within 30 days of receipt to extend your warranty to 12 months for free.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWarrantyOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Activate Warranty
              </button>
            </div>
          </div>

          {/* Mobile Only: Connection video inside header */}
          {article.connectionVideo && (
            <div className="lg:hidden mt-6 rounded-2xl border border-border/25 bg-white p-4 shadow-sm">
              <div className="mb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Start here
                </p>
                <h2 className="mt-1 text-lg font-bold text-foreground">
                  {article.connectionVideo.title}
                </h2>
              </div>
              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                {article.connectionVideo.body}
              </p>
              <div className="overflow-hidden rounded-xl border border-border/60 bg-black shadow-sm">
                {article.connectionVideo.youtubeId ? (
                  <iframe
                    title={article.connectionVideo.title}
                    src={`https://www.youtube.com/embed/${article.connectionVideo.youtubeId}?rel=0&modestbranding=1`}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : article.connectionVideo.src ? (
                  <video
                    src={article.connectionVideo.src}
                    className="aspect-video w-full bg-black"
                    controls
                    playsInline
                    preload="metadata"
                  />
                ) : null}
              </div>
              {article.connectionVideo.youtubeId && (
                <div className="mt-3 flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                  <span>
                    If the embedded player does not load on your network, open the tutorial directly on YouTube.
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${article.connectionVideo.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-bold text-background text-[11px] transition hover:bg-foreground/85"
                  >
                    Open tutorial
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-10 lg:py-14">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
            <nav className="h-full overflow-y-auto rounded-lg border border-border/60 bg-white p-5 shadow-sm">
              <div className="space-y-6">
                {toc.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-bold text-foreground">{group.title}</p>
                    <div className="mt-3 space-y-1.5">
                      {group.items.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary/65 hover:text-foreground"
                        >
                          <span className="h-2 w-2 rounded-full bg-border" />
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </nav>
          </aside>

          <article className="mx-auto w-full max-w-3xl text-foreground">
            {article.connectionVideo && (
              <section id="connection-video" className="hidden lg:block scroll-mt-28 rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      Start here
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                      {article.connectionVideo.title}
                    </h2>
                  </div>
                </div>
                <p className="mb-5 text-sm leading-7 text-muted-foreground md:text-base">
                  {article.connectionVideo.body}
                </p>
                <div className="overflow-hidden rounded-xl border border-border/60 bg-black shadow-sm">
                  {article.connectionVideo.youtubeId ? (
                    <iframe
                      title={article.connectionVideo.title}
                      src={`https://www.youtube.com/embed/${article.connectionVideo.youtubeId}?rel=0&modestbranding=1`}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : article.connectionVideo.src ? (
                    <video
                      src={article.connectionVideo.src}
                      className="aspect-video w-full bg-black"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : null}
                </div>
                {article.connectionVideo.youtubeId && (
                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      If the embedded player does not load on your network, open the tutorial directly on YouTube.
                    </span>
                    <a
                      href={`https://www.youtube.com/watch?v=${article.connectionVideo.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2 font-semibold text-background transition hover:bg-foreground/85"
                    >
                      Open tutorial
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </section>
            )}

            <section id="design-look" className={article.connectionVideo ? "mt-14 scroll-mt-28" : "scroll-mt-28"}>
              <p className="text-sm font-semibold tracking-[0.18em] text-primary">1. PRODUCT OVERVIEW</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">1.1 Design & look</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">{article.overview.designSummary}</p>
              <figure className="mt-8 flex justify-center">
                <img
                  src={article.image}
                  alt={article.name}
                  className="max-h-[360px] w-full max-w-[520px] object-contain"
                />
              </figure>
            </section>

            <section id="key-highlights" className="mt-14 scroll-mt-28">
              <h2 className="text-3xl font-bold tracking-tight">1.2 Key highlights</h2>
              <ul className="mt-6 space-y-3 text-base leading-8 text-muted-foreground">
                {article.overview.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="product-links" className="mt-14 scroll-mt-28">
              <h2 className="text-3xl font-bold tracking-tight">1.3 Product page links</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{article.overview.listingTitle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {article.overview.productLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>

            <section id="specs" className="mt-16 scroll-mt-28">
              <h2 className="text-center text-3xl font-bold tracking-tight">2. Specifications</h2>
              <div className="mt-7 overflow-hidden border border-border/70">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {article.specifications.map((spec) => (
                      <tr key={spec.label} className="flex flex-col sm:table-row border-b border-border/70 last:border-b-0">
                        <th className="block w-full sm:table-cell sm:w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                          {spec.label}
                        </th>
                        <td className="block w-full sm:table-cell px-4 py-3 leading-7 text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="setup-video" className="mt-16 scroll-mt-28">
              <h2 className="text-center text-3xl font-bold tracking-tight">3. Setup, Install & Accessories</h2>
              <h3 className="mt-8 text-xl font-bold">3.1 Setup workflow</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{article.setup.tutorialBody}</p>
              <ul className="mt-5 space-y-3 text-base leading-8 text-muted-foreground">
                {article.connectionMethods.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="compatibility-accessories" className="mt-12 scroll-mt-28">
              <h3 className="text-xl font-bold">3.2 Accessories & compatibility</h3>
              <div className="mt-6 overflow-hidden border border-border/70">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    <tr className="flex flex-col sm:table-row border-b border-border/70">
                      <th className="block w-full sm:table-cell sm:w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                        Accessories
                      </th>
                      <td className="block w-full sm:table-cell px-4 py-3">
                        <ul className="space-y-2 leading-7 text-muted-foreground">
                          {article.setup.accessories.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <th className="block w-full sm:table-cell sm:w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                        Compatibility
                      </th>
                      <td className="block w-full sm:table-cell px-4 py-3">
                        <ul className="space-y-2 leading-7 text-muted-foreground">
                          {article.setup.compatibilityNotes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="user-manual" className="mt-16 scroll-mt-28 text-center">
              <h2 className="text-3xl font-bold tracking-tight">4. Downloads</h2>
              <h3 className="mt-8 text-xl font-bold">4.1 User manual</h3>
              <a
                href={article.downloads.manual.href}
                target={article.downloads.manual.external ? "_blank" : undefined}
                rel={article.downloads.manual.external ? "noopener noreferrer" : undefined}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 transition hover:text-primary"
              >
                {article.downloads.manual.label}
              </a>
            </section>

            <section id="firmware" className="mt-8 scroll-mt-28 text-center">
              <h3 className="text-xl font-bold">4.2 Firmware</h3>
              <a
                href={article.downloads.firmware.href}
                target={article.downloads.firmware.external ? "_blank" : undefined}
                rel={article.downloads.firmware.external ? "noopener noreferrer" : undefined}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 transition hover:text-primary"
              >
                {article.downloads.firmware.label}
              </a>
            </section>

            <section id="faq-1" className="mt-16 scroll-mt-28">
              <h2 className="text-center text-3xl font-bold tracking-tight">5. Common Questions</h2>
              <div className="mt-8 space-y-8">
                {article.sections.map((section, index) => (
                  <section id={`faq-${index + 1}`} key={section.title} className="scroll-mt-28">
                    <h3 className="text-xl font-bold">{`5.${index + 1} ${section.title}`}</h3>
                    <Accordion type="single" collapsible className="mt-4 divide-y divide-border/40">
                      {section.items.map((item, itemIndex) => (
                        <AccordionItem
                          key={item.question}
                          value={`${section.title}-${itemIndex}`}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="border-t border-border/60 bg-[#f4f7fb] px-5 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Can't find the answer?</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openSmartSupport();
                }}
                className="group text-center cursor-pointer"
              >
                <MessageCircle className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-sm font-bold text-foreground">Live chat</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">Use the chat bubble for quick setup help.</p>
              </a>
              <a href={`tel:${article.support.phone}`} className="group text-center">
                <Phone className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-sm font-bold text-foreground">Call us</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{article.support.phone}</p>
              </a>
              <a href={`mailto:${article.support.email}`} className="group text-center">
                <Mail className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-sm font-bold text-foreground">Email us</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{article.support.email}</p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Warranty Modal Dialog */}
      {isWarrantyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeWarrantyModal}
              className="absolute right-4 top-4 h-7 w-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors text-sm font-bold"
              aria-label="Close dialog"
            >
              ✕
            </button>

            {formStatus !== "success" ? (
              <form onSubmit={handleWarrantySubmit}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Activate Warranty</h2>
                    <p className="text-xs text-slate-500">Claim your 12-month free extension</p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Prefilled Product Model */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Product Model</label>
                    <input
                      type="text"
                      disabled
                      value={article.name}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 cursor-not-allowed font-medium"
                    />
                  </div>

                  {/* Amazon Order ID */}
                  <div>
                    <label htmlFor="w-order" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Amazon Order ID <span className="text-primary">*</span>
                    </label>
                    <input
                      id="w-order"
                      type="text"
                      required
                      placeholder="e.g. 123-4567890-1234567"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="w-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="w-name"
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="w-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="w-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="w-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone / Contact <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      id="w-phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                    />
                  </div>
                </div>

                {/* Error message */}
                {formStatus === "error" && errorMsg && (
                  <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 font-medium">
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Submission button */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeWarrantyModal}
                    className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Activating...
                      </>
                    ) : (
                      "Activate Now"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Success Screen
              <div className="text-center py-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-xl font-extrabold text-slate-900">Warranty Activated!</h2>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your 12-month free extended warranty is now active for product:
                </p>
                <div className="my-4 rounded-xl bg-slate-50 p-4 border border-slate-100 text-left space-y-1.5 text-xs">
                  <p className="text-slate-500"><strong className="text-slate-700">Model:</strong> {article.name}</p>
                  <p className="text-slate-500"><strong className="text-slate-700">Order ID:</strong> {orderId}</p>
                  <p className="text-slate-500"><strong className="text-slate-700">Email:</strong> {email}</p>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  A confirmation has been sent to your email. If you have questions, contact service@anykingscreen.com.
                </p>
                <button
                  type="button"
                  onClick={closeWarrantyModal}
                  className="mt-6 w-full rounded-full bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
