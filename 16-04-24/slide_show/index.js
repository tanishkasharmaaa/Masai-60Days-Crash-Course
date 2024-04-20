let i=0 

let ImgArr=[
    'https://i.pinimg.com/564x/b8/95/fe/b895fee7e5289509f485fc4688fe483d.jpg',
    'https://i.pinimg.com/564x/9b/36/9b/9b369bf9a51086ff2bfc6b4ce1ff219b.jpg',
    'https://i.pinimg.com/736x/f6/21/a6/f621a613d37ffe036e6c88f6e4f092f8.jpg',
    'https://i.pinimg.com/564x/4b/5b/e8/4b5be83ea214a76aa7719d3496aad32b.jpg',
    'https://i.pinimg.com/736x/52/21/86/5221866abc75d0f4c5345666ac339d91.jpg',
    'https://i.pinimg.com/564x/ca/53/91/ca53910950c6b250eb868fafad0ed6d4.jpg',
    'https://i.pinimg.com/564x/90/9e/7b/909e7b85b60eccdf4bb3ca63aa88c7dc.jpg',
    'https://i.pinimg.com/564x/68/bc/b4/68bcb44088675a49b0eeb24b7ad602ef.jpg',
    'https://i.pinimg.com/736x/08/4c/e5/084ce51788c71c1c533404348c5c8cd5.jpg',
    'https://i.pinimg.com/564x/2e/5a/b5/2e5ab545e3b10b954854a51b5c2a01a9.jpg',
    'https://i.pinimg.com/564x/9c/e7/7c/9ce77c32782e1f7323d346eb829637fd.jpg',
    'https://i.pinimg.com/564x/40/c1/da/40c1daee9879fc435d8da0a0d3c9de55.jpg',
    'https://i.pinimg.com/564x/d6/12/5f/d6125fea02a6ca5108efbb411acc0b45.jpg',
    'https://i.pinimg.com/564x/fd/09/4a/fd094a70dc6d6ad8dc6b5ab53e153440.jpg',
    'https://i.pinimg.com/564x/3b/33/49/3b3349fa71d4903193c75f1221620191.jpg',
    'https://i.pinimg.com/564x/b9/c3/48/b9c348c5822a243cb039b5da6b56a971.jpg',
    'https://i.pinimg.com/736x/fe/41/86/fe4186e27ac35b109649cab4bea8ed7c.jpg',
    'https://i.pinimg.com/564x/b1/7e/a9/b17ea984fbe321f9532cf971cd92cc0e.jpg',
    'https://i.pinimg.com/564x/ac/1a/69/ac1a6928424851de44643de65445118f.jpg',
    'https://i.pinimg.com/564x/ec/51/fc/ec51fcd97b5cb3d5908b610a5133cea7.jpg'
]

// Catching Elements
let imageDiv=document.getElementById('img-div');
let previous=document.getElementById('pre');
let start_stop=document.getElementById('start');
let next=document.getElementById('next');
 let img=document.querySelector('img');

// Setting by default image
 img.src=ImgArr[i]

 // Adding Event listener on buttons
next.addEventListener('click',function(){
    handleNext()
})

previous.addEventListener('click',function(){
    handlePrevious()
})

start_stop.addEventListener('click',function(){
    handleStartStop()
})


// handling next button
function handleNext(){
clearInterval(interval)
// making image div empty for the next image
imageDiv.innerHTML=''

  if(i<ImgArr.length){ 
   img.src=ImgArr[i];
   i++ 
  }
  // check if the i reach to the end on the ImgArr
else if(i===ImgArr.length){
//Reset the index to 0 display the first image again
i=0
img.src=ImgArr[i];
  
}
  
   imageDiv.append(img)
  
}


let interval;

// handling start stop button
function handleStartStop(){

    if(!interval){
 interval=  setInterval(()=>{
        img.src=ImgArr[i];
        i++
       if(i==ImgArr.length){
    i=0
   }  
    },1000)

  start_stop.textContent='Start'
    }
    else{
        clearInterval(interval);
        interval=null;
        start_stop.textContent='Stop'
    }

}

// handling previous button
function handlePrevious() {
    // Clear the interval set by handleStartStop
    clearInterval(interval);

    // Check if i is within the valid range
    if (0 <= i && i < ImgArr.length) {
        // Decrease i
        i--;

        // Check if i is now less than 0
        if (i === -1) {
            // Set i to the index of the last image
            i = ImgArr.length - 1;
        }

        // Update the image source
        img.src = ImgArr[i];
    }
}

