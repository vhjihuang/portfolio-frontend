import Link from 'next/link';
import { getServices } from '@/lib/api';

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  desktop: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mobile: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  design: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  lightning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const servicesStatic = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: '企业官网开发',
    description: '专业的企业官网设计与开发，响应式布局，SEO优化，提升品牌形象',
    features: [
      '响应式设计，完美适配各种设备',
      'SEO优化，提升搜索引擎排名',
      'CMS内容管理系统集成',
      '高性能优化，加载速度快',
      '现代化UI设计，提升用户体验'
    ],
    price: '¥8,000 起',
    duration: '2-3周',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Web应用开发',
    description: '定制化Web应用开发，从MVP到完整产品，助力业务数字化转型',
    features: [
      '前后端全栈开发',
      '用户认证与权限管理',
      '数据库设计与优化',
      'RESTful API / GraphQL',
      '第三方服务集成'
    ],
    price: '¥15,000 起',
    duration: '4-8周',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'UI/UX设计',
    description: '以用户为中心的界面设计，提升产品可用性和用户满意度',
    features: [
      '用户研究与需求分析',
      '交互原型设计',
      '视觉设计与品牌一致性',
      '设计系统建立',
      '可用性测试与优化'
    ],
    price: '¥5,000 起',
    duration: '1-2周',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 4,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '性能优化',
    description: '网站性能诊断与优化，提升加载速度，改善用户体验',
    features: [
      'Lighthouse性能审计',
      'Core Web Vitals优化',
      '代码分割与懒加载',
      '图片与资源优化',
      'CDN配置与缓存策略'
    ],
    price: '¥3,000 起',
    duration: '1周',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 5,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'SEO优化',
    description: '搜索引擎优化，提升网站在搜索结果中的排名和可见度',
    features: [
      '关键词研究与策略',
      '技术SEO优化',
      '内容优化建议',
      '结构化数据实现',
      'Google Analytics集成'
    ],
    price: '¥2,000 起',
    duration: '持续优化',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 6,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '技术咨询',
    description: '技术选型、架构设计、代码审查等专业咨询服务',
    features: [
      '技术栈选型建议',
      '架构设计与评审',
      '代码质量审查',
      '性能瓶颈分析',
      '团队技术培训'
    ],
    price: '¥500/小时',
    duration: '按需',
    color: 'from-indigo-500 to-purple-500'
  }
];

const process = [
  {
    step: '01',
    title: '需求沟通',
    description: '深入了解您的业务需求和目标，制定初步方案'
  },
  {
    step: '02',
    title: '方案设计',
    description: '提供详细的技术方案和设计稿，确认项目细节'
  },
  {
    step: '03',
    title: '开发实施',
    description: '按照敏捷开发流程，定期交付可演示的版本'
  },
  {
    step: '04',
    title: '测试上线',
    description: '全面测试，确保质量，协助部署到生产环境'
  },
  {
    step: '05',
    title: '维护支持',
    description: '提供技术支持和维护服务，持续优化改进'
  }
];

export default async function ServicesPage() {
  let services = [];

  try {
    services = await getServices();
  } catch (error) {
    console.error('获取服务列表失败:', error);
    // 如果 API 失败，使用静态数据
    services = servicesStatic;
  }

  // 如果 CMS 没有数据，使用静态数据
  if (!services || services.length === 0) {
    services = servicesStatic;
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 px-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6">服务项目</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            提供从设计到开发的一站式Web解决方案，助力您的业务数字化转型
          </p>
        </div>

        {/* 服务列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service: any, index: number) => {
            const iconName = service.iconName || 'desktop';
            const colorFrom = service.colorFrom || 'cyan-500';
            const colorTo = service.colorTo || 'blue-500';
            const features = Array.isArray(service.features) ? service.features : (service.features ? JSON.parse(service.features) : []);

            return (
              <div
                key={service.id}
                className="glass-effect-dark rounded-3xl p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all duration-500 group"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* 图标 */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br from-${colorFrom} to-${colorTo} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[iconName] || iconMap.desktop}
                </div>

                {/* 标题和描述 */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* 特性列表 */}
                <ul className="space-y-2 mb-6">
                  {features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* 价格和周期 */}
                <div className="flex items-center justify-between pt-6 border-t border-purple-400/20">
                  <div>
                    <p className="text-sm text-gray-400">起步价</p>
                    <p className="text-xl font-bold text-white">{service.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">周期</p>
                    <p className="text-sm font-medium text-cyan-300">{service.duration}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 工作流程 */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">工作流程</h2>
            <div className="w-24 h-1 bg-linear-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-lg">
              标准化的开发流程，确保项目高质量交付
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="glass-effect-dark rounded-2xl p-6 text-center h-full">
                  <div className="text-5xl font-black gradient-text mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {/* 连接线 */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-cyan-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA区域 */}
        <div className="glass-effect-dark rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(139,92,246,0.3)]">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            准备开始您的项目？
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            无论是企业官网、Web应用还是技术咨询，我都能为您提供专业的解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-2xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] flex items-center justify-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              立即咨询
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 glass-effect-dark text-white rounded-2xl font-bold hover:bg-black/50 transition-all shadow-lg flex items-center justify-center gap-2 group border border-purple-400/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              查看案例
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
