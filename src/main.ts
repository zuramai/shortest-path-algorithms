import './assets/scss/app.scss'
import Dijkstra from "./algorithms/dijkstra"
import Astar from "./algorithms/astar"
import Canvas from "./canvas/canvas"

// The default config
let config = {
    speed: 30,
    size: { x: 20, y: 20 },
    from: { x: 5, y: 5 },
    to: { x: 14, y: 16 },
    walls: [
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
}

let dijkstra = new Canvas("#dijkstra", config, new Dijkstra)
let aStar = new Canvas("#aStar", config, new Astar)

let configElements = {
    sizeX: <HTMLInputElement>document.getElementById('size-x'),
    sizeY: <HTMLInputElement>document.getElementById('size-x'),
    startX: <HTMLInputElement>document.getElementById('start-x'),
    startY: <HTMLInputElement>document.getElementById('start-y'),
    endX: <HTMLInputElement>document.getElementById('end-x'),
    endY: <HTMLInputElement>document.getElementById('end-y'),
    speed: <HTMLInputElement>document.getElementById('speed'),
    walls: <HTMLTextAreaElement>document.getElementById('walls'),
}



const saveConfig = (e: MouseEvent) => {
    e.preventDefault()
    let walls = configElements.walls.value.split(/\r?\n/)
                .filter(s => s.trim().length > 0) // No blankspace
                .map(line => line.split(","))
                .map(coords => ({x: parseInt(coords[0]),y: parseInt(coords[1]) }))
                
    config = {
        speed: parseInt(configElements.speed.value),
        size: { 
            x: parseInt(configElements.sizeX.value), 
            y: parseInt(configElements.sizeY.value) 
        },
        from: { 
            x: parseInt(configElements.startX.value), 
            y: parseInt(configElements.startY.value) 
        },
        to: { 
            x: parseInt(configElements.endX.value), 
            y: parseInt(configElements.endY.value) 
        },
        walls
    }

    dijkstra.config = config
    aStar.config = config

    aStar.reset()
    dijkstra.reset()

}

const play = () => {
    dijkstra.solve()
    aStar.solve()
}

const toggleConfig = () => {
    let configEl = document.querySelector<HTMLElement>('.config')
    configEl.classList.toggle("show")
}

let btnPlay = document.getElementById("play")
let btnReset = document.querySelector(".btn-reset")
let btnConfigToggle = document.getElementById("config-toggle")
let btnConfigSave = document.getElementById("save-config")

btnConfigToggle.addEventListener('click', () => toggleConfig())
btnPlay.addEventListener("click", () => play())
btnReset.addEventListener("click", () => {
    aStar.reset()
    dijkstra.reset()
})
btnConfigSave.addEventListener('click', saveConfig)

