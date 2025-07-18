
<!-- science_innovation_club_website/frontend/js/main.js -->
document.addEventListener('DOMContentLoaded', function() {
    // 从JSON文件加载数据
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            // 存储数据到localStorage
            localStorage.setItem('clubName', '成都七中科学技术协会');
            localStorage.setItem('carouselData', JSON.stringify(data.carousel));
            localStorage.setItem('recruitInfo', JSON.stringify(data.recruit));
            localStorage.setItem('membersData', JSON.stringify(data.members));
            
            // 初始化轮播图
            initCarousel(data.carousel);
            
            // 更新招新信息
            updateRecruitInfo(data.recruit);
            
            // 初始化成员展示
            initMembers(data.members);
            
            // 启动轮播
            startAutoPlay();
        })
        .catch(error => {
            console.error('加载数据失败:', error);
            // 使用默认数据
            const defaultData = {
                carousel: [
                    {
                        id: 1,
                        title: "机器人竞赛获奖",
                        description: "我校科创社在2025年全国大学生机器人竞赛中获得一等奖",
                        imageUrl: "https://picsum.photos/1200/600?random=1"
                    },
                    {
                        id: 2,
                        title: "科技创新讲座",
                        description: "邀请行业专家进行AI前沿技术分享",
                        imageUrl: "https://picsum.photos/1200/600?random=2"
                    },
                    {
                        id: 3,
                        title: "项目成果展示",
                        description: "社团成员自主创新项目展示活动",
                        imageUrl: "https://picsum.photos/1200/600?random=3"
                    }
                ],
                recruit: {
                    title: "2025年秋季招新",
                    time: "2025年9月1日-9月30日",
                    target: "全校各年级学生",
                    requirements: "对科技创新有热情，愿意学习新知识，有团队合作精神",
                    qrCode: "https://picsum.photos/200/200?random=4"
                },
                members: [
                    {
                        id: 1,
                        name: "张明",
                        position: "主席",
                        imageUrl: "https://picsum.photos/300/300?random=5",
                        contacts: [
                            { type: "QQ", value: "123456789" },
                            { type: "微信", value: "zhangming2025" },
                            { type: "电话", value: "13800138000" }
                        ]
                    },
                    {
                        id: 2,
                        name: "李华",
                        position: "编辑部部长",
                        imageUrl: "https://picsum.photos/300/300?random=6",
                        contacts: [
                            { type: "QQ", value: "987654321" },
                            { type: "邮箱", value: "lihua@example.com" }
                        ]
                    },
                    {
                        id: 3,
                        name: "王芳",
                        position: "活动部部长",
                        imageUrl: "https://picsum.photos/300/300?random=7",
                        contacts: [
                            { type: "微信", value: "wangfang2025" },
                            { type: "电话", value: "13900139000" }
                        ]
                    },
                    {
                        id: 4,
                        name: "赵强",
                        position: "新媒体部部长",
                        imageUrl: "https://picsum.photos/300/300?random=8",
                        contacts: [
                            { type: "QQ", value: "456789123" },
                            { type: "邮箱", value: "zhaoqiang@example.com" }
                        ]
                    },
                    {
                        id: 5,
                        name: "刘伟",
                        position: "飓风试验部部长",
                        imageUrl: "https://picsum.photos/300/300?random=9",
                        contacts: [
                            { type: "微信", value: "liuwei2025" },
                            { type: "电话", value: "13700137000" }
                        ]
                    },
                    {
                        id: 6,
                        name: "陈晨",
                        position: "宣传部部长",
                        imageUrl: "https://picsum.photos/300/300?random=10",
                        contacts: [
                            { type: "QQ", value: "789123456" },
                            { type: "邮箱", value: "chenchen@example.com" }
                        ]
                    },
                    {
                        id: 7,
                        name: "杨阳",
                        position: "网络部部长",
                        imageUrl: "https://picsum.photos/300/300?random=11",
                        contacts: [
                            { type: "微信", value: "yangyang2025" },
                            { type: "电话", value: "13600136000" }
                        ]
                    }
                ]
            };
            localStorage.setItem('clubName', '成都七中科学技术协会');
            initCarousel(defaultData.carousel);
            updateRecruitInfo(defaultData.recruit);
            initMembers(defaultData.members);
            startAutoPlay();
        });

    // 轮播图功能实现
    const carouselContainer = document.getElementById('carousel-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    let intervalId;

    // 初始化轮播图
    function initCarousel(carouselData) {
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

    // 更新招新信息
    function updateRecruitInfo(recruitInfo) {
        const recruitSection = document.getElementById('recruit');
        recruitSection.innerHTML = `
            <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">招新信息</h2>
            <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="p-8 text-center">
                    <h3 class="text-2xl font-bold mb-4 text-blue-800">${recruitInfo.title}</h3>
                    <div class="space-y-4 text-gray-700 mb-6">
                        <p><span class="font-semibold">招新时间：</span>${recruitInfo.time}</p>
                        <p><span class="font-semibold">招新对象：</span>${recruitInfo.target}</p>
                        <p><span class="font-semibold">招新要求：</span>${recruitInfo.requirements}</p>
                        <p class="font-semibold">扫描下方二维码加入招新QQ群</p>
                    </div>
                    <div class="flex justify-center">
                        <img src="${recruitInfo.qrCode}" alt="招新QQ群二维码" class="w-48 h-48 object-cover rounded-lg border-2 border-gray-200">
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化成员展示
    function initMembers(membersData) {
        const membersContainer = document.getElementById('members-container');
        membersContainer.innerHTML = '';

        membersData.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl';
            
            let contactsHTML = '';
            member.contacts.forEach(contact => {
                let icon = '';
                switch(contact.type) {
                    case 'QQ':
                        icon = '💬';
                        break;
                    case '微信':
                        icon = '📱';
                        break;
                    case '电话':
                        icon = '📞';
                        break;
                    case '邮箱':
                        icon = '✉️';
                        break;
                    default:
                        icon = '🔗';
                }
                contactsHTML += `
                    <div class="contact-item flex items-center text-sm text-gray-600 hover:text-blue-600">
                        <span class="contact-icon mr-1">${icon}</span>
                        <span>${contact.value}</span>
                    </div>
                `;
            });

            memberCard.innerHTML = `
                <img src="${member.imageUrl}" alt="${member.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="member-name text-xl font-bold text-gray-800">${member.name}</h3>
                    <p class="member-position text-blue-600 font-medium mb-3">${member.position}</p>
                    <div class="member-contacts space-y-2">
                        ${contactsHTML}
                    </div>
                </div>
            `;
            membersContainer.appendChild(memberCard);
        });
    }

    // 切换轮播图
    function goToSlide(index) {
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        
        currentIndex = index;
        
        items.forEach((item, i) => {
            item.classList.toggle('opacity-0', i !== index);
            item.classList.toggle('opacity-100', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('bg-opacity-100', i === index);
            indicator.classList.toggle('bg-opacity-50', i !== index);
        });
    }

    function nextSlide() {
        const carouselData = JSON.parse(localStorage.getItem('carouselData') || '[]');
        const nextIndex = (currentIndex + 1) % carouselData.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const carouselData = JSON.parse(localStorage.getItem('carouselData') || '[]');
        const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        goToSlide(prevIndex);
    }

    function startAutoPlay() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(intervalId);
    }

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

    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // 响应式调整
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('particles');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
