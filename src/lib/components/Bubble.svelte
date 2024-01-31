<script>
    const { label, value, onclick, ...restProps } = $props();
    const bgColor = {
        run: 'bg-teal-200',
        model: 'bg-blue-200',
        dataset: 'bg-red-200',
        completed: 'bg-green-200',
        duration: 'bg-yellow-200',
        max_samples: 'bg-gray-200',
        metric: 'bg-orange-200',
        data_digest: 'bg-cyan-200',
    }[label] || '';
    const cursor = onclick ? 'cursor-pointer' : '';
</script>
<div class={`inline-block py-1 px-2 my-0.5 rounded-full border border-gray-500 ${bgColor} ${cursor}`} {onclick} {...restProps} role="presentation">
    <span class="font-medium">{label}:</span>&nbsp;<span class="font-normal">{value}</span>
</div>
