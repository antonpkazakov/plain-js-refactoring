if (window.ww.detect.isMobile()) {
    $(function () {
        if ($('.blockSeoBox').length) {
            $('.jsSeoBoxOpen').on('click', function () {
                $(this).removeClass('show');
                $('.blockSeoBox__text, .jsSeoBoxClose').addClass('show');
            });

            $('.jsSeoBoxClose').on('click', function () {
                $(this).removeClass('show');
                $('.jsSeoBoxOpen').addClass('show');
                $('.blockSeoBox__text').removeClass('show');
            });
        }

        if ($('.jsLooksMain__seoText').length) {
            $('.jsLooksMain__seoTextOpen').on('click', function () {
                $(this).addClass('looksMain__seoTextOpen_isHidden');
                $('.jsLooksMain__seoTextClose').removeClass('looksMain__seoTextClose_isHidden');
                $('.jsLooksMain__seoText').removeClass('looksMain__seoText_isHidden');
            });

            $('.jsLooksMain__seoTextClose').on('click', function () {
                $(this).addClass('looksMain__seoTextClose_isHidden');
                $('.jsLooksMain__seoTextOpen').removeClass('looksMain__seoTextOpen_isHidden');
                $('.jsLooksMain__seoText').addClass('looksMain__seoText_isHidden');
            });
        }
    });
}