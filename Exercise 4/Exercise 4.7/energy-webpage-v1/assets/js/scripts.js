document.addEventListener('DOMContentLoaded', () => {
    
    // Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // FAQ Accordion Interactivity
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active-faq');
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // Appliance Energy Calculator Logic
    const energyForm = document.getElementById('energy-form');
    if (energyForm) {
        energyForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const wattageInput = document.getElementById('wattage').value;
            const hoursInput = document.getElementById('hours').value;
            const priceInput = document.getElementById('price').value;

            const errorMessage = document.getElementById('error-message');
            const resultsPanel = document.getElementById('results-panel');

            const watts = parseFloat(wattageInput);
            const hours = parseFloat(hoursInput);
            const priceCents = parseFloat(priceInput);

            if (isNaN(watts) || isNaN(hours) || isNaN(priceCents) || watts <= 0 || hours <= 0 || priceCents <= 0) {
                errorMessage.classList.remove('hidden');
                resultsPanel.classList.add('hidden');
                return;
            }

            errorMessage.classList.add('hidden');

            const dailyKwh = (watts * hours) / 1000;
            const yearlyKwh = dailyKwh * 365;
            const dailyCost = (dailyKwh * priceCents) / 100;
            const yearlyCost = dailyCost * 365;

            document.getElementById('res-daily-kwh').textContent = dailyKwh.toFixed(2);
            document.getElementById('res-yearly-kwh').textContent = yearlyKwh.toFixed(2);
            document.getElementById('res-daily-cost').textContent = dailyCost.toFixed(2);
            document.getElementById('res-yearly-cost').textContent = yearlyCost.toFixed(2);

            resultsPanel.classList.remove('hidden');
        });
    }
});