export default class Seo {
    constructor() {
        if (!this.isEnabled()) {
            return;
        }

        this.$seoBox = $('.blockSeoBox');
        this.$seoBoxOpenButton = $('.jsSeoBoxOpen');
        this.$seoBoxCloseButton = $('.jsSeoBoxClose');
        this.$seoBoxText = $('.blockSeoBox__text');
        this.seoBoxVisibleClass = 'show';

        this.$looksMainSeoText = $('.jsLooksMain__seoText');
        this.$looksMainSeoTextOpenButton = $('.jsLooksMain__seoTextOpen');
        this.$looksMainSeoTextCloseButton = $('.jsLooksMain__seoTextClose');
        this.looksMainSeoTextHiddenClass = 'looksMain__seoText_isHidden';
        this.looksMainSeoTextOpenButtonHiddenClass = 'looksMain__seoTextOpen_isHidden';
        this.looksMainSeoTextCloseButtonHiddenClass = 'looksMain__seoTextClose_isHidden';
    }

    init() {
        if (!this.isEnabled()) {
            return;
        }

        this.bindDocumentReady();
    }

    bindDocumentReady() {
        $(() => {
            this.initSeoBox();

            this.initSeoText();
        });
    }

    /**
     * @return {boolean}
     */
    isEnabled() {
        return window.ww.detect.isMobile();
    }

    initSeoBox() {
        if (!this.$seoBox.length) {
            return;
        }

        this.$seoBoxOpenButton.on('click', (event) => {
            $(event.currentTarget).removeClass(this.seoBoxVisibleClass);
            this.$seoBoxText.addClass(this.seoBoxVisibleClass);
            this.$seoBoxCloseButton.addClass(this.seoBoxVisibleClass);
        });

        this.$seoBoxCloseButton.on('click', (event) => {
            $(event.currentTarget).removeClass('show');
            this.$seoBoxOpenButton.addClass('show');
            this.$seoBoxText.removeClass('show');
        });
    }

    initSeoText() {
        if (!this.$looksMainSeoText.length) {
            return;
        }

        this.$looksMainSeoTextOpenButton.on('click', (event) => {
            $(event.currentTarget).addClass(this.looksMainSeoTextOpenButtonHiddenClass);
            this.$looksMainSeoTextCloseButton.removeClass(this.looksMainSeoTextCloseButtonHiddenClass);
            this.$looksMainSeoText.removeClass(this.looksMainSeoTextHiddenClass);
        });

        this.$looksMainSeoTextCloseButton.on('click', (event) => {
            $(event.currentTarget).addClass(this.looksMainSeoTextCloseButtonHiddenClass);
            this.$looksMainSeoTextOpenButton.removeClass(this.looksMainSeoTextOpenButtonHiddenClass);
            this.$looksMainSeoText.addClass(this.looksMainSeoTextHiddenClass);
        });
    }
}
