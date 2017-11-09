const $seoBox = $('.blockSeoBox');
const $seoBoxOpenButton = $('.jsSeoBoxOpen');
const $seoBoxCloseButton = $('.jsSeoBoxClose');
const $seoBoxText = $('.blockSeoBox__text');
const seoBoxVisibleClass = 'show';

const $looksMainSeoText = $('.jsLooksMain__seoText');
const $looksMainSeoTextOpenButton = $('.jsLooksMain__seoTextOpen');
const $looksMainSeoTextCloseButton = $('.jsLooksMain__seoTextClose');
const looksMainSeoTextHiddenClass = 'looksMain__seoText_isHidden';
const looksMainSeoTextOpenButtonHiddenClass = 'looksMain__seoTextOpen_isHidden';
const looksMainSeoTextCloseButtonHiddenClass = 'looksMain__seoTextClose_isHidden';

function bindDocumentReady() {
    $(() => {
        initSeoBox();

        initSeoText();
    });
}

/**
 * @return {boolean}
 */
function isSeoEnabled() {
    return window.ww.detect.isMobile();
}

function initSeoBox() {
    if (!$seoBox.length) {
        return;
    }

    $seoBoxOpenButton.on('click', (event) => {
        $(event.currentTarget).removeClass(seoBoxVisibleClass);
        $seoBoxText.addClass(seoBoxVisibleClass);
        $seoBoxCloseButton.addClass(seoBoxVisibleClass);
    });

    $seoBoxCloseButton.on('click', (event) => {
        $(event.currentTarget).removeClass('show');
        $seoBoxOpenButton.addClass('show');
        $seoBoxText.removeClass('show');
    });
}

function initSeoText() {
    if (!$looksMainSeoText.length) {
        return;
    }

    $looksMainSeoTextOpenButton.on('click', (event) => {
        $(event.currentTarget).addClass(looksMainSeoTextOpenButtonHiddenClass);
        $looksMainSeoTextCloseButton.removeClass(looksMainSeoTextCloseButtonHiddenClass);
        $looksMainSeoText.removeClass(looksMainSeoTextHiddenClass);
    });

    $looksMainSeoTextCloseButton.on('click', (event) => {
        $(event.currentTarget).addClass(looksMainSeoTextCloseButtonHiddenClass);
        $looksMainSeoTextOpenButton.removeClass(looksMainSeoTextOpenButtonHiddenClass);
        $looksMainSeoText.addClass(looksMainSeoTextHiddenClass);
    });
}

export default function initSeo() {
    if (!isSeoEnabled()) {
        return;
    }

    bindDocumentReady();
}
