let kimg = document.getElementById('kimg');
let pdone = document.getElementById('done');
let pstats = document.getElementById('stats');
let rf = document.getElementById('fast');
let rs = document.getElementById('slow');
let rm = document.getElementById('middle');
let audio = new Audio('roll.wav');
let speed = 100;

kimg.addEventListener('click',function(){
  getSpeed();
  hod();
});

function getSpeed() {
  if(rf.checked == true) {
    speed = 10;
  } else if (rm.checked == true) {
    speed = 100;
  } else if (rs.checked == true) {
    speed = 300;
  }
}

function hod() {
  pdone.innerHTML = "Rolling...";
  let h = Math.floor(Math.random() * 30);
  var i = 0;
  hhod();
  audio.play();
  function hhod(){
    var g = Math.ceil(Math.random() * 6);
    kimg.src = "img/" + g + ".png";
    if(i==(h-1)) {
      pdone.innerHTML = "Done! You rolled " + g;
    }
    i++;
    if (i < h) { setTimeout(hhod, speed); } //delay
  }
}
