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
  const data = await fetchAPI('/skills');
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
  
  // 方式2: 过滤器查询
  try {
    console.log('尝试方式2: 过滤器查询');
    const data = await fetchAPI(`/projects?filters[id][$eq]=${id}&populate=*`);
    if (data.data && data.data.length > 0) {
      console.log('✅ 方式2成功');
      return data.data[0];
    }
  } catch (error) {
    console.log('❌ 方式2失败:', error);
  }
  
  throw new Error(`未找到项目 ID: ${id}`);
}