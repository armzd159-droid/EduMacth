// This file controls the quiz logic

// --- 1. DATA (DATA-DRIVEN UI) ---

// --- 1A. ชุดคำถามสั้น (สำหรับ Guest) 12 + 2 = 14 ข้อ ---
const quizDataShort = [
    // R (2 ข้อ)
    { question: "เมื่อมีเวลาว่าง คุณมักจะเลือกทำอะไร?", options: [{ text: "ซ่อมแซมของ, ปลูกต้นไม้", score: "R" }, { text: "อ่านหนังสือ, ค้นคว้า", score: "I" }, { text: "วาดรูป, เล่นดนตรี", score: "A" }, { text: "คุยกับเพื่อน, ไปเข้าค่าย", score: "S" }] },
    { question: "คุณถนัดงานแบบไหนมากกว่ากัน?", options: [{ text: "งานที่ต้องลงมือทำจริง", score: "R" }, { text: "งานที่ทำซ้ำๆ ได้ แต่ต้องเป๊ะ", score: "C" }] },
    // I (2 ข้อ)
    { question: "เมื่อเจอปัญหาที่ซับซ้อน คุณจะเริ่มทำอะไรก่อน?", options: [{ text: "วิเคราะห์ข้อมูลและตรรกะ", score: "I" }, { text: "ระดมสมอง หาวิธีใหม่ๆ", score: "A" }] },
    { question: "คุณชอบเรียนวิชาแนวไหนมากที่สุด?", options: [{ text: "วิทยาศาสตร์, คณิตศาสตร์", score: "I" }, { text: "ศิลปะ, ดนตรี", score: "A" }] },
    // A (2 ข้อ)
    { question: "คุณชอบสภาพแวดล้อมการทำงานแบบไหน?", options: [{ text: "ในสตูดิโอ, พื้นที่อิสระ, ไม่จำเจ", score: "A" }, { text: "ในออฟฟิศ, มีกฎระเบียบชัดเจน", score: "C" }] },
    { question: "คุณอยากให้คนอื่นจดจำคุณว่าอย่างไร?", options: [{ text: "คนที่มีความคิดสร้างสรรค์", score: "A" }, { text: "คนที่ใจดี, ชอบช่วยเหลือ", score: "S" }] },
    // S (2 ข้อ)
    { question: "คุณรู้สึกประสบความสำเร็จ เมื่อไหร่?", options: [{ text: "เมื่อได้ช่วยเหลือ หรือทำให้คนอื่นมีความสุข", score: "S" }, { text: "เมื่อได้เป็นผู้นำ และพาทีมชนะ", score: "E" }] },
    { question: "คุณตัดสินใจเรื่องสำคัญโดยใช้อะไรเป็นหลัก?", options: [{ text: "ความคิดเห็นของคนรอบข้าง", score: "S" }, { text: "ข้อมูลและเหตุผลเป็นหลัก", score: "I" }] },
    // E (2 ข้อ)
    { question: "ในการทำงานกลุ่ม คุณมักจะรับบทบาทไหน?", options: [{ text: "คนนำเสนอ, คนโน้มน้าว", score: "E" }, { text: "คนจดบันทึก, คนคุมเดดไลน์", score: "C" }] },
    { question: "คุณให้ความสำคัญกับอะไรมากที่สุด?", options: [{ text: "ความท้าทาย, การเติบโต", score: "E" }, { text: "ความถูกต้อง, รายละเอียด", score: "C" }] },
    // C (2 ข้อ)
    { question: "คุณถนัดงานแบบไหนมากกว่ากัน?", options: [{ text: "งานที่ทำซ้ำๆ ได้ แต่ต้องเป๊ะ ห้ามพลาด", score: "C" }, { text: "งานที่ต้องติดต่อผู้คนเยอะๆ", score: "S" }] },
    { question: "ถ้าให้เลือกโครงการหนึ่งทำ คุณจะเลือก...", options: [{ text: "โครงการจัดระบบห้องสมุดโรงเรียนใหม่", score: "C" }, { text: "โครงการสร้างหุ่นยนต์กู้ภัย", score: "R" }] },
    // --- 2 ข้อสุดท้าย (เหมือนเดิม) ---
    {
        question: "อาชีพใดที่คุณใฝ่ฝันอยากจะทำในอนาคต?",
        options: [
            { text: "กลุ่ม R (เช่น วิศวกร, เชฟ, นักกีฬา)", score: "R" },
            { text: "กลุ่ม I (เช่น โปรแกรมเมอร์, แพทย์, นักวิทยาศาสตร์)", score: "I" },
            { text: "กลุ่ม A (เช่น กราฟิกดีไซเนอร์, Content Creator)", score: "A" },
            { text: "กลุ่ม S (เช่น ครู, พยาบาล, นักจิตวิทยา)", score: "S" },
            { text: "กลุ่ม E (เช่น นักการตลาด, เจ้าของธุรกิจ, ทนายความ)", score: "E" },
            { text: "กลุ่ม C (เช่น นักบัญชี, นักวิเคราะห์ข้อมูล)", score: "C" },
            { text: "ยังไม่แน่ใจ / ขอดูคำแนะนำจากแบบทดสอบ", score: "None" }
        ],
        isCareerQuestion: true
    },
    {
        question: "ปัจจุบันคุณกำลังศึกษา หรืออยู่ในช่วงวัยใด?",
        options: [
            { text: "มัธยมศึกษาตอนต้น", score: "m1-m3" },
            { text: "มัธยมศึกษาตอนปลาย / ปวช.", score: "m4-pvc" },
            { text: "อุดมศึกษา / ปวส.", score: "uni-pvs" },
            { text: "วัยทำงาน / บุคคลทั่วไป", score: "worker" }
        ],
        isDemographicQuestion: true
    }
];

