function loadRecipesPage() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <h1>Рецепты</h1>
        <div class="recipes-search">
            <input type="text" id="recipeSearch" placeholder="Поиск по рецептам...">
        </div>
        <div id="recipesList" class="recipes-grid"></div>
    `;

    const recipesList = document.getElementById('recipesList');
    const searchInput = document.getElementById('recipeSearch');

    function renderRecipes(filteredRecipes) {
        recipesList.innerHTML = '';
        filteredRecipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe-card';
            recipeElement.innerHTML = `
                <img src="${recipe.image}" alt="Название Рецепта" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px 5px 0 0;">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <button class="view-recipe" data-title="${recipe.title}">Посмотреть рецепт</button>
            `;
            recipesList.appendChild(recipeElement);
        });

        // Добавляем обработчики для кнопок "Посмотреть рецепт"
        document.querySelectorAll('.view-recipe').forEach(button => {
            button.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                showRecipeDetails(title, recipes);
            });
        });
    }

    function showRecipeDetails(title, recipes) {
        const recipe = recipes.find(r => r.title === title);
        contentElement.innerHTML = `
            <div class="recipe-details">
                <button id="backToRecipes">← Назад к рецептам</button>
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="Название Рецепта" style="width: 100%; max-width: 500px; height: 300px; object-fit: cover; border-radius: 5px; margin: 1rem 0;">
                <p>${recipe.description}</p>
                <h3>Ингредиенты:</h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <h3>Инструкции:</h3>
                <p>${recipe.instructions}</p>
            </div>
        `;

        document.getElementById('backToRecipes').addEventListener('click', () => {
            loadRecipesPage();
        });
    }

    renderRecipes(recipes);

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
        );
        renderRecipes(filteredRecipes);
    });
}