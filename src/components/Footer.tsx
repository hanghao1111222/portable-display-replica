import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { Facebook, Mail, ChevronUp, Youtube, Music2 } from "lucide-react";

export function Footer() {
  const { lang } = useLang();

  const columns = [
    {
      title: "SHOP THE STORE",
      links: [
        { label: "ALL PRODUCTS", to: "/products" },
        { label: "A6 PORTABLE MONITOR", to: "/products/a6" },
        { label: "S10 PRO EXTENDER", to: "/products/s10-pro" },
        { label: '34" CURVED ULTRAWIDE EXTENDER', to: "/products" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "CONTACT US", to: "mailto:support@anyking.outletsday.com", external: true },
        { label: "FAQS", to: "/reviews" },
        { label: "SHIPPING", to: "/checkout" },
        { label: "WARRANTY", to: "/products" },
        { label: "RETURN & REFUND", to: "/products" },
      ],
    },
    {
      title: "INFORMATION",
      links: [
        { label: "ABOUT US", to: "/" },
        { label: "PRIVACY POLICY", to: "/" },
        { label: "TERMS OF SERVICE", to: "/" },
      ],
    },
  ] as const;

  const paymentLogos = [
    { name: "American Express", src: "/payment-logos/american-express.png" },
    { name: "Mastercard", src: "/payment-logos/mastercard.webp" },
    { name: "PayPal", src: "/payment-logos/paypal.png" },
    { name: "Visa", src: "/payment-logos/visa.png" },
  ] as const;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
          {columns.map((column) => (
            <div key={column.title} className="space-y-6">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        className="text-[11px] font-medium tracking-[0.24em] text-slate-500 transition hover:text-sky-600"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-[11px] font-medium tracking-[0.24em] text-slate-500 transition hover:text-sky-600"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900">
                GET IN TOUCH
              </h3>
              <a
                href="mailto:support@anyking.outletsday.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-sky-600"
              >
                <Mail className="h-5 w-5" />
                <span>support@anyking.outletsday.com</span>
              </a>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900">
                FOLLOW US
              </h3>
              <div className="flex items-center gap-4 text-slate-600">
                <a href="#" className="transition hover:text-sky-600" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="transition hover:text-sky-600" aria-label="TikTok">
                  <Music2 className="h-5 w-5" />
                </a>
                <a href="#" className="transition hover:text-sky-600" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-sm font-semibold text-slate-900">
            {lang === "ja" ? "ご利用可能な決済方法" : "We accept"}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {paymentLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-16 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 shadow-sm"
              >
                <img src={logo.src} alt={logo.name} className="max-h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-14 border-t border-slate-200 pt-8">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Anyking
          </p>
          <button
            onClick={scrollToTop}
            className="absolute right-0 top-4 rounded-md bg-slate-200 px-3 py-3 text-slate-500 shadow-sm transition hover:bg-slate-300 hover:text-slate-700"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
