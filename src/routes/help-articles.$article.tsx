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
  Cable,
  CheckCircle2,
  Laptop,
  MessageSquareText,
  ShieldCheck,
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
          <div className="mt-8 rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-foreground">Article not found</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We couldn't find that help article. Please return to the help center and choose a supported guide.
            </p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="border-b border-border/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.995),rgba(246,248,251,0.96))]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-10 lg:py-18">
          <Link
            to="/help-center"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
                Product Support Article
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                {article.heroTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                {article.heroBody}
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-6 shadow-sm">
              <div className="aspect-[16/10] rounded-2xl bg-white/70 p-4">
                <img
                  src={article.image}
                  alt={article.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">{article.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Updated support guidance for compatibility, setup, and troubleshooting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-sm">
            <Laptop className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-lg font-bold text-foreground">Compatibility</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              {article.compatibility.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-sm">
            <Cable className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-lg font-bold text-foreground">Connection Methods</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              {article.connectionMethods.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-sm">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-lg font-bold text-foreground">Support</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>{article.support.warranty}</p>
              <p>Email: {article.support.email}</p>
              <p>Phone: {article.support.phone}</p>
              {article.support.whatsapp ? <p>WhatsApp: {article.support.whatsapp}</p> : null}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 lg:px-10">
        <div className="rounded-3xl border border-primary/15 bg-primary/[0.05] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <MessageSquareText className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-bold text-foreground">Before you troubleshoot</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {article.reminders.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-10 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Most common questions about {article.shortName}
          </h2>
        </div>

        <div className="mt-10 space-y-6">
          {article.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-sm md:p-8"
            >
              <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
              <Accordion type="single" collapsible className="mt-5 divide-y divide-border/20">
                {section.items.map((item, index) => (
                  <AccordionItem key={item.question} value={`${section.title}-${index}`} className="border-b-0">
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
