/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loop through allFeeds and ensure each feed has url defined and that url is not empty
         it('have a url defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe('');
           });
         });

        // Loop through allFeeds and ensure each feed has a name defined and that name is not empty
         it('have a name defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });
    });


    /* Test suite to test menu functionality */
    describe('The menu', function() {
        const body = document.querySelector('body');

      // Test to ensure menu is hidden by default
        it('should be hidden by default', function() {
          expect(body.className).toBe('menu-hidden');
          //expect body.property-to-get-class.toBe('menu-hidden');

        });

        //Test to check that menu appears when clicked and hides when clicked again
        it('should display when clicked and hide when clicked again', function() {
          const menuIcon = document.querySelector('.menu-icon-link');

          //On first click, expect body to not have class of menu-hidden
          menuIcon.click();
          expect(body.className).not.toBe('menu-hidden');
          // On next click, expect body to have a class of menu-hidden
          menuIcon.click();
          expect(body.className).toBe('menu-hidden');

        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called andd completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
