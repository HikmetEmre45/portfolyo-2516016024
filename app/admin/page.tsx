'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [eposta, setEposta] = useState('hikmet@admin.com');
  const [sifre, setSifre] = useState('Admin2026!');
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  // Panel Verileri
  const [aktifTab, setAktifTab] = useState<'mesajlar' | 'aboneler'>('mesajlar');
  const [mesajlar, setMesajlar] = useState<any[]>([]);
  const [aboneler, setAboneler] = useState<any[]>([]);
  const [veriYukleniyor, setVeriYukleniyor] = useState(false);

  // Giriş Yapma
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata('');
    setYukleniyor(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eposta, sifre }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Giriş başarısız.');

      setToken(data.token);
      sessionStorage.setItem('admin_token', data.token);
      verileriGetir(data.token);
    } catch (err: any) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  };

  // Verileri Çekme
  const verileriGetir = async (jwtToken: string) => {
    setVeriYukleniyor(true);
    try {
      const res = await fetch('/api/admin/veriler', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMesajlar(data.mesajlar || []);
        setAboneler(data.aboneler || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVeriYukleniyor(false);
    }
  };

  useEffect(() => {
    const kayitliToken = sessionStorage.getItem('admin_token');
    if (kayitliToken) {
      setToken(kayitliToken);
      verileriGetir(kayitliToken);
    }
  }, []);

  const handleCikis = () => {
    sessionStorage.removeItem('admin_token');
    setToken(null);
  };

  // 1. GİRİŞ EKRANI
  if (!token) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">🔐 Yönetici Girişi</h1>
            <p className="text-sm text-neutral-400 mt-2">Portfolyo ve Veritabanı Yönetimi</p>
          </div>

          {hata && (
            <div className="p-3 mb-6 bg-rose-950/50 border border-rose-500 rounded-xl text-rose-300 text-xs font-medium">
              {hata}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">E-Posta</label>
              <input
                type="email"
                required
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Şifre</label>
              <input
                type="password"
                required
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition mt-2 cursor-pointer"
            >
              {yukleniyor ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/" className="text-xs text-neutral-500 hover:text-neutral-300 underline">
              ← Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 2. YÖNETİCİ PANELİ
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Üst Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white">⚙️ Yönetici Paneli</h1>
            <p className="text-xs text-neutral-400 mt-1">Giriş yapan: hikmet@admin.com (Hikmet Emre Gültekin)</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 rounded-xl transition"
            >
              Siteyi Gör
            </a>
            <button
              onClick={handleCikis}
              className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-600 text-rose-300 hover:text-white text-xs font-medium rounded-xl transition cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="flex gap-3 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setAktifTab('mesajlar')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              aktifTab === 'mesajlar'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            ✉️ İletişim Mesajları ({mesajlar.length})
          </button>
          <button
            onClick={() => setAktifTab('aboneler')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              aktifTab === 'aboneler'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            📬 Bülten Aboneleri ({aboneler.length})
          </button>
        </div>

        {/* Tablo Alanı */}
        {veriYukleniyor ? (
          <div className="text-center py-16 text-neutral-500 text-sm">Veriler yükleniyor...</div>
        ) : (
          <div>
            {aktifTab === 'mesajlar' ? (
              <div className="space-y-4">
                {mesajlar.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 bg-neutral-900/40 border border-neutral-800 rounded-2xl">
                    Henüz iletişim mesajı bulunmuyor.
                  </div>
                ) : (
                  mesajlar.map((m) => (
                    <div key={m.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-white">{m.ad_soyad}</h3>
                          <p className="text-xs text-neutral-400">{m.eposta}</p>
                        </div>
                        <span className="text-xs text-neutral-500 font-mono">{m.tarih}</span>
                      </div>
                      <p className="text-sm text-neutral-300 bg-neutral-950 p-4 rounded-xl border border-neutral-800/60 leading-relaxed">
                        {m.mesaj}
                      </p>
                      <span className="inline-block text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
                        KVKK Onaylı: ✓
                      </span>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-2xl">
                <table className="w-full text-left text-sm text-neutral-300">
                  <thead className="bg-neutral-950/60 text-xs text-neutral-400 uppercase font-mono border-b border-neutral-800">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Ad</th>
                      <th className="px-6 py-4">E-Posta</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4">Kaynak</th>
                      <th className="px-6 py-4">Onay</th>
                      <th className="px-6 py-4">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {aboneler.map((a) => (
                      <tr key={a.id} className="hover:bg-neutral-800/40 transition">
                        <td className="px-6 py-3 font-mono text-neutral-500">{a.id}</td>
                        <td className="px-6 py-3 font-medium text-white">{a.ad || '-'}</td>
                        <td className="px-6 py-3 text-neutral-300 font-mono text-xs">{a.eposta}</td>
                        <td className="px-6 py-3 text-neutral-400">{a.kategori || '-'}</td>
                        <td className="px-6 py-3">
                          <span className="text-xs px-2 py-0.5 bg-neutral-800 rounded font-mono text-neutral-300">
                            {a.kaynak}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          {a.onay ? (
                            <span className="text-emerald-400 text-xs font-bold">✓ Evet</span>
                          ) : (
                            <span className="text-rose-400 text-xs font-bold">✗ Hayır</span>
                          )}
                        </td>
                        <td className="px-6 py-3 font-mono text-xs text-neutral-500">{a.tarih}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}