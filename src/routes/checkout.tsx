import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ChangeEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/context/CartContext";
import { useLang, formatPrice } from "@/i18n/LangContext";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Package,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

type PaymentMethod = "card" | "paypal";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  cardNumber: string;
  expiration: string;
  securityCode: string;
  cardName: string;
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { lang } = useLang();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiration: "",
    securityCode: "",
    cardName: "",
  });

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const tax = useMemo(() => cartSubtotal * 0.08, [cartSubtotal]);
  const shipping = cartItems.length > 0 ? 0 : 0;
  const total = cartSubtotal + tax + shipping;

  const label = {
    en: {
      title: "Checkout",
      subtitle: "Complete your order in a simple, Amazon-style flow.",
      express: "Express checkout",
      contact: "Contact",
      delivery: "Delivery",
      payment: "Payment",
      summary: "Order summary",
      placeOrder: "Place order",
      continueShopping: "Continue shopping",
      emptyTitle: "Your cart is empty",
      emptyBody: "Add a monitor to your cart before starting checkout.",
      successTitle: "Order confirmed",
      successBody: "Your checkout is complete and your cart has been cleared.",
    },
    ja: {
      title: "チェックアウト",
      subtitle: "Amazon風のシンプルな流れで注文を完了します。",
      express: "エクスプレスチェックアウト",
      contact: "連絡先",
      delivery: "配送先",
      payment: "支払い",
      summary: "注文概要",
      placeOrder: "注文を確定",
      continueShopping: "買い物を続ける",
      emptyTitle: "カートが空です",
      emptyBody: "チェックアウトを開始する前に商品を追加してください。",
      successTitle: "注文が確定しました",
      successBody: "チェックアウトが完了し、カートは空になりました。",
    },
  }[lang];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateAndSubmit = () => {
    const nextErrors: Record<string, boolean> = {};

    if (!formData.email || !formData.email.includes("@")) nextErrors.email = true;
    if (!formData.firstName.trim()) nextErrors.firstName = true;
    if (!formData.lastName.trim()) nextErrors.lastName = true;
    if (!formData.address.trim()) nextErrors.address = true;
    if (!formData.city.trim()) nextErrors.city = true;
    if (!formData.state.trim()) nextErrors.state = true;
    if (!formData.zip.trim()) nextErrors.zip = true;
    if (!formData.phone.trim()) nextErrors.phone = true;

    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) nextErrors.cardNumber = true;
      if (!formData.expiration.trim()) nextErrors.expiration = true;
      if (!formData.securityCode.trim()) nextErrors.securityCode = true;
      if (!formData.cardName.trim()) nextErrors.cardName = true;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage(
        lang === "ja"
          ? "赤枠の必須項目を入力してください。"
          : "Please complete all required fields marked in red.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    clearCart();
    setOrderNumber(`AK-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderPlaced(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-sky-500 ${
      errors[field] ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
    }`;

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <SiteLayout>
        <div className="min-h-screen bg-neutral-50 px-4 pt-24 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingBag className="h-12 w-12 text-sky-500" />
            <h1 className="mt-5 text-3xl font-bold">{label.emptyTitle}</h1>
            <p className="mt-3 max-w-lg text-sm text-gray-500">{label.emptyBody}</p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
            >
              {label.continueShopping}
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (orderPlaced) {
    return (
      <SiteLayout>
        <div className="min-h-screen bg-neutral-50 px-4 pt-24 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-10 w-10 text-emerald-500" />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{label.successTitle}</h1>
                <p className="text-gray-500">{label.successBody}</p>
                <p className="text-sm text-gray-400">
                  {lang === "ja" ? "注文番号" : "Order number"}: {orderNumber}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
              >
                {label.continueShopping}
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-50"
              >
                {lang === "ja" ? "ホームへ戻る" : "Back to home"}
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-neutral-100 px-4 pb-20 pt-24 text-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {!!message && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {message}
            </div>
          )}

          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gray-400">
            <Link to="/" className="font-medium text-sky-600">
              Anyking
            </Link>
            <span>&gt;</span>
            <span className="text-gray-900">{label.title}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gray-400">
                  {label.express}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="h-12 rounded-xl bg-[#5a31f4] text-base font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Shop Pay
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://www.paypal.com/checkoutnow", "_blank", "noopener,noreferrer")
                    }
                    className="h-12 rounded-xl bg-[#ffc439] text-base font-black italic text-[#003087] shadow-sm transition hover:opacity-95"
                  >
                    PayPal
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400">{lang === "ja" ? "または" : "OR"}</p>
              </div>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold tracking-tight">{label.contact}</h2>
                  <p className="text-sm text-gray-500">
                    {lang === "ja" ? "ログイン済みのアカウントを使用できます" : "Use a saved account if you have one"}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={lang === "ja" ? "名 *" : "First name *"}
                    className={inputClass("firstName")}
                  />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={lang === "ja" ? "姓 *" : "Last name *"}
                    className={inputClass("lastName")}
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={lang === "ja" ? "メールアドレス *" : "Email *"}
                  className={inputClass("email")}
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={lang === "ja" ? "電話番号 *" : "Phone number *"}
                  className={inputClass("phone")}
                />
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{label.delivery}</h2>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass("state")}
                >
                  <option value="">{lang === "ja" ? "州/地域 *" : "State / region *"}</option>
                  <option value="CA">CA</option>
                  <option value="NY">NY</option>
                  <option value="TX">TX</option>
                  <option value="WA">WA</option>
                  <option value="Tokyo">{lang === "ja" ? "東京" : "Tokyo"}</option>
                  <option value="Osaka">{lang === "ja" ? "大阪" : "Osaka"}</option>
                </select>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={lang === "ja" ? "住所 *" : "Address *"}
                  className={inputClass("address")}
                />
                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder={lang === "ja" ? "建物名・部屋番号（任意）" : "Apartment, suite, etc. (optional)"}
                  className={inputClass("apartment")}
                />
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_120px]">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={lang === "ja" ? "市区町村 *" : "City *"}
                    className={inputClass("city")}
                  />
                  <input
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder={lang === "ja" ? "郵便番号 *" : "ZIP *"}
                    className={inputClass("zip")}
                  />
                  <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-500">
                    <option>{lang === "ja" ? "国" : "Country"}</option>
                    <option>United States</option>
                    <option>Japan</option>
                    <option>China</option>
                  </select>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{label.payment}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      paymentMethod === "card"
                        ? "border-sky-500 bg-sky-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Lock className="h-4 w-4 text-sky-600" />
                      Card
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {lang === "ja" ? "カード情報を入力して注文します" : "Pay with card details"}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      paymentMethod === "paypal"
                        ? "border-sky-500 bg-sky-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="h-4 w-4 text-sky-600" />
                      PayPal
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {lang === "ja" ? "外部の PayPal 画面で続行" : "Continue in the PayPal flow"}
                    </p>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <input
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder={lang === "ja" ? "カード名義 *" : "Name on card *"}
                      className={inputClass("cardName")}
                    />
                    <input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder={lang === "ja" ? "カード番号 *" : "Card number *"}
                      className={inputClass("cardNumber")}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        name="expiration"
                        value={formData.expiration}
                        onChange={handleChange}
                        placeholder={lang === "ja" ? "有効期限 *" : "Expiration *"}
                        className={inputClass("expiration")}
                      />
                      <input
                        name="securityCode"
                        value={formData.securityCode}
                        onChange={handleChange}
                        placeholder={lang === "ja" ? "セキュリティコード *" : "Security code *"}
                        className={inputClass("securityCode")}
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-sky-600" />
                  <h2 className="text-xl font-bold">{label.summary}</h2>
                </div>

                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.slug} className="flex gap-3">
                      <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-gray-50 p-1">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-tight">{item.product.name}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty {item.quantity} · {formatPrice(item.product.price, lang)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      {lang === "ja" ? "商品数" : "Items"}
                    </span>
                    <span className="font-medium">{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      {lang === "ja" ? "小計" : "Subtotal"}
                    </span>
                    <span className="font-medium">{formatPrice(cartSubtotal, lang)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      {lang === "ja" ? "配送" : "Shipping"}
                    </span>
                    <span className="font-medium text-emerald-600">
                      {lang === "ja" ? "無料" : "Free"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{lang === "ja" ? "税" : "Tax"}</span>
                    <span className="font-medium">{formatPrice(tax, lang)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base">
                    <span className="font-semibold">{lang === "ja" ? "合計" : "Total"}</span>
                    <span className="text-2xl font-bold">{formatPrice(total, lang)}</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2 text-gray-900">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">
                      {lang === "ja" ? "安全なチェックアウト" : "Secure checkout"}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed">
                    {lang === "ja"
                      ? "このデモ環境では、注文確定後にカートを空にして完了画面へ進みます。"
                      : "In this demo, placing the order clears the cart and shows a confirmation screen."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={validateAndSubmit}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700"
                >
                  {label.placeOrder}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
