import { BAD_REQUEST } from "./index";
import { renderTable, fmtContent } from "./page";
import { initTelegramWebhook, defineCommands } from "./telegram";

// NOTE:
// Manually send a GET request to '/setup' once after deployment 
// to configure the Telegram webhooks properly.

export default async function(request: Request, env: Env) {
    const { pathname, origin } = new URL(request.url);
    switch (pathname) {
    case "/": {
        const table = await renderTable(env);
        const content = fmtContent(table);
        const headers = { "Content-Type": "text/html" };
        return new Response(content, { headers });
    }
    case "/setup": {
        const response1 = await initTelegramWebhook(env, origin);
        if (!response1.ok) return Response.json(response1);

        const commands: Array<Command> = [
            { command: "in", description: "Lapor masuk kantor." },
			{ command: "out", description: "Lapor keluar kantor." }
        ];

        const response2 = await defineCommands(env, commands);
        return Response.json([response1, response2]);
    }}
    return BAD_REQUEST;
}
