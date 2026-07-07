import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Lock,
  Download,
  Search,
  Trash2,
  BarChart3,
  Users,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  LogOut,
  Filter,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 1. 安全服务器端 API 辅助函数
const fetchWarrantiesFn = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { passcode: string } }) => {
    const correctPasscode = process.env.ADMIN_PASSWORD || "AnykingAdmin2026";
    if (data.passcode !== correctPasscode) {
      return { success: false, message: "访问口令错误，请重新输入。" };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase credentials missing. Returning mock data.");
      // 当本地开发环境没有配置 Supabase 密钥时，降级返回 Mock 数据以供开发演示
      const mockList = [
        {
          id: "mock-1",
          order_id: "123-4567890-1234567",
          full_name: "测试数据A",
          email: "test.a@example.com",
          phone: "+1 (555) 019-2834",
          product_model: "AnyKing A6 便携式显示器",
          created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: "mock-2",
          order_id: "456-1122334-4455667",
          full_name: "测试数据B",
          email: "test.b@qq.com",
          phone: "13800001111",
          product_model: "AnyKing S10 Pro 双屏扩展屏",
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: "mock-3",
          order_id: "789-9988776-6655443",
          full_name: "测试数据C",
          email: "test.c@science.org",
          phone: null,
          product_model: "AnyKing P7 便携副屏",
          created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        },
        {
          id: "mock-4",
          order_id: "101-2023030-4040505",
          full_name: "测试数据D",
          email: "test.d@gmail.com",
          phone: "18823459876",
          product_model: "AnyKing A6 便携式显示器",
          created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
        },
        {
          id: "mock-5",
          order_id: "303-4045050-6060707",
          full_name: "测试数据E",
          email: "test.e@avengers.com",
          phone: null,
          product_model: "AnyKing S15 Plus 双屏扩展屏",
          created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
        },
      ];
      return { success: true, data: mockList, isMock: true };
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/warranties?order=created_at.desc`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseServiceKey,
          "Authorization": `Bearer ${supabaseServiceKey}`,
        },
      });

      if (!response.ok) {
        return { success: false, message: "数据库拒绝了数据拉取请求。" };
      }

      const list = await response.json();
      return { success: true, data: list, isMock: false };
    } catch (err: any) {
      console.error("Fetch API error:", err);
      return { success: false, message: "服务器连接失败，请稍后重试。" };
    }
  });

const deleteWarrantyFn = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { passcode: string; id: string } }) => {
    const correctPasscode = process.env.ADMIN_PASSWORD || "AnykingAdmin2026";
    if (data.passcode !== correctPasscode) {
      return { success: false, message: "访问口令验证失败。" };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      // Mock 环境删除成功
      return { success: true, isMock: true };
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/warranties?id=eq.${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseServiceKey,
          "Authorization": `Bearer ${supabaseServiceKey}`,
        },
      });

      if (!response.ok) {
        return { success: false, message: "数据库物理删除记录失败。" };
      }

      return { success: true };
    } catch (err: any) {
      console.error("Delete API error:", err);
      return { success: false, message: "数据库连接失败。" };
    }
  });

// 2. 客户端路由页面
export const Route = createFileRoute("/admin/warranties")({
  component: AdminWarrantiesPage,
});

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b"];

function AdminWarrantiesPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [warranties, setWarranties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isMock, setIsMock] = useState(false);

  // 搜索和过滤状态
  const [searchQuery, setSearchQuery] = useState("");
  const [modelFilter, setModelFilter] = useState("all");

  // 页面加载时自动读取会话缓存口令
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem("admin_warranties_passcode");
    if (savedPasscode) {
      setPasscode(savedPasscode);
      loadWarranties(savedPasscode);
    }
  }, []);

  const loadWarranties = async (codeToVerify: string) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetchWarrantiesFn({ data: { passcode: codeToVerify } });
      if (res.success) {
        setWarranties(res.data || []);
        setIsAuthorized(true);
        setIsMock(!!res.isMock);
        sessionStorage.setItem("admin_warranties_passcode", codeToVerify);
      } else {
        setLoginError(res.message || "访问口令错误，请重新输入。");
        sessionStorage.removeItem("admin_warranties_passcode");
      }
    } catch (err: any) {
      setLoginError(err.message || "服务器请求失败。");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    loadWarranties(passcode.trim());
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setWarranties([]);
    setPasscode("");
    sessionStorage.removeItem("admin_warranties_passcode");
    toast.success("已成功锁定看板并退出登录。");
  };

  const handleDeleteRow = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`您确定要删除“${name}”的延保激活记录吗？此操作无法撤销。`);
    if (!confirmDelete) return;

    try {
      const res = await deleteWarrantyFn({ data: { passcode, id } });
      if (res.success) {
        toast.success(`已成功移除 ${name} 的延保激活记录。`);
        // 本地状态同步删除
        setWarranties(warranties.filter((w) => w.id !== id));
      } else {
        toast.error(res.message || "数据库删除记录失败。");
      }
    } catch (err: any) {
      toast.error(err.message || "网络请求失败，请稍后重试。");
    }
  };

  // CSV 电子表格导出
  const handleExportCSV = () => {
    if (warranties.length === 0) {
      toast.error("当前没有可导出的数据。");
      return;
    }

    const headers = ["记录ID", "亚马逊订单号", "客户姓名", "电子邮箱", "联系电话", "激活型号", "登记激活时间"];
    const rows = filteredData.map((w) => [
      w.id,
      w.order_id,
      w.full_name,
      w.email,
      w.phone || "未填写",
      w.product_model,
      new Date(w.created_at).toLocaleString(),
    ]);

    const csvContent =
      "\uFEFF" + // UTF-8 BOM，确保 Excel 打开中文不乱码
      [headers.join(","), ...rows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Anyking_延保注册报表_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV 电子数据报表已成功导出并下载。");
  };

  // 3. 计算统计指标及图表数据
  const filteredData = useMemo(() => {
    return warranties.filter((w) => {
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        w.order_id.toLowerCase().includes(query) ||
        w.full_name.toLowerCase().includes(query) ||
        w.email.toLowerCase().includes(query) ||
        (w.phone && w.phone.toLowerCase().includes(query));

      const matchModel = modelFilter === "all" || w.product_model === modelFilter;

      return matchQuery && matchModel;
    });
  }, [warranties, searchQuery, modelFilter]);

  const uniqueModels = useMemo(() => {
    return Array.from(new Set(warranties.map((w) => w.product_model)));
  }, [warranties]);

  const stats = useMemo(() => {
    const total = filteredData.length;
    
    // 今日新增
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayCount = filteredData.filter((w) => new Date(w.created_at) >= startOfToday).length;

    // 型号分布（用于饼图与柱状图）
    const modelMap: Record<string, number> = {};
    filteredData.forEach((w) => {
      modelMap[w.product_model] = (modelMap[w.product_model] || 0) + 1;
    });

    const modelDistribution = Object.keys(modelMap).map((name) => ({
      name,
      value: modelMap[name],
    }));

    // 计算激活量最高的明星机型
    let topModel = "无记录";
    let maxCount = 0;
    Object.keys(modelMap).forEach((name) => {
      if (modelMap[name] > maxCount) {
        maxCount = modelMap[name];
        topModel = name.replace("AnyKing ", "");
      }
    });

    return {
      total,
      todayCount,
      topModel,
      modelDistribution,
    };
  }, [filteredData]);

  // 口令锁定界面
  if (!isAuthorized) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">内部管理后台</h2>
              <p className="mt-2 text-sm text-slate-500">
                AnyKing 延保数据可视化与注册日志管理门户
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="passcode" className="sr-only">访问口令</label>
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg font-bold tracking-[0.2em] text-slate-900 placeholder:text-slate-300 placeholder:tracking-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  placeholder="请输入访问口令"
                />
              </div>

              {loginError && (
                <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
                  ⚠️ {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-full bg-primary py-3 px-4 text-sm font-extrabold text-primary-foreground shadow-md transition hover:bg-primary/95 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" /> 正在验证...
                  </span>
                ) : (
                  "解锁看板"
                )}
              </button>
            </form>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // 看板主页界面
  return (
    <SiteLayout>
      <div className="min-h-screen bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* 顶栏控制区 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                AnyKing 内部管理后台
              </span>
              <h1 className="mt-2 text-3xl font-black text-slate-900 tracking-tight">一年延保激活看板</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => loadWarranties(passcode)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                刷新数据
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-3.5 w-3.5" />
                锁定看板
              </button>
            </div>
          </div>

          {/* 本地未配置密钥时的提示横幅 */}
          {isMock && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">本地模拟演示模式已启用</h4>
                  <p className="mt-1 text-xs text-amber-700 leading-relaxed">
                    当前本地开发环境未检测到 Vercel 云端数据库环境变量（`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`）。为了展示看板设计与图表逻辑，已自动为您载入预填的模拟分析数据。线上部署后将自动切换为从您的 Supabase 数据库中安全拉取真实客户记录。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 指标总览卡片组 */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">累计激活总量</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-slate-900">{stats.total}</p>
              <span className="mt-1 block text-xs text-slate-400">数据库中已登记激活的设备总数</span>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">今日新增激活</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-slate-900">{stats.todayCount}</p>
              <span className="mt-1 block text-xs text-slate-400">今日凌晨 00:00 以来新提交的记录</span>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">明星激活屏幕</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-xl font-black text-slate-900 truncate">{stats.topModel}</p>
              <span className="mt-1 block text-xs text-slate-400">当前激活激活频次最高的机型</span>
            </div>
          </div>

          {/* 可视化数据图表 */}
          {stats.total > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {/* 柱状图 */}
              <div className="md:col-span-2 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  各机型注册激活量分布图
                </h3>
                <div className="mt-6 h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.modelDistribution} margin={{ bottom: 20 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" stroke="#64748b" />
                      <YAxis allowDecimals={false} stroke="#64748b" />
                      <Tooltip formatter={(value) => [`${value} 台已激活`, "激活量"]} />
                      <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 占比饼图 */}
              <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">各机型激活比例份额</h3>
                <div className="mt-4 h-52 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.modelDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {stats.modelDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  {stats.modelDistribution.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="truncate">{entry.name.replace("AnyKing ", "")}</span>
                      </div>
                      <span className="font-extrabold">{entry.value} 台</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 数据过滤与表格区 */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
            {/* 搜索过滤控制面板 */}
            <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center max-w-xl">
                {/* 搜索框 */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="按亚马逊订单号、客户姓名、邮箱或电话搜索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary transition"
                  />
                </div>
                {/* 产品机型筛选下拉框 */}
                <div className="relative shrink-0">
                  <Filter className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <select
                    value={modelFilter}
                    onChange={(e) => setModelFilter(e.target.value)}
                    className="appearance-none rounded-full border border-slate-200 bg-white pl-9 pr-8 py-2 text-xs font-bold text-slate-700 outline-none focus:border-primary transition cursor-pointer"
                  >
                    <option value="all">全部机型</option>
                    {uniqueModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Download className="h-3.5 w-3.5" />
                导出 CSV 表格
              </button>
            </div>

            {/* 核心数据记录列表 */}
            <div className="overflow-x-auto">
              {filteredData.length > 0 ? (
                <table className="w-full border-collapse text-left text-sm text-slate-500">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">激活日期</th>
                      <th className="px-6 py-4">亚马逊订单号</th>
                      <th className="px-6 py-4">客户姓名</th>
                      <th className="px-6 py-4">电子邮箱</th>
                      <th className="px-6 py-4">联系电话</th>
                      <th className="px-6 py-4">激活屏幕型号</th>
                      <th className="px-6 py-4 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition">
                        <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-slate-400">
                          {new Date(row.created_at).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-800 text-xs">
                          {row.order_id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900 text-xs">
                          {row.full_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-600">
                          {row.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500">
                          {row.phone || <span className="text-slate-300">未填写</span>}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-700">
                          <span className="inline-flex items-center rounded-md bg-orange-50 border border-orange-100 px-2 py-1 font-semibold text-orange-600">
                            {row.product_model.replace("AnyKing ", "")}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteRow(row.id, row.full_name)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
                            title="删除此行记录"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 text-center text-slate-400">
                  <ShieldAlert className="mx-auto h-12 w-12 text-slate-300" />
                  <p className="mt-4 text-sm font-bold">没有找到匹配的延保激活记录。</p>
                  <p className="mt-1 text-xs text-slate-400">可以尝试更改搜索词，或将机型筛选下拉框重置为“全部机型”。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
