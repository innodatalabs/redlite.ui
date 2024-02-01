<script>
    import LabeledItem from '$lib/components/LabeledItem.svelte';
    import Caret from '$lib/components/Caret.svelte';
    import { formatSummary, formatDate } from '$lib/util.js';

    const { model, score_summary, completed, run, meanWinRate, winner, taskCount, runCount, onclick, expandable=true } = $props();
    let expanded = $state(false);

    function onToggleExpansion() {
        expanded = !expanded;
    }
</script>
<div>
    <div class="flex border border-gray-300 rounded-lg ">
        {#if expandable}<Caret {expanded} {onToggleExpansion} />{/if}
        <div class="grid grid-cols-5 flex-grow">
            <LabeledItem label="model" value={model} {onclick} />
            {#if meanWinRate !== undefined}<LabeledItem label="win rate" value={meanWinRate.toFixed(3)} />{/if}
            {#if score_summary}<LabeledItem label="score_summary" value={formatSummary(score_summary)} />{/if}
            {#if completed}<LabeledItem label="completed" value={formatDate(completed)} />{/if}
            {#if taskCount}<LabeledItem label="#tasks" value={taskCount} />{/if}
            {#if runCount}<LabeledItem label="#runs" value={runCount} />{/if}
            <LabeledItem label="run" value={run} />
            {#if winner !== undefined}<LabeledItem label="winner" value={winner} />{/if}
        </div>
    </div>

    <div class="ml-10">
        {#if expanded}
        <slot />
        {/if}
    </div>
</div>