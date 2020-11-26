import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { ScoreType } from './types/app.type'
import { subscribe } from 'svelte/internal'
import { Game, Symbols, BoardState } from './gameEngine'

function createScore() {
    const initialScoreVal: ScoreType = { human: 0, computer: 0 }
    const { subscribe, set, update } = writable(initialScoreVal)

    function logWinner(player: 'human' | 'computer') {
        return update((v) => {
            const updatedProperty = { [player]: v[player] + 1 }
            const newScoreObject = Object.assign(v, updatedProperty)
            v = newScoreObject
            return v
        })
    }

    return {
        subscribe,
        logWinner,
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
        let { board, winState } = game.playerTurn(cellIndex)
        let winner = null
        console.log(game.checkIfDraw())
        update((b) => (b = board))
        winner = winState
        //TODO: check for draw
        if (winner) {
            message.updateMessage(`We got a winner - ${winner}`)
            score.logWinner(game.checkSymbolOwnership(winState))
            return
        }

        function cTurn() {
            let { board, winState } = game.computerTurn()
            console.log(game.checkIfDraw())
            update((b) => (b = board))
            winner = winState
            //TODO: check for draw
            if (winner) {
                message.updateMessage(`We got a winner - ${winner}`)
                score.logWinner(game.checkSymbolOwnership(winState))
            }
        }
        setTimeout(cTurn, 500)
    }

    function pickPlayerSymbol(s: Symbols) {
        //update symbols
        game.choosePlayers(s)
        //if X is NOT chosen by the player, computer goes first as X always goes first
        if (s !== 'x') {
            let { board } = game.computerTurn()
            update((b) => (b = board))
        }
    }

    return {
        subscribe,
        cellClick,
        pickPlayerSymbol,
        reset: () => {
            game = new Game()
            update((b) => (b = Array(9).fill(null)))
        },
    }
}

export const game = createGameState()
