'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    let ticking = false;
    
    // 添加滚动监听器实现滚动动画
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // 视差效果
          const parallaxElements = document.querySelectorAll('.parallax-layer');
          const scrollPosition = window.scrollY * 0.5;
          
          parallaxElements.forEach((element) => {
            const speed = parseFloat(element.getAttribute('data-depth') || '0.1');
            const yPos = -(scrollPosition * speed);
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          
          // 滚动触发动画
          const elements = document.querySelectorAll('.fade-in-up:not(.animated)');
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollY;
            const elementVisible = 150;

            if (scrollY > elementTop - windowHeight + elementVisible) {
              element.classList.add('animated');
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 初始化检查一次，防止首屏元素未触发
    const initAnimations = () => {
      // 先触发首屏元素动画
      const heroElements = document.querySelectorAll('.hero-content');
      heroElements.forEach(element => {
        element.classList.add('animated');
      });
      
      // 检查其他元素
      const elements = document.querySelectorAll('.fade-in-up:not(.animated)');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        const elementVisible = 150;

        // 只有当元素进入视口时才触发动画
        if (scrollY > elementTop - windowHeight + elementVisible) {
          element.classList.add('animated');
        }
      });
    };

    // 页面加载完成后初始化动画
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
      // 如果页面已经加载完成，直接初始化
      setTimeout(initAnimations, 100);
    }

    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('DOMContentLoaded', initAnimations);
    };
  }, []);

  return null;
}