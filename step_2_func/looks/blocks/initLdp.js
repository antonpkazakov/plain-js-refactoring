import SlickSlider from '../../_dummy_modules/SlickSlider';
import LookPano from '../../_dummy_modules/LookPano';

function initLookMainImagePano() {
    const lookPano = new LookPano();
    lookPano.init();
}

function initBottomLooksSlider() {
    const slickSlider = new SlickSlider();
    $(() => {
        slickSlider.init();
    });
}

export default function initLdp() {
    initLookMainImagePano();

    initBottomLooksSlider();
}

