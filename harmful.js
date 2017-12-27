// ==UserScript==
// wname                harmfuljs
// @namespace           harmfuljs
// @description         Disable harmful JavaScripts behaviors
// @include             *
// @grant               unsafeWindow
// @version             0
// @author              Jack Rosenthal
// ==/UserScript==

/* Selections are sacred, not scriptable
 * (only to be created, modified, or used by the user themselves) */

noselect = function () {
    /* Do nothing so that bad websites don't freak out */
    return;
}

unsafeWindow.HTMLInputElement.prototype.select = noselect;
unsafeWindow.HTMLInputElement.prototype.setSelectionRange = noselect;
unsafeWindow.HTMLInputElement.prototype.setRangeText = noselect;
unsafeWindow.HTMLTextAreaElement.prototype.select = noselect;
unsafeWindow.HTMLTextAreaElement.prototype.setSelectionRange = noselect;
unsafeWindow.HTMLTextAreaElement.prototype.setRangeText = noselect;
unsafeWindow.Range.prototype.select = noselect;
unsafeWindow.Range.prototype.selectNode = noselect;
unsafeWindow.Range.prototype.selectNodeContents = noselect;
unsafeWindow.Selection.prototype.removeAllRanges = noselect;
unsafeWindow.Selection.prototype.addRange = noselect;
unsafeWindow.Selection.prototype.removeRange = noselect;
unsafeWindow.Selection.prototype.empty = noselect;
unsafeWindow.Selection.prototype.collapse = noselect;
unsafeWindow.Selection.prototype.setPosition = noselect;
unsafeWindow.Selection.prototype.collapseToStart = noselect;
unsafeWindow.Selection.prototype.collapseToEnd = noselect;
unsafeWindow.Selection.prototype.extend = noselect;
unsafeWindow.Selection.prototype.setBaseAndExtent = noselect;
unsafeWindow.Selection.prototype.containsNode = noselect;
unsafeWindow.Selection.prototype.selectAllChildren = noselect;
unsafeWindow.Selection.prototype.modify = noselect;

/* The clipboard is sacred, and only for the user to modify */
origQCS = unsafeWindow.document.queryCommandSupported;
unsafeWindow.document.queryCommandSupported = function (command) {
    if (command == "copy") {
        return false;
    }
    return origQCS(command);
}

origExec = unsafeWindow.document.execCommand;
unsafeWindow.document.execCommand = function (command) {
    if (command == "copy") {
        throw "My clipboard is sacred, and only to be modified by me, the user.";
    }
    return origExec(command);
}

unsafeWindow.clipboardData = undefined;
