const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Dates to highlight (format: 'MM-DD' for recurring, 'YYYY-MM-DD' for specific)
const highlightedDates = [
    '01-01',  // New Year's Day
    '01-07',  // Anniversary
    '01-12',  // Evan Birthday
    '01-14',  // Abigail's Birthday
    '02-14',  // Valentine's Day
    '2025-07-07',  // Specific Holiday
    '2025-07-08',  
    '2025-07-09',
    '2025-07-10',
    '12-25'   // Christmas
];

// Render the calendar
function renderCalendar() {
    daysContainer.innerHTML = '';
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    let prevLastDate = new Date(currentYear, currentMonth, 0).getDate();
    
    monthYear.innerText = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

    // Fill previous month's days (optional)
    for (let x = firstDay - 1; x >= 0; x--) {
        let day = document.createElement('div');
        day.classList.add('prev-date');
        day.innerText = prevLastDate - x;
        daysContainer.appendChild(day);
    }

    // Fill current month's days
    for (let i = 1; i <= lastDate; i++) {
        let day = document.createElement('div');
        day.innerText = i;
        
        let dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        let monthDayString = dateString.slice(5);  // Get 'MM-DD'

        // Highlight today's date
        if (
            i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            day.classList.add('today');
        }

        // Highlight recurring and specific dates
        if (highlightedDates.includes(monthDayString) || highlightedDates.includes(dateString)) {
            day.classList.add('highlight');
        }

        daysContainer.appendChild(day);
    }
}

// Navigation
prevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Initial render
renderCalendar();
