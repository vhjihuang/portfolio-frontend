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
      <>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8 border-b border-gray-200">
                <nav className="text-sm text-gray-500 mb-4">
                  <Link href="/blog" className="hover:text-blue-600">技术见解</Link>
                  <span className="mx-2">/</span>
                  <span>{note.title}</span> {/* 直接使用 note.title */}
                </nav>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {note.title} {/* 直接使用 note.title */}
                </h1>

                <div className="text-gray-600 text-sm">
                  <time>
                    发布于 {new Date(note.publishedAt).toLocaleDateString('zh-CN')} {/* 直接使用 note.publishedAt */}
                  </time>
                </div>
              </div>

              <div className="p-8 prose prose-gray max-w-none">
                {renderRichText(note.content) || (
                  <p className="text-gray-500">暂无内容</p>
                )}
              </div>
            </article>

            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← 返回技术见解
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error: any) {
    console.error(`文章详情加载失败 (${slug}):`, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">文章未找到</h1>
          <p className="text-gray-600">Slug: {slug}</p>
          <p className="text-red-500 text-sm mt-2">{error.message}</p>
          <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            返回技术见解
          </Link>
        </div>
      </div>
    );
  }
}