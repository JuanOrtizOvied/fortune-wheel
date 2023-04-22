import './style.scss'
import { Power1, Power4, gsap } from 'gsap'

// luckywheel animation with Greensock  ---------------------------------
document.addEventListener("DOMContentLoaded", () => {
  //  Setup variables
  var wheel =  document.getElementsByClassName('wheel'),
      active = document.getElementsByClassName('active'),
      currentRotation,
      lastRotation = 0,
      tolerance,
      deg,
      
      btnPlay = document.getElementById('btnPlay'),
      btnSlowMo = document.getElementById('btnSlowMo');
  
  //  Random degree
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var deg = getRandomInt(3600, 7200);
      console.log(deg);
  
  //  Creating the Timeline
      var indicator = gsap.timeline();
      var spinWheel = gsap.timeline();
      indicator.to(active, {duration: .13, rotation: -10, transformOrigin:"65% 36%", ease: "power1"})
               .to(active, {duration: .13, rotation: 3, ease: "power4" })
               .add("end");
  
  //  Luckywheel animation
      spinWheel.to(wheel, {rotation: deg, duration: 5, transformOrigin:"50% 50%", ease: "power4", onUpdate: function(){    
        const rotation = gsap.getProperty(".wheel", 'rotation');
        currentRotation = Math.round(rotation);
        tolerance = currentRotation - lastRotation;
        
          console.log("lastRot: "+lastRotation);
          console.log("currentRot: "+currentRotation);
          console.log("tol: "+tolerance);
          console.log("indicator.progress()---> ",indicator.progress());
          console.log("spinwheelprogress: "+spinWheel.progress());
        
        if(Math.round(currentRotation) % (360/12) <= tolerance){
          if(indicator.progress() > .5 || indicator.progress() === 0){
            indicator.play(0);
          }
        }
        lastRotation = currentRotation;
      }});
      spinWheel.add("end");
   //   Buttons
    btnPlay.addEventListener('click',
      function(){
        indicator.timeScale(1).seek(0);
        spinWheel.timeScale(1).seek(0);
      }
    );
  
    btnSlowMo.addEventListener('click',
      function(){
        indicator.timeScale(0.25).seek(0.01);
        spinWheel.timeScale(0.25).seek(0.01);
      }
    );
});