<script lang="ts">
    import { gameCellClick } from './stores'
    export let value
    export let i

    function cellClickHanler() {
        if (!value) {
            gameCellClick(i)
        }
    }
</script>

<style>
    .cell {
        border: 1px solid mediumturquoise;
        text-transform: uppercase;
        width: 100%;
        font-size: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

<div on:click={cellClickHanler} class="cell">{value ? value : ''}</div>
