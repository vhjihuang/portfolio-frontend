import { getAbout } from '@/lib/api';

export default async function AboutPage() {
  try {
    const aboutData = await getAbout();
    const about = aboutData;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">关于我</h1>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* 左侧：基本信息 */}
              <div className="md:col-span-1">
                <div className="text-center">
                  {/* 头像 */}
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {about?.avatar?.data ? (
                      <img 
                        src={`http://localhost:1337${about.avatar.data.url}`}
                        alt={about.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-2xl">头像</span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900">{about?.name}</h2>
                  <p className="text-blue-600 font-medium">{about?.jobTitle}</p>
                  <p className="text-gray-600 text-sm mt-2">{about?.email}</p>
                </div>
              </div>

              {/* 右侧：详细介绍 */}
              <div className="md:col-span-2">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {about?.bio?.[0]?.children?.[0]?.text || '个人简介正在完善中...'}
                  </p>
                </div>

                {/* 社交链接 */}
                {about?.socialLinks && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">联系我</h3>
                    <div className="flex gap-4">
                      {about.socialLinks.github && (
                        <a 
                          href={about.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {about.socialLinks.linkedin && (
                        <a 
                          href={about.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* 简历下载 */}
                {about?.resume?.data && (
                  <div className="mt-6">
                    <a 
                      href={`http://localhost:1337${about.resume.data.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      下载简历
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">页面加载失败</h1>
          <p className="text-gray-600">请稍后重试</p>
        </div>
      </div>
    );
  }
}