const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const adminPage = document.getElementById('adminPage');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');

// رابط قاعدة البيانات السحابية الخاص بكِ
const databaseURL = "https://kvdb.io/bv2zwCd5LtzL8q9Rk92g5/answers";

let selectedFoodText = "";

// لما الماوس يقرّب من زرار No يهرب
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// التنقل بين الصفحات عند الضغط على الأزرار
yesBtn.addEventListener('click', () => {
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
});

nextBtn1.addEventListener('click', () => {
    page2.classList.add('hidden');
    page3.classList.remove('hidden');
});

window.selectFood = function(element) {
    const items = document.querySelectorAll('.food-item');
    items.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedFoodText = element.innerText;
}

// عند الضغط على Done - حفظ الإجابات أونلاين في السحابة
nextBtn2.addEventListener('click', () => {
    const dateVal = document.getElementById('datePicker').value;
    const timeVal = document.getElementById('timePicker').value;

    const answers = { date: dateVal, time: timeVal, food: selectedFoodText };

    // إرسال البيانات وحفظها أونلاين
    fetch(databaseURL, {
        method: 'POST',
        body: JSON.stringify(answers)
    })
    .then(() => console.log("Answers saved to cloud!"))
    .catch(err => console.log("Error saving:", err));

    // إظهار الرسالة النهائية له
    document.getElementById('summaryDetails').innerHTML = `
        Be ready on: <br>
        📅 ${dateVal || "Any day"} <br>
        ⏰ At: ${timeVal || "Any time"} <br>
        🍽️ We are having: ${selectedFoodText || "Surprise Food"}!
    `;
    page3.classList.add('hidden');
    page4.classList.remove('hidden');
});

// الكود السري ليكي إنتِ عشان تقرأ الإجابات من السحابة
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'answers') {
        page1.classList.add('hidden');
        if(adminPage) adminPage.classList.remove('hidden');
        
        // جلب البيانات المحفوظة أونلاين من السحابة
        fetch(databaseURL)
        .then(res => res.json())
        .then(savedData => {
            const adminDetails = document.getElementById('adminDetails');
            if(savedData && adminDetails) {
                adminDetails.innerHTML = `
                    📅 اليوم المختار: ${savedData.date || 'لم يحدد'} <br>
                    ⏰ الوقت المختار: ${savedData.time || 'لم يحدد'} <br>
                    🍕 الأكل المفضل: ${savedData.food || 'لم يحدد'}
                `;
            }
        })
        .catch(() => {
            const adminDetails = document.getElementById('adminDetails');
            if(adminDetails) adminDetails.innerHTML = "❌ لسه مفيش إجابات اتسجلت أونلاين حتى الآن.";
        });
    }
});