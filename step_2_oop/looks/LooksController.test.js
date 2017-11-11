import { expect, assert } from 'chai';
import sinon from 'sinon';

import '../../mochaTestSetup';

import LooksController from './LooksController';

/**
 * @return {LooksController}
 */
function getLooksControllerMock() {
    const looksController = new LooksController();

    sinon.stub(looksController, 'isSmoothScrollingEnabled').callsFake(() => true);
    sinon.stub(looksController, 'isLooksListingPage').callsFake(() => true);
    sinon.stub(looksController, 'isLookDetailPage').callsFake(() => true);

    sinon.stub(looksController, 'initLazyloading').callsFake(() => {});
    sinon.stub(looksController, 'initSmoothScrolling').callsFake(() => {});
    sinon.stub(looksController, 'initSeo').callsFake(() => {});
    sinon.stub(looksController, 'initLooksListingPage').callsFake(() => {});
    sinon.stub(looksController, 'initLookDetailPage').callsFake(() => {});
    sinon.stub(looksController, 'initOverlays').callsFake(() => {});

    sinon.spy(looksController, 'initOnDocumentReady');

    return looksController;
}

describe('Looks initialization', function () {
    it('Initializes LLP and not LDP when on LLP', function (done) {
        const looksController = getLooksControllerMock();

        looksController.isLooksListingPage.returns(true);
        looksController.isLookDetailPage.returns(false);

        looksController.run();

        assert(looksController.initSeo.calledOnce, 'LooksController.initSeo() should be called once!');
        assert(looksController.initLooksListingPage.calledOnce, 'LooksController.initLooksListingPage() should be called once!');
        assert(looksController.initLookDetailPage.notCalled, 'LooksController.initLookDetailPage() should not be called!');

        done();
    });

    it('Initializes LDP and not LLP when on LDP', function (done) {
        const looksController = getLooksControllerMock();

        looksController.isLooksListingPage.returns(false);
        looksController.isLookDetailPage.returns(true);

        looksController.run();

        assert(looksController.initSeo.calledOnce, 'LooksController.initSeo() should be called once!');
        assert(looksController.initLookDetailPage.calledOnce, 'LooksController.initLookDetailPage() should be called once!');
        assert(looksController.initLooksListingPage.notCalled, 'LooksController.initLooksListingPage() should not be called!');

        done();
    });

    it('Doesn\'t initialize things for document.ready when run() called', function (done) {
        const looksController = getLooksControllerMock();

        looksController.initOnDocumentReady.restore();
        sinon.stub(looksController, 'initOnDocumentReady').callsFake(() => {});

        looksController.run();

        assert(looksController.initSmoothScrolling.notCalled, 'LooksController.initSmoothScrolling() should not be called!');
        assert(looksController.initLazyloading.notCalled, 'LooksController.initLazyloading() should not be called!');

        done();
    });

    it('Initializes smooth scrolling if it\'s enabled', function (done) {
        const looksController = getLooksControllerMock();

        looksController.isSmoothScrollingEnabled.returns(true);

        looksController.initOnDocumentReady();

        assert(looksController.initLazyloading.calledOnce, 'LooksController.initLazyloading() should be called once!');
        assert(looksController.initSmoothScrolling.calledOnce, 'LooksController.initSmoothScrolling() should be called once!');

        done();
    });

    it('Doesn\'t initialize smooth scrolling if it\'s not enabled', function (done) {
        const looksController = getLooksControllerMock();

        looksController.isSmoothScrollingEnabled.returns(false);

        looksController.initOnDocumentReady();

        assert(looksController.initLazyloading.calledOnce, 'LooksController.initLazyloading() should be called once!');
        assert(looksController.initSmoothScrolling.notCalled, 'LooksController.initSmoothScrolling() should not be called!');

        done();
    });
});