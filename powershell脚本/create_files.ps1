# 确保目录存在
New-Item -ItemType Directory -Path "couples-menu-app\assets\images\dishes" -Force

# 切换到目录
Set-Location "couples-menu-app\assets\images\dishes"

# 创建所有菜品图片文件
$dishes = @(
    "steamed-ribs.png",          # 清蒸排骨
    "white-cut-chicken.png",     # 白切鸡
    "soy-sauce-chicken.png",     # 酱油鸡
    "clam-chicken.png",          # 白贝焖鸡
    "steamed-fish.png",          # 清蒸鲈鱼
    "boiled-shrimp.png",         # 白灼虾
    "salt-baked-chicken.png",    # 盐焗鸡
    "curry-beef.png",            # 咖喱土豆牛腩
    "clams.png",                 # 炒花甲
    "watercress.png",            # 西洋菜
    "water-spinach.png",         # 通心菜
    "meat-cake.png",             # 马蹄馅肉饼
    "cordyceps-chicken.png",     # 虫草花蒸鸡
    "fivefinger-chicken.png",    # 五指毛桃焗鸡
    "sour-fish.png",             # 酸菜鲈鱼
    "mushroom-pork.png",         # 木耳黄花炒瘦肉
    "lotus-pork.png",            # 莲藕炒瘦肉
    "braised-pork.png",          # 红烧肉
    "rice-cooker-chicken.png",   # 电饭煲闷鸡
    "braised-goose.png",         # 卤鹅
    "fried-crab.png",            # 炒花蟹
    "chili-chicken.png",         # 辣椒洋葱炒鸡腿肉
    "braised-shrimp.png",        # 油焖大虾
    "char-siu.png",              # 叉烧
    "chestnut-chicken.png",      # 栗子炖鸡
    "water-chestnut-lamb.png"    # 马蹄焖羊肉
)

foreach ($dish in $dishes) {
    New-Item -ItemType File -Path $dish -Force
    Write-Host "Created: $dish"
}

Write-Host "`nAll files have been created successfully!" 