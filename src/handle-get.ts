import { BAD_REQUEST, SERVER_ERROR } from "./index";
import { TELEGRAM_API } from "./message";
import { renderTable, fmtContent } from "./page";

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
        const url = `${TELEGRAM_API}/bot${env.TELEGRAM_BOT_TOKEN}/setWebhook`;
        const headers = { "Content-Type": "application/json" };
        const body = JSON.stringify({ url: origin });

        const response = await fetch(url, { method: "POST", headers, body });
        if (!response.ok) SERVER_ERROR;

        const payload = await response.json<any>();
        return new Response(payload, { headers, status: 200 });
    }}
    return BAD_REQUEST;
}
