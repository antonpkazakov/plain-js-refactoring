// import modules
import ModuleSmoothScroll from './local/modules/SmoothScroll';
import WelcomeOverlay from './block/welcomeOverlay';
import * as ClubSignupOverlay from './block/clubSignupOverlay';

import Seo from './blocks/Seo';

import Navigation from '/blocks/Navigation';
import Ldp from './blocks/Ldp';
import LdpProducts from './blocks/LdpProducts';
import Wishlist from './blocks/Wishlist';

export default class LooksController {
    initOnDocumentReady() {
        this.initLazyloading();

        this.initSmoothScrolling();
    }

    initLazyloading() {
        window.ww.LazyImages.lazyloadImages();
    }

    initSeo() {
        const seoBlock = new Seo();
        seoBlock.init();
    }

    /**
     * @return {boolean}
     */
    isSmoothScrollingEnabled() {
        return window.ww.detect.isDesktop();
    }

    initSmoothScrolling() {
        if (!this.isSmoothScrollingEnabled()) {
            return;
        }

        const smoothScroll = new ModuleSmoothScroll();
        smoothScroll.init();
    }

    initOverlays() {
        const welcomeOverlay = new WelcomeOverlay();
        welcomeOverlay.init();

        ClubSignupOverlay.init();
    }

    /**
     * @return {boolean}
     */
    isLooksListingPage() {
        return window.ww.pageType === 'llp';
    }

    initLooksListingPage() {
        const navBlock = new Navigation();
        navBlock.init();
    }

    /**
     * @return {boolean}
     */
    isLookDetailPage() {
        return window.ww.pageType === 'ldp';
    }

    initLookDetailPage() {
        const ldpBlock = new Ldp();
        ldpBlock.init();

        const ldpProductsBlock = new LdpProducts();
        ldpProductsBlock.init();

        const wishlistBlock = new Wishlist();
        wishlistBlock.init();
    }

    run() {
        $(() => {
            this.initOnDocumentReady();
        });

        this.initSeo();

        if (this.isLooksListingPage()) {
            this.initLooksListingPage();
        }
        if (this.isLookDetailPage()) {
            this.initLookDetailPage();
        }
    }
}
