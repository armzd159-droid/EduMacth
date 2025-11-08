// This file controls the result page logic

// --- 1. DATA (Database Mockup) ---
// [สำคัญ!] ฐานข้อมูลต้องอยู่ที่นี่
const careerDataSimple = {
    "R": { name: "นักปฏิบัติ (The Doer)", description: "คุณเป็นคนชอบลงมือทำ, ใช้ร่างกาย, และถนัดงานช่างหรือกิจกรรมกลางแจ้ง", careers: ["วิศวกรโยธา", "เชฟ", "ช่างเทคนิค"], fields: { "วิศวกรรมศาสตร์": ["โยธา", "เครื่องกล"], "คหกรรมศาสตร์": ["โภชนาการ", "การโรงแรม"] } },
    "I": { name: "นักคิด (The Thinker)", description: "คุณเป็นคนช่างสังเกต, ชอบวิเคราะห์, และมักจะหาเหตุผลและข้อมูลมาสนับสนุนการตัดสินใจ", careers: ["โปรแกรมเมอร์", "แพทย์", "นักวิทยาศาสตร์ข้อมูล"], fields: { "วิทยาการคอมพิวเตอร์": ["AI", "Cybersecurity", "Data Science"], "แพทยศาสตร์": ["แพทย์ทั่วไป", "เภสัชกร"] } },
    "A": { name: "นักสร้างสรรค์ (The Creator)", description: "คุณเป็นคนมีจินตนาการ, รักในศิลปะ, และไม่ชอบการทำงานในกรอบเดิมๆ", careers: ["กราฟิกดีไซเนอร์", "Content Creator", "สถาปนิก"], fields: { "นิเทศศาสตร์": ["โฆษณา", "ดิจิทัลมีเดีย"], "มัณฑนศิลป์": ["ออกแบบภายใน", "แฟชั่น"] } },
    "S": { name: "ผู้ช่วยเหลือ (The Helper)", description: "คุณเป็นคนใจดี, ชอบช่วยเหลือผู้อื่น, และมีความสุขที่ได้ทำงานเป็นทีม", careers: ["ครู", "พยาบาล", "นักจิตวิทยา"], fields: { "ครุศาสตร์/ศึกษาศาสตร์": ["ประถม", "มัธยม"], "พยาบาลศาสตร์": ["พยาบาลวิชาชีพ"], "จิตวิทยา": ["จิตวิทยาคลินิก"] } },
    "E": { name: "นักบริหาร (The Persuader)", description: "คุณเป็นคนกล้าแสดงออก, ชอบการแข่งขัน, และถนัดการบริหารจัดการหรือโน้มน้าวใจคน", careers: ["นักการตลาด", "เจ้าของธุรกิจ", "ทนายความ"], fields: { "บริหารธุรกิจ": ["การตลาด", "การเงิน"], "นิเทศศาสตร์ (ประยุกต์)": ["การโฆษณา", "PR"], "นิติศาสตร์": ["กฎหมายธุรกิจ"] } },
    "C": { name: "นักจัดการ (The Organizer)", description: "คุณเป็นคนมีระเบียบ, รอบคอบ, และถนัดการทำงานกับข้อมูล ตัวเลข หรือตามแบบแผน", careers: ["นักบัญชี", "นักวิเคราะห์ข้อมูล", "บรรณารักษ์"], fields: { "การบัญชี": ["บัญชีการเงิน", "บัญชีบริหาร"], "การเงิน": ["การธนาคาร", "การลงทุน"], "เศรษฐศาสตร์": ["เศรษฐศาสตร์จุลภาค"] } }
};
const careerDataFull = {
    "R": { name: "นักปฏิบัติ (The Doer)", description: "คุณเป็นคนชอบลงมือทำ, ใช้ร่างกาย, และถนัดงานช่างหรือกิจกรรมกลางแจ้ง", careers: ["วิศวกรโยธา", "เชฟ", "ช่างเทคนิค", "นักบิน", "นักกีฬาอาชีพ", "สัตวแพทย์", "ผู้รับเหมาก่อสร้าง", "ช่างภาพภาคสนาม", "นักธรณีวิทยา", "พนักงานขับรถบรรทุก", "เจ้าหน้าที่ป่าไม้", "เกษตรกรสมัยใหม่"], fields: { "วิศวกรรมศาสตร์": ["โยธา", "เครื่องกล", "ไฟฟ้า", "การบิน"], "คหกรรมศาสตร์": ["โภชนาการ", "การโรงแรม", "การจัดการครัว"], "เกษตรศาสตร์": ["พืชสวน", "สัตวบาล", "ประมง"], "สัตวแพทยศาสตร์": ["สัตวแพทย์"] } },
    "I": { name: "นักคิด (The Thinker)", description: "คุณเป็นคนช่างสังเกต, ชอบวิเคราะห์, และมักจะหาเหตุผลและข้อมูลมาสนับสนุนการตัดสินใจ", careers: ["โปรแกรมเมอร์", "แพทย์", "นักวิทยาศาสตร์ข้อมูล", "นักวิจัย", "วิศวกร AI", "นักสถิติ", "นักวิเคราะห์ระบบ", "เภสัชกร", "ทันตแพทย์", "นักคณิตศาสตร์ประกันภัย", "นักเศรษฐศาสตร์", "นักโบราณคดี"], fields: { "วิทยาการคอมพิวเตอร์": ["AI", "Cybersecurity", "Data Science", "Web Development", "HCI"], "แพทยศาสตร์": ["แพทย์ทั่วไป", "ศัลยแพทย์", "จิตแพทย์"], "ทันตแพทยศาสตร์": ["ทันตแพทย์"], "เภสัชศาสตร์": ["เภสัชกร"], "วิทยาศาสตร์ (พื้นฐาน)": ["เคมี", "ชีววิทยา", "ฟิสิกส์", "คณิตศาสตร์"] } },
    "A": { name: "นักสร้างสรรค์ (The Creator)", description: "คุณเป็นคนมีจินตนาการ, รักในศิลปะ, และไม่ชอบการทำงานในกรอบเดิมๆ", careers: ["กราฟิกดีไซเนอร์", "Content Creator", "สถาปนิก", "นักออกแบบ UX/UI", "นักเขียน", "นักดนตรี", "ผู้กำกับภาพยนตร์", "Art Director", "มัณฑนากร", "นักออกแบบแฟชั่น", "แอนิเมเตอร์", "ช่างภาพสตูดิโอ"], fields: { "นิเทศศาสตร์": ["โฆษณา", "ดิจิทัลมีเดีย", "วารสารศาสตร์", "ภาพยนตร์"], "มัณฑนศิลป์ / ศิลปกรรม": ["ออกแบบภายใน", "ออกแบบผลิตภัณฑ์", "แฟชั่น", "ออกแบบนิเทศศิลป์"], "สถาปัตยกรรมศาสตร์": ["สถาปัตยกรรมหลัก", "ภูมิสถาปัตย์", "ออกแบบผังเมือง"], "อักษรศาสตร์": ["ภาษาและวรรณคดี"] } },
    "S": { name: "ผู้ช่วยเหลือ (The Helper)", description: "คุณเป็นคนใจดี, ชอบช่วยเหลือผู้อื่น, และมีความสุขที่ได้ทำงานเป็นทีม", careers: ["ครู", "พยาบาล", "นักจิตวิทยา", "นักสังคมสงเคราะห์", "นักกายภาพบำบัด", "HR (ฝ่ายบุคคล)", "ที่ปรึกษา (Counselor)", "นักกิจกรรมบำบัด", "ผู้จัดการฝ่ายบริการลูกค้า", "ล่าม", "พนักงานต้อนรับบนเครื่องบิน"], fields: { "ครุศาสตร์/ศึกษาศาสตร์": ["ประถม", "มัธยม", "การสอนภาษา", "จิตวิทยาการศึกษา"], "พยาบาลศาสตร์": ["พยาบาลวิชาชีพ"], "จิตวิทยา": ["จิตวิทยาคลินิก", "จิตวิทยาองค์กร", "จิตวิทยาการปรึกษา"], "สังคมสงเคราะห์ศาสตร์": ["นักสังคมสงเคราะห์"], "สหเวชศาสตร์": ["กายภาพบำบัด", "กิจกรรมบำบัด"] } },
    "E": { name: "นักบริหาร (The Persuader)", description: "คุณเป็นคนกล้าแสดงออก, ชอบการแข่งขัน, และถนัดการบริหารจัดการหรือโน้มน้าวใจคน", careers: ["นักการตลาด", "เจ้าของธุรกิจ", "ทนายความ", "ผู้จัดการโครงการ (PM)", "เซลล์ (Sales)", "นักการเมือง", "โบรกเกอร์หุ้น", "Event Manager", "นักพัฒนาอสังหาริมทรัพย์", "ผู้บริหาร (CEO)", "นักเจรจาต่อรอง"], fields: { "บริหารธุรกิจ": ["การตลาด", "การเงิน", "การจัดการ", "ธุรกิจระหว่างประเทศ"], "นิเทศศาสตร์ (ประยุกต์)": ["การโฆษณา", "การประชาสัมพันธ์"], "นิติศาสตร์": ["กฎหมายธุรกิจ", "กฎหมายมหาชน"], "รัฐศาสตร์": ["การเมืองการปกครอง", "ความสัมพันธ์ระหว่างประเทศ"], "เศรษฐศาสตร์": ["เศรษฐศาสตร์การเงิน"] } },
    "C": { name: "นักจัดการ (The Organizer)", description: "คุณเป็นคนมีระเบียบ, รอบคอบ, และถนัดการทำงานกับข้อมูล ตัวเลข หรือตามแบบแผน", careers: ["นักบัญชี", "นักวิเคราะห์ข้อมูล (BI)", "บรรณารักษ์", "ผู้ตรวจสอบบัญชี (Auditor)", "Logistics Manager", "ธุรการ", "นักสถิติ", "ผู้ช่วยผู้บริหาร", "เจ้าหน้าที่ธนาคาร (ปฏิบัติการ)", "นักวิเคราะห์การเงิน"], fields: { "การบัญชี": ["บัญชีการเงิน", "บัญชีบริหาร", "การตรวจสอบบัญชี"], "การเงิน": ["การธนาคาร", "การลงทุน", "การเงินองค์กร"], "เศรษฐศาสตร์": ["เศรษฐศาสตร์จุลภาค", "เศรษฐศาสตร์มหภาค"], "โลจิสติกส์": ["การจัดการโลจิสติกส์"], "สารสนเทศศาสตร์": ["บรรณารักษ์"] } }
};
// --- จบส่วนฐานข้อมูล ---


