// Конфигурация слайдера
const sliderOptions = {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    gap: '20px',
    arrows: false,
    pagination: false,
    speed: 600,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    drag: true,
    swipe: true,
    rewind: true,
    autoWidth: false,
    height: '600px',
    width: '600px',
    breakpoints: {
        768: {
            perPage: 1,
            gap: '10px'
        },
        1024: {
            perPage: 2,
            gap: '15px'
        }
    }
};

// Проверяем загрузку Splide
if (typeof Splide === 'undefined') {
    console.error('Библиотека Splide не загружена!');
} else {
    console.log('Библиотека Splide успешно загружена');
}

// Объект для хранения всех слайдеров
const splideInstances = {};

// Дожидаемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, начинаем инициализацию слайдеров оборудования');
    
    // Находим все слайдеры в секции оборудования
    const sliders = document.querySelectorAll('.equipment-section .splide');
    console.log('Найдено слайдеров оборудования:', sliders.length);
    
    if (sliders.length > 0) {
        // Помечаем, что слайдеры оборудования инициализированы
        window.equipmentSlidersInitialized = true;
        
        // Инициализируем каждый слайдер
        sliders.forEach((slider, index) => {
            try {
                // Генерируем уникальный ID для слайдера, если его нет
                if (!slider.id) {
                    slider.id = `equipment-slider-${index + 1}`;
                }

                console.log(`Инициализация слайдера оборудования ${slider.id}:`, slider);
                
                const splide = new Splide(slider, sliderOptions);
                splide.mount();

                // Сохраняем ссылку на слайдер в объекте
                splideInstances[slider.id] = splide;

                // Добавляем обработчики событий для кнопок
                const prevButton = slider.querySelector('.nav-prev');
                const nextButton = slider.querySelector('.nav-next');

                if (prevButton) {
                    prevButton.addEventListener('click', () => splide.go('<'));
                }
                if (nextButton) {
                    nextButton.addEventListener('click', () => splide.go('>'));
                }

                console.log(`Слайдер оборудования ${slider.id} успешно инициализирован`);
            } catch (error) {
                console.error(`Ошибка при инициализации слайдера оборудования ${slider.id}:`, error);
            }
        });
    } else {
        console.warn('Слайдеры оборудования не найдены на странице');
    }

    // Управление категориями
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categories = document.querySelectorAll('.equipment-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.dataset.category;

            // Обновляем активную кнопку
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Показываем выбранную категорию
            categories.forEach(category => {
                if (category.id === targetCategory) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });
});
