import Sharing from '../../_dummy_modules/Sharing';
import AddToCartLookTracking from '../../_dummy_modules/AddToCartLookTracking';
import AddToCartHotspot from '../../_dummy_modules/AddToCartHotspot';
import PlpTracking from '../../_dummy_modules/PlpTracking';
import ProductChangeSimples from '../../_dummy_modules/ProductChangeSimples';

export default class LdpProducts {
    constructor() {
        this.$ldpGiftItemsIcons = $('.cl__list__item__gift__giftIcon');
        this.$ldpGiftItemsAlternatives = $('.cl__list__item__gift.alternative');
    }

    init() {
        this.initProductSimplesSelectOnHotspots();

        $(() => {
            this.initOnDocumentReady();
        });

        // Remove loader.gif from the grid cells when product images are loaded
        $(window).load(() => {
            this.initOnWindowLoad();
        });
    }

    initOnDocumentReady() {
        this.initAddToCartOnHotspots();

        this.initTracking();

        if (this.isSharingEnabled()) {
            this.initSharing();
        }

        this.initGiftIcons();
    }

    initOnWindowLoad() {
        this.removeProductImagesLoaders();
    }

    initProductSimplesSelectOnHotspots() {
        const productChangeSimples = new ProductChangeSimples();
        productChangeSimples.init();
    }

    initAddToCartOnHotspots() {
        // initialization of add to cart
        const addToCartHotspot = new AddToCartHotspot();
        addToCartHotspot.init();
    }

    initTracking() {
        // initialization add to cart tracking
        const addToCartLookTracking = new AddToCartLookTracking();
        addToCartLookTracking.init();

        const plpTracking = new PlpTracking();
        plpTracking.bindPdpLinksEvent();
        plpTracking.bindPlpProductImpressionsEvent();
    }

    /**
     * @return {bool}
     */
    isCatalogPage() {
        return $('body').hasClass('bodyCatalog');
    }

    /**
     * @return {bool}
     */
    isSharingEnabled() {
        return window.ww.detect.isMobile() && this.isCatalogPage();
    }

    initSharing() {
        const sharing = new Sharing();
        sharing.init();
    }

    /**
     * @return {boolean}
     */
    isGiftIconsTouchEventsHandlingNeeded() {
        return window.ww.detect.isiOS();
    }

    initGiftIconsTouchEvents() {
        this.$ldpGiftItemsIcons.on('click touchend', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    initGiftItemAlternatives() {
        this.$ldpGiftItemsAlternatives.hover((e) => {
            $(e.currentTarget).parent().find('a.alternative, .original-image, .alternative-image, .cl__list__item__alternative').toggleClass('active');
        });
    }

    initGiftIcons() {
        if (this.isGiftIconsTouchEventsHandlingNeeded()) {
            this.initGiftIconsTouchEvents();
        }

        this.initGiftItemAlternatives();
    }

    removeProductImagesLoaders() {
        $('.jsProductLoader').remove();
    }
}
