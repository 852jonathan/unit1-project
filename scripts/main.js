import Game from '/scripts/Game.js'

// CONSTANTS
const GAME_WIDTH = 500
const GAME_HEIGHT = 600
const CHARACTER_WIDTH = 40
const CHARACTER_HEIGHT = 50
const BOSS_WIDTH = 120
const BOSS_HEIGHT = 200
const VELOCITY = 1.7
const FPS = 120
const LOOP_INTERVAL = Math.round(1000 / FPS)

const gameSettings = ({
  id: '#game-screen',
  loopInterval: LOOP_INTERVAL
})

const p1Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initVelocity: VELOCITY,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2),
    y: GAME_HEIGHT - CHARACTER_HEIGHT - 30
  },
  // initBackground: 'url("/assets/player.png")',
  movementKeys: {
    left: 65,
    up: 87,
    right: 68,
    down: 83,
    fire: 74
  }
}

const npc1Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 200,
    y: GAME_HEIGHT - GAME_HEIGHT
  },
  // initBackground: 'url("/assets/npc1.png")',

}

const npc2Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 250,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 5
  },
  // initBackground: 'url("/assets/npc1.png")',
}

const npc3Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc1.png")',
}

const npc4Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc2.png")',
}

const npc5Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc2.png")',
}

const npc6Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc2.png")',
}

const npc7Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc1.png")',
}

const npc8Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc1.png")',
}

const npc9Settings = {
  initDimension: {
    w: CHARACTER_WIDTH,
    h: CHARACTER_WIDTH * 210 / 110
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (CHARACTER_WIDTH / 2) + 150,
    y: GAME_HEIGHT - GAME_HEIGHT - CHARACTER_HEIGHT - 10
  },
  // initBackground: 'url("/assets/npc1.png")',
}

const npcBossSettings = {
  initDimension: {
    w: BOSS_WIDTH,
    h: BOSS_WIDTH * 140 / 84
  },
  initXVelocity: 0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (BOSS_WIDTH/ 2),
    y: 0 - BOSS_HEIGHT
  },
  // initBackground: 'url("/assets/npcBoss.png")',
}

const startButton = () => {
  $(".start-button").one("click",(function(){
    $("#instructions").fadeToggle()

    const timeNow = Date.now()
    let spawnCoolDown = 3000
    let lastSpawnCoolDown = Date.now() - 3000

    const game = new Game(gameSettings)
    game.addCharacter(p1Settings)
    game.startGame()

    const spawnFirstGroupEnemy = () => {
      game.addNPC(npc1Settings)
      game.addNPC(npc2Settings)
      game.addNPC(npc3Settings)
    }

    const spawnSecondGroupEnemy = () => {
      game.addNPC(npc4Settings)
      game.addNPC(npc5Settings)
      game.addNPC(npc6Settings)
    }

    const spawnThirdGroupEnemy = () => {
      game.addNPC(npc7Settings)
      game.addNPC(npc8Settings)
      game.addNPC(npc9Settings)
    }

      // game.addNPCBoss(npcBossSettings)

    const spawnEnemies = () =>{
      setTimeout(() => {
        spawnFirstGroupEnemy()
      }, 1500)
      setTimeout(() => {
        spawnSecondGroupEnemy()
      }, 5000);
      setTimeout(() => {
        spawnThirdGroupEnemy()
      }, 10000);
      setTimeout(() => {
        spawnFirstGroupEnemy()
      }, 15000);
      setTimeout(() => {
        spawnSecondGroupEnemy()
      }, 20000);
      setTimeout(() => {
        spawnThirdGroupEnemy()
      }, 25000);
      setTimeout(() => {
        spawnFirstGroupEnemy()
      }, 30000);
      setTimeout(() => {
        spawnSecondGroupEnemy()
      }, 35000);
      setTimeout(() => {
        game.addNPCBoss(npcBossSettings)
      }, 40000);

    }
    spawnEnemies()



    // for (let n = 3; n >= 0; n--) {
    //   setTimeout(() => {
    //     game.addNPC(npc4Settings)
    //     game.addNPC(npc5Settings)
    //     game.addNPC(npc6Settings)
    //     }, 4000)


    // const spawnCoolDownDiff = timeNow - spawnCoolDown
    // if (spawnCoolDownDiff > lastSpawnCoolDown) {
    //   game.addNPC(npc4Settings)
    //   game.addNPC(npc5Settings)
    //   game.addNPC(npc6Settings)
    //   spawnCoolDown = timeNow

    // }
    // console.log("cooldown:" + spawnCoolDown)
    // console.log("cooldown diff:" + spawnCoolDownDiff)
    // console.log("lastcooldown:" + lastSpawnCoolDown)

      // setTimeout(() => {
      //   game.addNPC(npc7Settings)
      //   game.addNPC(npc8Settings)
      //   game.addNPC(npc9Settings)
      // }, 8000)

      // setTimeout(() => {
      //   game.addNPC(npc1Settings)
      //   game.addNPC(npc2Settings)
      //   game.addNPC(npc3Settings)
      // }, 12000)

    }

  // }
  ))
}

// const restartButton = () => {
//   $(".restart-button").one("click",(function(){
//     $("#you-lose-screen").fadeToggle()
//     const game = new Game(gameSettings)
//     game.addCharacter(p1Settings)
//     game.startGame()
//     setTimeout(() => {
//       game.addNPC(npc1Settings)
//       game.addNPC(npc2Settings)
//       game.addNPC(npc3Settings)
//     }, 1500);
//   }))
// }

const restartButton = () => {
  $(".restart-button").one("click",(function(){
    $("#game-over").fadeToggle()
    location.reload()
  }))
}

startButton()
restartButton()
