// This file controls the language switching logic

// 1. พจนานุกรม (Dictionaries)
// (เราจะแปลเฉพาะ UI - ไม่แปลฐานข้อมูล)
const translations = {
    "en": {
        // --- Header (All Pages) ---
        "nav_home": "Home",
        "nav_quiz": "Start Assessment",
        "nav_guide": "Guide",
        "nav_history": "My Saves",
        "nav_login": "Login / Register",
        "nav_logout": "Logout",
        "nav_admin_login": "Admin Login",
        "nav_profile": "Profile",
        "nav_contact": "Contact Us",
        "username_guest": "No User Account",
        "username_loading": "Loading...",
        "username_logout_title": "Click to Logout",
        "username_login_title": "Click to Login",
        
        // --- index.html ---
        "index_slide1_h1": "Find the Right Field of Study",
        "index_slide1_p": "From the Career You Love",
        "index_slide2_h1": "Complete Career Information",
        "index_slide2_p": "And Clear Educational Paths",
        "index_slide3_h1": "Start Your Journey",
        "index_slide3_p": "We Are Here to Guide You",
        "index_cta_h2": "Start Your Dream Career Path",
        "index_cta_p": "Take the assessment to find your aptitude or explore careers",
        "index_cta_quiz_btn": "Start Assessment Now",
        "index_cta_guide_btn": "How-to Guide",
        "index_featured_h2": "In-Demand Careers",
        "index_feedback_h3": "💬 Help Us Improve",
        "index_feedback_p": "Take a moment to complete our satisfaction survey (links to Google Forms)",
        "index_feedback_btn": "Take Survey",

        // --- login.html ---
        "login_back_btn": "← Back",
        "login_back_home_btn": "← Back to Home",
        "login_title": "Login",
        "login_username_label": "Username / Email",
        "login_username_placeholder": "Enter username or email",
        "login_password_label": "Password",
        "login_password_placeholder": "Enter password",
        "login_btn": "Login",
        "login_no_account": "Don't have an account?",
        "login_register_btn": "Register",
        "login_forgot_pass": "Forgot password?",

        // --- register.html ---
        "register_title": "Create Account",
        "register_email_label": "Email",
        "register_email_placeholder": "Enter your email",
        "register_pass_label": "Password",
        "register_pass_placeholder": "At least 8 characters",
        "register_confirm_label": "Confirm Password",
        "register_confirm_placeholder": "Enter password again",
        "register_btn": "Register",
        "register_have_account": "Already have an account?",
        "register_login_btn": "Login here",
        
        // --- (เราจะข้าม quiz.html, result.html เพราะมัน Dynamic) ---
        // --- (เราจะแปลแค่ Header ในหน้านั้นๆ) ---
        "quiz_header_back": "← home",
        "quiz_header_close": "Close",
        "result_header_back": "← Back to Home",

        // --- profile.html ---
        "profile_title": "My Profile",
        "profile_history_h2": "Assessment History",
        "profile_no_history": "No saved assessment history found",
        "profile_view_result_btn": "View This Result",
        
        // --- guide.html ---
        "guide_title": "🚀 Edu Match User Guide",
        "guide_subtitle": "Start your career path in 4 easy steps",
        // (ข้ามเนื้อหา)
        
        // --- Modal ---
        "modal_logout_h3": "Logout",
        "modal_logout_p": "Are you sure you want to logout?",
        "modal_logout_cancel": "Cancel",
        "modal_logout_confirm": "Confirm & Logout"

    },
    "th": {
        // --- Header (All Pages) ---
        "nav_home": "หน้าหลัก",
        "nav_quiz": "ทำแบบทดสอบ",
        "nav_guide": "คู่มือการใช้งาน",
        "nav_history": "บันทึกของฉัน",
        "nav_login": "เข้าสู่ระบบ / สมัครสมาชิก",
        "nav_logout": "ออกจากระบบ",
        "nav_admin_login": "ล็อกอินแอดมิน",
        "nav_profile": "โปรไฟล์",
        "nav_contact": "ติดต่อเรา",
        "username_guest": "ยังไม่มีชื่อผู้ใช้",
        "username_loading": "กำลังโหลด...",
        "username_logout_title": "คลิกเพื่อออกจากระบบ",
        "username_login_title": "คลิกเพื่อเข้าสู่ระบบ",
        
        // --- index.html ---
        "index_slide1_h1": "ค้นหาสาขาวิชาที่ 'ใช่'",
        "index_slide1_p": "จากอาชีพที่ 'ชอบ'",
        "index_slide2_h1": "ข้อมูลอาชีพครบวงจร",
        "index_slide2_p": "และแนวทางการศึกษาที่ชัดเจน",
        "index_slide3_h1": "เริ่มต้นเส้นทางของคุณ",
        "index_slide3_p": "เราพร้อมให้คำแนะนำ",
        "index_cta_h2": "เริ่มต้นเส้นทางอาชีพในฝันของคุณ",
        "index_cta_p": "ทำแบบทดสอบเพื่อค้นหาความถนัด หรือสำรวจอาชีพต่างๆ",
        "index_cta_quiz_btn": "เริ่มทำแบบทดสอบเลย",
        "index_cta_guide_btn": "คู่มือการใช้งาน",
        "index_featured_h2": "อาชีพที่กำลังเป็นที่ต้องการ",
        "index_feedback_h3": "💬 ช่วยเราพัฒนาให้ดีขึ้น",
        "index_feedback_p": "สละเวลาสักครู่ ทำแบบประเมินความพึงพอใจ (ลิงก์ไปยัง Google Forms)",
        "index_feedback_btn": "ทำแบบประเมิน",

        // --- login.html ---
        "login_back_btn": "← กลับ",
        "login_back_home_btn": "← กลับหน้าหลัก",
        "login_title": "เข้าสู่ระบบ",
        "login_username_label": "ชื่อผู้ใช้ / อีเมล",
        "login_username_placeholder": "กรอกชื่อผู้ใช้หรืออีเมล",
        "login_password_label": "รหัสผ่าน",
        "login_password_placeholder": "กรอกรหัสผ่าน",
        "login_btn": "เข้าสู่ระบบ",
        "login_no_account": "ยังไม่มีบัญชีใช่ไหม?",
        "login_register_btn": "สมัครสมาชิก",
        "login_forgot_pass": "ลืมรหัสผ่าน?",

        // --- register.html ---
        "register_title": "สร้างบัญชี",
        "register_email_label": "อีเมล",
        "register_email_placeholder": "กรอกอีเมลของคุณ",
        "register_pass_label": "รหัสผ่าน",
        "register_pass_placeholder": "อย่างน้อย 8 ตัวอักษร",
        "register_confirm_label": "ยืนยันรหัสผ่าน",
        "register_confirm_placeholder": "กรอกรหัสผ่านอีกครั้ง",
        "register_btn": "สมัครสมาชิก",
        "register_have_account": "มีบัญชีอยู่แล้ว?",
        "register_login_btn": "เข้าสู่ระบบที่นี่",

        // --- (ข้าม quiz.html, result.html) ---
        "quiz_header_back": "← home",
        "quiz_header_close": "X",
        "result_header_back": "← กลับหน้าหลัก",
        
        // --- profile.html ---
        "profile_title": "โปรไฟล์ของฉัน",
        "profile_history_h2": "ประวัติการทำแบบทดสอบ",
        "profile_no_history": "ยังไม่มีประวัติการทำแบบทดสอบที่บันทึกไว้",
        "profile_view_result_btn": "ดูผลลัพธ์นี้",
        
        // --- guide.html ---
        "guide_title": "🚀 คู่มือการใช้งาน Edu Match",
        "guide_subtitle": "เริ่มต้นค้นหาเส้นทางอาชีพของคุณใน 4 ขั้นตอนง่ายๆ",
        
        // --- Modal ---
        "modal_logout_h3": "ออกจากระบบ",
        "modal_logout_p": "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?",
        "modal_logout_cancel": "ยกเลิก",
        "modal_logout_confirm": "ยืนยัน ออกจากระบบ"
    }
};

