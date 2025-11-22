import { getTechnicalNotes } from '@/lib/api';
import Link from 'next/link';
import { renderRichText } from '@/lib/rich-text-renderer';

export default async function BlogPage() {
  try {
    const notes = await getTechnicalNotes();
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 overflow-hidden relative">
        {/* 背景装饰元素 */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative" style={{ zIndex: 1 }}>
          {/* 页面标题 */}
          <div className="text-center mb-16 pt-8">
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 animate-pulse-glow"></div>
              <h1 className="relative text-4xl md:text-5xl font-black text-white">
                技术见解
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
              分享前端开发、全栈实践和技术思考
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* 文章列表 */}
          <div className="space-y-6">
            {notes.map((note: any, index: number) => (
              <article
                key={note.id}
                className="glass-effect-strong rounded-2xl hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-500 overflow-hidden group zzz-card-hover"
              >
                <Link href={`/blog/${note.slug}`}>
                  <div className="flex flex-col md:flex-row gap-0">
                    {/* 封面图 */}
                    {note.coverImage?.data && (
                      <div className="md:w-64 md:shrink-0 relative overflow-hidden">
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${note.coverImage.data.url}`}
                          alt={note.title}
                          className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent to-gray-900/50"></div>
                      </div>
                    )}

                    <div className="flex-1 p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {note.title}
                      </h2>

                      <p className="text-gray-200 mb-6 line-clamp-2 text-base leading-relaxed group-hover:text-white transition-colors">
                        {note.excerpt || renderRichText(note.content).substring(0, 150) + '...'}
                      </p>

                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-300 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(note.publishedAt).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>

                        <span className="text-cyan-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                          阅读文章
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* 空状态 */}
          {notes.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-8 glass-effect-dark rounded-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">暂无技术文章</h3>
              <p className="text-gray-400 max-w-md mx-auto">正在积极创作中，敬请期待精彩内容！</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('博客列表加载失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center glass-effect-dark p-8 rounded-2xl shadow-lg max-w-md">
          <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">博客加载失败</h1>
          <p className="text-gray-300 mb-4">请稍后重试或联系网站管理员</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }
}