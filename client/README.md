# Kumbara – arayüz (client)

React + Vite + TypeScript ile yazılmış kişisel bütçe arayüzü. Görsel dil `uı/stitch_global_currency_ui_dashboard/DESIGN.md` dosyasından alınmıştır.

```bash
cd client
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # tip kontrolü + üretim derlemesi (dist/)
```

- Şimdilik sahte veriyle çalışır: `src/data/mock.ts`. Backend hazır olunca yerine bir API katmanı yazılacak.
- Tutarlar kuruş cinsinden tamsayı olarak tutulur (`src/lib/money.ts`).
- Sayfalar: Genel bakış, İşlemler (`#/islemler`), Bütçe (`#/butce`), Hedefler (`#/hedefler`), Raporlar (`#/raporlar`).
