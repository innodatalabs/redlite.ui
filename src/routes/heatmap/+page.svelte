<script>
    import HeatmapChart from '$lib/components/HeatmapChart.svelte';
    import NoDataFound from '$lib/components/NoDataFound.svelte';
    import { loading, heatmap } from '$lib/stores/data.js';

    </script>
{#if $loading}
    Loading..
{:else if $heatmap.length === 0}
<NoDataFound />
{:else}
<HeatmapChart data={$heatmap} />
{/if}
