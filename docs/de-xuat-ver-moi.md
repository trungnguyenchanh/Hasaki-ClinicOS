# Hasaki ClinicOS — Đề xuất nâng cấp ver mới

> Tài liệu tổng hợp 3 mảng đề xuất bổ sung cho phiên bản tiếp theo, dựa trên đánh giá hệ thống hiện tại (78 trang + index, mạnh về vận hành nội bộ) đối chiếu với chuẩn các nền tảng quản lý clinic/spa thẩm mỹ 2026 (Pabau, PatientNow, AestheticsPro, RxPhoto, Nextech, Aura...).
>
> Phạm vi: chỉ gồm 3 mảng dưới đây. Các mảng tăng trưởng (CRM tự động, membership, lead, portal khách) và quản trị (phân quyền/audit/multi-CN) đã có hệ thống nội bộ riêng của công ty, không nằm trong tài liệu này.

---

## Tổng quan 3 đề xuất

| # | Đề xuất | Nhóm giá trị | Trang ảnh hưởng chính |
|---|---------|--------------|----------------------|
| 1 | Ảnh before/after có ghosting (căn chồng ảnh) | An toàn lâm sàng + Marketing | service-record, catalog-service-dossier, customer-detail |
| 2 | Consent form / phiếu đồng ý điện tử + chữ ký | An toàn pháp lý | booking/reception, service-record, customer-detail |
| 3 | Lô / hạn dùng / batch tracking vật tư tiêm | An toàn lâm sàng + Truy vết | inventory-materials, service-record, inventory-log |

---

## 1. Ảnh before/after có "ghosting" (căn chồng ảnh)

### Vấn đề hiện tại
Trang `service-record.html` đã có mục "ảnh before/after" nhưng chỉ ở mức đính kèm ảnh rời. Hai ảnh chụp khác góc / khác khoảng cách / khác tư thế thì không thể so sánh hiệu quả điều trị một cách chính xác.

### Ghosting là gì
Khi chụp ảnh "after", phần mềm chồng mờ ảnh "before" lên màn hình camera ở độ trong suốt ~50% (như một lớp bóng). Người chụp di chuyển khách/máy ảnh cho đến khi khớp đúng vị trí ảnh cũ rồi mới bấm — đảm bảo 2 ảnh cùng góc, cùng khoảng cách, cùng tư thế. (Cùng nguyên lý "onion skinning" trong làm phim.)

### Giá trị
- **Chính xác y khoa:** so sánh kết quả thật, loại bỏ sai lệch góc/tư thế giữa các buổi.
- **Tăng chốt deal:** ảnh kết quả khớp chuẩn là công cụ marketing mạnh; các clinic dùng tính năng này ghi nhận tỉ lệ chốt tư vấn và chuyển đổi khách tăng rõ rệt.
- **Giá trị pháp lý:** ảnh nhất quán có giá trị khi có tranh chấp về hiệu quả điều trị.

### Đề xuất triển khai (web tĩnh — mô phỏng demo)
- **Góc chụp chuẩn theo liệu trình:** mỗi liệu trình khai báo các góc cần chụp (vd "mặt chính diện", "eo nghiêng trái"), để mọi buổi chụp đúng cùng góc.
- **Mô phỏng ghosting:** khi chụp/chọn ảnh buổi sau, hiển thị ảnh buổi đầu mờ chồng lên làm tham chiếu (slider điều chỉnh opacity 0–100%).
- **Khung so sánh:** side-by-side (before | after) hoặc slider trượt giữa 2 ảnh; theo timeline buổi 1 → buổi N.
- **Công cụ kèm theo:** đường căn chỉnh (alignment guide), markup (mũi tên/vùng chú thích), ghi chú đính kèm từng ảnh.
- **Liên kết:** gắn vào `service-record` (đính theo buổi), `catalog-service-dossier` (chứng minh hiệu quả liệu trình), `customer-detail` (timeline ảnh của khách), và đối chiếu phần "đánh giá hiệu quả" trong `protocol-detail`.

### Lưu ý kỹ thuật
Bản web tĩnh không truy cập camera thật → demo bằng: chọn ảnh mẫu, slider opacity để chồng ảnh, khung so sánh trượt. Khi lên hệ thống thật cần camera + lưu trữ ảnh bảo mật (gắn quyền truy cập theo vai trò).

---

## 2. Consent form / phiếu đồng ý điện tử + chữ ký

### Vấn đề hiện tại
Hệ thống đã có cảnh báo **chống chỉ định** (trong `booking-new`, `catalog-service-detail`, `service-record`) nhưng **chưa có luồng ký cam kết đồng ý** trước thủ thuật. Đây là yêu cầu gần như bắt buộc với dịch vụ y khoa thẩm mỹ.

