Meetup Photo Album Download Chrome Extension
=====

This is a Chrome extension that adds a button to Meetup.com photo
album pages that allows you to batch download all the photos in the
album.

Clicking the "Download" button will download high resolution versions
of all the photos in the album. The photos are placed in the Chrome
downloads directory, in a subdirectory named meetup_album_[photo_album_id].

Installing the Unpacked Extension
-----

- Open "chrome://extensions" in the Chrome browser.
- Enable developer mode, at the upper right corner.
- Click "Load unpacked extension..." near the top of the page.
- Select the directory the source files are in.

Setting up Your Own OAuth Consumer on Meetup
-----

Setting up your own oauth consumer is necessary if the consumer
the extension was coded to work with is deleted.

- Log into meetup.com.
- Go to "https://secure.meetup.com/meetup_api/oauth_consumers/".
- Click on "Create New Consumer".
- Fill out the required fields, setting the "Redirect URI" to "https://example.com".
- Click "Register Consumer".
- Find the key for the new consumer. Edit OAUTH.consumerKey in constants.js to contain the new key.
- Log out of meetup.com.
- Open "chrome://extensions".
- Reload the extension.
