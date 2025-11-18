// lib/rich-text-renderer.tsx

// 手动解析 Strapi Rich Text 格式
export function renderRichText(content: any): string {
  if (!content) return '';
  
  // 如果是字符串，直接返回
  if (typeof content === 'string') return content;
  
  // 如果是数组，递归提取文本
  if (Array.isArray(content)) {
    return content.map(item => {
      if (item.type === 'paragraph' && item.children) {
        return item.children.map((child: any) => child.text || '').join('');
      }
      if (item.children) {
        return item.children.map((child: any) => child.text || '').join('');
      }
      return item.text || '';
    }).join(' ');
  }
  
  // 如果是对象，尝试提取文本
  if (content.children && Array.isArray(content.children)) {
    return content.children.map((child: any) => child.text || '').join('');
  }
  
  return '';
}

// 组件版本
export function RichText({ content }: { content: any }) {
  const text = renderRichText(content);
  
  if (!text) return null;
  
  return (
    <div className="prose prose-gray max-w-none">
      {text.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}