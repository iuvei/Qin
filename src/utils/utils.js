class Utils {
    /**
      * 格式化数据
      * @param  {[type]}   data     数据集
      * @param  {[type]}   size     分割大小
      * @param  {Function} callback 回调方法
      * @return {[type]}            [description]
    */
    rebuildData (data,size,callback) {
          
        var fData = [];
        if(typeof size == "string"){
            size = Number(size);
        }        
        if(size){
            var dlen = data.length;
            var len = Math.floor(dlen / size);
            var mlen = dlen % size;

            for(var i = 0; i < len; i++){  //先处理能完全展示的数据
                var arr = [];
                for(var j = i * size; j < i * size + size; j++){                    
                    arr.push(data[j]);
                }
                fData.push(arr);
            }
            if(mlen){  //如果处理后，多余数据，则单独展示
                var length = fData.length;
                var mArr = data.slice(dlen - mlen);
                fData.push(mArr);
                for(var k = 0; k < (size-mlen);k ++){
                    var da = data[k] || data[k-1] || {};
                    fData[length].push(da);
                }
            }            
        }else{
            fData = data;
        }
        if(callback&&typeof callback==='function'){
            callback(fData);
        } else return fData;
    }
    /**
     * [生成CGUID]
     * @return {[type]} [description]
     */
    getCGUID () {
        const padding = (n, m) =>{
            let len = (m || 2) - (1 + Math.floor(Math.log(n | 1) / Math.LN10 + 10e-16));
            return new Array(len + 1).join("0") + n;
        }
        let now = new Date();
        return '' + padding(now.getHours()) + padding(now.getMinutes()) + padding(now.getSeconds()) + padding(now.getMilliseconds(), 3) + padding(Math.ceil(Math.random() * 9999), 4);
    }
    /**
     * [getResponseInfo 获取响应消息]
     * @param  {[type]} conf [description]
     * @return {[type]}      [description]
     */
    getResponseInfo (conf) {
        let xhr = conf.xhr;
        let json;
        let responseText = xhr.responseText;
        let resHeaders = T.ajax.utils.getHeaders(xhr);

        //序列化json
        let isJSON = conf.isJSON || /json|javascript/i.test(resHeaders["Content-Type"]) || xhr.responseText.indexOf("{") == 0;
        if (isJSON) {
            json = T.tryEval(responseText);
        }
        return { responseText,json};
    }
    /**
    *格式化文本，将字符串中包含{关键字}的地方替换成map中的属性值
    */
    format(str, map) {
      let tmp;
      for (let k in map) {
          let re = new RegExp('\\{' + k + '\\}', 'gm');
          tmp = String(map[k]).replace(/\$/g, "$$$$");
          str = str.replace(re, tmp);
      }
      return str;
    }
    /**
     * [htmlEncode html编码处理]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    htmlEncode(str) {
      if (typeof str != "string")
          return "";
      str = str.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/\"/g, "&quot;")
               .replace(/\'/g, "&#39;")
               .replace(/ /g, "&nbsp;")
               .replace(/&amp;#([^\;]+);/ig, "&#$1;"); //将&#20117;转成相应的汉字“井”
        return str;
    }
    /**
     * [htmlDecode html解码处理]
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    htmlDecode(text) {
      if (typeof text != "string")
          return "";
      let map = {
            '&amp;': '&',
            '&quot;': '"',
            '&lt;': '<',
            '&gt;': '>',
            "&nbsp;": " ",
            "&#39;": "'"
        };
      return text.replace(/(&quot;|&lt;|&gt;|&amp;|&nbsp;|&#39;)/g, function (str, item) {
          return map[item];
      });
      return text;
    }
    
    /**
     * [formatDate 格式化日期函数]
     * @param  {[type]} format [description]
     * @param  {[type]} date   [description]
     * @return {[type]}        [description]
     */
    formatDate(format, date) {
          if (!date)
              return "";
          if (typeof date == "number")
              date = new Date(date * 1000);
          var o = {
              "M+": date.getMonth() + 1,
              "d+": date.getDate(),
              "h+": date.getHours(),
              "m+": date.getMinutes(),
              "s+": date.getSeconds(),
              "q+": Math.floor((date.getMonth() + 3) / 3),
              "S": date.getMilliseconds(),
              "w": "日一二三四五六".charAt(date.getDay())
          };
          format = format.replace(/y{4}/, date.getFullYear())
              .replace(/y{2}/, date.getFullYear().toString().substring(2));
          for (var k in o) {
              var reg = new RegExp(k);
              format = format.replace(reg, match);
          }
          function match(m) {
              return m.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length);
          }
          return format;
      }
}
export default new Utils();
 




