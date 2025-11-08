// This file controls the profile.html page

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ตรวจสอบการล็อกอิน (Protected Route) ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        // ถ้ายังไม่ล็อกอิน, ส่งกลับไปหน้า Login ทันที
        alert('กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์ของคุณ');
        window.location.href = 'login.html';
        return; // หยุดการทำงานทันที
    }

    // --- 2. อ้างอิง DOM Elements ---
    const profileUsernameEl = document.getElementById('profile-username');
    const profileEmailEl = document.getElementById('profile-email-display');
    const historyListContainer = document.getElementById('history-list-container');

    // --- 3. แสดงข้อมูลผู้ใช้ ---
    profileUsernameEl.textContent = loggedInUser;
    // (เราสามารถเพิ่มการแสดงอีเมลได้ ถ้าเราเก็บแยกไว้)
    // profileEmailEl.textContent = "อีเมล: " + (localStorage.getItem('userEmail') || 'N/A');

    // --- 4. โหลดประวัติ (History) ---
    const userHistoryKey = loggedInUser + '_savedResults';
    let history = [];

    try {
        history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
    } catch (e) {
        console.error('ไม่สามารถอ่านข้อมูลประวัติได้:', e);
        history = [];
    }

    // --- 5. [อัปเกรด!] วาดการ์ดประวัติลงบนหน้าเว็บ (แบบติดปุ่มได้) ---
    if (history.length === 0) {
        // กรณีไม่มีประวัติ
        historyListContainer.innerHTML = '<p class="no-history">ยังไม่มีประวัติการทำแบบทดสอบที่บันทึกไว้</p>';
    
    } else {
        // กรณีมีประวัติ
        historyListContainer.innerHTML = ''; // เคลียร์ของเก่า
        
        // เราจะเรียงจากใหม่ไปเก่า (reverse) แล้วค่อยวาด
        history.reverse().forEach((result) => { 
            
            // (สร้างข้อความต่างๆ)
            const resultDate = result.date ? new Date(result.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : `(ไม่ทราบวันที่)`;
            const aptitudeText = `สายถนัด: ${result.topAptitude}`;
            const goalText = (result.goalCareer && result.goalCareer !== "None") ? `เป้าหมาย: สาย ${result.goalCareer}` : 'เป้าหมาย: ยังไม่แน่ใจ';
            const quizType = result.isDetailed ? ' (ชุดเต็ม 50+ ข้อ)' : ' (ชุดย่อ 14 ข้อ)';

            // 1. สร้าง <div> (Element)
            const cardElement = document.createElement('div');
            cardElement.className = 'history-card';
            
            // 2. ใส่ HTML (Inner HTML)
            //    [อัปเกรด!] ลบ 'disabled' ออกจากปุ่ม
            cardElement.innerHTML = `
                <span class="history-date">${resultDate} ${quizType}</span>
                <div class="history-main">
                    <span class="history-aptitude">${aptitudeText}</span>
                    <span class="history-goal">${goalText}</span>
                </div>
                <button class="button secondary history-button">ดูผลลัพธ์นี้</button>
            `;
            
            // 3. หาปุ่มที่เพิ่งสร้าง
            const viewButton = cardElement.querySelector('.history-button');
            
            // 4. "ติด" Event Listener ให้ปุ่ม
            if (viewButton) {
                viewButton.addEventListener('click', () => {
                    // นี่คือ "เคล็ดลับ" ครับ
                    // เรา "แกล้ง" ว่าผู้ใช้เพิ่งทำเทสเสร็จ
                    // โดยเอาผลลัพธ์เก่านี้ ไปใส่ใน key 'eduMatchResults'
                    
                    viewButton.textContent = 'กำลังโหลด...';
                    
                    // 1. บันทึกผลลัพธ์เก่าลงใน "key ชั่วคราว"
                    localStorage.setItem('eduMatchResults', JSON.stringify(result));
                    
                    // 2. ส่งไปหน้า result.html
                    // (result.js จะอ่านคีย์นี้และแสดงผลอัตโนมัติ)
                    window.location.href = 'result.html';
                });
            }
            
            // 5. เพิ่มการ์ดนี้ลงในหน้าเว็บ
            historyListContainer.appendChild(cardElement);
        });
    }
});