// ============================================================
//  Projects carousel + detail modal
//  Single source of truth: PROJECTS array
// ============================================================
(function () {
    const PROJECTS = [
        {
            name: "Alta Lead", tag: "AI SaaS", year: "2026", status: "aktif",
            logo: "alta-lead-logo-white.png",
            media: { type: "img", src: "alta-lead-preview.png" },
            desc: "Türkiye'nin yerli AI satış asistanı SaaS'ı. KOBİ web sitelerine entegre olur, 7/24 ziyaretçileri karşılar, sorularını yanıtlar, sıcak müşteri adaylarını yakalayıp anında bildirir. Türkçe, KVKK uyumlu, PayTR ve WhatsApp entegrasyonlu.",
            links: [{ label: "alta-lead.vercel.app", url: "https://alta-lead.vercel.app", type: "web" }]
        },
        {
            name: "suzgec.ai", tag: "AI Startup", year: "2026", status: "aktif",
            logo: "suzgec-logo-new.png",
            media: { type: "img", src: "suzgec-preview-new.png" },
            desc: "Öğrenciler için Yapay Zeka ile YouTube videolarını, PDF dökümanlarını ve ses dosyalarını özetleyen; çalışma notlarına, sınav sorularına dönüştüren ve çok daha fazlasına sahip bir web sitesi.",
            note: "Çok yakında App Store'da",
            links: [
                { label: "suzgec.ai", url: "https://www.suzgecai.com/", type: "web" },
                { label: "@suzgecai", url: "https://www.instagram.com/suzgec.ai/", type: "ig" }
            ]
        },
        {
            name: "VidKing AI", tag: "AI Video", year: "2026", status: "satildi",
            logo: "vidkingai-logo.png",
            media: { type: "img", src: "vidkingai-preview.png" },
            desc: "Viral içerikleri, kendi tarzında yeniden üret. YouTube linkini yapıştır; VidKing AI videonun transkriptini analiz eder, ana fikirleri çıkarır ve senin kanalına özel, orijinal varyasyonlar üretir. Alternatif açılışlar, farklı açılar, taze örnekler — hepsi senin tonunda.",
            links: [{ label: "vidkingai.com", url: "https://vidkingai.com", type: "web" }]
        },
        {
            name: "Walking.art", tag: "Video Content", year: "2026", status: "aktif",
            logo: "walogo2.jpeg",
            media: { type: "img", src: "wa-icerik.jpeg" },
            desc: "Yapay zekâ yardımıyla flört cümleleri üreterek size yardım eden küçük bir web uygulaması.",
            note: "60 dakikada yapıldı",
            links: [{ label: "walking-art.vercel.app", url: "https://walking-art.vercel.app", type: "web" }]
        },
        {
            name: "NRC.ai", tag: "AI Startup", year: "2026", status: "aktif",
            logo: "nrc.png",
            media: { type: "img", src: "nrcss.png" },
            desc: "YouTube içerik üreticileri için yapay zeka ile videoları detaylı analiz eder, stratejik içgörüler oluşturur; etkileşim, duygu analizi ve SEO önerilerini bir rapor halinde hazırlar.",
            links: [{ label: "nrc.ai", url: "https://www.nrcai.com.tr/", type: "web" }]
        },
        {
            name: "D2P", tag: "Giyim Markası", year: "2025", status: "aktif",
            logo: "unnamed (1).jpg",
            media: { type: "video", src: "3d.mp4" },
            desc: "Streetwear tasarımlarımızla bizim gibi harekete geçmekten çekinmeyen, milyoner olmak isteyen, risk alan ve sistemi sorgulayanlar için üretilmiştir.",
            links: [
                { label: "diffpovwear.vercel.app", url: "https://diffpovwear.vercel.app/", type: "web" },
                { label: "@diff2pov", url: "https://www.instagram.com/diff2pov/", type: "ig" }
            ]
        }
    ];

    const STATUS = {
        aktif: { label: "CANLI", cls: "proj-badge-aktif", type: "dot" },
        satildi: { label: "SATILDI", cls: "proj-badge-satildi", type: "check" }
    };

    function buildBadge(status) {
        const m = STATUS[status] || STATUS.aktif;
        const badge = document.createElement("span");
        badge.className = "proj-badge " + m.cls;
        if (m.type === "dot") {
            const d = document.createElement("span");
            d.className = "live-dot";
            badge.appendChild(d);
        } else if (m.type === "check") {
            const i = document.createElement("i");
            i.setAttribute("data-lucide", "check");
            badge.appendChild(i);
        }
        badge.appendChild(document.createTextNode(m.label));
        return badge;
    }

    function buildMedia(media) {
        let el;
        if (media.type === "video") {
            el = document.createElement("video");
            el.src = media.src;
            el.autoplay = true; el.loop = true; el.muted = true;
            el.playsInline = true; el.setAttribute("playsinline", "");
        } else {
            el = document.createElement("img");
            el.src = media.src;
            el.alt = "";
        }
        return el;
    }

    const track = document.getElementById("proj-track");
    if (!track) return;

    // Build cards
    PROJECTS.forEach((p, i) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "proj-card";
        card.style.animationDelay = (i * 0.06) + "s";

        const mediaWrap = document.createElement("div");
        mediaWrap.className = "proj-card-media";
        mediaWrap.appendChild(buildMedia(p.media));
        mediaWrap.appendChild(buildBadge(p.status));

        const info = document.createElement("div");
        info.className = "proj-card-info";
        const logo = document.createElement("img");
        logo.className = "proj-card-logo";
        logo.src = p.logo;
        logo.alt = p.name;
        const textWrap = document.createElement("span");
        textWrap.className = "proj-card-text";
        const nm = document.createElement("span");
        nm.className = "proj-card-name";
        nm.textContent = p.name;
        const tg = document.createElement("span");
        tg.className = "proj-card-tag";
        tg.textContent = p.tag;
        textWrap.appendChild(nm);
        textWrap.appendChild(tg);
        info.appendChild(logo);
        info.appendChild(textWrap);

        card.appendChild(mediaWrap);
        card.appendChild(info);
        card.addEventListener("click", () => openModal(i));
        track.appendChild(card);
    });

    // ---- Modal ----
    const modal = document.getElementById("proj-modal");
    const pmMedia = document.getElementById("pm-media");
    const pmLogo = document.getElementById("pm-logo");
    const pmName = document.getElementById("pm-name");
    const pmTag = document.getElementById("pm-tag");
    const pmYear = document.getElementById("pm-year");
    const pmStatus = document.getElementById("pm-status");
    const pmDesc = document.getElementById("pm-desc");
    const pmLinks = document.getElementById("pm-links");

    function openModal(i) {
        const p = PROJECTS[i];

        pmMedia.innerHTML = "";
        pmMedia.appendChild(buildMedia(p.media));

        pmLogo.src = p.logo;
        pmLogo.alt = p.name;
        pmName.textContent = p.name;
        pmTag.textContent = p.tag;
        pmYear.textContent = p.year;

        pmStatus.innerHTML = "";
        pmStatus.appendChild(buildBadge(p.status));

        pmDesc.textContent = p.desc;
        if (p.note) {
            const note = document.createElement("span");
            note.className = "proj-modal-note";
            note.textContent = p.note;
            pmDesc.appendChild(note);
        }

        pmLinks.innerHTML = "";
        p.links.forEach(l => {
            const a = document.createElement("a");
            a.className = "proj-modal-link";
            a.href = l.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.appendChild(document.createTextNode(l.label + " "));
            if (l.type === "ig") {
                const img = document.createElement("img");
                img.src = "ig-icon.svg";
                img.alt = "ig";
                a.appendChild(img);
            } else {
                const ic = document.createElement("i");
                ic.setAttribute("data-lucide", "external-link");
                a.appendChild(ic);
            }
            pmLinks.appendChild(a);
        });

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        if (window.lucide) lucide.createIcons();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        // stop any playing video and clear
        setTimeout(() => { pmMedia.innerHTML = ""; }, 300);
    }

    modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });

    // ---- Arrows ----
    function step(dir) {
        const card = track.querySelector(".proj-card");
        if (!card) return;
        const amount = card.getBoundingClientRect().width + 14;
        track.scrollBy({ left: amount * dir, behavior: "smooth" });
    }
    const prev = document.querySelector(".proj-arrow-prev");
    const next = document.querySelector(".proj-arrow-next");
    if (prev) prev.addEventListener("click", () => step(-1));
    if (next) next.addEventListener("click", () => step(1));

    if (window.lucide) lucide.createIcons();
})();
