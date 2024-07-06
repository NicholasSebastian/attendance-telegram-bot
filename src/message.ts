export const MAX_TIME_OUT = 0.5 * 60; // 5 minutes.

export function formatMessage(username: string, timeIn: number, timeOut: number) {
	const lateBy = (timeIn - timeOut) - MAX_TIME_OUT;
	const lateByStr = formatDuration(lateBy);
	const timeOutStr = new Date(timeOut).toLocaleTimeString();
	const timeInStr = new Date(timeIn).toLocaleTimeString();

	return `@${username}\nOut jam ${timeOutStr}\nIn jam ${timeInStr}\nTelat ${lateByStr}`;
}

function formatDuration(duration: number) {
    let str = "";
    if (duration > 59) {
        str += Math.floor(duration / 60) + " menit ";
    }
    str += duration % 60 + " detik";
    return str;
}
