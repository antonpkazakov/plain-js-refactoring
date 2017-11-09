import Wishlist20 from './../../block/Wishlist20';

export default class Wishlist {
    constructor() {
        this.$wishlistRoot = $('#wishlistOverlayRoot');
    }

    init() {
        $(() => {
            this.initOnDocumentReady();
        })
    }

    initOnDocumentReady() {
        if (this.hasWishlistOverlayRootOnThePage()) {
            this.initWishlist20();
        }
    }

    /**
     * @return {boolean}
     */
    hasWishlistOverlayRootOnThePage() {
        return this.$wishlistRoot.length > 0;
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