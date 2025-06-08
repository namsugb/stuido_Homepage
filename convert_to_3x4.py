from PIL import Image, ImageOps

# 원본 이미지 경로
input_path = "public/product/big-family.jpg"
output_path = "public/product/big-family-3x4.jpg"

# 핑크색 배경 (RGB)
bg_color = (249, 230, 230)

# 3:4 비율로 만들 세로 길이 기준
target_height = 1200  # 원하는 크기로 조정
target_width = int(target_height * 3 / 4)

# 이미지 열기
img = Image.open(input_path)
img = ImageOps.exif_transpose(img)  # 방향 보정

# 원본 비율에 맞게 리사이즈(세로 기준)
img_ratio = img.width / img.height
target_ratio = 3 / 4

if img_ratio > target_ratio:
    # 원본이 더 가로로 길면, 세로를 맞추고 가로를 줄임
    new_height = target_height
    new_width = int(new_height * img_ratio)
else:
    # 원본이 더 세로로 길면, 가로를 맞추고 세로를 줄임
    new_width = target_width
    new_height = int(new_width / img_ratio)

img = img.resize((new_width, new_height), Image.LANCZOS)

# 새 캔버스(3:4, 핑크 배경)
canvas = Image.new("RGB", (target_width, target_height), bg_color)
paste_x = (target_width - new_width) // 2
paste_y = (target_height - new_height) // 2
canvas.paste(img, (paste_x, paste_y))

canvas.save(output_path)
print("변환 완료:", output_path)