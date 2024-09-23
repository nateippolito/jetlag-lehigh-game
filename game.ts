import { Actor, ActorPoolSystem, AnimatedSprite, AnimationSequence, AnimationState, BoxBody, CircleBody, FilledBox, FilledCircle, FilledPolygon, Goodie, GridSystem, Hero, ImageSprite, JetLagGameConfig, KeyCodes, ManualMovement, MusicComponent, Obstacle, PolygonBody, Sensor, Sides, TextSprite, TimedEvent, initializeAndLaunch, stage } from "../jetlag";

/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
  // Use 16/9 for a game in landscape mode, and 9/16 for a game in portrait mode
  aspectRatio = { width: 16, height: 9 };
  // Make this `false` when you're done debugging your game and are ready to
  // share it with the world.
  hitBoxes = false;

  resources ={
    prefix: "assets/",
    soundNames: ["sneakysnitch.mp3"],
    imageNames: ["lehigh_logo.png", "lindyimg.png", "map.png", "rathbone.jpg", "dorm.jpg", "transparent.png", "row-1-column-1_processed.png", "row-1-column-2_processed.png", "row-1-column-3_processed.png", "row-1-column-4_processed.png", "row-2-column-1_processed.png", "row-2-column-2_processed.png", "row-2-column-3_processed.png", "row-2-column-4_processed.png", "row-3-column-1_processed.png", "row-3-column-2_processed.png", "row-3-column-3_processed.png", "row-3-column-4_processed.png", "row-4-column-1_processed.png", "row-4-column-2_processed.png", "row-4-column-3_processed.png", "row-4-column-4_processed.png"]
  };

  
}


class SomethingThatLasts {
   energyValue = 100;
   healthValue = 100;
   gradeValue = 100;
}

/**
 * This function draws the first scene that shows when the game starts.  In this
 * code, it's an interactive world that cannot be won or lost.  After your game
 * starts becoming more polished, you will probably want to use several
 * functions like this one as a way to organize the parts of your game (levels,
 * chooser, welcome screen, store, etc).
 *
 * @param level Which level of the game should be displayed
 */
function builder(level: number) {
  let sessionInfo = stage.storage.getSession("sessionInfo") as SomethingThatLasts;
  if (!sessionInfo) {
    stage.storage.setSession("sessionInfo", new SomethingThatLasts());
    sessionInfo = stage.storage.getSession("sessionInfo") as SomethingThatLasts;
  }


  //Music Component (FIX)
  if (stage.gameMusic === undefined)
    stage.gameMusic = new MusicComponent(stage.musicLibrary.getMusic("sneakysnitch.mp3"));
  stage.gameMusic.play();

  //Text Stuff c;
  //Energy
  new Actor({
    rigidBody: new CircleBody({ cx: 6, cy: 0, radius: .01 }),
    appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#FFFFFF" },  () => "Energy: "+sessionInfo.energyValue)
  });
  //Health
  new Actor({
    rigidBody: new CircleBody({ cx: 6, cy: 0.5, radius: .01 }),
    appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#FFFFFF" },  () => "Health: "+sessionInfo.healthValue)
  });
  //Energy
  new Actor({
    rigidBody: new CircleBody({ cx: 6, cy: 1, radius: .01 }),
    appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#FFFFFF" },  () => "Grades: "+sessionInfo.gradeValue)
  });




  //MAIN AREA SYSTEM
  if(level == 1){
  
    //Background
    stage.background.addLayer({ anchor: { cx: 8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "map.png" }), speed: 0 });

  // Lehigh Logo
  new Actor({
    rigidBody: new CircleBody({ cx: 8, cy: 4.5, radius: .01 }),
    appearance: new ImageSprite({width: 3.2, height: 1.8, img: "lehigh_logo.png"})
  });

  //Portal to Rathbone
  new Actor({
    appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
    rigidBody: new BoxBody({  cx: 1, cy: 8, width: 2, height: 2}),
    role: new Sensor({ heroCollision: () => stage.switchTo(builder, 2) })
  });

  //Rathbone Text
  new Actor({
    rigidBody: new CircleBody({ cx: 1, cy: 8, radius: .01 }),
    appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Rathbone")
  });

  //Portal to Library
  new Actor({
    appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
    rigidBody: new BoxBody({  cx: 15, cy: 8, width: 2, height: 2}),
    role: new Sensor({ heroCollision: () => stage.switchTo(builder, 3) })
  });

  //Library Text
  new Actor({
    rigidBody: new CircleBody({ cx: 15, cy: 8, radius: .01 }),
    appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Library")
  });

//Portal to Dorm
new Actor({
  appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
  rigidBody: new BoxBody({  cx: 15, cy: 1, width: 2, height: 2}),
  role: new Sensor({ heroCollision: () => stage.switchTo(builder, 4) })
});
//Dorm Text
new Actor({
  rigidBody: new CircleBody({ cx: 15, cy: 1, radius: .01 }),
  appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Dorm")
});



}

