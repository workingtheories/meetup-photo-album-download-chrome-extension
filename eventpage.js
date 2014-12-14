// Meetup Photo Album Download Chrome Extension
// Copyright (c) 2014 https://github.com/workingtheories
// All rights reserved.
// Use of this source code is governed by a GNU GPL
// license that can be found in the LICENSE file.

function MeetupOauth2Authorize(consumerKey, redirectUrl) {
// Does oauth2 authentication in a new tab, redirecting to 
// the given url after.

    // create tab for authorization page to load in
    var url = OAUTH.authorizeUrl + "?client_id=" + consumerKey + 
              "&response_type=token&redirect_uri=" + redirectUrl;
    chrome.tabs.create({url: url}, function(tab) {});
}

function DownloadPhotoAlbum(albumId, accessToken) {
    // Makes request to API to get information on all photos
    // in the given photo album.
    // e.g. https://api.meetup.com/2/photos?photo-host=public&photo_album_id=1234
    // Then uses the Chrome downloads API to download the high resolution 
    // version of each photo individually.

    // make request to api to get list of links to photos in the photo album
    var xhr = new XMLHttpRequest();
    var url = OAUTH.requestUrl + "?photo-host=public&photo_album_id=" + albumId;

    // download the individual photos when we get the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState == xhr.DONE) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);

                // fire off the downloads
                for (var i = 0, len = response['results'].length; i < len; i++) {
                    var highresLink = response['results'][i]['highres_link'];
                    chrome.downloads.download(
                        {url: highresLink,
                         filename: "meetup_album_" + albumId + "/" + highresLink.split("/").pop()
                        },
                        function() {});
                }
            } else if (xhr.status == 401) {
                // request failed with authorization failure, try authorizing then redirecting
                var redirectUrl = OAUTH.redirectorUrl + 
                    encodeURI(chrome.runtime.getURL(OAUTH.redirectRelativeUrl + "?album_id=" +  albumId));
                MeetupOauth2Authorize(OAUTH.consumerKey, redirectUrl);
            } else {
                alert("Download failed, error status " + xhr.status);
            }
        }
    }

    xhr.open('GET', url, false);
    xhr.setRequestHeader("Authorization", "bearer " + accessToken);
    xhr.send();
}

function HandleDownloadAlbumRequest(request, sender, sendResponse) {

    // check for access token
    chrome.storage.local.get(MEETUP_ACCESS_TOKEN_NAME,
        function (items) {
            var accessToken = items[MEETUP_ACCESS_TOKEN_NAME];
            if (chrome.runtime.lastError || accessToken === undefined) {
                // no access token, so authorize first then redirect
                var redirectUrl = OAUTH.redirectorUrl + 
                    encodeURI(chrome.runtime.getURL(OAUTH.redirectRelativeUrl + "?album_id=" +  request.albumId));
                MeetupOauth2Authorize(OAUTH.consumerKey, redirectUrl);
            } else {
                // we have an access token, use it to download the photos
                DownloadPhotoAlbum(request.albumId, accessToken);
            }
        });
}

window.onload = function() {
    // register message handler for messages
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action == "download") {
                HandleDownloadAlbumRequest(request, sender, sendResponse);
            }
        });
}
