<script>
    import { runs, loading } from '$lib/stores/data.js';
    import { formatDate, formatSummary, formatDigest, formatDuration, safeName } from '$lib/util.js';
    import { goto } from '$app/navigation';
    import GridTable from '$lib/components/GridTable.svelte';
    import NoDataFound from '$lib/components/NoDataFound.svelte';

    const schema = [
        { label: 'run', onclick: name => goto(`/run/${safeName(name)}`), },
        { label: 'model' },
        { label: 'dataset' },
        { label: 'split' },
        { label: 'data_digest', format: formatDigest, title: x => x },
        { label: 'metric' },
        { label: 'score_summary', format: formatSummary },
        { label: 'completed', format: formatDate },
        { label: 'duration', format: formatDuration },
    ];
</script>
<div>
{#if $loading}
Loading..
{:else if $runs.length === 0}
<NoDataFound />
{:else}
    <GridTable {schema} data={$runs} />
{/if}
</div>