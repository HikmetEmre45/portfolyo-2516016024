'use client';

import { useState } from 'react';

export default function Home() {
  // Bülten Form State'leri
  const [bultenAd, setBultenAd] = useState('');
  const [bultenEposta, setBultenEposta] = useState('');
  const [bultenOnay, setBultenOnay] = useState(false);
  const [bultenDurum, setBultenDurum] = useState<{ success?: boolean; message?: string } | null>(null);
  const [bultenYukleniyor, setBultenYukleniyor] = useState(false);

  // İletişim Form State'leri
  const [adSoyad, setAdSoyad] = useState('');
  const [eposta, setEposta] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [kvkkOnay, setKvkkOnay] = useState(false);
  const [iletisimDurum, setIletisimDurum] = useState<{ success?: boolean; message?: string } | null>(null);
  const [iletisimYukleniyor, setIletisimYukleniyor] = useState(false);

  // Bülten Gönderimi
  const handleBultenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBultenDurum(null);
    setBultenYukleniyor(true);

    try {
      const res = await fetch('/api/bulten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad: bultenAd, eposta: bultenEposta, onay: bultenOnay, kaynak: 'web' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Abonelik başarısız.');
      setBultenDurum({ success: true, message: data.message });
      setBultenAd('');
      setBultenEposta('');
      setBultenOnay(false);
    } catch (err: any) {
      setBultenDurum({ success: false, message: err.message });
    } finally {
      setBultenYukleniyor(false);
    }
  };

  // İletişim Formu Gönderimi
  const handleIletisimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIletisimDurum(null);
    setIletisimYukleniyor(true);

    try {
      const res = await fetch('/api/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad_soyad: adSoyad, eposta, mesaj, kvkk_onay: kvkkOnay }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Mesaj gönderilemedi.');
      setIletisimDurum({ success: true, message: data.message });
      setAdSoyad('');
      setEposta('');
      setMesaj('');
      setKvkkOnay(false);
    } catch (err: any) {
      setIletisimDurum({ success: false, message: err.message });
    } finally {
      setIletisimYukleniyor(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Başlık & Profil */}
        <header className="text-center space-y-4 border-b border-neutral-800 pb-8">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono uppercase tracking-widest">
            Öğrenci No: 2516016024
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hikmet Emre Gültekin
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Büyük Veri Analitiği, Veritabanı Sistemleri ve Modern Web Mimarileri Portfolyo Projesi.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <span className="text-xs bg-neutral-900 border border-neutral-800 px-3 py-1 rounded text-neutral-300">Next.js 16</span>
            <span className="text-xs bg-neutral-900 border border-neutral-800 px-3 py-1 rounded text-neutral-300">Neon PostgreSQL</span>
            <span className="text-xs bg-neutral-900 border border-neutral-800 px-3 py-1 rounded text-neutral-300">Tailwind CSS</span>
          </div>
        </header>

        {/* Bülten Abonelik Bölümü */}
        <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-2">📬 E-Bültene Abone Ol</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Yazılım, veri analitiği ve yeni makalelerden haberdar olmak için bültene katılabilirsiniz.
          </p>

          {bultenDurum && (
            <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
              bultenDurum.success ? 'bg-emerald-950/50 border border-emerald-500 text-emerald-300' : 'bg-rose-950/50 border border-rose-500 text-rose-300'
            }`}>
              {bultenDurum.message}
            </div>
          )}

          <form onSubmit={handleBultenSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Adınız (İsteğe Bağlı)</label>
                <input
                  type="text"
                  value={bultenAd}
                  onChange={(e) => setBultenAd(e.target.value)}
                  placeholder="Adınızı giriniz"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">E-Posta Adresiniz *</label>
                <input
                  type="email"
                  required
                  value={bultenEposta}
                  onChange={(e) => setBultenEposta(e.target.value)}
                  placeholder="eposta@alanadi.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="bultenOnay"
                required
                checked={bultenOnay}
                onChange={(e) => setBultenOnay(e.target.checked)}
                className="w-4 h-4 rounded bg-neutral-950 border-neutral-800 text-emerald-500 accent-emerald-500 cursor-pointer"
              />
              <label htmlFor="bultenOnay" className="text-xs text-neutral-400 cursor-pointer select-none">
                Bülten e-postalarını almayı ve iletişim bilgilerimin kaydedilmesini onaylıyorum.
              </label>
            </div>

            <button
              type="submit"
              disabled={bultenYukleniyor}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              {bultenYukleniyor ? 'Kaydediliyor...' : 'Abone Ol'}
            </button>
          </form>
        </section>

        {/* İletişim Formu */}
        <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-2">✉️ İletişim Formu</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Bana mesaj göndermek için aşağıdaki formu doldurabilirsiniz.
          </p>

          {iletisimDurum && (
            <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
              iletisimDurum.success ? 'bg-emerald-950/50 border border-emerald-500 text-emerald-300' : 'bg-rose-950/50 border border-rose-500 text-rose-300'
            }`}>
              {iletisimDurum.message}
            </div>
          )}

          <form onSubmit={handleIletisimSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={adSoyad}
                  onChange={(e) => setAdSoyad(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">E-Posta Adresiniz *</label>
                <input
                  type="email"
                  required
                  value={eposta}
                  onChange={(e) => setEposta(e.target.value)}
                  placeholder="eposta@alanadi.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Mesajınız * (10 - 2000 karakter)</label>
              <textarea
                required
                rows={4}
                minLength={10}
                maxLength={2000}
                value={mesaj}
                onChange={(e) => setMesaj(e.target.value)}
                placeholder="Mesajınızı buraya yazınız..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="kvkkOnay"
                required
                checked={kvkkOnay}
                onChange={(e) => setKvkkOnay(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded bg-neutral-950 border-neutral-800 text-indigo-500 accent-indigo-500 cursor-pointer"
              />
              <label htmlFor="kvkkOnay" className="text-xs text-neutral-400 cursor-pointer select-none leading-relaxed">
                Kişisel verilerimin iletişim amacıyla işlenmesini ve KVKK Aydınlatma Metni kapsamında saklanmasını kabul ediyorum.
              </label>
            </div>

            <button
              type="submit"
              disabled={iletisimYukleniyor}
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              {iletisimYukleniyor ? 'Gönderiliyor...' : 'Mesajı Gönder'}
            </button>
          </form>
        </section>

        {/* Alt Bilgi */}
        <footer className="text-center pt-8 border-t border-neutral-900 text-neutral-500 text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Hikmet Emre Gültekin - Tüm Hakları Saklıdır.</p>
          <a
            href="/admin"
            className="text-neutral-400 hover:text-white underline transition"
          >
            Yönetici (Admin) Girişi →
          </a>
        </footer>

      </div>
    </main>
  );
}