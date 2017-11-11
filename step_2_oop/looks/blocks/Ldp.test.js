import { expect, assert } from 'chai';
import sinon from 'sinon';

import '../../../mochaTestSetup';

import Ldp from './Ldp';

/**
 * @return {Ldp}
 */
function getLdpBlockMock() {
    const ldpBlock = new Ldp();

    sinon.stub(ldpBlock, 'initLookMainImagePano').callsFake(() => {});
    sinon.stub(ldpBlock, 'initBottomLooksSlider').callsFake(() => {});

    sinon.spy(ldpBlock, 'initOnDocumentReady');

    return ldpBlock;
}

describe('LDP block initialization', function () {
    it('Doesn\'t initialize things for document.ready when init() called', function (done) {
        const ldpBlock = getLdpBlockMock();

        ldpBlock.initOnDocumentReady.restore();
        sinon.stub(ldpBlock, 'initOnDocumentReady').callsFake(() => {});

        ldpBlock.init();

        assert(ldpBlock.initLookMainImagePano.calledOnce, 'Ldp.initLookMainImagePano() should be called once!');

        // document.ready
        assert(ldpBlock.initBottomLooksSlider.notCalled, 'Ldp.initBottomLooksSlider() should not be called!');

        done();
    });

    it('Initializes slider on document.ready', function (done) {
        const ldpBlock = getLdpBlockMock();

        ldpBlock.initOnDocumentReady();

        assert(ldpBlock.initBottomLooksSlider.calledOnce, 'Ldp.initBottomLooksSlider() should be called once!');

        done();
    });
});