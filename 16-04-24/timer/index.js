let hour =document.getElementById('hour');
let min=document.getElementById('min');
let sec=document.getElementById('sec');

let start=document.getElementById('start');
let pause=document.getElementById('pause');
let reset=document.getElementById('reset');

let intervalId;
start.addEventListener('click',function(){
let hrVal=parseInt(hour.value);
let minVal=parseInt(min.value);
let secVal=parseInt(sec.value);

UpdateTimeDisplay(hrVal,minVal,secVal)

let totalSeconds=hrVal*3600+minVal*60+secVal;

intervalId=setInterval(()=>{
totalSeconds--;

if(totalSeconds>=0){
let hoursLeft=Math.floor(totalSeconds/3600);
let minutesLeft=Math.floor((totalSeconds%3600)/60);
let secondsLeft=Math.floor(totalSeconds%60);
UpdateTimeDisplay(hoursLeft,minutesLeft,secondsLeft)
}
else{
clearInterval(intervalId)
}
},1000)

})

pause.addEventListener('click',function(){
clearInterval(intervalId)
})

reset.addEventListener('click',function(){
hour.value='';
min.value='';
sec.value='';
})

function UpdateTimeDisplay(hours,minutes,seconds){
    hour.value=hours.toString().padStart(2,'0');
    min.value=minutes.toString().padStart(2,'0');
   sec.value=seconds.toString().padStart(2,'0');
}