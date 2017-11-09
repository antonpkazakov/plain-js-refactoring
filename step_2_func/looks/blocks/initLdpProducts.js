import Sharing from './block/sharing';
import AddToCartLookTracking from './local/modules/GTM/AddToCartLookTracking';
import AddToCartHotspot from './local/modules/AddToCartHotspot';
import PlpTracking from './local/modules/GTM/PlpTracking';
import ModuleProductChangeSimples from './local/modules/ProductChangeSimples';

const $ldpGiftItemsIcons = $('.cl__list__item__gift__giftIcon');
const $ldpGiftItemsAlternatives = $('.cl__list__item__gift.alternative');

function initOnDocumentReady() {
    initAddToCartOnHotspots();

    initTracking();

    if (isSharingEnabled()) {
        initSharing();
    }

    initGiftIcons();
}

function initOnWindowLoad() {
    removeProductImagesLoaders();
}

function initProductSimplesSelectOnHotspots() {
    const productChangeSimples = new ModuleProductChangeSimples();
    productChangeSimples.init();
}

function initAddToCartOnHotspots() {
    // initialization of add to cart
    const addToCartHotspot = new AddToCartHotspot();
    addToCartHotspot.init();
}

function initTracking() {
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
function isCatalogPage() {
    return $('body').hasClass('bodyCatalog');
}

/**
 * @return {bool}
 */
function isSharingEnabled() {
    return window.ww.detect.isMobile() && isCatalogPage();
}

function initSharing() {
    const sharing = new Sharing();
    sharing.init();
}

/**
 * @return {boolean}
 */
function isGiftIconsTouchEventsHandlingNeeded() {
    return window.ww.detect.isiOS();
}

function initGiftIconsTouchEvents() {
    $ldpGiftItemsIcons.on('click touchend', (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
    });
}

function initGiftIcons() {
    if (isGiftIconsTouchEventsHandlingNeeded()) {
        initGiftIconsTouchEvents();
    }

    $ldpGiftItemsAlternatives.hover((e) => {
        $(e.currentTarget).parent().find('a.alternative, .original-image, .alternative-image, .cl__list__item__alternative').toggleClass('active');
    });
}

function removeProductImagesLoaders() {
    $('.jsProductLoader').remove();
}

export default function initLdpProducts() {
    initProductSimplesSelectOnHotspots();

    $(initOnDocumentReady);

    // Remove loader.gif from the grid cells when product images are loaded
    $(window).load(initOnWindowLoad);
}
