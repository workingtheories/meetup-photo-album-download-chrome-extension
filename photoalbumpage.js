// Meetup Photo Album Download Chrome Extension
// Copyright (c) 2014 https://github.com/workingtheories
// All rights reserved.
// Use of this source code is governed by a GNU GPL
// license that can be found in the LICENSE file.

// This is a content script that adds a download button to Meetup.com photo album pages.

var downloadMessager = {
    albumId: 0,

    // send download message to event page
    sendDownloadPhotoAlbumMessage: function() {
        chrome.runtime.sendMessage({action: "download", albumId: downloadMessager.albumId},
                                   function(response) {});
    }
};

function AddDownloadButton() {
    // get album id from the url
    var components = document.URL.split('/');
    downloadMessager.albumId = components[components.length - 2];

    // add download button to action bar above the photo display area
    var actionBar = document.getElementById("D_photoGallery_actions");
    var btn = document.createElement("BUTTON");
    btn.appendChild(document.createTextNode("Download"));
    btn.addEventListener("click", function() { downloadMessager.sendDownloadPhotoAlbumMessage(); });
    actionBar.appendChild(btn);
}

AddDownloadButton();
