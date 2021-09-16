const INIT_WIDTH = 10

function NPCBullet(y, charMidPoint, $game) {
  const bullet = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: {
      w: INIT_WIDTH,
      h: INIT_WIDTH * 52 / 23
    },
    velocity: 2.5,
    position: {
      x: charMidPoint - 5,
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
      .css('background', 'url("assets/npcProjectile.png")')
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "contain")
      .appendTo('#game-screen')
  }

  init()

  this.moveNPCBullet = (character) => {
    const gH = $game.height()
    const {
      velocity,
      dimension: { h },
      position: { y }
    } = bullet

    // Check if off screen
    if (gH <= y) return { tbrNPCBulletOnly: true }

    // Change Position
    let newY = y + velocity
    bullet.position.y = newY
    bullet.$elem.css('top', newY)

    // Check collision with character
    // checking if bullet of npc collided with player
    if (bullet.position.x < character.position.x + character.dimension.w &&
        bullet.position.x + bullet.dimension.w > character.position.x &&
        bullet.position.y < character.position.y + character.dimension.h &&
        bullet.position.y + bullet.dimension.h > character.position.y) {
        console.log("hit by npc")
      return { tbrNPCBulletAndP: character }
    }

    return {}
  }

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

export default NPCBullet
