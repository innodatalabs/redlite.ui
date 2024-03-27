<script>
    const { expanded, onToggleExpansion, ...restProps } = $props();
    const cls = restProps.class;
    delete restProps.class;
</script>
<button onclick={onToggleExpansion} title="toggle metrics" class="flex-none w-6 ml-2 {cls}" {...restProps}>
    {#if expanded}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
    {/if}
</button>
