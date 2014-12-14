// Meetup Photo Album Download Chrome Extension
// Copyright (c) 2014 https://github.com/workingtheories
// All rights reserved.
// Use of this source code is governed by a GNU GPL
// license that can be found in the LICENSE file.

window.onload = function() {
    // we got redirected here through meetup oauth authorization

    var curHash = location.hash;
    var curSearch = location.search;

    // extract parameters from url
    var params = {}
    var tmp = curHash.substr(1, curHash.length - 1).split('&');
    for (var i = 0, len = tmp.length; i < len; i++) {
        var pair = tmp[i].split('=');
        params[pair[0]] = pair[1];

        // if we got an error authenticating, display it on the page
        if (pair[0] == "error") {
            document.body.innerHTML = "Error authorizing download. Reason: " + pair[1];
            return;
        }
    }

    tmp = curSearch.substr(1, curSearch.length - 1).split('&');
    for (var i = 0, len = tmp.length; i < len; i++) {
        var pair = tmp[i].split('=');
        params[pair[0]] = pair[1];
    }

    // save access token for future use
    {
        var storage = {};
        storage[MEETUP_ACCESS_TOKEN_NAME] = params['access_token'];
        chrome.storage.local.set(storage);
    }

    // ask event page to do download
    chrome.runtime.sendMessage({action: "download", albumId: params['album_id']},
                               function(response) {});

    // close our page
    chrome.tabs.getCurrent(function (tab) {
            if (tab === undefined) { return; }
            chrome.tabs.remove(tab.id);
        });
}
