<script lang="ts">
    import { score } from './stores'
</script>

<div class="score">
    <h4>Score</h4>
    <div>
        <p>Human: {$score.human}</p>
        <p>Computer: {$score.computer}</p>
    </div>
</div>

<style>
    p, h4 {
        padding:0;
        margin:0;
    }
</style>
