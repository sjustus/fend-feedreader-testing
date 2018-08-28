/* app.js
 *
 * RSS feed reader application --
 * Uses the Google Feed Reader API to grab RSS feeds as JSON object
 * Also uses the Handlebars templating library and jQuery
 */

// Each feed is an object with a name and URL and is stored in the allFeeds array
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

/* Function to start application. After The Google Feed
 * Reader API is loaded asynchonously, it will then call this
 * function.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* Function to perform all that is necessary to load a feed using Google Feed Reader API.
    * Then performs all of the DOM operations required to display feed entries on page.
    * Feeds are referenced by their index position within the allFeeds array.
    * Function also supports a callback as the second parameter which is called after
    * everything has run successfully.
 */
 function loadFeed(id, cb) {
     var feedUrl = allFeeds[id].url,
         feedName = allFeeds[id].name;

      //Entry template made using Handlebars
     $.ajax({
       type: "POST",
       url: 'https://rsstojson.udacity.com/parseFeed',
       data: JSON.stringify({url: feedUrl}),
       contentType:"application/json",
       success: function (result, status){

                 var container = $('.feed'),
                     title = $('.header-title'),
                     entries = result.feed.entries,
                     entriesLen = entries.length,
                     entryTemplate = Handlebars.compile($('.tpl-entry').html());

                 title.html(feedName);   // Set the header text
                 container.empty();      // Empty out all previous entries

                 /* Loop through the entries we just loaded via the Google
                  * Feed Reader API. We'll then parse that entry against the
                  * entryTemplate (created above using Handlebars) and append
                  * the resulting HTML to the list of entries on the page.
                  */
                 entries.forEach(function(entry) {
                     container.append(entryTemplate(entry));
                 });

                // If there is a callback function as second param, call it
                 if (cb) {
                     cb();
                 }
               },
       error: function (result, status, err){
                 //run only the callback without attempting to parse result due to error
                 if (cb) {
                     cb();
                 }
               },
       dataType: "json"
     });
 }

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init); // Call init once loaded

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {
    // Create feedItemTemplate using Handlebars
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all feeds
      * Assign each an id property based on index w/in array
      * Then parse that feed against the feedItemTemplate
      * Append it to the list of all available feeds w/in the menu
     */
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });


    /* When the menu icon is clicked on, toggle 'menu-hidden' class on body
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());
