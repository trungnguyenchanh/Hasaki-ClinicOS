# Hasaki ClinicOS — Demo Layouts

Repo **chỉ chứa layout HTML + dữ liệu demo JSON**. Tách riêng để dễ xem giao diện và thử luồng khách qua URL kèm ID, không lẫn tài liệu.

## Cấu trúc

```
admin/
├── index.html            # dashboard
├── data/
│   └── customers.json    # ★ dữ liệu khách demo (tách khỏi code)
├── assets/
│   ├── theme.css
│   ├── app.js
│   └── data.js           # nạp customers.json, giữ API getCustomer()/linkFor()
└── pages/                # 40 trang layout
```

## Dữ liệu demo & URL kèm ID

M��i khách có một mã ID; truyền qua tham số `?id=` trên URL để trang hiển thị đúng khách:

| ID | Khách | Đuôi mã phiếu |
| --- | --- | --- |
| `C-1042` | Trần Thu Hà (VIP) | 0825 |
| `C-1080` | Lê Minh | 0830 |
| `C-1136` | Ngô Khánh | 0836 |

Ví dụ URL:

```
admin/pages/customer-detail.html?id=C-1042
admin/pages/booking-detail.html?id=C-1080
admin/pages/cashier-payment.html?id=C-1136
```

Thiếu `?id=` → mặc định về `C-1042`.

Sửa/thêm khách: chỉ cần sửa **`admin/data/customers.json`** (không đụng code). Thêm khách mới = thêm một entry với cùng cấu trúc, rồi gọi URL `?id=<mã mới>`.

## Chạy demo

⚠️ Vì trang đọc `customers.json` qua HTTP, nên **chạy qua web server**, đừng mở thẳng `file://` (một số trình duyệt chặn đọc file). Nếu vẫn mở `file://`, hệ thống tự dùng bản dữ liệu dự phòng trong `data.js` (vẫn đủ 3 khách demo).

```bash
# tại thư mục gốc repo
python3 -m http.server 8000
# rồi mở http://localhost:8000/admin/index.html
```

## Nối API thật sau này

Trong `admin/assets/data.js`, đổi `DATA_URL` trỏ sang endpoint trả JSON theo đúng cấu trúc `customers.json`. API `getCustomer()` / `linkFor()` giữ nguyên nên 40 trang không phải sửa.

## Triển khai

GitHub + Cloudflare Pages · output directory = `admin` · không build command.

---
Internal Use Only · © 2026 Hasaki ClinicOS Team