document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2.1 ดึงผลลัพธ์และตั้งค่า ---
    let results; 
    let careerData;
    let careersToShowCount; 
    const loggedInUser = localStorage.getItem('loggedInUser');
    const saveResultBox = document.getElementById('save-result-box');

    try {
        const resultsData = localStorage.getItem('eduMatchResults');
        if (!resultsData) {
            document.body.innerHTML = "<h1>ไม่พบผลลัพธ์</h1><p>กรุณากลับไปทำแบบทดสอบก่อน</p><a href='quiz.html'>กลับไปทำแบบทดสอบ</a>";
            return;
        }
        results = JSON.parse(resultsData); 

        if (!results || typeof results.topAptitude === 'undefined' || typeof results.isDetailed === 'undefined') {
            console.error("ผลลัพธ์เสียหาย:", results);
            throw new Error("Invalid results object"); 
        }

        if (results.isDetailed) {
            careerData = careerDataFull; 
            careersToShowCount = 10; 
        } else {
            careerData = careerDataSimple; 
            careersToShowCount = 3; 
        }

    } catch (error) {
        console.error("Failed to parse results:", error);
        document.body.innerHTML = "<h1>เกิดข้อผิดพลาดในการประมวลผล</h1><p>ข้อมูลผลลัพธ์อาจเสียหาย กรุณาทำแบบทดสอบใหม่อีกครั้ง</p><a href='quiz.html'>กลับไปทำแบบทดสอบ</a>";
        return;
    }
    
    // --- 2.2 [ย้ายมาทำก่อน] เช็กการล็อกอินและซ่อนปุ่มสมัคร ---
    if (loggedInUser) {
        // --- ถ้าล็อกอินแล้ว ---
        console.log("User is logged in. Auto-saving results...");
        
        if (!results.date) { results.date = new Date().toISOString(); }
        const userHistoryKey = loggedInUser + '_savedResults';
        let history = [];
        try { history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]'); } catch (e) { history = []; }
        history.push(results);
        localStorage.setItem(userHistoryKey, JSON.stringify(history));

        if (saveResultBox) {
            saveResultBox.innerHTML = `<h3><span style="color: #28a745;">✓</span> บันทึกผลลัพธ์นี้ในบัญชี '${loggedInUser}' เรียบร้อยแล้ว</h3><p>คุณสามารถกลับมาดูผลลัพธ์นี้ได้ทุกเมื่อในหน้า <a href="profile.html">โปรไฟล์ของคุณ</a></p>`;
            saveResultBox.style.borderColor = '#28a745'; 
            saveResultBox.style.display = 'block'; 
        }
    } else {
        // --- ถ้าเป็น Guest ---
        if (saveResultBox) {
            saveResultBox.style.display = 'block'; 
        }
        console.log("User is a guest. Showing CTA to register.");
    }
    // ------------------------------------

    // --- 2.3 DOM REFERENCES (ส่วนที่เหลือ) ---
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const matchTitle = document.getElementById('match-title');
    const matchInsight = document.getElementById('match-insight');
    const tabGoalBtn = document.querySelector('[data-tab="tab-goal"]');
    const tabAptitudeBtn = document.querySelector('[data-tab="tab-aptitude"]');
    const tabGoalContent = document.getElementById('tab-goal');
    const tabAptitudeContent = document.getElementById('tab-aptitude');
    const goalAccordionContainer = document.getElementById('goal-fields-accordion');
    const aptitudeAccordionContainer = document.getElementById('aptitude-fields-accordion');
    const goalCareerTitle = document.getElementById('goal-career-title');
    const aptitudeCareerTitle = document.getElementById('aptitude-career-title');
    const goalCareerRecs = document.getElementById('goal-career-recs');
    const aptitudeCareerRecs = document.getElementById('aptitude-career-recs');
    const goalCareerHeader = tabGoalContent.querySelector('h4');
    const aptitudeCareerHeader = tabAptitudeContent.querySelector('h4');
    
    // --- 2.4 DATA PROCESSING ---
    const topAptitudeData = careerData[results.topAptitude];
    const goalCareerData = (results.goalCareer && results.goalCareer !== "None") ? careerData[results.goalCareer] : null;

    // --- [โค้ดกันบัค] ---
    if (!topAptitudeData) {
        console.error(`ไม่พบข้อมูลสำหรับสาย ${results.topAptitude} ในฐานข้อมูล`);
        document.body.innerHTML = "<h1>เกิดข้อผิดพลาด</h1><p>ไม่สามารถโหลดข้อมูลผลลัพธ์ได้ (Error: Invalid Aptitude Key)</p><a href='quiz.html'>กลับไปทำแบบทดสอบ</a>";
        return; 
    }
    
    // --- 2.5 HELPER FUNCTIONS ---
    function buildCareerTags(careerList) {
        if (!careerList) return ''; 
        const careersToShow = careerList.slice(0, careersToShowCount);
        return careersToShow.map(c => `<span class="career-tag">${c}</span>`).join('');
    }
    function buildFieldsHTML(fieldsObject) {
        let html = '';
        if (!fieldsObject) return ''; 
        for (const [coreField, specializations] of Object.entries(fieldsObject)) {
            html += `<div class="field-card"> <h3 class="field-card-header">${coreField}</h3> <div class="field-card-content"> <h4>แขนงวิชาเฉพาะทาง (Deep Specializations):</h4><ul>${specializations.map(spec => `<li>${spec}</li>`).join('')}</ul></div></div>`;
        }
        return html;
    }

    // --- 2.6 RENDER UI (ปรับ Logic ใหม่) ---
    
    // 1. แสดงผลการ์ดสรุป (ทำเสมอ)
    resultTitle.textContent = `ผลทดสอบ: คุณคือ "${topAptitudeData.name}"`;
    resultDescription.textContent = topAptitudeData.description;

    // 2. แสดงแท็บ "ความถนัด" (ทำเสมอ)
    tabAptitudeBtn.classList.add('active');
    tabAptitudeContent.classList.add('active');
    aptitudeCareerHeader.textContent = `อาชีพที่แนะนำ (Top ${careersToShowCount}) ในสาย ${results.topAptitude}`;
    aptitudeCareerRecs.innerHTML = buildCareerTags(topAptitudeData.careers);
    aptitudeCareerTitle.textContent = `สาขาวิชาสำหรับ: "${topAptitudeData.name}"`;
    aptitudeAccordionContainer.innerHTML = buildFieldsHTML(topAptitudeData.fields);

    // 3. ตรวจสอบ "เป้าหมาย"
    if (goalCareerData) {
        // [กันบัค] เช็กว่า goalCareerData มีจริง
        if (!goalCareerData) {
             console.error(`ไม่พบข้อมูลสำหรับสายเป้าหมาย ${results.goalCareer} ในฐานข้อมูล`);
             // ถ้าพัง ก็ให้โชว์แค่ผลลัพธ์ความถนัด (ซึ่งทำไปแล้ว)
             matchTitle.textContent = "คุณยังไม่แน่ใจเป้าหมายอาชีพ";
             matchInsight.textContent = "ไม่เป็นไร! ลองมาดูอาชีพที่ตรงกับความถนัดของคุณกัน";
             tabGoalBtn.style.display = 'none'; // ซ่อนแท็บเป้าหมายที่พัง
        } else {
            // --- 3A. ถ้าผู้ใช้ "มีเป้าหมาย" (และไม่พัง) ---
            matchTitle.textContent = `เป้าหมายของคุณ: "${goalCareerData.name}"`;
            if (results.topAptitude === results.goalCareer) { matchInsight.textContent = "💡 ยอดเยี่ยม! ความถนัดและเป้าหมายของคุณตรงกัน"; } else { matchInsight.textContent = `💡 ความถนัดของคุณ (${topAptitudeData.name}) และเป้าหมายของคุณ (${goalCareerData.name}) สามารถผสมผสานกันได้!`; }

            // สลับ Active Tab ให้ "เป้าหมาย" นำ
            tabAptitudeBtn.classList.remove('active');
            tabAptitudeContent.classList.remove('active');
            tabGoalBtn.classList.add('active');
            tabGoalContent.classList.add('active');

            // แสดงผลแท็บ "เป้าหมาย"
            goalCareerHeader.textContent = `อาชีพที่แนะนำ (Top ${careersToShowCount}) ในสาย ${results.goalCareer}`;
            goalCareerRecs.innerHTML = buildCareerTags(goalCareerData.careers);
            goalCareerTitle.textContent = `สาขาวิชาสำหรับ: "${goalCareerData.name}"`;
            goalAccordionContainer.innerHTML = buildFieldsHTML(goalCareerData.fields);
        }
    } else {
        // --- 3B. ถ้าผู้ใช้เลือก "ยังไม่แน่ใจ" ---
        matchTitle.textContent = "คุณยังไม่แน่ใจเป้าหมายอาชีพ";
        matchInsight.textContent = "ไม่เป็นไร! ลองมาดูอาชีพที่ตรงกับความถนัดของคุณกัน";
        
        // [แก้ไข] เราจะ "เปลี่ยน" แท็บเป้าหมาย เป็น "ความถนัดรอง"
        const secondAptitudeData = careerData[results.secondAptitude];
        if (secondAptitudeData) {
            tabGoalBtn.innerHTML = `🌟 ความถนัดรอง: ${secondAptitudeData.name}`; // เปลี่ยนชื่อปุ่ม
            goalCareerHeader.textContent = `อาชีพที่แนะนำ (Top ${careersToShowCount}) ในสาย ${results.secondAptitude}`;
            goalCareerRecs.innerHTML = buildCareerTags(secondAptitudeData.careers);
            goalCareerTitle.textContent = `สาขาวิชาสำหรับ: "${secondAptitudeData.name}"`;
            goalAccordionContainer.innerHTML = buildFieldsHTML(secondAptitudeData.fields);
        } else {
            // ถ้าไม่มีแม้แต่ความถนัดรอง (กันไว้)
            tabGoalBtn.style.display = 'none'; // ซ่อนไปเลย
        }
    }
    
    
    // --- 2.7 Tab logic (เหมือนเดิม) ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- 2.8 ลบผลลัพธ์ชั่วคราว ---
    // (เราย้าย checkIfUserIsLoggedIn ไปไว้บนสุดแล้ว)
    localStorage.removeItem('eduMatchResults'); 
});