<script>
    import { page } from '$app/stores';
    import Item from './Item.svelte';
    import { formatDate, formatSummary } from '$lib/util.js';
    import Bubble from '$lib/components/Bubble.svelte';
    import RunCard from '$lib/components/RunCard.svelte';
    import Labels from '$lib/components/Labels.svelte';
    import { loadMeta, loadData } from '$lib/load.js';

</script>
<div class="">
{#if $page.params.name}
{#await loadMeta($page.params.name)}
    Loading..
{:then meta}
<RunCard {...meta} />
{#await loadData($page.params.name)}
    Loading..
{:then items}
    {#each items as item (item.id) }
        <Item {...item} scrollToId={$page.url.searchParams.get('id')} />
    {/each}
{:catch error}
    {error}
{/await}
{:catch error}
    {error}
{/await}
{/if}
</div>