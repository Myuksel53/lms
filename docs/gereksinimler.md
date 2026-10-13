# Kişisel Para Yönetim Sistemi – Gereksinimler

Bu doküman, [para-yonetim-sistemi-moduller.md](para-yonetim-sistemi-moduller.md) dosyasındaki 10 modülün fonksiyonel ve fonksiyonel olmayan gereksinimlerini tanımlar.

- **FG:** Fonksiyonel gereksinim (sistem ne yapacak)
- **FOG:** Fonksiyonel olmayan gereksinim (sistem nasıl çalışacak)

---

## 1. Fonksiyonel Gereksinimler

### 1.1 Kullanıcı ve Kimlik Doğrulama

- **FG-01:** Kullanıcı ad, e-posta ve şifre ile kayıt olabilmeli. Aynı e-posta ile ikinci kayıt engellenmeli.
- **FG-02:** Kayıtlı kullanıcı e-posta ve şifresiyle giriş yapabilmeli.
- **FG-03:** Kullanıcı, e-postasına gönderilen tek kullanımlık ve süreli bir bağlantıyla şifresini sıfırlayabilmeli.
- **FG-04:** Kullanıcı oturumunu kapatabilmeli. İşlem yapılmayan oturum belirli bir süre sonunda otomatik olarak sonlanmalı.
- **FG-05:** Kullanıcı profil bilgilerini (ad, e-posta) ve şifresini güncelleyebilmeli.
- **FG-06:** Her kullanıcı yalnızca kendi hesaplarını, işlemlerini ve raporlarını görebilmeli.

### 1.2 Hesap Yönetimi

- **FG-07:** Kullanıcı banka, nakit ve kredi kartı türünde hesap ekleyebilmeli, düzenleyebilmeli ve silebilmeli.
- **FG-08:** Hesap oluşturulurken başlangıç bakiyesi girilebilmeli.
- **FG-09:** Her hesabın güncel bakiyesi, o hesaba bağlı gelir ve giderlerden otomatik hesaplanmalı.
- **FG-10:** Kullanıcı hesaplar arasında para transferi yapabilmeli. Transferler gelir veya gider olarak sayılmamalı.
- **FG-11:** Tüm hesapların toplam bakiyesi tek ekranda gösterilmeli. Kredi kartı borçları bu toplamdan düşülmeli.
- **FG-12:** İşlemi bulunan bir hesap silinmek yerine arşivlenebilmeli ve geçmiş kayıtlar korunmalı.

### 1.3 Gelir Takibi

- **FG-13:** Kullanıcı gelir kaydı ekleyebilmeli. Kayıt tarih, tutar, kaynak (maaş, burs, ek gelir vb.), hesap ve isteğe bağlı açıklama içermeli.
- **FG-14:** Gelir kayıtları düzenlenebilmeli ve silinebilmeli.
- **FG-15:** Tekrarlayan gelir tanımlanabilmeli (örn. "her ayın 15'inde maaş") ve sistem bu kaydı zamanı gelince otomatik oluşturmalı.
- **FG-16:** Gelirler tarih aralığı, kaynak ve hesaba göre filtrelenip listelenebilmeli.

### 1.4 Gider Takibi

- **FG-17:** Kullanıcı gider kaydı ekleyebilmeli. Kayıt tarih, tutar, açıklama, kategori ve ödeme yöntemi (hesap) içermeli.
- **FG-18:** Gider kayıtları düzenlenebilmeli ve silinebilmeli.
- **FG-19:** Tekrarlayan gider tanımlanabilmeli (kira, abonelik, fatura vb.).
- **FG-20:** Giderler tarih aralığı, kategori, hesap ve tutar aralığına göre filtrelenebilmeli. Açıklama alanında metin araması yapılabilmeli.

### 1.5 Kategori Yönetimi

- **FG-21:** Yeni kullanıcıya varsayılan bir kategori seti tanımlanmalı (Market, Ulaşım, Kira, Faturalar, Eğlence, Sağlık, Diğer).
- **FG-22:** Kullanıcı kategori oluşturabilmeli, adını ve rengini düzenleyebilmeli, kategoriyi silebilmeli.
- **FG-23:** Gelir kategorileri ile gider kategorileri ayrı tutulmalı.
- **FG-24:** Aynı kullanıcı aynı türde iki kategoriye aynı adı verememeli.
- **FG-25:** Kullanılan bir kategori silinirken, ona bağlı kayıtları hangi kategoriye taşıyacağı kullanıcıya sorulmalı. Hiçbir kayıt kategorisiz kalmamalı.

### 1.6 Bütçe Planlama

- **FG-26:** Kullanıcı her gider kategorisi için aylık harcama limiti belirleyebilmeli.
- **FG-27:** Her kategori için harcanan tutar, kalan tutar ve kullanım yüzdesi gösterilmeli.
- **FG-28:** Kullanım oranı %80'e ulaştığında sarı, %100'ü aştığında kırmızı görsel uyarı gösterilmeli.
- **FG-29:** Önceki ayın bütçesi tek işlemle yeni aya kopyalanabilmeli.

