// import NPC from '/scripts/NPC.js'

const INIT_WIDTH = 20

function CharacterBullet(y, charMidPoint) {
  const bullet = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: {
      w: INIT_WIDTH,
      h: INIT_WIDTH * 68 / 31
    },
    velocity: 2.5,
    position: {
      x: charMidPoint - 10,
      y
    },
    // background: initBackground,
  }

  const init = () => {
    const {
      id,
      position: {
        x,
        y
      },
      dimension: {
        w,
        h
      },
      background
    } = bullet


    bullet.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      .css('background', 'url("/assets/playerProjectile.png")')
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "contain")
      .appendTo('#game-screen')
  }

  init()

  //moves the bullet upwards when shot out by Player
  this.moveBullet = (npcs) => {
    const {
      velocity,
      dimension: { h },
      position: { y }
    } = bullet

    // Check if off screen
    if (0 >= (y + h)) return { tbrPBulletOnly: true }

    // Change Position
    let newY = y - velocity
    bullet.position.y = newY
    bullet.$elem.css('top', newY)

    // Check collision with npc
    for (let npc of npcs) {
      // checking if bullet of player collided with npc
      if (bullet.position.x < npc.position.x + npc.dimension.w &&
          bullet.position.x + bullet.dimension.w > npc.position.x &&
          bullet.position.y < npc.position.y + npc.dimension.h &&
          bullet.position.y + bullet.dimension.h > npc.position.y) {
        console.log("hit by player")
        npc.hitByBullet()
        npc.hitCount(1)
        // console.log("character bullet hitcount:" + hitCount())

        // console.log(npc.hitByBullet)
        return { tbrPBulletAndNPC: npc }
      }

    }

    return {}
  }

  //removes bullet when out of bounds
  this.removeSelf = () => {
    bullet.$elem.remove()
  }

  Object.defineProperties(this, {
    id: {
      get: function() {
        return bullet.id
      }
    }
  })
}

export default CharacterBullet
