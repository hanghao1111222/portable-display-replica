import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    navigate({ to: "/login" });
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-20">
        <h1 className="text-3xl font-bold tracking-tight">{t.auth.registerTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.auth.registerSub}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-name">{t.auth.name}</label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-password">{t.auth.password}</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-primary hover:text-primary-foreground"
          >
            {t.auth.registerCta}
          </button>
        </form>

        <p className="mt-5 text-sm text-foreground/80">
          {t.auth.haveAccount}{" "}
          <Link to="/login" className="text-primary hover:underline">
            {t.auth.loginNow}
          </Link>
        </p>
      </section>
    </SiteLayout>
  );
}