// 2. ฟังก์ชันเปลี่ยนภาษา
function setLanguage(lang) {
    localStorage.setItem('eduMatchLanguage', lang);
    translatePage(lang);
}

// 3. ฟังก์ชันแปลหน้า
function translatePage(lang) {
    if (!translations[lang]) lang = 'th'; // ถ้าภาษาไม่มีในระบบ ให้ใช้ไทย
    const langDict = translations[lang];

    // วิ่งหาทุก element ที่มี 'data-i18n'
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langDict[key]) {
            // (กันบัค) เช็กว่าเป็น input placeholder หรือไม่
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', langDict[key]);
            } else {
                el.textContent = langDict[key];
            }
        }
    });

    // (พิเศษ) อัปเดตปุ่ม Switcher
    const btnTH = document.getElementById('lang-switcher-th');
    const btnEN = document.getElementById('lang-switcher-en');
    if (btnTH && btnEN) {
        if (lang === 'en') {
            btnEN.classList.add('active');
            btnTH.classList.remove('active');
        } else {
            btnTH.classList.add('active');
            btnEN.classList.remove('active');
        }
    }
}

// 4. ทำงานทันทีเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    // หาภาษาที่เคยเลือกไว้
    const savedLang = localStorage.getItem('eduMatchLanguage') || 'th';
    
    // ติดตั้งปุ่ม
    const btnTH = document.getElementById('lang-switcher-th');
    const btnEN = document.getElementById('lang-switcher-en');
    
    if (btnTH) {
        btnTH.addEventListener('click', () => setLanguage('th'));
    }
    if (btnEN) {
        btnEN.addEventListener('click', () => setLanguage('en'));
    }

    // แปลหน้าเว็บเป็นภาษาที่บันทึกไว้
    translatePage(savedLang);
});