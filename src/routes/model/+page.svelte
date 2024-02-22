<script>
    import { goto } from '$app/navigation';
    import RunCard from '$lib/components/RunCard.svelte';
    import Task from '$lib/components/Task.svelte';
    import Model from '$lib/components/Model.svelte';
    import NoDataFound from '$lib/components/NoDataFound.svelte';
    import { loading, aggregations } from '$lib/stores/data.js';
    import { safeName } from '$lib/util.js';

    </script>
{#if $loading}
    Loading..
{:else if $aggregations.models.length === 0}
<NoDataFound />
{:else}
{#each $aggregations.models as model (model.model)}
<div class="m-2">
<Model model={model.model} meanWinRate={model.winRate} taskCount={Object.keys(model.tasks).length} >
    {#each Object.entries(model.tasks) as [digestHash, task] (digestHash)}
    <div class="my-2">
    <Task
        dataset={task.dataset}
        split={task.split}
        data_digest={task.data_digest}
        metric={task.metric}
        score_summary={task.score_summary}
        completed={task.completed}
        runCount={task.runs.length}
        winner={task.winner}
        onclick={()=>goto(`/compare/${task.data_digest}/${safeName(task.metric)}`)}
    >
        {#each task.runs as run (run.run)}
            <RunCard
                run={run.run}
                score_summaey={run.score_summary}
                completed={run.completed}
                duration={run.duration}
                max_samples={run.max_samples}
                dataset_labels={run.dataset_labels}
                onclick={()=>goto(`/run/${safeName(run.run)}`)}
            />
        {/each}
    </Task>
    </div>
    {/each}
</Model>
</div>
{/each}

{/if}
