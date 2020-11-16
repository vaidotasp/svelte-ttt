<script lang="ts">
    import { game } from './stores'
    import Cell from './Cell.svelte'
</script>

<style>
    .gameboard {
        display: grid;
        justify-content: center;
        grid-template-columns: 150px 150px 150px;
        grid-template-rows: 150px 150px 150px;
    }
</style>

<div class="gameboard">
    {#each $game as cell, index}
        <Cell value={cell} i={index} />
    {/each}
</div>
