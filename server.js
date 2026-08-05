// 极简静态文件服务器（零依赖），用于本地预览 Element UI 单页应用。
// 路由采用 hash 模式，因此无需 SPA 回退配置。
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 5173
const ROOT = __dirname

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0])
  if (urlPath === '/') urlPath = '/index.html'

  const filePath = path.join(ROOT, urlPath)
  // 防目录穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      return res.end('404 Not Found')
    }
    const ext = path.extname(filePath).toLowerCase()
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' }
    if (['.html', '.js', '.css', '.json'].includes(ext)) headers['Cache-Control'] = 'no-store'
    res.writeHead(200, headers)
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log(`EBC 开发平台已启动： http://localhost:${PORT}/`)
})
