import { Block } from "../canvas/block"
import { AlgorithmInterface } from "../types/algorithm"
import { BlockStatus, Coordinate } from "../types/canvas"

export default class Astar implements AlgorithmInterface {
    name: string = "Astar"
    startPosition: Coordinate 
    endPosition: Coordinate
    openSet: Block[] = []
    path: Block[] = []
    closedSet: Block[] = []

    solve(blocks: Block[][], start: Coordinate, end: Coordinate, speed: number) {
        let startBlock: Block = blocks[start.y][start.x]
        let targetBlock: Block = blocks[end.y][end.x]
        this.openSet.push(startBlock)

        const run = () => {
            setTimeout(() => {
                if(this.openSet.length > 0) {
                    this.openSet.sort((a,b) => a.gCost - b.gCost)
                    
                    let currentBlock = this.openSet.shift()
                    console.log(currentBlock)
                    this.closedSet.push(currentBlock)

                    // Draw the progress
                    if(![startBlock, targetBlock].includes(currentBlock)) {
                        currentBlock.status = BlockStatus.CHECKING
                    }

                    // Stop if the path is found
                    if (currentBlock == targetBlock) {
                        while(currentBlock != startBlock) {
                            this.path.push(currentBlock)
                            currentBlock = currentBlock.parent
                            // alert("parent is "+currentBlock.coordinate.x + ' '+  currentBlock.coordinate.y)
                        }
                        return this.finish()
                       
                    }
                    
                    for(let i = 0; i < currentBlock.neighbors.length; i++) {
                        let neighbor = currentBlock.neighbors[i]
                        if(neighbor.status == BlockStatus.WALL || this.closedSet.includes(neighbor)) 
                            continue
        
                        let cost = currentBlock.gCost + 1
                        if(cost < neighbor.gCost || !this.openSet.includes(neighbor)) {
                            neighbor.gCost = cost 
                            neighbor.parent = currentBlock
                            
                            if(!this.openSet.includes(neighbor)) {
                                this.openSet.push(neighbor)
                            }
                        }
                    }
                    run()
                }
                
            }, speed)
        }
        run()
       
    }

    finish() {
        this.path.shift()
        for(let i = 0; i < this.path.length; i++) {    
            this.path[i].status = BlockStatus.PATH
        }
    }

    fscore(from: Block, to: Block) {
        let g = from.gCost + to.distance;
        let h = this.heuristicDistance(to,from)

        return g + h
    }

    heuristicDistance(from: Block, to: Block) {
        return Math.sqrt(
            Math.abs(to.coordinate.x - from.coordinate.x) ** 2 + 
            Math.abs(to.coordinate.y - from.coordinate.y) ** 2
        )
    }

}