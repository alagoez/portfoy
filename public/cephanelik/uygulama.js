// Cephanelik: arama, sekmeler, kategori çipleri, kopyalama
const SKOOL = 'https://www.skool.com/diffpov-akademi-8549/about';
const durum = { sekme: 'skill', kategori: 'Hepsi', arama: '' };
const $ = id => document.getElementById(id);

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const kisalt = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.0', '') + 'k' : String(n);
// Arama için sadeleştirme: I/İ/ı farkını ve aksanları yok sayar ("Instagram" = "ınstagram" = "instagram")
const kucuk = s => s.replace(/[İI]/g, 'i').toLowerCase().replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');

$('say-skill').textContent = SKILLS.length;
$('say-sablon').textContent = SABLONLAR.length;
$('say-kategori').textContent = new Set(SKILLS.map(k => k.kategori)).size + new Set(SABLONLAR.map(k => k.raf)).size;
$('sekme-skill').textContent = SKILLS.length;
$('sekme-sablon').textContent = SABLONLAR.length;

function veri() {
  return durum.sekme === 'skill' ? SKILLS : SABLONLAR;
}
function kategoriAdi(k) {
  return durum.sekme === 'skill' ? k.kategori : k.raf;
}
function eslesir(k) {
  if (durum.kategori !== 'Hepsi' && kategoriAdi(k) !== durum.kategori) return false;
  if (!durum.arama) return true;
  const metin = kucuk([k.ad, k.aciklama, k.kategori, k.alt, k.raf, k.yapan, (k.servisler || []).join(' ')].join(' '));
  return kucuk(durum.arama).split(/\s+/).every(p => metin.includes(p));
}

function cipleriCiz() {
  const sayac = {};
  veri().forEach(k => { const a = kategoriAdi(k); sayac[a] = (sayac[a] || 0) + 1; });
  const sirali = Object.entries(sayac).sort((a, b) => b[1] - a[1]);
  $('cipler').innerHTML = [['Hepsi', veri().length], ...sirali]
    .map(([ad, n]) => `<button class="cip${ad === durum.kategori ? ' aktif' : ''}" data-kat="${esc(ad)}">${esc(ad)}<i>${n}</i></button>`)
    .join('');
}

function skillKart(k, i) {
  return `<li class="kart">
    <div class="sira">${i + 1}</div>
    <div>
      <div class="kart-ad"><b>${esc(k.ad)}</b><span>${esc(k.yapan)}</span></div>
      <p>${esc(k.aciklama)}</p>
      <div class="etiketler">
        <span class="etiket kat">${esc(k.kategori)}</span>
        <span class="etiket">${esc(k.alt)}</span>
        ${k.yildiz ? `<span class="etiket yildiz">★ ${kisalt(k.yildiz)}</span>` : ''}
        <span class="etiket">${esc(k.lisans)}</span>
      </div>
    </div>
    <div class="eylem">
      ${k.komut ? `<button class="birincil" data-kopyala="${esc(k.komut)}">Kurulum komutunu kopyala</button>` : ''}
      <a href="${esc(k.link)}" target="_blank" rel="noopener">GitHub'da aç ↗</a>
    </div>
  </li>`;
}

function sablonKart(k, i) {
  return `<li class="kart">
    <div class="sira">${i + 1}</div>
    <div>
      <div class="kart-ad"><b>${esc(k.ad)}</b></div>
      <p>${esc(k.aciklama)}</p>
      <div class="etiketler">
        <span class="etiket kat">${esc(k.raf)}</span>
        ${(k.servisler || []).map(s => `<span class="etiket">${esc(s)}</span>`).join('')}
      </div>
    </div>
    <div class="eylem">
      <a class="fc-cagri" href="${SKOOL}" target="_blank" rel="noopener">Türkçe sürümü kulüpte</a>
      ${k.kaynak ? `<a href="${esc(k.kaynak)}" target="_blank" rel="noopener">Orijinal kaynak ↗</a>` : ''}
    </div>
  </li>`;
}

function ciz() {
  const liste = veri().filter(eslesir);
  const kart = durum.sekme === 'skill' ? skillKart : sablonKart;
  $('kartlar').innerHTML = liste.map(kart).join('');
  $('bos').hidden = liste.length > 0;
}

document.querySelectorAll('.sekme').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.sekme').forEach(x => x.classList.toggle('aktif', x === b));
  durum.sekme = b.dataset.sekme;
  durum.kategori = 'Hepsi';
  cipleriCiz(); ciz();
}));

$('cipler').addEventListener('click', e => {
  const b = e.target.closest('.cip');
  if (!b) return;
  durum.kategori = b.dataset.kat;
  cipleriCiz(); ciz();
});

$('ara').addEventListener('input', e => { durum.arama = e.target.value.trim(); ciz(); });

let tostZaman;
function tost(metin) {
  $('tost').textContent = metin;
  $('tost').classList.add('goster');
  clearTimeout(tostZaman);
  tostZaman = setTimeout(() => $('tost').classList.remove('goster'), 1800);
}
$('kartlar').addEventListener('click', async e => {
  const b = e.target.closest('[data-kopyala]');
  if (!b) return;
  try {
    await navigator.clipboard.writeText(b.dataset.kopyala);
    tost('Kopyalandı: terminaline yapıştır');
  } catch {
    tost(b.dataset.kopyala);
  }
});

cipleriCiz();
ciz();
