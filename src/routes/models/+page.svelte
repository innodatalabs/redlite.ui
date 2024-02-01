<script>
    import { goto } from '$app/navigation';
    import RunCard from '$lib/components/RunCard.svelte';
    import Digest from '$lib/components/Digest.svelte';
    import Model from '$lib/components/Model.svelte';
    import { loading, aggregations } from '$lib/stores/data.js';

    </script>
{#if $loading}
    Loading..
{:else}
{#each $aggregations.models as model (model.model)}
<div class="m-2">
<Model model={model.model} meanWinRate={model.winRate} taskCount={Object.keys(model.inst).length} >
    {#each Object.entries(model.inst) as [digestHash, digestProper] (digestHash)}
    <div class="my-2">
    <Digest
        dataset={digestProper.dataset}
        metric={digestProper.metric}
        data_digest={digestProper.data_digest}
        score_summary={digestProper.score_summary}
        completed={digestProper.completed}
        runCount={digestProper.runs.length}
        onclick={()=>goto(`/compare/${digestProper.data_digest}/${digestProper.metric}`)}
    >
        {#each digestProper.runs as run (run.name)}
            <RunCard
                name={run.name}
                score_summaey={run.score_summary}
                completed={run.completed}
                duration={run.duration}
                max_samples={run.max_samples}
                dataset_labels={run.dataset_labels}
                onclick={()=>goto(`/run/${run.name}`)}
            />
        {/each}
    </Digest>
    </div>
    {/each}
</Model>
</div>
{/each}

{/if}
