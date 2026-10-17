import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hikmet-emre-guclu-anahtar-2026';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Yetkisiz erişim. Lütfen giriş yapın.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Oturum süresi dolmuş. Tekrar giriş yapın.' }, { status: 401 });
    }

    // 1. İletişim Mesajlarını Çek
    const mesajlar = await query(
      `SELECT id, ad_soyad, eposta, mesaj, kvkk_onay, okundu, to_char(gonderim_zamani, 'DD.MM.YYYY HH24:MI') as tarih 
       FROM iletisim_mesajlari 
       ORDER BY gonderim_zamani DESC`
    );

    // 2. Bülten Abonelerini Çek
    const aboneler = await query(
      `SELECT ba.id, ba.ad, ba.eposta, ba.onay, ba.kaynak, to_char(ba.abone_tarihi, 'DD.MM.YYYY') as tarih, ia.ad as kategori
       FROM bulten_aboneleri ba
       LEFT JOIN ilgi_alanlari ia ON ba.kategori_id = ia.id
       ORDER BY ba.id DESC`
    );

    return NextResponse.json({
      mesajlar: mesajlar.rows,
      aboneler: aboneler.rows
    });
  } catch (error: any) {
    console.error('Admin Veri API Hatası:', error);
    return NextResponse.json({ error: 'Veriler getirilemedi.' }, { status: 500 });
  }
}