const colors = ["27b69d", "23a68f", "1aa48c", "17846f", "0f8b7d", "0e7e72", "0a876e", "097b64", "0a584d", "095046", "ffffff", "000000", "7e888e", "737c81", "383d40", "33373a", "272727", "018391", "017784", "db1e39", "c71b34", "fffee8", "ffb661", "fafafa", "e8e8e8", "d8d8d8", "e7f5f3", "5d6468", "4c5256", "31343b", "2f3335"];
const emojis = {
    "e41323": "❤️",
    "dd2e44": "🍅",
    "ee6512": "🧡",
    "f4900c": "🍊",
    "ffcc4d": "🐥",
    "fbcb3c": "😀",
    "f5df04": "💛",
    "77b255": "🍏",
    "16c60c": "💚",
    "0d810c": "🍀",
    "55acee": "🌊",
    "0078d7": "💙",
    "1213bd": "🧿",
    "9266cc": "🍇",
    "886ce4": "👾",
    "8a6de0": "💜",
    "ec92b8": "🌸",
    "f4abba": "🐷",
    "dc5a4c": "👅",
    "bf6952": "💩",
    "ccd6dd": "💀",
    "66757f": "🦇",
    "747474": "🌑",
    "31373d": "📷",
    "080809": "🖤",
}
const array: number[] = []

export function getEmojiFromColor(baseColor: string) {
    if(!baseColor) return 
    Object.keys(emojis).forEach(color => {
        const n = getDiffColor(color, baseColor)
        array.push(n)
    })
    const min = array.indexOf(Math.min(...array))
    console.log(`BaseColor: ${baseColor} - Min: ${Math.min(...array)} - Index: ${min}`)
    return Object.values(emojis)[min]
}

function getDiffColor(cola: string, colb: string) {
    const a = hexToRgb(cola);
    const b = hexToRgb(colb);
    return Math.sqrt(Math.pow((a.r - b.r),2) + Math.pow((a.g - b.g),2) + Math.pow((a.b - b.b),2));
}

function hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}