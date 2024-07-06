import { BAD_REQUEST } from "./index";
import { getEntries } from "./data";

export default async function(request: Request, env: Env) {
    const path = new URL(request.url).pathname;
    if (path !== '/') return BAD_REQUEST;

    const table = await renderTable(env);
    const content = fmtContent(table);

    return new Response(content, {
        headers: { "Content-Type": "text/html" },
        status: 200
    });
}

function fmtContent(body: string) {
    return `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data In Out PSG</title>
            <style>
                * {
                    font-family: Arial, sans-serif;
                }
                h1 {
                    text-align: center;
                }
                table, button {
                    margin: 0 auto;
                }
                table {
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 5px 10px;
                }
                button {
                    display: block;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h1>List Staff yang lagi Out</h1>
            ${body}
            <button onclick="window.location.reload()">Refresh</button>
        </body>
        </html>`;
}

async function renderTable(env: Env) {
    let tableHtml = "", i = 1;
    for await (const [username, unix] of getEntries(env)) {
        const col0 = "<td>" + i++ + "</td>";
        const col1 = "<td>" + username + "</td>";
        const col2 = "<td>" + new Date(unix * 1000).toLocaleTimeString() + "</td>";
        tableHtml += "<tr>" + col0 + col1 + col2 + "</tr>";
    }
    if (!tableHtml) return "<div style='text-align: center'>Kosong</div>";
    return `
        <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>User Telegram</th>
                <th>Waktu Out</th>
            </tr>
        </thead>
        <tbody>${tableHtml}</tbody>
        </table>`;
}
