function loadParticipantsPage() {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `
        <h1>Список участников</h1>
        <table id="participantsTable">
            <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Секция</th>
                    <th>Дата рождения</th>
                    <th>Доклад</th>
                </tr>
            </thead>
            <tbody id="participantsList">
                <!-- Данные будут добавлены здесь -->
            </tbody>
        </table>
    `;

    loadParticipants();
}

function loadParticipants() {
    const participantsList = document.getElementById('participantsList');
    const participants = JSON.parse(localStorage.getItem('participants')) || [];

    participantsList.innerHTML = '';

    if (participants.length === 0) {
        participantsList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">Нет зарегистрированных участников</td>
            </tr>
        `;
        return;
    }

    participants.forEach(participant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant.fullName}</td>
            <td>${participant.phone}</td>
            <td>${participant.email}</td>
            <td>${getSectionName(participant.section)}</td>
            <td>${participant.birthDate || '-'}</td>
            <td>${participant.hasReport ? participant.reportTopic : '-'}</td>
        `;
        participantsList.appendChild(row);
    });
}

function getSectionName(sectionValue) {
    const sections = {
        'math': 'Математика',
        'physics': 'Физика',
        'informatics': 'Информатика'
    };
    return sections[sectionValue] || sectionValue;
}