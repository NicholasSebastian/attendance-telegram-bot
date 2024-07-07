import { Reason } from "./constants";

interface Entry extends Record<string, any> {
    name: string
    out: number
    type: Reason
}

export async function* getEntries(env: Env): AsyncGenerator<Entry> {
    const results = await env.telegram_in_out.list();
    for (const key of results.keys) {
        const value = await env.telegram_in_out.get(key.name);
        if (!value) continue;
        yield { username: key.name, ...JSON.parse(value) };
    }
}

export async function getEntry(env: Env, key: string): Promise<Entry | null> {
    const entry = await env.telegram_in_out.get(key);
    if (!entry) return null;
    return JSON.parse(entry);
}

export function saveEntry(env: Env, key: string, data: Entry) {
    const str = JSON.stringify(data);
    return env.telegram_in_out.put(key, str);
}

export function deleteEntry(env: Env, key: string) {
    return env.telegram_in_out.delete(key);
}
