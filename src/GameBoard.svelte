<script lang="ts">
    import Cell from './Cell.svelte'
    const winningCombinations: Readonly<number[][]> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let boardState = new Array(9).fill(null);
    let currentTurn: undefined | 'computer' | 'human' = undefined
    type Symbols = null | 'x' | 'o'
    let symbols: { human: Symbols, computer: Symbols } = { human: null, computer: null }
    let gameState: 'running' | 'done' | 'idle' = 'idle';
    console.log('boardState', boardState)
    console.log('currentTurn', currentTurn)
</script>
<div class="gameboard">
    {#each boardState as cell }
        <Cell />
    {/each}
</div>

<style>
    .gameboard{
        display: grid;
        justify-content: center;
        grid-template-columns: 150px 150px 150px;
        grid-template-rows: 150px 150px 150px;
    }
</style>
