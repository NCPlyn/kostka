let kimg = document.getElementById('kimg');
let pdone = document.getElementById('done');

kimg.addEventListener('click',function(){
  hod();
});

function hod() {
  pdone.innerHTML = "Rolling...";
  const obrz = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  let h = Math.floor(Math.random() * 30);
  var g;
  var i = 0;
  hhod();
  function hhod(){
    g = Math.floor(Math.random() * obrz.length);
    kimg.src = "img/" + obrz[g];
    if(i==(h-1)) {
      pdone.innerHTML = "Done! You rolled " + (g+1);
    }
    i++;
    if (i < h) { setTimeout(hhod, 100); }
  }
  console.log("xd");
}
