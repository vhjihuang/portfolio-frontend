# 设计系统规范

## 🎨 颜色系统

### 主色调
- **Primary (青色)**: `cyan-500` (#06b6d4) - 用于主要按钮、链接
- **Secondary (紫色)**: `purple-600` (#9333ea) - 用于次要元素、渐变
- **Accent (粉色)**: `pink-500` (#ec4899) - 用于强调、渐变点缀

### 背景层级
- **深层**: `gray-900` (#111827) - 页面主背景
- **中层**: `gray-800` (#1f2937) - 卡片背景
- **浅层**: `gray-700` (#374151) - 悬停状态

### 文字颜色
- **标题**: `white` - 主标题
- **正文**: `gray-300` (#d1d5db) - 正文内容
- **次要**: `gray-400` (#9ca3af) - 辅助信息

---

## 📏 间距系统

### 组件内间距
- **xs**: 4px (1) - 标签内间距
- **sm**: 8px (2) - 小组件间距
- **md**: 16px (4) - 标准间距
- **lg**: 24px (6) - 卡片内间距
- **xl**: 32px (8) - 大卡片内间距

### 区块间距
- **section**: 96px (24) - 页面区块间距
- **container**: 80px (20) - 容器间距

---

## 🎭 动画系统

### 时长规范
- **快速**: 150ms - 小元素交互（按钮、图标）
- **标准**: 300ms - 卡片悬停、过渡
- **缓慢**: 500ms - 页面切换、大元素

### 缓动函数
- **标准**: `cubic-bezier(0.4, 0, 0.2, 1)` - 大部分交互
- **弹性**: `ease-in-out` - 浮动动画

### 动画延迟
- **序列动画**: 50ms 递增 - 列表项依次出现
- **背景元素**: 2s, 4s - 背景浮动元素

---

## 🔲 组件规范

### 玻璃态效果
```css
.glass-effect-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(167, 139, 250, 0.3);
}
```

### 卡片悬停
```css
.zzz-card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 50px rgba(139, 92, 246, 0.4);
}
```

### 渐变文字
```css
.gradient-text {
  background: linear-gradient(to right, #67e8f9, #c084fc, #f9a8d4);
  -webkit-background-clip: text;
  color: transparent;
}
```

---

## 📱 响应式断点

- **sm**: 640px - 小屏手机
- **md**: 768px - 平板
- **lg**: 1024px - 桌面
- **xl**: 1280px - 大屏

---

## ✨ 最佳实践

### 性能优化
1. 使用 `will-change: transform` 提示浏览器优化
2. 使用 `transform` 和 `opacity` 而非 `position` 动画
3. 减少 `backdrop-filter` 使用范围
4. 背景模糊效果使用 `blur-3xl` 而非更高值

### 可访问性
1. 保持文字对比度 > 4.5:1
2. 悬停状态明显可见
3. 焦点状态清晰
4. 动画可通过 `prefers-reduced-motion` 禁用

### 一致性
1. 所有页面使用相同的深色背景
2. 卡片统一使用 `glass-effect-dark`
3. 按钮统一使用渐变 + 光晕效果
4. 标题统一使用 `gradient-text`

---

## 🎯 组件使用示例

### 主要按钮
```tsx
<button className="px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] zzz-card-hover">
  按钮文字
</button>
```

### 次要按钮
```tsx
<button className="px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg zzz-card-hover">
  按钮文字
</button>
```

### 卡片
```tsx
<div className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-300 p-8 zzz-card-hover">
  卡片内容
</div>
```

### 区块标题
```tsx
<div className="text-center mb-20">
  <h2 className="text-3xl md:text-5xl font-black text-white mb-4">标题</h2>
  <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
  <p className="text-gray-300 max-w-2xl mx-auto text-lg">描述文字</p>
</div>
```
