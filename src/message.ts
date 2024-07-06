const TELEGRAM_API = "https://api.telegram.org";

// NOTE: Send this POST request manually to set the target URL.
// https://api.telegram.org/bot7257452888:AAHuuT8dZzBSqyKlghzxmmr8W0O486-tAAw/setWebhook

// Production with CF: 
// { url: "https://in-out-psg.workers.dev" }

// Development with ngrok: 
// { url: "https://bd20-167-179-40-197.ngrok-free.app/" }

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
