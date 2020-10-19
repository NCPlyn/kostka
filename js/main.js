let kimg = document.getElementById('kimg');
let pdone = document.getElementById('done');
let pstats = document.getElementById('stats');
let rf = document.getElementById('fast');
let rs = document.getElementById('slow');
let rm = document.getElementById('middle');
let ru = document.getElementById('user');
let ra = document.getElementById('auto');
let audio = new Audio('audio/roll.wav');
let speed = 100;
let hodNow = 0;
let hody = [];
var g;
var h;
let userhozeno = 0;

kimg.addEventListener('click',function(){
  if(ru.checked == true && userhozeno == 1) {
    h = 1;
  } else if (userhozeno == 0) {
    userhozeno = 1;
    getSpeed();
    hod();
  }
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

function getGameType() {
  if(ra.checked == true) {
    h = Math.floor(Math.random() * 30) + 5;
  } else if (ru.checked == true) {
    h = 999999;
    ra.disabled = true;
    ru.disabled = true;
  }
}

function doAfter() {
  ra.disabled = false;
  ru.disabled = false;
  userhozeno = 0;
  pdone.innerHTML = "Done! You rolled " + g + "!";
  hodNow = g;
  hody.push(g);
  stats();
}

function stats() {
  pstats.innerHTML = `<p>Last roll: ${hodNow}</p>`;
  pstats.innerHTML += `<p>Number of rolls: ${hody.length}</p>`;
  pstats.innerHTML += `<p>Sum of all rolls: ${celkem()}</p>`;
  pstats.innerHTML += `<p>Average of all rolls: ${(celkem()/hody.length).toFixed(2)}</p>`;
  pstats.innerHTML += `<p>Rolled maximum: ${max()}</p>`;
  pstats.innerHTML += `<p>Rolled minimum: ${min()}</p>`;
  $("#statstab tbody").append("<tr>" +
        "<th scope='row'>"+hody.length+"</th>" +
        "<td>"+hodNow+"</td>" +
        "<td>"+celkem()+"</td>" +
        "<td>"+(celkem()/hody.length).toFixed(2)+"</td>" +
        "<td>"+max()+"</td>" +
        "<td>"+min()+"</td>" +
        "</tr>");
}

function hod() {
  pdone.innerHTML = "Rolling...";
  getGameType();
  let i = 0;
  hhod();
  audio.play();
  function hhod(){
    g = Math.ceil(Math.random() * 6);
    kimg.src = "img/" + g + ".png";
    if(i>=(h-1)) { doAfter(); } //funkce pro věci po hodu
    i++;
    if (i < h) { setTimeout(hhod, speed); } //delay a opakování
  }
}

function celkem() {
  let out = 0;
  for (let i=0;i<hody.length;i++) {
    out += hody[i];
  }
  return out;
}

function max() {
  let maximum = 0;
  hody.forEach(function(value,index) {
    if (value > maximum) maximum = value;
  });
  return maximum;
}

function min() {
  let minimum = 1;
  hody.forEach(function(value,index) {
    if (value < minimum) minimum = value;
  });
  return minimum;
}

//easteregg
let timeo;
let partya = new Audio('audio/party.mp3');
let party = document.getElementById("party");
let statstab = document.getElementById("statstab");

party.addEventListener('change',function(){
  if(party.checked == true) {
      partya.play();
      pparty();
    } else {
        clearTimeout(timeo);
        partya.pause();
        document.body.style.backgroundColor="#282C34";
    }
});

function pparty() {
  document.body.style.backgroundColor = "white";
  statstab.classList.remove("table-dark");
  timeo = setTimeout(function(){
    document.body.style.backgroundColor="#282C34";
    statstab.classList.add("table-dark");
    timeo = setTimeout(function(){
      pparty();
    }, 50);
  }, 50);
}

party.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
