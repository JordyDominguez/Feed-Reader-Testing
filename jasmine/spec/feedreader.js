/* All of the tests are within the $() function,
 * since some of these tests may require DOM elements. This is
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite is for the RSS Feed. This suite features
    * tests on the feed definitions and the allFeeds variable.
    */
    describe('RSS Feeds', function() {
        /* This test is to make sure that the allFeeds variable
         * is defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test is to make sure that each feed in the allFeeds
         *  object is looped through and ensures it has a URL defined
         */
         it('has defined URLs', function() {
            for (let i of allFeeds){
                expect(i.url).toBeDefined();
                expect(i.url.length).not.toBeLessThan(0);
            }
         });


        /* This test is to make sure that each feed in the allFeeds
         *  object is looped through and ensures it has a Name defined.
         */
         it('has defined names', function() {
            for (let i of allFeeds){
                expect(i.name).toBeDefined();
                expect(i.name.length).not.toBeLessThan(0);
            }
         });
    });


    /* This test suite is for the Menu. This suite features
    * tests on the menu is hidden and when toggeled it displays and
    * hides when toggled again.
    */
    describe('The menu', function() {


        /* This test is to make sure that the menu is hidden
         * default.
         */
         it('is hidden by default', function() {
            const body = document.querySelector('body');

            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* This test is to make sure that the menu changes visibility
         *  when the icon is clicked.
         */
          it('changes visibility when clicked', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(true);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

          });
    });


    /* This test suite is for Initial Enteries. This suite features
    * tests to make sure that when loaded there is at least one entry
    * in the feed.
    */
    describe('Initial Enteries', function() {



        /* This test is asynchronous and makes sure that there is at
         * least one entry in the .feed when it is loaded.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least 1 entry after loadFeed function is called', function() {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });


    /* This test suite is for the New Feed Selection. This suite features
    * tests to make sure that when a new feed is loaded it has different
    * enteries in the .feed than what it had orginally.
    */
    describe('New Feed Selection', function() {

        let originalFeed;

         /* This test is asynchronous and makes sure that when a new
         * feed is loaded by the loadFeed function that the content
         * actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                originalFeed = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        it("changes its loaded content", function() {
            let newFeed = document.querySelector('.feed').innerHTML;
            expect(originalFeed).not.toBe(newFeed);
        });

    });

}());
