<script>
    import { textColors } from './colors.js';
    const { label, value, onclick, ...rest } = $props();

    const textColor = textColors[label];
</script>

{#if value !== undefined}
<div
    class="flex flex-col flex-none m-1 mx-2 rounded"
    class:cursor-pointer={!!onclick}
    class:hover:bg-gray-100={!!onclick}
    {onclick}
    role="presentation"
    {...rest}
>
    <div class="flex-none m-1 font-bold flex flex-rows items-center">{label}
        {#if !!onclick}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-4 h-4 inline">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        {/if}
    </div>
    <div class="flex-none m-1 {textColor}">{value}</div>
</div>
{/if}