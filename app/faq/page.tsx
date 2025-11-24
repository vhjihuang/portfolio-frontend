'use client'

import { useState, useEffect } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

interface FAQCategory {
  category: string;
  questions: FAQ[];
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadFaqs() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs?sort[0]=order:asc`);
        const data = await response.json();

        // 按分类组织数据
        const categorized: Record<string, FAQ[]> = {};
        data.data.forEach((item: any) => {
          const category = item.category || '其他';
          if (!categorized[category]) {
            categorized[category] = [];
          }
          categorized[category].push({
            id: item.id,
            question: item.question,
            answer: item.answer,
            category: item.category,
            order: item.order
          });
        });

        // 转换为数组格式
        const faqArray: FAQCategory[] = Object.keys(categorized).map(cat => ({
          category: cat,
          questions: categorized[cat]
        }));

        setFaqs(faqArray);
      } catch (error) {
        console.error('获取FAQ失败:', error);
        // 使用静态数据作为后备
        setFaqs(staticFaqs);
      } finally {
        setLoading(false);
      }
    }

    loadFaqs();
  }, []);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  // 搜索过滤
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 px-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6">常见问题</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            这里整理了客户最常问的问题，希望能帮助您更好地了解我们的服务
          </p>

          {/* 搜索框 */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索问题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-black/30 border border-purple-400/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ列表 */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-12">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* 分类标题 */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-linear-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                </div>

                {/* 问题���表 */}
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <div
                        key={item.id}
                        className="glass-effect-dark rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                      >
                        {/* 问题 */}
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-black/20 transition-colors"
                        >
                          <span className="text-white font-medium pr-4">{item.question}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                              }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* 答案 */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
                          <div className="px-6 pb-5 pt-2 text-gray-300 leading-relaxed border-t border-purple-400/20">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 text-lg">没有找到相关问题</p>
          </div>
        )}

        {/* 联系CTA */}
        <div className="mt-16 glass-effect-dark rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <h3 className="text-2xl font-bold text-white mb-3">没有找到答案？</h3>
          <p className="text-gray-300 mb-6">
            欢迎直接联系我们，我会尽快为您解答
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            联系我们
          </a>
        </div>
      </div>
    </div>
  );
}

// 静态数据作为后备
const staticFaqs: FAQCategory[] = [
  {
    category: '服务相关',
    questions: [
      {
        id: 1,
        question: '你们提供哪些类型的Web开发服务？',
        answer: '我们提供企业官网开发、Web应用开发、UI/UX设计、性能优化、SEO优化和技术咨询等全方位服务。',
        category: '服务相关'
      }
    ]
  }
];
