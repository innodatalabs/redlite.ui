<script>
    import { runs, loading } from '$lib/stores/data.js';
    import { formatDate, formatSummary, formatDigest } from '$lib/util.js';
    import { goto } from '$app/navigation';
    import GridTable from '$lib/components/GridTable.svelte';

    const schema = [
        { label: 'run', value: 'name', onclick: name => goto(`/run/${name}`), },
        { label: 'model' },
        { label: 'dataset' },
        { label: 'data_digest', format: formatDigest, title: x => x },
        { label: 'metric' },
        { label: 'score_summary', format: formatSummary },
        { label: 'completed', format: formatDate },
        { label: 'duration' },
    ];
</script>
<div>
{#if $loading}
Loading..
{:else}
    <GridTable {schema} data={$runs} />
{/if}
</div>