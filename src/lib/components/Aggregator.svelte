<script>
    import Bubble from '$lib/components/Bubble.svelte';
    import Caret from '$lib/components/Caret.svelte';
    import { formatSummary } from '$lib/util.js';

    const { label, value, summary, onclick } = $props();
    let expanded = $state(false);

    function onToggleExpansion() {
        expanded = !expanded;
    }
</script>
<div>
    <div class="flex">
        <Caret {expanded} {onToggleExpansion} /><Bubble {label} {value} {onclick} />{#if summary !== undefined}&nbsp;<Bubble label="metric" value={formatSummary(summary)} />{/if}
    </div>
    <div class="ml-12">
        {#if expanded}
        <slot />
        {/if}
    </div>
</div>