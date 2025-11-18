import { getAbout, getSkills } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  try {
    const [aboutData, skillsData] = await Promise.all([
      getAbout(),
      getSkills()
    ]);
    console.log(aboutData, skillsData);
    const about = aboutData;
    const skills = skillsData || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            {/* 主标题 - 使用正确的字段名 */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {about?.name} · <span className="text-blue-600">{about?.jobTitle}</span>
            </h1>

            {/* 副标题 - 保持固定的宣传语 */}
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              四年打磨用户体验，如今专注全栈开发
            </p>

            {/* 动态技能标签云 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {skills.map((skill: any) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  {skill.name}
                </span>
              ))}
            </div>

            {/* 行动号召按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                查看我的全栈项目
              </Link>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                下载简历
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    console.error('数据获取失败:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">数据加载失败</h1>
          <p className="text-gray-600">错误: {error.message}</p>
          <p className="text-sm text-gray-500 mt-2">请确保 Strapi 服务正在运行</p>
        </div>
      </div>
    );
  }
}