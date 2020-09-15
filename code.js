var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 600 });
// import * as Buffer from "Buffer";
// var bfr = require('buffer');
// import { Base64 } from 'js-base64';
// figma.ui.postMessage({ type: 'networkRequest' });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
let frame;
let bg;
let header;
let navtop;
let navleft;
let content;
let menuText;
let lineMenu;
let titleText;
// color cymk
function hex2rgb(hex) {
    return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6]) | 0];
}
//loping check 
function* walkTree(node) {
    yield node;
    let children = node.children;
    if (children) {
        for (let child of children) {
            yield* walkTree(child);
        }
    }
}
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    // (window as any).global = window;
    // // @ts-ignore
    // window.Buffer = window.Buffer || require('buffer').Buffer;
    if (msg.type === 'create-template') {
        console.log("ini nyoba base64");
        // console.log(msg.base64);
        // console.log(msg.base64);
        // try {
        console.log('ini jalan');
        // Base64 decode back to UInt8Array: 
        // function base64ToArray(base64) {
        //   var raw = Base64.atob(base64);
        //   var rawLength = raw.length;
        //   var array = new Uint8Array(new ArrayBuffer(rawLength));
        //   for (var i = 0; i < rawLength; i++) {
        //     array[i] = raw.charCodeAt(i);
        //   }
        //   return array;
        // };
        // var array = base64ToArray(msg.base64);
        // console.log(array);
        // End Base64
        console.log('aaa', msg.base64);
        // console.log()
        // var raw = window.atob(msg.base64);
        // console.log('ccc', array);
        var image = figma.createImage(msg.base64);
        var _paint = {
            type: "IMAGE",
            imageHash: image.hash,
            scaleMode: "FILL"
        };
        var rect = figma.createRectangle();
        rect.resize(1920, 1080);
        rect.fills = [
            _paint
        ];
        //   } catch (e) {
        //     console.log(e);
        //   }
        // query = query.toLowerCase();
        let walker = walkTree(figma.currentPage);
        let jmlFrame = 0;
        function processOnce() {
            let results = [];
            let count = 0;
            let done = true;
            let res;
            while (!(res = walker.next()).done) {
                let node = res.value;
                if (node.type === 'FRAME') {
                    // let characters = node.characters.toLowerCase();
                    // if (characters.includes(query)) {
                    //     results.push(node.id);
                    // }
                    jmlFrame = jmlFrame + 1;
                }
                if (++count === 1000) {
                    done = false;
                    const timer = setTimeout(processOnce, 20);
                    break;
                }
            }
            // figma.ui.postMessage({ query, results, done });
        }
        processOnce();
        const frame = figma.createFrame();
        const header = figma.createRectangle();
        const nav_top = figma.createRectangle();
        const nav_left = figma.createRectangle();
        const content = figma.createRectangle();
        // const image = figma.createImage(newBytes).has;
        frame.name = "Template UII Gateway";
        header.name = "header";
        let grey = hex2rgb('#eeeeee');
        let white = hex2rgb('#ffffff');
        let blue = hex2rgb('#093697');
        // let greyLine = hex2rgb('#ffffff');
        header.fills = [{ type: 'SOLID', color: { r: grey[0] / 255, g: grey[1] / 255, b: grey[2] / 255 } }];
        nav_top.fills = [{ type: 'SOLID', color: { r: white[0] / 255, g: white[1] / 255, b: white[2] / 255 } }];
        nav_left.fills = [{ type: 'SOLID', color: { r: white[0] / 255, g: white[1] / 255, b: white[2] / 255 } }];
        content.fills = [{ type: 'SOLID', color: { r: white[0] / 255, g: white[1] / 255, b: white[2] / 255 } }];
        frame.resize(1280, 850);
        header.resize(1280, 850);
        nav_top.resize(1280, 50);
        nav_left.resize(230, 680);
        content.resize(990, 200);
        frame.x = (jmlFrame * 1320);
        nav_top.y = 70;
        nav_left.y = 140;
        nav_left.x = 20;
        content.y = 140;
        content.x = 270;
        frame.appendChild(header);
        frame.appendChild(nav_top);
        frame.appendChild(nav_left);
        frame.appendChild(content);
        titleText = figma.createText();
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        // titleText.fontName = { family: "Roboto", style: "Bold" };
        titleText.characters = ("Selamat datang di " + msg.title);
        titleText.fills = [{ type: 'SOLID', color: { r: blue[0] / 255, g: blue[1] / 255, b: blue[2] / 255 } }];
        titleText.name = "aplikasi";
        titleText.x = 300;
        titleText.y = 160;
        titleText.fontSize = 36;
        titleText.textAlignHorizontal = "CENTER";
        frame.appendChild(titleText);
        // frame.appendChild(head);
        //create text
        //  head.resize(900, head.height);
        msg = JSON.parse(msg.api);
        var i;
        for (i = 0; i < 10; i++) {
            menuText = figma.createText();
            yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
            // head.fontName = { family: "Roboto", style: "Regular" };
            menuText.characters = msg[i];
            console.log("ini text : " + msg[i]);
            //create line
            if (msg[i] !== "") {
                const lineMenu = figma.createLine();
                lineMenu.strokes = [{ type: 'SOLID', color: { r: grey[0] / 255, g: grey[1] / 255, b: grey[2] / 255 } }];
                lineMenu.resize(230, 2);
                lineMenu.x = 20;
                lineMenu.y = 190 + (50 * i);
                frame.appendChild(lineMenu);
            }
            menuText.name = msg[i];
            menuText.x = 56;
            menuText.y = 156 + (50 * i);
            menuText.fontSize = 14;
            menuText.textAlignHorizontal = "CENTER";
            frame.appendChild(menuText);
        }
    }
    else if (msg.type === 'cancel') {
        figma.closePlugin();
    }
});
