import NPCBullet from '/scripts/NPCBullet.js'

const INIT_WIDTH = 20

function NPCBoss({
  initDimension,
  initXVelocity,
  initYVelocity,
  initPos,
  initBackground,
  // movementKeys
}, $game) {

  const npc = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    xVelocity: initXVelocity,
    yVelocity: initYVelocity,
    position: initPos,
    background: initBackground,
    fireCoolDown: 500,
    lastFired: Date.now() - 500,
    hitByBullet: false,
    healthPoints: null,
  }

  // Create npc and appends the npc to game-screen
  const init = () => {
    const {
      id,
      position: { x, y },
      dimension: { w, h },
      background
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
      .addClass('npcBoss')
  }

  init()

  // Everytime this gets invoked, update npc position
  this.moveNPC = (addNPCBullet, character) => {
    const {
      xVelocity,
      yVelocity,
      dimension: { w, h },
      position: { x, y }
    } = npc

    // Check if off screen
    if (0 >= (x + w)) return { tbrNPCOnly: true }

    // Change Position
    let newX = x
    let newY = y

      if (xVelocity < 0) { //if xVelocity is heading to the left....
        if (x + xVelocity < lBound) {
          newX = lBound
        } else {
          newX = newX + xVelocity //keep moving to the left
        }
      } else { //if xVelocity is heading to the right...
        if (x + w + xVelocity > rBound) {
          newX = rBound - w
        } else {
          newX = newX + xVelocity //keep moving to the left
        }
      }

    npc.position.x = newX // updates the new X position in the array
    $elem.css('left', newX) // replaces the left position in CSS
  })
}

    newX = x + xVelocity
    npc.position.x = newX
    npc.$elem.css('left', newX)

    newX = x - xVelocity
    npc.position.x = newX
    npc.$elem.css('right', newX)

    // const moveLeft = () => {
    //   newX += xVelocity
    //   console.log("left")
    //   setInterval(() => {
    //     moveRight()
    //   }, 500);
    //   // newY += yVelocity
    // }
    // moveLeft()

    // const moveRight = () => {
    //   newX -= xVelocity
    //   console.log("right")
    //   setInterval(() => {
    //     moveLeft()
    //   }, 500)
      // newY += yVelocity
    // }
    // moveRight()


    const timeNow = Date.now()
    const lastFireDiff = timeNow - npc.lastFired
    if (lastFireDiff > npc.fireCoolDown) {
      const charMidPoint = x + (w / 2)
      const newBullet = new NPCBullet(y, charMidPoint, $game) // will need to pass INIT WIDTH when doing power ups as third var of CharBullet
      addNPCBullet(newBullet)
      npc.lastFired = timeNow
    }

    npc.position.x = newX
    npc.position.y = newY
    npc.$elem.css('left', newX).css('top', newY)

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

  this.hitCount = (n) => {
    let currentHealth = npc.healthPoints
    currentHealth = n++

    console.log("currentHealth :" + currentHealth)
    console.log("npc healthpoints:" + npc.healthPoints)

      if (currentHealth == 200) {
      // this.removeSelf()

      console.log("hitCount")
      console.log("currentHealth after hit: " + currentHealth)
      console.log("n :" + n )

    } else {
      console.log("not dead yet")
    }
  }

  this.removeSelf = () => {
    // const changeToExplosion = () => {
      npc.$elem
      .removeClass('npcBoss')
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

  this.hitByBullet = () => {
    npc.hitByBullet = true
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
    }
  })
}

export default NPCBoss