### 1.7 Birikim Hedefleri

- **FG-30:** Kullanıcı hedef adı, hedef tutarı ve hedef tarihi belirleyerek birikim hedefi oluşturabilmeli.
- **FG-31:** Hedefe para eklenebilmeli ve hedeften para çekilebilmeli.
- **FG-32:** Her hedef için ilerleme yüzdesi, kalan tutar ve hedef tarihe yetişmek için gereken aylık birikim tutarı gösterilmeli.
- **FG-33:** Hedef tutarına ulaşılınca hedef "tamamlandı" olarak işaretlenmeli.

### 1.8 Raporlama ve Grafikler

- **FG-34:** Seçilen ay için toplam gelir, toplam gider ve net tutar (gelir − gider) gösterilmeli.
- **FG-35:** Giderlerin kategorilere göre dağılımı halka veya pasta grafikle gösterilmeli.
- **FG-36:** Son 6 ve son 12 ayın gelir-gider karşılaştırması çubuk grafikle gösterilmeli.
- **FG-37:** Bütçe limitleri ile gerçekleşen harcamalar kategori bazında karşılaştırılmalı.
- **FG-38:** Raporlar tarih aralığı ve hesaba göre filtrelenebilmeli.

### 1.9 Bildirim ve Hatırlatıcılar

- **FG-39:** Kullanıcı fatura veya tekrarlayan ödemeler için hatırlatıcı tanımlayabilmeli ve hatırlatmanın kaç gün önce yapılacağını seçebilmeli.
- **FG-40:** Bir kategorinin bütçe kullanımı %80'e ulaştığında ve %100'ü aştığında otomatik bildirim gönderilmeli.
- **FG-41:** Bir birikim hedefi tarihine yaklaşırken ilerleme beklenen düzeyin gerisindeyse uyarı gönderilmeli.
- **FG-42:** Bildirimler uygulama içinde gösterilmeli; isteğe bağlı olarak e-posta ile de gönderilebilmeli. Kullanıcı bildirim türlerini ve kanallarını açıp kapatabilmeli.
- **FG-43:** Bildirimler okundu olarak işaretlenebilmeli.

### 1.10 Veri Yedekleme ve Dışa Aktarma

- **FG-44:** Kullanıcı seçtiği tarih aralığındaki işlemleri CSV ve Excel (.xlsx) formatında dışa aktarabilmeli.
- **FG-45:** Sistem tüm verileri her gün otomatik olarak yedeklemeli.
- **FG-46:** Kullanıcı hesabını ve tüm verilerini kalıcı olarak silebilmeli.
- **FG-47:** *(İleri aşama)* Kullanıcı banka ekstresi gibi CSV dosyalarından işlemleri içe aktarabilmeli.

---

## 2. Fonksiyonel Olmayan Gereksinimler

### 2.1 Güvenlik

- **FOG-01:** Şifreler yalnızca güçlü bir algoritmayla (bcrypt veya Argon2) hash'lenerek saklanmalı; hiçbir zaman düz metin olarak tutulmamalı.
- **FOG-02:** Şifre en az 8 karakter olmalı ve en az bir harf ile bir rakam içermeli.
- **FOG-03:** Aynı hesaba 5 başarısız giriş denemesinden sonra girişler 15 dakika engellenmeli.
- **FOG-04:** Şifre sıfırlama bağlantısı tek kullanımlık olmalı ve 30 dakika geçerli olmalı.
- **FOG-05:** Oturum çerezleri `HttpOnly`, `Secure` ve `SameSite` olarak işaretlenmeli. Hareketsiz oturumun zaman aşımı 30 dakika olmalı.
- **FOG-06:** Canlı ortamda tüm iletişim HTTPS üzerinden yapılmalı.
- **FOG-07:** Uygulama SQL enjeksiyonu, XSS ve CSRF saldırılarına karşı korunmalı. Tüm girdiler sunucu tarafında doğrulanmalı.
- **FOG-08:** Bir kullanıcı başka bir kullanıcının verisine URL veya ID değiştirerek erişememeli; her sorgu kullanıcıya göre filtrelenmeli.
- **FOG-09:** Şifreler, token'lar ve gizli anahtarlar loglara yazılmamalı ve kaynak kodda bulunmamalı; ortam değişkenlerinden okunmalı.

### 2.2 Gizlilik ve Yasal Uyum

- **FOG-10:** Sistem KVKK'ya uygun olmalı: kayıt sırasında aydınlatma metni sunulmalı ve kullanıcının verilerini silme hakkı (FG-46) sağlanmalı.
- **FOG-11:** Yedek dosyaları şifrelenmiş olarak saklanmalı.

### 2.3 Veri Doğruluğu

