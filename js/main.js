let kimg = document.getElementById('kimg');
let kimg2 = document.getElementById('kimg2');
let imgs = document.getElementById('imgs');
let pdone = document.getElementById('done');
let pstats = document.getElementById('stats');
let rf = document.getElementById('fast');
let rs = document.getElementById('slow');
let rm = document.getElementById('middle');
let ru = document.getElementById('user');
let ra = document.getElementById('auto');
let single = document.getElementById('single');
let double = document.getElementById('double');
let audio = new Audio('audio/roll.wav');
let speed = 100;
let hodNow = 0;
let hody = [];
let userhozeno = 0;
let hotovodouble = 0;

kimg.addEventListener('click',function(){beforeRoll();});
kimg2.addEventListener('click',function(){beforeRoll();});

single.addEventListener('click',function(){shownhide();});
double.addEventListener('click',function(){shownhide();});

function shownhide() {
  if(double.checked == true) {
    kimg2.style.visibility = 'visible';
    imgs.style.marginLeft = "0%"
  } else {
    kimg2.style.visibility = 'hidden';
    imgs.style.marginLeft = "12%"
  }
}

function beforeRoll(){
  if(ru.checked == true && userhozeno == 1) {
    h = 1;
  } else if (userhozeno == 0) {
    userhozeno = 1;
    getSpeed();
    if(double.checked == true) {
      hod(kimg);
      hod(kimg2);
    } else if(single.checked == true){
      hod(kimg);
    }
  }
}

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
  var h;
  if(ra.checked == true) {
    h = Math.floor(Math.random() * 30) + 5;
    disableradio();
  } else if (ru.checked == true) {
    h = 999999;
    disableradio();
  }
  return h;
}

function disableradio() {
  ra.disabled = true;
  ru.disabled = true;
  single.disabled = true;
  double.disabled = true;
}

function doAfter(g) {
  ra.disabled = false;
  ru.disabled = false;
  single.disabled = false;
  double.disabled = false;
  userhozeno = 0;
  if(double.checked == true) {
    hotovodouble++;
  }
  if(double.checked == true && hotovodouble==2) {
    pdone.innerHTML = "Done! You rolled " + (hodNow+g) + "!";
    hotovodouble = 0;
    hodNow += g;
    hody.push((hodNow+g));
    stats();
  } else if(single.checked == true){
    pdone.innerHTML = "Done! You rolled " + g + "!";
    hodNow = g;
    hody.push(g);
    stats();
  } else {
    hodNow = g;
  }
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

function hod(gimg) {
  pdone.innerHTML = "Rolling...";
  var h = getGameType();
  let i = 0;
  hhod();
  audio.play();
  function hhod(){
    var g = Math.ceil(Math.random() * 6);
    gimg.src = "img/" + g + ".png";
    if(i>=(h-1)) { doAfter(g); } //funkce pro věci po hodu
    i++;
    if(ru.checked == true) {
      kimg.addEventListener("click", function() { h = 1; }); //interupter pro user stop
      kimg2.addEventListener("click", function() { h = 1; });
    }
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

partya.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
