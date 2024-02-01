export function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

function _mergeSummaries(s1, s2) {
    const out = {};
    const keys = new Set([...Object.keys(s1), ...Object.keys(s2)]);

    for (const k of keys) {
        if (s1[k] === undefined) {
            out[k] = s2[k];
        } else if (s2[k] === undefined) {
            out[k] = s1[k];
        } else {
            const count = s1[k].count + s2[k].count;
            const value = s1[k].mean * s1[k].count + s2[k].mean * s2[k].count;
            out[k] = {
                mean: value / count,
                count: count,
                min: Math.min(s1[k].min, s2[k].min),
                max: Math.max(s1[k].max, s2[k].max),
            }
        }
    }

    return out;
}

export function mergeSummaries(summaries) {
    let summary = {};
    for (const s of summaries) {
        summary = _mergeSummaries(summary, s);
    }
    return summary;
}

export function formatSummary({mean, count, min, max }) {
    return `${mean.toFixed(3)} (#${count}, ${min.toFixed(3)}-${max.toFixed(3)})`;
}

export function formatDigest(digest) {
    return digest.slice(0, 6);
}

const duration_pieces = [
    { suffix: 's', modulo: 60, },
    { suffix: 'm', modulo: 60, },
    { suffix: 'h', modulo: 24, },
    { suffix: 'd' },
];

export function formatDuration(seconds) {
    const out = [];
    for (const piece of duration_pieces) {
        let value = seconds;
        if (piece.modulo) {
            value = seconds % piece.modulo;
            seconds = Math.floor(seconds / piece.modulo);
        }
        if (piece.suffix === 's') {
            out.push(`${value.toFixed(2)}${piece.suffix}`);
        } else {
            out.push(`${value}${piece.suffix}`);
        }
        if (seconds === 0) {
            break;
        }
    }

    return out.reverse().join(' ');
}
