function calculteBMI(){

  let height; //키
  let weight; //몸무게

  h = Number(document.querySelector("#height").value);
  w = Number(document.querySelector("#weight").value);

  h = h/100; // cm -> m, 179 -> 1.7

  let bmi;
  bmi = w/(h*h);

  
  document.querySelector("#result").textContent = 
    "BMI:" + bmi.toFixed(2);

  if(bmi >= 25){document.querySelector("#state").textContent = "비만";}
  else if(bmi >= 23){document.querySelector("#state").textContent = "과제충";}
  else if(bmi >= 18.5){document.querySelector("#state").textContent = "정상";}
  else{document.querySelector("#state").textContent = "저체중";}
}