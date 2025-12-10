import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css'


function App() {


  const canvasref = useRef(null)
  useEffect(() => {
    let keyCheckVariable = new Set();

    let mouse = { x: null, y: null }
    addEventListener("mousemove", (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })
    let canvas = canvasref.current;
    let ctx = canvas.getContext("2d")
    let img = new Image()
    let grassl = new Image()
    let sword = new Image();
    grassl.src = '../src/assets/indir.jpeg'
    sword.src = '../src/assets/sword.png'
    img.src = '../src/assets/korbey.png'

    let
      x = 0,
      speed = 5,
      color = 'red',
      goBack = false,
      moreKeys = false,
      gonIncrease = true,
      animateCounter = 0,
      attackSword = false,
      reverse = false,
      swordAnimationTime = 0;
    let box = {
      x: 0,
      y: 50,
      height: 50,
      width: 50
    }
    let image = {
      x: 50,
      y: 50,
      height: 100,
      width: 100
    },
      swordObject = {
        x: -50,
        y: -50,
        height: 100,
        width: 100,
        translateX: 125,
        translateY: 125
      }
    let grassObject = {
      x: 0,
      y: 0,
      width: 600,
      height: 600
    }

    let angle = 0;
    document.addEventListener("keypress", (e) => {
      keyCheckVariable.add(e.key)
      if (e.key == 'w' && moreKeys) { image.y -= speed; swordObject.translateY -= speed }
      if (e.key == 'a' && moreKeys) { image.x -= speed; swordObject.translateX -= speed }
      if (e.key == 's' && moreKeys) { image.y += speed; swordObject.translateY += speed }
      if (e.key == 'd' && moreKeys) { image.x += speed; swordObject.translateX += speed }
      if (keyCheckVariable.has("a") && keyCheckVariable.has("s")) {
        moreKeys = false;
        image.y += speed;
        image.x -= speed;
        swordObject.translateY += speed
        swordObject.translateX -= speed
      }
      else if (keyCheckVariable.has("d") && keyCheckVariable.has("s")) {
        moreKeys = false
        image.x += speed
        image.y += speed
        swordObject.translateX += speed
        swordObject.translateY += speed


      }
      else if (keyCheckVariable.has("w") && keyCheckVariable.has("a")) {
        moreKeys = false
        image.x -= speed
        image.y -= speed
        swordObject.translateX -= speed
        swordObject.translateY -= speed

      }
      else if (keyCheckVariable.has("w") && keyCheckVariable.has("d")) {
        moreKeys = false
        image.x += speed
        image.y -= speed
        swordObject.translateX += speed
        swordObject.translateY -= speed
      }
      else {
        moreKeys = true
      }

    })
    //a


    document.addEventListener("keyup", (e) => {
      keyCheckVariable.delete(e.key)
    })
    function attackAnimation() {
      ctx.save()
      ctx.translate(swordObject.translateX, swordObject.translateY)
      ctx.rotate(angle)
      ctx.drawImage(sword, swordObject.x, swordObject.y, swordObject.width, swordObject.height)
      ctx.restore()
      if (animateCounter <= 74) {
        if (angle < 4 && !reverse) {
          if (angle >= 3.50) {
            //console.log("succes");
            reverse = true
          }
          angle += swordAnimationTime;
        }
        if (reverse) {
          angle -= swordAnimationTime
          if (angle <= 0) {
            reverse = false
          }
        }
        animateCounter++;
      }






    }
    addEventListener("click", () => {
      angle = 0.20
      animateCounter = 0;
      swordAnimationTime = 0.10;
    })
    function animate() {
      //console.log(swordObject.translateY);

      if (image.y >= 500 || swordObject.translateY >= 575) {
        image.y = 500
        swordObject.translateY = 575

      }
      if (image.x >= 520 || swordObject.translateX >= 600) {
        image.x = 520
        swordObject.translateX = 600
      }
      if (image.x <= -15 || swordObject.translateX <= 60) {
        image.x = -15;
        swordObject.translateX = 60
      }
      if (image.y <= 0 || swordObject.translateY <= 75) {
        image.y = 0;
        swordObject.translateY = 75
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillRect(box.x, box.y, box.width, box.height)


      ctx.drawImage(grassl, grassObject.x, grassObject.y, grassObject.width, grassObject.height)
      ctx.drawImage(img, image.x, image.y, image.width, image.height)
      attackAnimation();
      ctx.fillStyle = color
      ctx.fill()

      requestAnimationFrame(animate)
    }
    animate()
  }, [])
  return (
    <>
      <canvas ref={canvasref} width={600} height={600} style={{ border: "1px solid black" }}></canvas>


    </>
  )
}

export default App
