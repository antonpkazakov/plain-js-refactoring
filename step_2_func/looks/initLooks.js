import initCommonBlocks from './blocks/initCommonBlocks';

import initNavigation from './blocks/initNavigation';
import initLdp from './blocks/initLdp';
import initLdpProducts from './blocks/initLdpProducts';
import initWishlist from './blocks/initWishlist';

/**
 * @return {boolean}
 */
function isLooksListingPage() {
    return window.ww.pageType === 'llp';
}

function initLooksListingPage() {
    initNavigation();
}

/**
 * @return {boolean}
 */
function isLookDetailPage() {
    return window.ww.pageType === 'ldp';
}

function initLookDetailPage() {
    initLdp();

    initLdpProducts();

    initWishlist();
}

export default function initLooks() {
    initCommonBlocks();

    if (this.isLooksListingPage()) {
        this.initLooksListingPage();
    }
    if (this.isLookDetailPage()) {
        this.initLookDetailPage();
    }
}
