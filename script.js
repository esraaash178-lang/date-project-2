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

// الكود المطور لقراءة الإجابات بدون أخطاء
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('view') === 'answers') {
    // إخفاء كل الصفحات وإظهار صفحة الأدمن
    document.querySelectorAll('.card').forEach(card => card.classList.add('hidden'));
    const adminPage = document.getElementById('adminPage');
    const adminDetails = document.getElementById('adminDetails');
    
    if (adminPage) adminPage.classList.remove('hidden');

    fetch('https://kvdb.io/bv2zwCd5LtzL8q9Rk92g5/answers')
        .then(response => {
            if (response.status === 404) {
                return null; // لو مفيش إجابات لسه متسجلة
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                if (adminDetails) {
                    adminDetails.innerHTML = "لسه مفيش إجابات اتسجلت يا إسراء! ☁️<br><br>جربي ادخلي على اللينك العادي الأول واختاري (يوم ووقت وأكلة) ودوسي Done عشان البيانات تتخزن.";
                }
            } else {
                if (adminDetails) {
                    adminDetails.innerHTML = `
                        📅 <b>اليوم المختار:</b> ${data.day || 'لم يحدد'}<br>
                        ⏰ <b>الوقت المختار:</b> ${data.time || 'لم يحدد'}<br>
                        🍔 <b>الأكلة المختارة:</b> ${data.food || 'لم يحدد'}
                    `;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (adminDetails) adminDetails.innerText = "حصل مشكلة أثناء الاتصال بالسحابة!";
        });
}