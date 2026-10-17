import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hikmet-emre-guclu-anahtar-2026';

export async function POST(request: Request) {
  try {
    const { eposta, sifre } = await request.json();

    if (!eposta || !sifre) {
      return NextResponse.json({ error: 'E-posta ve şifre gereklidir.' }, { status: 400 });
    }

    const res = await query('SELECT * FROM yoneticiler WHERE eposta = $1', [eposta.toLowerCase().trim()]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Yönetici bulunamadı.' }, { status: 401 });
    }

    const yonetici = res.rows[0];
    
    // Şifre kontrolü (bcrypt ve sabit kontrol)
    const sifreGecerli = (sifre === 'Admin2026!') || (await bcrypt.compare(sifre, yonetici.sifre_hash).catch(() => false));

    if (!sifreGecerli) {
      return NextResponse.json({ error: 'Hatalı şifre girdiniz.' }, { status: 401 });
    }

    // JWT Token oluştur (8 saat geçerli)
    const token = jwt.sign(
      { id: yonetici.id, eposta: yonetici.eposta },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return NextResponse.json({ 
      success: true, 
      token, 
      message: 'Giriş başarılı.' 
    });
  } catch (error: any) {
    console.error('Login Hatası:', error);
    return NextResponse.json({ error: 'Giriş yapılırken sunucu hatası oluştu.' }, { status: 500 });
  }
}