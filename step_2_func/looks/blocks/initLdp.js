import SlickSlider from './block/slickSlider';
import LookPano from './block/lookPano';

function initLookMainImagePano() {
    const lookPano = new LookPano();
    lookPano.init();
}

function initBottomLooksSlider() {
    const slickSlider = new SlickSlider();
    $(function () {
        slickSlider.init();
    });
}

export default function initLdp() {
    initLookMainImagePano();

    initBottomLooksSlider();
}

