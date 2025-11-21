# 快速参考指南

## 🎨 常用组件代码片段

### 页面容器

```tsx
<div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 overflow-hidden">
  {/* 背景装饰 */}
  <div className="fixed inset-0 z-0">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
  </div>

  {/* 内容 */}
  <div className="max-w-5xl mx-auto px-4 relative z-10">{/* 你的内容 */}</div>
</div>
```

### 区块标题

```tsx
<div className="text-center mb-20 fade-in-up">
  <h2 className="text-3xl md:text-5xl font-black text-white mb-4">标题文字</h2>
  <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
  <p className="text-gray-300 max-w-2xl mx-auto text-lg">描述文字</p>
</div>
```

### 玻璃态卡片

```tsx
<div className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-300 p-8 zzz-card-hover">{/* 卡片内容 */}</div>
```

### 主要按钮

```tsx
<button className="px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] zzz-card-hover flex items-center gap-2">
  <svg className="h-5 w-5" /* icon */ />
  按钮文字
</button>
```

### 次要按钮

```tsx
<button className="px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg zzz-card-hover border border-purple-400/30">按钮文字</button>
```

### 标签

```tsx
<span className="px-4 py-2 glass-effect text-gray-200 rounded-full text-sm font-medium hover:bg-black/30 transition-colors">标签文字</span>
```

### 渐变文字

```tsx
<h1 className="text-4xl md:text-6xl font-black gradient-text">渐变标题</h1>
```

### 带装饰的内容块

```tsx
<div className="flex items-start gap-6">
  <div className="shrink-0 w-1 h-24 bg-linear-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
  <div>{/* 内容 */}</div>
</div>
```

---

## 🎯 常用类名组合

### 响应式文字

- 小标题: `text-lg md:text-xl`
- 中标题: `text-2xl md:text-3xl`
- 大标题: `text-3xl md:text-5xl`
- 超大标题: `text-4xl md:text-6xl`

### 间距

- 区块间距: `py-24`
- 卡片内间距: `p-8 md:p-12`
- 元素间距: `gap-4 md:gap-6`
- 底部间距: `mb-20`

### 圆角

- 小圆角: `rounded-xl` (12px)
- 标准圆角: `rounded-2xl` (16px)
- 大圆角: `rounded-3xl` (24px)

### 阴影

- 标准阴影: `shadow-[0_0_30px_rgba(139,92,246,0.2)]`
- 悬停阴影: `hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]`
- 按钮光晕: `shadow-[0_0_30px_#00f5ff]`

---

## 🔧 常用工具类

### 动画

- 淡入上移: `fade-in-up`
- 卡片悬停: `zzz-card-hover`
- 浮动效果: `animate-float`
- 脉冲光晕: `animate-pulse-glow`

### 玻璃态

- 浅色玻璃: `glass-effect`
- 深色玻璃: `glass-effect-dark`

### 渐变

- 渐变文字: `gradient-text`
- 渐变背景: `bg-linear-to-r from-cyan-600 to-purple-600`

---

## 📱 响应式断点

```tsx
// 移动优先
className="text-base md:text-lg lg:text-xl"

// 常用断点
sm: 640px   // 小屏手机
md: 768px   // 平板
lg: 1024px  // 桌面
xl: 1280px  // 大屏
```

---

## 🎨 颜色速查

### 主色

- 青色: `cyan-500` `cyan-600` `cyan-400`
- 紫色: `purple-500` `purple-600` `purple-400`
- 粉色: `pink-500` `pink-600` `pink-400`

### 灰度

- 背景: `gray-900` `gray-800` `gray-700`
- 文字: `white` `gray-300` `gray-400`

### 透明度

- 10%: `/10`
- 20%: `/20`
- 30%: `/30`
- 50%: `/50`

---

## ⚡ 性能优化提示

1. **使用 transform 而非 position**

   ```tsx
   // ✅ 好
   className = "transform hover:-translate-y-2";

   // ❌ 避免
   className = "hover:top-[-8px]";
   ```

2. **添加 will-change**

   ```tsx
   // 对频繁动画的元素
   style={{ willChange: 'transform' }}
   ```

3. **减少 backdrop-filter 使用**

   ```tsx
   // ✅ 只在必要时使用
   className = "backdrop-blur-md";

   // ❌ 避免过度使用
   className = "backdrop-blur-3xl";
   ```

4. **使用 GPU 加速**
   ```tsx
   // ✅ 使用 translate3d
   transform: translate3d(0, 0, 0);
   ```

---

## 🐛 常见问题

### Q: 动画不流畅？

A: 检查是否使用了 `transform` 和 `opacity`，避免使用 `width`、`height`、`top`、`left`

### Q: 玻璃态效果不明显？

A: 确保父元素有背景，`backdrop-filter` 需要有内容才能模糊

### Q: 渐变文字不显示？

A: 检查是否同时使用了 `text-transparent` 和 `bg-clip-text`

### Q: 卡片悬停不抬起？

A: 确保添加了 `zzz-card-hover` 类名

---

## 📚 相关文档

- [设计系统规范](./DESIGN_SYSTEM.md) - 完整的设计规范
- [优化总结](./OPTIMIZATION_SUMMARY.md) - 优化前后对比
- [Tailwind 文档](https://tailwindcss.com/docs) - 官方文档

---

## 💡 最佳实践

1. **保持一致性** - 使用相同的组件模式
2. **移动优先** - 先设计移动端，再适配桌面
3. **性能优先** - 避免过度动画和效果
4. **可访问性** - 确保键盘导航和屏幕阅读器支持
5. **语义化** - 使用正确的 HTML 标签

---

快速开始新页面：

```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-4">页面标题</h1>
          <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
        </div>

        {/* 你的内容 */}
      </div>
    </div>
  );
}
```
