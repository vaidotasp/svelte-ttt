<script lang="ts">
    import { gameStore } from './stores'
    import Cell from './Cell.svelte'
</script>

<style>
    .gameboard {
        display: grid;
        justify-content: center;
        grid-template-columns: 150px 150px 150px;
        grid-template-rows: 150px 150px 150px;
    }
    .disabled {
        pointer-events: none;
    }
</style>

<div class={$gameStore.gameStatus === 'stop' ? 'gameboard disabled' : 'gameboard'}>
    {#each $gameStore.gameBoard as cell, index}
        <Cell value={cell} i={index} />
    {/each}
</div>
