import { JSDOM } from 'jsdom';
import jquery from 'jquery';
import sinon from 'sinon';

const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
    referrer: 'https://example.com/baz',
    url: 'https://example.com/foo'
});
const $ = jquery(window);

export default function mochaTestSetup() {
    global.$ = global.jQuery = $;

    global.document = window.document;
    global.window = window;

    global.window.ww = {
        detect: {
            isDesktop() {
                return false;
            },
            isMobile() {
                return false;
            },
            isTablet() {
                return false;
            },
            isiOS() {
                return false;
            },
        },
    };

    sinon.stub(window.ww.detect, 'isDesktop').returns(false);
    sinon.stub(window.ww.detect, 'isMobile').returns(false);
    sinon.stub(window.ww.detect, 'isTablet').returns(false);
    sinon.stub(window.ww.detect, 'isiOS').returns(false);
}

mochaTestSetup();
