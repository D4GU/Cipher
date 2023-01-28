// Howler sound definitions

var sound = new Howl({
  src: ['assets/sounds/stone.wav'],
  volume: 1,
  sprite: {
    key1: [600, 1600, true]
  },
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

// Resizing Functionality


// $(document).load($(window).bind("resize", checkPosition));

// function checkPosition()
// {
//     if($(window).width() < 767)
//     {
//         $("#body-container .main-content").remove().insertBefore($("#body-container .left-sidebar"));
//     } else {
//         $("#body-container .main-content").remove().insertAfter($("#body-container .left-sidebar"));
//     }
// }



// Rotation of elements

(function () {
  var init, rotate, start, stop,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    currentElement = '',
    soundid = null,
    center = {
      x: 0,
      y: 0
    },
    R2D = 180 / Math.PI,
    rota = document.getElementById('rotateAlphabet');

  init = function () {
    rota.addEventListener("mousedown", start, false);
    $(document).bind('mousemove', function (event) {
      if (active === true && currentElement == 'rotateAlphabet') {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('mousedown', function (event) {
      currentElement= event.target.id
    });
    $(document).bind('mouseup', function (event) {
      event.preventDefault();
      if (currentElement == 'rotateAlphabet') {
        stop(event);
      }
    });
  };


  start = function (a) {
    a.preventDefault();
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };
    x = a.clientX - center.x;
    y = a.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return active = true;
  };

  rotate = function (a) {
    a.preventDefault();
    var x = a.clientX - center.x,
      y = a.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    soundid = runningSounds(soundid);
    complete = angle + rotation
    return rota.style.transform = "rotate(" + complete + "deg)";
  };

  stop = function () {
    rota.style.transform = "rotate(" + (getCloseFr(complete)) + "deg)"
    angle += rotation;
    angle = getCloseFr(angle)
    confsound.play('key1');
    soundid = stopSounds(soundid);
    return active = false;
  };

  init();

}).call(this);

(function () {
  var init, rotate, start, stop,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    currentElement = '',
    soundid = null,
    center = {
      x: 0,
      y: 0
    },
    R2D = 180 / Math.PI,
    rotn = document.getElementById('rotateNumbers');
  init = function () {
    rotn.addEventListener("mousedown", start, false);
    $(document).bind('mousemove', function (event) {
      if (active === true && currentElement == 'rotateNumbers') {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('mousedown', function (event) {
      currentElement= event.target.id
    });
    $(document).bind('mouseup', function (event) {
      event.preventDefault();
      if (currentElement == 'rotateNumbers') {
        stop(event);
      }
    });
  };

  start = function (n) {
    n.preventDefault();
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };
    x = n.clientX - center.x;
    y = n.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return active = true;
  };

  rotate = function (n) {
    n.preventDefault();
    var x = n.clientX - center.x,
      y = n.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    soundid = runningSounds(soundid);
    complete = angle + rotation
    return rotn.style.transform = "rotate(" + complete + "deg)";
  };

  stop = function () {
    rotn.style.transform = "rotate(" + (getCloseFr(complete)) + "deg)"
    angle += rotation;
    angle = getCloseFr(angle)
    confsound.play('key1');
    soundid = stopSounds(soundid);
    return active = false;
  };



  init();

}).call(this);

(function () {
  var init, rotate, start, stop,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    currentElement = '',
    soundid= null,
    center = {
      x: 0,
      y: 0
    },
    R2D = 180 / Math.PI,
    rots = document.getElementById('rotateSymbols');

  init = function () {
    rots.addEventListener("mousedown", start, false);
    $(document).bind('mousemove', function (event) {
      if (active === true && currentElement == 'rotateSymbols') {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('mousedown', function (event) {
      currentElement= event.target.id
    });
    $(document).bind('mouseup', function (event) {
      event.preventDefault();
      if (currentElement == 'rotateSymbols') {
        stop(event);
      }
    });
  };

  start = function (s) {
    s.preventDefault();
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };
    x = s.clientX - center.x;
    y = s.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    return active = true;
  };

  rotate = function (s) {
    s.preventDefault();
    var x = s.clientX - center.x,
      y = s.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    soundid = runningSounds(soundid);
    complete = angle + rotation
    return rots.style.transform = "rotate(" + complete + "deg)";
  };

  stop = function (s) {
    rots.style.transform = "rotate(" + (getCloseFr(complete)) + "deg)"
    angle += rotation;
    angle = getCloseFr(angle)
    confsound.play('key1');
    soundid = stopSounds(soundid);
    return active = false;
  };



  init();

}).call(this);