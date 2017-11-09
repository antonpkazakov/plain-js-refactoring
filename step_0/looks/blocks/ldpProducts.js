import Sharing from './block/sharing';
import AddToCartLookTracking from './local/modules/GTM/AddToCartLookTracking';
import AddToCartHotspot from './local/modules/AddToCartHotspot';
import PlpTracking from './local/modules/GTM/PlpTracking';

const ModuleProductChangeSimples = require('./local/modules/ProductChangeSimples');

const productChangeSimples = new ModuleProductChangeSimples();
productChangeSimples.init();

$(function () {
    // initialization of add to cart
    const addToCartHotspot = new AddToCartHotspot();
    addToCartHotspot.init();

    // initialization add to cart tracking
    const addToCartLookTracking = new AddToCartLookTracking();
    addToCartLookTracking.init();

    const plpTracking = new PlpTracking();
    plpTracking.bindPdpLinksEvent();
    plpTracking.bindPlpProductImpressionsEvent();

    if (window.ww.detect.isMobile()) {
        if ($('body').hasClass('bodyCatalog')) {
            const sharing = new Sharing();
            sharing.init();
        }
    }

    if (window.ww.detect.isiOS()) {
        $('.cl__list__item__gift__giftIcon').on('click touchend', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    $('.cl__list__item__gift.alternative').hover(function () {
        $(this).parent().find('a.alternative, .original-image, .alternative-image, .cl__list__item__alternative').toggleClass('active');
    });

});

// Remove loader.gif from the grid cells when product images are loaded
$(window).load(function () {
    $('.jsProductLoader').remove();
});
