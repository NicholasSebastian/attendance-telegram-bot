import { getEntry, saveEntry, deleteEntry } from "./data";
import { sendMessage } from "./telegram";
import { fmtDuration, fmtTimestr } from "./utils";
import { limits, routes } from "./constants";
import { OK } from "./index";

// NOTE:
// Don't respond to Telegram requests with an error code
// because it will cause its infinite backlogging and get stuck.

export default async function(env: Env, payload: Message) {
    const { chat, from, text, date: now } = payload;
    try {
        const username = '@' + from.username;
        const prevEntry = await getEntry(env, username);

        if (text.startsWith("/in")) {
            if (prevEntry) await deleteEntry(env, username);
            else return OK;

            const duration = now - prevEntry.out;
            const limit = limits[prevEntry.type] * 60;
            if (duration < limit) return OK;

            const outstr = "Out: " + fmtTimestr(prevEntry.out);
            const instr = "In: " + fmtTimestr(now);
            const latestr = "Telat: " + fmtDuration(duration - limit);
            const message = [username, outstr, instr, latestr].join('\n');

            await sendMessage(env, chat.id, message);
            return OK;
        }
        for (const route of routes) {
            if (text.startsWith(route.command)) {
                if (!prevEntry) await saveEntry(env, username, { 
                    name: from.first_name, 
                    out: now, 
                    type: route.type 
                });
                return OK;
            }
        }
        await sendMessage(env, chat.id, "Command tidak valid");
        return OK;
    }
    catch (err) {
        console.log(err);
        return OK;
    }
}
