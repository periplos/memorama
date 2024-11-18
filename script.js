const totalCards = 10;
const availableCards = ['A', 'K', 'Q', 'J','C','D'];
const availableimg = ["images/Comal.png","images/Botas.png","images/Huacal.png","images/Metate.png","images/Olla.png","images/Prensa.png",];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;
let currentLives = 0;
let aciertos = 0;
let timer=30;
let nivel = 0;
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
               aciertos++;
               
               
            }
            else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentLives --;
                  document.querySelector('#lives').innerHTML = currentLives + ' vidas';
                  currentMove = 0;
                  if(currentLives==0){
                     window.alert("Se acabaron tus vidas :(");
                     restart();
                  }
               }, 600);
            }
         }
      }
   }
   if(aciertos==5){
      window.alert("Felicidades has ganado");
      restart();
   }
}

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   }
   else {
      randomValue();
   }
}

function getFaceValue(value) {
   let rtn = value;
   if (value < availableimg.length) {
      rtn = availableimg[value];
   }
   return rtn;
}

function started(nivel){

const containerButton = document.getElementById("buttonContainer");
containerButton.remove();

if(nivel==1){
timer=50;
currentLives=4
}else if(nivel==2){
   timer=40;
   currentLives=3
}else if(nivel==3){
   timer=30;
   currentLives=2
}

document.querySelector('#lives').innerHTML = currentLives + ' vidas';
contarTiempo();

for (let i=0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   

   var myImage = new Image();
   myImage.src = getFaceValue(valuesUsed[i]);
   console.log(myImage);

   
   

   cards[i].querySelectorAll('.face')[0].appendChild(myImage);
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}
}

function contarTiempo(){
   setInterval(()=>{
      timer --;
      document.querySelector('#time').innerHTML = timer + 'segundos';
      if(timer==0){
         window.alert("El tiempo se ha terminado");
         restart();
      }
   },1000);
   
}


function availableButton(){
   const mainbutton = document.getElementById("mainButton");
   mainbutton.remove();
   let buttonContainer = document.getElementById("buttonContainer").innerHTML +=
   '<button onclick="started(1)" class="mainButton" >Facil</button><button onclick="started(2)" class="mainButton">Intermedio</button><button onclick="started(3)" class="mainButton">Difícil</button>';

}


function restart(){
   setTimeout(location.reload(),1500);
}