# Hasaki ClinicOS — Admin (HTML tĩnh)

> Trang quản trị vận hành chuỗi phòng khám thẩm mỹ Hasaki — HTML/CSS/JS thuần, không framework, không build step. Deploy lên Cloudflare Pages.

[![Deploy](https://img.shields.io/badge/deploy-Cloudflare%20Pages-F38020)]()
[![Status](https://img.shields.io/badge/status-design%20phase-3C7D5A)]()

Tài liệu thiết kế (Markdown) được tách sang repo riêng. Repo này chỉ chứa **ứng dụng admin**.

## Cấu trúc

```
.
├── README.md
├── wrangler.toml                 # Cloudflare Pages: output dir = admin
└── admin/
    ├── index.html                # Dashboard
    ├── data/
    │   └── customers.json         # ★ dữ liệu khách (tách khỏi code)
    ├── assets/
    │   ├── theme.css
    │   ├── app.js                 # layout, sidebar, topbar, maskPhone, getParam
    │   ├── data.js                # nạp customers.json, giữ API getCustomer()/linkFor()
    │   └── dispatch-data.js        # data + helper điều phối (dùng chung dispatch.html & dispatch-assign.html)
    └── pages/                     # ~40 trang nghiệp vụ
```

## URL kèm ID khách

Các trang đi xuyên theo cùng 1 khách qua `?id=`:

| ID | Khách |
| --- | --- |
| `C-1042` | Trần Thu Hà (VIP) |
| `C-1080` | Lê Minh |
| `C-1136` | Ngô Khánh |

Ví dụ: `admin/pages/customer-detail.html?id=C-1080`, `admin/pages/cashier-payment.html?id=C-1042`.

Trang nhân sự / chi nhánh dùng `?cn=`: `admin/pages/dispatch-staff.html`, `admin/pages/report-branch.html?cn=q1`.

## Nhóm chức năng

- **Tổng quan:** Dashboard, Lịch & Booking, Khách hàng
- **Nghiệp vụ:** Bác sĩ/Khám, Tư vấn, Cashier, Liệu trình, Điều phối tua (bàn điều phối 1 CN + assign + nhân sự + rule), Kho, Đơn thuốc
- **Quy trình tiếp khách:** Tiếp nhận, Tracking flow
- **Danh mục:** Phác đồ, Dịch vụ, Máy móc, Kỹ năng, Bước liệu trình, Bảo hành
- **Quản trị:** Báo cáo (Vận hành / Sales / KPI + tổng quan chi nhánh), Nhân sự & Học việc, Sơ đồ trang (Sitemap)

## Chạy local

⚠️ `data.js` đọc `customers.json` qua HTTP — **chạy qua web server** (mở `file://` sẽ tự dùng dữ liệu dự phòng inline).

```bash
python3 -m http.server 8000
# mở http://localhost:8000/admin/index.html
```

## Triển khai (Cloudflare Pages)

- Build command: **để trống**
- Output directory: **`admin`**
- `wrangler.toml`: `pages_build_output_dir = "admin"`

---
Internal Use Only · © 2026 Hasaki ClinicOS Team
