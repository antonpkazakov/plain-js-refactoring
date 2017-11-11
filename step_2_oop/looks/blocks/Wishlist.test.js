import { expect, assert } from 'chai';
import sinon from 'sinon';

import '../../../mochaTestSetup';

import Wishlist from './Wishlist';

/**
 * @return {Wishlist}
 */
function getWishlistBlockMock() {
    const wishlistBlock = new Wishlist();

    sinon.stub(wishlistBlock, 'hasWishlistOverlayRootOnThePage').callsFake(() => true);

    sinon.stub(wishlistBlock, 'initWishlist20').callsFake(() => {});

    sinon.spy(wishlistBlock, 'initOnDocumentReady');

    return wishlistBlock;
}

describe('Wishlist block initialization', function () {
    it('Doesn\'t initialize things for document.ready when init() called', function (done) {
        const wishlistBlock = getWishlistBlockMock();

        wishlistBlock.initOnDocumentReady.restore();
        sinon.stub(wishlistBlock, 'initOnDocumentReady').callsFake(() => {});

        wishlistBlock.init();

        // document.ready
        assert(wishlistBlock.initWishlist20.notCalled, 'Wishlist.initWishlist20() should not be called!');

        done();
    });

    it('Initializes things on document.ready', function (done) {
        const wishlistBlock = getWishlistBlockMock();

        wishlistBlock.initOnDocumentReady();

        // document.ready
        assert(wishlistBlock.initWishlist20.calledOnce, 'Wishlist.initWishlist20() should be called once!');

        done();
    });

    it('Initializes things when there\'s a Wishlist SPA root node', function (done) {
        const wishlistBlock = getWishlistBlockMock();

        wishlistBlock.hasWishlistOverlayRootOnThePage.restore();
        wishlistBlock.$wishlistRoot.length = 1;

        wishlistBlock.initOnDocumentReady();

        // document.ready
        assert(wishlistBlock.initWishlist20.calledOnce, 'Wishlist.initWishlist20() should be called once!');

        done();
    });

    it('Doesn\'t initialize anything when there\'s no Wishlist SPA root node', function (done) {
        const wishlistBlock = getWishlistBlockMock();

        wishlistBlock.hasWishlistOverlayRootOnThePage.restore();
        wishlistBlock.$wishlistRoot.length = 0;

        wishlistBlock.initOnDocumentReady();

        // document.ready
        assert(wishlistBlock.initWishlist20.notCalled, 'Wishlist.initWishlist20() should not be called!');

        done();
    });
});