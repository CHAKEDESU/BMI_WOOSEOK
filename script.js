const bmiForm = document.querySelector("#bmiForm");

bmiForm.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateBMI();
});

function calculateBMI() {
  const heightCm = Number(document.querySelector("#height").value);
  const weightKg = Number(document.querySelector("#weight").value);

  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    alert("키와 몸무게를 0보다 큰 숫자로 입력해 주세요.");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let state = "";
  let description = "";
  let statusClass = "";

  if (bmi >= 25) {
    state = "비만";
    description = "BMI 기준상 비만 구간에 해당해요. 식사, 활동량 등 전반적인 생활 습관을 살펴보세요.";
    statusClass = "obese";
  } else if (bmi >= 23) {
    state = "과체중";
    description = "BMI 기준상 과체중 구간에 해당해요. 규칙적인 식사와 신체 활동을 유지해 보세요.";
    statusClass = "over";
  } else if (bmi >= 18.5) {
    state = "정상";
    description = "BMI 기준상 정상 구간에 해당해요. 지금처럼 균형 잡힌 생활 습관을 이어가세요.";
    statusClass = "normal";
  } else {
    state = "저체중";
    description = "BMI 기준상 저체중 구간에 해당해요. 충분하고 균형 잡힌 영양 섭취에 신경 써 보세요.";
    statusClass = "under";
  }

  document.querySelector("#result").textContent = bmi.toFixed(2);

  const stateElement = document.querySelector("#state");
  stateElement.textContent = state;
  stateElement.className = "status-badge " + statusClass;

  document.querySelector("#description").textContent = description;
  document.querySelector("#resultCard").hidden = false;

  // 막대는 4개 판정 구간을 동일한 너비로 표시하고,
  // 포인터는 BMI 판정 구간에 맞춰 각 구간 안에서 이동합니다.
  let position;
  if (bmi < 18.5) {
    position = (bmi / 18.5) * 25;
  } else if (bmi < 23) {
    position = 25 + ((bmi - 18.5) / (23 - 18.5)) * 25;
  } else if (bmi < 25) {
    position = 50 + ((bmi - 23) / (25 - 23)) * 25;
  } else {
    position = 75 + ((Math.min(bmi, 35) - 25) / (35 - 25)) * 25;
  }

  position = Math.max(0, Math.min(position, 100));
  document.querySelector("#bmiPointer").style.left = position + "%";
  document.querySelector("#resultCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
