export class EpochFormatter {
    get title() {
        return "Unix Time";
    }

    match(text) {
        return text.length > 9 && !isNaN(Number(text));
    }

    format(text) {
        /**
         * Milliseconds -> Microseconds
         */
        if (text.length < 13) {
            text += '000';
        }

        var epoch = Number(text);

        return [
            this._epochToHuman('UTC', epoch),
            this._epochToHuman(Intl.DateTimeFormat().resolvedOptions().timeZone, epoch),
            this._epochTimeDiff(epoch),
            this._epochToISO(epoch)
        ];
    }

    _epochToHuman(tz, epoch) {
        var options = {
            year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
            timeZone: tz,
            timeZoneName: 'short'
        };

        var date = new Date(epoch);
        return new Intl.DateTimeFormat('en-UK', options).format(date);
    }

    _epochTimeDiff(epoch) {

        /**
         * Copied from https://github.com/ZitRos/datetime-difference
         */
        function datetimeDiff (from, to) {

            const min = [-Infinity, 1, 1, 0, 0, 0, 0];
            const max = [Infinity, 12, null, 24, 60, 60, 1000];

            if (to < from) {
                const temp = to;
                to = from;
                from = temp;
            }

            let start = [from.getUTCFullYear(), from.getUTCMonth() + 1, from.getUTCDate(), from.getUTCHours(),
                    from.getUTCMinutes(), from.getUTCSeconds(), from.getUTCMilliseconds()],
                end = [to.getUTCFullYear(), to.getUTCMonth() + 1, to.getUTCDate(), to.getUTCHours(), to.getUTCMinutes(),
                    to.getUTCSeconds(), to.getUTCMilliseconds()],
                i = 7;

            const dec = (i) => {
                --end[i];
                while (end[i] < min[i]) {
                    const r = dec(i - 1);
                    end[i] += max[i] === null
                        ? r
                        : max[i];
                }
                return i === 1 ? new Date(Date.UTC(end[0], end[1], 0)).getUTCDate() : max[i + 1];
            };

            while (i > 0) {
                --i;
                let diff = end[i] - start[i];
                while (diff < 0) {
                    end[i] += dec(i - 1);
                    diff = end[i] - start[i];
                }
                end[i] = diff;
            }

            return {
                date: {
                    Y: end[0],
                    M: end[1],
                    D: end[2],
                },
                time: {
                    h: end[3],
                    m: end[4],
                    s: end[5],
                    ms: end[6],
                },
            };
        };

        function formatDiff(d) {
            return Object.keys(d).filter((i)=>d[i] !== 0).map((i)=>`${d[i]}${i}`).join(' ');
        }

        var diff = datetimeDiff(new Date(epoch), new Date());
        return formatDiff(diff.date) + ' [' + formatDiff(diff.time) + ']';
    }

    _epochToISO(epoch) {
        return new Date(epoch).toISOString();
    }

}
