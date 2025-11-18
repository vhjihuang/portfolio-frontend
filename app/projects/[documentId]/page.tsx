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
     <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {projectData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {projectData.projectType}
                    </span>
                    <span className="text-sm text-gray-500">
                      Slug: {project.slug}
                    </span>
                  </div>
                </div>
              </div>

              {/* 技能标签 - 新增 */}
              {projectData.skills && projectData.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">技术栈</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.skills.map((skill: any) => (
                      <span 
                        key={skill.id}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 项目链接 */}
              <div className="flex gap-4">
                {projectData.projectUrl && (
                  <a 
                    href={`https://${projectData.projectUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    查看项目
                  </a>
                )}
                {projectData.githubUrl && (
                  <a 
                    href={projectData.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 项目详情内容 */}
          <div className="grid gap-8">
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">项目挑战</h2>
              <div className="prose prose-gray max-w-none">
                {renderRichText(projectData.challenge) || (
                  <p className="text-gray-500">暂无挑战描述</p>
                )}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">解决方案</h2>
              <div className="prose prose-gray max-w-none">
                {renderRichText(projectData.solution) || (
                  <p className="text-gray-500">暂无解决方案描述</p>
                )}
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">项目成果</h2>
              <div className="prose prose-gray max-w-none">
                {renderRichText(projectData.outcome) || (
                  <p className="text-gray-500">暂无成果描述</p>
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