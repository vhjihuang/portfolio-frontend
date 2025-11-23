import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      );
    }

    // TODO: 这里集成实际的邮件发送服务
    // 选项1: Resend (推荐) - https://resend.com
    // 选项2: SendGrid - https://sendgrid.com
    // 选项3: Nodemailer + SMTP
    
    // 示例：使用 Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'your.email@example.com',
    //   subject: `新的联系表单提交 - ${name}`,
    //   html: `
    //     <h2>新的联系表单提交</h2>
    //     <p><strong>姓名:</strong> ${name}</p>
    //     <p><strong>邮箱:</strong> ${email}</p>
    //     <p><strong>公司:</strong> ${company || '未提供'}</p>
    //     <p><strong>留言:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // 临时方案：记录到控制台（开发环境）
    console.log('📧 新的联系表单提交:');
    console.log('姓名:', name);
    console.log('邮箱:', email);
    console.log('公司:', company || '未提供');
    console.log('留言:', message);
    console.log('---');

    // 模拟发送延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true,
        message: '消息已发送成功' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('联系表单处理错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
