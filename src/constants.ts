type Limits = {
    [key in Reason]: number
}

export enum Reason {
    ToiletPria = "Toilet Pria",
    ToiletWanita = "Toilet Wanita",
    Bab = "BAB",
    Rokok = "Rokok",
    BeliMakan = "Beli Makan"
}

export const limits: Limits = {
    "Toilet Pria": 5,
    "Toilet Wanita": 10,
    "BAB": 20,
    "Rokok": 5,
    "Beli Makan": 30
};

const reasons = Object.keys(limits) as Array<Reason>;
const slugs = reasons.map(reason => reason.toLowerCase().replaceAll(/\s/g, '_'));

export const routes = reasons.map((reason, i) => ({ 
    command: '/out_' + slugs[i], 
    type: reason
}));

export const commands: Array<Command> = [
    { command: "in", description: "Done check in" },
    ...reasons.map((reason, i): Command => ({ 
        command: 'out_' + slugs[i], 
        description: limits[reason] + " menit" 
    }))
];
