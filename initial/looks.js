// import modules
import Sharing from './block/sharing';
import SlickSlider from './block/slickSlider';
import LookPano from './block/lookPano';
import WelcomeOverlay from './block/welcomeOverlay';
import PlpTracking from './local/modules/GTM/PlpTracking';
import Wishlist20 from './block/Wishlist20';
import * as ClubSignupOverlay from './block/clubSignupOverlay';
import AddToCartLookTracking from './local/modules/GTM/AddToCartLookTracking';
import AddToCartHotspot from './local/modules/AddToCartHotspot';

const ModuleProductChangeSimples = require('./local/modules/ProductChangeSimples');
const ModuleSmoothScroll = require('./local/modules/SmoothScroll');
const ModuleCustomDropdowns = require('./local/modules/CustomDropdowns');

const slickSlider = new SlickSlider();

const lookPano = new LookPano();
lookPano.init();

const productChangeSimples = new ModuleProductChangeSimples();
productChangeSimples.init();

const smoothScroll = new ModuleSmoothScroll();

const customDropdowns = new ModuleCustomDropdowns();
customDropdowns.init();

// sticky header for filters
function stickyEnable(state) {
    if (state) {
        $('.sticky').addClass('active');
        $('.looksMain__line, .looksMain__filters').addClass('stickyNav');
        $($('.sticky__wrapper')).append($('.looksMain__filters'));
    } else {
        $('.sticky').removeClass('active');
        $('.looksMain__line, .looksMain__filters').removeClass('stickyNav');
        $($('.sticky')).after($('.looksMain__filters'));
    }
}

$(document).ready(function () {
    // initialization of add to cart
    const addToCartHotspot = new AddToCartHotspot();
    addToCartHotspot.init();

    // initialization add to cart tracking
    const addToCartLookTracking = new AddToCartLookTracking();
    addToCartLookTracking.init();

    slickSlider.init();
    window.ww.LazyImages.lazyloadImages();
    if (window.ww.detect.isMobile()) {
        const pathname = window.location.pathname;

        if (pathname === '/looks/' || pathname === '/styleguide-preview/pages/page-looks-main.html') {
            $('.sticky').addClass('llp');
            $('.h__logo__lookup').before('<a class="js-looks-mobile-filter h__logo__filter" href="#"><div class="h__logo__filter__icon"></div></a>');
        }

        $('.js-looks-mobile-filter').on('click', function () {
            $('.js-looks-mobile-filter-show').show();
            $('#page').addClass('plp-body-fixed');
        });

        if ($('.blockSeoBox').length) {
            $('.jsSeoBoxOpen').on('click', function () {
                $(this).removeClass('show');
                $('.blockSeoBox__text, .jsSeoBoxClose').addClass('show');
            });

            $('.jsSeoBoxClose').on('click', function () {
                $(this).removeClass('show');
                $('.jsSeoBoxOpen').addClass('show');
                $('.blockSeoBox__text').removeClass('show');
            });
        }

        if ($('body').hasClass('bodyCatalog')) {
            const sharing = new Sharing();
            sharing.init();
        }

        if ($('.jsLooksMain__seoText').length) {
            $('.jsLooksMain__seoTextOpen').on('click', function () {
                $(this).addClass('looksMain__seoTextOpen_isHidden');
                $('.jsLooksMain__seoTextClose').removeClass('looksMain__seoTextClose_isHidden');
                $('.jsLooksMain__seoText').removeClass('looksMain__seoText_isHidden');
            });

            $('.jsLooksMain__seoTextClose').on('click', function () {
                $(this).addClass('looksMain__seoTextClose_isHidden');
                $('.jsLooksMain__seoTextOpen').removeClass('looksMain__seoTextOpen_isHidden');
                $('.jsLooksMain__seoText').addClass('looksMain__seoText_isHidden');
            });
        }
    }

    if (window.ww.detect.isDesktop()) {
        smoothScroll.init();

        $(window).scroll(function () {
            const height = $(window).scrollTop();

            switch (true) {
                case height > 212:
                    stickyEnable(true);
                    break;
                default:
                    stickyEnable(false);
            }
        });
    } else if (window.ww.detect.isiOS()) {
        $('.cl__list__item__gift__giftIcon').on('click touchend', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
    }

    const welcomeOverlay = new WelcomeOverlay();
    welcomeOverlay.init();

    ClubSignupOverlay.init();

    $('.cl__list__item__gift.alternative').hover(function () {
        $(this).parent().find('a.alternative, .original-image, .alternative-image, .cl__list__item__alternative').toggleClass('active');
    });

    const plpTracking = new PlpTracking();
    plpTracking.bindPdpLinksEvent();
    plpTracking.bindPlpProductImpressionsEvent();

    // init new wishlist overlays
    (function () {
        if ($('#wishlistOverlayRoot').length) {
            const wishlist20 = new Wishlist20();
            const wishlistConfig = {
                wrapperSelector: '.looks__content, .room__spot__overlay',
                wishlistButtonSelector: '.jsWishlistHeart',
                wishlistButtonActiveClass: 'blockWishlistButton_active',
            };

            if (wishlistConfig !== {}) {
                wishlist20.init(wishlistConfig);
            }
        }
    }());
});

// Remove loader.gif from the grid cells when product images are loaded
$(window).load(function () {
    $('.jsProductLoader').remove();
});
