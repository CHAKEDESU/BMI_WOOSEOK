const form = document.querySelector('#bmi-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  calculateBMI();
});

function calculateBMI() {
  const heightCm = Number(document.querySelector('#height').value);
  const weightKg = Number(document.querySelector('#weight').value);

  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    alert('키와 몸무게를 올바르게 입력해 주세요.');
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let state;
  let message;
  let stateClass;

  if (bmi >= 25) {
    state = '비만';
    message = '체중 관리가 필요한 구간이에요. 생활 습관을 점검해 보세요.';
    stateClass = 'obesity';
  } else if (bmi >= 23) {
    state = '과체중';
    message = '정상 범위보다 높은 구간이에요. 규칙적인 활동을 권장해요.';
    stateClass = 'overweight';
  } else if (bmi >= 18.5) {
    state = '정상';
    message = '정상 범위에 해당해요. 건강한 습관을 꾸준히 유지해 보세요.';
    stateClass = 'healthy';
  } else {
    state = '저체중';
    message = '체중이 낮은 구간이에요. 충분한 영양 섭취에 신경 써 보세요.';
    stateClass = 'underweight';
  }

  document.querySelector('#result').textContent = bmi.toFixed(2);
  const stateElement = document.querySelector('#state');
  stateElement.textContent = state;
  stateElement.className = 'status-badge ' + stateClass;
  document.querySelector('#comment').textContent = message;
  document.querySelector('#result-panel').classList.remove('is-hidden');

  // 네 가지 색 영역이 각각 25%이므로, 숫자 구간별로 포인터 위치를 맞춘다.
  let position;
  if (bmi < 18.5) {
    position = (bmi / 18.5) * 25;
  } else if (bmi < 23) {
    position = 25 + ((bmi - 18.5) / (23 - 18.5)) * 25;
  } else if (bmi < 25) {
    position = 50 + ((bmi - 23) / (25 - 23)) * 25;
  } else {
    position = 75 + Math.min((bmi - 25) / 15, 1) * 25;
  }
  position = Math.max(2, Math.min(98, position));
  const pointer = document.querySelector('#bmiPointer');
  pointer.style.left = position + '%';
  pointer.style.opacity = '1';
}
