@echo off
chcp 65001 >nul
echo ========================================
echo   视频格式转换工具 (MKV -> MP4)
echo ========================================
echo.

cd /d "%~dp0assets\videos"

echo 正在检查 FFmpeg...
where ffmpeg >nul 2>nul
if errorlevel 1 (
    echo [错误] 未安装 FFmpeg!
    echo.
    echo 请先安装 FFmpeg:
    echo   1. 下载: https://ffmpeg.org/download.html
    echo   2. 或使用 winget: winget install ffmpeg
    echo   3. 或使用 choco: choco install ffmpeg
    echo.
    pause
    exit /b 1
)

echo [√] FFmpeg 已安装
echo.
echo 开始转换视频...
echo.

for %%f in (*.mkv) do (
    echo 正在转换: %%f
    ffmpeg -i "%%f" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k -y "%%~nf.mp4" -loglevel warning
    if not errorlevel 1 (
        echo [√] 转换成功: %%~nf.mp4
    ) else (
        echo [×] 转换失败: %%f
    )
)

echo.
echo ========================================
echo 转换完成!
echo ========================================
pause
