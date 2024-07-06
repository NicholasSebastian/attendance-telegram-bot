import { safeParseInt } from "./utils";

type KV = [string, number];

export async function* getEntries(env: Env): AsyncGenerator<KV> {
    const results = await env.telegram_in_out.list();
    for (const key of results.keys) {
        const value = await env.telegram_in_out.get(key.name);
        const numval = safeParseInt(value);
        if (numval) yield [key.name, numval];
    }
}

export async function getEntry(env: Env, key: string) {
    const entry = await env.telegram_in_out.get(key);
    return safeParseInt(entry);
}

export function saveEntry(env: Env, key: string, value: number) {
    return env.telegram_in_out.put(key, value.toString());
}

export function deleteEntry(env: Env, key: string) {
    return env.telegram_in_out.delete(key);
}
