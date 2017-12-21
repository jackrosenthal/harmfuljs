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

unsafeWindow.getSelection = undefined;
unsafeWindow.document.getSelection = undefined;
unsafeWindow.document.createRange = undefined;
unsafeWindow.document.body.createTextRange = undefined;
unsafeWindow.HTMLInputElement.prototype.select = undefined;
unsafeWindow.HTMLInputElement.prototype.setSelectionRange = undefined;
unsafeWindow.HTMLInputElement.prototype.setRangeText = undefined;
unsafeWindow.HTMLTextAreaElement.prototype.select = undefined;
unsafeWindow.HTMLTextAreaElement.prototype.setSelectionRange = undefined;
unsafeWindow.HTMLTextAreaElement.prototype.setRangeText = undefined;
unsafeWindow.Range.prototype.setStart = undefined;
unsafeWindow.Range.prototype.setStartBefore = undefined;
unsafeWindow.Range.prototype.setStartAfter = undefined;
unsafeWindow.Range.prototype.setEnd = undefined;
unsafeWindow.Range.prototype.setEndBefore = undefined;
unsafeWindow.Range.prototype.setEndAfter = undefined;
unsafeWindow.Range.prototype.select = undefined;
unsafeWindow.Range.prototype.selectNode = undefined;
unsafeWindow.Range.prototype.selectNodeContents = undefined;
unsafeWindow.Selection.prototype.removeAllRanges = undefined;
unsafeWindow.Selection.prototype.addRange = undefined;
unsafeWindow.Selection.prototype.removeRange = undefined;
unsafeWindow.Selection.prototype.empty = undefined;
unsafeWindow.Selection.prototype.collapse = undefined;
unsafeWindow.Selection.prototype.setPosition = undefined;
unsafeWindow.Selection.prototype.collapseToStart = undefined;
unsafeWindow.Selection.prototype.collapseToEnd = undefined;
unsafeWindow.Selection.prototype.extend = undefined;
unsafeWindow.Selection.prototype.setBaseAndExtent = undefined;
unsafeWindow.Selection.prototype.containsNode = undefined;
unsafeWindow.Selection.prototype.selectAllChildren = undefined;
unsafeWindow.Selection.prototype.modify = undefined;

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
