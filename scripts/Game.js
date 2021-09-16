import Character from './scripts/Character.js'
import NPC from './scripts/NPC.js'
import NPCBoss from './scripts/NPCBoss.js'

// import Powerup1 from './scripts/Powerup.js'

function Game({
  id,
  loopInterval
}) {
  const game = {
    $elem: $(id),
    id,
    loop: null,
    character: null,
    tbrCharacter: false,
    playerBullets: [],
    tbrPBullets: [],
    npcs: [],
    tbrNPCs: [],
    NPCBullets: [],
    tbrNPCBullets: [],
    // npcBoss: [],
    // tbrNPCBoss:[],
  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.character.setCharacterMovement(true, e.keyCode, e)
  }

  // Handling Key Up
  const handleKeyUp = (e) => {
    game.character.setCharacterMovement(false, e.keyCode, e)
  }

  const findAndRemove = (tbrArr, targetArr) => {
    // forEach npc to be removed,
    // remove corresponding npc using their npc ID
    // splice npc according to their index
    // set toBeRemoved npcs as empty

    tbrArr.forEach((tbr) => {
      let index = targetArr.findIndex((target) => tbr.id === target.id)
      if (index >= 0) {
        const [target] = targetArr.splice(index, 1)
        if(target.type === 'boss') {
          clearInterval(game.loop)
          game.loop = null
        }
        target.removeSelf()
      }
    })
  }

  const removeElements = () => {
    // Removal Of Character
    if (game.tbrCharacter) {
      game.character.removeCharacter()
      clearInterval(game.loop)
      game.loop = null
    }

    // Removal of NPCs
    findAndRemove(game.tbrNPCs, game.npcs)
    game.tbrNPCs = []

    // Removal of NPC Bullets
    findAndRemove(game.tbrNPCBullets, game.NPCBullets)
    game.tbrNPCBullets = []

    // Removal of Player Bullets
    findAndRemove(game.tbrPBullets, game.playerBullets)
    game.tbrPBullets = []
  }

  const updateMovements = () => {
    // Character Movement
    game.character.moveCharacter(this.addBullet)

    // NPC Movement
    game.npcs.forEach((npc) => {
      const tbrInfo = npc.moveNPC(this.addNPCBullet, game.character)
      if (tbrInfo.tbrNPCOnly) {
        game.tbrNPCs.push(npc)
      }

      if (tbrInfo.tbrCharacter) {
        game.tbrCharacter = true
      }
    })

    // NPCBullet Movement & NPCBullet vs Player Collision
    game.NPCBullets.forEach((NPCBullet) => {
      const tbrInfo = NPCBullet.moveNPCBullet(game.character)

      if (tbrInfo.tbrNPCBulletOnly) {
        game.tbrNPCBullets.push(NPCBullet)
      }

      if (tbrInfo.tbrNPCBulletAndP) {
        game.tbrNPCBullets.push(NPCBullet)
        game.tbrCharacter = tbrInfo.tbrNPCBulletAndP
      }
    })

    // PBullet Movement & PBullet vs NPC Collision
    game.playerBullets.forEach((bullet) => {
      const tbrInfo = bullet.moveBullet(game.npcs)

      if (tbrInfo.tbrPBulletOnly) {
        game.tbrPBullets.push(bullet)
      }
      if (tbrInfo.tbrPBulletAndNPC) {
        game.tbrPBullets.push(bullet)
        game.tbrNPCs.push(tbrInfo.tbrPBulletAndNPC)
      }
    })

    removeElements()
  }

  // NPC related additions
  this.addNPC = (setting) => {
    game.npcs.push(new NPC(setting, game.$elem))
  }

  this.addNPCBullet = (NPCBullet) => {
    game.NPCBullets.push(NPCBullet)
  }

  this.addNPCBoss = (setting) => {
    game.npcs.push(new NPCBoss(setting, game.$elem))
  }

  // Player related additions
  this.addCharacter = (setting) => {
    game.character = new Character(setting, game.$elem)
  }

  this.addBullet = (bullet) => {
    game.playerBullets.push(bullet)
  }

  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
  }
}

export default Game
