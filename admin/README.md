# Hasaki Clinic — Admin Dashboard

Ứng dụng quản trị nhiều trang (multi-page, HTML/CSS/JS thuần — không cần build) cho hệ thống Beauty Clinic Service. Phong cách "clinic sáng 2026": nền trắng ấm, accent teal y tế + blush, typography Fraunces × Outfit.

## Cấu trúc
```
admin/
├── index.html              # Dashboard tổng quan
├── assets/
│   ├── theme.css           # Theme dùng chung
│   └── app.js              # Sidebar/topbar + helpers dùng chung
└── pages/
    ├── booking.html        # Lịch & Booking
    ├── customers.html      # Khách hàng
    ├── doctor.html         # ★ Bác sĩ — xem thứ tự khách & khám (đa bác sĩ)
    ├── consultant.html     # ★ Tư vấn viên — chống giành khách (claim/owner)
    ├── cashier.html        # ★ Cashier — thu ngân, ví/gói/khuyến mãi
    ├── treatment.html      # Liệu trình & định biên NVL
    ├── dispatch.html       # Điều phối tua tự động (skill + supervisor)
    ├── inventory.html      # Kho & Pha chế (2 kho)
    ├── pharmacy.html       # Đơn thuốc & GPP (đối chiếu mã đơn QG)
    ├── reports.html        # Báo cáo & KPI theo vai trò/chi nhánh
    └── staff.html          # Nhân sự, Học việc & Part-time (scope)
```

## 3 nghiệp vụ đặc thù (★)
- **Bác sĩ — Khám:** hàng chờ theo số thứ tự, spotlight "đang khám / kế tiếp", phân tải & điều phối cân bằng giữa ≥2 bác sĩ cùng khung giờ, override thủ công.
- **Tư vấn viên:** bảng phụ trách 3 trạng thái (đang tiếp/lock · owner · khách mở), claim lock chống giành khách, quy tắc ghi công owner/closer, nhật ký chặn vi phạm.
- **Cashier:** giỏ hàng dịch vụ lẻ/gói/sản phẩm, khuyến mãi, 3 phương thức thanh toán (thẻ/QR · tiền mặt · trừ ví), bảng ví & gói của khách.

## Chạy local
```bash
npx serve admin     # hoặc mở trực tiếp index.html
```

## Deploy Cloudflare Pages
- Output directory: `admin` · Build command: *(để trống)*
- Hoặc: `wrangler pages deploy admin --project-name beauty-clinic-admin`

> Dữ liệu trong các trang là mock phục vụ demo. Khi nối API thật, thay phần `<script>` cuối mỗi trang bằng fetch tới API Gateway. Đổi tên thương hiệu "Hasaki" tại `assets/app.js` (hàm renderLayout) và `index.html`.

## Cập nhật bổ sung
- **customer-detail.html** — Chi tiết khách: hồ sơ + cảnh báo dị ứng, timeline liệu trình, gói/ví, ghi chú CSKH, lịch sử giao dịch & khuyến mãi. (Mở từ danh sách Khách hàng.)
- **cashier.html** — Tính tiền tương tác: chọn theo nhóm (gói liệu trình · dịch vụ lẻ · trừ gói từ liệu trình đang theo · sản phẩm), thêm/bớt giỏ, tự tính tạm tính – khuyến mãi – phải thu.
- **consultant-survey.html** — Phiếu khảo sát theo **flow câu hỏi có nhánh điều kiện**: sơ đồ luồng bên trái, đáp án rẽ nhánh (vd có yếu tố y tế → chuyển khám bác sĩ), panel tổng hợp + đề xuất tự động.
- **dispatch.html** — 2 tab: (1) **Điều phối lại** so sánh ứng viên theo tua đang làm · tổng tiền công ca · số khách cùng nhóm · skill + điểm phù hợp; (2) **Khai báo rule**: trọng số điểm, quy tắc bật/tắt, và **payroll rule** (tăng ca ×1.5, tăng ca đêm ×1.8, ngày lễ ×3.0, hoa hồng buổi, phụ cấp kèm học việc, part-time giờ cao điểm) kèm công thức tính công 1 ca.

