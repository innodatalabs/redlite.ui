import { loadDigests } from '$lib/load.js';

export async function loadModels (digest, metric) {
    const digests = await loadDigests();

    const out = {
        data_digest: digest,
        dataset: digests[0].dataset,
        metric: metric,
        models: [],
    };

    for (const run of digests.filter(x => x.data_digest === digest && x.metric === metric).map(x => x.runs[0])) {
        out.dataset = run.dataset;
        out.dataset_labels = run.dataset_labels;
        out.models.push({
            model: run.model,
            started: run.started,
            completed: run.completed,
            duration: run.started,
            score_summary: run.score_summary,
            run: run.name,
        });
    }

    return out;
}
