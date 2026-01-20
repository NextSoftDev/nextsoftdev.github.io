function loadHomePage() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <h1>Добро пожаловать на сайт рецептов!</h1>
        <p>Здесь вы найдете различные рецепты и полезные материалы.</p>
        <div class="featured-recipes">
            <h2>Популярные рецепты</h2>
            <div class="recipes-grid" id="featuredRecipes">
            </div>
        </div>
    `;

    const topRecipes = [...recipes]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

    // Отображаем популярные рецепты
    const recipesGrid = document.getElementById('featuredRecipes');
    topRecipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="Название Рецепта" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px 5px 0 0;">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <button class="view-recipe" data-title="${index}">Посмотреть рецепт</button>
        `;
        recipesGrid.appendChild(recipeCard);
    });

    // Добавляем обработчики для кнопок "Посмотреть рецепт"
    document.querySelectorAll('.view-recipe').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-title');
            showRecipeDetails(index);
        });
    });
}

const recipes = [
    {
        title: "Спагетти Карбонара",
        description: "Классическое итальянское блюдо с яйцами, сыром и беконом.",
        ingredients: ["Спагетти", "Яйца", "Сыр Пармезан", "Бекон", "Соль", "Перец"],
        instructions: "1. Отварить спагетти. 2. Обжарить бекон. 3. Смешать яйца с сыром. 4. Соединить все ингредиенты.",
        image: "./images/spagetti.jpg",
        priority: 0
    },
    {
        title: "Борщ",
        description: "Традиционный суп с свеклой и мясом.",
        ingredients: ["Говядина", "Свекла", "Капуста", "Картофель", "Морковь", "Лук", "Томатная паста"],
        instructions: "1. Отварить мясо. 2. Обжарить овощи. 3. Добавить свеклу и томатную пасту. 4. Варить до готовности.",
        image: "./images/borsch.jpg",
        priority: 1
    },
    {
        title: "Цезарь с курицей",
        description: "Популярный салат с курицей, сухариками и соусом Цезарь.",
        ingredients: ["Куриная грудка", "Салат Романо", "Сухарики", "Сыр Пармезан", "Соус Цезарь"],
        instructions: "1. Обжарить курицу. 2. Нарезать салат и курицу. 3. Добавить сухарики и сыр. 4. Полить соусом.",
        image: "./images/cesar.jpg",
        priority: 2
    },
    {
        title: "Пицца Маргарита",
        description: "Классическая итальянская пицца с томатным соусом и моцареллой.",
        ingredients: ["Тесто для пиццы", "Томатный соус", "Моцарелла", "Базилик", "Оливковое масло"],
        instructions: "1. Раскатать тесто. 2. Нанести соус. 3. Посыпать сыром. 4. Запекать 15 минут при 220°C.",
        image: "./images/margarita.jpg",
        priority: 3
    },
    {
        title: "Тирамису",
        description: "Итальянский десерт с кофе, маскарпоне и печеньем Савоярди.",
        ingredients: ["Печенье Савоярди", "Маскарпоне", "Яйца", "Сахар", "Кофе", "Какао"],
        instructions: "1. Смешать маскарпоне с яйцами и сахаром. 2. Пропитать печенье кофе. 3. Собрать слои. 4. Посыпать какао.",
        image: "./images/tiramisu.jpg",
        priority: 4
    }
];

function showRecipeDetails(index) {
    const recipe = recipes[index]
    const contentElement = document.getElementById('content');

    contentElement.innerHTML = `
        <div class="recipe-details">
            <button id="backToHome">← Назад</button>
            <h2>${recipe.title}</h2>
            <img src=${recipe.image} alt="Название Рецепта" style="width: 100%; max-width: 500px; height: 300px; object-fit: cover; border-radius: 5px; margin: 1rem 0;">
            <div class="recipe-placeholder-large"></div>
            <p>${recipe.description}</p>
            <h3>Ингредиенты:</h3>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Инструкции:</h3>
            <p>${recipe.instructions}</p>
        </div>
    `;

    document.getElementById('backToHome').addEventListener('click', () => {
        loadHomePage();
    });
}