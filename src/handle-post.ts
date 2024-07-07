import { getEntry, saveEntry, deleteEntry } from "./data";
import { parseCommand, fmtDuration, fmtTimestr } from "./utils";
import { sendMessage } from "./telegram";
import { OK } from "./index";

// NOTE:
// Don't respond to Telegram requests with an error code
// because it will cause its infinite backlogging and get stuck.

const MAX_TIME_OUT = 5 // * 60; // 5 minutes.

export default async function(env: Env, payload: Message) {
    const { chat, from, date: now } = payload;
    try {
        const username = '@' + from.username;
        const prevTime = await getEntry(env, username);
        const command = parseCommand(payload);

        switch (command) {
        case "/out": {
            if (!prevTime) await saveEntry(env, username, now);
            return OK;
        }
        case "/in": {
            if (prevTime) await deleteEntry(env, username);
            else return OK;

            const duration = now - prevTime;
            if (duration < MAX_TIME_OUT) return OK;

            const outstr = "Out: " + fmtTimestr(prevTime);
            const instr = "In: " + fmtTimestr(now);
            const latestr = "Telat: " + fmtDuration(duration - MAX_TIME_OUT);
            const message = [username, outstr, instr, latestr].join('\n');

            await sendMessage(env, chat.id, message);
            return OK;
        }
        default:
            await sendMessage(env, chat.id, "Command tidak valid");
            return OK;
        }
    }
    catch {
        await sendMessage(env, chat.id, "Bot Error");
        return OK;
    }
}
