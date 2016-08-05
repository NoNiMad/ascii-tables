let editArea = $('#editArea');
let genArea = $('#genArea');

let timerId = null;

$('#editArea').on('keyup', function(e) {
    if(timerId !== null)
        clearTimeout(timerId);
    timerId = setTimeout(regen, 1000);
});

$('#settings input[name="fillWidth"]').on('change', function(e) {
    console.log($(this).prop('checked'));
    skin.fillWidth = $(this).prop('checked');
    if(timerId !== null)
        clearTimeout(timerId);
    timerId = setTimeout(regen, 1000);
});

String.prototype.replaceAt=function(index, char) {
    return this.substr(0, index) + char + this.substr(index + char.length);
}

function repeat(c, n) {
    let s = "";
    for(let i = 0; i < n; i++)
        s += c;
    return s;
}

let skin = {
    topChar: '_',
    bottomChar: '_',
    vertChar: '|',
    cornerChar: '|',
    needSecondLine: true,
    cornersOnTopLine: false,
    cornerWhenConnecting: false,
    fillWidth: true
}

let skin_classique = {
    topChar: '_',
    bottomChar: '_',
    vertChar: '|',
    cornerChar: '|',
    needSecondLine: true,
    cornersOnTopLine: false,
    cornerWhenConnecting: false,
    fillWidth: true
}

let skin_avec_tirets = {
    topChar: '-',
    bottomChar: '-',
    vertChar: '|',
    cornerChar: '+',
    needSecondLine: false,
    cornersOnTopLine: true,
    cornerWhenConnecting: true,
    fillWidth: true
}

function firstLine(len) {
    if(skin.cornersOnTopLine)
        return skin.cornerChar + repeat(skin.topChar, len + 2) + skin.cornerChar;
    return " " + repeat(skin.topChar, len + 2) + " ";
}

function emptyLine(len) {
    return skin.vertChar + repeat(' ', len + 2) + skin.vertChar;
}

function textLine(text, len) {
    return skin.vertChar + ' ' + text + repeat(' ', len - text.length + 1) + skin.vertChar;
}

function lastLine(len) {
    return skin.cornerChar + repeat(skin.bottomChar, len + 2) + skin.cornerChar;
}

function parseText(text) {
    if(text[text.length-1] !== "-")
        text.push("-");

    let rows = [];
    let currentRow = [];
    let currentCol = [];
    let maxRowLen = 0;
    let rowLen = 0;
    let colLen = 0;
    let maxColHeight = -1;
    let colHeight = 0;

    for(i in text) {
        switch(text[i]) {
            case "-":
                currentRow.push({ len: colLen, data: currentCol });
                rowLen += colLen;
                maxColHeight = Math.max(maxColHeight, colHeight);
                maxRowLen = Math.max(maxRowLen, rowLen + (currentRow.length - 1) * 3);
                rows.push({ len: rowLen + (currentRow.length - 1) * 3, height: maxColHeight, data: currentRow });
                currentRow = [];
                currentCol = [];
                rowLen = 0;
                colLen = 0;
                maxColHeight = 0;
                colHeight = 0;
                break;
            case "|":
                currentRow.push({ len: colLen, data: currentCol });
                currentCol = [];
                rowLen += colLen;
                maxColHeight = Math.max(maxColHeight, colHeight);
                colLen = 0;
                colHeight = 0;
                break;
            default:
                currentCol.push(text[i]);
                colHeight++;
                colLen = Math.max(colLen, text[i].length);
        }
    }

    return { len: maxRowLen, rows: rows };
}

function addColumnMarks(line, data) {
    let c = 0;
    for(let j = 0; j < data.length; j++) {
        c += data[j].len + 3;
        line = line.replaceAt(c, skin.cornerChar);
    }
    return line;
}

function generate(data) {
    let gen = [];

    for(let i in data.rows) {
        let row = data.rows[i];
        if(skin.fillWidth) {
            row.len = data.len;
            let c = 0;
            let j = 0;
            for(; j < row.data.length; j++) {
                c += row.data[j].len + 3;
            }
            row.data[j - 1].len += data.len - c + 3;
        }

        if(i == 0) {
            if(skin.needSecondLine)
                gen.push(firstLine(row.len));
            else
                gen.push(addColumnMarks(firstLine(row.len), row.data));
        } else {
            let prev = gen[gen.length - 1];
            if(row.len > data.rows[i-1].len)
                prev += repeat(skin.bottomChar, row.len - 1 - data.rows[i-1].len) + (skin.cornersOnTopLine ? skin.cornerChar : "");
            if(skin.cornerWhenConnecting && row.len < data.rows[i-1].len + 1)
                prev = prev.replaceAt(row.len + 4 - 1, skin.cornerChar);
            gen[gen.length - 1] = skin.cornersOnTopLine ? addColumnMarks(prev, row.data) : prev;
        }

        if(skin.needSecondLine)
            gen.push(addColumnMarks(emptyLine(row.len), row.data));

        for(let j = 0; j < row.height; j++) {
            let s = "";
            for(let k in row.data) {
                s += textLine(row.data[k].data[j] || "", row.data[k].len).substr(k > 0 ? 1 : 0);
            }
            gen.push(s);
        }

        gen.push(addColumnMarks(lastLine(row.len), row.data));
    }

    return gen;
}

function regen() {
    timerId = null;
    let text = editArea.val();
    text = text.split('\n');

    genArea.val(generate(parseText(text)).join('\n'));
}

regen();
