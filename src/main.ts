import './assets/scss/app.scss'

let from = { x: 0, y: 0 }
let to = { x: 9, y: 9 }
let size = { x: 10, y: 10 }

const dijkstraAlgorithm = new Dijkstra(from, to)
const aStarAlgorithm = new Astar(from, to)

const dijkstra = new Canvas("#dijkstra", dijkstraAlgorithm, size)
const aStar = new Canvas("#astar", aStarAlgorithm, size)

const play = () => {
    dijkstra.solve()
    aStar.solve()
}