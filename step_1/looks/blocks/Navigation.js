import ModuleCustomDropdowns from './local/modules/CustomDropdowns';

export default class {
    constructor() {
        const customDropdowns = new ModuleCustomDropdowns();
        customDropdowns.init();

        $(() => {
            if (window.ww.detect.isDesktop()) {
                $(window).scroll(() => {
                    this.onDesktopWindowScroll();
                });
            }

            this.initMobileFilters();
        });
    }

    /**
     * @param {boolean} state
     */
    toggleNavStickiness(state) {
        if (state) {
            $('.sticky').addClass('active');
            $('.looksMain__line, .looksMain__filters').addClass('stickyNav');
            $($('.sticky__wrapper')).append($('.looksMain__filters'));
        } else {
            $('.sticky').removeClass('active');
            $('.looksMain__line, .looksMain__filters').removeClass('stickyNav');
            $($('.sticky')).after($('.looksMain__filters'));
        }
    }

    onDesktopWindowScroll() {
        const height = $(window).scrollTop();

        switch (true) {
            case height > 212:
                this.toggleNavStickiness(true);
                break;
            default:
                this.toggleNavStickiness(false);
        }
    }

    initMobileFilters() {
        if (!window.ww.detect.isMobile()) {
            return;
        }

        const pathname = window.location.pathname;

        if (pathname === '/looks/' || pathname === '/styleguide-preview/pages/page-looks-main.html') {
            $('.sticky').addClass('llp');
            $('.h__logo__lookup').before('<a class="js-looks-mobile-filter h__logo__filter" href="#"><div class="h__logo__filter__icon"></div></a>');
        }

        $('.js-looks-mobile-filter').on('click', function () {
            $('.js-looks-mobile-filter-show').show();
            $('#page').addClass('plp-body-fixed');
        });
    }
}