### Nội dung
- **Mẫu phiếu đồng ý theo loại dịch vụ:** mỗi nhóm dịch vụ (laser, RF, HIFU, tiêm, lăn kim...) có mẫu consent riêng — mô tả rủi ro, chống chỉ định, cam kết tuân thủ chăm sóc sau.
- **Khai báo tiền sử y tế (medical history):** dị ứng, thuốc đang dùng, thai kỳ, bệnh nền — đồng bộ với lưu ý y tế trong hồ sơ khách.
- **Ký điện tử:** khách ký trên màn hình (canvas chữ ký), lưu kèm thời gian + người chứng kiến.
- **Lưu trữ & truy xuất:** phiếu ký gắn vào hồ sơ khách + buổi dịch vụ, audit bất biến (ai ký, khi nào).

### Giá trị
- **Pháp lý:** bằng chứng khách đã được giải thích & đồng ý — bảo vệ phòng khám khi có khiếu nại.
- **An toàn:** buộc rà chống chỉ định + tiền sử y tế trước khi làm; chặn thủ thuật khi chưa ký.
- **Liền mạch:** giảm giấy tờ, gắn thẳng vào hồ sơ số.

### Đề xuất triển khai
- Trang `consent-form.html` (mẫu theo dịch vụ + form tiền sử + ô ký điện tử).
- Chèn bước "ký phiếu đồng ý" vào luồng: sau booking/tiếp nhận, trước khi tạo `service-record`.
- Hiển thị trạng thái "Đã ký consent ✓ / Chưa ký ✗" ở `service-record` và `booking-detail`; chặn "Hoàn tất buổi" nếu chưa ký với dịch vụ bắt buộc.
- Tab "Phiếu đồng ý" trong `customer-detail` liệt kê lịch sử consent đã ký.

---

## 3. Lô / hạn dùng / batch tracking cho vật tư tiêm

### Vấn đề hiện tại
Hệ thống đã có hạn dùng ở `inventory-products` (kho sản phẩm bán) và định biên BOM theo step. Nhưng **chưa truy vết theo số lô (lot/batch)** cho vật tư tiêm/tiêu hao — đây là chuẩn an toàn quan trọng: khi 1 lô có sự cố (thu hồi, phản ứng), phải truy được đã dùng cho khách nào, buổi nào.

### Nội dung
- **Số lô + hạn dùng cho từng vật tư:** mỗi lần nhập kho gắn lot number + HSD; xuất kho theo FEFO (hết hạn trước xuất trước).
- **Auto-deduction theo lô:** khi ghi NVL thực tế ở `service-record`, trừ đúng lô đang dùng và lưu lot vào buổi đó.
- **Cảnh báo:** sắp hết hạn theo lô, lô cận date cần đẩy dùng trước, cảnh báo đặt lại (reorder).
- **Truy vết 2 chiều:** từ lô → danh sách khách/buổi đã dùng; từ buổi khách → lô vật tư đã dùng.

### Giá trị
- **An toàn & thu hồi:** sự cố/thu hồi 1 lô → truy ngay khách bị ảnh hưởng để liên hệ.
- **Tuân thủ:** chuẩn quản lý vật tư y tế (đặc biệt vật tư tiêm).
- **Giảm hao phí:** xuất FEFO giảm hàng hết hạn; cảnh báo cận date.

### Đề xuất triển khai
- Bổ sung cột **Số lô + HSD** vào `inventory-materials` (kho NVL); mỗi NVL có nhiều lô.
- `service-record`: khi ghi NVL thực tế, chọn/ghi nhận **lô đã dùng** (không chỉ số lượng).
- `inventory-log`: thêm cột lô vào log xuất chi tiết.
- Trang/section **truy vết theo lô**: nhập 1 lô → ra danh sách buổi & khách đã dùng (phục vụ thu hồi).

---

## Gợi ý thứ tự ưu tiên

1. **Consent điện tử (mục 2)** — rủi ro pháp lý cao nhất nếu thiếu, triển khai gọn (form + chữ ký + chặn luồng).
2. **Batch tracking (mục 3)** — an toàn vật tư tiêm, tận dụng được hạ tầng kho/BOM đã có.
3. **Before/after ghosting (mục 1)** — giá trị marketing + lâm sàng cao, nhưng cần đầu tư UI ảnh nhiều hơn; làm sau cùng trong nhóm này.

---

*Tài liệu mang tính tham khảo cho việc lập kế hoạch ver mới. Mọi đề xuất là khung gợi ý — chi tiết hoá theo quy trình thực tế của Hasaki khi triển khai.*
