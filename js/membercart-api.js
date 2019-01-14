if(!memberCartJQuery) var memberCartJQuery = {};
memberCartJQuery.jQuery = jQuery.noConflict(true);

var memberCartAPI = (function(memberCartAPI, $, undefined) {
    if( !$.isEmptyObject(memberCartAPI) ){
        return memberCartAPI;
    }
    var _reqURL = '__CARTURL__/__API__';

    function call_api(options) {
        var is_ie=/*@cc_on@if(@_jscript_version<=9)!@end@*/false;
        if (is_ie) {
            return false;
        }

        var apiFile = 'member-api.php';
        if (typeof cartUrlDomain != 'undefined') {
            var reqUrl = _reqURL.replace('__CARTURL__', cartUrlDomain)
                                .replace('__API__',     apiFile);
        } else if (typeof options.storeData.cartUrlDomain != 'undefined') {
            var reqUrl = _reqURL.replace('__CARTURL__', options.storeData.cartUrlDomain)
                                .replace('__API__',     apiFile);
        } else {
            _reqURL    = 'https://cart__SETNUM__.shopserve.jp/__SHOPNAME__/__API__';
            var reqUrl = _reqURL.replace('__SETNUM__',   options.storeData.setNum)
                                .replace('__SHOPNAME__', options.storeData.host)
                                .replace('__API__',      apiFile);
        }

        $.ajax({
            url: reqUrl,
            type: "POST",
            dataType: 'json',
            data: options.data || '',
            xhrFields: {
                withCredentials : true
            },
            cache: true,
            crossDomain: true
        }).done(function(data){
            options.callback(data);
        }).fail(function(jqXHR, textStatus, thrownError) {
            //console.log(thrownError);
        });
    }
    function getMemberInfoCartInfo(options) {
        options.data.CMD = 'getMemberCartInfo';
        var defaults = {
            callback:  function(data){
                var result = data['status'];
                 if (result === 'success') {
                     if (typeof options.success === 'function') {
                         options.success(data['memberCartInfo']);
                     }
                 }
           }
        }
        var setting = $.extend({}, defaults, options);
        call_api(setting);
    }

    memberCartAPI.getMemberInfoCartInfo = getMemberInfoCartInfo;

    return memberCartAPI;
})(window.memberCartAPI || {}, memberCartJQuery.jQuery);

(function($){
$(document).ready(function() {
    memberCartAPI.getMemberInfoCartInfo({"data": {}, "storeData": storeData,"success" : function(data){
            var elements = document.getElementsByClassName("member_info_cart_info");
            var userWeb  = '';

            if (typeof storeData.shopId != 'undefined') {
                userWeb = '/vol1blog/' + storeData.shopId.charAt(0) + '/'+ storeData.shopId + '.shopserve.jp';
            }

            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = elements[i].innerHTML.replace(/__IS_MEMBER__/g, data['is_member']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_ID__/g, data['id']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_LASTNAME__/g, data['lastname']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_FIRSTNAME__/g, data['firstname']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_HOLDINGPOINT__/g, data['holdingpoint']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_RANK_NAME__/g, data['rank_name']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_RANK_NPRC__/g, data['rank_nprc']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__MEMBER_RANK_NCNT__/g, data['rank_ncnt']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__ITM_CNT__/g, data['itm_cnt']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__ITM_TOTAL__/g, data['itm_total']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__ITM_DISCOUNT_TOTAL__/g, data['itm_discount_total']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__REMAINING_FREE_SHIPPING__/g, data['remaining_free_shipping']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__IS_FREE_SHIPPING__/g, data['is_free_shipping']);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__SETNUM__/g, storeData.setNum);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__HOST__/g, storeData.host);
                elements[i].innerHTML = elements[i].innerHTML.replace(/__USER_WEB__/g, userWeb);
            }

            $(".member_info_cart_info .number_comma").each(function( index, element ) {
                if ( !$(this).text().match(/,/) && !isNaN($(this).text()) ) {
                    $(this).text(parseInt($(this).text()).toLocaleString());
                }
            });

            $(".member_info_cart_info").show();
        }
    });
});
})(memberCartJQuery.jQuery);
