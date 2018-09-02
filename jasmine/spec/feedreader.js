/* feedreader.js
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This test suite checks he RSS Feeds */
    describe('RSS Feeds', function() {

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
             expect(feed.name).not.toBe('', "", 0);
           });
         });
    });


    /* This test suite checks the menu */
    describe('The menu', function() {
        const body = document.querySelector('body');

      // Test to ensure menu is hidden by default
        it('should be hidden by default', function() {
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        //Test to check that menu appears when clicked and hides when clicked again
        it('should display when clicked and hide when clicked again', function() {
          const menuIcon = document.querySelector('.menu-icon-link');

          //On first click, expect body to not have class of menu-hidden
          menuIcon.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
          // On next click, expect body to have a class of menu-hidden
          menuIcon.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });



    /* This test suite checks that entires are loaded */
    describe('Initial Entries', function() {
       //once the loadFeed function is called and completes its work
       beforeEach(function(done) {
         loadFeed(0, done);
       });

       // the .feed container should have at least one .entry element
       it('should have at least one entry when loaded', function() {

        const entries = document.querySelectorAll('.feed .entry');
        expect(entries.length).not.toBe(0);
       });
    });


    /* This test checks New Feed Selection */
    describe('New Feed Selection',function() {
       let feedAfterFirstLoad;
       let feedAfterSecondLoad;

       //once the loadFeed function is called and completes its work
       beforeEach(function(done) {
         loadFeed(0, function() {
           feedAfterFirstLoad = document.querySelector('.feed').innerHTML;

           loadFeed(1, function() {
             feedAfterSecondLoad = document.querySelector('.feed').innerHTML;
             done();
           });
         });

       });

       //make sure when a new feed is loaded that the content actually changes
       it('should change content', function() {
         expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
       });
    });
}());
