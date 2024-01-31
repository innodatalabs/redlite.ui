<script>
    const { labels, onclick, ...restProps } = $props();
    const cursor = onclick ? 'cursor-pointer' : '';

    function formatLabels(labels) {
        return Object.entries(labels).map(([k,v]) => `${k}=${v}`).join(', ');
    }
</script>
{#if labels && Object.keys(labels).length > 0}
<div class={`inline-block py-1 px-2 my-0.5 rounded-full border border-gray-500 bg-gray-100 ${cursor}`} {onclick} {...restProps} role="presentation">
    <span class="font-medium">{formatLabels(labels)}
</div>
{/if}
