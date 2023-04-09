"use strict";


plugin.onLoad(async () => {
    const TaskbarLyricsPort = BETTERNCM_API_PORT + 2;

    const TaskbarLyricsFetch = (path, params) => fetch(
        `http://127.0.0.1:${TaskbarLyricsPort}/taskbar${path}`,
        {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const TaskbarLyricsAPI = {
        // 字体设置 - 字体
        font: params => TaskbarLyricsFetch("/font/font", params),

        // 字体设置 - 颜色
        color: params => TaskbarLyricsFetch("/font/color", params),

        // 字体设置 - 样式
        style: params => TaskbarLyricsFetch("/font/style", params),

        // 歌词设置 - 歌词
        lyrics: params => TaskbarLyricsFetch("/lyrics/lyrics", params),

        // 歌词设置 - 对齐
        align: params => TaskbarLyricsFetch("/lyrics/align", params),

        // 窗口设置 - 位置
        position: params => TaskbarLyricsFetch("/window/position", params),

        // 窗口设置 - 边距
        margin: params => TaskbarLyricsFetch("/window/margin", params),

        // 窗口设置 - 屏幕
        screen: params => TaskbarLyricsFetch("/window/screen", params),

        // 关闭
        close: params => TaskbarLyricsFetch("/close", params)
    };


    // 对应Windows的枚举
    const WindowsEnum = {
        WindowAlignment: {
            WindowAlignmentLeft: 0,
            WindowAlignmentCenter: 1,
            WindowAlignmentRight: 2
        },
        DWRITE_TEXT_ALIGNMENT: {
            DWRITE_TEXT_ALIGNMENT_LEADING: 0,
            DWRITE_TEXT_ALIGNMENT_TRAILING: 1,
            DWRITE_TEXT_ALIGNMENT_CENTER: 2,
            DWRITE_TEXT_ALIGNMENT_JUSTIFIED: 3
        },
        DWRITE_FONT_WEIGHT: {
            DWRITE_FONT_WEIGHT_THIN: 100,
            DWRITE_FONT_WEIGHT_EXTRA_LIGHT: 200,
            DWRITE_FONT_WEIGHT_ULTRA_LIGHT: 200,
            DWRITE_FONT_WEIGHT_LIGHT: 300,
            DWRITE_FONT_WEIGHT_SEMI_LIGHT: 350,
            DWRITE_FONT_WEIGHT_NORMAL: 400,
            DWRITE_FONT_WEIGHT_REGULAR: 400,
            DWRITE_FONT_WEIGHT_MEDIUM: 500,
            DWRITE_FONT_WEIGHT_DEMI_BOLD: 600,
            DWRITE_FONT_WEIGHT_SEMI_BOLD: 600,
            DWRITE_FONT_WEIGHT_BOLD: 700,
            DWRITE_FONT_WEIGHT_EXTRA_BOLD: 800,
            DWRITE_FONT_WEIGHT_ULTRA_BOLD: 800,
            DWRITE_FONT_WEIGHT_BLACK: 900,
            DWRITE_FONT_WEIGHT_HEAVY: 900,
            DWRITE_FONT_WEIGHT_EXTRA_BLACK: 950,
            DWRITE_FONT_WEIGHT_ULTRA_BLACK: 950
        },
        DWRITE_FONT_STYLE: {
            DWRITE_FONT_STYLE_NORMAL: 0,
            DWRITE_FONT_STYLE_OBLIQUE: 1,
            DWRITE_FONT_STYLE_ITALIC: 2
        }
    };


    // 默认的配置
    const defaultConfig = {
        "font": {
            "font_family": "Microsoft YaHei UI"
        },
        "color": {
            "basic": {
                "light": {
                    "hex_color": 0x000000,
                    "opacity": 1.0
                },
                "dark": {
                    "hex_color": 0xFFFFFF,
                    "opacity": 1.0
                }
            },
            "extra": {
                "light": {
                    "hex_color": 0x000000,
                    "opacity": 1.0
                },
                "dark": {
                    "hex_color": 0xFFFFFF,
                    "opacity": 1.0
                }
            }
        },
        "style": {
            "basic": {
                "weight": {
                    "value": WindowsEnum.DWRITE_FONT_WEIGHT.DWRITE_FONT_WEIGHT_NORMAL,
                    "textContent": "Normal (400)"
                },
                "slope": WindowsEnum.DWRITE_FONT_STYLE.DWRITE_FONT_STYLE_NORMAL,
                "underline": false,
                "strikethrough": false
            },
            "extra": {
                "weight": {
                    "value": WindowsEnum.DWRITE_FONT_WEIGHT.DWRITE_FONT_WEIGHT_NORMAL,
                    "textContent": "Normal (400)"
                },
                "slope": WindowsEnum.DWRITE_FONT_STYLE.DWRITE_FONT_STYLE_NORMAL,
                "underline": false,
                "strikethrough": false
            }
        },
        "lyrics": {
            "retrieval_method": {
                "value": 0,
                "textContent": "[新] 发送网络请求解析歌词",
            }
        },
        "effect": {
            "next_line_lyrics_position": {
                "value": 0,
                "textContent": "副歌词，下句歌词显示在这"
            },
            "extra_show": {
                "value": 2,
                "textContent": "当前翻译，没则用上个选项"
            },
            "adjust": 0.0
        },
        "align": {
            "basic": WindowsEnum.DWRITE_TEXT_ALIGNMENT.DWRITE_TEXT_ALIGNMENT_LEADING,
            "extra": WindowsEnum.DWRITE_TEXT_ALIGNMENT.DWRITE_TEXT_ALIGNMENT_LEADING
        },
        "position": {
            "position": WindowsEnum.WindowAlignment.WindowAlignmentLeft
        },
        "margin": {
            "left": 0,
            "right": 0
        },
        "screen": {
            "parent_taskbar": "Shell_TrayWnd"
        }
    };


    const pluginConfig = {
        get: name => Object.assign({}, defaultConfig[name], plugin.getConfig(name, defaultConfig[name])),
        set: (name, value) => plugin.setConfig(name, value)
    };


    this.base = {
        TaskbarLyricsPort,
        TaskbarLyricsAPI,
        WindowsEnum,
        defaultConfig,
        pluginConfig
    };
});
