	import { md5 } from './_md5.js'
	import axios from '../../../node_modules/axios/dist/axios.min.js'
	import { CryptoJS } from './mode-ecb-min.js'
	import { Fingerprint } from './fingerPrint.js'

	function Rest() {
	    this.init();
	}
	Rest.prototype.init = function() {
	        var req = {};
	        var head = {};
	        var body = {};
	        var deviceId = md5(Fingerprint.get().toString());
	        this.deviceId = deviceId;
	        head.deviceId = deviceId;
	        head.requestId = new Date().getTime().toString();
	        head.signature = "null";
	        req.head = head;
	        req.body = body;
	        this.param = req;
	    }
	    /**
	     *  POST请求
	     */
	Rest.prototype.post = function(url, param) {
	    var that = this;
	    that.url = url;

	    //对初始化生成的对象深拷贝
	    // var _param = $.extend(true, {}, that.param);
	    var _param = that.cfgExtend({}, that.param);
	    /**
	     * @param: {"businessId":"01234",body:{}}
	     */
	    for (var key in param) {
	        //放进head的参数
	        if (key == 'businessId') {
	            _param.head.businessId = param[key];
	        } else if (key == 'body') {
	            //放进body的参数
	            if (!param[key]) param.body = "null";
	            _param.body = param[key];
	        }
	    }
	    _param = that.sort(_param);
	    var _body = JSON.stringify(_param.body);
	    var _head = JSON.stringify(_param.head);
	    var str_param = 'prvnpoint{"body":' + _body + ',"head":' + _head + '}station';
	    var signature = md5(str_param);
	    _param.head.signature = signature;
	    //对body进行aes
	    _param.body = aesEncrypt(_param.body, this.deviceId);
	    //签名为null 以排列的字符串
	    _param = JSON.stringify(_param);

	    // 添加一个响应拦截器
	    axios.interceptors.response.use(function(response) {
	        var result,
	            data = response.data,
	            code;
	        switch (parseInt(data.head.result)) {
	            case 0:
	                if (data.body !== null) {
	                    code = data.head.result;
	                    // return {
	                    //     // "res": JSON.parse(aesDecrypt(data.body, that.deviceId)),
	                    //     code: code
	                    // };
											return Promise.resolve({code: code});
	                } else {
	                    return {};
	                }
	                break;
	            default:
	                if (data.body !== null) {
	                    code = data.head.result;
	                    return {
	                        "res": JSON.parse(aesDecrypt(data.body, that.deviceId)),
	                        code: code
	                    };
											return Promise.resolve({code: code});
	                } else {
	                    return {};
	                }
	                break;
	        }
	    }, function(error) {
	        // Do something with response error
	        return Promise.reject(error);
	    });
  		return axios({
          method: 'get',
          url: that.url,
          data: _param
      })
	};
	/**
	 * 对象合并
	 */
	Rest.prototype.cfgExtend = function(req, param) {
	        if (!param || typeof param != "object") return "";
	        for (var key in param) {
	            req[key] = param[key];
	        }
	        return req;
	    }
	    /**
	     * createAxios 发请求
	     */
	Rest.prototype.createAxios = function(_param) {
	    var that = this;
			// 添加一个响应拦截器
	    axios.interceptors.response.use(function(response) {
	        var result,
	            data = response.data,
	            code;
	        switch (parseInt(data.head.result)) {
	            case 0:
	                if (data.body !== null) {
	                    code = data.head.result;
	                    // return {
	                    //     // "res": JSON.parse(aesDecrypt(data.body, that.deviceId)),
	                    //     code: code
	                    // };
											return Promise.resolve({code: code});
	                } else {
	                    return {};
	                }
	                break;
	            default:
	                if (data.body !== null) {
	                    code = data.head.result;
	                    return {
	                        "res": JSON.parse(aesDecrypt(data.body, that.deviceId)),
	                        code: code
	                    };
											return Promise.resolve({code: code});
	                } else {
	                    return {};
	                }
	                break;
	        }
	    }, function(error) {
	        // Do something with response error
	        return Promise.reject(error);
	    });
  		return axios({
          method: 'get',
          url: that.url,
          data: _param
      })
	};
	/**
	 * 排序
	 */
	Rest.prototype.sort = function(_param) {
	    var _head = _param.head,
	        _body = _param.body,
	        headArr = [],
	        bodyArr = [],
	        head = {},
	        body = {},
	        i,
	        key;
	    //先将对象转化为数组
	    for (key in _head) {
	        headArr.push(key);
	    }
	    for (key in _body) {
	        bodyArr.push(key);
	    }
	    /*
	     * 对键的数组排序
	     */
	    headArr = headArr.sort(function(a, b) {
	        if (/^\d/.test(a) ^ /^\D/.test(b)) return a > b ? 1 : (a == b ? 0 : -1);
	        return a > b ? -1 : (a == b ? 0 : 1);
	    });
	    bodyArr = bodyArr.sort(function(a, b) {
	        if (/^\d/.test(a) ^ /^\D/.test(b)) return a > b ? 1 : (a == b ? 0 : -1);
	        return a > b ? -1 : (a == b ? 0 : 1);
	    });
	    //组装对象
	    for (i = 0; i < headArr.length; i++) {
	        var key = headArr[i];
	        var value = _head[key];
	        head[key] = value;
	    }
	    for (i = 0; i < bodyArr.length; i++) {
	        var key = bodyArr[i];
	        var value = _body[key];
	        body[key] = value;
	    }
	    _param.body = body;
	    _param.head = head;
	    return _param;
	};
	var rest = new Rest();


	function trim(str) { //删除左右两端的空格
	    if (!str) return "";　　
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	//加密
	function aesEncrypt(data, deviceId) {
	    if (typeof data == 'object') data = JSON.stringify(data);
	    var key = "b450d406d61a49a5" + deviceId;
	    key = md5(key).substr(8, 16);
	    key = CryptoJS.enc.Utf8.parse(key);
	    var sendData = CryptoJS.enc.Utf8.parse(data);
	    var encryptedData = CryptoJS.AES.encrypt(data, key, {
	        mode: CryptoJS.mode.ECB,
	        padding: CryptoJS.pad.Pkcs7
	    });
	    return encryptedData.toString();
	}
	//解密
	function aesDecrypt(data, deviceId) {
	    if (typeof data == 'object') data = JSON.stringify(data);
	    var key = "b450d406d61a49a5" + deviceId;
	    key = md5(key).substr(8, 16);
	    key = CryptoJS.enc.Utf8.parse(key);
	    var decrypted = CryptoJS.AES.decrypt(data, key, {
	        mode: CryptoJS.mode.ECB,
	        padding: CryptoJS.pad.Pkcs7
	    });
	    return CryptoJS.enc.Utf8.stringify(decrypted).toString(); // 转换为 utf8 字符串
	}
	//获取url后参数
	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);
	    return null;
	}
	module.exports = {
	    rest: rest
	}
