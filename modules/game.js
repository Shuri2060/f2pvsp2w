// class Game {
//   constructor(options) {
//   }
// }

class Game2D2Object {
//  static id = 0
  
  constructor(options) {    
    this.sx = options.sx || 0
    this.sy = options.sy || 0
    this.vx = options.vx || 0
    this.vy = options.vy || 0
    this.ax = options.ax || 0
    this.ay = options.ay || 0

    this.as = options.as || 0
    this.av = options.av || 0
    this.aa = options.aa || 0

    this.r = options.r || 0
    this.mass = options.mass || 0

    this.id = options.id || Game2D2Object.id++
  }
}

Game2D2Object.id = 0

function simPhysics(objArr, dt) {
  for (let i = objArr.length; i--;) {
    const dt2 = dt / 2
    const objI = objArr[i]
    const ax = objI.ax
    const ay = objI.ay
    const aa = objI.aa
    
    objI.sx += (objI.vx + ax * dt2) * dt
    objI.sy += (objI.vy + ay * dt2) * dt
    objI.vx += ax * dt
    objI.vy += ay * dt

    objI.as += (objI.av + aa * dt2) * dt
    objI.av += aa * dt

    while (objI.sx < 0) objI.sx += maxX
    while (objI.sx >= maxX) objI.sx -= maxX
    while (objI.sy < 0) objI.sy += maxY
    while (objI.sy >= maxY) objI.sy -= maxY
  }
}

var maxX = 32768, maxY = 32768 //might change to let/const in future

/*Brute Force
function colCheck(objArr) {
  const col = []

  for (let i = objArr.length; i--;) {
    const objI = objArr[i]
    const objIsx = objI.sx
    const objIsy = objI.sy
    const objIr = objI.r

    for (let j = i; j--;) {
      const objJ = objArr[j]
      const radSum = objIr + objJ.r 
      const difX = Math.abs(objIsx - objJ.sx)

      if (difX < radSum || maxX - difX < radSum) {
        const difY = Math.abs(objIsy - objJ.sy)

        if (difY < radSum || maxY - difY < radSum) {
          const difX2 = difX * difX
          const difY2 = difY * difY
          let revDifX, revDifX2, revDifY, revDifY2          
          const radSum2 = radSum * radSum

          if (difX2 + difY2 < radSum2 || (revDifX = maxX - difX, revDifX2 = revDifX * revDifX, revDifX2 + difY2 < radSum2) || (revDifY = maxY - difY, revDifY2 = revDifY * revDifY, difX2 + revDifY2 < radSum2) || revDifX2 + revDifY2 < radSum2) {
            col.push([objJ, objI])
          }
        }
      }
    }
  }

  return col
}
/**/
//*Grid
const grid = [], gridCellX = 64, gridCellY = 64
var gridX = maxX / gridCellX, gridY = maxY / gridCellY //might change to let/const in future

for (let i = 0; i < gridX; i++) {
  grid[i] = []
  for (let j = 0; j < gridY; j++) {
    grid[i][j] = []
  }
}

