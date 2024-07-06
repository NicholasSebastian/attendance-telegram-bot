
export function getFirstWord(text: string) {
    const separator = text.indexOf(' ');
    if (separator > 0) return text.substring(0, separator);
    return text;
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
