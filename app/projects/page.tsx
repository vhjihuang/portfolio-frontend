import { getProjects } from '@/lib/api';
import Link from 'next/link';

export default async function ProjectsPage() {
  try {
    const projects = await getProjects();
    console.log('projects', projects)

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">我的项目</h1>
            <p className="text-xl text-gray-600">展示我的全栈开发能力和项目经验</p>
          </div>

          {/* 项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.documentId}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* 项目封面图 */}
                <div className="aspect-video bg-gray-200 relative">
                  {project.coverImage?.data ? (
                    <img 
                      src={`http://localhost:1337${project.coverImage.data.url}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      暂无图片
                    </div>
                  )}
                </div>
                
                {/* 项目信息 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {project.projectType}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* 技能标签 */}
                  <div className="flex flex-wrap gap-1">
                    {project.skills?.data?.slice(0, 3).map((skill: any) => (
                      <span 
                        key={skill.id}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
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
            <div className="text-center py-12">
              <p className="text-gray-500">暂无项目，正在积极创作中...</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('项目数据获取失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">项目加载失败</h1>
          <p className="text-gray-600">请稍后重试</p>
        </div>
      </div>
    );
  }
}