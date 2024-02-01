import { writable, derived } from 'svelte/store';
import { loadRuns } from '../load.js';

export const loading = writable(false);

export const runs = (() => {
    const { subscribe, set } = writable([]);

    async function refresh () {
        try {
            loading.set(true);
            const runs = await loadRuns();
            runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));

            set(runs);
        } finally {
            loading.set(false);
        }
    }

    refresh();

    return { subscribe, refresh };
})();

export const instHash = run => `${run.dataset} ${run.data_digest} ${run.metric}`;

const TOLERANCE = 0.0001;

export const aggregations = derived(runs, (runs, set) => {
    const byModel = {};
    const byInst = {};

    for (const run of runs) {
        if (byModel[run.model] === undefined) {
            byModel[run.model] = {
                model: run.model,
                inst: {},
                winRate: 0.,
            };
        }
        if (byModel[run.model].inst[instHash(run)] === undefined) {
            byModel[run.model].inst[instHash(run)] = {
                data_digest: run.data_digest,
                dataset: run.dataset,
                metric: run.metric,
                winner: false,
                runs: [],
            };
        }
        byModel[run.model].inst[instHash(run)].runs.push(run);

        if (byInst[instHash(run)] === undefined) {
            byInst[instHash(run)] = {
                instHash: instHash(run),
                data_digest: run.data_digest,
                dataset: run.dataset,
                metric: run.metric,
                models: {},
                highestScore: 0.0,
            };
        }
        if (byInst[instHash(run)].models[run.model] === undefined) {
            byInst[instHash(run)].models[run.model] = {
                model: run.model,
                runs: [],
                wins: 0,
            };
        }
        byInst[instHash(run)].models[run.model].runs.push(run);
    }

    for (const inst of Object.values(byInst)) {
        for (const mod of Object.values(inst.models)) {
            mod.runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));
            mod.completed = mod.runs[0].completed;
            mod.score_summary = mod.runs[0].score_summary;
        }

        // compute win counts
        const highestScore = Math.max(...Object.values(inst.models).map(x => x.score_summary.mean));
        inst.highestScore = highestScore;

        for (const mod of Object.values(inst.models)) {
            if (Math.abs(mod.score_summary.mean - highestScore) < TOLERANCE && highestScore > TOLERANCE) {
                mod.wins += 1;
                byModel[mod.model].winRate += 1.;  // will rescale later
                byModel[mod.model].inst[inst.instHash].winner = true;
            }
        }
    }

    for (const mod of Object.values(byModel)) {
        for (const inst of Object.values(mod.inst)) {
            inst.runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));
            inst.completed = inst.runs[0].completed;
            inst.score_summary = inst.runs[0].score_summary;
        }
        mod.winRate /= Object.keys(byInst).length;
    }

    const models = [...Object.values(byModel)];
    models.sort((a, b) => b.winRate - a.winRate);

    const instances = [...Object.values(byInst)];
    instances.sort((a, b) => new Date(b.completed) - new Date(a.completed));

    set({ models, instances });
}, { models: [], instances: [] });
