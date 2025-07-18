
// science_innovation_club_website/frontend/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图数据
    const carouselData = [
        {
            id: 1,
            title: "活动1",
            description: "介绍1",
            imageUrl: "https://picsum.photos/1200/600?random=1"
        },
        {
            id: 2,
            title: "活动2",
            description: "介绍2",
            imageUrl: "https://picsum.photos/1200/600?random=2"
        },
        {
            id: 3,
            title: "活动三",
            description: "介绍三",
            imageUrl: "https://picsum.photos/1200/600?random=3"
        }
    ];

    // 存储数据到localStorage
    localStorage.setItem('carouselData', JSON.stringify(carouselData));

    // 轮播图功能实现
    const carouselContainer = document.getElementById('carousel-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    let intervalId;

    // 初始化轮播图
    function initCarousel() {
        carouselContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        carouselData.forEach((item, index) => {
            // 创建轮播项
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item absolute inset-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
            carouselItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover">
                <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent text-white">
                    <h3 class="text-2xl font-bold">${item.title}</h3>
                    <p class="mt-2">${item.description}</p>
                </div>
            `;
            carouselContainer.appendChild(carouselItem);

            // 创建指示器
            const indicator = document.createElement('div');
            indicator.className = `indicator w-3 h-3 rounded-full bg-white bg-opacity-50 cursor-pointer transition ${index === 0 ? 'bg-opacity-100' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // 切换轮播图
    function goToSlide(index) {
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        
        // 更新当前索引
        currentIndex = index;
        
        // 更新轮播项显示
        items.forEach((item, i) => {
            item.classList.toggle('opacity-0', i !== index);
            item.classList.toggle('opacity-100', i === index);
        });
        
        // 更新指示器状态
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('bg-opacity-100', i === index);
            indicator.classList.toggle('bg-opacity-50', i !== index);
        });
    }

    // 下一张
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % carouselData.length;
        goToSlide(nextIndex);
    }

    // 上一张
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        goToSlide(prevIndex);
    }

    // 自动轮播
    function startAutoPlay() {
        intervalId = setInterval(nextSlide, 5000);
    }

    // 停止自动轮播
    function stopAutoPlay() {
        clearInterval(intervalId);
    }

    // 事件监听
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    // 鼠标悬停时暂停轮播
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // 初始化
    initCarousel();
    startAutoPlay();

    // 响应式调整
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('particles');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
