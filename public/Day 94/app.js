const focusInput = document.getElementById('focusInput');
const setBtn = document.getElementById('setBtn');
const displayArea = document.getElementById('displayArea');
const focusText = document.getElementById('focusText');
const clearBtn = document.getElementById('clearBtn');

const savedFocus = localStorage.getItem('dailyFocus');
if (savedFocus) {
    showFocus(savedFocus);
}

setBtn.addEventListener('click', () => {
    const text = focusInput.value;
    if (text) {
        localStorage.setItem('dailyFocus', text);
        showFocus(text);
    }
});

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('dailyFocus');
    focusInput.value = '';
    displayArea.classList.add('hidden');
    document.querySelector('.input-group').classList.remove('hidden');
});

function showFocus(text) {
    focusText.innerText = text;
    document.querySelector('.input-group').classList.add('hidden');
    displayArea.classList.remove('hidden');
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.log('Service Worker registration failed', err));
    });
}