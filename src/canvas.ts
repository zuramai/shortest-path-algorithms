interface Coordinate {
    x: number
    y: number
}

interface CanvasInterface {
    blocks: number[][]
    el: HTMLCanvasElement|null
    algorithm: Algorithm

    size: Coordinate

    generateBlocks: () => number[][]
    render: (timestamp: number) => number
    draw: () => void
    update: () => void
    solve: () => void
}

class Canvas implements CanvasInterface {

    size: Coordinate
    blocks: [][]
    algorithm: Algorithm;
    el: HTMLCanvasElement|null;

    constructor(el: HTMLCanvasElement|string,algorithm: Algorithm, size: Coordinate) {
        this.algorithm = algorithm
        this.el = typeof el == 'string' ? document.querySelector<HTMLCanvasElement>(el) : el
        this.size = size
        this.blocks = []
    }

    render(timestamp: number) {
        this.draw()
        this.update()
        return requestAnimationFrame(this.render)
    }

    generateBlocks() {
        let blocks: number[][] = new Array(this.size.y)
                                        .fill(0)
                                        .map(() => 
                                            new Array(this.size.x).fill(0)
                                        )
        console.log(blocks)
        return blocks
    }

    draw() {

    }

    update() {
        
    }

    solve() {
        this.algorithm.solve()
    }
}