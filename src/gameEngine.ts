export type Symbols = null | 'x' | 'o'
export type BoardState = Symbols[]
type GameState = 'running' | 'done' | 'idle'

export class Game {
    _winningCombinations: Readonly<number[][]> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    _gameState: GameState = 'idle'
    boardState: BoardState = new Array(9).fill(null)
    symbols: { human: Symbols; computer: Symbols } = {
        human: null,
        computer: null,
    }

    checkWinState(board: BoardState, symbol: Symbols): null | Symbols {
        let winState = false
        let symbolIndexes = []
        board.forEach((c, index) => {
            if (c === symbol) {
                symbolIndexes.push(index)
            }
        })
        for (const wCombo of this._winningCombinations) {
            const [p1, p2, p3] = wCombo
            if (
                symbolIndexes.includes(p1) &&
                symbolIndexes.includes(p2) &&
                symbolIndexes.includes(p3)
            ) {
                winState = true
                break
            }
        }
        if (winState) {
            return symbol
        }
        return null
    }

    choosePlayers(playerSymbol: Symbols): void {
        if (playerSymbol === 'x') {
            this.symbols = { human: playerSymbol, computer: 'o' }
        } else {
            this.symbols = { human: playerSymbol, computer: 'x' }
        }
    }

    computerTurn() {
        const availableMoves = []
        this.boardState.forEach((c, index) => {
            if (!c) {
                availableMoves.push(index)
            }
        })
        const randomMoveIndex =
            availableMoves.length === 1
                ? 0
                : Math.floor(Math.random() * (availableMoves.length - 1 + 1))
        const updatedBoard = [...this.boardState]
        updatedBoard[availableMoves[randomMoveIndex]] = this.symbols.computer
        this.boardState = updatedBoard

        const winState = this.checkWinState(
            this.boardState,
            this.symbols.computer
        )
        return { board: this.boardState, winState }
    }

    playerTurn(
        cellIndex: number
    ): { board: BoardState; winState: Symbols | null } {
        const updatedBoard = [...this.boardState]
        updatedBoard[cellIndex] = this.symbols.human
        this.boardState = updatedBoard

        const winState = this.checkWinState(this.boardState, this.symbols.human)
        return { board: this.boardState, winState }
    }

    checkIfDraw(): boolean {
        const filledBoardCells = this.boardState.filter((c) => c)
        return filledBoardCells.length === 9
    }

    checkSymbolOwnership(s: Symbols): 'human' | 'computer' {
        if (this.symbols.computer === s) {
            return 'computer'
        }
        return 'human'
    }
}
