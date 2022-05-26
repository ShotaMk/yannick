let slides = document.querySelectorAll('.w-slide'); // your slides
let slideSayisi = slides.length; // slides amount


let prev = document.querySelector(
    '.w-icon-slider-left'); // left arrow
let next = document.querySelector('.w-icon-slider-right'); //right arrow
let dots = document.querySelectorAll('.w-slider-dot'); // dots

// slide translate width
for (let index = 0; index < slides.length; index++) {
    const element = slides[index];
    element.style.transform = "translateX("+100*(index)+"%)";
}
let loop = 0 + 1000*slideSayisi; //slide scroll

//change dots


//scroll site forwward
function goNext(){
    loop++; //scroll site for one
    for (let index = 0; index < slides.length; index++) {
        const element = slides[index];
        element.style.transform = "translateX("+100*(index-loop%slideSayisi)+"%)";
    }
}
//scroll site back
function goPrev(){
    loop--;
    for (let index = 0; index < slides.length; index++) {
        const element = slides[index];
        element.style.transform = "translateX("+100*(index-loop%slideSayisi)+"%)";
    }
}


let activeElement;
dots.forEach(dot=> {
    if (dot.className.indexOf('w-slider-dot w-active') >= 0) {
        activeElement = dot.dataset.index //take index of active element
    }else {
        activeElement = 1
    }
})

function dotsNav(){
    let // dot with class w-active
        clickableElement, // dot we click on
        loopIndex; // amount of slides we need to scroll
    dots.forEach(dot=> {
        dot.addEventListener('click', function (){
            clickableElement = +this.dataset.index; // data-index value of element we click on
            //make a math
            if( (clickableElement - activeElement)>=0 ) {
                loopIndex = clickableElement - activeElement;
            } else {
                loopIndex = clickableElement - activeElement + dots.length
            }

            //change active dot
            dots.forEach(dot=>{
                dot.classList.remove('w-active')
            })
            this.classList.add('w-active')

            activeElement = dot.dataset.index //take index of new active element

            if(loopIndex>0) {
                loop += loopIndex; //scroll slider
                for (let index = 0; index < slides.length; index++) {
                    const element = slides[index];
                    element.style.transform = "translateX(" + 100 * (index - loop % slideSayisi) + "%)";
                }

            }
            restart();

        })

    })    /*for (activeElement; activeElement<dots.length; activeElement++){
        dots.forEach(dot=>{dot.classList.remove('w-active')})
        dots[activeElement].classList.add('w-active')
        break;
    }*/




}
dotsNav()

function dotsNext(){
    dots[activeElement-1].classList.remove('w-active')
    if(activeElement < dots.length){
        activeElement++;
        console.log(activeElement)
    }else {
        activeElement = 1
        console.log(activeElement)
    }

    dots[activeElement-1].classList.add('w-active')

}

function dotsBack(){
    dots[activeElement-1].classList.remove('w-active')
    if(activeElement > 1){
        activeElement--;
        console.log(activeElement)
    }else {
        activeElement = dots.length
        console.log(activeElement)
    }

    dots[activeElement-1].classList.add('w-active')

}

//autoscroll
let autoChange = setInterval(function (){
    goNext();
    dotsNext();
}, 4000); //autoscroll time
const restart = function() {
    clearInterval(autoChange); // clear autoscroll tie after click on navigation item
    autoChange = setInterval(function (){
        goNext();
        dotsNext();
    }, 4000);
};

next.addEventListener('click',function (){
    goNext();
    dotsNext();
    restart();
});
prev.addEventListener('click',function (){
    goPrev();
    dotsBack();
    restart();
});
document.addEventListener('keydown',function(e){
    if(e.code === 'ArrowRight'){
        goNext();
    }else if(e.code === 'ArrowLeft'){
        goPrev();
    }
});

