import { createFileRoute, Link } from "@tanstack/react-router";
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
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

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
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
          <Link
            to="/help-center"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Help Center
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {article.shortName} Guide
          </h1>
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
            <section id="design-look" className="scroll-mt-28">
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
                      <tr key={spec.label} className="border-b border-border/70 last:border-b-0">
                        <th className="w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                          {spec.label}
                        </th>
                        <td className="px-4 py-3 leading-7 text-muted-foreground">{spec.value}</td>
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
                    <tr className="border-b border-border/70">
                      <th className="w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                        Accessories
                      </th>
                      <td className="px-4 py-3">
                        <ul className="space-y-2 leading-7 text-muted-foreground">
                          {article.setup.accessories.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="w-40 bg-secondary/45 px-4 py-3 text-left font-semibold text-foreground">
                        Compatibility
                      </th>
                      <td className="px-4 py-3">
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
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 transition hover:text-primary"
              >
                {article.downloads.manual.label}
              </a>
            </section>

            <section id="firmware" className="mt-8 scroll-mt-28 text-center">
              <h3 className="text-xl font-bold">4.2 Firmware</h3>
              <a
                href={article.downloads.firmware.href}
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
              <a href="#" className="group text-center">
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
    </SiteLayout>
  );
}
