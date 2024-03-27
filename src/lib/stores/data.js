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

export const taskHash = run => `${run.dataset} ${run.split} ${run.data_digest} ${run.metric}`;

const TOLERANCE = 0.0001;

export const aggregations = derived(runs, (runs, set) => {
    const byModel = {};
    const byTask = {};

    for (const run of runs) {
        if (byModel[run.model] === undefined) {
            byModel[run.model] = {
                model: run.model,
                tasks: {},
                winRate: 0.,
            };
        }
        if (byModel[run.model].tasks[taskHash(run)] === undefined) {
            byModel[run.model].tasks[taskHash(run)] = {
                data_digest: run.data_digest,
                dataset: run.dataset,
                split: run.split,
                metric: run.metric,
                winner: false,
                runs: [],
            };
        }
        byModel[run.model].tasks[taskHash(run)].runs.push(run);

        if (byTask[taskHash(run)] === undefined) {
            byTask[taskHash(run)] = {
                taskHash: taskHash(run),
                data_digest: run.data_digest,
                dataset: run.dataset,
                split: run.split,
                metric: run.metric,
                models: {},
                highestScore: 0.0,
            };
        }
        if (byTask[taskHash(run)].models[run.model] === undefined) {
            byTask[taskHash(run)].models[run.model] = {
                model: run.model,
                runs: [],
                wins: 0,
            };
        }
        byTask[taskHash(run)].models[run.model].runs.push(run);
    }

    for (const task of Object.values(byTask)) {
        for (const mod of Object.values(task.models)) {
            mod.runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));
            mod.completed = mod.runs[0].completed;
            mod.score_summary = mod.runs[0].score_summary;
        }

        // compute win counts
        const highestScore = Math.max(...Object.values(task.models).map(x => x.score_summary.mean));
        task.highestScore = highestScore;

        for (const mod of Object.values(task.models)) {
            if (Math.abs(mod.score_summary.mean - highestScore) < TOLERANCE && highestScore > TOLERANCE) {
                mod.wins += 1;
                byModel[mod.model].winRate += 1.;  // will rescale later
                byModel[mod.model].tasks[task.taskHash].winner = true;
            }
        }
    }

    for (const mod of Object.values(byModel)) {
        for (const task of Object.values(mod.tasks)) {
            task.runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));
            task.completed = task.runs[0].completed;
            task.score_summary = task.runs[0].score_summary;
        }
        mod.winRate /= Object.keys(byTask).length;
    }

    const models = [...Object.values(byModel)];
    models.sort((a, b) => b.winRate - a.winRate);

    const tasks = [...Object.values(byTask)];
    tasks.sort((a, b) => new Date(b.completed) - new Date(a.completed));

    set({ models, tasks });
}, { models: [], tasks: [] });


export const heatmap = derived(aggregations, aggregations => {
    const data = [];

    for (const task of aggregations.tasks) {
        for (const model of Object.values(task.models)) {
            data.push({
                x: task.dataset + '@' + task.data_digest.slice(0, 6),
                y: model.model,
                v: model.score_summary.mean,
            })
        }
    }

    return data;
}, []);
