# React + Canvas
```bash
npm install
npm run dev
```
Project is active on <b>localhost:5123</b>
place your images in assets folder and and check `./src/App.jsx`
 ```js
 grassl.src = '../src/assets/yourimg.png'
 sword.src = '../src/assets/sword.png'
 img.src = '../src/assets/yourg.png'
```
change your images of placing and sizing
```js
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
```
you can move your images with `w,a,s,d`

