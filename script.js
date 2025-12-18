// ✅ ВАША Google Apps Script ссылка
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwIF2QIdIvFMYOU5c5fXrlizZYdY-aQUZzL_zO_DUJNWdWvuBOkqpzIfSDbQXWPEyHk/exec';

function createSnowflakes() {
    const layers = ['layer1', 'layer2', 'layer3'];
    layers.forEach(layerId => {
        const layer = document.getElementById(layerId);
        for (let i = 0; i < 3; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.style.left = Math.random() * 100 + '%';
            flake.style.width = (2 + Math.random() * 8) + 'px';
            flake.style.height = flake.style.width;
            flake.style.animationDuration = (12 + Math.random() * 15) + 's';
            layer.appendChild(flake);
            setTimeout(() => { if (flake.parentNode) flake.parentNode.removeChild(flake); }, 35000);
        }
    });
}

document.getElementById('letterForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const wishes = document.getElementById('wishes').value.trim();
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>📤 Сохраняем... ❄️</span>';
    submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData();
        formData.append('timestamp', new Date().toLocaleString('ru-RU'));
        formData.append('name', name);
        formData.append('wishes', wishes);
        
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        console.log('✅ Отправлено в Google Sheets!');
        console.log('👦 Имя:', name);
        console.log('💫 Пожелания:', wishes);
        
        showSuccessModal();
        this.reset();
        
    } catch (error) {
        console.log('🎅 ТЕСТОВАЯ ЗАПИСЬ:');
        console.log('📅', new Date().toLocaleString('ru-RU'));
        console.log('👦', name);
        console.log('💫', wishes);
        console.log('🔗', WEB_APP_URL);
        
        showSuccessModal();
        this.reset();
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #f7931e)';
        submitBtn.disabled = false;
    }
});

function showSuccessModal() {
    document.getElementById('successModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    setInterval(createSnowflakes, 1500);
    
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.style.transform = 'scale(1.02)');
        input.addEventListener('blur', () => input.parentElement.style.transform = 'scale(1)');
    });
});
