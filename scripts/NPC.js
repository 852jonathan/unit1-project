import NPCBullet from './scripts/NPCBullet.js'

const INIT_WIDTH = 20

const randomInt = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

function NPC({
  initDimension,
  initXVelocity,
  initYVelocity,
  initPos,
  // initBackground,
  // movementKeys
}, $game) {

  const npc = {
    type: 'minion',
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    xVelocity: initXVelocity,
    yVelocity: initYVelocity,
    position: initPos,
    // background: initBackground,
    fireCoolDown: 800,
    lastFired: Date.now() - 800,
    hitByBullet: false,
    healthPoints: 1,
    randomVelocityCoolDown: 3000,
    lastRandomVelocity: Date.now() - 3000,
    randomCoolDown: 1000,
    lastRandomCoolDown: Date.now() - 1000
  }
  let randomNPC = null
  const randomNPCClass = () => {
    if (randomInt(0,2) == 1) {
      randomNPC = 'npc1'
    } else randomNPC = 'npc2'
  }
  randomNPCClass()


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
      // .css('background', background)
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "cover")
      // .css("transform", "translateX(200px)" + "translateY(50px)")
      .appendTo('#game-screen')
      .addClass(randomNPC)
  }
  init()



  const randomPos = () => {
    npc.position.x = randomInt(220,380)
    npc.position.y = randomInt(-100,-10)
    npc.$elem.css('top', npc.position.y).css('left', npc.position.x)
  }
  randomPos()

  const updateMovement = () => {
    const timeNow = Date.now()
    const {
      position: { x, y }
    } = npc
    let newX = x
    let newY = y

    const lastRandomCoolDownDiff = timeNow - npc.lastRandomCoolDown
    if (lastRandomCoolDownDiff > npc.randomCoolDown) {
      npc.randomVelocityCoolDown = randomInt(800, 2500)
      npc.lastRandomCoolDown = timeNow
    }

    // Randomize X Velocity
    const lastRandomVelocityDiff = timeNow - npc.lastRandomVelocity
    if (lastRandomVelocityDiff > npc.randomVelocityCoolDown) {
      // npc.xVelocity = npc.xVelocity * -1
      npc.xVelocity = randomInt(-100, 100) / 100
      npc.lastRandomVelocity = timeNow
    }

    newX += npc.xVelocity
    newY += npc.yVelocity

    npc.position.x = newX
    npc.position.y = newY
    npc.$elem.css('left', newX).css('top', newY)
  }

  // Everytime this gets invoked, update npc position
  this.moveNPC = (addNPCBullet, character) => {
    const {
      dimension: { w },
      position: { x, y }
    } = npc

    // Check if off screen
    // if (0 >= (npc.position.x + npc.dimension.w)) return { tbrNPCOnly: true }
    if (600 < (npc.position.y - npc.dimension.h)) return { tbrNPCOnly: true }


    updateMovement()

    const timeNow = Date.now()
    const lastFireDiff = timeNow - npc.lastFired
    if (lastFireDiff > npc.fireCoolDown) {
      const charMidPoint = x + (w / 2)
      const newBullet = new NPCBullet(y, charMidPoint, $game) // will need to pass INIT WIDTH when doing power ups as third var of CharBullet
      addNPCBullet(newBullet)
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
    npc.$elem
      .removeClass('npc1')
      .removeClass('npc2')
      .addClass('explosion')
      .fadeOut("800", () =>  {
        updateScore()
        npc.$elem.remove()
      })

    const updateScore = () => {
      let currentScore = parseInt(npc.$elem.parent().siblings("#bottom-block").children().children().text())
      let newScore = currentScore
      if (npc.hitByBullet) {
        newScore += 100
      }
      return npc.$elem.parent().siblings("#bottom-block").children().children().text(newScore)
      }
  }

  this.hitByBullet = (n) => {
    npc.hitByBullet = true
    npc.healthPoints -= n

    if (npc.healthPoints <= 0) {
      return true
    }

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

export default NPC
