import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { register, currentUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate({ to: "/account" });
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);

    if (success) {
      navigate({ to: "/account" });
    }
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-20">
        <h1 className="text-3xl font-bold tracking-tight">{t.auth.registerTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.auth.registerSub}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="register-name">
              {t.auth.name}
            </label>
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
            <label className="text-sm font-medium" htmlFor="register-email">
              {lang === "ja" ? "メールアドレス" : "Email"}
            </label>
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
            <label className="text-sm font-medium" htmlFor="register-password">
              {t.auth.password}
            </label>
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
