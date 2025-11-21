import { getProjects } from '@/lib/api';
import Link from 'next/link';

export default async function ProjectsPage() {
  try {
    const projects = await getProjects();

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-12 overflow-hidden relative">
        {/* 背景装饰元素 - 增强绝区零风格 */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-pink-500/5 rounded-full blur-3xl animate-float animation-delay-4000"></div>
          
          {/* 添加类似绝区零的故障效果元素 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-glow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative" style={{ zIndex: 1 }}>
          {/* 页面标题 - 添加绝区零风格的故障效果 */}
          <div className="text-center mb-16 pt-8 slide-in-top">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 animate-pulse-glow"></div>
              <h1 className="relative text-4xl md:text-5xl font-black gradient-text mb-6 glitch-effect" data-text="我的项目作品">
                我的项目作品
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium slide-in-bottom">
              探索我在全栈开发领域的创新实践和项目成果
            </p>
          </div>

          {/* 项目网格 - 增强动画效果和视觉样式 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.documentId}`}
                className="group glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] overflow-hidden transform zzz-card-hover relative"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* 添加类似绝区零的边框效果 */}
                <div className="absolute inset-0 gradient-border rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* 项目封面 */}
                <div className="aspect-video bg-linear-to-br from-gray-800/50 to-black/50 relative overflow-hidden">
                  {project.coverImage?.data ? (
                    <img 
                      src={`http://localhost:1337${project.coverImage.data.url}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* 项目信息 */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-black gradient-text group-hover:from-cyan-200 group-hover:to-purple-200 transition-all glitch-effect" data-text={project.title}>
                      {project.title}
                    </h2>
                    <span className="text-sm px-4 py-2 bg-linear-to-r from-cyan-500/30 to-purple-500/30 text-cyan-100 rounded-full font-bold">
                      {project.projectType}
                    </span>
                  </div>

                  <p className="text-gray-300 text-base mb-6 line-clamp-2 group-hover:text-gray-100 transition-colors font-medium">
                    {project.description}
                  </p>

                  {/* 技能标签 - 增加动画效果 */}
                  <div className="flex flex-wrap gap-3">
                    {project.skills?.data?.slice(0, 4).map((skill: any, skillIndex: number) => (
                      <span 
                        key={skill.id}
                        className="text-xs px-3 py-1 glass-effect text-gray-200 rounded-full hover:bg-black/30 transition-colors"
                        style={{
                          animationDelay: `${skillIndex * 50}ms`
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 空状态 */}
          {projects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block p-6 glass-effect-dark rounded-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">暂无项目</h3>
              <p className="text-gray-500 max-w-md mx-auto">正在积极创作中，敬请期待更多精彩项目！</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('项目数据获取失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center glass-effect-dark p-8 rounded-2xl shadow-lg max-w-md">
          <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">项目加载失败</h1>
          <p className="text-gray-400 mb-4">请稍后重试或联系网站管理员</p>
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