import Matter from 'matter-js';
import React, {Component} from 'react';
import a from './sounds/otro.wav';


class Game extends Component {
  constructor(args) {
    super(args);

    this.keyDownHandler = e => this.keyDown(e);
    this.keyUpHandler = e => this.keyUp(e);
    this.keyPress = [];
    this.currentTime = 0;
    this.lastTime = 0;
    this.onFloor = false;
    this.sounds = { one : new Audio() }
  }

  componentDidMount() {
    this.init();
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.removeEventListener('keyup', this.keyUpHandler, false);
  }

  keyDown(e) {
    // 49 50 51 52
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
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Body = Matter.Body,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
        element: document.getElementById("game-content"),
        engine: engine,
        options: {
            width: WIDTH,
            height: HEIGHT,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

//    let colors = {a : '#C44D58', b : '#4ECDC4', c : '#C7F464'};

    var redColor = '#C44D58', greenColor = '#C7F464';

    let options = { restitution : .5, render: {
                    strokeStyle: '#ec1414',
                    fillStyle: 'transparent',
                    lineWidth: 1  }
                };

  let options2 = { restitution : .5, render: {
                  strokeStyle: '#ec1414',
                  fillStyle: 'solid',
                  lineWidth: 1  }
              };

    let rect1 = Bodies.rectangle(WIDTH / 2, HEIGHT / 2, 40, 40,  render: {
            strokeStyle: redColor,
            fillStyle: 'transparent',
            lineWidth: 1
        });
    let rect2 = Bodies.rectangle(WIDTH / 2, HEIGHT / 2, 40, 40, options2);
    let rect3 = Bodies.rectangle(WIDTH / 2, HEIGHT / 2, 40, 40, options);
    let rect4 = Bodies.rectangle(WIDTH / 2, HEIGHT / 2, 40, 40, options);

    World.add(world, [
        rect1, rect2, rect3,
        // walls
      /*  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),*/
        Bodies.rectangle(400, 606, 800, 50.5, { isStatic: true })
    ]);

    //Events
    let self = this;

    self.sounds.one.src = a;

    Events.on(engine, 'beforeUpdate', function(event) {

      //Jump
      self.currentTime = Date.now();

      if(self.currentTime > self.lastTime && (self.keyPress[49] && self.onFloor)){
        self.lastTime = self.currentTime + 1000;

        Body.setVelocity(rect1, {x : 0, y : - 10});
        Body.rotate(rect1, 0.1);
//        self.sounds.one.play();

      }

      if(self.currentTime > self.lastTime && (self.keyPress[50] && self.onFloor)){
        self.lastTime = self.currentTime + 1000;

        Body.setVelocity(rect2, {x : 0, y : - 10});
        Body.rotate(rect2, 0.1);
//        self.sounds.one.play();

      }

      if(self.currentTime > self.lastTime && (self.keyPress[51] && self.onFloor)){
        self.lastTime = self.currentTime + 1000;

        Body.setVelocity(rect3, {x : 0, y : - 10});
        Body.rotate(rect3, 0.1);
    //        self.sounds.one.play();

      }


    });

    Events.on(engine, 'collisionActive', function(e) {
      //console.log(e);
      self.onFloor = true;
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

    Events.on(engine, 'collisionEnd', function(e) {
      self.onFloor = false;
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

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });

  }

  render() {
    return(<div id="game-content"></div>);
  }
}


export default Game;