## Cập nhật lần 2
- **Sửa lỗi** trang Khách hàng (customers.html) bị chèn HTML rác — đã viết lại sạch.
- **Menu đầy đủ** 16 mục, thêm nhóm **Danh mục (Catalog)**: Dịch vụ · Máy móc · Kỹ năng · Bước.
- **booking.html** — bản đồ nhiệt khung giờ (trống/gần đầy/đầy/quá tải), bảng nhân sự đang trống theo khung giờ + mức tải, lịch máy móc cao cấp kèm giá trị tài sản & hiệu suất.
- **catalog-service.html** — danh mục dịch vụ, đánh dấu dịch vụ dùng máy cao cấp, gắn skill/máy.
- **catalog-machine.html** — tài sản đắt tiền: giá trị, hiệu suất, doanh thu sinh ra, lịch bảo trì.
- **catalog-skill.html** — ma trận kỹ năng theo cấp độ, gắn thiết bị, cảnh báo thiếu người.
- **catalog-step.html** — quy trình bước (skill · máy · NVL định biên · thời lượng) + thư viện bước dùng chung.
- **reports.html** — 6 nhóm báo cáo: Doanh thu (CN/tỉnh), KPI nhân sự, **Hiệu suất máy cao cấp (ROI)**, Lấp đầy & khung giờ, Tiêu hao NVL (định biên vs thực tế), Tư vấn & giữ khách.

## Cập nhật lần 3 — Bổ sung form kê toa
- **doctor-prescription.html** (MỚI) — Form khám & kê toa của bác sĩ, bố cục 3 cột:
  - *Trái:* hồ sơ khách + cảnh báo dị ứng nổi bật + chỉ số sinh tồn + **lịch sử khám & đơn thuốc cũ** (timeline).
  - *Giữa:* form kê toa tương tác — chẩn đoán, tìm/thêm thuốc theo tên/hoạt chất, mỗi thuốc nhập liều dùng – số lượng – số ngày, lời dặn.
  - *Phải:* chỉ định liệu trình + **kiểm tra an toàn dị ứng tự động** (cảnh báo đỏ nếu kê thuốc xung đột) + nút ký & liên thông Đơn thuốc Quốc gia.
  - Mở từ trang Bác sĩ (nút "Gọi vào khám" / "Kê toa" / click dòng khách chờ).

### Bản đồ trang ↔ nghiệp vụ (đầy đủ)
Dashboard · Booking · Khách hàng · Chi tiết khách · **Bác sĩ khám** · **Bác sĩ kê toa** · Tư vấn viên · Khảo sát tư vấn · Cashier · Liệu trình · Điều phối (assign + rule + payroll) · Kho & Pha chế · Đơn thuốc/GPP · Catalog (Service/Machine/Skill/Step) · Báo cáo (6 nhóm) · Nhân sự & Học việc.

