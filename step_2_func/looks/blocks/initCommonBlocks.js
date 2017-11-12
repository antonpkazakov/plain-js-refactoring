import SmoothScroll from '../../_dummy_modules/SmoothScroll';
import WelcomeOverlay from '../../_dummy_modules/WelcomeOverlay';
import * as ClubSignupOverlay from '../../_dummy_modules/ClubSignupOverlay';

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
    const smoothScroll = new SmoothScroll();
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
