<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function sendSymbol(val: 'x' | 'o'): void {
        dispatch('message', { value: val})
    }
</script>


<div class="choose-player">
    <p>Choose your symbol:</p>
    <button on:click={() => sendSymbol('x')}>X</button>
    <button on:click={() => sendSymbol('o')}>O</button>
</div>

<style>
    button {
        padding: 5px;
        font-size: 2.3rem;
    }
    .choose-player {
        margin-top: 5px;
        padding: 5px;
        border: 1px solid blue;
    }
</style>
