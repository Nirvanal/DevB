@echo off
echo 正在启动本地服务器，请稍候...
echo 服务器启动后，请访问 http://localhost:8000 查看页面
echo 按Ctrl+C可以停止服务器

python -m http.server 8000

pause 