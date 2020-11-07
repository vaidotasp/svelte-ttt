<script lang="ts">
	import {score} from './stores'
    import Score from './Score.svelte'
    import GameBoard from './GameBoard.svelte'
    import StatusBar from './StatusBar.svelte'

    function updater(){
        console.log('updater');
        score.updateScore("human", 5);
    }

</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <h1>Welcome to TicTacToe game built with Svelte</h1>
    <button on:click={()=>updater()}>score update</button>
    <Score />
    <GameBoard />
    <StatusBar />
</main>
