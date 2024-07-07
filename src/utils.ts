
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
