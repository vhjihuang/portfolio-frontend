import { getAbout, getSkills, getProjects } from '@/lib/api';
import Link from 'next/link';
import ScrollAnimations from '@/components/ScrollAnimations';

export default async function Home() {
  try {
    const [aboutData, skillsData, projectsData] = await Promise.all([
      getAbout(),
      getSkills(),
      getProjects()
    ]);
    
    const about = aboutData;
    const skills = skillsData || [];
    const projects = projectsData || [];

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-x-hidden page-container">
        {/* 滚动动画处理组件 */}
        <ScrollAnimations />
        
        {/* 动态背景元素 - 增强视差效果 */}
        <div className="fixed inset-0 z-0">
          {/* 绝区零风格的浮动元素 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float parallax-layer" data-depth="0.1"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000 parallax-layer" data-depth="0.2"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000 parallax-layer" data-depth="0.15"></div>
        </div>
        
        {/* 主页首屏区域 */}
        <section className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <div className="text-center max-w-4xl relative z-10">
            {/* 品牌化的主标题区域 - 创建独特的视觉焦点 */}
            <div className="mb-10 hero-content">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 shadow-2xl mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500 animate-pulse-glow">
                <span className="text-5xl font-bold text-white drop-shadow-lg">
                  {about?.name?.split(' ').map((n: string) => n[0]).join('') || 'D'}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight hero-content gradient-text">
                <span className="block mb-2">
                  {about?.name || '开发者姓名'}
                </span>
                <span className="block text-xl md:text-2xl font-light text-gray-300 mt-2 hero-content">
                  {about?.jobTitle || '全栈开发者'}
                </span>
              </h1>
              
              <div className="inline-block px-6 py-3 glass-effect-dark rounded-2xl shadow-lg mb-10 hero-content">
                <span className="text-lg font-medium text-white">
                  {about?.tagline || '创造卓越的数字体验'}
                </span>
              </div>
            </div>

            {/* 行动号召按钮 - 增强品牌一致性 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-content">
              <Link
                href="/projects"
                className="px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all text-center shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-lg zzz-card-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                探索我的项目
              </Link>
              <button className="px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg flex items-center justify-center gap-2 group text-lg zzz-card-hover">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                获取我的简历
              </button>
            </div>
          </div>
        </section>

        {/* 项目展示区域 - 精选项目提前展示 */}
        <section className="py-20 px-4 scroll-animate">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">精选项目</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-300 max-w-xl mx-auto text-lg">
                展示我在全栈开发领域的实践与创新
              </p>
            </div>

            {/* 精选项目网格 - 最多显示3个项目 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project: any, index: number) => (
                <Link 
                  key={project.id} 
                  href={`/projects/${project.documentId}`}
                  className="glass-effect-dark rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group fade-in-up"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* 项目封面图 */}
                  <div className="aspect-video bg-linear-to-br from-gray-800/50 to-gray-900/50 relative overflow-hidden">
                    {project.coverImage?.data ? (
                      <img 
                        src={`http://localhost:1337${project.coverImage.data.url}`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* 项目信息 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-100 rounded-full font-bold">
                        {project.projectType}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors">
                      {project.description}
                    </p>

                    {/* 技能标签 */}
                    <div className="flex flex-wrap gap-1">
                      {project.skills?.data?.slice(0, 3).map((skill: any) => (
                        <span 
                          key={skill.id}
                          className="text-xs px-2 py-1 glass-effect text-gray-200 rounded-full hover:bg-black/30 transition-colors"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 查看所有项目按钮 */}
            <div className="text-center mt-16 fade-in-up">
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] group text-base zzz-card-hover"
              >
                浏览完整作品集 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 个人理念展示区域 */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">我的理念</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
            </div>
            
            <div className="mb-16 fade-in-up">
              <div className="glass-effect-dark rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group zzz-card-hover">
                <div className="flex items-start mb-4">
                  <div className="shrink-0 w-3 h-10 bg-linear-to-b from-cyan-400 to-purple-500 rounded-full mr-4"></div>
                  <p className="text-gray-100 text-lg md:text-xl leading-relaxed">
                    {about?.description || "四年打磨用户体验，如今专注全栈开发。我相信优秀的代码不仅功能完善，更应该具有美感和可维护性。"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技能展示区域 */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">技术专长</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {skills.slice(0, 12).map((skill: any, index: number) => (
                <div 
                  key={skill.id}
                  className="group relative fade-in-up"
                  style={{ 
                    animationDelay: `${index * 80}ms`
                  }}
                >
                  <div className="px-6 py-4 glass-effect-dark rounded-2xl text-white shadow-lg flex items-center gap-3 hover:bg-black/50 transition-all duration-300 hover:scale-105 zzz-card-hover">
                    <div className="w-3 h-3 rounded-full bg-linear-to-br from-cyan-400 to-purple-500"></div>
                    <span className="font-bold text-base">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    console.error('数据获取失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center">
          <h1 className="text-3xl text-red-400 mb-4">数据加载失败</h1>
          <p className="text-gray-400">错误: {error.message}</p>
          <p className="text-sm text-gray-600 mt-2">请确保 Strapi 服务正在运行</p>
        </div>
      </div>
    );
  }
}