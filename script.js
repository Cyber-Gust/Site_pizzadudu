/* Função principal que agrupa todas as funcionalidades */
function main() {
    
    /* ===== PRELOADER ===== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500); // Um pequeno delay para garantir que tudo carregou
    });

    /* ===== HEADER STICKY E ATIVAÇÃO DE MENU ===== */
    const header = document.getElementById('header');
    const navHeight = header.offsetHeight;

    function changeHeaderWhenScroll() {
        if (window.scrollY >= navHeight) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    }
    
    window.addEventListener('scroll', changeHeaderWhenScroll);

    /* ===== MENU MOBILE (ABRIR/FECHAR) ===== */
    const nav = document.querySelector('#header .menu');
    const toggle = document.querySelectorAll('#header .toggle');

    for (const element of toggle) {
        element.addEventListener('click', function () {
            nav.classList.toggle('show');
            document.body.classList.toggle('nav-open');
        });
    }

    // Fechar o menu ao clicar em um link
    const links = document.querySelectorAll('#header .menu ul li a');
    for (const link of links) {
        link.addEventListener('click', function () {
            nav.classList.remove('show');
            document.body.classList.remove('nav-open');
        });
    }

    /* ===== CARROSSEL DE PIZZAS (SWIPER.JS) ===== */
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // quando a largura da janela for >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // quando a largura da janela for >= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });

    /* ===== MAPA INTERATIVO (LEAFLET.JS) ===== */
    // Coordenadas ATUALIZADAS para a Forneria 360 em Santo André
    const latitude = -21.130684998711985;
    const longitude = -44.25538711880628;

    try {
        const map = L.map('map').setView([latitude, longitude], 17); // Aumentei o zoom para 17

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Ícone customizado
        const pizzaIcon = L.icon({
            iconUrl: 'images/logo.png',
            iconSize: [40, 40], 
            iconAnchor: [20, 40], 
            popupAnchor: [0, -40]
        });

        L.marker([latitude, longitude], { icon: pizzaIcon }).addTo(map)
            .bindPopup('<b>Forneria 360º</b><br>R. Cel. Tamarindo, 73A')
            .openPopup();
    } catch (error) {
        console.error("Erro ao inicializar o mapa. Verifique se o elemento #map existe.", error);
        const mapContainer = document.getElementById('map');
        if(mapContainer) {
            mapContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Não foi possível carregar o mapa. Tente novamente mais tarde.</p>';
        }
    }


    /* ===== ANIMAÇÕES AO ROLAR A PÁGINA (SCROLLREVEAL) ===== */
    const scrollReveal = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 700,
        reset: true,
    });

    scrollReveal.reveal(
        `#home .image, #home .text,
         #menu-sabores header, #menu-sabores .swiper,
         #about .image, #about .text,
         #location header, #location #map, #location .address-info,
         #cta-final .container,
         .footer-grid > div
        `, {
            interval: 100,
        }
    );
    
    /* ===== ATIVAR LINK DO MENU CONFORME A SEÇÃO VISÍVEL ===== */
    const sections = document.querySelectorAll('main section[id]');
    
    function activateMenuAtCurrentSection() {
        const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

        for(const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            const checkpointStart = checkpoint >= sectionTop;
            const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

            const menuLink = document.querySelector('nav ul li a[href*=' + sectionId + ']');

            if(menuLink) { // Adiciona verificação para evitar erros
                if(checkpointStart && checkpointEnd) {
                    menuLink.classList.add('active');
                } else {
                    menuLink.classList.remove('active');
                }
            }
        }
    }
    
    window.addEventListener('scroll', activateMenuAtCurrentSection);

}

// Executa a função principal quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', main);
