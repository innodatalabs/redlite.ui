<script>
    import { page } from '$app/stores';
    import Item from './Item.svelte';
    import { loadModels } from './load-models.js';
    import { compareRuns } from './compare.js';
    import Task from '$lib/components/Task.svelte';
    import Model from '$lib/components/Model.svelte';

    const checked = $state({});
    let canCompare = $state(false);
    const comparison = $state([]);

    function toggleModel (m) {
        comparison.length = 0;
        if (!checked[m.run]) {
            m.index = Object.keys(checked).length;
            checked[m.run] = {...m};
        } else {
            delete checked[m.run];
        }
        canCompare = Object.keys(checked).length >= 2;
    }

    let comparingInProgress = $state(false);
    let modelsToCompare = $state([]);

    async function runCompare () {
        comparison.length = 0;
        modelsToCompare = [];
        const runs = Object.values(checked).toSorted((a,b) => a.index - b.index);

        if (runs.length < 2) {
            return;
        }

        modelsToCompare = runs.map(x => x.model);

        try {
            comparingInProgress = true;
            const out = await compareRuns(runs.map(x => x.run));

            comparison.push(...out);
        } finally {
            comparingInProgress = false;
        }
    }
</script>
<div class="m-2">
{#if $page.params.digest && $page.params.metric}
{#await loadModels($page.params.digest, $page.params.metric)}
    Loading..
{:then x}
<div class="flex flex-col">
    <Task
        dataset={x.dataset}
        split={x.split}
        data_digest={x.data_digest}
        metric={x.metric}
        datase_labels={x.dataset_labels}
        completed={x.completed}
        expandable={false}
    />
    <div>
    <button
        class="mt-2 text-white shadow-md px-2 py-1 border rounded-lg"
        aria-label="Compare"
        onclick={() => runCompare()}
        disabled={!canCompare}
        class:bg-blue-100={!canCompare}
        class:bg-blue-500={canCompare}
        class:border-gray-300={!canCompare}
        class:border-gray-700={canCompare}
    >Compare</button>
    </div>
</div>
<div class="my-8 mt-4">
    {#each x.models as m (m.model)}
    <div class="flex my-2">
        <input class="m-2" type="checkbox" onchange={()=>toggleModel(m)} />
        <div class="flex-grow">
            <Model
                model={m.model}
                score_summary={m.score_summary}
                run={m.run}
                expandable={false}
            />
        </div>
    </div>
    {/each}
</div>
{:catch error}
    {error}
{/await}
<div>
{#if comparingInProgress}Comparing..{/if}
{#each comparison as cmp}
<Item {...cmp} {modelsToCompare} />
{/each}
</div>
{/if}
</div>