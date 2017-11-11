import { expect, assert } from 'chai';
import sinon from 'sinon';

import mochaTestSetup from '../../../mochaTestSetup';

import Navigation from './Navigation';

/**
 * @return {Navigation}
 */
function getNavigationBlockMock() {
    const navigationBlock = new Navigation();

    sinon.stub(navigationBlock, 'isDesktopWindowScrollHandlerEnabled').callsFake(() => true);
    sinon.stub(navigationBlock, 'isMobileFiltersBlockEnabled').callsFake(() => true);
    sinon.stub(navigationBlock, 'isLooksLogoFilterEnabled').callsFake(() => true);

    sinon.stub(navigationBlock, 'initFiltersDropdowns').callsFake(() => {});
    sinon.stub(navigationBlock, 'toggleNavStickiness').callsFake(() => {});
    sinon.stub(navigationBlock, 'addLooksLogo').callsFake(() => {});
    sinon.stub(navigationBlock, 'initLooksLogo').callsFake(() => {});
    sinon.stub(navigationBlock, 'getWindowScrollTop').returns(0);
    sinon.stub(navigationBlock, 'getLocationPathname').returns('/looks/');

    sinon.spy(navigationBlock, 'initOnDocumentReady');
    sinon.spy(navigationBlock, 'initMobileFilters');
    sinon.spy(navigationBlock, 'initDesktopWindowScrollHandler');
    sinon.spy(navigationBlock, 'onDesktopWindowScroll');

    return navigationBlock;
}

describe('LDP Products block initialization', function () {
    beforeEach(function () {
        mochaTestSetup();
    });

    it('Doesn\'t initialize things for document.ready when init() called', function (done) {
        const navigationBlock = getNavigationBlockMock();

        navigationBlock.initOnDocumentReady.restore();
        sinon.stub(navigationBlock, 'initOnDocumentReady').callsFake(() => {});

        navigationBlock.init();

        assert(navigationBlock.initFiltersDropdowns.calledOnce, 'Navigation.initFiltersDropdowns() should be called once!');

        // document.ready
        assert(navigationBlock.initDesktopWindowScrollHandler.notCalled, 'Navigation.initDesktopWindowScrollHandler() should not be called!');
        assert(navigationBlock.initMobileFilters.notCalled, 'Navigation.initMobileFilters() should not be called!');

        done();
    });

    it('Initializes desktop scroll handler if it\'s enabled', function (done) {
        window.ww.detect.isDesktop.returns(true);

        const navigationBlock = getNavigationBlockMock();

        assert(navigationBlock.$stickyNavWrapper !== undefined, 'Navigation.$stickyNavWrapper should not be undefined!');

        navigationBlock.isDesktopWindowScrollHandlerEnabled.restore();

        navigationBlock.initOnDocumentReady();

        assert(navigationBlock.initDesktopWindowScrollHandler.calledOnce, 'Navigation.initDesktopWindowScrollHandler() should be called once!');

        done();
    });

    it('Doesn\'t initialize desktop scroll handler if it\'s not enabled', function (done) {
        window.ww.detect.isDesktop.returns(false);

        const navigationBlock = getNavigationBlockMock();

        assert(navigationBlock.$stickyNavWrapper === undefined, 'Navigation.$stickyNavWrapper should be undefined!');

        navigationBlock.isDesktopWindowScrollHandlerEnabled.restore();

        navigationBlock.initOnDocumentReady();

        assert(navigationBlock.initDesktopWindowScrollHandler.notCalled, 'Navigation.initDesktopWindowScrollHandler() should not be called!');

        done();
    });

    it('Initializes mobile filters block if it\'s enabled', function (done) {
        window.ww.detect.isMobile.returns(true);

        const navigationBlock = getNavigationBlockMock();

        assert(navigationBlock.$mobileLogoFiltersLookup !== undefined, 'Navigation.$mobileLogoFiltersLookup should not be undefined!');

        navigationBlock.isMobileFiltersBlockEnabled.restore();

        navigationBlock.initOnDocumentReady();

        assert(navigationBlock.initMobileFilters.calledOnce, 'Navigation.initMobileFilters() should be called once!');

        done();
    });

    it('Doesn\'t initialize mobile filters block if it\'s not enabled', function (done) {
        window.ww.detect.isMobile.returns(false);

        const navigationBlock = getNavigationBlockMock();

        assert(navigationBlock.$mobileLogoFiltersLookup === undefined, 'Navigation.$mobileLogoFiltersLookup should be undefined!');

        navigationBlock.isMobileFiltersBlockEnabled.restore();

        navigationBlock.initOnDocumentReady();

        assert(navigationBlock.initMobileFilters.notCalled, 'Navigation.initMobileFilters() should not be called!');

        done();
    });

    it('Toggles nav stickiness on if scrolled enough and off if it\'s not enough', function (done) {
        const navigationBlock = getNavigationBlockMock();

        navigationBlock.getWindowScrollTop.returns(300);
        navigationBlock.toggleNavStickiness.reset();

        navigationBlock.onDesktopWindowScroll();

        assert(navigationBlock.toggleNavStickiness.withArgs(true).calledOnce, 'Navigation.toggleNavStickiness(true) should be called once!');

        // Edge case
        navigationBlock.getWindowScrollTop.returns(213);
        navigationBlock.toggleNavStickiness.reset();

        navigationBlock.onDesktopWindowScroll();

        assert(navigationBlock.toggleNavStickiness.withArgs(true).calledOnce, 'Navigation.toggleNavStickiness(true) should be called once!');

        navigationBlock.getWindowScrollTop.returns(30);
        navigationBlock.toggleNavStickiness.reset();

        navigationBlock.onDesktopWindowScroll();

        assert(navigationBlock.toggleNavStickiness.withArgs(false).calledOnce, 'Navigation.toggleNavStickiness(false) should be called once!');

        // Edge case
        navigationBlock.getWindowScrollTop.returns(212);
        navigationBlock.toggleNavStickiness.reset();

        navigationBlock.onDesktopWindowScroll();

        assert(navigationBlock.toggleNavStickiness.withArgs(false).calledOnce, 'Navigation.toggleNavStickiness(false) should be called once!');

        done();
    });

    it('Initializes the looks logo if necessary and doesn\'t if not', function (done) {
        const navigationBlock = getNavigationBlockMock();

        navigationBlock.isLooksLogoFilterEnabled.restore();

        navigationBlock.getLocationPathname.returns('/looks/');
        navigationBlock.addLooksLogo.reset();

        navigationBlock.initMobileFilters();

        assert(navigationBlock.addLooksLogo.calledOnce, 'Navigation.addLooksLogo() should be called once!');

        navigationBlock.getLocationPathname.returns('/styleguide-preview/pages/page-looks-main.html');
        navigationBlock.addLooksLogo.reset();

        navigationBlock.initMobileFilters();

        assert(navigationBlock.addLooksLogo.calledOnce, 'Navigation.addLooksLogo() should be called once!');

        navigationBlock.getLocationPathname.returns('/random-path/');
        navigationBlock.addLooksLogo.reset();

        navigationBlock.initMobileFilters();

        assert(navigationBlock.addLooksLogo.notCalled, 'Navigation.addLooksLogo() should not be called!');

        done();
    });
});