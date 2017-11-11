import { expect, assert } from 'chai';
import sinon from 'sinon';

import '../../../mochaTestSetup';

import Seo from './Seo';

/**
 * @return {Seo}
 */
function getSeoBlockMock() {
    const seoBlock = new Seo();

    sinon.stub(seoBlock, 'isEnabled').callsFake(() => true);

    sinon.stub(seoBlock, 'initSeoBox').callsFake(() => {});
    sinon.stub(seoBlock, 'initSeoText').callsFake(() => {});

    sinon.spy(seoBlock, 'bindDocumentReady');

    return seoBlock;
}

describe('SEO block initialization', function () {
    it('Doesn\'t initialize things for document.ready when init() called', function (done) {
        const seoBlock = getSeoBlockMock();

        seoBlock.bindDocumentReady.restore();
        sinon.stub(seoBlock, 'bindDocumentReady').callsFake(() => {});

        seoBlock.init();

        // document.ready
        assert(seoBlock.initSeoBox.notCalled, 'Seo.initSeoBox() should not be called!');
        assert(seoBlock.initSeoText.notCalled, 'Seo.initSeoText() should not be called!');

        done();
    });

    it('Initializes things on document.ready', function (done) {
        const seoBlock = getSeoBlockMock();

        seoBlock.bindDocumentReady();

        // document.ready
        assert(seoBlock.initSeoBox.calledOnce, 'Seo.initSeoBox() should be called once!');
        assert(seoBlock.initSeoText.calledOnce, 'Seo.initSeoText() should be called once!');

        done();
    });

    it('Initializes things when enabled', function (done) {
        window.ww.detect.isMobile.returns(true);

        const seoBlock = getSeoBlockMock();

        assert(seoBlock.$seoBox !== undefined, 'Seo.$seoBox should not be undefined!');

        seoBlock.isEnabled.restore();

        seoBlock.init();

        assert(seoBlock.bindDocumentReady.calledOnce, 'Seo.bindDocumentReady() should be called once!');

        done();
    });

    it('Doesn\'t initialize anything when not enabled', function (done) {
        window.ww.detect.isMobile.returns(false);

        const seoBlock = getSeoBlockMock();

        assert(seoBlock.$seoBox === undefined, 'Seo.$seoBox should be undefined!');

        seoBlock.isEnabled.restore();

        seoBlock.init();

        assert(seoBlock.bindDocumentReady.notCalled, 'Seo.bindDocumentReady() should not be called!');

        done();
    });
});