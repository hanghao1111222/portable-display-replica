import React, { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/context/AuthContext";
import { useLang, formatPrice } from "@/i18n/LangContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import {
  User as UserIcon,
  ShoppingBag,
  Settings,
  CreditCard,
  LogOut,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  PackageOpen,
} from "lucide-react";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

const accountStrings = {
  en: {
    title: "My Account",
    subtitle: "Manage your profile, track and view your order history.",
    tabDashboard: "Dashboard",
    tabOrders: "Order History",
    tabSettings: "Account Settings",
    welcome: "Welcome back,",
    statsOrders: "Total Orders",
    statsSpent: "Total Spent",
    statsTier: "Account Level",
    tierMember: "Bronze Member",
    tierSilver: "Silver Member",
    tierGold: "Gold Member",
    recentOrder: "Recent Order",
    noRecentOrder: "You have not placed any orders yet.",
    viewAllOrders: "View all orders",
    orderId: "Order ID",
    date: "Date",
    status: "Status",
    items: "Items",
    total: "Total",
    actionReorder: "Reorder Item",
    statusCompleted: "Completed (Amazon)",
    statusProcessing: "Processing",
    statusPending: "Pending",
    settingsTitle: "Edit Profile",
    settingsSub: "Update your name, email address, or update your password.",
    fullName: "Full Name",
    emailAddress: "Email Address",
    newPassword: "New Password (optional)",
    newPasswordPlaceholder: "Leave blank to keep current",
    saveChanges: "Save Changes",
    logout: "Log Out",
    reorderToast: "Items added back to cart!",
    noOrders: "No orders found.",
    shopCta: "Shop Monitors",
    joinedDate: "Member since",
    updating: "Saving changes...",
  },
  ja: {
    title: "マイアカウント",
    subtitle: "プロフィール管理、注文履歴の確認・追跡ができます。",
    tabDashboard: "ダッシュボード",
    tabOrders: "注文履歴",
    tabSettings: "アカウント設定",
    welcome: "おかえりなさい、",
    statsOrders: "注文数",
    statsSpent: "累計お買い物額",
    statsTier: "会員ランク",
    tierMember: "ブロンズ会員",
    tierSilver: "シルバー会員",
    tierGold: "ゴールド会員",
    recentOrder: "最近の注文",
    noRecentOrder: "まだ注文履歴はありません。",
    viewAllOrders: "すべての注文を見る",
    orderId: "注文番号",
    date: "注文日",
    status: "ステータス",
    items: "商品名",
    total: "合計金額",
    actionReorder: "もう一度購入",
    statusCompleted: "完了 (Amazon)",
    statusProcessing: "処理中",
    statusPending: "保留中",
    settingsTitle: "プロフィールの編集",
    settingsSub: "名前、メールアドレス、パスワードを変更できます。",
    fullName: "お名前",
    emailAddress: "メールアドレス",
    newPassword: "新しいパスワード (任意)",
    newPasswordPlaceholder: "変更しない場合は空白のまま",
    saveChanges: "変更を保存",
    logout: "ログアウト",
    reorderToast: "商品をカートに戻しました！",
    noOrders: "注文履歴が見つかりません。",
    shopCta: "モニターを見る",
    joinedDate: "登録日",
    updating: "変更を保存中...",
  },
};

