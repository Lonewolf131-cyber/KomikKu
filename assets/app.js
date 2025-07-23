async function getData() {
    const res = await fetch('data/komik.json');
    return await res.json();
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadKomikList() {
    const data = await getData();
    const container = document.getElementById('komik-list');
    data.komik.forEach(k => {
        container.innerHTML += `
        <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition">
            <a href="komik.html?slug=${k.slug}">
                <img src="${k.cover}" alt="${k.title}" class="w-full h-48 object-cover">
                <div class="p-4 text-center font-bold">${k.title}</div>
            </a>
        </div>`;
    });
}

async function loadKomikDetail() {
    const slug = getQueryParam('slug');
    const data = await getData();
    const komik = data.komik.find(k => k.slug === slug);
    if (!komik) return;
    document.getElementById('komik-title').innerText = komik.title;
    const container = document.getElementById('komik-detail');
    container.innerHTML = `
        <img src="${komik.cover}" class="w-48 mx-auto rounded mb-6">
        <h2 class="text-xl font-bold mb-4">Daftar Chapter</h2>
        <ul>
            ${komik.chapters.map(ch => `
                <li class="mb-2">
                    <a href="baca.html?slug=${komik.slug}&chapter=${ch.number}" class="text-indigo-400 hover:underline">
                        Chapter ${ch.number}
                    </a>
                </li>`).join('')}
        </ul>`;
}

async function loadChapter() {
    const slug = getQueryParam('slug');
    const chapterNumber = parseInt(getQueryParam('chapter'));
    const data = await getData();
    const komik = data.komik.find(k => k.slug === slug);
    if (!komik) return;
    const chapter = komik.chapters.find(ch => ch.number === chapterNumber);
    if (!chapter) return;
    document.getElementById('chapter-title').innerText = `${komik.title} - Chapter ${chapterNumber}`;
    const container = document.getElementById('chapter-pages');
    chapter.pages.forEach(page => {
        container.innerHTML += `<img src="${page}" class="w-full mb-4">`;
    });
}
