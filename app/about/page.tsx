import { getAbout } from '@/lib/api';

export default async function AboutPage() {
  try {
    const aboutData = await getAbout();
    const about = aboutData;

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
                关于我
              </h1>
            </div>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* 主要内容卡片 */}
          <div className="glass-effect-strong rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.3)] overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {/* 左侧：基本信息 */}
                <div className="md:col-span-1">
                  <div className="text-center">
                    {/* 头像 */}
                    <div className="w-40 h-40 bg-linear-to-br from-cyan-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center p-1 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                      {about?.avatar?.data ? (
                        <img 
                          src={`http://localhost:1337${about.avatar.data.url}`}
                          alt={about.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-400 text-3xl font-bold">
                            {about?.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2">{about?.name}</h2>
                    <p className="text-cyan-300 font-bold text-lg mb-3">{about?.jobTitle}</p>
                    <p className="text-gray-300 text-sm">{about?.email}</p>
                  </div>
                </div>

                {/* 右侧：详细介绍 */}
                <div className="md:col-span-2">
                  <div className="prose prose-invert prose-lg max-w-none mb-8">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      {about?.bio?.[0]?.children?.[0]?.text || '个人简介正在完善中...'}
                    </p>
                  </div>

                  {/* 社交链接 */}
                  {about?.socialLinks && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-linear-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                        联系我
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {about.socialLinks.github && (
                          <a 
                            href={about.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 glass-effect-dark text-white rounded-xl font-medium hover:bg-black/50 transition-all border border-purple-400/30"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {about.socialLinks.linkedin && (
                          <a 
                            href={about.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 glass-effect-dark text-white rounded-xl font-medium hover:bg-black/50 transition-all border border-purple-400/30"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 简历下载 */}
                  {about?.resume?.data && (
                    <div>
                      <a 
                        href={`http://localhost:1337${about.resume.data.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        下载简历
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-violet-800">
        <div className="text-center glass-effect-dark p-8 rounded-2xl shadow-lg max-w-md">
          <div className="inline-block p-4 bg-red-500/20 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">页面加载失败</h1>
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