# 创建默认图片
$defaultImagePath = "C:\Users\Administrator\Desktop\web\couples-menu-app\assets\images\dishes\default.png"

# 使用 System.Drawing 创建一个简单的默认图片
Add-Type -AssemblyName System.Drawing
$width = 800
$height = 600
$bmp = New-Object System.Drawing.Bitmap $width,$height
$graphics = [System.Drawing.Graphics]::FromImage($bmp)

# 设置背景色为浅灰色
$graphics.Clear([System.Drawing.Color]::FromArgb(240, 240, 240))

# 添加文字
$font = New-Object System.Drawing.Font("Arial", 24)
$brush = [System.Drawing.Brushes]::Gray
$text = "图片加载中..."
$textSize = $graphics.MeasureString($text, $font)
$x = ($width - $textSize.Width) / 2
$y = ($height - $textSize.Height) / 2
$graphics.DrawString($text, $font, $brush, $x, $y)

# 保存图片
$bmp.Save($defaultImagePath, [System.Drawing.Imaging.ImageFormat]::Png)

# 清理资源
$graphics.Dispose()
$bmp.Dispose()

Write-Host "默认图片已创建: $defaultImagePath" 