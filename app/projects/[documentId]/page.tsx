import { getProjects, getProjectById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { renderRichText } from '@/lib/rich-text-renderer'

interface PageProps {
  params: Promise<{ documentId: string }>;
}

export default async function ProjectDetailPage({ 
  params 
}: PageProps) {
  try {
    const { documentId } = await params;
    const project = await getProjectById(documentId);
    
    if (!project) {
      notFound();
    }

    const projectData = project;

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 overflow-hidden relative">
        {/* 背景装饰元素 */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative" style={{ zIndex: 1 }}>
          {/* 项目头部 */}
          <div className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.3)] overflow-hidden mb-8">
            {/* 封面图 */}
            {projectData.coverImage?.data && (
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${projectData.coverImage.data.url}`}
                  alt={projectData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-linear-to-r from-cyan-500/30 to-purple-500/30 text-cyan-100 rounded-full text-sm font-bold border border-cyan-400/30">
                  {projectData.projectType}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black gradient-text mb-6">
                {projectData.title}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {projectData.description}
              </p>

              {/* 技能标签 */}
              {projectData.skills && projectData.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wider">技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.skills.map((skill: any) => (
                      <span 
                        key={skill.id}
                        className="px-4 py-2 glass-effect text-gray-200 rounded-full text-sm font-medium hover:bg-black/30 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 项目链接 */}
              <div className="flex flex-wrap gap-4">
                {projectData.projectUrl && (
                  <a 
                    href={`https://${projectData.projectUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] flex items-center gap-2 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    访问项目
                  </a>
                )}
                {projectData.githubUrl && (
                  <a 
                    href={projectData.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 glass-effect-dark text-white rounded-xl font-bold hover:bg-black/50 transition-all shadow-lg flex items-center gap-2 group border border-purple-400/30"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 项目详情内容 */}
          <div className="grid gap-6">
            <section className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-linear-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">项目挑战</h2>
              </div>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                {renderRichText(projectData.challenge) || (
                  <p className="text-gray-400">暂无挑战描述</p>
                )}
              </div>
            </section>

            <section className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-linear-to-b from-purple-400 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">解决方案</h2>
              </div>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                {renderRichText(projectData.solution) || (
                  <p className="text-gray-400">暂无解决方案描述</p>
                )}
              </div>
            </section>

            <section className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-linear-to-b from-pink-400 to-cyan-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">项目成果</h2>
              </div>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                {renderRichText(projectData.outcome) || (
                  <p className="text-gray-400">暂无成果描述</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('项目详情加载失败:', error);
    notFound();
  }
}