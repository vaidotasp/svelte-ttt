<script lang="ts">
    import type { ScoreType } from './types/app.type'; 
	import { score } from './stores'
    console.log(score)
</script>

<div class="score">
    <h4>Score</h4>
    <p>Human: {$score.human}</p>
    <p>Computer: {$score.computer}</p>
</div>

<style>
    .score {
        border: 1px solid black;
    }
</style>
