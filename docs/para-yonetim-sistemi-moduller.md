# Kişisel Para Yönetim Sistemi – Temel Modüller

1. **Kullanıcı ve Kimlik Doğrulama:** Kullanıcı kaydı, girişi, şifre sıfırlama ve oturum güvenli şekilde yönetilecek.
2. **Hesap Yönetimi:** Banka, nakit ve kart hesapları eklenip bakiyeleri ayrı ayrı izlenecek.
3. **Gelir Takibi:** Maaş, burs ve ek gelirler tarih, tutar ve kaynakla kaydedilecek.
4. **Gider Takibi:** Her harcama tarih, tutar, açıklama ve ödeme yöntemiyle sisteme girilecek.
5. **Kategori Yönetimi:** Market, ulaşım, kira gibi kategoriler kullanıcı tarafından oluşturulup düzenlenip silinebilecek.
6. **Bütçe Planlama:** Her kategori için aylık harcama limiti belirlenip kalan tutar gösterilecek.
7. **Birikim Hedefleri:** Hedef tutar ve tarih belirlenip birikim ilerlemesi yüzde olarak gösterilecek.
8. **Raporlama ve Grafikler:** Aylık gelir-gider özeti ve kategori dağılımı grafiklerle görsel olarak sunulacak.
9. **Bildirim ve Hatırlatıcılar:** Fatura günleri ve bütçe aşımları için kullanıcıya otomatik uyarı gönderilecek.
10. **Veri Yedekleme ve Dışa Aktarma:** Veriler düzenli yedeklenecek ve CSV veya Excel formatında dışa aktarılabilecek.

## Başlangıç Önerisi

Python ile başlıyorsan, Gelir/Gider + Kategori + Raporlama üçlüsüyle küçük bir çekirdek kurup diğer modülleri sonradan eklemek iyi bir yol olur.
