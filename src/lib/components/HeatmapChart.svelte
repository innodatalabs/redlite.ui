<script>
    const { data, margin = 2, labelPadding = 1.5, fontSize = 2.0, transpose = true, color = "rgb(29, 78, 216)" } = $props();

    function makeChart (data) {
        const xs = new Set();
        const ys = new Set();
        const values = new Map();

        for (let { x, y, v } of data) {
            if (transpose) {
                const z = y;
                y = x;
                x = z;
            }
            xs.add(x);
            ys.add(y);
            values.set(x + ' /// ' + y, v);
        }

        const labels_x = [...xs].toSorted();
        const labels_y = [...ys].toSorted();
        const v_min = Math.min(...values.values());
        const v_max = Math.max(...values.values());

        return {
            xs: labels_x,
            ys: labels_y,
            values,
            v_min,
            v_max,
        }
    }
    const chart = $derived(makeChart(data));

    let viewBoxX0 = $state(0);
    let viewBoxY0 = $state(0);
    let viewBoxX1 = $state(10);
    let viewBoxY1 = $state(10);

    function computeViewbox (svg) {
        let x0 = 0;
        let y0 = 0;
        let x1 = 10;
        let y1 = 10;
        for (const c of svg.children) {  // NOT recursive!
            const {x, y, width, height } = c.getBBox();
            let p1 = DOMPoint.fromPoint({x, y});
            let p2 = DOMPoint.fromPoint({x:x+width, y:y+height});
            let p3 = DOMPoint.fromPoint({x:x+width, y});
            let p4 = DOMPoint.fromPoint({x:x, y:y+height});
            for (const t of c.transform.baseVal) {
                const { a, b, c, d, e, f } = t.matrix;
                const m = new DOMMatrixReadOnly([a, b, c, d, e, f]);
                p1 = m.transformPoint(p1);
                p2 = m.transformPoint(p2);
                p3 = m.transformPoint(p3);
                p4 = m.transformPoint(p4);
            }
            x0 = Math.min(x0, p1.x, p2.x, p3.x, p4.x);
            y0 = Math.min(y0, p1.y, p2.y, p3.y, p4.y);
            x1 = Math.max(x1, p1.x, p2.x, p3.x, p4.x);
            y1 = Math.max(y1, p1.y, p2.y, p3.y, p4.y);
        }
        viewBoxX0 = x0;
        viewBoxY0 = y0;
        viewBoxX1 = x1;
        viewBoxY1 = y1;
    }

    async function getChartSVG() {
        const svg = document.getElementById('chart');
        const svgString = (new XMLSerializer()).serializeToString(svg);
        await navigator.clipboard.writeText(svgString);
        window.alert('SVG text copied to clipboard')
    }

</script>
<div class="relative h-[calc(100vh-44px)] w-auto text-blue-700">
<svg id="chart" version="1.1" viewBox="{viewBoxX0-margin} {viewBoxY0-margin} {viewBoxX1-viewBoxX0+2*margin} {viewBoxY1-viewBoxY0+2*margin}" use:computeViewbox class="block h-full m-auto">
    <rect x={viewBoxX0-margin} y={viewBoxY0-margin} width={viewBoxX1-viewBoxX0+margin+margin} height={viewBoxY1-viewBoxY0+margin+margin} fill="white"/>
    {#each chart.xs as x,i (x)}
        {#each chart.ys as y,j (y)}
            {#if chart.values.get(x + ' /// ' + y) !== undefined}
                {@const v = (chart.values.get(x + ' /// ' + y) - chart.v_min) / (chart.v_max - chart.v_min)}
                <rect x={i*10} y={j*10} width={9} height={9} rc={1} ry={1}
                    stroke="black" stroke-width={0.05}
                    fill="{color}" fill-opacity={v}
                ><title>v={chart.values.get(x + ' /// ' + y)} x={x} y={y}</title>
                </rect>
            {/if}
        {/each}
    {/each}
    {#each chart.xs as x,i (x)}
        <text x={i*10+4.5} y={-labelPadding} font-size={fontSize} transform="rotate(-30, {i*10+4.5}, {-labelPadding})">{x}</text>
    {/each}
    {#each chart.ys as y,j (y)}
        <text x={chart.xs.length*10+labelPadding} y={j*10 + 5} font-size={fontSize} >{y}</text>
    {/each}
</svg>
<button class="absolute m-2 top-0 right-0" onclick={getChartSVG} title="Copy SVG text to clipboard">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
</button>
</div>
