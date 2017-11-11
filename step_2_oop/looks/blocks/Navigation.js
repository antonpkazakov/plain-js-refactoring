import CustomDropdowns from '../../_dummy_modules/CustomDropdowns';

export default class Navigation {
    constructor() {
        this.$stickyNav = $('.sticky');

        if (this.isDesktopWindowScrollHandlerEnabled()) {
            this.$stickyNavWrapper = $('.sticky__wrapper');
            this.$looksMainNavLine = $('.looksMain__line');
            this.$looksMainNavFilters = $('.looksMain__filters');
            this.stickyNavActiveClass = 'active';
            this.looksMainNavActiveClass = 'stickyNav';
        }

        if (this.isMobileFiltersBlockEnabled()) {
            this.$mobileLogoFiltersLookup = $('.h__logo__lookup');
            this.$mobileLogoFiltersShowNode = $('.js-looks-mobile-filter-show');
            this.$page = $('#page');
            this.stickyNavLlpClass = 'llp';
            this.plpBodyFixedClass = 'plp-body-fixed';
        }
    }

    init() {
        this.initFiltersDropdowns();

        $(() => {
            this.initOnDocumentReady();
        });
    }

    initOnDocumentReady() {
        if (this.isDesktopWindowScrollHandlerEnabled()) {
            this.initDesktopWindowScrollHandler();
        }

        if (this.isMobileFiltersBlockEnabled()) {
            this.initMobileFilters();
        }
    }

    initFiltersDropdowns() {
        const customDropdowns = new CustomDropdowns();
        customDropdowns.init();
    }

    /**
     * @return {boolean}
     */
    isDesktopWindowScrollHandlerEnabled() {
        return window.ww.detect.isDesktop();
    }

    initDesktopWindowScrollHandler() {
        $(window).scroll(() => {
            this.onDesktopWindowScroll();
        });
    }

    /**
     * @param {boolean} state
     */
    toggleNavStickiness(state) {
        if (state) {
            this.$stickyNav.addClass(this.stickyNavActiveClass);
            this.$looksMainNavLine.addClass(this.looksMainNavActiveClass);
            this.$looksMainNavFilters.addClass(this.looksMainNavActiveClass);
            this.$stickyNavWrapper.append(this.$looksMainNavFilters);
        } else {
            this.$stickyNav.removeClass(this.stickyNavActiveClass);
            this.$looksMainNavLine.removeClass(this.looksMainNavActiveClass);
            this.$looksMainNavFilters.removeClass(this.looksMainNavActiveClass);
            this.$stickyNav.after(this.$looksMainNavFilters);
        }
    }

    /**
     * @return {Number}
     */
    getWindowScrollTop() {
        return $(window).scrollTop();
    }

    onDesktopWindowScroll() {
        const height = this.getWindowScrollTop();

        switch (true) {
            case height > 212:
                this.toggleNavStickiness(true);
                break;
            default:
                this.toggleNavStickiness(false);
        }
    }

    /**
     * @return {boolean}
     */
    isMobileFiltersBlockEnabled() {
        return window.ww.detect.isMobile();
    }

    /**
     * @return {string}
     */
    getLocationPathname() {
        return window.location.pathname;
    }

    /**
     * @return {boolean}
     */
    isLooksLogoFilterEnabled() {
        return this.getLocationPathname() === '/looks/' || this.getLocationPathname() === '/styleguide-preview/pages/page-looks-main.html';
    }

    /**
     * @return {string}
     */
    renderLooksLogoFilter() {
        return '<a class="js-looks-mobile-filter h__logo__filter" href="#"><div class="h__logo__filter__icon"></div></a>';
    }

    /**
     * @return {jQuery|HTMLElement}
     */
    getLooksLogoFilter() {
        return $('.js-looks-mobile-filter');
    }

    addLooksLogo() {
        this.$stickyNav.addClass(this.stickyNavLlpClass);
        this.$mobileLogoFiltersLookup.before(this.renderLooksLogoFilter());
    }

    initLooksLogo() {
        this.getLooksLogoFilter().on('click', () => {
            this.$mobileLogoFiltersShowNode.show();
            this.$page.addClass(this.plpBodyFixedClass);
        });
    }

    initMobileFilters() {
        if (this.isLooksLogoFilterEnabled()) {
            this.addLooksLogo();
        }

        this.initLooksLogo();
    }
}
