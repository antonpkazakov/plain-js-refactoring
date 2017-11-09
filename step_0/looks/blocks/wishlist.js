import Wishlist20 from './../../block/Wishlist20';

$(function () {
    // init new wishlist overlays
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
})