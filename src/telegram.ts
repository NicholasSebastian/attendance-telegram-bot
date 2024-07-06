const TELEGRAM_API = "https://api.telegram.org";
const BOT_TOKEN = "7257452888:AAHuuT8dZzBSqyKlghzxmmr8W0O486-tAAw";

// NOTE: Send this POST request manually to set the target URL.
// https://api.telegram.org/bot7257452888:AAHuuT8dZzBSqyKlghzxmmr8W0O486-tAAw/setWebhook

// Production with CF: 
// { url: "https://in-out-psg.workers.dev" }

// Development with ngrok:
// { url: "https://f798-167-179-40-197.ngrok-free.app/" }

const sendMessageUrl = `${TELEGRAM_API}/bot${BOT_TOKEN}/sendMessage`;

export function sendMessage(chatId: number, text: string) {
	return fetch(sendMessageUrl, {
		method: "POST",
		body: JSON.stringify({ chat_id: chatId, text })
	});
}
