<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let { label, path, hidden=false } = $props();
</script>
<div class="mr-4 text-base font-medium text-gray-700 pt-2 pb-2 box-border border border-b-2 border-white"
    class:hidden={hidden && $page.route.id !== path}
    class:cursor-pointer={!hidden}
    class:hover:text-gray-900={!hidden && $page.route.id!==path}
    class:hover:text-blue-700={!hidden && $page.route.id===path}
    class:border-b-blue-600={$page.route.id===path}
    class:text-blue-600={$page.route.id===path}
    onclick={() => goto(path)} role="presentation">{label}</div>
