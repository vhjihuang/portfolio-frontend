import { getTechnicalNoteBySlug } from '@/lib/api';
import { renderRichText } from '@/lib/rich-text-renderer';
import Link from 'next/link';

export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;

  try {
    const note = await getTechnicalNoteBySlug(slug);

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 overflow-hidden relative">
        {/* 背景装饰元素 */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative" style={{ zIndex: 1 }}>
          {/* 面包屑导航 */}
          <nav className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回技术见解
            </Link>
          </nav>

          {/* 文章内容 */}
          <article className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.3)] overflow-hidden">
            {/* 文章头部 */}
            <div className="p-8 md:p-12 border-b border-purple-400/20">
              <h1 className="text-3xl md:text-5xl font-black gradient-text mb-6">
                {note.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-400">
                <time className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  发布于 {new Date(note.publishedAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* 文章正文 */}
            <div className="p-8 md:p-12 prose prose-invert prose-lg max-w-none">
              {renderRichText(note.content) || (
                <p className="text-gray-400">暂无内容</p>
              )}
            </div>
          </article>

          {/* 返回按钮 */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 glass-effect-dark text-white rounded-xl font-bold hover:bg-black/50 transition-all shadow-lg border border-purple-400/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回技术见解
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error(`文章详情加载失败 (${slug}):`, error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center glass-effect-dark p-8 rounded-2xl shadow-lg max-w-md">
          <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">文章未找到</h1>
          <p className="text-gray-300 mb-2">Slug: {slug}</p>
          <p className="text-red-300 text-sm mb-4">{error.message}</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            返回技术见解
          </Link>
        </div>
      </div>
    );
  }
}