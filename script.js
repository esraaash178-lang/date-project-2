const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');

// حركة هروب زرار No لما الماوس يقرّب منه
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    // رابط قاعدة البيانات السحابية الخاص بكِ بعد التعديل
const databaseURL = "https://kvdb.io/bv2zwCd5LtzL8q9Rk92g5/answers";
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

nextBtn2.addEventListener('click', () => {
    page3.classList.add('hidden');
    page4.classList.remove('hidden');
});

// اختيار الأكل
window.selectFood = function(element) {
    const items = document.querySelectorAll('.food-item');
    items.forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
}