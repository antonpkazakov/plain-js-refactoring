import SlickSlider from './block/slickSlider';
import LookPano from './block/lookPano';

export default class {
    constructor() {
        this.initLookMainImagePano();

        this.initBottomLooksSlider();
    }

    initLookMainImagePano() {
        const lookPano = new LookPano();
        lookPano.init();
    }

    initBottomLooksSlider() {
        const slickSlider = new SlickSlider();
        $(function () {
            slickSlider.init();
        });
    }
}
