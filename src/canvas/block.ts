import { BlockInterface, BlockStatus, Coordinate } from "../types/canvas";

export class Block implements BlockInterface {
    coordinate: Coordinate
    status: number
    width: number
    height: number
    gCost: number = 1
    distance = 1
    parent: Block
    neighbors: Block[] = [];
    
    colors = {
        [BlockStatus.WALL]: "grey",
        [BlockStatus.OPEN]: "transparent",
        [BlockStatus.START]: "rgba(58, 52, 235,1)",
        [BlockStatus.PATH]: "rgba(250, 67, 195, .8)",
        [BlockStatus.CHECKING]: "rgba(250, 67, 195, .2)",
        [BlockStatus.TARGET]: "rgba(235, 191, 47, 1)",
    }

    constructor(coordinate: Coordinate, width: number, height: number) {
        this.width = width
        this.height = height
        this.coordinate = coordinate
    }

    public draw(ctx: CanvasRenderingContext2D) {
        let positionX = this.width * this.coordinate.x-1
        let positionY = this.height* this.coordinate.y-1

        ctx.strokeStyle = "rgba(255,255,255,.2)"
        ctx.beginPath()
        ctx.rect(positionX, positionY, this.width, this.height)
        ctx.fillStyle = this.colors[this.status]
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

    public is(status: number) {
        return this.status === BlockStatus[status]
    }

    
}