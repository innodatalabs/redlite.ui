<script>
    import GridCell from '$lib/components/GridCell.svelte';

    const { schema, data } = $props();
</script>

<div class="grid grid-cols-9 font-bold border border-gray-200 rounded-lg bg-gray-200 m-2">
    {#each schema as s}
    <div class="p-4">{s.label}</div>
    {/each}
</div>

{#each data as item}
<div class="grid grid-cols-9 border border-gray-200 rounded-lg m-2">
    {#each schema as s}
        <GridCell {item} {...s} />
    {/each}
</div>
{/each}