## Cập nhật lần 4 — Chi tiết hồ sơ, kê toa & thu ngân
### Chi tiết khách (customer-detail.html) — 5 tab
Tổng quan & lưu ý (phân loại khách dễ/khó tính · dị ứng thành phần · KTV/ĐD không thích · lưu ý y tế · ghi chú nội bộ theo thời gian) · Phiếu mua hàng · Liệu trình theo ngày · Voucher & gói · Feedback (đánh giá sao + góp ý + xử lý).
### Hồ sơ điều trị riêng (customer-treatment-record.html)
Bệnh án chuyên sâu hỗ trợ bác sĩ: chỉ số/tiền sử, liệu trình đang điều trị, bệnh án theo từng lần khám (encounters) với chẩn đoán ICD-10 — **có link sang trang kê toa**.
### Kê toa (doctor-prescription.html)
- Chẩn đoán **chỉ chọn theo mã ICD-10 chuẩn Bộ Y tế** (search + chip).
- Thuốc hết kho → dòng cảnh báo vàng + **ô ghi chú bắt buộc hướng xử lý**.
- Kiểm tra dị ứng tự động · link "Xem tổng kết & ký đơn QG".
### Tổng kết lần khám (encounter-summary.html)
Phiếu tổng kết dạng văn bản y tế (xem khi kết thúc khám / xem lại lịch sử từng lần) · in được.
### Cashier (cashier.html)
- **Icon theo nhóm dịch vụ** tránh chọn nhầm.
- **Banner lưu ý khách** (dị ứng, không thích KTV…).
- **Chặn mua trùng**: gói đã mua hiển thị nhãn "Đã có gói", không thêm được.
- **Ghi chú hóa đơn**.
- Layout hóa đơn **rõ ràng chống nhầm**: icon · tên · nút số lượng tách biệt · đơn giá · thành tiền · "PHẢI THU" cỡ lớn.

## Cập nhật lần 5 — Hasaki Clinic
- **Đổi tên** toàn bộ "Lumié Clinic" → **Hasaki Clinic** (logo, title, footer, docs).
- **Kê toa:** mỗi dòng thuốc hiển thị **SKU** + ô **"Ghi chú riêng cho thuốc này"** (độc lập cảnh báo hết kho).
- **Hồ sơ điều trị:** thêm bảng **Lịch sử thuốc đã dùng** (SKU, từ đơn) + **SKU liệu trình/buổi đã dùng** (SVC-...; click mở chi tiết thực hiện).
- **service-record.html** (MỚI) — Chi tiết thực hiện buổi: thông số máy · người làm (thợ chính/phụ · bác sĩ/điều dưỡng phụ) · checklist step · NVL thực tế · **ảnh before/after** + ghi chú.
- **Phác đồ điều trị** (nhóm menu riêng): `protocol-catalog.html` (danh mục phác đồ chuẩn theo giai đoạn) + `protocol-tracking.html` (theo dõi tiến độ/tuân thủ từng khách, cảnh báo trễ buổi).
- **Bảo hành:** cột bảo hành trong Catalog Dịch vụ + trang riêng `warranty.html` (chính sách BH theo dịch vụ · phiếu yêu cầu BH · làm lại miễn phí trong hạn).
- **Booking:** form đặt lịch chi tiết (khách + link hồ sơ · dịch vụ · khung giờ trống · phòng/máy · KTV · ghi chú) + lịch hẹn click mở hồ sơ khách.

## Cập nhật lần 6 — Bổ sung lối vào (link điều hướng)
Thêm nhiều đường dẫn rõ ràng tới 2 trang dễ bị "ẩn":
- **Chi tiết thực hiện dịch vụ** (service-record.html): nút "Chi tiết thực hiện" + cột "Chi tiết buổi" ở trang Liệu trình · mã SKU buổi ở Hồ sơ điều trị · buổi "Đang làm" ở Dashboard.
- **Bảo hành dịch vụ** (warranty.html): mục menu "Bảo hành dịch vụ" · nút "Bảo hành" ở topbar Chi tiết khách · cảnh báo bấm được ở Dashboard · cột bảo hành ở Catalog Dịch vụ.

## Cập nhật lần 7 — Logo, Site map, Tracking flow
- **Logo Hasaki:** thay logo SVG monogram chữ H trong vòng tròn (nền xanh lá đậm), chữ HASAKI / CLINIC theo nhận diện.
- **sitemap.html** (MỚI) — Sơ đồ trang: liệt kê toàn bộ 25 trang theo 6 nhóm, mỗi trang có mô tả tính năng, các action (chip), và liên kết tới trang khác. Đảm bảo không thiếu lối vào.
- **flow-tracking.html** (MỚI) — Module tracking flow tiếp khách trong ngày (nhóm menu "Quy trình tiếp khách"), 3 tab:
  - *Bảng theo dõi realtime:* kanban 8 khâu (Booking → Lấy số → Tư vấn → Bác sĩ → Cashier → Thực hiện → Thu tiền → Đánh giá), mỗi khách 1 thẻ, màu theo trạng thái chờ.
  - *Hành trình 1 khách:* timeline thời lượng từng khâu, hỗ trợ luồng linh hoạt (thu trước/sau, gặp bác sĩ trước/sau tư vấn, bỏ qua khâu) + bảng các biến thể luồng.
  - *Report quy trình:* thời gian TB từng khâu, xác định nút thắt + đề xuất cải tiến, khâu hay lỗi, so sánh chi nhánh.

