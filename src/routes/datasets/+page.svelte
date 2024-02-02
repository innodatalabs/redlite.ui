<script>
    import { goto } from '$app/navigation';
    import Digest from '$lib/components/Digest.svelte';
    import Model from '$lib/components/Model.svelte';
    import RunCard from '$lib/components/RunCard.svelte';
    import { loading, aggregations } from '$lib/stores/data.js';
</script>
{#if $loading}
    Loading..
{:else}
{#each $aggregations.instances as inst (inst.instHash)}
<div class="m-2">
<Digest
    dataset={inst.dataset}
    metric={inst.metric}
    data_digest={inst.data_digest}
    modelCount={Object.keys(inst.models).length}
    onclick={()=>goto(`/compare/${inst.data_digest}/${inst.metric}`)}
    >
    {#each Object.entries(inst.models) as [modelName, runs] (modelName)}
    <div class="my-2">
    <Model
        model={modelName}
        score_summary={runs.score_summary}
        completed={runs.completed}
        winner={runs.wins > 0}
        runCount={runs.runs.length}
    >
        {#each runs.runs as run (run.name)}
            <RunCard
                name={run.name}
                score_summary={run.score_summary}
                completed={run.completed}
                duration={run.duration}
                max_samples={run.max_samples}
                dataset_labels={run.dataset_labels}
                onclick={()=>goto(`/run/${run.name}`)}
            />
        {/each}
    </Model>
    </div>
    {/each}
</Digest>
</div>
{/each}

{/if}