function AccountPage() {
  const { lang } = useLang();
  const s = accountStrings[lang];
  const navigate = useNavigate();
  const { currentUser, logout, getUserOrders, updateProfile } = useAuth();
  const { addToCart, setCartOpen } = useCart();

  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "settings">("dashboard");

  // Profile settings state
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync profile state when user loads
  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name);
      setProfileEmail(currentUser.email);
    } else {
      // Redirect to login if not authenticated
      navigate({ to: "/login" });
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </SiteLayout>
    );
  }

  const userOrders = getUserOrders();
  const totalSpent = userOrders.reduce((sum, order) => sum + order.subtotal, 0);

  // Determine membership tier based on spending
  let tier = s.tierMember;
  let tierColor = "text-amber-700 bg-amber-50 border-amber-200/55";
  if (totalSpent >= 800) {
    tier = s.tierGold;
    tierColor = "text-yellow-700 bg-yellow-50 border-yellow-200/55";
  } else if (totalSpent >= 400) {
    tier = s.tierSilver;
    tierColor = "text-slate-700 bg-slate-100 border-slate-200/55";
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleReorder = (item: any) => {
    const matchedProduct = products.find((p) => p.slug === item.productSlug);
    const productToAdd = matchedProduct || {
      slug: item.productSlug,
      name: item.name,
      price: item.price,
      images: [item.image],
      title: item.name,
      description: "",
      features: [],
      specs: {},
      rating: 5,
      reviewCount: 10,
    };
    addToCart(productToAdd as any, item.quantity);
    toast.success(s.reorderToast);
    setCartOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim() || !profileEmail.trim()) {
      toast.error(
        lang === "ja" ? "お名前とメールアドレスは必須です。" : "Name and Email are required.",
      );
      return;
    }

    setIsUpdating(true);
    const success = await updateProfile(profileName, profileEmail, profilePassword || undefined);
    setIsUpdating(false);

    if (success) {
      setProfilePassword(""); // clear password field
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SiteLayout>
      <div className="bg-muted/30 min-h-screen py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {/* Header section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{s.title}</h1>
              <p className="text-muted-foreground mt-1 text-sm">{s.subtitle}</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex max-w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground/80 transition hover:border-red-200 hover:text-red-600 hover:bg-red-50/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              {s.logout}
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <aside className="space-y-1.5">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition duration-150 ${activeTab === "dashboard" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-foreground/75 hover:text-foreground"}`}
              >
                <UserIcon className="h-4.5 w-4.5" />
                {s.tabDashboard}
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition duration-150 ${activeTab === "orders" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-foreground/75 hover:text-foreground"}`}
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                {s.tabOrders}
                {userOrders.length > 0 && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeTab === "orders" ? "bg-primary-foreground text-primary" : "bg-muted-foreground/20 text-muted-foreground"}`}
                  >
                    {userOrders.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition duration-150 ${activeTab === "settings" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-foreground/75 hover:text-foreground"}`}
              >
                <Settings className="h-4.5 w-4.5" />
                {s.tabSettings}
              </button>
            </aside>

            {/* Dashboard Panels */}
            <main>
              {/* Tab 1: Dashboard Overview */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Hero welcome card */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 md:p-8 text-white shadow-lg">
                    <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold font-display">
                          {s.welcome} {currentUser.name}
                        </h2>
                        <p className="text-white/60 text-xs mt-1">
                          {s.joinedDate}: {formatDate(currentUser.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs border rounded-full px-3 py-1 font-semibold ${tierColor}`}
                        >
                          <Award className="h-3.5 w-3.5" />
                          {tier}
                        </span>
                      </div>
                    </div>
                    {/* Decorative backdrop shapes */}
                    <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                    <div className="absolute left-1/3 top-0 h-28 w-28 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                  </div>

                  {/* Stats counters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                        {s.statsOrders}
                      </p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {userOrders.length}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                        {s.statsSpent}
                      </p>
                      <h3 className="text-3xl font-bold text-foreground mt-2">
                        {formatPrice(totalSpent, lang)}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                        {s.statsTier}
                      </p>
                      <h3 className="text-lg font-bold text-primary mt-3 flex items-center gap-1.5">
                        {tier}
                      </h3>
                    </div>
                  </div>

                  {/* Recent Order */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
                      <h4 className="font-bold text-base">{s.recentOrder}</h4>
                      {userOrders.length > 0 && (
                        <button
                          onClick={() => setActiveTab("orders")}
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          {s.viewAllOrders}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {userOrders.length === 0 ? (
                      <div className="text-center py-10">
                        <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground/50 stroke-1" />
                        <p className="text-sm text-muted-foreground mt-3">{s.noRecentOrder}</p>
                        <Link
                          to="/products"
                          className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
                        >
                          {s.shopCta}
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-muted/40 rounded-xl p-3.5">
                          <div>
                            <span className="text-muted-foreground mr-1.5">{s.orderId}:</span>
                            <span className="font-semibold text-foreground">
                              {userOrders[0].id}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1.5">{s.date}:</span>
                            <span className="font-semibold text-foreground">
                              {formatDate(userOrders[0].createdAt)}
                            </span>
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200/55">
                              <CheckCircle2 className="h-3 w-3" />
                              {s.statusCompleted}
                            </span>
                          </div>
                        </div>

                        {userOrders[0].items.map((item) => (
                          <div
                            key={item.productSlug}
                            className="flex gap-4 items-center border border-border/40 rounded-xl p-3 bg-background"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-lg object-contain bg-muted p-1 border"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm leading-tight text-foreground truncate">
                                {item.name}
                              </h5>
                              <p className="text-muted-foreground text-xs mt-1">
                                Qty {item.quantity} · {formatPrice(item.price, lang)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleReorder(item)}
                              className="shrink-0 rounded-full border border-border hover:border-primary hover:text-primary bg-background px-3 py-1.5 text-xs font-semibold text-foreground/80 transition"
                            >
                              {s.actionReorder}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Full Order History */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  {userOrders.length === 0 ? (
                    <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
                      <PackageOpen className="mx-auto h-14 w-14 text-muted-foreground/40 stroke-1" />
                      <p className="text-sm text-muted-foreground mt-4">{s.noRecentOrder}</p>
                      <Link
                        to="/products"
                        className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                      >
                        {s.shopCta}
                      </Link>
                    </div>
                  ) : (
                    userOrders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
                      >
                        {/* Order banner info */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 bg-muted/20 px-5 py-4 text-xs font-medium text-muted-foreground">
                          <div className="flex gap-6">
                            <div>
                              <p className="uppercase tracking-wider font-semibold">{s.orderId}</p>
                              <p className="text-foreground font-bold mt-1 text-sm">{order.id}</p>
                            </div>
                            <div>
                              <p className="uppercase tracking-wider font-semibold">{s.date}</p>
                              <p className="text-foreground font-semibold mt-1 text-sm">
                                {formatDate(order.createdAt)}
                              </p>
                            </div>
                            <div>
                              <p className="uppercase tracking-wider font-semibold">{s.total}</p>
                              <p className="text-foreground font-bold mt-1 text-sm">
                                {formatPrice(order.subtotal, lang)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200/55">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {s.statusCompleted}
                            </span>
                          </div>
                        </div>

                        {/* Order items list */}
                        <div className="p-5 divide-y divide-border/40">
                          {order.items.map((item) => (
                            <div
                              key={item.productSlug}
                              className="flex gap-4 items-center py-4 first:pt-0 last:pb-0"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-xl object-contain bg-muted p-1 border"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-sm leading-tight text-foreground truncate">
                                  {item.name}
                                </h5>
                                <p className="text-muted-foreground text-xs mt-1.5">
                                  Qty {item.quantity} · {formatPrice(item.price, lang)}
                                </p>
                              </div>
                              <button
                                onClick={() => handleReorder(item)}
                                className="shrink-0 rounded-full border border-border hover:border-primary hover:text-primary bg-background px-4 py-2 text-xs font-semibold text-foreground/80 transition"
                              >
                                {s.actionReorder}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Account Profile Settings */}
              {activeTab === "settings" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="border-b border-border/60 pb-4 mb-6">
                    <h4 className="font-bold text-lg text-foreground">{s.settingsTitle}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{s.settingsSub}</p>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-foreground/85"
                        htmlFor="profile-name"
                      >
                        {s.fullName}
                      </label>
                      <input
                        id="profile-name"
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-foreground/85"
                        htmlFor="profile-email"
                      >
                        {s.emailAddress}
                      </label>
                      <input
                        id="profile-email"
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        className="text-xs font-semibold text-foreground/85"
                        htmlFor="profile-password"
                      >
                        {s.newPassword}
                      </label>
                      <input
                        id="profile-password"
                        type="password"
                        value={profilePassword}
                        onChange={(e) => setProfilePassword(e.target.value)}
                        placeholder={s.newPasswordPlaceholder}
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-primary placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
                    >
                      {isUpdating ? s.updating : s.saveChanges}
                    </button>
                  </form>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
