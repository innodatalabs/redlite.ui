import { dev } from '$app/environment';
import { safeName } from './util.js';

function api(path) {
    if (dev) {
        return `http://localhost:8000${path}`;
    } else {
        return path;
    }
}

export async function loadMeta(runName) {
    const response = await fetch(api(`/api/runs/${safeName(runName)}/meta`));
    return await response.json();
}

export async function loadData(runName) {
    const response = await fetch(api(`/api/runs/${safeName(runName)}/data`));
    return await response.json();
}

export async function loadRuns() {
    const response = await fetch(api('/api/runs'));
    return await response.json();
}

export async function loadTasks () {
    const index = {};

    for (const run of await loadRuns()) {
        const digest = run.data_digest;

        if (index[`${digest} ${run.metric} ${run.model}`] === undefined) {
            index[`${digest} ${run.metric} ${run.model}`] = {
                data_digest: digest,
                dataset: run.dataset,
                metric: run.metric,
                model: run.model,
                runs: []
            };
        }
        index[`${digest} ${run.metric} ${run.model}`].runs.push(run);
    }

    for (const digest of Object.values(index)) {
        digest.runs.sort((a, b) => new Date(b.completed) - new Date(a.completed));
        digest.completed = digest.runs[0].completed;
        digest.score_summary = digest.runs[0].score_summary;
    }

    const out = [...Object.values(index)];
    out.sort((a, b) => new Date(b.completed) - new Date(a.completed));

    return out;
}
