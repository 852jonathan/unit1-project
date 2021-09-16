import Game from '/scripts/Game.js'

// CONSTANTS
const GAME_WIDTH = 500
const GAME_HEIGHT = 600
const CHARACTER_WIDTH = 40
const CHARACTER_HEIGHT = 50
const BOSS_WIDTH = 200
const BOSS_HEIGHT = 50
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
  initBackground: 'url("/assets/player.png")',
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
  initBackground: 'url("/assets/npc1.png")',

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
  initBackground: 'url("/assets/npc1.png")',
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
  initBackground: 'url("/assets/npc1.png")',
}

const npcBossSettings = {
  initDimension: {
    w: BOSS_WIDTH,
    h: BOSS_WIDTH * 140 / 84
  },
  initXVelocity: -0.5,
  initYVelocity: 0.5,
  initPos: {
    x: (GAME_WIDTH / 2) - (BOSS_WIDTH/ 2),
    y: GAME_HEIGHT - GAME_HEIGHT - BOSS_HEIGHT - 10
  },
  initBackground: 'url("/assets/npcBoss.png")',
}

const startButton = () => {
  $(".start-button").one("click",(function(){
    $("#instructions").fadeToggle()

    const game = new Game(gameSettings)
    game.addCharacter(p1Settings)
    game.startGame()
    setTimeout(() => {
      game.addNPC(npc1Settings)
      game.addNPC(npc2Settings)
      game.addNPC(npc3Settings)
      // game.addNPCBoss(npcBossSettings)
    }, 1500);

  }))
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
