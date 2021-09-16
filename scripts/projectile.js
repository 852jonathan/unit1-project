let bullet = null
let animate

const projectileInit = () => {
  bullet = document.getElementById('playerProjectile')
  bullet.style.position = 'relative'
  bullet.style.bottom = '0px'
}

const fireUp = () => {
  bullet.style.bottom = parseInt(bullet.style.bottom) + 10 + 'px'
  animate = setTimeout(fireUp, 20) // call fireUp in 20msec
}

const stop = () => {
  clearTimeout(animate);
  bullet.style.bottom = '0px'
}



let start = Date.now() // remember start time

let timer = setInterval(function () {
  // how much time passed from the start?
  let timePassed = Date.now() - start

  if (timePassed >= 3000) {
    clearInterval(timer) // finish the animation after 2 seconds
    return;
  }

  // draw the animation at the moment timePassed
  draw(timePassed)

}, 20);

// as timePassed goes from 0 to 2000
// left gets values from 0px to 400px
const draw = (timePassed) => {
  bullet.style.up = timePassed / 5 + 'px'
}

projectileInit()
