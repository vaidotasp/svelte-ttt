<script lang="ts">
    import { game } from './stores'
    import Score from './Score.svelte'
    import GameBoard from './GameBoard.svelte'
    import StatusBar from './StatusBar.svelte'
    import ChoosePlayer from './ChoosePlayer.svelte'

    let gameStarted = false
    let playerChosen: null | 'x' | 'o' = null

    function initGame() {
        gameStarted = true
    }

    function resetGame() {
        gameStarted = false
        playerChosen = null
        game.reset()
    }

    function handleMessage(msg) {
        playerChosen = msg.detail.value
        game.pickPlayerSymbol(msg.detail.value)
    }
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
    }

    .main-wrap {
        display: flex;
        margin-top: 20px;
        flex-direction: column;
        width: 400px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        padding: 0;
        margin: 0;
        margin-bottom: 20px;
    }

    .top-bar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        margin-top: 20px;
    }
</style>

<main>
    <h1>TicTacToe game built with Svellllte</h1>
    <div class="main-wrap">
        <Score />
        <div class="top-bar">
            <button on:click={initGame}>Start Game</button>
            <button on:click={resetGame}>Reset Game</button>
        </div>
        {#if gameStarted && !playerChosen}
            <ChoosePlayer on:message={handleMessage} />
        {/if}
        {#if gameStarted && playerChosen}
            <GameBoard />
        {/if}
        <StatusBar />
    </div>
</main>