// --- 1B. [ใหม่!] ชุดคำถามละเอียด (สำหรับ Logged-in) 50 + 2 = 52 ข้อ ---
const quizDataDetailed = [
    // R (8-9 ข้อ)
    { question: "คุณชอบใช้เวลาว่างในการ...", options: [{ text: "ซ่อมแซมจักรยาน หรือ อุปกรณ์ในบ้าน", score: "R" }, { text: "เขียนโปรแกรม หรือ ทดลองวิทยาศาสตร์", score: "I" }] },
    { question: "คุณรู้สึกสบายใจกว่าเมื่อทำงานกับ...", options: [{ text: "เครื่องมือ, เครื่องจักร, หรือสัตว์", score: "R" }, { text: "ผู้คน, การสอน, หรือ การบริการ", score: "S" }] },
    { question: "หลักสูตร 'เกษตรกรรมสมัยใหม่' ฟังดู...", options: [{ text: "น่าสนใจมาก", score: "R" }, { text: "ไม่ค่อยน่าสนใจ", score: "A" }] },
    { question: "คุณชอบทำงานที่ได้ 'เห็นผลลัพธ์เป็นชิ้นเป็นอัน' (เช่น สร้างโต๊ะ, ทำอาหาร)", options: [{ text: "ใช่", score: "R" }, { text: "ไม่จำเป็น", score: "C" }] },
    { question: "คุณถนัดการอ่าน 'แบบแปลน' หรือ 'คู่มือประกอบ' มากกว่าการอ่าน 'บทกวี'", options: [{ text: "ใช่", score: "R" }, { text: "ไม่", score: "A" }] },
    { question: "คุณชอบกิจกรรมกลางแจ้ง (เช่น ปีนเขา, ดำน้ำ) มากกว่าการเดินชมพิพิธภัณฑ์", options: [{ text: "ใช่", score: "R" }, { text: "ไม่", score: "A" }] },
    { question: "คุณสนใจ 'เครื่องยนต์' หรือ 'กลไก' ทำงานอย่างไร", options: [{ text: "ใช่", score: "R" }, { text: "ไม่", score: "S" }] },
    { question: "คุณไม่ชอบงานที่ต้องนั่งโต๊ะทำงานทั้งวัน", options: [{ text: "ใช่", score: "R" }, { text: "ไม่, ชอบ", score: "C" }] },
    
    // I (8-9 ข้อ)
    { question: "เมื่อเจอปัญหา คุณมักจะ...", options: [{ text: "ถอยออกมาวิเคราะห์หาสาเหตุที่แท้จริง", score: "I" }, { text: "ลงมือแก้ปัญหาด้วยวิธีที่เคยทำสำเร็จ", score: "R" }] },
    { question: "คุณชอบอ่านบทความเกี่ยวกับ...", options: [{ text: "การค้นพบทางวิทยาศาสตร์ใหม่ๆ", score: "I" }, { text: "เทรนด์แฟชั่น หรือ ศิลปะร่วมสมัย", score: "A" }] },
    { question: "คุณสนุกกับการ 'แก้โจทย์คณิตศาสตร์' หรือ 'ปริศนาตรรกะ'", options: [{ text: "ใช่", score: "I" }, { text: "ไม่", score: "S" }] },
    { question: "คุณอยากทำงานใน 'ห้องทดลอง' มากกว่า 'ห้องประชุมใหญ่'", options: [{ text: "ใช่", score: "I" }, { text: "ไม่", score: "E" }] },
    { question: "คำว่า 'การวิเคราะห์ข้อมูล' ทำให้คุณรู้สึก...", options: [{ text: "ตื่นเต้น, น่าสนใจ", score: "I" }, { text: "น่าเบื่อ", score: "A" }] },
    { question: "คุณมักจะเป็นคนที่ 'ตั้งคำถาม' ว่า 'ทำไม?' อยู่เสมอ", options: [{ text: "ใช่", score: "I" }, { text: "ไม่", score: "E" }] },
    { question: "คุณชอบวิชา เคมี, ชีววิทยา, หรือ ฟิสิกส์", options: [{ text: "ใช่", score: "I" }, { text: "ไม่", score: "S" }] },
    { question: "คุณชอบค้นคว้าหาข้อมูลเชิงลึก ก่อนที่จะตัดสินใจซื้อของ", options: [{ text: "ใช่", score: "I" }, { text: "ไม่, ใช้ความรู้สึก", score: "A" }] },
    { question: "คุณชอบทำงานที่ซับซ้อนและต้องใช้ความคิดเยอะๆ", options: [{ text: "ใช่", score: "I" }, { text: "ไม่, ชอบงานง่ายๆ", score: "R" }] },
    
    // A (8-9 ข้อ)
    { question: "คุณชอบทำงานที่ 'ไม่มีกฎเกณฑ์ตายตัว' และ 'มีอิสระในการแสดงออก'", options: [{ text: "ใช่มาก", score: "A" }, { text: "ไม่ค่อย, ชอบที่มีแบบแผนชัดเจน", score: "C" }] },
    { question: "คุณมีความสุขเมื่อได้...", options: [{ text: "ออกแบบ, วาดรูป, หรือ เล่นดนตรี", score: "A" }, { text: "จัดระเบียบ, ทำบัญชี, หรือ วางแผน", score: "C" }] },
    { question: "คุณให้ความสำคัญกับ 'ความงาม' หรือ 'สไตล์' มากกว่า 'ประสิทธิภาพการใช้งาน'", options: [{ text: "ใช่", score: "A" }, { text: "ไม่", score: "R" }] },
    { question: "คุณชอบ 'เขียนเรื่องสั้น' มากกว่า 'เขียนรายงานทางวิชาการ'", options: [{ text: "ใช่", score: "A" }, { text: "ไม่", score: "I" }] },
    { question: "สภาพแวดล้อมที่กระตุ้นคุณคือ...", options: [{ text: "สตูดิโอที่เต็มไปด้วยไอเดีย", score: "A" }, { text: "ออฟฟิศที่เงียบและเป็นระเบียบ", score: "C" }] },
    { question: "คุณมักจะแต่งตัว 'แตกต่าง' หรือมีสไตล์เป็นของตัวเอง", options: [{ text: "ใช่", score: "A" }, { text: "ไม่, แต่งตัวคล้ายๆ คนอื่น", score: "C" }] },
    { question: "คุณชอบการ 'ระดมสมอง' (Brainstorming) เพื่อหาไอเดียใหม่ๆ", options: [{ text: "ใช่", score: "A" }, { text: "ไม่, ชอบทำตามขั้นตอน", score: "C" }] },
    { question: "คุณสนใจไป 'นิทรรศการศิลปะ' มากกว่า 'งานสัมมนาธุรกิจ'", options: [{ text: "ใช่", score: "A" }, { text: "ไม่", score: "E" }] },

    // S (8-9 ข้อ)
    { question: "คุณรู้สึกเติมเต็มเมื่อได้...", options: [{ text: "ช่วยเหลือ, สอน, หรือ ให้คำปรึกษาผู้อื่น", score: "S" }, { text: "ทำงานคนเดียวเงียบๆ ให้เสร็จ", score: "I" }] },
    { question: "ในการทำงานกลุ่ม คุณมักจะเป็น...", options: [{ text: "ผู้ประสานงาน, คอยไกล่เกลี่ยให้ทุกคนทำงานร่วมกันได้", score: "S" }, { text: "ผู้เชี่ยวชาญ, คอยหาข้อมูลและข้อเท็จจริง", score: "I" }] },
    { question: "คุณชอบกิจกรรมแบบไหน?", options: [{ text: "งานอาสาสมัคร, ค่ายบริการ", score: "S" }, { text: "การแข่งขันกีฬา, การแข่งขันทางธุรกิจ", score: "E" }] },
    { question: "คุณถนัดในการ 'อ่านความรู้สึก' ของคนอื่น", options: [{ text: "ใช่", score: "S" }, { text: "ไม่", score: "R" }] },
    { question: "คุณอยากเป็น 'นักจิตวิทยา' มากกว่า 'นักบัญชี'", options: [{ text: "ใช่", score: "S" }, { text: "ไม่", score: "C" }] },
    { question: "เพื่อนๆ มักจะมา 'ปรึกษาปัญหา' กับคุณ", options: [{ text: "ใช่, บ่อยๆ", score: "S" }, { text: "ไม่ค่อย", score: "I" }] },
    { question: "คุณชอบทำงาน 'เบื้องหน้า' ที่ได้พบปะผู้คน", options: [{ text: "ใช่", score: "S" }, { text: "ไม่, ชอบเบื้องหลัง", score: "C" }] },
    { question: "คุณมีความอดทนสูงในการ 'สอน' หรือ 'อธิบาย' เรื่องเดิมๆ", options: [{ text: "ใช่", score: "S" }, { text: "ไม่", score: "E" }] },

    // E (8-9 ข้อ)
    { question: "คุณกล้าที่จะ 'นำเสนอ' หรือ 'พูดในที่สาธารณะ'", options: [{ text: "ใช่", score: "E" }, { text: "ไม่, ชอบเป็นผู้ฟังมากกว่า", score: "S" }] },
    { question: "คุณสนุกกับการ 'เจรจาต่อรอง' หรือ 'โน้มน้าวใจ' คนอื่น", options: [{ text: "ใช่", score: "E" }, { text: "ไม่, ชอบทำตามข้อตกลง", score: "C" }] },
    { question: "คุณชอบ 'การแข่งขัน' และ 'ความท้าทาย' มากกว่า 'ความมั่นคง'", options: [{ text: "ใช่", score: "E" }, { text: "ไม่, ชอบความมั่นคง", score: "C" }] },
    { question: "หากมีไอเดียธุรกิจ คุณคือคนที่จะ...", options: [{ text: "ลุยเลย, กล้าเสี่ยง", score: "E" }, { text: "วางแผนอย่างรอบคอบก่อน, ไม่อยากเสี่ยง", score: "C" }] },
    { question: "คุณอยากเป็น 'ผู้จัดการ' หรือ 'เจ้าของธุรกิจ' มากกว่า 'พนักงานปฏิบัติการ'", options: [{ text: "ใช่", score: "E" }, { text: "ไม่", score: "R" }] },
    { question: "คุณชอบที่จะเป็น 'ผู้นำ' มากกว่า 'ผู้ตาม'", options: [{ text: "ใช่", score: "E" }, { text: "ไม่", score: "S" }] },
    { question: "คุณสนใจเรื่อง 'การลงทุน' หรือ 'ตลาดหุ้น'", options: [{ text: "ใช่", score: "E" }, { text: "ไม่", score: "S" }] },
    { question: "คุณมักจะเป็นคน 'เริ่มบทสนทนา' ก่อนเสมอ", options: [{ text: "ใช่", score: "E" }, { text: "ไม่", score: "I" }] },

    // C (8-9 ข้อ)
    { question: "คุณรู้สึก 'ฟิน' เมื่อได้จัดเรียงไฟล์ในคอม หรือ จัดโต๊ะให้เป็นระเบียบ", options: [{ text: "ใช่", score: "C" }, { text: "ไม่", score: "A" }] },
    { question: "คุณชอบทำงานที่ต้องใช้ 'ความแม่นยำ' และ 'ตรวจสอบรายละเอียด'", options: [{ text: "ใช่", score: "C" }, { text: "ไม่, ชอบมองภาพรวม", score: "E" }] },
    { question: "คุณชอบทำงานตาม 'กฎ' หรือ 'ขั้นตอน' ที่ชัดเจน", options: [{ text: "ใช่", score: "C" }, { text: "ไม่, ชอบความยืดหยุ่น", score: "A" }] },
    { question: "คุณถนัดในการ 'วางแผนการเดินทาง' หรือ 'จัดการงบประมาณ'", options: [{ text: "ใช่", score: "C" }, { text: "ไม่", score: "S" }] },
    { question: "คุณชอบ 'ป้อนข้อมูล' (Data Entry) มากกว่า 'ออกแบบโปสเตอร์'", options: [{ text: "ใช่", score: "C" }, { text: "ไม่", score: "A" }] },
    { question: "คุณเกลียดการทำงานที่ 'ผิดพลาด' แม้เพียงเล็กน้อย", options: [{ text: "ใช่, ต้องเป๊ะ", score: "C" }, { text: "ไม่, ผิดพลาดได้", score: "A" }] },
    { question: "คุณชอบ 'ตรวจสอบ' งานของคนอื่น", options: [{ text: "ใช่", score: "C" }, { text: "ไม่", score: "S" }] },
    { question: "คุณชอบสภาพแวดล้อมที่ 'คาดเดาได้' และ 'มั่นคง'", options: [{ text: "ใช่", score: "C" }, { text: "ไม่, น่าเบื่อ", score: "E" }] },
    
    // --- 2 ข้อสุดท้าย (เหมือนเดิม) ---
    {
        question: "อาชีพใดที่คุณใฝ่ฝันอยากจะทำในอนาคต?",
        options: [
            { text: "กลุ่ม R (เช่น วิศวกร, เชฟ, นักกีฬา)", score: "R" },
            { text: "กลุ่ม I (เช่น โปรแกรมเมอร์, แพทย์, นักวิทยาศาสตร์)", score: "I" },
            { text: "กลุ่ม A (เช่น กราฟิกดีไซเนอร์, Content Creator)", score: "A" },
            { text: "กลุ่ม S (เช่น ครู, พยาบาล, นักจิตวิทยา)", score: "S" },
            { text: "กลุ่ม E (เช่น นักการตลาด, เจ้าของธุรกิจ, ทนายความ)", score: "E" },
            { text: "กลุ่ม C (เช่น นักบัญชี, นักวิเคราะห์ข้อมูล)", score: "C" },
            { text: "ยังไม่แน่ใจ / ขอดูคำแนะนำจากแบบทดสอบ", score: "None" }
        ],
        isCareerQuestion: true
    },
    {
        question: "ปัจจุบันคุณกำลังศึกษา หรืออยู่ในช่วงวัยใด?",
        options: [
            { text: "มัธยมศึกษาตอนต้น", score: "m1-m3" },
            { text: "มัธยมศึกษาตอนปลาย / ปวช.", score: "m4-pvc" },
            { text: "อุดมศึกษา / ปวส.", score: "uni-pvs" },
            { text: "วัยทำงาน / บุคคลทั่วไป", score: "worker" }
        ],
        isDemographicQuestion: true
    }
];


