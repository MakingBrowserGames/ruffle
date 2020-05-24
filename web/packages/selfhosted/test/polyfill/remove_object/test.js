const { inject_ruffle_and_wait, open_test } = require("../utils");
const { expect, use } = require("chai");
const chaiHtml = require("chai-html");
const fs = require("fs");

use(chaiHtml);

describe("Remove object", () => {
    it("loads the test", () => {
        open_test(browser, __dirname);
    });

    it("polyfills with ruffle", () => {
        inject_ruffle_and_wait(browser);
        const actual = browser.$("#test-container").getHTML(false);
        const expected = fs.readFileSync(`${__dirname}/expected.html`, "utf8");
        expect(actual).html.to.equal(expected);
    });

    it("deletes ruffle player by id", () => {
        browser.execute(() => {
            const obj = document.getElementById("foo");
            obj.remove();
        });
        const actual = browser.$("#test-container").getHTML(false);
        const expected = "";
        expect(actual).html.to.equal(expected);
    });
});