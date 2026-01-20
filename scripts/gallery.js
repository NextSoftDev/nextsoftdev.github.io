function getRandomIds(count, max = 500) {
    const ids = new Set();
    while (ids.size < count) {
        ids.add(Math.floor(Math.random() * max) + 1);
    }
    return Array.from(ids);
}

function loadGalleryPage() {
    const contentElement = document.getElementById('content');

    const row1Ids = getRandomIds(5);
    const row2Ids = getRandomIds(5);
    const row3Ids = getRandomIds(5);

    const createRow = (ids) => {
        // дублируем картинки для бесконечного скролла
        const images = ids.concat(ids); 
        return `
        <div class="gallery-track">
            ${images.map(id => `<img src="https://picsum.photos/id/${id}/300" alt="Image ${id}">`).join('')}
        </div>
        `;
    };

    contentElement.innerHTML = `
        <h1>Фотогалерея</h1>
        <div class="gallery">
            ${createRow(row1Ids)}
            ${createRow(row2Ids)}
            ${createRow(row3Ids)}
        </div>
    `;
}