## Cập nhật lần 8 — Hoàn thiện luồng vận hành
- **reception.html** (MỚI) — Tiếp nhận khách 2 nguồn: có booking / walk-in. Form đổi theo nguồn, tạo KH mới cho walk-in, cấp số (màu phân biệt), gán TVV, đẩy vào hàng chờ tư vấn.
- **pharmacy-dispense.html** (MỚI) — Dược sĩ giải thích cách dùng + pick thuốc theo toa (sau khi bác sĩ ra toa), xử lý thuốc hết kho, chuyển Cashier.
- **service-ticket.html** (MỚI) — Phiếu dịch vụ tổng hợp kết hợp nhiều loại: mua gói · dịch vụ lẻ · sản phẩm · thuốc theo toa · dịch vụ bảo hành (miễn phí); tổng kết theo loại + tổng phải thu.
- **Luồng nối liền mạch:**
  - Tư vấn → "Chuyển Cashier" / "Cần gặp bác sĩ"; phát sinh tư vấn thêm → Cashier "Trả lại tư vấn" (giữ owner & lịch sử).
  - Bác sĩ tổng kết khám → "chuyển dược sĩ" → pick thuốc → Cashier.
  - Cashier → "ra phiếu dịch vụ" → chuyển thực hiện.
- Cập nhật **sitemap** với 3 trang mới.

## Cập nhật lần 9 — Chi tiết hoá Service
### 1. catalog-service-detail.html (MỚI) — Chi tiết một dịch vụ
- Header: mã DV, nhóm, thời lượng, badge (máy cao cấp/skill/bảo hành), giá lẻ & gói.
- Tab **Hướng dẫn & chống chỉ định**: tóm tắt giới thiệu để nhân viên tư vấn khách (giới thiệu ngắn, đối tượng phù hợp, lưu ý) + chống chỉ định (bắt buộc kiểm tra) + thận trọng cần bác sĩ duyệt.
- Tab **Quy trình các bước**: từng bước có thời lượng, mô tả, **quy định riêng**, skill/máy/NVL; click mở chi tiết bước.
- Tab **Máy & định mức NVL**: thông số máy chuẩn (nếu có) + định mức NVL (BOM) + chi phí ước tính.
- Áp dụng cho cả **dịch vụ của bác sĩ** (catalog-service thêm DV bác sĩ: khám da liễu, tiểu phẫu). Bảng catalog click mở chi tiết.
### 2. service-record.html — Nhiều dịch vụ trong cùng một lần làm
- Thanh chọn nhiều dịch vụ trong 1 phiên, mỗi dịch vụ có **type riêng** (badge màu): Gói liệu trình · Dịch vụ lẻ · Bảo hành · DV bác sĩ.
- Click chuyển giữa các dịch vụ → nội dung đổi theo (máy/thợ/step/ảnh khác nhau).
- Dịch vụ bảo hành có banner "miễn phí" (không trừ gói/ví); dịch vụ bác sĩ có bố cục riêng (kết luận khám, không thông số máy KTV).

