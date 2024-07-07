import { getEntries } from "./data";
import { fmtTimestr } from "./utils";

export function fmtHtmlResponse(html: string) {
    const headers = { "Content-Type": "text/html" };
    const content = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data In Out PSG</title>
            <style>${CSS}</style>
        </head>
        <body>${html}</body>
        </html>`;

    return new Response(content, { headers });
}

export async function renderTable(env: Env) {
    let tableHtml = "", i = 1;
    for await (const { username, name, out, type } of getEntries(env)) {
        const col0 = "<td>" + i++ + "</td>";
        const col1 = "<td>" + username + "</td>";
        const col2 = "<td>" + name + "</td>";
        const col3 = "<td>" + fmtTimestr(out) + "</td>";
        const col4 = "<td>" + type + "</td>";
        const col5 = `<td><button onclick="deleteEntry('${username}')">Cancel</button></td>`;
        tableHtml += "<tr>" + col0 + col1 + col2 + col3 + col4 + col5 + "</tr>";
    }
    if (!tableHtml) return "<div style='text-align: center'>Kosong</div>";
    return `
        <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>User Telegram</th>
                <th>Nama</th>
                <th>Waktu Out</th>
                <th>Alasan</th>
                <th></th>
            </tr>
        </thead>
        <tbody>${tableHtml}</tbody>
        </table>`;
}

export const TABLE_SCRIPTS = `
    function deleteEntry(username) {
        fetch("/?username=" + username, { method: "DELETE" }).then(res => {
            if (res.ok) { 
                alert("OK"); 
                window.location.reload(); 
            } 
            else { 
                alert("Error"); 
            }
        });
    }
`;

const CSS = `
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
    }`;
