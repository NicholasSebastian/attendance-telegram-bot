export const TELEGRAM_API = "https://api.telegram.org";

export function sendMessage(env: Env, chatId: number, text: string) {
	const token = env.TELEGRAM_BOT_TOKEN;
	const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
	const payload = { chat_id: chatId, text };

	console.log(url, payload); // For debugging.

	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
}
