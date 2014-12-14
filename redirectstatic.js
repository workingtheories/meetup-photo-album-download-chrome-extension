// Meetup Photo Album Download Chrome Extension
// Copyright (c) 2014 https://github.com/workingtheories
// All rights reserved.
// Use of this source code is governed by a GNU GPL
// license that can be found in the LICENSE file.

// This is a content script that redirects URLs that match BASE_URL to
// the part of the URL after '?'.
//
// This content script is needed because Meetup.com requires the
// OAuth consumer to have a static base URL set for it that matches
// the URL to redirect to after authorization. The static base URL
// must contain both the host and protocol, so we should not use the 
// chrome extension URL because the id (host) for the extension can 
// change between installations and users.

BASE_URL = "https://example.com/meetup-photo-album-download/";

function RedirectToChromeExtension() {
    if (window.location.href.substr(0, BASE_URL.length) == BASE_URL) {
        var newUrl;
        var index = window.location.href.indexOf('?');
        if (index == -1) {
            newUrl = window.location.href;
        } else {
            newUrl = window.location.href.substr(index + 1, window.location.href.length - index - 1);
        }
        window.location.href = newUrl;
    }
}

RedirectToChromeExtension();
