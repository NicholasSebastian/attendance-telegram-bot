export function parseCommand(message: Message) {
    const { text, entities } = message;
    const entity = entities.find(entity => entity.type === "bot_command");
    if (!entity) return null;

    const part = text.substr(entity.offset, entity.length);
    const tagIndex = part.indexOf('@');
    return tagIndex > 0 ? part.substring(0, tagIndex) : part;
}

export function safeParseInt(str: string | null) {
    if (!str) return null;
    try {
        const num = parseInt(str);
        return isNaN(num) ? null : num;
    } catch {
        return null;
    }
}

export function fmtDuration(duration: number) {
    let str = "";
    if (duration > 59) {
        str += Math.floor(duration / 60) + " menit ";
    }
    str += duration % 60 + " detik";
    return str;
}

export function fmtTimestr(seconds: number) {
    const date = new Date(seconds * 1000);
    const timeZone = "Asia/Jakarta";
    return date.toLocaleTimeString("en-US", { timeZone });
}
