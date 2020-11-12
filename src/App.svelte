<script lang="ts">
    import {score} from './stores'
    import Score from './Score.svelte'
    import GameBoard from './GameBoard.svelte'
    import StatusBar from './StatusBar.svelte'

    function updater(){
        score.updateScore("human", 5);
    }

    function initGame(){
        console.log('game init');
    }

</script>

<main>
    <h1>TicTacToe game built with Svellllte</h1>
    <div class="main-wrap">
        <Score />
        <div class="top-bar">
            <button on:click={initGame}>Start Game</button>
            <button on:click={initGame}>Reset Game</button>
        </div>
        <GameBoard />
        <StatusBar />
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
    }

    .main-wrap {
        display: flex;
        margin-top:20px;
        flex-direction: column;
        width: 400px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        padding:0;
        margin:0;
        margin-bottom: 20px;
    }

    .top-bar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        margin-top: 20px;
    }

</style>
