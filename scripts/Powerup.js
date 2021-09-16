function Powerup1() {

  const powerup = {
    $elem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: {
      w: INIT_WIDTH,
      h: INIT_WIDTH * 62 / 62
    },
    position: {
      x,
      y
    },
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
    } = powerup


    bullet.$elem = $(`<div id="${id}"></div>`)
      .css('left', x)
      .css('top', y)
      .css('background', 'url("/assets/money-powerup.png")')
      .css('width', w)
      .css('height', h)
      .css('position', 'absolute')
      .css("background-size", "contain")
      .appendTo('#game-screen')
  }

  init()

  const randomNumber = (min,max) => {
    return Math.random() * (max - min) + min;
  }

  randomNumber()

  const spawnPowerup = () => {

  }



  setInterval(() => {
    spawnPowerup()
  }, 1500);

}
export default Powerup1
