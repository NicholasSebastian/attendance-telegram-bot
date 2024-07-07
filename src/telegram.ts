const TELEGRAM_API = "https://api.telegram.org";

interface TelegramResponse extends Record<string, any> {
    ok: boolean
}

async function execute(method: string, params: any, token: string) {
    const url = `${TELEGRAM_API}/bot${token}/${method}`;
    const response = await fetch(url, { 
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(params)
    });

    if (!response.ok) return { ok: false } as TelegramResponse;
    return response.json<TelegramResponse>();
}

export function initTelegramWebhook(env: Env, url: string) {
    const token = env.TELEGRAM_BOT_TOKEN;
    return execute("setWebhook", { url }, token);
}

export async function defineCommands(env: Env, commands: Array<Command>) {
    const token = env.TELEGRAM_BOT_TOKEN;
    const scope = { type: "all_group_chats" };
    const response = await execute("deleteMyCommands", { scope }, token);

    if (!response.ok) return response;
    return execute("setMyCommands", { commands, scope }, token);
}

export function sendMessage(env: Env, chatId: number, text: string) {
    const token = env.TELEGRAM_BOT_TOKEN;
	return execute("sendMessage", { chat_id: chatId, text }, token);
}
