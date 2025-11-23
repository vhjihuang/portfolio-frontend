'use client'

import { useState, useEffect } from 'react';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  workingHours?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'your.email@example.com',
    phone: '+86 138 0013 8000',
    location: '中国 · 深圳',
    workingHours: '周一至周五：9:00 - 18:00\n周末：预约制',
    socialLinks: {}
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadContactInfo() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-info`);
        const data = await response.json();
        if (data.data) {
          setContactInfo({
            email: data.data.email || contactInfo.email,
            phone: data.data.phone || contactInfo.phone,
            location: data.data.location || contactInfo.location,
            workingHours: data.data.workingHours || contactInfo.workingHours,
            socialLinks: data.data.socialLinks || contactInfo.socialLinks
          });
        }
      } catch (error) {
        console.error('获取联系信息失败:', error);
        // 使用默认值
      }
    }

    loadContactInfo();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '请输入留言内容';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '留言内容至少需要10个字符';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-800 py-20 px-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-6">联系我们</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            有项目需求或合作意向？欢迎随时联系，我会在24小时内回复您
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 联系表单 */}
          <div className="glass-effect-dark rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <h2 className="text-2xl font-bold text-white mb-6">发送消息</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 姓名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  姓名 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border ${
                    errors.name ? 'border-red-500' : 'border-purple-400/30'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                  placeholder="张三"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  邮箱 <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black/30 border ${
                    errors.email ? 'border-red-500' : 'border-purple-400/30'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* 公司 */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  公司/组织（可选）
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-purple-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="您的公司名称"
                />
              </div>

              {/* 留言 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  留言内容 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-black/30 border ${
                    errors.message ? 'border-red-500' : 'border-purple-400/30'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none`}
                  placeholder="请描述您的项目需求或问题..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-linear-to-r from-cyan-600 to-purple-600 text-white rounded-xl font-bold hover:from-cyan-700 hover:to-purple-700 transition-all shadow-[0_0_30px_#00f5ff] hover:shadow-[0_0_50px_#00f5ff] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    发送中...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    发送消息
                  </>
                )}
              </button>

              {/* 状态提示 */}
              {status === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                  ✓ 消息发送成功！我会尽快回复您
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                  ✗ 发送失败，请稍后重试或直接发送邮件
                </div>
              )}
            </form>
          </div>

          {/* 联系信息 */}
          <div className="space-y-6">
            {/* 联系方式卡片 */}
            <div className="glass-effect-dark rounded-3xl p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <h3 className="text-xl font-bold text-white mb-6">其他联系方式</h3>
              
              <div className="space-y-4">
                {/* 邮箱 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">邮箱</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-cyan-300 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* 电话 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">电话</h4>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-purple-300 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* 位置 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">位置</h4>
                    <p className="text-gray-400">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 工作时间 */}
            <div className="glass-effect-dark rounded-3xl p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <h3 className="text-xl font-bold text-white mb-4">工作时间</h3>
              <div className="space-y-2 text-gray-300">
                {contactInfo.workingHours?.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
                <p className="text-sm text-gray-400 mt-4">
                  * 紧急项目可随时联系
                </p>
              </div>
            </div>

            {/* 社交媒体 */}
            {contactInfo.socialLinks && Object.keys(contactInfo.socialLinks).length > 0 && (
              <div className="glass-effect-dark rounded-3xl p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <h3 className="text-xl font-bold text-white mb-4">关注我</h3>
                <div className="flex gap-4">
                  {contactInfo.socialLinks.github && (
                    <a href={contactInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black/30 hover:bg-cyan-500/20 flex items-center justify-center transition-colors group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {contactInfo.socialLinks.twitter && (
                    <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black/30 hover:bg-purple-500/20 flex items-center justify-center transition-colors group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {contactInfo.socialLinks.linkedin && (
                    <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black/30 hover:bg-pink-500/20 flex items-center justify-center transition-colors group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
