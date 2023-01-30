Howler.autoUnlock = true;
// Howler sound definitions

var sound = new Howl({
  src: ['assets/sounds/stone.wav'],
  volume: 1,
  sprite: {
    key1: [600, 1600, true]
  },
});

var unlocksound = new Howl({
  src: ['assets/sounds/empty.wav'],
  volume: 1,
});

var confsound = new Howl({
  src: ['assets/sounds/confirm2.wav'],
  volume: 0.25,
  sprite: {
    key1: [0, 400]
  },
});

function runningSounds(soundid) {
  if (soundid == null){
    soundid = sound.play('key1');
    sound.on('stop', function(){
      soundid = null;
    })
  }
  return soundid
}

function stopSounds(soundid) {
  sound.stop()
  return soundid = null;
}

rotFr = 360/26
const posbuckets = [];
const negbuckets = [];
for(let i = 0; i <= 26; i++){
  posbuckets.push(i*rotFr)
  negbuckets.push(i*rotFr*-1)
}

// Rotation bucket function
function getCloseFr(value){
  const dist = []
  
  if(value < 0) {
    for(let i = 0; i <= 26; i++){
      dist.push(Math.abs(value + i*rotFr))
    }
    let minIndex = dist.indexOf(Math.min(...dist))
    if (negbuckets[minIndex] == -360) {
      return 0
    }
    return negbuckets[minIndex]
  } else {
    for(let i = 0; i <= 26; i++){
      dist.push(Math.abs(value - i*rotFr))
    }
    let minIndex = dist.indexOf(Math.min(...dist))
    if (posbuckets[minIndex] == 360) {
      return 0
    }
    return posbuckets[minIndex]
  }
}

mobileDevice = false;

function checkforMobile(){
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return mobileDevice = true
  } else {
    return mobileDevice = false
  }
}
checkforMobile()


soundid = null;
function runSound() {
  if (soundid == null){
    console.log("here")
    soundid = unlocksound.play('key1');
    unlocksound.on('stop', function(){
      soundid = null;
    })
  }
}

// Rotation of elements

function Rotatable(name) {
  this.name = name
  this.active = false;
  this.angle = 0;
  this.rotation = 0;
  this.startAngle = 0;
  this.complete = 0;
  this.center = {x: 0 , y:0};
}
var rotatableids = ['rotateAlphabet','rotateNumbers','rotateStaticmiddle','rotateSymbols','rotaterunes', 'rotateElements']
let rotatables = []

rotatableids.forEach(function(item) {rotatables.push(new Rotatable(item));});

