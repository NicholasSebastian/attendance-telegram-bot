import { sendMessage } from "./telegram";
import { formatMessage, MAX_TIME_OUT } from "./message";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== "POST") return new Response("Ngapain?");

		const body = await request.json() as Update;
		if (!body.message) return new Response(undefined, { status: 400 });

		const { chat, from, date, text } = body.message;
		if (chat.type !== "group") return new Response(undefined, { status: 400 });

		try {
			const datestr = date.toString();
			const cmd = text.substring(0, text.indexOf(' '));

			switch (cmd) {
				case "/out":
					env.telegram_in_out.put(from.username, datestr);
					break;
				case "/in":
					const entry = await env.telegram_in_out.get(from.username);
					if (!entry) break;

					const unix = parseInt(entry);
					if (isNaN(unix)) return new Response(undefined, { status: 500 });

					const now = Date.now();
					const duration = Math.floor(now / 1000) - unix;
					if (duration > MAX_TIME_OUT) {
						const message = formatMessage(from.username, now, unix * 1000);
						sendMessage(chat.id, message);
					}

					env.telegram_in_out.delete(from.username);
					break;
			}
			return new Response(undefined, { status: 200 });
		}
		catch (err) {
			sendMessage(chat.id, `Bot Server Error:\n${err}`);
			return new Response(undefined, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
