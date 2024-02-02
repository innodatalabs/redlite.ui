<script>
    let collapsed = $state(true);
    function onToggleExpand() {
        collapsed = !collapsed;
    }
    let div;
    let needCollapse = $state(true);
    $effect(()=>{
        needCollapse = div.scrollHeight > div.clientHeight;
        if (!needCollapse) {
            collapsed = false;
        }
    });
</script>
<div class="relative flex-grow border rounded">
<div bind:this={div} class="font-mono text-sm max-h-128 text-base bg-white px-1 break-word whitespace-pre-wrap overflow-y-hidden rounded" class:collapsed={needCollapse && collapsed}>
    <slot />&#8203;
</div>
{#if needCollapse}
<button class="absolute right-0 bottom-0 border rounded-lg bg-white px-3 border-1 border-gray-500 shadow-lg cursor-pointer" title="expand" onclick={onToggleExpand}>...</button>
{/if}
</div>
<style>
.collapsed {
    max-height: 12rem;
    mask-image: linear-gradient(to bottom, black 75%, transparent 100%);
}
</style>