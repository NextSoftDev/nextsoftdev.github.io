function loadRegistrationPage() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <h1>Регистрация участников</h1>
        <form id="registrationForm">
            <label for="fullName">ФИО:</label>
            <input type="text" id="fullName" name="fullName" required>

            <label for="phone">Контактный телефон:</label>
            <input type="text" id="phone" name="phone" required>

            <label for="email">Адрес электронной почты:</label>
            <input type="email" id="email" name="email" required>

            <label for="section">Секция конференции:</label>
            <select id="section" name="section" required>
                <option value="math">Математика</option>
                <option value="physics">Физика</option>
                <option value="informatics">Информатика</option>
            </select>

            <label for="birthDate">Дата рождения:</label>
            <input type="date" id="birthDate" name="birthDate">

            <label for="hasReport">Есть доклад:</label>
            <input type="checkbox" id="hasReport" name="hasReport">

            <div id="reportTopicContainer" style="display: none;">
                <label for="reportTopic">Тема доклада:</label>
                <input type="text" id="reportTopic" name="reportTopic">
            </div>

            <button type="submit">Отправить</button>
        </form>
    `;

    // Инициализация формы
    initRegistrationForm();
}

function initRegistrationForm() {
    document.getElementById('hasReport').addEventListener('change', function() {
        const reportTopicContainer = document.getElementById('reportTopicContainer');
        reportTopicContainer.style.display = this.checked ? 'block' : 'none';
    });

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const section = document.getElementById('section').value;
        const birthDate = document.getElementById('birthDate').value;
        const hasReport = document.getElementById('hasReport').checked;
        const reportTopic = hasReport ? document.getElementById('reportTopic').value.trim() : '';

        // Валидация ФИО
        const nameRegex = /^[а-яА-Я\s]+$/;
        if (!nameRegex.test(fullName)) {
            showError('fullName', 'ФИО должно содержать только буквы русского алфавита.');
            return;
        }

        // Валидация телефона
        const phoneRegex = /^\+7\d{10}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'Телефон должен начинаться с +7 и содержать 11 символов.');
            return;
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Укажите корректный адрес электронной почты.');
            return;
        }

        // Валидация темы доклада
        if (hasReport && !reportTopic) {
            showError('reportTopic', 'Укажите тему доклада.');
            return;
        }

        // Сохранение данных в localStorage
        const participant = {
            fullName,
            phone,
            email,
            section,
            birthDate,
            hasReport,
            reportTopic
        };

        let participants = JSON.parse(localStorage.getItem('participants')) || [];
        participants.push(participant);
        localStorage.setItem('participants', JSON.stringify(participants));

        showSuccess('Регистрация успешна!');
        document.getElementById('registrationForm').reset();
        document.getElementById('reportTopicContainer').style.display = 'none';
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#ff4444';

    let errorElement = document.querySelector(`.error-message[data-field="${fieldId}"]`);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.setAttribute('data-field', fieldId);
        errorElement.style.color = '#ff4444';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.2rem';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message;

    field.addEventListener('input', function() {
        field.style.borderColor = '#ccc';
        if (errorElement) {
            errorElement.remove();
        }
    }, { once: true });
}

function showSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.backgroundColor = '#4CAF50';
    successElement.style.color = 'white';
    successElement.style.padding = '1rem';
    successElement.style.borderRadius = '5px';
    successElement.style.marginTop = '1rem';
    successElement.style.textAlign = 'center';

    const form = document.getElementById('registrationForm');
    form.insertBefore(successElement, form.firstChild);

    setTimeout(() => {
        successElement.remove();
    }, 3000);
}