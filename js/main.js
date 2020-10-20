let imgs = document.getElementById('imgs');
let pdone = document.getElementById('done');
let pstats = document.getElementById('stats');
let rf = document.getElementById('fast');
let rs = document.getElementById('slow');
let rm = document.getElementById('middle');
let ru = document.getElementById('user');
let ra = document.getElementById('auto');
let addd = document.getElementById('add');
let audio = new Audio('audio/roll.wav');
let speed = 100;
let hodNow = 0;
let hody = [];
let userhozeno = 0;
let hotovodouble = 0;
let kostky = [];
let pocetKostek = 1;
let nazvy = [];

imgs.addEventListener('click',function(){beforeRoll();});

function isornot(num) {
  for (let i=0;i<nazvy.length;i++) {
    if(num == nazvy[i])
    return 0;
  }
  return 1;
}

addd.addEventListener('click',function(){
  if(nazvy.length < 200) {
    let num;
    do {
      num = Math.ceil(Math.random() * 205)+1;
    }
    while (isornot(num) == 0);
    nazvy.push(num);
    pocetKostek++;
    imgs.innerHTML += '<img src="img/0.png" id="kimg'+num+'" class="border border-light rounded">'
  } else {
    alert("Maximum of 200! Can be more but I said nope");
  }
});

function beforeRoll(){
  if (userhozeno == 0) {
    userhozeno = 1;
    getSpeed();
    if(pocetKostek > 1) {
      hod(document.getElementById('kimg'));
      for (let i=0;i<nazvy.length;i++) {
        hod(document.getElementById("kimg"+nazvy[i]));
      }
    } else {
      hod(document.getElementById('kimg'));
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
  addd.disabled = true;
}

function enableradio() {
  ra.disabled = false;
  ru.disabled = false;
  addd.disabled = false;
}

function doAfter(g) {
  if(pocetKostek > 1) {
    kostky.push(g);
    if(kostky.length == pocetKostek) {
      userhozeno = 0;
      let out = 0;
      for (let i=0;i<kostky.length;i++) {
        out += kostky[i];
      }
      kostky = [];
      hodNow = out;
      pdone.innerHTML = "Done! You rolled " + out + "!";
      hody.push(out);
      stats();
      enableradio();
    }
  } else {
    userhozeno = 0;
    pdone.innerHTML = "Done! You rolled " + g + "!";
    hodNow = g;
    hody.push(g);
    stats();
    enableradio();
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
      gimg.addEventListener("click", function() { h = 1; }); //interupter pro user stop
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
  let minimum = 12;
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
