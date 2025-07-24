const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

fetch('data/komik.json')
.then(res => res.json())
.then(data => {
    if (slug) {
        loadKomikDetail(data, slug);
    } else {
        loadKomikList(data);
    }
});

function loadKomikList(data) {
    const container = document.getElementById("komik-list");
    const searchBox = document.getElementById("searchBox");

    function renderList(filter = "") {
        container.innerHTML = "";
        data.filter(k => k.title.toLowerCase().includes(filter.toLowerCase()))
            .forEach(k => {
                const div = document.createElement("div");
                div.className = "komik-card";
                div.innerHTML = `
                    <a href="komik.html?slug=${k.slug}">
                        <img src="img/${k.slug}/cover.jpg" alt="${k.title}">
                        <h3>${k.title}</h3>
                    </a>
                `;
                container.appendChild(div);
            });
    }

    renderList();
    searchBox.addEventListener("input", e => renderList(e.target.value));
}

function loadKomikDetail(data, slug) {
    const komik = data.find(k => k.slug === slug);
    if (!komik) {
        document.body.innerHTML = "<h2>Komik tidak ditemukan!</h2>";
        return;
    }

    document.getElementById("komik-title").textContent = komik.title;

    const container = document.getElementById("chapter-container");

    komik.chapters.forEach((ch, i) => {
        const section = document.createElement("section");
        section.innerHTML = `<h2>${ch.title}</h2>`;
        ch.pages.forEach(p => {
            const img = document.createElement("img");
            img.src = `img/${komik.slug}/${p}`;
            img.style.width = "100%";
            section.appendChild(img);
        });
        container.appendChild(section);
    });

    addNavButtons(komik);
}

function addNavButtons(komik) {
    const navTop = document.getElementById("chapter-nav-top");
    const navBottom = document.getElementById("chapter-nav-bottom");

    komik.chapters.forEach((ch, index) => {
        const btnTop = document.createElement("button");
        btnTop.textContent = ch.title;
        btnTop.onclick = () => scrollToChapter(index);
        navTop.appendChild(btnTop);

        const btnBottom = btnTop.cloneNode(true);
        btnBottom.onclick = () => scrollToChapter(index);
        navBottom.appendChild(btnBottom);
    });
}

function scrollToChapter(index) {
    const sections = document.querySelectorAll("section");
    sections[index].scrollIntoView({ behavior: "smooth" });
}