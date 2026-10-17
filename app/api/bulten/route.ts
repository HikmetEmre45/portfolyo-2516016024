import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { ad, eposta, onay, kaynak } = await request.json();

    if (!eposta) {
      return NextResponse.json({ error: 'E-posta adresi zorunludur.' }, { status: 400 });
    }

    if (!onay) {
      return NextResponse.json({ error: 'Bülten aboneliği için onay vermelisiniz.' }, { status: 400 });
    }

    // E-postayı küçük harfe çevirerek ekle
    const temizEposta = eposta.trim().toLowerCase();

    const result = await query(
      `INSERT INTO bulten_aboneleri (ad, eposta, onay, kaynak, abone_tarihi) 
       VALUES ($1, $2, $3, $4, CURRENT_DATE) 
       ON CONFLICT (eposta) DO UPDATE 
       SET onay = EXCLUDED.onay, ad = EXCLUDED.ad
       RETURNING id`,
      [ad || null, temizEposta, onay, kaynak || 'web']
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Bültene başarıyla abone oldunuz!', 
      id: result.rows[0].id 
    });
  } catch (error: any) {
    console.error('Bülten API Hatası:', error);
    return NextResponse.json({ error: 'Abonelik işlemi sırasında bir hata oluştu.' }, { status: 500 });
  }
}