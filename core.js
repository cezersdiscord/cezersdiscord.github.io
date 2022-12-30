function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    document.querySelector(".clock").innerText = time;
    document.querySelector(".clock").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

function english() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'us', function () { }); }
function spanish() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'es', function () { }); }
function polish() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'pl', function () { }); }
function chinese() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'zh', function () { }); }
function romanian() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'ro', function () { }); }
function french() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'fr', function () { }); }
function russian() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'ru', function () { }); }
function german() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'de', function () { }); }
function serbian() { var lib = new google.translate.TranslateService(); lib.translatePage('en', 'sr', function () { }); }

function howtouse() {
    document.getElementById("language").style.display = "none";
    document.getElementById("homescreen").style.display = "block";
}

function cats() {
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("cats").style.display = "block";
}

function nocats() {
    document.getElementById("homescreen").style.display = "block";
    document.getElementById("cats").style.display = "none";
}

window.onload = function () {
    initDragElement();
    initResizeElement();
};

function initDragElement() {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var popups = document.getElementsByClassName("popup");
    var elmnt = null;
    var currentZIndex = 9; //TODO reset z index when a threshold is passed

    for (var i = 0; i < popups.length; i++) {
        var popup = popups[i];
        var header = getHeader(popup);

        popup.onmousedown = function () {
            this.style.zIndex = "" + ++currentZIndex;
        };

        if (header) {
            header.parentPopup = popup;
            header.onmousedown = dragMouseDown;
        }
    }

    function dragMouseDown(e) {
        elmnt = this.parentPopup;
        elmnt.style.zIndex = "" + ++currentZIndex;

        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        if (!elmnt) {
            return;
        }

        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function getHeader(element) {
        var headerItems = element.getElementsByClassName("popup-header");

        if (headerItems.length === 1) {
            return headerItems[0];
        }

        return null;
    }
}

function initResizeElement() {
    var popups = document.getElementsByClassName("popup");
    var element = null;
    var startX, startY, startWidth, startHeight;

    for (var i = 0; i < popups.length; i++) {
        var p = popups[i];

        var right = document.createElement("div");
        right.className = "resizer-right";
        p.appendChild(right);
        right.addEventListener("mousedown", initDrag, false);
        right.parentPopup = p;

        var bottom = document.createElement("div");
        bottom.className = "resizer-bottom";
        p.appendChild(bottom);
        bottom.addEventListener("mousedown", initDrag, false);
        bottom.parentPopup = p;

        var both = document.createElement("div");
        both.className = "resizer-both";
        p.appendChild(both);
        both.addEventListener("mousedown", initDrag, false);
        both.parentPopup = p;
    }

    function initDrag(e) {
        element = this.parentPopup;

        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(
            document.defaultView.getComputedStyle(element).width,
            10
        );
        startHeight = parseInt(
            document.defaultView.getComputedStyle(element).height,
            10
        );
        document.documentElement.addEventListener("mousemove", doDrag, false);
        document.documentElement.addEventListener("mouseup", stopDrag, false);
    }

    function doDrag(e) {
        element.style.width = startWidth + e.clientX - startX + "px";
        element.style.height = startHeight + e.clientY - startY + "px";
    }

    function stopDrag() {
        document.documentElement.removeEventListener("mousemove", doDrag, false);
        document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
}