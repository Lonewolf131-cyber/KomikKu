// Ambil data JSON
async function getData() {
    const res = await fetch('data/komik.json');
    return await res.json();
}

async function loadKomikList() {
    const data = await getData();
    const komikList = document.getElementById('komik-list');
    const searchInput = document.getElementById('search');

    // Fungsi render daftar komik
    function renderKomik(list) {
        komikList.innerHTML = '';
        if (list.length === 0) {
            komikList.innerHTML = `<p class="text-center text-gray-400 col-span-4">Komik tidak ditemukan</p>`;
            return;
        }

        list.forEach(k => {
            komikList.innerHTML += `
            <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition">
                <a href="komik.html?slug=${k.slug}">
                    <img src="${k.cover}" alt="${k.title}" class="w-full h-48 object-cover">
                    <div class="p-4 text-center font-bold">${k.title}</div>
                </a>
            </div>`;
        });
    }

    // Render awal semua komik
    renderKomik(data.komik);

    // Event pencarian (real-time filter)
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase();
        const filtered = data.komik.filter(k => k.title.toLowerCase().includes(keyword));
        renderKomik(filtered);
    });
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadKomikList);