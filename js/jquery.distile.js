/**
 * jQuery.tile()をdisる
 *
**/
;(function($) {
	$.fn.distile = function(columns) {
		// height 外す
		return this.each(function() {
			s = this.style;
			if(s.removeProperty) s.removeProperty("height");
			if(s.removeAttribute) s.removeAttribute("height");
		});
	};
})(jQuery);

