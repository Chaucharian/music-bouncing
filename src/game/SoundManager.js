//Sounds imports
import _1 from './sounds/choice.mp3';
import _2 from './sounds/Hihat.wav';
import _3 from './sounds/rollover.mp3';
import _4 from './sounds/Hihat_2.wav';
import _5 from './sounds/Bongo_Soft.wav';
import _6 from './sounds/Perc_Eco.wav';
import _7 from './sounds/Bongo_High.wav';
import _8 from './sounds/Bongo_Soft2.wav';


class Sound {
  constructor(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.loop = true;
  }
}

export default class SoundManager {

  constructor() {
    this.sounds = [_1,_2,_3,_4,_5,_6,_7,_8];
    this.count = -1;

    this.init();
  }

  init() {
      for(let i = 0; i < this.sounds.length; i++) {
        this.sounds[i] = new Sound(this.sounds[i]);
      }
  }

  //Get the next at list
  get() {
    this.count += 1;
    return this.sounds[this.count];
  }
}