## Cập nhật lần 10 — Thiết kế lại Chi tiết thực hiện
service-record.html chuyển sang **step-centric** với:
1. **Thứ tự & quan hệ dịch vụ:** bản đồ song song / tuần tự (vd RF sau khám BS; triệt lông + bảo hành song song cùng máy Laser).
2. **Step-centric:** mỗi bước hiển thị người thực hiện, máy + thông số, NVL bị trừ (theo đúng step dùng), ảnh — dùng máy nào/NVL nào hiện ở step đó.
3. **Cảnh báo step trùng:** bước trùng giữa các dịch vụ (vd "làm sạch da") → cảnh báo + nút "Bỏ qua bước" khi làm liên tục.
4. **Form in (service-worksheet.html):** phiếu A4 cho người thực hiện — tổng quát phiên, khối "hiện tại cần làm", bảng trình tự (checkbox), lưu ý BS & lịch sử, chữ ký.
5. **DV bác sĩ:** hiển thị lưu ý khi kê toa (cảnh báo người thực hiện, vd tránh Lidocaine) + lưu ý các lần làm trước.
6. **Góc nhìn theo vai trò:** tab Bác sĩ / Điều dưỡng / KTV / Hair — highlight phần của vai trò, làm mờ phần khác; "việc tiếp theo" theo từng vai trò.

## Cập nhật lần 11 — Trạng thái hôm nay & gom phác đồ
- **Chi tiết khách:** thêm khối "Hôm nay" — khách có đến không, theo booking nào, đang ở bước nào trong flow tracking, hướng dẫn bước tiếp theo trong ngày; panel "Nhắc & lịch hẹn": trễ hẹn phác đồ (đỏ), liệu trình tiếp theo, lịch hẹn sắp tới, gói sắp hết hạn.
- **Booking:** thêm nút "Tiếp nhận khách" + nút "Tiếp nhận" trên từng lịch hẹn → link sang reception (quy trình tiếp nhận là bước đầu).
- **Menu gọn lại:** "Tiếp nhận khách" đứng đầu nhóm Quy trình; bỏ nhóm "Phác đồ điều trị" riêng — "Danh mục phác đồ" chuyển vào Catalog.
- **Theo dõi phác đồ** gom vào trang Báo cáo & KPI (tab thứ 7), vẫn giữ trang chi tiết protocol-tracking truy cập từ report. Dành chỗ menu cho nghiệp vụ khác sau này.

## Cập nhật lần 12 — Bảng hàng đợi đa-line (chống sót khách)
Thêm tab "Hàng đợi (theo line)" — đặt đầu tiên trong Tracking flow. Tách 7 line theo dõi riêng:
1. Đợi lấy số / tư vấn · 2. Đợi bác sĩ · 3. Đợi dược sĩ · 4. Đợi cashier · 5. Đợi làm dịch vụ · 6. Đang làm — chờ giữa bước (ủ tê/thuốc, chờ máy, nghỉ giữa vùng) · 7. Đợi đánh giá.
- Mỗi vé hiển thị thời gian chờ + màu (xanh <5p / vàng 5–15p / đỏ >15p); khách chờ quá lâu có chấm đỏ "!" + nền nổi bật để không bỏ sót.
- KPI: tổng khách chờ, số khách chờ quá lâu cần xử lý ngay; cảnh báo đích danh khách & line.
- Số vé phân biệt nguồn (xanh booking / vàng walk-in).

## Cập nhật lần 13 — Gộp tab trùng trong Tracking flow
- Hai tab "Hàng đợi (theo line)" và "Bảng theo dõi (realtime)" trùng mục đích → **gộp làm một**: giữ bản hàng đợi đa-line (đầy đủ hơn: có thời gian chờ, cảnh báo trễ, line chờ-giữa-bước), đổi tên thành "Hàng đợi khách (realtime)".
- Bỏ tab kanban cũ; dọn code thừa (BOARD_DATA, renderBoard, STEPS array, CSS kanban).
- Tracking flow còn 3 tab: Hàng đợi khách (realtime) · Hành trình 1 khách · Report quy trình.

