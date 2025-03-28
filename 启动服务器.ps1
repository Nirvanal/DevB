Write-Host "正在启动本地服务器，请稍候..." -ForegroundColor Green
Write-Host "如果您已安装Node.js，将使用http-server启动服务" -ForegroundColor Yellow
Write-Host "若尚未安装，将先安装http-server包" -ForegroundColor Yellow
Write-Host "服务器启动后，请访问显示的URL地址查看页面" -ForegroundColor Cyan
Write-Host "按Ctrl+C可以停止服务器" -ForegroundColor Red

# 检查是否安装了http-server
$httpServerInstalled = npm list -g http-server 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "正在安装http-server..." -ForegroundColor Yellow
    npm install -g http-server
}

# 启动服务器
http-server -p 8080 -c-1

# 暂停以便查看输出
pause 