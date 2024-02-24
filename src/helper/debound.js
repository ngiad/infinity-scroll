export const debound = (cb, deplaytime = 300) => {
    let timeout;
    return () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb()
        }, deplaytime);
    };
};