- **FOG-12:** Para tutarları kayan noktalı sayı (`float`) olarak değil, `Decimal` ya da kuruş cinsinden tamsayı olarak saklanmalı ve hesaplanmalı.
- **FOG-13:** Tutarlar sıfırdan büyük olmalı ve en fazla 2 ondalık basamak içermeli.
- **FOG-14:** Bakiyeyi etkileyen işlemler (kayıt ekleme, silme, transfer) veritabanı transaction'ı içinde yapılmalı. Böylece işlem yarıda kalsa bile veriler tutarlı kalır.
- **FOG-15:** Varsayılan para birimi TL (₺) olmalı. Tarihler GG.AA.YYYY, tutarlar 1.234,56 ₺ biçiminde gösterilmeli.

### 2.4 Performans

- **FOG-16:** Kullanıcı başına 10.000 işlem varken sayfaların %95'i 1 saniyenin altında yüklenmeli.
- **FOG-17:** Aylık rapor ve grafikler 2 saniyenin altında oluşturulmalı.
- **FOG-18:** 10.000 kayıtlık dışa aktarma 5 saniyenin altında tamamlanmalı.

### 2.5 Kullanılabilirlik

- **FOG-19:** Arayüz ve hata mesajları Türkçe, açık ve anlaşılır olmalı.
- **FOG-20:** Arayüz responsive olmalı; 360 px genişliğindeki mobil ekranlardan masaüstüne kadar düzgün çalışmalı.
- **FOG-21:** Yeni bir gider tek bir formdan, en fazla 3 adımda eklenebilmeli.
- **FOG-22:** Arayüz temel erişilebilirlik kurallarına (WCAG 2.1 AA) uymalı: yeterli renk kontrastı ve klavyeyle kullanım. Grafiklerde bilgi yalnızca renkle verilmemeli.

### 2.6 Güvenilirlik ve Erişilebilirlik

- **FOG-23:** Yedekler en az 30 gün saklanmalı. En fazla 24 saatlik veri kaybı kabul edilebilir.
- **FOG-24:** Yedekten geri yükleme işlemi belgelenmeli ve en az bir kez test edilmeli.
- **FOG-25:** Sistem aylık %99 çalışma süresi hedeflemeli.
- **FOG-26:** Beklenmeyen hatalarda kullanıcıya teknik ayrıntı gösterilmemeli; hata sunucu tarafında loglanmalı.

### 2.7 Bakım Yapılabilirlik

- **FOG-27:** Kod modüler olmalı; her modül (gelir, gider, kategori vb.) ayrı bir pakette bulunmalı.
- **FOG-28:** Çekirdek modüllerde birim testleri kodun en az %80'ini kapsamalı.
- **FOG-29:** Kod PEP 8'e uygun olmalı ve bir linter (örn. Ruff) ile denetlenmeli.
- **FOG-30:** Veritabanı şeması değişiklikleri migration aracıyla (örn. Alembic) yönetilmeli.
- **FOG-31:** README dosyasında kurulum, çalıştırma ve test adımları anlatılmalı.

### 2.8 Taşınabilirlik ve Ölçeklenebilirlik

- **FOG-32:** Uygulama Python 3.11 ve üzeri sürümlerle çalışmalı.
- **FOG-33:** Geliştirme ortamında SQLite kullanılmalı. ORM sayesinde PostgreSQL'e uygulama kodu değiştirilmeden geçilebilmeli.
- **FOG-34:** Uygulama Chrome, Firefox, Safari ve Edge'in son iki sürümünde çalışmalı.

---

## 3. Önceliklendirme

| Aşama | Modüller | Açıklama |
|---|---|---|
| **1 – MVP** | Gelir Takibi, Gider Takibi, Kategori Yönetimi, Raporlama | Modül dokümanında önerilen çekirdek |
| **2** | Kullanıcı ve Kimlik Doğrulama, Hesap Yönetimi | Çok kullanıcılı yapı ve hesap bazlı bakiye |
| **3** | Bütçe Planlama, Birikim Hedefleri | Planlama özellikleri |
| **4** | Bildirim ve Hatırlatıcılar, Veri Yedekleme ve Dışa Aktarma | Otomasyon ve veri taşınabilirliği |

FOG-01 – FOG-09 (güvenlik) ve FOG-12 – FOG-14 (veri doğruluğu) gereksinimleri MVP'den itibaren uygulanmalıdır.

## 4. Varsayımlar ve Kapsam Dışı

- Sistem web uygulaması olarak geliştirilecek. Mobil uygulama kapsam dışıdır.
- Tek para birimi (TL) desteklenecek. Çoklu döviz ve kur dönüşümü kapsam dışıdır.
- Bankalarla otomatik entegrasyon (işlemlerin bankadan otomatik çekilmesi) kapsam dışıdır.
- Kullanıcılar arası paylaşım (aile veya ortak bütçe) kapsam dışıdır.
