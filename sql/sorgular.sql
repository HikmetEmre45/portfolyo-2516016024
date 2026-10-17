-- Öğrenci No: 2516016024
-- Ad Soyad: Hikmet Emre Gültekin

-- GÖREV 3.1: Onay vermiş ve son 30 gün içinde abone olmuş kişiler
SELECT * FROM bulten_aboneleri 
WHERE onay = true AND abone_tarihi >= CURRENT_DATE - INTERVAL '30 days';

-- GÖREV 3.2: En yeni 3 abone (e-posta maskeli)
SELECT 
  id, 
  ad, 
  LEFT(eposta, 3) || '***' AS eposta_maskeli, 
  abone_tarihi 
FROM bulten_aboneleri 
ORDER BY abone_tarihi DESC, id DESC 
LIMIT 3;

-- GÖREV 3.3: Kaynağa göre abone sayısı
SELECT kaynak, COUNT(*) AS abone_sayisi 
FROM bulten_aboneleri 
GROUP BY kaynak;

-- GÖREV 3.4: Kategoriye göre abone sayısı (0 olanlar dahil)
SELECT 
  ia.ad AS kategori_adi, 
  COUNT(ba.id) AS abone_sayisi
FROM ilgi_alanlari ia
LEFT JOIN bulten_aboneleri ba ON ia.id = ba.kategori_id
GROUP BY ia.ad;

-- GÖREV 3.5: E-postada okul numarasının geçtiği kayıt
SELECT * FROM bulten_aboneleri 
WHERE eposta ILIKE '%2516016024%';

-- GÖREV 3.6: E-postaları küçük harfe çevirme
UPDATE bulten_aboneleri 
SET eposta = LOWER(eposta);

-- GÖREV 3.7: Onay vermemiş ve 7 günden eski kayıtları silme
DELETE FROM bulten_aboneleri 
WHERE onay = false AND abone_tarihi < CURRENT_DATE - INTERVAL '7 days';

-- GÖREV 6.3: Son 24 saatte en çok mesaj gönderen 3 adres (Rate-limit analizi)
SELECT eposta, COUNT(*) AS mesaj_sayisi 
FROM iletisim_mesajlari 
WHERE gonderim_zamani > now() - INTERVAL '24 hours' 
GROUP BY eposta 
ORDER BY mesaj_sayisi DESC 
LIMIT 3;