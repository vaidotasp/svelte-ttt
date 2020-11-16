// Types for the game engine
export type Symbols = null | 'x' | 'o'
type BoardState = Symbols[]
type GameState = 'running' | 'done' | 'idle'

export class Game {
    #winningCombinations: Readonly<number[][]> = [
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
    _symbols: { human: Symbols; computer: Symbols } = {
        human: null,
        computer: null,
    }

    choosePlayers(playerSymbol: Symbols): void {
        if (playerSymbol === 'x'){
            this._symbols = {human: playerSymbol, computer: 'o'}
        } else {
            this._symbols = {human: playerSymbol, computer: 'x'}
        }
    }

    playerTurn(cellIndex: number): BoardState {
        debugger;
        console.log('player turn to: ', cellIndex)
        const updatedBoard = [...this.boardState]
        updatedBoard[cellIndex] = this._symbols.human
        this.boardState = updatedBoard
        // log player turn into the game board state and return new board

        return this.boardState
    }

    setGameState(state: GameState){
        this._gameState = state
    }

    // get boardState(): BoardState {
    //     return this._boardState
    // }

    updateGameState(s: GameState): void {
        this._gameState = s
    }

    checkIfDraw(): boolean {
        // if game board is not full, then it cant be a draw check
        const filledBoardCells = this.boardState.filter((c) => c)
        if (filledBoardCells.length !== 9) {
            return false
        }
        return false
    }

    //TODO Helpers
    /*
    1. Check if it is a valid move
    2. Check if current board state is in a winning combination
    3. check if current board state is in a draw 
    */
}
