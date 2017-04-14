'use strict';

function noop() {}

// From: https://github.com/lodash/lodash/blob/master/shuffle.js
function shuffle(array) {
  var length = array == null ? 0 : array.length;
  if (!length) { return []; }

  var index = -1;
  var lastIndex = length - 1;
  var result = array;
  while (++index < length) {
    var rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    var value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result
}

function bindEvents(thisArg, events) {
   Object.keys(events).forEach(function (selector) {
        Object.keys(events[selector]).forEach(function (event) {
            var handler = events[selector][event].bind(thisArg);
            if('document' === selector) {
                document.addEventListener(event, handler, false);
            } else if ('window' === selector) {
                window.addEventListener(event, handler, false);
            } else {
                document.querySelectorAll(selector).forEach(function (dom) {
                    dom.addEventListener(event, handler, false);
                });
            }
        });
    }); // all events bound
}

var MS_PER_DAY = 24 * 60 * 60 * 1000;
var MAX_KPD = 14;

var DJK_SOUNDS = shuffle([
  '-fZ7Gb532Ew.mp3',
  '-p0bNOxBhgc.mp3',
  '1Rtlg3-mrv8.mp3',
  '4YqV8n_kfsU-01.mp3',
  '4YqV8n_kfsU.mp3',
  '5Tf1wJwvzcc.mp3',
  '_qNU9n7k15g.mp3',
  '_xGhK6qgPtM.mp3',
  'E2Lw9YWLVts.mp3',
  'fxPBu_vX9Q0.mp3',
  'Gvsao2_jsNk.mp3',
  'HdT_oKderEs.mp3',
  'ia9rPW8yXqE.mp3',
  'ii0rSwxVkFY.mp3',
  'L1xlu7Zktm8.mp3',
  'LdE3WlQ__GY.mp3',
  'OyRRnZ8vxA0.mp3',
  'QtPluXq_hko.mp3',
  'rVEUbU9hQEo.mp3',
  'sDzxQBgj-f8.mp3',
  'SFLSOIufuhM.mp3',
  'VihUO-4-wCc.mp3',
  'zQhy9eE8MBg.mp3',
  'zWhowrdR4dU.mp3'
]);

var app = {
  // options
  DATA_KEY: 'org.metaist.randomkhaled.data',
  store: null,
  options: {
    kpd: 3,
    debug: false,
  },

  // internal
  idx: 0,       // index into sounds
  clock: null,  // timeout to play sound

  // DOM Nodes
  $kpd: null,
  $face: null,
  $audio: null,
  $source: null,

  init: function () {
    bindEvents(this, {
      'document': {'deviceready': this.ready},
      // 'window': {'load': this.ready},
      'form input': {'change': this.change},
      '#kpd': {'input': this.change},
      'main': {'click': this.toggle},
      'audio': {'ended': this.next}
    });
    return this;
  },

  ready: function () {
    this.$kpd = document.querySelector('#kpd');
    this.$face = document.querySelector('#face');
    this.$audio = document.querySelector('audio');
    this.$source = document.querySelector('source');

    this.store = plugins.appPreferences;
    this.store.fetch(this.DATA_KEY).then(function (data) {
      this.options = data || {};
      this.$kpd.MaterialSlider.change(this.options.kpd || 3);
    }.bind(this));

    this.render();
    return this;
  },

  change: function () {
    var kpd = parseInt(this.$kpd.value, 10);
    if(kpd !== this.options.kpd) {
      this.options.kpd = kpd;
      this.start();
    }

    this.store.store(noop, noop, this.DATA_KEY, this.options);
    return this;
  },

  render: function () {
    this.$face.style.backgroundColor = this.clock ? 'red' : 'initial';
    this.$source.src = 'lib/dj-khaled/' + DJK_SOUNDS[this.idx];
    return this;
  },

  toggle: function () {
    this.options.debug && console.log('toggle', this.clock);
    // return this.$audio.paused ? this.play() : this.pause();
    return this.clock ? this.stop() : this.start();
  },

  play: function () {
    this.options.debug && console.log('play', this.clock);
    this.$audio.currentTime = 0.0;
    this.$audio.play();
    return this;
  },

  pause: function () {
    this.options.debug && console.log('pause', this.clock);
    this.$audio.pause();
    return this;
  },

  reset: function () {
    this.options.debug && console.log('reset');
    DJK_SOUNDS = shuffle(DJK_SOUNDS);
    this.idx = 0;
    this.$audio.currentTime = 0.0;
    return this;
  },

  next: function () {
    this.options.debug && console.log('next', this.idx);
    this.idx++;
    if (this.idx >= DJK_SOUNDS.length) { this.reset(); }

    this.render();
    this.$audio.load();
    if(this.clock && this.options.kpd >= MAX_KPD) { this.play(); }
    return this;
  },

  start: function () {
    this.options.debug && console.log('start', this.clock, this.interval);
    window.clearTimeout(this.clock);
    if(0 === this.options.kpd) {
      this.stop();
    } else if(this.options.kpd >= MAX_KPD) {
      this.interval = 0;
      this.clock = true;
    } else {
      var duration = (MS_PER_DAY / (2 ** this.options.kpd));
      this.interval = (Math.random() * duration) + (duration * 0.25);
      this.clock = window.setTimeout(this.start.bind(this), this.interval);
    }
    return this.render().play();
  },

  stop: function () {
    this.options.debug && console.log('stop', this.clock);
    if(this.clock) { window.clearTimeout(this.clock); }
    this.clock = null;
    return this.render().pause().next();
  }
};

app.init();
