<script>
    import { textColors } from "./colors.js";

    const noop = x => x;
    const { item, title, value, label, onclick, format = noop } = $props();

    const val = item[value || label];
    const textColor = textColors[label];

</script>

<div
title={title ? title(val) : undefined}
onclick={onclick ? () => onclick(val) : undefined}
role="presentation"
class:cursor-pointer={!!onclick}
class:hover:bg-gray-100={!!onclick}
class="p-4 flex items-center {textColor}"
>
{format(val)}
{#if !!onclick}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-4 h-4 inline">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
{/if}
</div>
