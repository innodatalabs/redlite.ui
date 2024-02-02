import { loadData } from '$lib/load.js';


export async function compareRuns (runs) {
    const arrays = [];
    for (const run of runs) {
        arrays.push((await loadData(run)).values());
    }

    const out = [];
    for (;;) {
        const items = [];
        let done = false;
        for (const a of arrays) {
            const item = await a.next();
            if (item.done) {
                done = true;
                break;
            }
            items.push(item.value);
        }
        if (done) {
            break;
        }
        const base = {...items[0]};
        delete base.score;
        delete base.actual;

        base.actuals = items.map(x => x.actual);
        base.scores = items.map(x => x.score);

        out.push(base);
    }

    return out;
}
