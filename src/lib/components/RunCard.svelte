<script>
    import LabeledItem from './LabeledItem.svelte';
    import { formatSummary, formatDate } from '$lib/util.js';

    const {
        name,
        model,
        dataset,
        dataset_labels,
        data_digest,
        metric,
        score_summary,
        completed,
        duration,
        max_samples,
        onclick
    } = $props();

    function formatLabels (dataset_labels) {
        if (dataset_labels === undefined) {
            return undefined;
        }

        return Object.entries(dataset_labels).map(([k,v]) => `${k}=${v}`).join(',');
    }
</script>
<div>
    <div class="text-gray-700 m-2 rounded-lg border border-1 border-gray-300 grid grid-cols-9 overflow-x-hidden" title={formatLabels(dataset_labels)}>
        <LabeledItem label="run" value={name} {onclick} />
        <LabeledItem label="model" value={model} />
        <LabeledItem label="dataset" value={dataset} />
        <LabeledItem label="data_digest" value={data_digest?.slice(0, 6)} title={data_digest} />
        <LabeledItem label="metric" value={metric} />
        {#if score_summary}<LabeledItem label="score" value={formatSummary(score_summary)} />{/if}
        {#if completed}<LabeledItem label="completed" value={formatDate(completed)} />{/if}
        <LabeledItem label="duration" value={duration} />
        <LabeledItem label="max_samples" value={max_samples} />
        <!-- <LabeledItem label="Duration" value="exhaustive-class-10" />
        <LabeledItem label="Max Samples" value="exhaustive-class-10" /> -->
    </div>
</div>