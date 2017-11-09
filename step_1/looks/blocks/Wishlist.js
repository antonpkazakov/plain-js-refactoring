import Wishlist20 from './../../block/Wishlist20';

export default class {
    constructor() {
        $(() => {
            if (this.hasWishlistOverlayRootOnThePage()) {
                this.initWishlist20();
            }
        })
    }

    /**
     * @return {boolean}
     */
    hasWishlistOverlayRootOnThePage() {
        return $('#wishlistOverlayRoot').length > 0;
    }

    initWishlist20() {
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
}