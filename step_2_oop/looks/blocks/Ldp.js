import SlickSlider from '../../_dummy_modules/SlickSlider';
import LookPano from '../../_dummy_modules/LookPano';

export default class Ldp {
    init() {
        this.initLookMainImagePano();

        $(() => {
            this.initOnDocumentReady();
        });
    }

    initLookMainImagePano() {
        const lookPano = new LookPano();
        lookPano.init();
    }

    initOnDocumentReady() {
        this.initBottomLooksSlider();
    }

    initBottomLooksSlider() {
        const slickSlider = new SlickSlider();
        slickSlider.init();
    }
}
