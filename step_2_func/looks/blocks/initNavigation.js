import ModuleCustomDropdowns from './local/modules/CustomDropdowns';

const $stickyNav = $('.sticky');

let $stickyNavWrapper;
let $looksMainNavLine;
let $looksMainNavFilters;
let stickyNavActiveClass;
let looksMainNavActiveClass;

let $mobileLogoFiltersLookup;
let $mobileLogoFiltersShowNode;
let $page;
let stickyNavLlpClass;
let plpBodyFixedClass;

if (isDesktopWindowScrollHandlerEnabled()) {
    $stickyNavWrapper = $('.sticky__wrapper');
    $looksMainNavLine = $('.looksMain__line');
    $looksMainNavFilters = $('.looksMain__filters');
    stickyNavActiveClass = 'active';
    looksMainNavActiveClass = 'stickyNav';
}

if (isMobileFiltersBlockEnabled()) {
    $mobileLogoFiltersLookup = $('.h__logo__lookup');
    $mobileLogoFiltersShowNode = $('.js-looks-mobile-filter-show');
    $page = $('#page');
    stickyNavLlpClass = 'llp';
    plpBodyFixedClass = 'plp-body-fixed';
}

function initOnDocumentReady() {
    if (isDesktopWindowScrollHandlerEnabled()) {
        initDesktopWindowScrollHandler();
    }

    if (isMobileFiltersBlockEnabled()) {
        initMobileFilters();
    }
}

function initFiltersDropdowns() {
    const customDropdowns = new ModuleCustomDropdowns();
    customDropdowns.init();
}

/**
 * @return {boolean}
 */
function isDesktopWindowScrollHandlerEnabled() {
    return window.ww.detect.isDesktop();
}

function initDesktopWindowScrollHandler() {
    $(window).scroll(onDesktopWindowScroll);
}

/**
 * @param {boolean} state
 */
function toggleNavStickiness(state) {
    if (state) {
        $stickyNav.addClass(stickyNavActiveClass);
        $looksMainNavLine.addClass(looksMainNavActiveClass);
        $looksMainNavFilters.addClass(looksMainNavActiveClass);
        $stickyNavWrapper.append($looksMainNavFilters);
    } else {
        $stickyNav.removeClass(stickyNavActiveClass);
        $looksMainNavLine.removeClass(looksMainNavActiveClass);
        $looksMainNavFilters.removeClass(looksMainNavActiveClass);
        $stickyNav.after($looksMainNavFilters);
    }
}

function onDesktopWindowScroll() {
    const height = $(window).scrollTop();

    switch (true) {
        case height > 212:
            toggleNavStickiness(true);
            break;
        default:
            toggleNavStickiness(false);
    }
}

/**
 * @return {boolean}
 */
function isMobileFiltersBlockEnabled() {
    return window.ww.detect.isMobile();
}

/**
 * @return {boolean}
 */
function isLooksLogoFilterEnabled() {
    const pathname = window.location.pathname;

    return pathname === '/looks/' || pathname === '/styleguide-preview/pages/page-looks-main.html';
}

/**
 * @return {string}
 */
function renderLooksLogoFilter() {
    return '<a class="js-looks-mobile-filter h__logo__filter" href="#"><div class="h__logo__filter__icon"></div></a>';
}

/**
 * @return {jQuery|HTMLElement}
 */
function getLooksLogoFilter() {
    return $('.js-looks-mobile-filter');
}

function addLooksLogo() {
    $stickyNav.addClass(stickyNavLlpClass);
    $mobileLogoFiltersLookup.before(renderLooksLogoFilter());
}

function initMobileFilters() {
    if (isLooksLogoFilterEnabled()) {
        addLooksLogo();
    }

    getLooksLogoFilter().on('click', () => {
        $mobileLogoFiltersShowNode.show();
        $page.addClass(plpBodyFixedClass);
    });
}

export default function initNavigation() {
    initFiltersDropdowns();

    $(initOnDocumentReady);
}
