<script>
    const { label, value, onclick, ...rest } = $props();
</script>

{#if value !== undefined}
<div class="flex flex-col flex-none m-1 mx-2" class:cursor-pointer={!!onclick} {onclick} role="presentation" {...rest}>
    <div class="flex-none m-1 font-bold">{label}</div>
    <div class="flex-none m-1">{value}</div>
</div>
{/if}