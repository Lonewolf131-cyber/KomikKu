const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  fetch('data/komik.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('komik-list');
      data.komik.forEach(k => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <a href="komik.html?slug=${k.slug}">
            <img src="${k.cover}" alt="${k.title}">
            <div>${k.title}</div>
          </a>
        `;
        list.appendChild(card);
      });
    });
}

if (window.location.pathname.includes("komik.html") && slug) {
  fetch('data/komik.json')
    .then(res => res.json())
    .then(data => {
      const komik = data.komik.find(k => k.slug === slug);
      const view = document.getElementById('komik-view');
      komik.chapters.forEach(ch => {
        ch.pages.forEach(img => {
          const imgTag = document.createElement('img');
          imgTag.src = img;
          view.appendChild(imgTag);
        });
      });
    });
}