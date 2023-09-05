/* (function init(screenRatioByDesign = 16 / 9) {
    let docEle = document.documentElement
    function setHtmlFontSize() {
        var screenRatio = docEle.clientWidth / docEle.clientHeight;
        var fontSize = (
            screenRatio > screenRatioByDesign
                ? (screenRatioByDesign / screenRatio)
                : 1
        ) * docEle.clientWidth / 10;
        docEle.style.fontSize = fontSize.toFixed(3) + "px";
        console.log(docEle.style.fontSize);
    }
    setHtmlFontSize()
    window.addEventListener('resize', setHtmlFontSize)
})()
 */
//改变font-size
(function (doc, win) {
    var docEI = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientataionchange' : 'resize',
        recalc = function () {
            var clientWidth = docEI.clientWidth;
            if (!clientWidth) return;
            //100是字体大小，1536是开发时浏览器窗口的宽度，等比计算
            docEI.style.fontSize = 100 * (clientWidth / 1536) + 'px';
        }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    console.log("hfjkshdkjfhkjdshkjfhsdhfjkh!!!");
})(document, window);
