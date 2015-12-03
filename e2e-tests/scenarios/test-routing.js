
describe('Routing', function() {

    it('should automatically redirect to index when unknown hash', function() {
        browser.get('#test');
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    it('should redirect to index page if no param on result route', function() {
        browser.get('#result/');
        expect(browser.getLocationAbsUrl()).toMatch("/");
    });

    it('should redirect to index page if bad param on result route', function() {
        browser.get('#result/aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        expect(browser.getLocationAbsUrl()).toMatch("/error");
    });

    it('should redirect to index page if bad param on result route', function() {
        browser.get('/');
        element(by.id('location')).sendKeys('Paris');
        element(by.id('do-search')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/result/Paris");
    });
});