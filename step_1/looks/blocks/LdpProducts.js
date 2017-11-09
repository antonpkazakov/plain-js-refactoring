import Sharing from './block/sharing';
import AddToCartLookTracking from './local/modules/GTM/AddToCartLookTracking';
import AddToCartHotspot from './local/modules/AddToCartHotspot';
import PlpTracking from './local/modules/GTM/PlpTracking';
import ModuleProductChangeSimples from './local/modules/ProductChangeSimples';

export default class {
    constructor() {
        const productChangeSimples = new ModuleProductChangeSimples();
        productChangeSimples.init();

        $(() => {
            // initialization of add to cart
            const addToCartHotspot = new AddToCartHotspot();
            addToCartHotspot.init();

            this.initTracking();

            this.initSharing();

            this.initGiftIcons();
        });

        // Remove loader.gif from the grid cells when product images are loaded
        $(window).load(() => {
            this.removeProductImagesLoaders();
        });
    }

    initTracking() {
        // initialization add to cart tracking
        const addToCartLookTracking = new AddToCartLookTracking();
        addToCartLookTracking.init();

        const plpTracking = new PlpTracking();
        plpTracking.bindPdpLinksEvent();
        plpTracking.bindPlpProductImpressionsEvent();
    }

    initSharing() {
        if (!window.ww.detect.isMobile()) {
            return;
        }
        if (!$('body').hasClass('bodyCatalog')) {
            return;
        }

        const sharing = new Sharing();
        sharing.init();
    }

    initGiftIcons() {
        if (window.ww.detect.isiOS()) {
            $('.cl__list__item__gift__giftIcon').on('click touchend', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
            });
        }

        $('.cl__list__item__gift.alternative').hover(function () {
            $(this).parent().find('a.alternative, .original-image, .alternative-image, .cl__list__item__alternative').toggleClass('active');
        });
    }

    removeProductImagesLoaders() {
        $('.jsProductLoader').remove();
    }
}
