import Wishlist20 from './../../block/Wishlist20';

const $wishlistRoot = $('#wishlistOverlayRoot');

function initOnDocumentReady() {
    if (hasWishlistOverlayRootOnThePage()) {
        initWishlist20();
    }
}

/**
 * @return {boolean}
 */
function hasWishlistOverlayRootOnThePage() {
    return $wishlistRoot.length > 0;
}

function initWishlist20() {
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

export default function initWishlist() {
    $(() => {
        initOnDocumentReady();
    })
}
