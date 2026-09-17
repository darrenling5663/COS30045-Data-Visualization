document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class for styling the button
            this.classList.toggle('active-faq');
            
            // Get the next sibling element (the answer div)
            const answer = this.nextElementSibling;
            
            // Toggle display block/none
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // 3. Interactive Energy Calculator Logic
    const energyForm = document.getElementById('energy-form');
    if (energyForm) {
        energyForm.addEventListener('submit', function(event) {
            // Prevent the form from refreshing the page
            event.preventDefault();

            // Read values from the DOM
            const wattageInput = document.getElementById('wattage').value;
            const hoursInput = document.getElementById('hours').value;
            const priceInput = document.getElementById('price').value;

            const errorMessage = document.getElementById('error-message');
            const resultsPanel = document.getElementById('results-panel');

            // Parse inputs to floating point numbers
            const watts = parseFloat(wattageInput);
            const hours = parseFloat(hoursInput);
            const priceCents = parseFloat(priceInput);

            // Input Validation
            if (isNaN(watts) || isNaN(hours) || isNaN(priceCents) || watts <= 0 || hours <= 0 || priceCents <= 0) {
                errorMessage.classList.remove('hidden');
                resultsPanel.classList.add('hidden');
                return; // Stop execution if validation fails
            }

            // Hide error message if validation passes
            errorMessage.classList.add('hidden');

            // Calculations
            // Formula: (Watts * Hours) / 1000 = Daily kWh
            const dailyKwh = (watts * hours) / 1000;
            const yearlyKwh = dailyKwh * 365;

            // Price is in cents, convert to dollars for final output
            const dailyCost = (dailyKwh * priceCents) / 100; 
            const yearlyCost = dailyCost * 365;

            // Update DOM Elements with calculated values
            // toFixed(2) ensures we only show 2 decimal places
            document.getElementById('res-daily-kwh').textContent = dailyKwh.toFixed(2);
            document.getElementById('res-yearly-kwh').textContent = yearlyKwh.toFixed(2);
            document.getElementById('res-daily-cost').textContent = dailyCost.toFixed(2);
            document.getElementById('res-yearly-cost').textContent = yearlyCost.toFixed(2);

            // Reveal the results panel
            resultsPanel.classList.remove('hidden');
        });
    }
});