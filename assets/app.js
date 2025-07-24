fetch('data/komik.json')
.then(res => res.json())
.then(data => {
    const komikList = document.getElementById('komik-list');
    const searchInput = document.getElementById('search');

    function renderKomik(filter = '') {
        komikList.innerHTML = '';
        data.filter(k => k.title.toLowerCase().includes(filter.toLowerCase()))
            .forEach(k => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <a href="komik.html?slug=${k.slug}">
                        <img src="${k.cover}" onerror="this.src='assets/no-cover.jpg'" alt="${k.title}">
                        <h3>${k.title}</h3>
                    </a>`;
                komikList.appendChild(card);
            });
    }

    renderKomik();

    searchInput.addEventListener('input', e => {
        renderKomik(e.target.value);
    });
});