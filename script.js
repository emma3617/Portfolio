const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const navHeight = nav.offsetHeight;  // 獲取導航欄的高度，以便正確計算偏移量

function updateActiveLink() {
    let currentIndex = -1;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= (navHeight + 10) && rect.bottom >= navHeight) { // 調整以考慮導航欄高度和額外空間
            currentIndex = index;
        }
    });

    navLinks.forEach((link, index) => {
        link.style.backgroundColor = currentIndex === index ? 'rgba(0, 0, 0, 0.5)' : 'transparent';
        link.style.color = currentIndex === index ? '#ffffff' : '#ffffff';
    });

    if (window.scrollY > 100) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}

window.addEventListener('scroll', updateActiveLink);

// 為每個導航鏈接添加事件監聽器，以實現自定義滾動行為並立即設置活動鏈接
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默認的錨點行為
        const targetId = this.getAttribute('href');  // 獲取被點擊鏈接的 href 屬性
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - navHeight - 8;  // 計算目標位置

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'  // 平滑滾動到目標位置
            });

            // 手動更新活動鏈接，以確保即時反饋
            navLinks.forEach(lnk => lnk.style.backgroundColor = 'transparent');
            navLinks.forEach(lnk => lnk.style.color = '#ffffff');
            this.style.backgroundColor = '#19A7CE';
            this.style.color = '#ffffff';
        }
    });
});

// 假設這些事件監聽器符合你現有的功能需求
document.querySelectorAll('.project-info').forEach((button) => {
    button.addEventListener('click', (event) => {
        const project = event.target.getAttribute('data-project');
        window.location.href = `${project}-info.html`;
    });
});

document.getElementById('more-projects').addEventListener('click', () => {
    window.location.href = 'other-projects.html';
});
