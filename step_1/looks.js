// import modules
import ModuleSmoothScroll from './local/modules/SmoothScroll';
import WelcomeOverlay from './block/welcomeOverlay';
import * as ClubSignupOverlay from './block/clubSignupOverlay';

import Seo from './looks/blocks/Seo';
import Navigation from './looks/blocks/Navigation';
import Ldp from './looks/blocks/Ldp';
import LdpProducts from './looks/blocks/LdpProducts';
import Wishlist from './looks/blocks/Wishlist';


/* --- COMMON INITIALIZATION --- */

const smoothScroll = new ModuleSmoothScroll();

const welcomeOverlay = new WelcomeOverlay();

$(function () {
    window.ww.LazyImages.lazyloadImages();

    if (window.ww.detect.isDesktop()) {
        smoothScroll.init();
    }
    welcomeOverlay.init();

    ClubSignupOverlay.init();
});

new Seo();


/* --- LLP INITIALIZATION --- */

new Navigation();


/* --- LDP INITIALIZATION --- */

new Ldp();
new LdpProducts();
new Wishlist();
