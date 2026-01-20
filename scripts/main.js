// Функция для отображения прелоадера
function showLoader() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <p>Загрузка...</p>
        </div>
    `;
}

// Функция для загрузки контента
function loadContent(page) {
    showLoader();

    // Очищаем предыдущие обработчики событий
    cleanupEventListeners();

    // Загружаем контент для выбранной страницы
    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'recipes':
            loadRecipesPage();
            break;
        case 'registration':
            loadRegistrationPage();
            break;
        case 'participants':
            loadParticipantsPage();
            break;
        case 'gallery':
            loadGalleryPage();
            break;
        case 'test':
            loadTestPage();
            break;
        default:
            loadHomePage();
    }
}

// Функция для очистки обработчиков событий
function cleanupEventListeners() {
    // Удаляем все обработчики событий для кнопок
    const oldButtons = document.querySelectorAll('button');
    oldButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    // Удаляем все обработчики событий для форм
    const oldForms = document.querySelectorAll('form');
    oldForms.forEach(form => {
        form.replaceWith(form.cloneNode(true));
    });
}

// Обработка навигации
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('data-page');
        loadContent(page);
        history.pushState({ page }, '', `#${page}`);
    });
});

// Загрузка контента при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    loadContent(hash || 'home');
});

// Обработка кнопки "Назад" в браузере
window.addEventListener('popstate', (event) => {
    if (event.state) {
        loadContent(event.state.page);
    } else {
        loadContent('home');
    }
});