## Cập nhật lần 14 — Tab "Đang làm dịch vụ" (bổ trợ hàng đợi)
Thêm tab vào Tracking flow, chia theo nhóm: Bác sĩ/Phòng khám · Giảm béo · Triệt lông · Derma & Hair.
- Mỗi ca: khách, phòng, người làm, dịch vụ, giờ vào / dự kiến ra, thanh tiến độ.
- **Cảnh báo quá giờ:** ca làm lâu hơn định mức → nền đỏ + nhãn "⚠ Quá X phút"; ca sắp xong màu vàng (báo giải phóng phòng).
- KPI: ca đang làm · ca quá giờ gây nghẽn · ca sắp xong; cảnh báo đích danh ca giữ phòng/máy gây nghẽn để can thiệp kịp.
- Bổ trợ tab Hàng đợi: hàng đợi cho biết ai chờ, tab này cho biết phòng/máy nào đang kẹt & khi nào giải toả.

## Cập nhật lần 15 — Cảnh báo kẹt nguồn lực
Thêm bảng "Tình trạng nguồn lực" vào tab Đang làm dịch vụ — phân loại nguyên nhân nghẽn:
- **Kẹt thợ:** trạng thái từng nhân sự (Bận / Bận+quá giờ / Nghỉ cơm / Rảnh) — cảnh báo giờ cơm trưa làm trống tay.
- **Kẹt giường/phòng:** phòng nào đang dùng/trống/hết (vd hết cả 2 phòng Laser).
- **Kẹt máy:** máy đắt tiền nhiều DV chờ chung (vd Laser Diode 2 DV chờ), máy bận/bảo trì/rảnh.
- Khối "Phân tích nghẽn" tổng hợp 3 nguyên nhân + gợi ý xử lý (gộp ca, chuyển CN, bố trí lệch giờ ăn).
- Line "Đợi làm dịch vụ" ở tab Hàng đợi dẫn chiếu sang tab này để xem rõ nguồn lực.

## Cập nhật lần 16 — Trang cấp tổng "Toàn CN" cho Bác sĩ / Tư vấn / Cashier
Thêm tab "Toàn CN" vào mỗi trang (giữ nguyên view cá nhân):
- **Bác sĩ → Toàn CN:** từng BS đang khám ai · đã khám bao nhiêu · đang chờ mấy khách · BS có vướng dịch vụ/thủ thuật (sắp xong chưa); cảnh báo điều phối + hàng chờ toàn CN có nút phân BS.
- **Tư vấn → Toàn CN:** từng TVV đang tư vấn ai · số tư vấn/chốt/đang chờ · ai rảnh; gợi ý điều phối + hàng chờ tư vấn.
- **Cashier → Toàn CN:** bảng receipt trong ngày (chưa tính tiền / còn nợ do phát sinh thêm); chi tiết receipt còn nợ; thu **nhiều phương thức** với **3 loại tài khoản** (Cash, Promotion 1, Promotion 2-tặng), thứ tự trừ **Cash → Promotion 1 → Promotion 2** (gợi ý tự động, chỉnh tay được).
- CSS dùng chung: .cn-tabs, .staff-board, .staff-card trong theme.css.

## Cập nhật lần 17 — Phân quyền phiếu & tính tiền 2 bước
- **Tab "Toàn CN" đưa lên TRƯỚC tab cá nhân** (doctor/consultant/cashier), mặc định mở tab Toàn CN.
- **Chống xung đột phiếu (3 nghiệp vụ):** phiếu của mình → chỉnh được; phiếu người khác → chỉ xem (read-only). Cashier có chế độ preview read-only (cashier-payment.html?ro=1).
- **Cashier — trang tính tiền (cashier-payment.html) tách 2 step:**
  - Tên KH + **SĐT mask chừa 4 số cuối** (••• ••• 3456).
  - Step 1: xóa/sửa dịch vụ + ghi chú. Step 2: thanh toán nhiều hình thức (Cash→KM1→KM2→thẻ) + **pay nhiều lần** (lịch sử từng lần: giờ, người thu, hình thức).
  - **Block phiếu** của mình (đang khóa) để kiểm soát; **Share** cho người khác pay dùm khi nghỉ ca; thu lại quyền.
