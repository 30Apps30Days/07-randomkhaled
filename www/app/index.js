'use strict';

var DJK_SOUNDS = [
  '1Rtlg3-mrv8.mp3',
  '4YqV8n_kfsU-01.mp3',
  '4YqV8n_kfsU.mp3',
  '5Tf1wJwvzcc.mp3',
  'E2Lw9YWLVts.mp3',
  'HdT_oKderEs.mp3',
  'QtPluXq_hko.mp3',
  'zWhowrdR4dU.mp3'
];

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

var app = {
  // options
  idx: 0,

  // internal
  $audio: null,
  $source: null,

  init: function () {
    bindEvents(this, {
      'document': {'deviceready': this.ready},
      'window': {'load': this.ready},
      'form input': {'change': this.change},
      'main': {'click': this.toggle},
      'audio': {'ended': this.next}
    });
    return this;
  },

  ready: function () {
    this.$audio = document.querySelector('audio');
    this.$source = document.querySelector('source');
    this.reset();
    this.render();
    return this;
  },

  change: function () {
  },

  render: function () {
    this.$source.src = 'lib/dj-khaled/' + DJK_SOUNDS[this.idx];
    return this;
  },

  reset: function () {
    DJK_SOUNDS = shuffle(DJK_SOUNDS);
    this.idx = 0;
    this.$audio.currentTime = 0.0;
    return this;
  },

  next: function () {
    this.idx++;
    if (this.idx >= DJK_SOUNDS.length) { this.reset(); }

    this.render();
    this.$audio.load();
    return this;
  },

  toggle: function (force) {
    if (true === force || this.$audio.paused) {
      this.$audio.currentTime = 0.0;
      this.$audio.play();
    } else {
      this.$audio.pause();
    }
    return this;
  }
};

app.init();
