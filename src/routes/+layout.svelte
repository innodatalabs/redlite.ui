<script>
    import "../app.css";
    import Section from '$lib/components/Section.svelte';
</script>

<div class="parent font-system">
    <header class="flex pl-2 flex-rows items-center content-center justify-start text-gray-500 box-border border-b border-b-gray-300 shadow">
        <Section label="Models" path="/models" />
        <Section label="Datasets" path="/datasets" />
        <Section label="Runs" path="/run" />
        <Section label="Run Details" path="/run/[name]" hidden={true} />
        <Section label="Compare Models" path="/compare/[digest]/[metric]" hidden={true} />
    </header>
    <div class="overflow-auto"><slot /></div>
</div>
<style>
.parent {
    display: grid;
    grid-template: auto 1fr / 1fr;
    overflow-y: hidden;
    height: 100vh;
}

.font-system {
    font-family: var(--system-font);
}

.divider-bottom {
    box-shadow: inset 0 -1px rgb(200, 200, 200);
}
</style>
