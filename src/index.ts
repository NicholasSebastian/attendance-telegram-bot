import handleGet from "./handle-get";
import handlePost from "./handle-post";

export const OK = new Response(undefined, { status: 200 });
export const BAD_REQUEST = new Response(undefined, { status: 400 });
export const SERVER_ERROR = new Response(undefined, { status: 500 });

export default {
	async fetch(request, env, _): Promise<Response> {
		switch (request.method) {
		case "GET":
			return handleGet(request, env);
			
		case "POST":
			const body = await request.json() as Update;
			if (body.message === undefined) break;
			if (body.message.chat.type !== "group") break;
			return handlePost(env, body.message);
		}
		return BAD_REQUEST;
	}
} satisfies ExportedHandler<Env>;
