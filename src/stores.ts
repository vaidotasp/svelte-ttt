import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ScoreType } from './types/app.type'
import { subscribe } from 'svelte/internal'
import { Game, Symbols } from './gameEngine'

function createScore() {
    const initialScoreVal: ScoreType = { human: 0, computer: 0 }
    const { subscribe, set, update } = writable(initialScoreVal)

    function updateScore(player: 'human' | 'computer', val: number) {
        return update((v) => {
            const updatedProperty = { [player]: val }
            const newScoreObject = Object.assign(v, updatedProperty)
            v = newScoreObject
            return v
        })
    }

    return {
        subscribe,
        updateScore,
        reset: () => set(initialScoreVal),
    }
}

export const score = createScore()

function createMessage() {
    const defaultMessage = 'Click START to start playing'
    const { subscribe, set, update } = writable(defaultMessage)

    return {
        subscribe,
        updateMessage: (newMsg) => update((v) => (v = newMsg)),
        reset: () => set(defaultMessage),
    }
}
export const message = createMessage()
// Controller for the game state initiation, updating, fetching next move
// and interacting with game engine in general
function createGameState() {
    let game = new Game()
    let gameBoard = Array(9).fill(null)

    const { subscribe, set, update } = writable(gameBoard)

    function cellClick(cellIndex: number) {
        update((b) => (b = game.playerTurn(cellIndex)))
    }

    function pickPlayerSymbol(s: Symbols) {
        game.choosePlayers(s)
    }

    return {
        subscribe,
        cellClick,
        pickPlayerSymbol,
        reset: () => {
            game = new Game()
        },
    }
}

export const game = createGameState()
