import { getTechnicalNotes } from '@/lib/api';
import Link from 'next/link';
import { renderRichText } from '@/lib/rich-text-renderer';

export default async function BlogPage() {
  try {
    const notes = await getTechnicalNotes();
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">技术见解</h1>
            <p className="text-xl text-gray-600">分享前端开发、全栈实践和技术思考</p>
          </div>

          <div className="space-y-8">
            {notes.map((note: any) => (
              <article key={note.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <Link href={`/blog/${note.slug}`}> {/* 直接使用 note.slug */}
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 封面图 - 直接使用 note.coverImage */}
                    {note.coverImage?.data && (
                      <div className="md:w-48 md:shrink-0">
                        <img 
                          src={`http://localhost:1337${note.coverImage.data.url}`}
                          alt={note.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {note.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {note.excerpt || renderRichText(note.content).substring(0, 150) + '...'} {/* 直接使用 note.content */}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <time>
                          {new Date(note.publishedAt).toLocaleDateString('zh-CN')} {/* 直接使用 note.publishedAt */}
                        </time>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {notes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无技术文章</p>
              <p className="text-gray-400 text-sm mt-2">请在 Strapi 中创建并发布文章</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('博客列表加载失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">博客加载失败</h1>
          <p className="text-gray-600">请检查控制台错误信息</p>
        </div>
      </div>
    );
  }
}