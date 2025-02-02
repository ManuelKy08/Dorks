document.addEventListener('DOMContentLoaded', function () {
    fetch('./src/dorks.json')
        .then(response => response.json())
        .then(dorks => {
            const buttonsContainer = document.getElementById('dorkButtons');
            dorks.forEach(dork => {
                const button = document.createElement('button');
                button.textContent = dork.name;
                button.onclick = () => runDork(dork.dork);
                buttonsContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error loading dorks:', error));

    // Inisialisasi Matriks background
    initMatrixBackground();
});


function initMatrixBackground() {
    const matrixBg = document.querySelector('.matrix-bg');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    function createSpan() {
      const span = document.createElement('span');
      span.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${-100 - (Math.random() * 50)}px`;
      span.style.animationDelay = `${Math.random() * 2}s`;
      span.style.fontSize = `${1 + Math.random() * 0.4}em`
      span.style.animationDuration = `${12 + Math.random()*5}s`;
     
      matrixBg.appendChild(span);
      
       span.addEventListener('animationend', () => {
           span.remove();
        })
    }
    
    setInterval(createSpan, 100)
}

function validateDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
}

function runDork(dork) {
    const domain = document.getElementById('domainInput').value;
    if (domain) {
        if (!validateDomain(domain)) {
            alert('Please enter a valid domain name.');
            return;
        }
        const finalDork = dork.replace('example.com', domain);
        if (finalDork.startsWith('http://') || finalDork.startsWith('https://')) {
            window.open(finalDork, '_blank');
        } else {

            window.open(`https://www.google.com/search?q=${encodeURIComponent(finalDork)}`, '_blank');
        }

    } else {
        alert('Please enter a target domain.');
    }
}
