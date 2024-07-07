import { BAD_REQUEST } from "./index";
import { renderTable, fmtHtmlResponse } from "./page";
import { initTelegramWebhook, defineCommands } from "./telegram";
import { commands } from "./constants";

// NOTE:
// Manually send a GET request to '/setup' once after deployment 
// to configure the Telegram webhooks properly.

export default async function(request: Request, env: Env) {
    const { pathname, origin } = new URL(request.url);
    switch (pathname) {
    case "/": {
        const table = await renderTable(env);
        return fmtHtmlResponse(`
            <h1>List Staff yang lagi Out</h1>
            ${table}
            <button onclick="window.location.reload()">Refresh (kadang ada delay)</button>
        `);
    }
    case "/setup": {
        const response1 = await initTelegramWebhook(env, origin);
        if (!response1.ok) return fmtHtmlResponse(`
            <h4>Error setting up Telegram webhook</h4>
            <pre>${JSON.stringify(response1, null, 2)}</pre>
        `);

        const response2 = await defineCommands(env, commands);
        return fmtHtmlResponse(`
            <h4>Telegram webhook setup successfully</h4>
            <pre>${JSON.stringify(response1, null, 2)}</pre>
            <h4>${response2.ok ? "Commands set successfully" : "Error setting Commands"}</h4>
            <pre>${JSON.stringify(response2, null, 2)}</pre>
        `);
    }}
    return BAD_REQUEST;
}
