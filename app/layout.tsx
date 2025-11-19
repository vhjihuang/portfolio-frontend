import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  // 标题：包含姓名、职称、技术栈、求职状态
  title: "Huang Haojie - Full Stack Developer Available for Hire | React Next.js Node.js TypeScript | 4 Years Frontend Experience",
  
  // 描述：中英文混合，覆盖技术能力和求职意向
  description: "Full Stack Developer Huang Haojie - Open to new opportunities. 4+ years of frontend expertise in React, TypeScript, Next.js. Recently delivered full-stack MVP using NestJS, Prisma, PostgreSQL. 全栈工程师黄豪杰 - 寻求新机会，4年前端开发经验，精通React、TypeScript、Next.js，近期完成NestJS+Prisma全栈MVP项目交付",
  
  alternates: {
    canonical: '/', // Next.js 会自动补全为 https://yourdomain.com/
  },
  // 关键词：技术栈 + 职位 + 求职状态 + 中英文覆盖
  keywords: [
    "Full Stack Developer",
    "React Developer", 
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Frontend Engineer",
    "JavaScript Developer",
    "Available for Hire",
    "Open to Opportunities",
    "Software Engineer",
    "Web Developer",
    "全栈工程师",
    "前端开发",
    "React开发",
    "Node.js全栈",
    "招聘全栈",
    "技术求职"
  ].join(", "),
  
  // 作者信息
  authors: [{ name: "Huang Haojie" }],
  
  // 社交媒体优化 - Open Graph
  openGraph: {
    title: "Huang Haojie - Full Stack Developer | React Next.js Node.js",
    description: "4+ Years Frontend → Full Stack Developer | Open to New Opportunities | React, Next.js, Node.js, TypeScript Specialist",
    type: "profile",
    locale: "en_US",
    siteName: "Huang Haojie Portfolio",
    url: "https://yourdomain.com", // 部署后更新为您的域名
  },
  
  // Twitter Card 优化
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitter", // 部署后更新为您的Twitter
    creator: "@yourtwitter",
    title: "Huang Haojie - Full Stack Developer",
    description: "Building modern web applications with React, Next.js, Node.js and TypeScript | 4+ Years Experience",
  },
  
  // 其他元数据
  robots: "index, follow",
  // manifest: "/manifest.json", // 如果需要 PWA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 额外的 meta 标签 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </head>
      <body className="antialiased">
        <Navigation />
        <main className="pt-16">
        {children}
        </main>
      </body>
    </html>
  );
}