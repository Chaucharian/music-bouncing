import Matter from 'matter-js';
import React, {Component} from 'react';
import SoundManager from './SoundManager';

class Tools {
  static getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static getRandomHexaColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
}

class Game extends Component {
  constructor(args) {
    super(args);

    this.keyDownHandler = e => this.keyDown(e);
    this.keyUpHandler = e => this.keyUp(e);
    this.keyPress = [];
    this.currentTime = Date.now();
    this.lastTime = 0;
    this.onFloor = false;

    this.soundManager = new SoundManager();
  }

  componentDidMount() {
    this.init();
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);

    this.getPics();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.removeEventListener('keyup', this.keyUpHandler, false);
  }

  getPics() {
    fetch("http://localhost:8888/login")
      .then(res => console.log("asd"))
      .then(
        (result) => {
          console.log("el resul ",result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )
  }

  keyDown(e) {
    // 49 50 51 52
    //console.log(e.keyCode);
    this.currentTime = Date.now();
    this.keyPress[e.keyCode] = true;
  }

  keyUp(e) {
    this.keyPress[e.keyCode] = false;
  }

  init() {
    const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Composite = Matter.Composite,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Body = Matter.Body,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

    // create engine
    let engine = Engine.create(),
        world = engine.world;
        world.gravity.y = 0;


    // create renderer
    let render = Render.create({
        element: document.getElementById("game-content"),
        engine: engine,
        options: {
            width: WIDTH,
            height: HEIGHT,
            showAngleIndicator: false,
            wireframes: false

        }
    });

    Render.run(render);


    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    let player = Bodies.rectangle(WIDTH / 2, HEIGHT / 2, 40, 40,  render: {  strokeStyle: "#asdsa", fillStyle: 'transparent',lineWidth: 1});
    //A bodies container
    let composite = Composite.create();
    //Add all bodies to the world
    World.add(world, player);

    //Events
    let move_velocity = 10;
    let tempRect = null;

    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

    Events.on(engine, 'beforeUpdate', (event) => {

      // Make rect pressing space
      if(this.keyPress[32] && this.lastTime <= this.currentTime) {
          //Makes a delay between key and key
          this.lastTime = this.currentTime + 800;

          tempRect = makeRect();
          this.soundManager.get().sound.play();
          Composite.add(composite, tempRect);
          World.add(world, composite);
        }
    });

    Events.on(engine, 'collisionActive', (e)  => {
      //console.log(e);
      //this.onFloor = true;
//      self.sounds.one.play();
      //self.sounds.one.play();
    /*  var i, pair,
          length = e.pairs.length;
      for(i = 0; i < length; i++) {
        pair = event.pairs[i];
        if(!(pair.bodyA.label === 'Player' || pair.bodyB.label === 'Player')) {
          continue;
        }
        //Here body with label 'Player' is in the pair, do some stuff with it
      }*/
    });

    Events.on(engine, 'collisionEnd', (e) => {
    //  this.onFloor = false;
    /*  var i, pair,
          length = e.pairs.length;
      for(i = 0; i < length; i++) {
        pair = event.pairs[i];
        if(!(pair.bodyA.label === 'Player' || pair.bodyB.label === 'Player')) {
          continue;
        }
        //Here body with label 'Player' is in the pair, do some stuff with it
      }*/
    });

    Events.on(engine, 'bodytouched', (body) => {
      console.log("aa");
    });

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });

    function makeRect() {
        let options = { restitution : .5, isStatic : true, render: {  strokeStyle: Tools.getRandomHexaColor(), fillStyle: 'transparent', lineWidth: 1  } };
        return Bodies.rectangle(Tools.getRandom(0 , WIDTH), Tools.getRandom(0, HEIGHT), Tools.getRandom(20, 100), Tools.getRandom(20, 100), options);
    }

  }

  render() {
    return(<div id="game-content"></div>);
  }
}

export default Game;
