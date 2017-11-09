import SlickSlider from './block/slickSlider';
import LookPano from './block/lookPano';

const lookPano = new LookPano();
lookPano.init();

const slickSlider = new SlickSlider();
$(function () {
    slickSlider.init();
});
