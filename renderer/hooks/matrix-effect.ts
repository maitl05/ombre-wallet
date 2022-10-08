import { RefObject, useEffect } from 'react'

function getMaxColumns(w: number, fontSize: number) {
  return w / fontSize
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min
}

type Dimensions = { w: number; h: number }

const CHAR_ARR = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

class Point {
  private value: string
  private speed: number

  constructor(
    private x: number,
    private y: number,
    private ctx: CanvasRenderingContext2D,
    private ctx2: CanvasRenderingContext2D,
    private fontSize: number,
    private dimensions: Dimensions,
  ) {}

  public draw() {
    this.value = CHAR_ARR[randomInt(0, CHAR_ARR.length - 1)].toUpperCase()
    this.speed = randomFloat(1, 5)

    this.ctx2.fillStyle = 'rgba(255,255,255,0.8)'
    this.ctx2.font = this.fontSize + 'px san-serif'
    this.ctx2.fillText(this.value, this.x, this.y)

    this.ctx.fillStyle = '#4fbafa'
    this.ctx.font = this.fontSize + 'px san-serif'
    this.ctx.fillText(this.value, this.x, this.y)

    this.y += this.speed
    if (this.y > this.dimensions.h) {
      this.y = randomFloat(-100, 0)
      this.speed = randomFloat(2, 5)
    }
  }
}

export function useMatrixEffect(
  canvas: RefObject<HTMLCanvasElement>,
  canvas2: RefObject<HTMLCanvasElement>,
) {
  useEffect(() => {
    const dimensions: Dimensions = {
      w: 0,
      h: 0,
    }

    function handleResize() {
      dimensions.w = canvas.current.parentElement.clientWidth
      dimensions.h = canvas.current.parentElement.clientHeight
      canvas.current.width = canvas2.current.width = dimensions.w
      canvas.current.height = canvas2.current.height = dimensions.h
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    const ctx = canvas.current.getContext('2d'),
      ctx2 = canvas2.current.getContext('2d'),
      fallingCharArr = [],
      fontSize = 10

    for (var i = 0; i < getMaxColumns(dimensions.w, fontSize); i++) {
      fallingCharArr.push(
        new Point(
          i * fontSize,
          randomFloat(-500, 0),
          ctx,
          ctx2,
          fontSize,
          dimensions,
        ),
      )
    }

    var update = function () {
      ctx.fillStyle = '#39393933'
      ctx.fillRect(0, 0, dimensions.w, dimensions.h)
      ctx2.clearRect(0, 0, dimensions.w, dimensions.h)
      var i = fallingCharArr.length
      while (i--) {
        fallingCharArr[i].draw()
      }

      requestAnimationFrame(update)
    }

    update()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}
