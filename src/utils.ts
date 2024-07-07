import { TelegramResponse } from "./telegram";

export function safeParseInt(str: string | null) {
    if (!str) return null;
    try {
        const num = parseInt(str);
        return isNaN(num) ? null : num;
    } catch {
        return null;
    }
}

export function fmtDuration(duration: number) {
    let str = "";
    if (duration > 59) {
        str += Math.floor(duration / 60) + " menit ";
    }
    str += duration % 60 + " detik";
    return str;
}

export function fmtTimestr(seconds: number) {
    const date = new Date(seconds * 1000);
    const timeZone = "Asia/Jakarta";
    return date.toLocaleTimeString("en-US", { timeZone });
}

export async function fmtJsonResponse(response: globalThis.Response, metadata?: Record<string, any>): Promise<TelegramResponse> {
    if (response.ok) {
        const data = await response.json() satisfies TelegramResponse;
        return { ...data, ...metadata };
    }
    return { ok: false, error_code: response.status, ...metadata };
}
