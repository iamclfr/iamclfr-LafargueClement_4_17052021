document.addEventListener('DOMContentLoaded',function(){

  console.log('animations.js loaded')
  
});

// ScrollReveal().reveal('.nav .nav-link', {
//   interval: 100,
//   duration: 350,
//   opacity: 0,
//   origin: 'rigth',
//   scale: 0.95,
//   easing: 'ease-in-out'
// });

ScrollReveal().reveal('.subHeaderHero_img', {
  duration: 500,
  opacity: 0,
  easing: 'ease-in-out',
  reset: true
});

ScrollReveal().reveal('.ombre', {
  duration: 1000,
  opacity: 0,
  easing: 'ease-in-out',
  reset: true
});

ScrollReveal().reveal('.card', {
  interval: 100,
  duration: 350,
  useDelay: 'onload',
  viewFactor: 0.3,
  distance: '5em',
  opacity: 0,
  origin: 'bottom',
  scale: 0.90,
  easing: 'ease-in-out',
  reset: true
});