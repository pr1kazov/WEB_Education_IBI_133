document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-theme");
            localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
        });
    }

    const images = document.querySelectorAll(".slider-image");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    if (images.length > 0) {
        function showSlide(index) {
            images.forEach((img, i) => img.classList.toggle("active", i === index));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        }

        document.getElementById("nextBtn")?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        });

        document.getElementById("prevBtn")?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showSlide(currentIndex);
        });

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                currentIndex = parseInt(dot.dataset.index);
                showSlide(currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showSlide(currentIndex);
        }, 4000);
    }

    const daysEl = document.getElementById("days");
    if (daysEl) {
        const releaseDate = new Date("2026-10-10T15:56:00").getTime();

        setInterval(() => {
            const now = new Date().getTime();
            const distance = releaseDate - now;

            if (distance < 0) {
                document.getElementById("countdown").innerHTML = "<p>Новый iPad уже вышел!</p>";
                return;
            }

            document.getElementById("days").textContent = String(
                Math.floor(distance / (1000 * 60 * 60 * 24))
            ).padStart(2, "0");
            document.getElementById("hours").textContent = String(
                Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            ).padStart(2, "0");
            document.getElementById("minutes").textContent = String(
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            ).padStart(2, "0");
            document.getElementById("seconds").textContent = String(
                Math.floor((distance % (1000 * 60)) / 1000)
            ).padStart(2, "0");
        }, 1000);
    }

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const randomBgBtn = document.getElementById("randomBgBtn");
    let randomColorInterval = null;

    if (randomBgBtn) {
        randomBgBtn.addEventListener("click", () => {
            if (randomColorInterval) {
                clearInterval(randomColorInterval);
                randomColorInterval = null;
                randomBgBtn.textContent = "🎨 Случайный фон";
                body.style.backgroundColor = "";
            } else {
                randomBgBtn.textContent = "⏹ Остановить";
                body.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                randomColorInterval = setInterval(() => {
                    body.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                }, 5000);
            }
        });
    }

    const votingForm = document.getElementById("votingForm");
    if (votingForm) {
        votingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const selected = document.querySelector('input[name="ipad"]:checked');
            if (!selected) return;

            try {
                const response = await fetch("/api/vote/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
                    },
                    body: JSON.stringify({ model: selected.value }),
                });

                const data = await response.json();
                if (data.success) {
                    updateChart(data.votes);
                } else {
                    alert(data.message || "Ошибка голосования");
                }
            } catch (error) {
                console.error("Ошибка:", error);
            }
        });

        fetch("/api/vote/")
            .then((r) => r.json())
            .then(updateChart);
    }

    function updateChart(votes) {
        const total = Object.values(votes).reduce((a, b) => a + b, 0);
        const bars = {
            pro: document.getElementById("bar-pro"),
            air: document.getElementById("bar-air"),
            mini: document.getElementById("bar-mini"),
            base: document.getElementById("bar-base"),
        };

        for (const key in bars) {
            if (bars[key]) {
                const pct = total === 0 ? 0 : Math.round(((votes[key] || 0) / total) * 100);
                bars[key].style.width = pct + "%";
                bars[key].textContent = pct + "%";
            }
        }
    }
});