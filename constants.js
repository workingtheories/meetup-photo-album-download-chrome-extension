// Meetup Photo Album Download Chrome Extension
// Copyright (c) 2014 https://github.com/workingtheories
// All rights reserved.
// Use of this source code is governed by a GNU GPL
// license that can be found in the LICENSE file.

OAUTH = {
    requestUrl: "https://api.meetup.com/2/photos",
    authorizeUrl: "https://secure.meetup.com/oauth2/authorize",

    // The user can replace consumerKey with the key for their own 
    // OAuth Consumer (see Meetup API OAuth documentation for 
    // documentation on how to register your own OAuth consumer).
    // While the OAuth consumer that this key belongs to is still 
    // registered at the time of code commit, there is no guarantee
    // that it will continue to be registered indefinitely.
    consumerKey: "gkm7h0t85pchqaf38dt4fp2vo0",

    // redirectorUrl must be consistent with the redirect URI defined
    // for your OAuth consumer on Meetup.com 
    // e.g. https://www.example.com/
    // This URL and the contents of files redirectstatic.js and 
    // manifest.json must be kept consistent.
    redirectorUrl: "https://example.com/meetup-photo-album-download/?",

    // URL relative to the extension to redirect to after oauth2 authorization
    redirectRelativeUrl: "redirect.html"
};

// name to store the access token under in local storage
MEETUP_ACCESS_TOKEN_NAME = "meetupPhotoAlbumDownloadAccessToken";
