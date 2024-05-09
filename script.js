const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const navHeight = nav.offsetHeight;  // Get the height of the nav to calculate the offset correctly

function updateActiveLink() {
    let currentIndex = -1;
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= (navHeight + 10) && rect.bottom >= 0) { // Adjusted to account for nav height and extra space
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

// Adding event listeners to each nav link for custom scroll behavior and to set active link immediately
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        const targetId = this.getAttribute('href');  // Get the href attribute of the clicked link
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - navHeight - 10;  // Calculate the target position

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'  // Smoothly scroll to the target position
            });

            // Manually update active link on click to ensure immediate feedback
            navLinks.forEach(lnk => lnk.style.backgroundColor = 'transparent');
            navLinks.forEach(lnk => lnk.style.color = '#ffffff');
            this.style.backgroundColor = '#19A7CE';
            this.style.color = '#ffffff';
        }
    });
});
// Assuming these event listeners are correct as per your existing functionality
document.querySelectorAll('.project-info').forEach((button) => {
    button.addEventListener('click', (event) => {
        const project = event.target.getAttribute('data-project');
        window.location.href = `${project}-info.html`;
    });
});

document.getElementById('more-projects').addEventListener('click', () => {
    window.location.href = 'other-projects.html';
});
