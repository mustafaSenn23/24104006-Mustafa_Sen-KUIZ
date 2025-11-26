// ===== SAYFA YÜKLENDİĞİNDE ÇALIŞACak KOD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupFormValidation();
});

// ===== İLETİŞİM FORMU GÖNDER =====
function initializeEventListeners() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }

    // CTA Butonu
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            scrollToSection('contact');
        });
    }

    // Navigasyon Linkleri
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1));
        });
    });
}

// ===== FORM GÖNDERME İŞLEMİ =====
function handleFormSubmit(form) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value;

    // Form verilerini konsola yazdır (gerçek uygulamada API'ye gönderilir)
    console.log('Form Gönderildi:', {
        name: name,
        email: email,
        subject: subject,
        message: message
    });

    // Başarı mesajı göster
    showNotification('Mesajınız başarıyla gönderildi! Yakında sizinle iletişime geçeceğiz.', 'success');

    // Formu sıfırla
    form.reset();
}

// ===== FORM DOĞRULAMA =====
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                // Geçerliyse hata sınıfını kaldır
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
        });
    }
}

// ===== BAŞARI/HATA BİLDİRİMİ =====
function showNotification(message, type) {
    // Önceki bildirimleri kaldır
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== BÖLÜME KAYDIRMA =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== GIRIŞ DOĞRULAMA =====
function validateInput(input) {
    if (input.value.trim() === '') {
        input.classList.add('error');
        return false;
    }

    // Email kontrolü
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.classList.add('error');
            return false;
        }
    }

    input.classList.remove('error');
    return true;
}

// ===== SCROLL ANİMASYONU =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    input.error,
    textarea.error {
        border-color: #ef4444 !important;
        background-color: #fee2e2;
    }

    /* Sayfa Yüklendikçe Animasyon */
    .skill-card,
    .project-card {
        animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== KAYDIRMA ÖZELLİĞİ =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Aşağı kaydırılıyor - navbar'ı gizle
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease';
        } else {
            // Yukarı kaydırılıyor - navbar'ı göster
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// ===== SAYFA YÜKLEME İLERLEMESİ =====
window.addEventListener('load', function() {
    console.log('🎉 Web sitesi başarıyla yüklendi!');
    
    // Animasyonları tetikle
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease-out';
        }, index * 100);
    });
});

// ===== SCROLL SIRASINDA YAZILARI GÖSTER (INTERSECTION OBSERVER) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Gözlemlenecek elementler
const elementsToObserve = document.querySelectorAll(
    'h2, .about-text p, .about-info li, .skill-card, .project-card, .contact-intro, .contact-form, .social-links'
);

elementsToObserve.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// ===== MOBİL MENU TOĞ GİZLE =====
function closeNavOnMobile() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && window.innerWidth < 768) {
        navMenu.classList.remove('active');
    }
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeNavOnMobile);
});
