// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_URL}/api${endpoint}`);
  
  if (!res.ok) {
    throw new Error(`API请求失败: ${res.status}`);
  }
  
  return res.json();
}

export async function getAbout() {
  const data = await fetchAPI('/about?populate=*');
  return data.data
}

export async function getSkills() {
  const data = await fetchAPI('/skills?populate=*');
  return data.data;
}

export async function getProjects() {
   const data = await fetchAPI('/projects?populate=*');
  return data.data;
}

// 获取单个项目 - 多种方式尝试
export async function getProjectById(id: string) {
  console.log(`🔍 查找项目 ID: ${id}`);
  
  // 方式1: 直接ID查询
  try {
    console.log('尝试方式1: 直接ID查询');
    const data = await fetchAPI(`/projects/${id}?populate=*`);
    if (data.data) {
      console.log('✅ 方式1成功');
      return data.data;
    }
  } catch (error) {
    console.log('❌ 方式1失败:', error);
  }
}

// 获取所有技术文章
export async function getTechnicalNotes() {
  const data = await fetchAPI('/technical-notes?populate=*&sort[0]=publishedAt:desc');
  return data.data;
}

// 通过 slug 获取单篇文章
export async function getTechnicalNoteBySlug(slug: string) {
  const data = await fetchAPI(`/technical-notes?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0];
}

// 获取所有服务
export async function getServices() {
  const data = await fetchAPI('/services?sort[0]=order:asc');
  return data.data;
}

// 获取所有 FAQ
export async function getFaqs() {
  const data = await fetchAPI('/faqs?sort[0]=order:asc');
  return data.data;
}

// 获取联系信息
export async function getContactInfo() {
  // Single Type 的 API 路径可能不同，尝试多种方式
  try {
    // 尝试方式1: contact-info
    const data = await fetchAPI('/contact-info?populate=*');
    return data.data;
  } catch (error) {
    console.log('尝试 contact-info 失败，尝试其他路径');
    try {
      // 尝试方式2: contact-infos (复数)
      const data = await fetchAPI('/contact-infos?populate=*');
      return data.data;
    } catch (error2) {
      console.log('尝试 contact-infos 失败');
      // 返回 null，让前端使用默认值
      return null;
    }
  }
}