document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Dynamic Date & Time
    const dateElement = document.getElementById('current-date');
    const updateDateTime = () => {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        let timeString = now.toLocaleTimeString('tr-TR', options);

        dateElement.textContent = `Bugün, ${timeString}`;
    };
    updateDateTime();
    setInterval(updateDateTime, 1000); // Her saniye güncelle

    // 2. Sticky Header Scroll Effect
    const topBar = document.querySelector('.top-bar');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 40) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    });

    // 3. Checklist Interactive Feedback
    const checklistItems = document.querySelectorAll('.checklist-item');
    checklistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const circle = item.querySelector('.check-circle');
            circle.style.backgroundColor = 'var(--accent)';
            circle.style.borderColor = 'var(--accent)';

            setTimeout(() => {
                circle.style.backgroundColor = 'transparent';
                circle.style.borderColor = 'var(--text-secondary)';
            }, 300);
        });
    });
});
