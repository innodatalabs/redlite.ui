<script>
    import LabeledItem from '$lib/components/LabeledItem.svelte';
    import Caret from '$lib/components/Caret.svelte';
    import { formatSummary, formatDate } from '$lib/util.js';

    const { dataset, metric, data_digest, score_summary, completed, runCount, modelCount, winner, onclick, expandable=true } = $props();
    let expanded = $state(false);

    function onToggleExpansion() {
        expanded = !expanded;
    }
</script>
<div class="">
    <div class="flex w-full border border-gray-300 rounded-lg">
        {#if expandable}<Caret {expanded} {onToggleExpansion} />{/if}
        <div class="grid grid-cols-7 flex-grow">
            <LabeledItem label="dataset" value={dataset} {onclick} />
            <!-- <Bubble label="dataset" value={dataset} {onclick} /> -->
            <LabeledItem label="metric" value={metric} />
            <LabeledItem label="data_digest" value={data_digest.slice(0, 6)} title={data_digest} />
            {#if runCount}<LabeledItem label="#runs" value={runCount} />{/if}
            {#if winner !== undefined}<LabeledItem label="winner" value={winner} />{/if}
            {#if modelCount}<LabeledItem label="#models" value={modelCount} />{/if}
            {#if score_summary}<LabeledItem label="score_summary" value={formatSummary(score_summary)} />{/if}
            {#if completed}<LabeledItem label="completed" value={formatDate(completed)} />{/if}
        </div>
    </div>

    <div class="ml-10">
        {#if expanded}
        <slot />
        {/if}
    </div>
</div>