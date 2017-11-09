// import modules
import WelcomeOverlay from './block/welcomeOverlay';
import * as ClubSignupOverlay from './block/clubSignupOverlay';


/* --- COMMON INITIALIZATION --- */

const ModuleSmoothScroll = require('./local/modules/SmoothScroll');

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

require('./looks/blocks/seo');


/* --- LLP INITIALIZATION --- */

require('./looks/blocks/navigation');


/* --- LDP INITIALIZATION --- */

require('./looks/blocks/ldp');

require('./looks/blocks/ldpProducts');

require('./looks/blocks/wishlist');
