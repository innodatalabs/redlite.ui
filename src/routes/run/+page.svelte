<script>
    import { runs, loading } from '$lib/stores/data.js';
    import { goto } from '$app/navigation';
    import RunCard from '$lib/components/RunCard.svelte';
</script>
<div>
{#if $loading}
Loading..
{:else}
    {#each $runs as run (run.name)}
    <RunCard {...run} onclick={()=>goto(`/run/${run.name}`)}/>
        <!-- <td class="p-2 border border-1 border-gray-300">{formatSummary(run.score_summary)}</td>
        <td class="p-2 border border-1 border-gray-300">{formatDate(run.completed)}</td> -->
    {/each}
{/if}
</div>