<script>
    import { page } from '$app/stores';
    import Bubble from '$lib/components/Bubble.svelte';
    import Labels from '$lib/components/Labels.svelte';
    import { formatSummary, formatDate } from '$lib/util.js';
    import Item from './Item.svelte';
    import { loadModels } from './load-models.js';
    import { compareRuns } from './compare.js';
    import RunCard from '$lib/components/RunCard.svelte';
    import Model from '$lib/components/Model.svelte';

    const checked = $state({});

    const mnemonic = "ABCDEFG";

    const comparison = $state([]);

    function toggleModel (m) {
        comparison.length = 0;
        if (!checked[m.run]) {
            m.index = Object.keys(checked).length;
            checked[m.run] = {...m};
        } else {
            delete checked[m.run];
        }
    }

    let comparingInProgress = $state(false);

    async function runCompare () {
        comparison.length = 0;
        const runs = Object.values(checked).toSorted((a,b) => a.index - b.index);

        if (runs.length < 2) {
            return;
        }

        try {
            comparingInProgress = true;
            const out = await compareRuns(runs.map(x => x.run));
            console.log(out);

            comparison.push(...out);
        } finally {
            comparingInProgress = false;
        }
    }

    function countWins (comparison, position) {
        let count = 0;
        for (const cmp of comparison) {
            const best = Math.max(...cmp.scores);
            if (cmp.scores[position] >= best) {
                count += 1;
            }
        }

        return count;
    }
</script>
<div class="m-2">
{#if $page.params.digest && $page.params.metric}
{#await loadModels($page.params.digest, $page.params.metric)}
    Loading..
{:then x}
<div>
    <RunCard
        dataset={x.dataset}
        data_digest={x.data_digest}
        metric={x.metric}
        datase_labels={x.dataset_labels}
    />
    {#if Object.values(checked).length >= 2}
    <button class="ml-24 bg-blue-500 text-white shadow-md px-2 py-1 border border-gray-700 rounded-full" aria-label="Compare" onclick={() => runCompare()}>Compare</button>
    {/if}
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
    {#if checked[m.run]}
        <span class="px-2 py-1 bg-orange-300 rounded-full border border-gray-500">{mnemonic[checked[m.run].index]}{#if comparison.length > 0}&nbsp;wins: {countWins(comparison, checked[m.run].index)}{/if}</span>
    {/if}
    </div>
    {/each}
</div>
{:catch error}
    {error}
{/await}
<div>
{#if comparingInProgress}Comparing..{/if}
{#each comparison as cmp}
<Item {...cmp} />
{/each}
</div>
{/if}
</div>