// --- 2. STATE MANAGEMENT ---
let currentQuestionIndex = 0;
let userAnswers; 
let userScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
let userGoalCareer = null;
let userDemographic = null;
let quizData; 

// --- 3. DOM ELEMENT REFERENCES ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 3.1. [อัปเกรด] ตรวจสอบ Login และเลือกชุดคำถาม ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    let isDetailedTest = false;

    if (loggedInUser) {
        quizData = quizDataDetailed; // โหลดชุดเต็ม 52 ข้อ
        isDetailedTest = true;
    } else {
        quizData = quizDataShort; // โหลดชุดย่อ 14 ข้อ
        isDetailedTest = false;
    }
    
    userAnswers = new Array(quizData.length).fill(null);
    // ---------------------------------------------------

    const questionNumberEl = document.getElementById('question-number');
    const questionTextEl = document.getElementById('question-text');
    const answerOptionsEl = document.getElementById('answer-options');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressBar = document.getElementById('progress-bar');

    if (!questionTextEl) {
        console.error("Quiz elements not found! Check your HTML.");
        return; 
    }

    // --- 4. FUNCTIONS (LOGIC) ---
    
    function loadQuestion() {
        if (currentQuestionIndex < 0 || currentQuestionIndex >= quizData.length) {
            console.error("Invalid question index:", currentQuestionIndex);
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        questionNumberEl.textContent = `คำถามที่ ${currentQuestionIndex + 1} จาก ${quizData.length}`;
        questionTextEl.textContent = currentQuestion.question;
        
        answerOptionsEl.innerHTML = ''; 
        
        currentQuestion.options.forEach((option, index) => {
            const card = document.createElement('div');
            card.className = 'answer-card';
            card.textContent = option.text;
            card.dataset.index = index; 
            
            if (userAnswers[currentQuestionIndex] === index) {
                card.classList.add('selected');
            }
            
            card.addEventListener('click', () => selectAnswer(index));
            answerOptionsEl.appendChild(card);
        });
        
        updateNavigation();
        updateProgressBar();
    }
    
    function selectAnswer(selectedIndex) {
        userAnswers[currentQuestionIndex] = selectedIndex;
        loadQuestion(); 
        nextBtn.disabled = false; 
    }
    
    function updateNavigation() {
        nextBtn.disabled = (userAnswers[currentQuestionIndex] === null); 
        prevBtn.disabled = (currentQuestionIndex === 0);
        
        if (currentQuestionIndex === quizData.length - 1) {
            nextBtn.textContent = 'ดูผลลัพธ์'; 
        } else {
            nextBtn.textContent = 'ถัดไป';
        }
    }
    
    function updateProgressBar() {
        const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    
    function goToNextQuestion() {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            if (userAnswers[currentQuestionIndex] !== null) {
                calculateResults();
            } else {
                alert('กรุณาเลือกคำตอบก่อนดูผลลัพธ์');
            }
        }
    }
    
    function goToPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }
    
    // --- 4.1 [ยืนยัน] ฟังก์ชัน Calculate (ทำงานถูกต้อง) ---
    function calculateResults() {
        userScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        userGoalCareer = null;
        userDemographic = null;

        userAnswers.forEach((answerIndex, questionIndex) => {
            if (answerIndex === null) return; 
            
            const question = quizData[questionIndex];
            const selectedOption = question.options[answerIndex];
            
            if (!selectedOption) return; 

            if (question.isCareerQuestion) {
                userGoalCareer = selectedOption.score; 
            } else if (question.isDemographicQuestion) {
                userDemographic = selectedOption.score;
            } else if (selectedOption.score.includes('+')) {
                const scores = selectedOption.score.split('+');
                scores.forEach(s => {
                    if (userScores.hasOwnProperty(s)) userScores[s]++;
                });
            } else {
                const scoreType = selectedOption.score; 
                if (userScores.hasOwnProperty(scoreType)) {
                    userScores[scoreType]++;
                }
            }
        });
        
        const sortedScores = Object.entries(userScores).sort((a, b) => b[1] - a[1]);
        
        if (sortedScores.length === 0) {
             console.error("Calculation error, no scores found.");
             return;
        }

        const highestAptitude = sortedScores[0][0]; 
        const secondAptitude = sortedScores[1][0]; 
        
        const results = {
            scores: userScores, 
            topAptitude: highestAptitude,
            secondAptitude: secondAptitude,
            goalCareer: userGoalCareer,
            demographic: userDemographic,
            isDetailed: isDetailedTest 
        };
        
        localStorage.setItem('eduMatchResults', JSON.stringify(results));
        
        window.location.href = 'result.html';
    }

    // --- 5. EVENT LISTENERS ---
    nextBtn.addEventListener('click', goToNextQuestion);
    prevBtn.addEventListener('click', goToPrevQuestion);
    
    // --- INITIAL LOAD ---
    loadQuestion(); 
});