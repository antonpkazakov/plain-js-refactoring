import { expect, assert } from 'chai';
import sinon from 'sinon';

import '../../../mochaTestSetup';

import LdpProducts from './LdpProducts';
import mochaTestSetup from '../../../mochaTestSetup';

/**
 * @return {LdpProducts}
 */
function getLdpProductsBlockMock() {
    const ldpProductsBlock = new LdpProducts();

    sinon.stub(ldpProductsBlock, 'isCatalogPage').callsFake(() => true);
    sinon.stub(ldpProductsBlock, 'isSharingEnabled').callsFake(() => true);
    sinon.stub(ldpProductsBlock, 'isGiftIconsTouchEventsHandlingNeeded').callsFake(() => true);

    sinon.stub(ldpProductsBlock, 'initProductSimplesSelectOnHotspots').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'initAddToCartOnHotspots').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'initTracking').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'initSharing').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'initGiftIconsTouchEvents').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'initGiftItemAlternatives').callsFake(() => {});
    sinon.stub(ldpProductsBlock, 'removeProductImagesLoaders').callsFake(() => {});

    sinon.spy(ldpProductsBlock, 'initGiftIcons');
    sinon.spy(ldpProductsBlock, 'initOnDocumentReady');
    sinon.spy(ldpProductsBlock, 'initOnWindowLoad');

    return ldpProductsBlock;
}

describe('LDP Products block initialization', function () {
    beforeEach(function () {
        mochaTestSetup();
    });

    it('Doesn\'t initialize things for document.ready and window.load when init() called', function (done) {
        const ldpProductsBlock = getLdpProductsBlockMock();

        ldpProductsBlock.initOnDocumentReady.restore();
        ldpProductsBlock.initOnWindowLoad.restore();
        sinon.stub(ldpProductsBlock, 'initOnDocumentReady').callsFake(() => {});
        sinon.stub(ldpProductsBlock, 'initOnWindowLoad').callsFake(() => {});

        ldpProductsBlock.init();

        assert(ldpProductsBlock.initProductSimplesSelectOnHotspots.calledOnce, 'LdpProducts.initProductSimplesSelectOnHotspots() should be called once!');

        // document.ready
        assert(ldpProductsBlock.initAddToCartOnHotspots.notCalled, 'LdpProducts.initAddToCartOnHotspots() should not be called!');
        assert(ldpProductsBlock.initTracking.notCalled, 'LdpProducts.initTracking() should not be called!');
        assert(ldpProductsBlock.initSharing.notCalled, 'LdpProducts.initSharing() should not be called!');
        assert(ldpProductsBlock.initGiftIcons.notCalled, 'LdpProducts.initGiftIcons() should not be called!');

        // window.load
        assert(ldpProductsBlock.removeProductImagesLoaders.notCalled, 'LdpProducts.removeProductImagesLoaders() should not be called!');

        done();
    });

    it('Initializes sharing if it\'s enabled', function (done) {
        const ldpProductsBlock = getLdpProductsBlockMock();

        ldpProductsBlock.isSharingEnabled.restore();
        window.ww.detect.isMobile.returns(true);

        ldpProductsBlock.isCatalogPage.returns(true);

        ldpProductsBlock.initOnDocumentReady();

        assert(ldpProductsBlock.initAddToCartOnHotspots.calledOnce, 'LdpProducts.initAddToCartOnHotspots() should be called once!');
        assert(ldpProductsBlock.initTracking.calledOnce, 'LdpProducts.initTracking() should be called once!');
        assert(ldpProductsBlock.initSharing.calledOnce, 'LdpProducts.initSharing() should be called once!');
        assert(ldpProductsBlock.initGiftIcons.calledOnce, 'LdpProducts.initGiftIcons() should be called once!');

        done();
    });

    it('Doesn\'t initialize sharing if it\'s not enabled', function (done) {
        const ldpProductsBlock = getLdpProductsBlockMock();

        ldpProductsBlock.isSharingEnabled.restore();
        window.ww.detect.isMobile.returns(false);

        ldpProductsBlock.isCatalogPage.returns(true);


        ldpProductsBlock.initOnDocumentReady();

        assert(ldpProductsBlock.initAddToCartOnHotspots.calledOnce, 'LdpProducts.initAddToCartOnHotspots() should be called once!');
        assert(ldpProductsBlock.initTracking.calledOnce, 'LdpProducts.initTracking() should be called once!');
        assert(ldpProductsBlock.initSharing.notCalled, 'LdpProducts.initSharing() should not be called!');
        assert(ldpProductsBlock.initGiftIcons.calledOnce, 'LdpProducts.initGiftIcons() should be called once!');

        // Resetting the global dependencies state.
        mochaTestSetup();

        const ldpProductsBlock2 = getLdpProductsBlockMock();

        ldpProductsBlock2.isSharingEnabled.restore();
        window.ww.detect.isMobile.returns(true);

        ldpProductsBlock2.isCatalogPage.returns(false);

        ldpProductsBlock2.initOnDocumentReady();

        assert(ldpProductsBlock2.initAddToCartOnHotspots.calledOnce, 'LdpProducts.initAddToCartOnHotspots() should be called once!');
        assert(ldpProductsBlock2.initTracking.calledOnce, 'LdpProducts.initTracking() should be called once!');
        assert(ldpProductsBlock2.initSharing.notCalled, 'LdpProducts.initSharing() should not be called!');
        assert(ldpProductsBlock2.initGiftIcons.calledOnce, 'LdpProducts.initGiftIcons() should be called once!');

        done();
    });

    it('Initializes gift icons sharing touch events if it\'s enabled', function (done) {
        const ldpProductsBlock = getLdpProductsBlockMock();

        ldpProductsBlock.isGiftIconsTouchEventsHandlingNeeded.restore();
        window.ww.detect.isiOS.returns(true);

        ldpProductsBlock.initGiftIcons();

        assert(ldpProductsBlock.initGiftIconsTouchEvents.calledOnce, 'LdpProducts.initGiftIconsTouchEvents() should be called once!');
        assert(ldpProductsBlock.initGiftItemAlternatives.calledOnce, 'LdpProducts.initGiftItemAlternatives() should be called once!');

        done();
    });

    it('Doesn\'t initialize gift icons sharing touch events if it\'s not enabled', function (done) {
        const ldpProductsBlock = getLdpProductsBlockMock();

        ldpProductsBlock.isGiftIconsTouchEventsHandlingNeeded.restore();
        window.ww.detect.isiOS.returns(false);

        ldpProductsBlock.initGiftIcons();

        assert(ldpProductsBlock.initGiftIconsTouchEvents.notCalled, 'LdpProducts.initGiftIconsTouchEvents() should not be called!');
        assert(ldpProductsBlock.initGiftItemAlternatives.calledOnce, 'LdpProducts.initGiftItemAlternatives() should be called once!');

        done();
    });
});