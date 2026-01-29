// script.js - Funcionalidades JavaScript para o template DevMaster

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Toggle Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
    
    // Navegação por abas dos módulos
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove classe active de todos os headers e contents
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adiciona classe active ao header e content atual
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Slider de depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.nav-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide dos depoimentos
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Inicializar primeiro slide
    showSlide(0);
    
    // Toggle FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Animação de contador nas estatísticas
    const stats = document.querySelectorAll('.stat h3');
    const heroSection = document.querySelector('.hero');
    
    function animateCounter(element, finalValue, duration) {
        let startValue = 0;
        let increment = finalValue / duration;
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            element.textContent = Math.floor(currentValue);
            
            if (currentValue >= finalValue) {
                element.textContent = finalValue + '+';
                clearInterval(timer);
            }
        }, 10);
    }
    
    // Observador de interseção para animação das estatísticas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const value = parseInt(stat.textContent);
                    if (!isNaN(value)) {
                        animateCounter(stat, value, 100);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(heroSection);
    
    // Toggle de Preços Anual/Mensal
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = ['R$ 97', 'R$ 197', 'R$ 497'];
    const annualPrices = ['R$ 77', 'R$ 157', 'R$ 397'];
    const priceElements = document.querySelectorAll('.price');
    
    pricingToggle.addEventListener('change', function() {
        priceElements.forEach((element, index) => {
            if (this.checked) {
                element.textContent = annualPrices[index];
            } else {
                element.textContent = monthlyPrices[index];
            }
        });
    });
    
    // Efeito de máquina de escrever no título
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.innerHTML;
    const highlightText = heroTitle.querySelector('.highlight').textContent;
    
    function typeWriter(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Animações de entrada para elementos
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.feature-card, .module-item, .testimonial-card, .pricing-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(element);
    });
    
    // Validação de formulário (se houver)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simular envio do formulário
                alert('Formulário enviado com sucesso!');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
    
    // Botão de voltar ao topo
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.classList.add('back-to-top');
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Estilos para o botão de voltar ao topo
    const backToTopStyles = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .back-to-top:hover {
            background: var(--primary-dark);
            transform: translateY(-3px);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = backToTopStyles;
    document.head.appendChild(styleSheet);
});

// Funções utilitárias adicionais
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Inicialização quando a página carrega completamente
window.addEventListener('load', function() {
    console.log('Template DevMaster carregado com sucesso!');
});
