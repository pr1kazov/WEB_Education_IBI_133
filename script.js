document.addEventListener('DOMContentLoaded', () => {

    //ЗАДАНИЕ 1 переключение темы
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    //проверяем сохранённую тему в localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        //сохраняем выбор
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    // ЗАДАНИЕ 2 слайдер
    const images = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function showSlide(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(currentIndex);
        });
    });

    // прокрутка слайдера каждые 4 секунды
    setInterval(nextSlide, 4000);
    
    // ЗАДАНИЕ 4 таймер до релиза нового iPad
    const releaseDate = new Date('2026-10-10T15:56:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = releaseDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p>Новый iPad уже вышел!</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // ЗАДАНИЕ 5 плавная прокрутка вверх
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ЗАДАНИЕ 6 голосование и динамическая диаграмма
    // Начальные данные голосов
    let votes = JSON.parse(localStorage.getItem('ipadVotes')) || {
        pro: 0,
        air: 0,
        mini: 0,
        base: 0
    };

    const votingForm = document.getElementById('votingForm');

    function updateChart() {
        const total = votes.pro + votes.air + votes.mini + votes.base;
        const bars = {
            pro: document.getElementById('bar-pro'),
            air: document.getElementById('bar-air'),
            mini: document.getElementById('bar-mini'),
            base: document.getElementById('bar-base')
        };

        for (let key in bars) {
            const percentage = total === 0 ? 0 : Math.round((votes[key] / total) * 100);
            bars[key].style.width = percentage + '%';
            bars[key].textContent = percentage + '%';
        }
    }

    votingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selected = document.querySelector('input[name="ipad"]:checked').value;
        votes[selected]++;
        localStorage.setItem('ipadVotes', JSON.stringify(votes));
        updateChart();
    });

    updateChart();

    // ЗАДАНИЕ 7 случайный фон при клике на кнопку (меняется каждые 5 секунд)
    const randomBgBtn = document.getElementById('randomBgBtn');
    let randomColorInterval = null;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function changeBackground() {
        // по заданию - меняется фон страницы. меняем body.style.backgroundColor
        body.style.backgroundColor = getRandomColor();
    }

    randomBgBtn.addEventListener('click', () => {
        // если интервал уже запущен - останавливаем, иначе запускаем
        if (randomColorInterval) {
            clearInterval(randomColorInterval);
            randomColorInterval = null;
            randomBgBtn.textContent = '🎨 Случайный фон';
            // возвращаем исходный фон в зависимости от темы
            if (body.classList.contains('dark-theme')) {
                body.style.backgroundColor = '#1a1a1a';
            } else {
                body.style.backgroundColor = '#f5f5f7';
            }
        } else {
            randomBgBtn.textContent = '⏹ Остановить смену фона';
            changeBackground(); // меняем сразу
            randomColorInterval = setInterval(changeBackground, 5000);
        }
    });
    
});