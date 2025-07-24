async function loadKomikList() {
    const res = await fetch('data/komik.json');
    const data = await res.json();
    const container = document.getElementById('komik-list');
    if (!container) return;

    container.innerHTML = '';
    data.komik.forEach(k => {
        const item = document.createElement('div');
        item.className = 'komik-item';
        item.innerHTML = `
            <a href="komik.html?slug=${k.slug}">
                <img src="${k.cover}" alt="${k.title}">
                <p>${k.title}</p>
            </a>
        `;
        container.appendChild(item);
    });
}

async function loadChapter() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const res = await fetch('data/komik.json');
    const data = await res.json();
    const komik = data.komik.find(k => k.slug === slug);

    if (!komik) return;

    document.getElementById('komik-title').textContent = komik.title;

    let chapterIndex = parseInt(params.get('chapter') || 0);
    const chapter = komik.chapters[chapterIndex];
    const container = document.getElementById('chapter-pages');
    container.innerHTML = '';
    chapter.pages.forEach(p => {
        const img = document.createElement('img');
        img.src = p;
        container.appendChild(img);
    });

    // Navigasi
    const navTop = document.getElementById('chapter-nav-top');
    const navBottom = document.getElementById('chapter-nav-bottom');
    navTop.innerHTML = '';
    navBottom.innerHTML = '';

    if (chapterIndex > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '⬅ Chapter Sebelumnya';
        prevBtn.onclick = () => {
            window.location.href = `komik.html?slug=${slug}&chapter=${chapterIndex - 1}`;
        };
        navTop.appendChild(prevBtn);
        navBottom.appendChild(prevBtn.cloneNode(true));
    }

    if (chapterIndex < komik.chapters.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Chapter Berikutnya ➡';
        nextBtn.onclick = () => {
            window.location.href = `komik.html?slug=${slug}&chapter=${chapterIndex + 1}`;
        };
        navTop.appendChild(nextBtn);
        navBottom.appendChild(nextBtn.cloneNode(true));
    }
}

if (document.getElementById('komik-list')) loadKomikList();
if (document.getElementById('chapter-pages')) loadChapter();