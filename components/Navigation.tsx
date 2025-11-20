import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-stone-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/姓名 */}
          <Link 
            href="/" 
            className="text-xl font-bold text-stone-800 hover:text-sky-600 transition-colors"
          >
            黄豪杰
          </Link>
          
          {/* 桌面端导航链接 */}
          <div className="hidden md:flex gap-8">
            <Link 
              href="/" 
              className="text-stone-700 hover:text-sky-600 transition-colors font-medium"
            >
              首页
            </Link>
            <Link 
              href="/projects" 
              className="text-stone-700 hover:text-sky-600 transition-colors font-medium"
            >
              项目
            </Link>
            <Link 
              href="/blog" 
              className="text-stone-700 hover:text-sky-600 transition-colors font-medium"
            >
              技术见解
            </Link>
            <Link 
              href="/about" 
              className="text-stone-700 hover:text-sky-600 transition-colors font-medium"
            >
              关于我
            </Link>
          </div>

          {/* 移动端菜单按钮（后续扩展） */}
          <div className="md:hidden">
            <button className="text-stone-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}