(function () {
  var init, rotate, start, stop, mstart, mrotate, mstop
    active = false,
    currentRotatable = null,
    soundid = null,
    R2D = 180 / Math.PI
  
    

  init = function () {
    for (const x of rotatableids) {document.getElementById(x).addEventListener("mousedown", start, { passive: false }), 
    document.getElementById(x).addEventListener('touchstart', mstart, { passive: false })}


      //Mobile
      $(document).bind('touchmove', function (event) {
        if (active === true) {mrotate(event);}
      });
      $(document).bind('touchstart', function (event) {
        checkforMobile()
        currentRotatable = rotatables.find(o => o.name === event.target.id)
      });
      $(document).bind('touchend', function (event) {
        mstop(event);
      });
      

      //Browser
      $(document).bind('mousemove', function (event) {
        if (active === true) {
          event.preventDefault();
          rotate(event);
        }
      });
      $(document).bind('mousedown', function (event) {
        checkforMobile()
        event.preventDefault();
        currentRotatable = rotatables.find(o => o.name === event.target.id)
      });
      $(document).bind('mouseup', function (event) {
        checkforMobile()
        event.preventDefault();
        stop(event);
      });

  };

  start = function (a) { 
    unlocksound.play()
    currentRotatable = rotatables.find(o => o.name === a.target.id)
    a.preventDefault();
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    currentRotatable.center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };
    x = a.clientX - currentRotatable.center.x;
    y = a.clientY - currentRotatable.center.y;
    currentRotatable.startAngle = R2D * Math.atan2(y, x);
    currentRotatable.active = true;
    return active = true;

  };


  //Browser functions
  rotate = function (a) {
    if(a.target.id == 'viewport' || a.target.id =='staticring'){
      document.getElementById(currentRotatable.name).style.transform = "rotate(" + (getCloseFr(currentRotatable.complete)) + "deg)"
      currentRotatable.angle += currentRotatable.rotation;
      currentRotatable.angle = getCloseFr(currentRotatable.angle)
      confsound.play('key1');
      soundid = stopSounds(soundid);
      currentRotatable.active = false;
      return active = false
    }

    if (rotatableids.includes(a.target.id)) {
      a.preventDefault();
      var x = a.clientX - currentRotatable.center.x,
      y = a.clientY - currentRotatable.center.y,
      d = R2D * Math.atan2(y, x);
      currentRotatable.rotation = d - currentRotatable.startAngle;
      soundid = runningSounds(soundid);
      currentRotatable.complete = currentRotatable.angle + currentRotatable.rotation
      return document.getElementById(currentRotatable.name).style.transform = "rotate(" + currentRotatable.complete + "deg)";
    }
    
  };

  stop = function (a) {
    try {
      if (rotatableids.includes(a.target.id) && mobileDevice != true) {
        document.getElementById(currentRotatable.name).style.transform = "rotate(" + (getCloseFr(currentRotatable.complete)) + "deg)"
        currentRotatable.angle += currentRotatable.rotation;
        currentRotatable.angle = getCloseFr(currentRotatable.angle)
        confsound.play('key1');
        soundid = stopSounds(soundid);
        currentRotatable.active = false;
        return active = false;
      }
    } catch (TypeError) {
      pass;
    }
    


  }

  //Mobile functions
  var recentstop = false

  mstart = function (a) { 
    // unlocksound.play()
    unlocksound.play()
    recentstop = false
    currentRotatable = rotatables.find(o => o.name === a.target.id)
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    currentRotatable.center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };
    x = a.targetTouches[0].clientX - currentRotatable.center.x;
    y = a.targetTouches[0].clientY - currentRotatable.center.y;
    currentRotatable.startAngle = R2D * Math.atan2(y, x);
    currentRotatable.active = true;
    return active = true;

  };

  mrotate = function (a) {
    // if(document.elementFromPoint(a.targetTouches[0].clientX, a.targetTouches[0].clientY).id == 'viewport' || document.elementFromPoint(a.targetTouches[0].clientX, a.targetTouches[0].clientY).id =='staticring'){
    //   recentstop = true;
    //   document.getElementById(currentRotatable.name).style.transform = "rotate(" + (getCloseFr(currentRotatable.complete)) + "deg)"
    //   currentRotatable.angle += currentRotatable.rotation;
    //   currentRotatable.angle = getCloseFr(currentRotatable.angle)
    //   confsound.play('key1');
    //   soundid = stopSounds(soundid);
    //   currentRotatable.active = false;
    //   return active = false
    // }

    // if (rotatableids.includes(document.elementFromPoint(a.targetTouches[0].clientX, a.targetTouches[0].clientY).id)) {

      var x = a.targetTouches[0].clientX - currentRotatable.center.x,
      y = a.targetTouches[0].clientY - currentRotatable.center.y,
      d = R2D * Math.atan2(y, x);
      currentRotatable.rotation = d - currentRotatable.startAngle;
      soundid = runningSounds(soundid);
      currentRotatable.complete = currentRotatable.angle + currentRotatable.rotation
      return document.getElementById(currentRotatable.name).style.transform = "rotate(" + currentRotatable.complete + "deg)";
      
    // }
    
  };
  // ontouchstart="runningSounds(null)"
  mstop = function (a) {
    if(!(recentstop)) {
      if (rotatableids.includes(a.target.id)) {
        recentstop = true;
        document.getElementById(currentRotatable.name).style.transform = "rotate(" + (getCloseFr(currentRotatable.complete)) + "deg)"
        currentRotatable.angle += currentRotatable.rotation;
        currentRotatable.angle = getCloseFr(currentRotatable.angle)
        confsound.play('key1');
        soundid = stopSounds(soundid);
        currentRotatable.active = false;
        return active = false;
      }
    }
    
   
  };

  init();

}).call(this);