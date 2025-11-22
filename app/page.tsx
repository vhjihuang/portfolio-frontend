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
    console.log('about', aboutData)
    console.log('skills', skillsData)
    console.log('projects', projectsData)

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-x-hidden page-container relative">
        {/* 滚动动画处理组件 */}
        <ScrollAnimations />
        
        {/* 动态背景元素 - 增强视差效果 */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          {/* 绝区零风格的浮动元素 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float parallax-layer" data-depth="0.1"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000 parallax-layer" data-depth="0.2"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000 parallax-layer" data-depth="0.15"></div>
        </div>
        
        {/* 主页首屏区域 - 优化高度 */}
        <section className="h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
          <div className="text-center max-w-4xl relative" style={{ zIndex: 1 }}>
            {/* 品牌化的主标题区域 */}
            <div className="mb-12 hero-content">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 shadow-2xl mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-500 animate-pulse-glow">
                <span className="text-4xl font-bold text-white drop-shadow-lg">
                  {about?.name?.split(' ').map((n: string) => n[0]).join('') || 'D'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight hero-content gradient-text">
                <span className="block mb-2">
                  {about?.name || '开发者姓名'}
                </span>
                <span className="block text-lg md:text-xl font-light text-gray-300 mt-2 hero-content">
                  {about?.jobTitle || '全栈开发者'}
                </span>
              </h1>
              
              <div className="inline-block px-6 py-3 glass-effect-dark rounded-2xl shadow-lg mb-8 hero-content">
                <span className="text-base md:text-lg font-medium text-white">
                  {about?.tagline || '创造卓越的数字体验'}
                </span>
              </div>
            </div>

            {/* 行动号召按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-content mb-12">
              <Link
                href="/projects"
                className="px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all text-center shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-base zzz-card-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                探索我的项目
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg flex items-center justify-center gap-2 group text-base zzz-card-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                了解更多
              </Link>
            </div>

            {/* 向下滚动指示器 */}
            <div className="hero-content animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* 项目展示区域 - 2列大卡片布局 */}
        <section className="py-24 px-4 scroll-animate">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">精选项目</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                展示我在全栈开发领域的实践与创新
              </p>
            </div>

            {/* 精选项目网格 - 2列大卡片 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {projects.slice(0, 2).map((project: any, index: number) => (
                <Link 
                  key={project.id} 
                  href={`/projects/${project.documentId}`}
                  className="glass-effect-dark rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-500 overflow-hidden group fade-in-up"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* 项目封面图 */}
                  <div className="aspect-video bg-linear-to-br from-gray-800/50 to-gray-900/50 relative overflow-hidden">
                    {project.coverImage ? (
                      <img 
                        src={`http://localhost:1337${project.coverImage.url}`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* 项目信息 */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex-1">
                        {project.title}
                      </h3>
                      <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-100 rounded-full font-bold ml-3 shrink-0">
                        {project.projectType}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-base mb-6 line-clamp-3 group-hover:text-gray-100 transition-colors leading-relaxed">
                      {project.description}
                    </p>

                    {/* 技能标签 */}
                    <div className="flex flex-wrap gap-2">
                      {project.skills?.data?.slice(0, 4).map((skill: any) => (
                        <span 
                          key={skill.id}
                          className="text-sm px-3 py-1 glass-effect text-gray-200 rounded-full hover:bg-black/30 transition-colors"
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
            <div className="text-center fade-in-up">
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] group text-base zzz-card-hover"
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
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">我的理念</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            </div>
            
            <div className="fade-in-up">
              <div className="glass-effect-dark rounded-3xl p-10 md:p-12 shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-1 h-24 bg-linear-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>
                  <p className="text-gray-100 text-xl md:text-2xl leading-relaxed font-light">
                    {about?.description || "四年打磨用户体验，如今专注全栈开发。我相信优秀的代码不仅功能完善，更应该具有美感和可维护性。"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技能展示区域 */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">技术专长</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                精通现代全栈技术，持续学习与实践
              </p>
            </div>
            
            {/* 技能网格 - 更大的卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {skills.slice(0, 12).map((skill: any, index: number) => (
                <div 
                  key={skill.id}
                  className="group relative fade-in-up"
                  style={{ 
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="px-6 py-5 glass-effect-dark rounded-2xl text-white shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 zzz-card-hover text-center">
                    <div className="w-2 h-2 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 mx-auto mb-3"></div>
                    <span className="font-bold text-base block">{skill.name}</span>
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