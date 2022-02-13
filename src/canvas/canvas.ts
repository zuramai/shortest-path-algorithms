import { AlgorithmInterface } from "../types/algorithm";
import { BlockStatus, CanvasConfig, CanvasInterface, Coordinate } from "../types/canvas";
import { Block } from "./block"


export default class Canvas implements CanvasInterface {
    config: CanvasConfig
    size: Coordinate
    blocks: Block[][]
    algorithm: AlgorithmInterface;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D
    from: Coordinate
    to: Coordinate
    walls: Coordinate[]

    constructor(el: HTMLCanvasElement|string, config: CanvasConfig, algorithm: AlgorithmInterface) {
        this.algorithm = algorithm
        this.canvas = typeof el == 'string' ? document.querySelector<HTMLCanvasElement>(el) : el
        this.ctx = this.canvas.getContext('2d')
        this.blocks = []
        this.config = config

        this.init()
    }

    init() {
        // Set responsive canvas width and height 
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight

        this.generateBlocks()

        this.render()
    }

    render() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.draw()
        this.update()
        setTimeout(() => requestAnimationFrame(() => this.render()), 100)
    }

    generateBlocks() {
        this.size = {x: this.config.size.x, y: this.config.size.y}
        this.from = {x: this.config.from.x-1, y: this.config.from.y-1}
        this.to = {x: this.config.to.x-1, y: this.config.to.y-1}
        this.walls = this.config.walls

        let blocks: Block[][] = []
        let blockWidth = this.canvas.width / this.size.x
        let blockHeight = this.canvas.height / this.size.y
        
        // Create new blocks
        for(let i = 0; i < this.size.y; i++) {
            let row: Block[] = []

            for(let j = 0; j < this.size.x; j++) {
                let coordinate: Coordinate = {
                    x: j,
                    y: i
                }

                let block: Block = new Block(coordinate, blockWidth, blockHeight)
                block.status = BlockStatus.OPEN

                row.push(block)
            } 

            blocks.push(row)
        } 

        // Create walls
        for(let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i]
            blocks[wall.y-1][wall.x-1].status = BlockStatus.WALL
        }


        // Set start and target block color
        blocks[this.from.y][this.from.x].status = BlockStatus.START
        blocks[this.to.y][this.to.x].status = BlockStatus.TARGET

        this.blocks = blocks

        // Set the blocks' neighbors
        let neighX = [0,0,1,-1]
        let neighY = [1,-1,0,0]

        for(let i = 0; i < this.size.y; i++) {
            for(let j = 0; j < this.size.x; j++) {
                // Block have four neighbors
                for(let n = 0; n < 4; n++) {
                    if(i + neighY[n] < 0 || i + neighY[n] >= this.size.y) {
                        continue
                    }
                    if(j + neighX[n] < 0 || j + neighX[n] >= this.size.x) {
                        continue
                    }
                    // if(j==1)
                    //     console.log(`neighbor of (${j}, ${i}) is (${j + neighX[n]}, ${i + neighY[n]},)`)
                    let neighbor = this.blocks[i + neighY[n]][j + neighX[n]]
                    this.blocks[i][j].neighbors.push(neighbor)
                }
            }
        }

        return blocks
    }

    draw() {
        
        this.ctx.fillStyle = "white"
        this.ctx.strokeStyle = "white"

        // Draw the border lines between each blocks
        this.blocks.forEach(row => {
            row.forEach(col => {
                col.draw(this.ctx)
            })
        })

    }

    update() {
         // Draw the border lines between each blocks
         for(let i = 0; i <  this.size.y; i++) {
            for(let j = 0; j <  this.size.x; j++) {
            }
        }
    }

    solve() {
        this.algorithm.solve(this.blocks, this.from, this.to, this.config.speed)
    }

    reset() {
        this.generateBlocks()
    }
}