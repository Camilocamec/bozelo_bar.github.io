document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os elementos com a classe 'slide'
    const slides = document.querySelectorAll('.slide');
    // Inicializa o índice do slide atual como 0
    let currentSlideIndex = 0;

    // Função para mostrar o slide com base no índice
    showSlide(currentSlideIndex);

    // Adiciona um evento de clique a cada slide
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            // Avança para o próximo slide circularmente
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        });
    });

    // Função para mostrar um slide específico
    function showSlide(index) {
        slides.forEach((slide, slideIndex) => {
            // Exibe o slide atual, oculta os demais
            slide.style.display = slideIndex === index ? 'block' : 'none';
        });
        currentSlideIndex = index;
    }

    // Configura um intervalo para avançar automaticamente os slides
    setInterval(function() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }, 2500);

    // Seleciona todas as imagens das miniaturas
    const miniImagens = document.querySelectorAll('.mini-slide img');

    // Define o tamanho máximo das imagens destacadas com base na largura e altura da janela
    let tamanhoMaximo = { width: window.innerWidth * 0.8, height: window.innerHeight * 0.8 };

    // Ajusta o tamanho máximo se a largura da janela for menor que 1400 pixels
    if (window.innerWidth < 1400) {
        tamanhoMaximo = { width: window.innerWidth * 0.8, height: window.innerHeight * 0.8 };
    }

    // Função para exibir uma imagem destacada em tela cheia
    function exibirImagemDestacada(src, alt) {
        // Remove a imagem destacada existente, se houver
        const imagemDestacadaExistente = document.querySelector('.imagem-destacada');
        if (imagemDestacadaExistente) {
            document.body.removeChild(imagemDestacadaExistente);
        }

        // Cria um novo elemento de imagem para a imagem destacada
        const imgDestacada = new Image();
        imgDestacada.src = src;
        imgDestacada.alt = alt;
        imgDestacada.className = 'imagem-destacada';

        // Estilos CSS para a imagem destacada
        imgDestacada.style.position = 'fixed';
        imgDestacada.style.top = '50%';
        imgDestacada.style.left = '50%';
        imgDestacada.style.transform = 'translate(-50%, -50%)';
        imgDestacada.style.zIndex = '1000';
        imgDestacada.style.maxWidth = tamanhoMaximo.width + 'px';
        imgDestacada.style.maxHeight = tamanhoMaximo.height + 'px';
        imgDestacada.style.border = '5px solid orange';
        imgDestacada.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
        imgDestacada.style.transition = 'transform 0.3s ease';

        // Ajusta o tamanho máximo da imagem destacada para diferentes tamanhos de janela
        if (window.innerWidth < 600) {
            imgDestacada.style.maxWidth = '90%';
            imgDestacada.style.maxHeight = '90vh';
        } else if (window.innerWidth < 1000) {
            imgDestacada.style.maxWidth = '60%';
            imgDestacada.style.maxHeight = '60vh';
        }

        // Adiciona a imagem destacada ao corpo do documento
        document.body.appendChild(imgDestacada);

        // Adiciona um evento de clique para fechar a imagem destacada ao clicar nela
        imgDestacada.addEventListener('click', function() {
            document.body.removeChild(this);
        });

        // Anima a entrada da imagem destacada após um pequeno intervalo
        setTimeout(() => {
            imgDestacada.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);
    }

    // Adiciona um evento de clique a cada miniatura de imagem para exibir a imagem correspondente destacada
    miniImagens.forEach(img => {
        img.addEventListener('click', function() {
            exibirImagemDestacada(this.src, this.alt);
        });
    });
});
