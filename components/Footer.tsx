'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about`);
        const data = await response.json();
        if (data.data) {
          setSocialLinks(data.data.socialLinks || {});
          setName(data.data.name || '');
        }
      } catch (error) {
        console.error('获取页脚数据失败:', error);
      }
    }
    loadData();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 border-t border-purple-400/20 py-12 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 品牌区域 */}
          <div>
            <h3 className="text-xl font-black gradient-text mb-4">Portfolio</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              专注企业官网和 Web 应用开发
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-white font-bold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-200 hover:text-cyan-300 transition-colors text-sm">
                  服务
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-200 hover:text-cyan-300 transition-colors text-sm">
                  项目
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-cyan-300 transition-colors text-sm">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-cyan-300 transition-colors text-sm">
                  联系
                </Link>
              </li>
            </ul>
          </div>

          {/* 社交链接 */}
          <div>
            <h4 className="text-white font-bold mb-4">关注我</h4>
            <div className="flex gap-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black/30 hover:bg-cyan-500/20 flex items-center justify-center transition-colors group"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black/30 hover:bg-blue-500/20 flex items-center justify-center transition-colors group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-black/30 hover:bg-sky-500/20 flex items-center justify-center transition-colors group"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-sky-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="pt-8 border-t border-purple-400/10 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} {name || 'Portfolio'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
