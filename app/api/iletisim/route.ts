import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { ad_soyad, eposta, mesaj, kvkk_onay } = await request.json();

    // Temel Doğrulamalar
    if (!ad_soyad || !eposta || !mesaj) {
      return NextResponse.json({ error: 'Tüm alanları doldurunuz.' }, { status: 400 });
    }

    if (!kvkk_onay) {
      return NextResponse.json({ error: 'KVKK onayını kabul etmelisiniz.' }, { status: 400 });
    }

    if (mesaj.length < 10 || mesaj.length > 2000) {
      return NextResponse.json({ error: 'Mesajınız 10 ile 2000 karakter arasında olmalıdır.' }, { status: 400 });
    }

    // Veritabanına Ekleme
    const result = await query(
      `INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay) 
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [ad_soyad, eposta, mesaj, kvkk_onay]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız başarıyla iletildi!', 
      id: result.rows[0].id 
    });
  } catch (error: any) {
    console.error('İletişim API Hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}