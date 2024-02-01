<script>
    import GridCell from '$lib/components/GridCell.svelte';

    const { schema, data, cols } = $props();
</script>

<div class="grid grid-cols-{cols} font-bold border border-gray-200 rounded-lg bg-gray-200 m-2 p-4">
    {#each schema as s}
    <div>{s.label}</div>
    {/each}
</div>

{#each data as item}
<div class="grid grid-cols-{cols} border border-gray-200 rounded-lg m-2">
    {#each schema as s}
        <GridCell {item} {...s} />
    {/each}
</div>
{/each}
