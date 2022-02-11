interface Algorithm {
    startPosition: Coordinate
    endPosition: Coordinate
    
    solve: () => void
}