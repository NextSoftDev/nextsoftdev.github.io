function loadTestPage() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <h1>Тест по веб-программированию</h1>

        <form id="testForm" class="test-form">
            <div class="test-columns">

                <div class="question">
                    <p>1. Что такое HTML?</p>
                    <label><input type="radio" name="q1" value="a"> Язык программирования</label>
                    <label><input type="radio" name="q1" value="b"> Язык разметки</label>
                    <label><input type="radio" name="q1" value="c"> База данных</label>
                </div>

                <div class="question">
                    <p>2. Выберите языки веб-разработки:</p>
                    <label><input type="checkbox" name="q2" value="html"> HTML</label>
                    <label><input type="checkbox" name="q2" value="css"> CSS</label>
                    <label><input type="checkbox" name="q2" value="python"> Python</label>
                </div>

                <div class="question">
                    <p>3. Какой тег используется для ссылок?</p>
                    <select name="q3">
                        <option value="">-- Выберите --</option>
                        <option value="div">&lt;div&gt;</option>
                        <option value="a">&lt;a&gt;</option>
                        <option value="p">&lt;p&gt;</option>
                    </select>
                </div>

                <div class="question">
                    <p>4. Введите атрибут ссылки:</p>
                    <input type="text" name="q4">
                </div>

                <div class="question">
                    <p>5. Какой тег вставляет изображение?</p>
                    <label><input type="radio" name="q5" value="img"> &lt;img&gt;</label>
                    <label><input type="radio" name="q5" value="picture"> &lt;picture&gt;</label>
                </div>

                <div class="question">
                    <p>6. Как называется язык стилей для оформления веб-страниц?</p>
                    <input type="text" name="q6" placeholder="Введите ответ">
                </div>

            </div>

            <button type="submit">Проверить</button>
        </form>

        <div id="testResults" hidden>
            <h2>Результаты</h2>
            <p id="correctAnswers"></p>
        </div>
    `;

    initTest();
}

function initTest() {
    document.getElementById('testForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let correct = 0;

        /* Вопрос 1 */
        const q1 = document.querySelector('input[name="q1"]:checked');
        if (q1 && q1.value === 'b') correct++;

        /* Вопрос 2 */
        const q2 = Array.from(document.querySelectorAll('input[name="q2"]:checked'))
            .map(el => el.value)
            .sort()
            .join(',');

        if (q2 === 'css,html') correct++;

        /* Вопрос 3  */
        const q3 = document.querySelector('select[name="q3"]').value;
        if (q3 === 'a') correct++;

        /* Вопрос 4 */
        const q4 = document.querySelector('input[name="q4"]').value.trim().toLowerCase();
        if (q4 === 'href') correct++;

        /* Вопрос 5 */
        const q5 = document.querySelector('input[name="q5"]:checked');
        if (q5 && q5.value === 'img') correct++;

        /* Вопрос 6 */
        const q6 = document.querySelector('input[name="q6"]').value
            .trim()
            .toLowerCase();

        if (q6 === 'css') correct++;


        /* Вывод результата */
        const resultsDiv = document.getElementById('testResults');
        document.getElementById('correctAnswers').textContent =
            `Правильных ответов: ${correct} из 6`;

        resultsDiv.hidden = false;
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
}
