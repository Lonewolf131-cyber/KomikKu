document.addEventListener("DOMContentLoaded", () => {
    const komikList = document.getElementById("komik-list");
    const searchInput = document.getElementById("search");
    const chapterContainer = document.getElementById("chapter-pages");
    const navContainer = document.getElementById("chapter-nav");

    // Ambil data dari komik.json
    fetch("data/komik.json")
        .then(response => response.json())
        .then(data => {
            renderKomikList(data);

            // Event pencarian
            if (searchInput) {
                searchInput.addEventListener("input", () => {
                    const keyword = searchInput.value.toLowerCase();
                    const filtered = data.filter(k => k.title.toLowerCase().includes(keyword));
                    renderKomikList(filtered);
                });
            }

            // Jika halaman komik.html
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("slug");
            const chapterIndex = parseInt(params.get("chapter")) || 0;

            if (slug && chapterContainer) {
                loadChapter(data, slug, chapterIndex);
            }
        });

    function renderKomikList(komikData) {
        if (!komikList) return;
        komikList.innerHTML = "";
        komikData.forEach(komik => {
            const card = document.createElement("div");
            card.className = "komik-card";
            card.innerHTML = `
                <a href="komik.html?slug=${komik.slug}">
                    <img src="${komik.cover}" alt="${komik.title}">
                    <h3>${komik.title}</h3>
                </a>
            `;
            komikList.appendChild(card);
        });
    }

    function loadChapter(data, slug, chapterIndex) {
        const komik = data.find(k => k.slug === slug);
        const chapter = komik.chapters[chapterIndex];

        // Tampilkan judul
        document.getElementById("chapter-title").textContent = `${komik.title} - ${chapter.title}`;

        // Render gambar halaman
        chapterContainer.innerHTML = "";
        chapter.pages.forEach(page => {
            const img = document.createElement("img");
            img.src = page; // ✅ FIX: Langsung pakai path dari JSON
            img.alt = "Page";
            img.style.width = "100%";
            img.style.marginBottom = "10px";
            chapterContainer.appendChild(img);
        });

        // Navigasi chapter
        navContainer.innerHTML = "";
        if (chapterIndex > 0) {
            const prevBtn = document.createElement("a");
            prevBtn.href = `komik.html?slug=${slug}&chapter=${chapterIndex - 1}`;
            prevBtn.textContent = "⬅ Prev Chapter";
            prevBtn.className = "btn-nav";
            navContainer.appendChild(prevBtn);
        }

        if (chapterIndex < komik.chapters.length - 1) {
            const nextBtn = document.createElement("a");
            nextBtn.href = `komik.html?slug=${slug}&chapter=${chapterIndex + 1}`;
            nextBtn.textContent = "Next Chapter ➡";
            nextBtn.className = "btn-nav";
            navContainer.appendChild(nextBtn);
        }
    }
});