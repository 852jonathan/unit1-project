import NPCBullet from './scripts/NPCBullet.js'

const INIT_WIDTH = 20
const randomInt = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

function NPCBoss({
  initDimension,
  initXVelocity,
  initYVelocity,
  initPos,
  // initBackground,
  // movementKeys
}, $game) {
  const npc = {
    type: 'boss',
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    xVelocity: initXVelocity,
    yVelocity: initYVelocity,
    position: initPos,
    // background: initBackground,
    fireCoolDown: 500,
    lastFired: Date.now() - 500,
    hitByBullet: false,
    healthPoints: 20,
    randomVelocityCoolDown: 3000,
    lastRandomVelocity: Date.now() - 3000,
    randomCoolDown: 1000,
    lastRandomCoolDown: Date.now() - 1000
  }

  // Create npc and appends the npc to game-screen
  const init = () => {
    const {
      id,
      position: { x, y },
      dimension: { w, h },
      // background
    } = npc

    npc.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "cover")
      .appendTo('#game-screen')
      .addClass('npcBoss')
  }

  init()

  const updateMovement = () => {
    const gameW = $game.width()
    const timeNow = Date.now()
    const {
      position: { x, y }
    } = npc
    let newX = x
    let newY = y

    // Randomize X Velocity Cooldown
    const lastRandomCoolDownDiff = timeNow - npc.lastRandomCoolDown
    if (lastRandomCoolDownDiff > npc.randomCoolDown) {
      npc.randomVelocityCoolDown = randomInt(800, 2500)
      npc.lastRandomCoolDown = timeNow
    }

    // Randomize X Velocity
    const lastRandomVelocityDiff = timeNow - npc.lastRandomVelocity
    if (lastRandomVelocityDiff > npc.randomVelocityCoolDown) {
      npc.xVelocity = randomInt(-100, 100) / 100
      npc.lastRandomVelocity = timeNow
    }

    if (newY < 0) {
      newY += npc.yVelocity
    } else {
      if (newX + npc.xVelocity < 0) {
        newX = 0
        npc.xVelocity *= -1
      }

      if (newX + npc.dimension.w + npc.xVelocity > gameW) {
        newX = gameW - npc.dimension.w
        npc.xVelocity *= -1
      }

      newX += npc.xVelocity
    }

    npc.position.x = newX
    npc.position.y = newY
    npc.$elem.css('left', newX).css('top', newY)

  }

  // Everytime this gets invoked, update npc position
  this.moveNPC = (addNPCBullet, character) => {
    const {
      xVelocity,
      yVelocity,
      dimension: { w, h },
      position: { x, y }
    } = npc

    // Check if off screen
    // if (0 >= (x + w)) return { tbrNPCOnly: true }

    updateMovement()

    const timeNow = Date.now()
    const lastFireDiff = timeNow - npc.lastFired
    if (lastFireDiff > npc.fireCoolDown) {
    // if (lastFireDiff > npc.fireCoolDown && npc.position.y >= 0) { //only start shooting when appear
      npc.fireCoolDown = randomInt(200,700) // randomize fire cooldown
      const charMidPoint = x + (w / 2)
      const newBullet1 = new NPCBullet((y + npc.dimension.h - 10), (charMidPoint + 15), $game) // will need to pass INIT WIDTH when doing power ups as third var of CharBullet
      const newBullet2 = new NPCBullet((y + npc.dimension.h - 10), (charMidPoint - 15), $game) // will need to pass INIT WIDTH when doing power ups as third var of CharBullet
      addNPCBullet(newBullet1)
      addNPCBullet(newBullet2)
      npc.lastFired = timeNow
    }

    // for (let npc of npcs) {
      // checking if player plane collided with npc
      if (character.position.x < npc.position.x + npc.dimension.w &&
          character.position.x + character.dimension.w > npc.position.x &&
          character.position.y < npc.position.y + npc.dimension.h &&
          character.position.y + character.dimension.h > npc.position.y) {
        console.log("hit by npc plane")
        return { tbrCharacter: character }
      // }
    }

    return {}
  }

  this.removeSelf = () => {
    // const changeToExplosion = () => {
      npc.$elem
      .removeClass('npcBoss')
      .removeClass('npcBoss-low')
      .addClass('explosionBoss')
      .fadeOut("800", () => {
        npc.$elem.siblings("#you-win").toggle()
        updateScore()
        updateFinalScore()
        npc.$elem.remove()

      })

      const updateScore = () => {
        let currentScore = parseInt(npc.$elem.parent().siblings("#bottom-block").children().children().text())
        let newScore = currentScore
        if (npc.hitByBullet) {
          newScore += 1000
        }
        return npc.$elem.parent().siblings("#bottom-block").children().children().text(newScore)
      }

      const updateFinalScore = () => {
        let currentScore = parseInt(npc.$elem.parent().siblings("#bottom-block").children().children().text())
        return npc.$elem.siblings("#you-win").children(".score-board").children("#score-final").text(currentScore)
      }

  }

  this.hitByBullet = (n) => {
    npc.hitByBullet = true
    npc.healthPoints -= n

    if (npc.healthPoints <= 0) {
      return true
    } else if (npc.healthPoints == 10) {
      npc.$elem
      .removeClass('npcBoss')
      .addClass('npcBoss-low')
      return false
    } else

    return false
  }

  Object.defineProperties(this, {
    id: {
      get: function() {
        return npc.id
      }
    },
    dimension: {
      get: function() {
        return { ...npc.dimension }
      }
    },
    position: {
      get: function() {
        return { ...npc.position }
      }
    },
    type: {
      get: function() {
        return npc.type
      }
    }
  })
}

export default NPCBoss
