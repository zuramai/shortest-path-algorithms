import { Block } from "../canvas/block";
import { AlgorithmInterface } from "./algorithm";

export interface Coordinate {
    x: number
    y: number
}

export interface BlockInterface {
    coordinate: Coordinate
    status: number
    width: number
    height: number
    parent: BlockInterface
    neighbors: BlockInterface[]

    draw: (ctx: CanvasRenderingContext2D) => void
}


export namespace BlockStatus {
    export const WALL = -1
    export const OPEN = 0
    export const START = 1
    export const PATH = 2
    export const TARGET = 3
    export const CHECKING = 4
}

export interface CanvasInterface {
    blocks: BlockInterface[][]
    canvas: HTMLCanvasElement|null
    algorithm: AlgorithmInterface

    size: Coordinate

    generateBlocks: () => BlockInterface[][]
    render: (timestamp: number) => void
    draw: () => void
    update: () => void
    solve: () => void
}

export interface CanvasConfig {
    speed: number,
    from: Coordinate
    to: Coordinate
    walls: Coordinate[]
    size: Coordinate
}