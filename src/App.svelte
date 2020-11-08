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
    <h1>TicTacToe game built with Svelte</h1>
    <div class="top-bar">
        <Score />
        <button on:click={initGame}>Start Game</button>
        <button on:click={initGame}>Reset Game</button>
    </div>
    <GameBoard />
    <StatusBar />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        /* display: grid; */
        /* grid-template-columns: 1fr; */
        /* justify-items: center; */
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        padding:0;
        margin:0;
        margin-bottom: 20px;
    }

    .top-bar {
        display: grid;
        grid-template-columns: auto 1fr 1fr;
        justify-content: center;
    }

</style>
