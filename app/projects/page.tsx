import { getProjects } from '@/lib/api';
import Link from 'next/link';

export default async function ProjectsPage() {
  try {
    const projects = await getProjects();
    console.log('projects', projects)

    return (
      <div className="min-h-screen bg-linear-to-br from-stone-50 via-sky-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-100 via-yellow-100 to-stone-200 rounded-lg blur opacity-75"></div>
              <h1 className="relative text-4xl font-bold text-stone-800 mb-4">
                我的项目
              </h1>
            </div>
            <p className="text-xl text-stone-600 mt-4 max-w-2xl mx-auto">
              探索我在全栈开发领域的实践与创新
            </p>
          </div>

          {/* 项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.documentId}`}
                className="group"
              >
                <div className="bg-linear-to-br from-white to-stone-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-stone-100 h-full">
                  {/* 项目封面图 */}
                  <div className="aspect-video bg-linear-to-r from-sky-100 to-blue-100 relative overflow-hidden">
                    {project.coverImage?.data ? (
                      <img 
                        src={`http://localhost:1337${project.coverImage.data.url}`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <div className="text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>暂无图片</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* 项目信息 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-stone-800 group-hover:text-sky-700 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs px-3 py-1 bg-linear-to-r from-amber-500 to-stone-600 text-white rounded-full font-bold">
                        {project.projectType}
                      </span>
                    </div>
                    
                    <p className="text-stone-600 mb-4 line-clamp-2 group-hover:text-stone-800 transition-colors">
                      {project.description}
                    </p>

                    {/* 技能标签 */}
                    <div className="flex flex-wrap gap-2">
                      {project.skills?.data?.slice(0, 3).map((skill: any) => (
                        <span 
                          key={skill.id}
                          className="text-xs px-3 py-1 bg-linear-to-br from-stone-100 to-stone-50 text-stone-700 rounded-full border border-stone-200 group-hover:from-stone-200 group-hover:to-stone-100 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 空状态 */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-linear-to-br from-stone-100 to-stone-200 rounded-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">暂无项目</h3>
              <p className="text-stone-600 max-w-md mx-auto">正在积极创作中，敬请期待更多精彩项目！</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('项目数据获取失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-50 via-sky-50 to-blue-50">
        <div className="text-center bg-linear-to-br from-white to-stone-50 p-8 rounded-2xl shadow-lg max-w-md border border-stone-100">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">项目加载失败</h1>
          <p className="text-stone-600 mb-4">请稍后重试或联系网站管理员</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-linear-to-r from-sky-500 to-stone-600 text-white rounded-lg font-semibold hover:from-sky-600 hover:to-stone-700 transition-all shadow-md hover:shadow-lg"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }
}