let animations = new Map();
animations.set(AnimationState.WALK_N, new AnimationSequence(true).to("row-2-column-1_processed.png", 75).to("row-2-column-2_processed.png", 75).to("row-2-column-3_processed.png", 75).to("row-2-column-4_processed.png", 75));
animations.set(AnimationState.WALK_W, new AnimationSequence(true).to("row-3-column-1_processed.png", 75).to("row-3-column-2_processed.png", 75).to("row-3-column-3_processed.png", 75).to("row-3-column-4_processed.png", 75));
animations.set(AnimationState.WALK_E, new AnimationSequence(true).to("row-4-column-1_processed.png", 75).to("row-4-column-2_processed.png", 75).to("row-4-column-3_processed.png", 75).to("row-4-column-4_processed.png", 75));
animations.set(AnimationState.WALK_S, new AnimationSequence(true).to("row-1-column-1_processed.png", 75).to("row-1-column-2_processed.png", 75).to("row-1-column-3_processed.png", 75).to("row-1-column-4_processed.png", 75));

animations.set(AnimationState.IDLE_N, new AnimationSequence(true).to("row-1-column-3_processed.png", 750).to("row-1-column-1_processed.png", 75));
animations.set(AnimationState.IDLE_W, new AnimationSequence(true).to("row-1-column-3_processed.png", 750).to("row-1-column-1_processed.png", 75));
animations.set(AnimationState.IDLE_S, new AnimationSequence(true).to("row-1-column-3_processed.png", 750).to("row-1-column-1_processed.png", 75));
animations.set(AnimationState.IDLE_E, new AnimationSequence(true).to("row-1-column-3_processed.png", 750).to("row-1-column-1_processed.png", 75));


let remap = new Map();
remap.set(AnimationState.WALK_NW, AnimationState.WALK_W);
remap.set(AnimationState.WALK_SW, AnimationState.WALK_W);
remap.set(AnimationState.WALK_NE, AnimationState.WALK_E);
remap.set(AnimationState.WALK_SE, AnimationState.WALK_E);

remap.set(AnimationState.IDLE_NW, AnimationState.IDLE_W);
remap.set(AnimationState.IDLE_SW, AnimationState.IDLE_W);
remap.set(AnimationState.IDLE_NE, AnimationState.IDLE_E);
remap.set(AnimationState.IDLE_SE, AnimationState.IDLE_E);

remap.set(AnimationState.TOSS_NW, AnimationState.TOSS_W);
remap.set(AnimationState.TOSS_SW, AnimationState.TOSS_W);
remap.set(AnimationState.TOSS_NE, AnimationState.TOSS_E);
remap.set(AnimationState.TOSS_SE, AnimationState.TOSS_E);

remap.set(AnimationState.TOSS_IDLE_N, AnimationState.TOSS_N);
remap.set(AnimationState.TOSS_IDLE_S, AnimationState.TOSS_S);
remap.set(AnimationState.TOSS_IDLE_E, AnimationState.TOSS_E);
remap.set(AnimationState.TOSS_IDLE_W, AnimationState.TOSS_W);

