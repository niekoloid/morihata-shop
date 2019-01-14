function makesmpflg(smpdata) {
  if (smpdata) {
    //有効期限
    c_date = new Date();
    n = c_date.getTime() + 1000 * 60 * 60 * 24 * 365;
    c_date.setTime(n);
    kigen = c_date.toGMTString();
    userDomain = location.hostname.replace(/www\./, '');

    // cookieの書き出し
    document.cookie = 'smpflg=' + smpdata + '; domain=' + userDomain +
        '; path=/; expires=' + kigen;
  }
}

function loadCookie(loadValue) {
  if (loadValue) {
    var c_data = document.cookie + ';';
    c_data = unescape(c_data);
    var n_point = c_data.indexOf(loadValue);
    var v_point = c_data.indexOf('=', n_point) + 1;
    var end_point = c_data.indexOf(';', n_point);
    if (n_point > -1) {
      c_data = c_data.substring(v_point, end_point);
      return c_data;
    }
  }
}

function Split_GetParamter(ref) {
  var newArr = new Array();
  var refArr = ref.split('?');
  if (refArr.length > 1) {
    var refParamArr = refArr[1].split('&');
    if (refParamArr.length > 1) {
      for (index = 0; index < refParamArr.length; index++) {
        var refParamValueArr = refParamArr[index].split('=');
        if (refParamValueArr.length > 1) {
          newArr[refParamValueArr[0]] = refParamValueArr[1];
        }
      }
    } else {
      var useRef = refArr[1];
      if (refParamArr.length == 1) {
        useRef = refParamArr[0];
      }
      var refParamValueArr = useRef.split('=');
      if (refParamValueArr.length > 1) {
        newArr[refParamValueArr[0]] = refParamValueArr[1];
      }
    }
  }
  return newArr;
}

var spsdomain = '//' + location.hostname;
var spssmpdomain = spsdomain + '/smp/';
var ref = location.href;
if (!loadCookie('iswishlist') &&
    (!loadCookie('delflg') &&
         (navigator.userAgent.indexOf('iPhone') > 0 &&
          navigator.userAgent.indexOf('iPad') == -1) ||
     navigator.userAgent.indexOf('iPod') > 0 ||
     navigator.userAgent.indexOf('Android') > 0)) {
  var Array_Parameters = Split_GetParamter(ref);
  if (loadCookie('smpflg') == 1) {
    var Url = null;
    // desc
    if ((ref.match(
            /^(https?):\/\/([0-9a-z\.\-:]+?)\/SHOP\/[0-9a-zA-Z\-\_]+?\.html/)) !=
        null) {
      var smpArray = ref.split('\/');
      var ItemNo = smpArray[4].split('\.html');
      var Url = spssmpdomain + 'item/' + ItemNo[0] + '.html';
      // group
    } else if (
        ref.match(
            /^(https?):\/\/([0-9a-z\.\-:]+?)\/SHOP\/(g{1}[0-9]+?)\/list\.html/) !=
        null) {
      var smpArray = ref.split('\/');
      var groupId = smpArray[4].match(/\d+/g);
      Url = spssmpdomain + 'list.php?type=class&group=' + groupId;

      // category
    } else if (
        ref.match(
            /^(https?):\/\/([0-9a-z\.\-:]+?)\/SHOP\/([0-9\-\_\/]+?)\/list\.html/) !=
        null) {
      var smpArray = ref.split('\/');
      var mcatId = smpArray[4];
      var scatId = smpArray[5];

      if (scatId != 'list.html') {
        Url = spssmpdomain + 'list.php?type=class&scat=' + scatId;
      } else {
        Url = spssmpdomain + 'list.php?type=class&mcat=' + mcatId;
      }
    }
    if (Url == null) {
      Url = spssmpdomain;
    }

    // for param "_ga"
    if ('_ga' in Array_Parameters) {
      if (Array_Parameters['_ga'].match(/^[0-9\.]/) != null) {
        var refArr = Url.split('?');
        if (refArr.length > 1) {
          Url += '&_ga=' + Array_Parameters['_ga'];
        } else {
          Url += '?_ga=' + Array_Parameters['_ga'];
        }
      }
    }
    document.write(
        '<link href="' + spssmpdomain +
        'css/pcsmp.css" rel="stylesheet" type="text/css">');
    document.write(
        '<div class="shiny-blue"><a href="' + Url +
        '" onclick="makesmpflg(\'0\')">スマートフォン版はこちら</a></div>');
  } else {
    makesmpflg('0');
    // for param "_ga"
    if ('_ga' in Array_Parameters) {
      if (Array_Parameters['_ga'].match(/^[0-9\.]/) != null) {
        var refArr = spssmpdomain.split('?');
        if (refArr.length > 1) {
          spssmpdomain += '&_ga=' + Array_Parameters['_ga'];
        } else {
          spssmpdomain += '?_ga=' + Array_Parameters['_ga'];
        }
      }
    }
    if (typeof pageTracker === 'object') {
      _gaq.push([
        '_trackPageview', {
          hitCallback: function() {
            location.href = spssmpdomain;
          }
        }
      ]);
    } else {
      location.href = spssmpdomain;
    }
  }
}
