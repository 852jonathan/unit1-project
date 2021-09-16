import CharacterBullet from '/scripts/CharacterBullet.js'

function Character({
  initDimension,
  initVelocity,
  initPos,
  // initBackground,
  movementKeys
}, $game) {

  const character = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    // background: initBackground,
    movementKeys,
    movement: {
      left: false,
      up: false,
      right: false,
      down: false,
      fire: false
    },
    fireCoolDown: 200,
    lastFired: Date.now() - 200
    // initialWidth: 0 //later for powerups to increase width
  }

  // Create character and appends the character to game-screen
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
      // background
    } = character
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      // .css('background', background)
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "contain")
      .css("z-index", "999")
      .appendTo('#game-screen')
      .addClass("player")
    //   .html(`<map name="playerMap" class="playerInvis">
    //   <area shape="rect" coords="108,208,110,210" style="display:none"/>
    // </map> `)
  }

  init()

  // Toggle which direction the character is moving to
  this.setCharacterMovement = (value, keyCode, e) => {
    const {
      movementKeys: {
        left,
        up,
        right,
        down,
        fire
      }
    } = character
    switch (keyCode) {
      case left:
        e.preventDefault()
        character.movement.left = value
        break
      case up:
        e.preventDefault()
        character.movement.up = value
        break
      case right:
        e.preventDefault()
        character.movement.right = value
        break
      case down:
        e.preventDefault()
        character.movement.down = value
        break
      case fire:
        e.preventDefault()
        character.movement.fire = value
        break
    }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = (addBullet) => {
    const gameW = $game.width()
    const gameH = $game.height()
    const {
      velocity,
      dimension: {
        w,
        h
      },
      position: {
        x,
        y
      },
      movement: {
        left,
        up,
        right,
        down,
        fire
      }
    } = character

    let newX = x
    let newY = y

    if (left) {
      newX = x - velocity < 0 ? 0 : newX - velocity
    }

    if (up) {
      newY = y - velocity < 0 ? 0 : newY - velocity
    }

    if (right) {
      newX = x + w + velocity > gameW ? gameW - w : newX + velocity
    }

    if (down) {
      newY = y + h + velocity > gameH ? gameH - h : newY + velocity
    }

    // On fire, it will calculate the time now minus the time character last fired.
    // if can shoot, then it will fire from the middle of the character position using "addBullet" function
    if (fire) {
      const timeNow = Date.now()
      const lastFireDiff = timeNow - character.lastFired
      if (lastFireDiff > character.fireCoolDown) {
        const charMidPoint = x + (w / 2)
        const newBullet = new CharacterBullet(y, charMidPoint) // will need to pass INIT WIDTH when doing power ups as third var of CharBullet
        addBullet(newBullet)
        character.lastFired = timeNow
      }
    }

    character.position.x = newX
    character.position.y = newY
    character.$elem.css('left', newX).css('top', newY)
  }

  // On collision by NPC/NPC Bullets, character will explode
  this.removeCharacter = () => {
    character.$elem
      .removeClass('player')
      .addClass('explosion')
      .fadeOut("800", () => {
        character.$elem.siblings("#game-over").toggle()
        updateScore()
        character.$elem.remove()
      })

      const updateScore = () => {
        let currentScore = parseInt(character.$elem.parent().siblings("#bottom-block").children().children().text())
        return character.$elem.siblings("#game-over").children(".score-board").children("#score-final").text(currentScore)
      }

  }


  Object.defineProperties(this, {
    id: {
      get: function() {
        return character.id
      }
    },
    dimension: {
      get: function() {
        return { ...character.dimension }
      }
    },
    position: {
      get: function() {
        return { ...character.position }
      }
    }
  })
}

export default Character