remap.set(AnimationState.TOSS_IDLE_NW, AnimationState.TOSS_NW);
remap.set(AnimationState.TOSS_IDLE_SW, AnimationState.TOSS_SW);
remap.set(AnimationState.TOSS_IDLE_NE, AnimationState.TOSS_NE);
remap.set(AnimationState.TOSS_IDLE_SE, AnimationState.TOSS_SE);

  // Make a "hero" who moves via keyboard control and appears as a circle
  let hero = new Actor({
    appearance: new AnimatedSprite({width: 2, height: 2, animations, remap}),
    rigidBody: new BoxBody({ cx: 8, cy: 4.5, height: 1, width: 1}),
    role: new Hero(),
    movement: new ManualMovement(),
  });
  
  // Make an obstacle that is a rectangle


  //Timer
  
  stage.world.timer.addEvent(new TimedEvent(1, true, () => {
    if(sessionInfo.energyValue>=2){
      sessionInfo.energyValue-=2}

    if(sessionInfo.energyValue==0 || sessionInfo.gradeValue==0){
      sessionInfo.healthValue-=5
    }
    if(sessionInfo.gradeValue>=2){
      sessionInfo.gradeValue-=2
    }
    if(sessionInfo.healthValue<=0){
      stage.switchTo(builder, 5)
    }
  }));
  


 
  //RATHBONE LEVEL FOOD SYSTEM
  if(level == 2)
    {
    //Background
    stage.background.addLayer({ anchor: { cx: 8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "rathbone.jpg" }), speed: 0 });
        //Collect Food Text
      new Actor({
        rigidBody: new CircleBody({ cx: 8, cy: 8, radius: .01 }),
        appearance: new TextSprite({ center: true, face: "Arial", size: 30, color: "#FFFFFF"}, " Collect Food!")
      });
  function createGoodie(){
    new Actor({
      appearance: new FilledCircle({ radius: 0.5, fillColor: "#FF0000" }),
      rigidBody: new CircleBody({ cx: Math.floor((Math.random() * 13)+3), cy: Math.floor((Math.random() * 6)+2), radius: 0.4 }),
      role: new Goodie({
        onCollect: () => {
          sessionInfo.energyValue += 10;
          if(sessionInfo.energyValue>100){
            sessionInfo.energyValue = 100;
          }
          createGoodie();
          return true;
        }
      })
    });}
    createGoodie();
    //PORTAL BACK TO MAIN AREA
    new Actor({
      appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 15, cy: 1, width: 2, height: 2}),
      role: new Sensor({ heroCollision: () => stage.switchTo(builder, 1) })
    });
    //PORTAL TEXT
    new Actor({
      rigidBody: new CircleBody({ cx: 15, cy: 1, radius: .01 }),
      appearance: [new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Main Area"),

      ]
    });
  }
  
  //LIBRARY LEVEL
  if(level == 3){

    stage.background.addLayer({ anchor: { cx: 8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "lindyimg.png" }), speed: 0 });

    //PORTAL BACK TO MAIN AREA
    new Actor({
      appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 1, cy: 1, width: 2, height: 2}),
      role: new Sensor({ heroCollision: () => stage.switchTo(builder, 1) })
    });
    //PORTAL TEXT
    new Actor({
      rigidBody: new CircleBody({ cx: 1, cy: 1, radius: .01 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Main Area")
    });
    //Knowledge Text
    new Actor({
      rigidBody: new CircleBody({ cx: 8, cy: 8, radius: .01 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 30, color: "#FFFFFF"}, " Collect Knowledge!")
    });


    //Knowledge Collecting System
    function createGoodie(){
      new Actor({
        appearance: new FilledCircle({ radius: 0.5, fillColor: "#8000ff" }),
        rigidBody: new CircleBody({ cx: Math.floor((Math.random() * 13)+3), cy: Math.floor((Math.random() * 6)+2), radius: 0.4 }),
        role: new Goodie({
          onCollect: () => {
            sessionInfo.gradeValue += 10;
            if(sessionInfo.gradeValue>100){
              sessionInfo.gradeValue = 100;
            }
            createGoodie();
            return true;
          }
        })
      });}
      createGoodie();
    
  
}
if(level == 4){
  stage.background.addLayer({ anchor: { cx: 8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "dorm.jpg" }), speed: 0 });

    //PORTAL BACK TO MAIN AREA
    new Actor({
      appearance: new FilledBox({width: 2, height: 2, fillColor: "#000000" }),
      rigidBody: new BoxBody({ cx: 1, cy: 8, width: 2, height: 2}),
      role: new Sensor({ heroCollision: () => stage.switchTo(builder, 1) })
    });
    //PORTAL TEXT
    new Actor({
      rigidBody: new CircleBody({ cx: 1, cy: 8, radius: .01 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Main Area")
    });


     //sleep
     new Actor({
      appearance: new ImageSprite({width: 2, height: 2, img: "transparent.png"}),
      rigidBody: new BoxBody({ cx: 5, cy: 5, width: 1, height: 1}),
      role: new Sensor({ heroCollision: (_o: Actor, h: Actor) => {
        sessionInfo.energyValue -= 10;
        sessionInfo.healthValue += 10;
        sessionInfo.gradeValue -= 20;

        if(sessionInfo.energyValue > 100){
          sessionInfo.energyValue = 100;
        }

        if(sessionInfo.healthValue > 100){
          sessionInfo.healthValue =100;
        }

        if(sessionInfo.gradeValue < 0){
          sessionInfo.gradeValue = 0;
        }
        stage.switchTo(builder ,4)
      }
    }),
       
    });
    //sleep text
    new Actor({
      rigidBody: new CircleBody({ cx: 5, cy: 5, radius: .01 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 20, color: "#FFFFFF" }, "Sleep!")
    });

}
if(level == 5){
  new Actor({
    rigidBody: new CircleBody({ cx: 5, cy: 5, radius: .01 }),
    appearance: new TextSprite({ center: true, face: "Arial", size: 60, color: "#000000" }, "You lost! :c")
  });
}

  // Pressing a key will change the hero's velocity
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_UP, () => (hero.movement as ManualMovement).updateYVelocity(0));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DOWN, () => (hero.movement as ManualMovement).updateYVelocity(0));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => (hero.movement as ManualMovement).updateXVelocity(0));
  stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => (hero.movement as ManualMovement).updateXVelocity(0));
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_UP, () => (hero.movement as ManualMovement).updateYVelocity(-5));
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_DOWN, () => (hero.movement as ManualMovement).updateYVelocity(5));
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => (hero.movement as ManualMovement).updateXVelocity(-5));
  stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => (hero.movement as ManualMovement).updateXVelocity(5));
}

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);

