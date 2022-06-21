(() => {
  ('use strict');

  // Set up variables.
  const price = document.getElementById('price');
  const dp = document.getElementById('dp');
  const rate = document.getElementById('rate');
  const period = document.getElementById('period');
  const result = document.getElementById('result');
  const calculate = document.getElementById('calculate');
  const clear = document.getElementById('clear');

  // Button click event.
  calculate.addEventListener('click', e => {
    e.preventDefault();

    // Set up variables.
    const priceVal = price.value;
    const dpVal = dp.value;
    const rateVal = rate.value;
    const periodVal = period.value;

    // Validation
    if (checkNumber(priceVal) === false) {
      alert('Please enter a valid number for the Car Price.');
      price.focus();
      return false;
    }

    if (checkNumber(dpVal) === false) {
      alert('Please enter a valid number for the Down Payment.');
      dp.focus();
      return false;
    }

    if (checkNumber(rateVal) === false) {
      alert('Please enter a valid number for the Interest Rate.');
      rate.focus();
      return false;
    }

    if (checkNumber(periodVal) === false) {
      alert('Please enter the Loan Period (years).');
      period.focus();
      return false;
    }

    // The calculator.
    const principle = parseFloat(priceVal) - parseFloat(dpVal);
    const interest = parseFloat(rateVal) / 100 / 12;
    const periodCalc = parseFloat(periodVal) * 12;
    const x = Math.pow(1 + interest, periodCalc);
    const monthly = (principle * x * interest) / (x - 1);
    const totalCalc = monthly.toFixed(2);

    result.innerHTML = formatNumber(totalCalc) + '&#47;month';
    clear.style.display = 'inline-block';
  });

  // Clear button
  clear.addEventListener('click', e => {
    e.preventDefault();

    // Clear fields
    price.value = '';
    dp.value = '';
    rate.value = '';
    period.value = '';
    result.innerHTML = '';

    // Hide clear & copy button
    clear.style.display = 'none';
  });

  // Number validation
  function checkNumber(num) {
    const filter = /(^\d+\.?$)|(^\d*\.\d+$)/;
    if (filter.test(num)) {
      return true;
    }
    return false;
  }

  // Format number
  // https://stackoverflow.com/a/25377176
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
})();
