import { Block } from "../canvas/block";
import {  Coordinate } from "./canvas"

export interface AlgorithmInterface {
    startPosition: Coordinate
    endPosition: Coordinate
    
    solve: (blocks: Block[][], start: Coordinate, end: Coordinate, speed: number) => void
}