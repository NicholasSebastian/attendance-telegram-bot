import handleGet from "./handle-get";
import handlePost from "./handle-post";
import { deleteEntry } from "./data";

export const OK = new Response(undefined, { status: 200 });
export const BAD_REQUEST = new Response(undefined, { status: 400 });

export default {
	async fetch(request, env, _): Promise<Response> {
		switch (request.method) {
		case "GET":
			return handleGet(request, env);
			
		case "POST":
			const body = await request.json<Update>();
			if (body.message === undefined) break;
			if (body.message.chat.type !== "group") break;
			return handlePost(env, body.message);

		case "DELETE":
			const key = new URL(request.url).searchParams.get("username");
			if (!key) break;
			await deleteEntry(env, key);
			return OK;
		}
		return BAD_REQUEST;
	}
} satisfies ExportedHandler<Env>;
