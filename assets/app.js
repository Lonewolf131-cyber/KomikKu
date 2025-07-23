// Ambil data JSON
async function getData() {
    const res = await fetch('data/komik.json');
    return await res.json();
}

// Ambil parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load daftar komik di index.html
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

// Load detail komik (daftar chapter) di komik.html
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

// Load halaman baca chapter di baca.html
async function loadChapter() {
    const slug = getQueryParam('slug');
    const chapterNumber = parseInt(getQueryParam('chapter'));

    const data = await getData();
    const komik = data.komik.find(k => k.slug === slug);
    if (!komik) return;

    const chapter = komik.chapters.find(ch => ch.number === chapterNumber);
    if (!chapter) return;

    // Judul halaman
    document.getElementById('chapter-title').innerText = `${komik.title} - Chapter ${chapterNumber}`;

    const container = document.getElementById('chapter-pages');

    // Navigasi atas
    container.innerHTML += createNavButtons(komik, slug, chapterNumber);

    // Tampilkan semua gambar chapter
    chapter.pages.forEach(page => {
        container.innerHTML += `<img src="${page}" class="w-full mb-4">`;
    });

    // Navigasi bawah
    container.innerHTML += createNavButtons(komik, slug, chapterNumber);
}

// Fungsi buat tombol navigasi
function createNavButtons(komik, slug, chapterNumber) {
    const prevChapter = komik.chapters.find(ch => ch.number === chapterNumber - 1);
    const nextChapter = komik.chapters.find(ch => ch.number === chapterNumber + 1);

    return `
        <div class="flex justify-between mt-6 mb-6">
            ${prevChapter ? `<a href="baca.html?slug=${slug}&chapter=${chapterNumber - 1}" class="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">← Chapter ${chapterNumber - 1}</a>` : `<span></span>`}
            ${nextChapter ? `<a href="baca.html?slug=${slug}&chapter=${chapterNumber + 1}" class="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Chapter ${chapterNumber + 1} →</a>` : ``}
        </div>
    `;
}