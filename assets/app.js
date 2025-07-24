async function loadKomik() {
    const res = await fetch('data/komik.json');
    const data = await res.json();

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const chapterNumber = parseInt(urlParams.get('chapter'));

    if (document.getElementById('komik-list')) {
        const list = document.getElementById('komik-list');
        data.komik.forEach(k => {
            const card = document.createElement('div');
            card.className = 'komik-card';
            card.innerHTML = `
                <a href="detail.html?slug=${k.slug}">
                    <img src="${k.cover}" alt="${k.title}">
                    <h3>${k.title}</h3>
                </a>
            `;
            list.appendChild(card);
        });
    }

    if (document.getElementById('chapter-list')) {
        const komik = data.komik.find(k => k.slug === slug);
        document.getElementById('komik-title').textContent = komik.title;
        document.getElementById('komik-title-detail').textContent = komik.title;
        document.getElementById('komik-cover').src = komik.cover;

        const chapterList = document.getElementById('chapter-list');
        komik.chapters.forEach(ch => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="baca.html?slug=${slug}&chapter=${ch.number}">Chapter ${ch.number}</a>`;
            chapterList.appendChild(li);
        });
    }

    if (document.getElementById('chapter-pages')) {
        const komik = data.komik.find(k => k.slug === slug);
        const chapter = komik.chapters.find(c => c.number === chapterNumber);
        document.getElementById('chapter-title').textContent = `${komik.title} - Chapter ${chapterNumber}`;
        const container = document.getElementById('chapter-pages');
        chapter.pages.forEach(img => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            container.appendChild(imgEl);
        });

        document.getElementById('prev-chapter').onclick = () => {
            if (chapterNumber > 1) {
                window.location.href = `baca.html?slug=${slug}&chapter=${chapterNumber - 1}`;
            }
        };
        document.getElementById('next-chapter').onclick = () => {
            if (chapterNumber < komik.chapters.length) {
                window.location.href = `baca.html?slug=${slug}&chapter=${chapterNumber + 1}`;
            }
        };
        document.getElementById('back-to-detail').href = `detail.html?slug=${slug}`;
    }
}

loadKomik();