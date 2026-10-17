import Link from 'next/link';

export default function AydinlatmaMetniPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-sm space-y-8">
        
        {/* Başlık */}
        <div className="border-b border-neutral-800 pb-6">
          <Link href="/" className="text-xs text-emerald-400 hover:text-emerald-300 font-mono inline-block mb-3">
            ← Portfolyoya Dön
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Kişisel Verilerin Korunması ve Aydınlatma Metni
          </h1>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            6698 sayılı KVKK ve 7499 sayılı Kanun Değişiklikleri Kapsamında Bilgilendirme
          </p>
        </div>

        {/* 1. Veri Sorumlusu */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-sm">01.</span> Veri Sorumlusu
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Bu portfolyo web sitesi kapsamında toplanan kişisel verileriniz, veri sorumlusu sıfatıyla{' '}
            <strong className="text-white">Hikmet Emre Gültekin</strong> (Öğrenci No: 2516016024, Manisa Celal Bayar Üniversitesi) 
            tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuata uygun olarak işlenmektedir.
          </p>
        </section>

        {/* 2. Toplanan Kişisel Veriler ve Amaç */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-sm">02.</span> İşlenen Veriler ve İşleme Amaçları
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Sitede yer alan <em>İletişim Formu</em> ve <em>E-Bülten Aboneliği</em> aracılığıyla adınız, soyadınız ve e-posta adresiniz toplanmaktadır. 
            Bu veriler; ziyaretçilerle iletişime geçmek, portfolyo güncellemeleri paylaşmak ve akademik proje gereksinimlerini yerine getirmek amacıyla işlenir.
          </p>
        </section>

        {/* 3. YURT DIŞINA AKTARIM (HUKUK GÖREVİ - KVKK MD. 9) */}
        <section className="space-y-3 bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80">
          <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
            <span className="font-mono text-sm">03.</span> Kişisel Verilerin Yurt Dışına Aktarılması (KVKK md. 9)
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Web sitemizin altyapısı, modern bulut mimarileri olan <strong className="text-white">Vercel Inc.</strong> (Frontend ve API barındırma) 
            ve <strong className="text-white">Neon Database Inc.</strong> (Serverless PostgreSQL veritabanı) servisleri üzerinden çalışmaktadır.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Neon veritabanı ve Vercel sunucuları <strong className="text-white">Avrupa Birliği (Frankfurt / AWS eu-central-1)</strong> sınırları 
            içerisindeki veri merkezlerinde konumlandırılmıştır. Bu doğrultuda iletişim formu ve bülten kaydı sırasında girdiğiniz kişisel veriler, 
            <strong className="text-emerald-400"> 7499 sayılı Kanun ile değişik 6698 sayılı Kanun’un 9. maddesi</strong> uyarınca yurt dışına aktarılmaktadır.
          </p>
          <div className="text-xs text-neutral-400 bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 space-y-1 font-mono">
            <div>• Sunucu Sağlayıcı: Vercel Cloud (Global CDN / Frankfurt)</div>
            <div>• Veritabanı Sağlayıcı: Neon PostgreSQL (AWS Frankfurt / eu-central-1)</div>
            <div>• Aktarım Dayanağı: KVKK md. 9 uygun güvenceler ve standart sözleşme hükümleri</div>
          </div>
        </section>

        {/* 4. İlgili Kişinin Hakları */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono text-sm">04.</span> Haklarınız (KVKK md. 11)
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            KVKK md. 11 kapsamında dilediğiniz zaman verilerinizin silinmesini, işlenip işlenmediğini öğrenmeyi veya 
            aktarılan üçüncü taraflar hakkında bilgi talep etmeyi iletişim formumuz üzerinden veri sorumlusuna iletebilirsiniz.
          </p>
        </section>

        {/* Alt Butonlar */}
        <div className="pt-6 border-t border-neutral-800 flex justify-between items-center text-xs">
          <span className="text-neutral-500 font-mono">BVA 2205 Siber Güvenlik ve Bilişim Hukuku</span>
          <Link href="/" className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition">
            Ana Sayfaya Dön
          </Link>
        </div>

      </div>
    </main>
  );
}
