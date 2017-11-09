import ModuleSmoothScroll from './local/modules/SmoothScroll';
import WelcomeOverlay from './block/welcomeOverlay';
import * as ClubSignupOverlay from './block/clubSignupOverlay';

import initSeo from './initSeo';

function initOnDocumentReady() {
    initLazyloading();

    if (isSmoothScrollingEnabled()) {
        initSmoothScrolling();
    }
}

function initLazyloading() {
    window.ww.LazyImages.lazyloadImages();
}

/**
 * @return {boolean}
 */
function isSmoothScrollingEnabled() {
    return window.ww.detect.isDesktop();
}

function initSmoothScrolling() {
    const smoothScroll = new ModuleSmoothScroll();
    smoothScroll.init();
}

function initOverlays() {
    const welcomeOverlay = new WelcomeOverlay();
    welcomeOverlay.init();

    ClubSignupOverlay.init();
}

export default function initCommonBlocks() {
    $(initOnDocumentReady);

    initSeo();
}
