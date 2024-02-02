<script>
    import ExpandableTextBlock from '$lib/components/ExpandableTextBlock.svelte';
    import { tick } from 'svelte';

    const { id, messages, expected, actual, score, scrollToId} = $props();

    let div;
    $effect(async () => {
        div;
        if (id === scrollToId) {
            await tick();
            div.scrollIntoView({smooth: true})
        }
    })
</script>
<div class="m-2 p-1 bg-gray-50 rounded-lg shadow border border-gray-400" bind:this={div}>
    {scrollTo, id}
    <div class="flex">
        <div class="font-medium my-1 ml-2">messages:</div>
        <span class="grow text-right mr-2 text-sm text-gray-500">id: {id}</span>
    </div>
    <div>
        {#each messages as message}
            <div class="flex">
                <div class="flex-none w-10 ml-2 mt-0" title={'role: ' + message.role}>
                {#if message.role==='user'}
                <div class="flex flex-col items-center content-center justify-center bg-green-300 border border-green-600 w-8 h-8 rounded-full">
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                {:else if message.role === 'assistant'}
                <div class="flex flex-col items-center content-center justify-center bg-blue-300 border border-blue-600 w-8 h-8 rounded-full">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M6.81818 22L6.81822 19.143C6.51904 16.1656 3.00001 14.5717 3.00001 10.0004C3 5.42914 5.72738 1.94374 11.1819 2.00069C15.1094 2.04169 18.8182 4.28632 18.8182 8.8576L21 12.286C21 14.5717 18.8182 14.5717 18.8182 14.5717C18.8182 14.5717 19.3636 20.2858 14.4545 20.2858L14.4545 22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 12C12.1046 12 13 11.1046 13 10C13 8.89543 12.1046 8 11 8C10.6357 8 10.2942 8.09739 10 8.26756C9.4022 8.61337 9 9.25972 9 10C9 10.7403 9.4022 11.3866 10 11.7324C10.2942 11.9026 10.6357 12 11 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 13C12.6569 13 14 11.6569 14 10C14 8.34315 12.6569 7 11 7C9.34315 7 8 8.34315 8 10C8 11.6569 9.34315 13 11 13Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.3 2"></path>
                    </svg>
                </div>
                {:else if message.role === 'system'}
                <div class="flex flex-col items-center content-center justify-center bg-yellow-300 border border-yellow-600 w-8 h-8 rounded-full">
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                {:else}
                ??? {message.role}
                {/if}
                </div>
                <ExpandableTextBlock>{message.content}</ExpandableTextBlock>
            </div>
        {/each}
    </div>
    <div>
        <div class="font-medium my-1 ml-2">expected:</div>
        <div class="ml-12">
            <ExpandableTextBlock>{expected}</ExpandableTextBlock>
        </div>
    </div>
    <div>
        <div class="font-medium my-1 ml-2">actual:</div>
        <div class="ml-12 flex items-left">
            <ExpandableTextBlock>{actual}</ExpandableTextBlock></div>
        </div>
    <div class="my-1 ml-2">
        <span class="font-medium">score:</span> {score.toFixed(3)}
    </div>
</div>
