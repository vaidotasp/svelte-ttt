import { writable, get } from 'svelte/store'
import type { ScoreType } from './types/app.type'
import { Game, Symbols } from './gameEngine'

//------------------------ Score State
const initialScoreVal: ScoreType = { human: 0, computer: 0 }
export const score = writable(initialScoreVal)
export const updateScore = (player: 'human' | 'computer') => {
    score.update((s) => {
        const updatedProperty = { [player]: s[player] + 1 }
        const newScoreObject = Object.assign(s, updatedProperty)
        s = newScoreObject
        return s
    })
}
export const resetScore = () => {
    score.update((s) => (s = initialScoreVal))
}

// Message State
function createMessage() {
    const defaultMessage = 'Click START to start playing'
    const { subscribe, set, update } = writable(defaultMessage)
    return {
        subscribe,
        updateMessage: (newMsg: string) => update((v) => (v = newMsg)),
        reset: () => set(defaultMessage),
    }
}
export const message = createMessage()

// Controller for the game state initiation, updating, fetching next move
// and interacting with game engine in general
interface GameState {
    gameBoard: Symbols[]
    gameStatus: string
}
const defaultGameState: GameState = {
    gameBoard: Array(9).fill(null),
    gameStatus: 'run',
}
export const gameStore = writable(defaultGameState)
let game = new Game()

function updateGameBoard(board) {
    gameStore.update((s) => {
        const currentState = Object.assign({}, get(gameStore))
        currentState.gameBoard = board
        s = currentState
        return s
    })
}
function updateGameStatus(status: string) {
    gameStore.update((s) => {
        // const currentState = get(gameStore)
        const currentState = Object.assign({}, get(gameStore))
        currentState.gameStatus = status
        s = currentState
        return s
    })
}

export function gameCellClick(cellIndex: number) {
    let { board, winState } = game.playerTurn(cellIndex)
    let winner = null
    updateGameBoard(board)
    winner = winState
    if (winner) {
        message.updateMessage(`We got a winner - ${winner}`)
        updateScore(game.checkSymbolOwnership(winState))
        updateGameStatus('stop')
        return
    }
    if (game.checkIfDraw()) {
        message.updateMessage('Draw!!!')
        updateGameStatus('stop')
    }

    function cTurn() {
        let { board, winState } = game.computerTurn()
        updateGameBoard(board)
        winner = winState
        if (winner) {
            message.updateMessage(`We got a winner - ${winner}`)
            updateScore(game.checkSymbolOwnership(winState))
            updateGameStatus('stop')
        }
        if (game.checkIfDraw()) {
            message.updateMessage('Draw!!!')
            updateGameStatus('stop')
        }
    }
    setTimeout(cTurn, 500)
}

export function pickPlayerSymbol(s: Symbols) {
    //update symbols
    game.choosePlayers(s)
    //if X is NOT chosen by the player, computer goes first as X always goes first
    if (s !== 'x') {
        let { board } = game.computerTurn()
        updateGameBoard(board)
    }
}

export function resetGameBoard() {
    game = new Game()
    updateGameBoard(defaultGameState.gameBoard)
    updateGameStatus('run')
}
