<script>
    import { goto } from '$app/navigation';
    import Task from '$lib/components/Task.svelte';
    import Model from '$lib/components/Model.svelte';
    import RunCard from '$lib/components/RunCard.svelte';
    import { loading, aggregations } from '$lib/stores/data.js';
    import { safeName } from '$lib/util.js';
    import NoDataFound from '$lib/components/NoDataFound.svelte';
</script>
{#if $loading}
    Loading..
{:else if $aggregations.tasks.length === 0}
<NoDataFound />
{:else}
{#each $aggregations.tasks as task (task.taskHash)}
<div class="m-2">
<Task
    dataset={task.dataset}
    split={task.split}
    metric={task.metric}
    data_digest={task.data_digest}
    modelCount={Object.keys(task.models).length}
    onclick={()=>goto(`/compare/${task.data_digest}/${safeName(task.metric)}`)}
    >
    {#each Object.entries(task.models) as [modelName, runs] (modelName)}
    <div class="my-2">
    <Model
        model={modelName}
        score_summary={runs.score_summary}
        completed={runs.completed}
        winner={runs.wins > 0}
        runCount={runs.runs.length}
    >
        {#each runs.runs as run (run.run)}
            <RunCard
                run={run.run}
                score_summary={run.score_summary}
                completed={run.completed}
                duration={run.duration}
                max_samples={run.max_samples}
                dataset_labels={run.dataset_labels}
                onclick={()=>goto(`/run/${safeName(run.run)}`)}
            />
        {/each}
    </Model>
    </div>
    {/each}
</Task>
</div>
{/each}

{/if}
