

export function lerp(a, b, t) {
    return a*(1-t) + b*t;
}


export function around(n, int) {
    return parseInt(n / int) * int;
}