- **Tư vấn viên:** sau khi chốt & ra receipt → **chỉ được THÊM, không sửa/xóa SKU đã chốt** (đảm bảo KPI tư vấn chính xác). Phiếu của TVV nào TVV đó chỉnh, người khác chỉ xem.

## Cập nhật lần 18 — Tách trang & header đồng bộ
- **Header đồng bộ theo trang** (không còn cố định tên cá nhân): trang Của tôi vs Toàn CN có tiêu đề riêng đúng ngữ cảnh.
- **Tách hẳn 2 file mỗi nghiệp vụ:** doctor.html (của tôi) + doctor-cn.html (toàn CN); consultant.html + consultant-cn.html; cashier.html + cashier-cn.html. Tab chuyển bằng link (.cn-link), không còn ẩn/hiện trong 1 file.
- **Cashier — phiếu tách Edit / Preview riêng:** cashier-payment.html (chỉnh sửa & thu, 2 bước) và receipt-preview.html (chỉ xem, read-only). Bảng receipt toàn CN có cột "Quyền" (Của bạn·sửa → mở edit; Chỉ xem → mở preview).
- Detail khách dùng chung customer-detail.html như cũ.

## Cập nhật lần 19 — Menu trỏ Toàn CN, tách trang tư vấn & cashier
1. **Menu chính trỏ trang Toàn CN trước** (doctor-cn/consultant-cn/cashier-cn); trang Toàn CN có link sang "Của tôi".
2. **consultant-cn:** thêm tab "Danh sách đã tư vấn" bên cạnh "Khách chờ" (kết quả: đã chốt/cân nhắc/hẹn lại + giá trị).
3. **consultant-survey.html (đang tư vấn 1 KH):** gộp 3 phần 1 trang — (1) khảo sát & sàng lọc (cờ y tế), (2) đề xuất liệu trình, (3) quy tắc ghi công (closer/owner).
4. **cashier.html → danh sách receipt cá nhân** (mình phụ trách / đang pay / cần theo dõi — chống sót); POS bán hàng chuyển sang cashier-pos.html.
5. **cashier-payment.html:** giữ 2 step rõ ràng — step 1 thêm/sửa dịch vụ, step 2 thanh toán nhiều loại tài khoản (Cash→KM1→KM2) + pay nhiều lần.

## Cập nhật lần 20 — Tinh chỉnh trang bác sĩ & tư vấn cá nhân
1. **doctor.html (cá nhân):** bỏ box "Phân tải bác sĩ" — chỉ còn ở doctor-cn.html cho điều phối viên/người có quyền; bảng hàng chờ full width.
2. **doctor.html:** link "Hồ sơ khách" → đổi thành "Hồ sơ điều trị" (customer-treatment-record).
3. **consultant.html (cá nhân):** bỏ đề xuất cụ thể & quy tắc ghi công; chỉ liệt kê khách phụ trách + nút "Mở trang tư vấn".
4. **consultant-survey.html:** chuyển thành 3 bước — B1 khảo sát nhu cầu (wizard sơ đồ luồng câu hỏi như mẫu), B2 chốt dịch vụ, B3 chuyển Cashier/bác sĩ + ghi công.

