
## 目标

1. 把用户上传的 7 张 A+ 图（2–8.jpg）按产品逻辑顺序铺进 A6 商品页的 A+ 区域。
2. 参考最后一张参考图（image-2.png）的暗色风格，新增一组 **可配置** 的展示模块（每个产品的数据中可填，不写死在路由里）：
   - 顶部全宽 hero banner + 居中标题文案
   - "Unmatched clarity" 4 格小图网格（每格带 eyebrow 小字 + 主标题）
   - "Deploy it" 左图右文 split 区块（标题 + 描述）

---

## 1. 资源接入

把 7 张上传图复制为 A6 的新 A+ banner，替换/扩展现有 `a6-aplus-*.jpg`：

```
user-uploads://2.jpg → src/assets/a6-aplus-1.jpg  (Maximize screen / multitasking)
user-uploads://7.jpg → src/assets/a6-aplus-2.jpg  (1080P FHD 14" IPS display)
user-uploads://3.jpg → src/assets/a6-aplus-3.jpg  (Ultra-slim 1.87lb / stability)
user-uploads://4.jpg → src/assets/a6-aplus-4.jpg  (Universal fit & compatibility)
user-uploads://5.jpg → src/assets/a6-aplus-5.jpg  (Flexible viewing modes)
user-uploads://6.jpg → src/assets/a6-aplus-6.jpg  (Plug & play USB-C / HDMI)
user-uploads://8.jpg → src/assets/a6-aplus-7.jpg  (Remote / Travel / Home scenes)
```

顺序逻辑：**核心卖点 → 显示 → 工艺 → 兼容 → 形态 → 接口 → 使用场景**。

A6 数据里 `aplus.banners` 保持 `[1..7]` 顺序即可（已是这个数组形态）。

---

## 2. 数据结构扩展（`src/data/products.ts`）

在 `aplus` 类型上**新增 3 个可选字段**（向后兼容，S10 Pro 不填就不渲染）：

```ts
aplus?: {
  // ...已有字段
  comfort?: {
    image: string;                          // 全宽 hero 图
    title: { en: string; ja: string };      // "Be comfortable everywhere"
  };
  clarity?: {
    title: { en: string; ja: string };      // "Unmatched clarity, superior quality"
    items: {                                // 固定 4 项（少于 4 也能渲染）
      image: string;
      eyebrow: { en: string; ja: string };  // "Twice the screen space"
      label: { en: string; ja: string };    // "Dual 14-inch"
    }[];
  };
  deploy?: {
    image: string;                          // 左侧产品图
    title: { en: string; ja: string };      // "Deploy it"
    body: { en: string; ja: string };       // 段落描述
  };
};
```

为 A6 填入对应内容（中英/日双语），图片复用 A6 已有图或现有 banner 切图。

---

## 3. 路由渲染（`src/routes/products.$slug.tsx`）

在现有 `product.aplus` 黑底容器内、`banners` 之后追加 3 段可选 section：

- **Comfort hero**：全宽图 + 居中 absolute 白色大标题（与参考图一致）。
- **Clarity grid**：`text-white` 标题左对齐 + `grid-cols-2 lg:grid-cols-4 gap-3` 缩略图网格，每格底部叠 eyebrow + label 文案（白字 + 微透明）。少于 4 项自动降级列数（1/2/3/4）。
- **Deploy split**：`grid lg:grid-cols-2`，左侧暗背景产品图，右侧标题 + 灰色描述段落，垂直居中。

所有文案走 `lang`，沿用 motion 进入动画与现有黑底排版。其他产品不填这些字段就跳过渲染。

---

## 技术细节

- 不动 S10 Pro 的 `aplus`，新字段都是 `optional`。
- 4 格 grid 与现有 `scenes` grid 的降级逻辑一致，复用同一写法。
- Comfort hero 标题用 `absolute inset-0 flex items-center justify-center`，文字 `text-white text-3xl md:text-5xl font-semibold`。
- Deploy split 卡片用 `bg-neutral-900 rounded-2xl` 突出参考图里的深色卡感。
- 不引入新依赖；继续 Tailwind + motion/react。