function colCheck(objArr) {
  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      grid[i][j] = []
    }
  }

  for (let i = objArr.length; i--;) {
    
    const objI = objArr[i]
    const objIr = objI.r
    const objIsx = objI.sx
    const objIsy = objI.sy

    const x1 = (objIsx - objIr) / gridCellX
    const x2trun = (((objIsx + objIr) / gridCellX) | 0) + 1 //x | 0 does Math.trunc(x)
    const y1 = (objIsy - objIr) / gridCellY
    const y2trun = (((objIsy + objIr) / gridCellY) | 0) + 1
    
    if (x1 < 0) {
      for (let j = (x1 | 0) + gridX; j < gridX; j++) {
        if (y1 < 0) {
          for (let k = (y1 | 0) + gridY; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun; k--;) {grid[j][k].push(objI)}
        } else if (y2trun > gridY) {
          for (let k = y1 | 0; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun - gridY; k--;) {grid[j][k].push(objI)}
        } else {
          for (let k = y1 | 0; k < y2trun; k++) {grid[j][k].push(objI)}
        }
      }
      for (let j = x2trun; j--;) {
        if (y1 < 0) {
          for (let k = (y1 | 0) + gridY; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun; k--;) {grid[j][k].push(objI)}
        } else if (y2trun > gridY) {
          for (let k = y1 | 0; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun - gridY; k--;) {grid[j][k].push(objI)}
        } else {
          for (let k = y1 | 0; k < y2trun; k++) {grid[j][k].push(objI)}
        }
      }
    } else if (x2trun > gridX) {
      for (let j = x1 | 0; j < gridX; j++) {
        if (y1 < 0) {
          for (let k = y1 | 0 + gridY; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun; k--;) {grid[j][k].push(objI)}
        } else if (y2trun > gridY) {
          for (let k = y1 | 0; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun - gridY; k--;) {grid[j][k].push(objI)}
        } else {
          for (let k = y1 | 0; k < y2trun; k++) {grid[j][k].push(objI)}
        }
      }
      for (let j = x2trun - gridX; j--;) {
        if (y1 < 0) {
          for (let k = y1 | 0 + gridY; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun; k--;) {grid[j][k].push(objI)}
        } else if (y2trun > gridY) {
          for (let k = y1 | 0; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun - gridY; k--;) {grid[j][k].push(objI)}
        } else {
          for (let k = y1 | 0; k < y2trun; k++) {grid[j][k].push(objI)}
        }
      }
    } else {
      for (let j = x1 | 0; j < x2trun; j++) {
        if (y1 < 0) {
          for (let k = y1 | 0 + gridY; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun; k--;) {grid[j][k].push(objI)}
        } else if (y2trun > gridY) {
          for (let k = y1 | 0; k < gridY; k++) {grid[j][k].push(objI)}
          for (let k = y2trun - gridY; k--;) {grid[j][k].push(objI)}
        } else {
          for (let k = y1 | 0; k < y2trun; k++) {grid[j][k].push(objI)}
        }
      }
    }
  }

  let col = []
  let colDup = new Map()

  for (let x = gridX; x--;) {
    for (let y = gridY; y--;) {
      const objArr = grid[x][y]

      for (let i = objArr.length; i--;) {
        const objI = objArr[i]
        const objIsx = objI.sx
        const objIsy = objI.sy
        const objIr = objI.r

        for (let j = i; j--;) {
          const objJ = objArr[j]
          if (!colDup.has(objI.id + ' ' + objJ.id)) {
            const radSum = objIr + objJ.r 
            const difX = Math.abs(objIsx - objJ.sx)

            if (difX < radSum || maxX - difX < radSum) {
              const difY = Math.abs(objIsy - objJ.sy)

              if (difY < radSum || maxY - difY < radSum) {
                const difX2 = difX * difX
                const difY2 = difY * difY
                let revDifX, revDifX2, revDifY, revDifY2          
                const radSum2 = radSum * radSum

                if (difX2 + difY2 < radSum2 || (revDifX = maxX - difX, revDifX2 = revDifX * revDifX, revDifX2 + difY2 < radSum2) || (revDifY = maxY - difY, revDifY2 = revDifY * revDifY, difX2 + revDifY2 < radSum2) || revDifX2 + revDifY2 < radSum2) {
                  col.push([objJ, objI])
                  colDup.set(objI.id + ' ' + objJ.id, 1)
                  colDup.set(objJ.id + ' ' + objI.id, 1)
                }
              }
            }
          }
        }
      }
    }
  }

  return col
}
/**/

/*DEBUG
function time(func, n) {
  return function () {
    let t = 0
    for (let i = n; i--;) {
      let d = performance.now()
      func.apply(this, arguments)
      d = performance.now() - d
      t += d
    }
    console.log(t / n)
  }
}

var x = []
for (let i = 0; i < 50000; i++) {
  x[i] = new Game2D2Object({sx: Math.random() * maxX, sy: Math.random() * maxY, vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20, ax: (Math.random() - 0.5) * 5, ay: (Math.random() - 0.5) * 5, as: (Math.random() - 0.5) * 4, av: (Math.random() - 0.5) * 10, aa: (Math.random() - 0.5) * 1, r: Math.random() * 25})
}
var test = time(colCheck, 100)
/**/
