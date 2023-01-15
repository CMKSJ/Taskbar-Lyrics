"use strict";


plugin.onLoad(async () => {
    const TaskbarLyricsApiPort = BETTERNCM_API_PORT + 1;
    const mLyric = await betterncm.utils.waitForElement("#x-g-mn .m-lyric");

    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            let basic = null;
            let extra = null;

            if (mutation.addedNodes[2]) {
                basic = mutation.addedNodes[0].firstChild.textContent;
                if (mutation.addedNodes[2].firstChild) {
                    extra = mutation.addedNodes[2].firstChild.textContent;
                }
            } else {
                basic = mutation.addedNodes[0].textContent;
            }

            let params = `basic=${basic}`;
            if (extra) params = params.concat(`&extra=${extra}`);
            params = new URLSearchParams(params);
            fetch(`http://127.0.0.1:${TaskbarLyricsApiPort}/taskbar/lyrics?${params}`);
        }
    }).observe(mLyric, { childList: true, subtree: true });

    const exePath = `"${loadedPlugins["Taskbar-Lyrics"].pluginPath}\\taskbar-lyrics.exe"`;
    await betterncm.app.exec(`${exePath} ${TaskbarLyricsApiPort}`, false, true);
});