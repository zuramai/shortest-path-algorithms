import './assets/scss/app.scss'
import Dijkstra from "./algorithms/dijkstra"
import Astar from "./algorithms/astar"
import Canvas from "./canvas/canvas"

let walls = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
    { x: 10, y: 13 },
    { x: 10, y: 14 },
    { x: 10, y: 15 },
    { y: 10, x: 11 },
    { y: 10, x: 12 },
    { y: 10, x: 13 },
    { y: 10, x: 14 },
    { y: 10, x: 15 },
]

const config = {
    speed: 30,
    size: { x: 20, y: 20 },
    from: { x: 5, y: 5 },
    to: { x: 18, y: 18 },
    walls: walls
}

const dijkstra = new Canvas("#dijkstra", config, new Dijkstra)
const aStar = new Canvas("#aStar", config, new Astar)

const play = () => {
    dijkstra.solve()
    aStar.solve()
}

let btnPlay = document.getElementById("play")
btnPlay.addEventListener("click", () => play())
// play()