// 放在仓库根目录
export function middleware(request) {
  fetch(`${request.nextUrl.origin}/api/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  return Response.next();
}

export const config = {
  matcher: [
    // 只记录页面访问，排除静态资源
    '/((?!api|css|data|js|images|.*\\.).*)',
  ],
};