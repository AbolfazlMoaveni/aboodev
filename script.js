// منوی همبرگری برای موبایل
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// بستن منو با کلیک روی لینک
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// فیلتر کردن نمونه کارها (فقط در صفحه portfolio.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// مودال برای نمایش بزرگ تصاویر و ویدیوها
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.querySelector('.modal-close');

function openModal(mediaElement) {
    if (!modal) return;
    
    modal.style.display = 'block';
    
    modalImg.style.display = 'none';
    modalVideo.style.display = 'none';
    
    if (mediaElement.tagName === 'IMG') {
        modalImg.src = mediaElement.src;
        modalImg.style.display = 'block';
    } else if (mediaElement.tagName === 'VIDEO') {
        modalVideo.src = mediaElement.currentSrc || mediaElement.src;
        modalVideo.style.display = 'block';
        if (modalVideo.play) modalVideo.play();
    }
}

function closeModalFunc() {
    if (!modal) return;
    modal.style.display = 'none';
    if (modalVideo && modalVideo.src) {
        modalVideo.pause();
        modalVideo.src = '';
    }
}

if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// کلیک روی تصاویر و ویدیوهای نمونه کارها
document.querySelectorAll('.portfolio-media img, .portfolio-media video').forEach(media => {
    media.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        openModal(media);
    });
});

// کلیک روی تصاویر در گالری جزئیات پروژه
document.querySelectorAll('.project-gallery img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(img);
    });
});

// اسکرول نرم برای لینک‌های داخلی
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// انیمیشن اسکرول (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .portfolio-card, .education-box, .certificates-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== تایپ رایتر افکت پیشرفته ==========
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (!typedTextSpan) return;
    
    // آرایه متن‌ها با ایموجی‌های متفاوت
    const textArray = [
        "لیسانس مهندسی کامپیوتر گرایش نرم‌افزار",
        "متخصص در شبکه و Routing",
        "توسعه‌دهنده فول‌استک (#PHP, Python, C)",
        "متخصص OCR هوشمند با FastAPI",
        "طراح گرافیک و تایپوگرافی حرفه‌ای",
        "علاقه‌مند به LLM، LangChain و NLP",
        "خلاق تجربه‌های دیجیتال",
        "دارای گواهینامه Network+"
    ];
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    let waitTimeout;
    
    // تنظیمات سرعت (میلی‌ثانیه)
    const speeds = {
        typing: 80,      // سرعت تایپ
        erasing: 40,     // سرعت پاک کردن
        pauseBeforeErase: 1500,    // مکث قبل از پاک کردن
        pauseBeforeNext: 500       // مکث قبل از متن بعدی
    };
    
    function type() {
        if (isWaiting) return;
        
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            // حالت پاک کردن
            if (charIndex > 0) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, speeds.erasing);
            } else {
                // پاک کردن کامل شد
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                isWaiting = true;
                waitTimeout = setTimeout(() => {
                    isWaiting = false;
                    type();
                }, speeds.pauseBeforeNext);
            }
        } else {
            // حالت تایپ کردن
            if (charIndex < currentText.length) {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, speeds.typing);
            } else {
                // تایپ کامل شد - شروع تایمر قبل از پاک کردن
                isDeleting = true;
                isWaiting = true;
                waitTimeout = setTimeout(() => {
                    isWaiting = false;
                    type();
                }, speeds.pauseBeforeErase);
            }
        }
    }
    
    // شروع انیمیشن
    setTimeout(type, 500);
    
    // پاک کردن timeout در صورت ناوبری (اختیاری)
    window.addEventListener('beforeunload', function() {
        if (waitTimeout) clearTimeout(waitTimeout);
    });
});

// ========== دارک مود ==========
document.addEventListener('DOMContentLoaded', function() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    
    // بررسی ذخیره شده در localStorage
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                updateDarkModeIcon(true);
            } else {
                localStorage.setItem('darkMode', 'disabled');
                updateDarkModeIcon(false);
            }
        });
    }
    
    function updateDarkModeIcon(isDark) {
        if (!darkModeBtn) return;
        const icon = darkModeBtn.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});