## Cập nhật lần 21 — Trang phiếu DV trong ngày & hệ thống mã phiếu
treatment.html đổi thành **"Phiếu dịch vụ phát sinh trong ngày"**:
1. Danh sách phiếu DV khách phát sinh thực tế trong ngày (KPI: tổng/đang làm/quá giờ/xong).
2. Định biên NVL **theo step** (mỗi bước: máy dùng + NVL trừ ở bước đó, chênh lệch vs định mức).
3. Bỏ tiến độ liệu trình → thay bằng Bắt đầu / Dự kiến xong (cảnh báo quá giờ) · Người làm · Máy.
4. Mỗi dòng link sang chi tiết thực hiện (service-record).
5. **Hệ thống mã phiếu đồng bộ:** BK (booking) · TV (tư vấn) · KH (khám/toa) · RC (receipt) · DV (làm dịch vụ). Cùng đuôi số = cùng khách trong ngày. Chuỗi liên kết BK→TV→KH→RC→DV hiển thị ở các phiếu (service-ticket, encounter-summary, cashier-payment, service-record, consultant-survey, worksheet); cashier list/cn đổi SVT→RC.

## Cập nhật lần 22 — Phiếu DV group theo khách & luồng hành trình
1. Bỏ box "Định biên NVL theo step" khỏi treatment.html.
2. Danh sách DV **group theo khách** (1 khách → nhiều phiếu → nhiều DV), mỗi khách 1 khối.
3. **Phiếu phát sinh thứ 2,3** hiển thị riêng trong khối khách, có nhãn "Phát sinh thêm" + link "phiếu liên quan" (RC).
4. **Nhiều người phục vụ/phiếu**: hiển thị tên + major (KTV RF / Điều dưỡng / Bác sĩ / phụ...).
5. **booking-detail.html (MỚI):** timeline luồng phiếu từ lúc vào → kết thúc (BK→tiếp nhận→TV→KH→RC→DV→đánh giá), phiếu phát sinh là nhánh; mỗi mốc link mở phiếu. Thanh mã phiếu ở mỗi khối khách (treatment) cũng link cả luồng.

## Cập nhật lần 23 — Lối vào trang "Hành trình khách trong ngày"
booking-detail.html giờ mở được từ nhiều nơi (trước chỉ từ treatment.html):
- **Lịch & Booking:** bấm tên khách ở dòng lịch hẹn → mở hành trình.
- **Hồ sơ khách (customer-detail):** nút "Hành trình hôm nay" ở header.
- **Tracking flow → tab Hành trình 1 khách:** nút "Hành trình đầy đủ (theo phiếu)" + các dòng biến thể luồng click mở.
- Vẫn giữ lối từ treatment.html (nút "Hành trình khách (booking)").

## Cập nhật lần 24 — Gộp trang trùng & booking 3 tab
1. **Gộp trang hành trình trùng:** giữ tab "Hành trình 1 khách" trong flow-tracking (Quy trình tiếp khách) làm chuẩn — nâng cấp: mỗi khâu hiển thị mã phiếu (BK/TV/KH/RC/DV) + click mở phiếu. booking-detail không còn là trang hành trình trùng mà thành tab "Chi tiết booking".
2. **Booking 3 tab (3 file nối bằng tab link):**
   - booking.html — Dashboard calendar CN + cảnh báo nhân sự/máy (như cũ).
   - booking-list.html (MỚI) — danh sách booking + tìm kiếm + lọc (trạng thái/ngày/nhóm DV).
   - booking-detail.html — chi tiết: thông tin lịch hẹn + KH + phân loại + lưu ý + lịch sử điều trị + timeline luồng phiếu.

## Cập nhật lần 25 — Gộp timeline vào tracking & gọn booking-detail
1. **Rà & đổi link:** các lối "hành trình 1 khách" (treatment, customer-detail, booking dòng lịch hẹn, flow-tracking dòng biến thể) đổi trỏ sang flow-tracking. Link "Chi tiết booking" trong cụm booking giữ trỏ booking-detail.
2. **Tab "Hành trình 1 khách" (flow-tracking) gom cả 2:** timeline ngang (các khâu + mã phiếu) + luồng phiếu dọc (BK→TV→KH→RC→DV, phiếu phát sinh là nhánh) + bảng luồng biến thể.
3. **booking-detail bỏ luồng phiếu**, chỉ còn: thông tin booking + thông tin cơ bản KH + lịch sử booking/điều trị + gói đang có + lịch sử dùng dịch vụ.
