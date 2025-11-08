// This file controls the Home Page logic (Menu, Slider, Auth, Modal)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- (ส่วนที่ 1: Side Menu Logic ... เหมือนเดิม) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay'); 
    if (menuToggle && sideMenu && overlay) {
        menuToggle.addEventListener('click', () => { sideMenu.classList.add('open'); overlay.style.display = 'block'; });
        closeMenu.addEventListener('click', () => { sideMenu.classList.remove('open'); overlay.style.display = 'none'; });
        overlay.addEventListener('click', () => { sideMenu.classList.remove('open'); overlay.style.display = 'none'; });
    }

    // --- (ส่วนที่ 2: Simple Slider Logic ... เหมือนเดิม) ---
    const sliderContainer = document.querySelector('.slider-container');
    const sliderDots = document.querySelectorAll('.slider-pagination .dot');
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentIndex = 0;
    function updateSlider() { 
        if (!sliderContainer || !sliderItems.length) return;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        sliderDots.forEach((dot, index) => { dot.classList.toggle('active', index === currentIndex); });
        sliderItems.forEach((item, index) => { item.classList.toggle('active', index === currentIndex); });
    }
    function goToNextSlide() { 
        if (sliderItems.length === 0) return;
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
    }
    function goToSlide(index) { 
        currentIndex = index;
        updateSlider();
    }
    if (sliderItems.length > 1) { 
        setInterval(goToNextSlide, 5000); 
        sliderDots.forEach((dot, index) => { dot.addEventListener('click', () => goToSlide(index)); });
        updateSlider(); 
    }

    // --- (ส่วนที่ 3: Logout Modal Logic ... เหมือนเดิม) ---
    const logoutOverlay = document.getElementById('logout-overlay');
    const logoutConfirmBtn = document.getElementById('logout-confirm-btn');
    const logoutCancelBtn = document.getElementById('logout-cancel-btn');
    function openLogoutModal() { if (logoutOverlay) logoutOverlay.classList.add('show'); }
    function closeLogoutModal() { if (logoutOverlay) logoutOverlay.classList.remove('show'); }
    if (logoutConfirmBtn) {
        logoutConfirmBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); 
            location.reload(); 
        });
    }
    if (logoutCancelBtn) { logoutCancelBtn.addEventListener('click', closeLogoutModal); }
    if (logoutOverlay) {
        logoutOverlay.addEventListener('click', (e) => { if (e.target === logoutOverlay) closeLogoutModal(); });
    }
    function handleLogout() { openLogoutModal(); }

    // --- 5. [อัปเกรด UX] Auth Logic (Check Status) ---
    function checkAuthStatus() {
        const usernameDisplay = document.getElementById('username-display');
        const usernameLink = document.getElementById('username-link');
        const profileLink = document.getElementById('profile-link');
        const loginMenuLink = document.getElementById('login-menu-link'); 
        
        if (!usernameDisplay || !usernameLink || !profileLink || !loginMenuLink || !logoutOverlay) {
            console.error("Auth UI or Modal elements not found! Check index.html");
        }

        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
            // --- กรณีล็อกอินแล้ว ---
            // 1. ปุ่มชื่อ = ปุ่ม Logout
            usernameDisplay.textContent = loggedInUser;
            usernameDisplay.classList.add('logged-in');
            usernameDisplay.classList.remove('guest');
            usernameDisplay.title = 'คลิกเพื่อออกจากระบบ';
            usernameLink.href = '#'; 
            usernameLink.addEventListener('click', (e) => {
                e.preventDefault(); 
                handleLogout(); 
            });

            // 2. ไอคอน 👤 = ปุ่มไปหน้า Profile
            profileLink.innerHTML = '👤'; 
            profileLink.href = 'profile.html'; // <-- ลิงก์ไปหน้าโปรไฟล์
            profileLink.title = 'ดูโปรไฟล์';
            profileLink.ariaLabel = 'Profile';
            // (เราลบ event listener 'click' ออกจาก profileLink)

            // 3. เมนูข้าง = ปุ่ม Logout
            if (loginMenuLink) {
                loginMenuLink.innerHTML = '<a href="#" id="logout-menu-button">ออกจากระบบ</a>';
                const logoutMenuButton = loginMenuLink.querySelector('#logout-menu-button');
                if (logoutMenuButton) {
                    logoutMenuButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleLogout(); 
                    });
                }
            }

        } else {
            // --- กรณีเป็น Guest (ยังไม่ล็อกอิน) ---
            if (usernameDisplay) {
                usernameDisplay.textContent = 'ยังไม่มีชื่อผู้ใช้';
                usernameDisplay.classList.add('guest');
                usernameDisplay.classList.remove('logged-in');
                usernameDisplay.title = 'คลิกเพื่อเข้าสู่ระบบ';
            }
            if (usernameLink) {
                usernameLink.href = 'login.html';
            }
            
            if (profileLink) {
                profileLink.innerHTML = '👤';
                profileLink.href = 'login.html'; // ไอคอน 👤 กลับไปหน้า Login
                profileLink.title = 'เข้าสู่ระบบ';
                profileLink.ariaLabel = 'Profile';
            }
            
            if (loginMenuLink) {
                loginMenuLink.innerHTML = '<a href="login.html">เข้าสู่ระบบ / สมัครสมาชิก</a>';
            }
        }
    }
    
    // --- 6. INITIAL LOAD ---
    checkAuthStatus(); // เรียกใช้ฟังก์ชันตรวจสอบ Auth

});