import { getAbout, getSkills, getProjects } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
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
        <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
          <div className="text-center max-w-5xl relative" style={{ zIndex: 1 }}>
            {/* 品牌化的主标题区域 */}
            <div className="mb-8 hero-content space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                <span className="block gradient-text mb-3">
                  {about?.name || '开发者姓名'}
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal">
                  {about?.jobTitle || '全栈开发者'}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {about?.tagline || '创造卓越的数字体验'}
              </p>
            </div>

            {/* 数据展示 - 优化版 */}
            {about?.stats && (
              <div className="mb-10 hero-content">
                <div className="glass-effect-dark rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                  <div className="grid grid-cols-3 gap-8 md:gap-12">
                    {about.stats.experience && (
                      <div className="text-center">
                        <div className="text-4xl md:text-6xl font-black gradient-text mb-2">
                          {about.stats.experience}
                        </div>
                        <div className="text-gray-400 text-sm md:text-base">年经验</div>
                      </div>
                    )}
                    {about.stats.projects && (
                      <div className="text-center border-x border-purple-400/20">
                        <div className="text-4xl md:text-6xl font-black gradient-text mb-2">
                          {about.stats.projects}
                        </div>
                        <div className="text-gray-400 text-sm md:text-base">完成项目</div>
                      </div>
                    )}
                    {about.stats.satisfaction && (
                      <div className="text-center">
                        <div className="text-4xl md:text-6xl font-black gradient-text mb-2">
                          {about.stats.satisfaction}
                        </div>
                        <div className="text-gray-400 text-sm md:text-base">客户满意度</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 技术栈展示 - 视觉焦点 */}
            {skills && skills.length > 0 && (
              <div className="mb-10 hero-content">
                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">技术栈</p>
                <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                  {skills.slice(0, 8).map((skill: any) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 glass-effect text-gray-300 rounded-full text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 行动号召按钮 - 优化版 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-content mb-6">
              <Link
                href="/projects"
                className="px-10 py-5 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all text-center shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-lg zzz-card-hover"
              >
                查看作品案例
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg flex items-center justify-center gap-2 group text-lg zzz-card-hover border border-purple-400/30"
              >
                免费咨询
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </Link>
            </div>


          </div>
        </section>

        {/* 核心价值区域 - 独立展示 */}
        {about?.coreValues && about.coreValues.length > 0 && (
          <section className="py-20 px-4 scroll-animate">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up">
                {about.coreValues.map((value: any, i: number) => (
                  <div
                    key={i}
                    className="glass-effect-dark rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="text-5xl mb-4">{value.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.coverImage.url}`}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index === 0}
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
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-in-up">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">技术专长</h2>
              <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                精通现代全栈技术，持续学习与实践
              </p>
            </div>

            {/* 技能网格 - 优化版大卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.slice(0, 9).map((skill: any, index: number) => {
                // 根据索引分配不同的渐变色
                const gradients = [
                  'from-cyan-500/20 to-blue-500/20',
                  'from-purple-500/20 to-pink-500/20',
                  'from-violet-500/20 to-purple-500/20',
                  'from-blue-500/20 to-cyan-500/20',
                  'from-pink-500/20 to-rose-500/20',
                  'from-indigo-500/20 to-purple-500/20',
                ];
                const gradient = gradients[index % gradients.length];

                // 根据索引分配图标颜色
                const iconColors = [
                  'from-cyan-400 to-blue-400',
                  'from-purple-400 to-pink-400',
                  'from-violet-400 to-purple-400',
                  'from-blue-400 to-cyan-400',
                  'from-pink-400 to-rose-400',
                  'from-indigo-400 to-purple-400',
                ];
                const iconColor = iconColors[index % iconColors.length];

                return (
                  <div
                    key={skill.id}
                    className="group relative fade-in-up"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className={`relative glass-effect-dark rounded-3xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-500 hover:scale-105 zzz-card-hover overflow-hidden border border-purple-400/10`}>
                      {/* 背景渐变装饰 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      {/* 内容 */}
                      <div className="relative z-10">
                        {/* 图标装饰 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                            {skill.icon?.url ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${skill.icon.url}`}
                                alt={skill.name}
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                            ) : skill.iconEmoji ? (
                              <span className="text-2xl">{skill.iconEmoji}</span>
                            ) : (
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            )}
                          </div>

                          {/* 熟练度指示器 */}
                          {skill.proficiency && (
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-6 rounded-full transition-all duration-300 ${i < Math.ceil((skill.proficiency / 100) * 5)
                                    ? `bg-gradient-to-t ${iconColor} shadow-lg`
                                    : 'bg-gray-700'
                                    }`}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 技能名称 */}
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h3>

                        {/* 技能描述或分类 */}
                        {skill.category && (
                          <p className="text-sm text-gray-400 mb-3">
                            {skill.category}
                          </p>
                        )}

                        {/* 经验年限或其他信息 */}
                        {skill.yearsOfExperience && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{skill.yearsOfExperience} 年经验</span>
                          </div>
                        )}

                        {/* 如果没有额外信息，显示简单的装饰线 */}
                        {!skill.category && !skill.yearsOfExperience && (
                          <div className={`w-16 h-1 bg-gradient-to-r ${iconColor} rounded-full mt-3 group-hover:w-full transition-all duration-500`}></div>
                        )}
                      </div>

                      {/* 悬停时的光效 */}
                      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-cyan-500/0 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 如果技能很多，可以添加"查看更多"按钮 */}
            {skills.length > 9 && (
              <div className="text-center mt-12 fade-in-up">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg group border border-purple-400/30"
                >
                  查看完整技能列表 ({skills.length} 项技能)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
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