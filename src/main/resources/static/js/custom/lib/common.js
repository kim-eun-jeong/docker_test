if (typeof (Utils) == "undefined") var Utils = {};

(function($) {
	Utils.Common = function() {
		this.cokpitCnt = 0;
		this.initialize.apply(this, arguments);
	};

	Utils.Common.prototype = {
		initialize : function(hash) {

		},

		inputNumberSet : function(min, max, id, Class) {
			var defaultTxt = '.numberOnly';
			if (id != undefined && id != null) defaultTxt = '#' + id;
			if (Class != undefined && Class != null) defaultTxt = '.' + Class;

			$(defaultTxt).autoNumeric('destroy');
			$(defaultTxt).autoNumeric('init', {
				aSep : '',
				vMin : min,
				vMax : max
			});
		},

		moreLeftNav : function() {
			var winH = $(window).height();
			var bodyH = $('body').height();
			var contentsH = $('.c-contents').outerHeight();
			var containerH = $('.c-container').outerHeight();

			var resultH = resultH = winH;
			if (bodyH > resultH) resultH = bodyH;
			if (contentsH > resultH) resultH = contentsH;
			if (containerH > resultH) resultH = containerH;

			$('.c-lnb').height(resultH + 59);
		},

		pageMove : function(url, queryString) {
			if (queryString != undefined) {
				location.href = $('#contextPath').val() + url + '.do' + queryString;
			} else {
				location.href = $('#contextPath').val() + url + '.do';
			}
		},

		unitChange : function(size, type) {
			var result = '';
			var tmpSize = size;

			if (size < 1024) {
				result = $.number(tmpSize, 2) + 'K' + type;
			} else {
				tmpSize = tmpSize / 1024;
				if (tmpSize < 1024) {
					result = $.number(tmpSize, 2) + 'M' + type;
				} else {
					tmpSize = tmpSize / 1024;
					if (tmpSize < 1024) {
						result = $.number(tmpSize, 2) + 'G' + type;
					} else {
						tmpSize = tmpSize / 1024;
						if (tmpSize < 1024) {
							result = $.number(tmpSize, 2) + 'T' + type;
						}
					}
				}
			}

			return result;
		},

		getQueryStringParams : function(sParam) {
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split('&');
			for (var i = 0; i < sURLVariables.length; i++) {
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sParam) {
					return sParameterName[1];
				}
			}
		},

		urlParameterStr : function(param) {
			var str = '';
			var tI = 0;
			$.each(param, function(i, v) {
				if (tI == 0) str += '?';
				else str += '&';

				str += i + '=' + v;
				tI++;
			});

			return str;
		},

		selectBoxDisabled : function(id, flag) {
			if (flag) {
				$('#' + id).css('background', 'gainsboro');
			} else {
				$('#' + id).css('background', 'white');
			}

			$('#' + id).attr('disabled', flag);
		},

		selectBoxYear : function() {
			var html = '';
			for (var i = 2014; i <= 2015; i++) {
				html += '<option value="' + i + '">' + i + '???</option>';
			}
			return html;
		},

		selectBoxMon : function() {
			var html = '';
			for (var i = 1; i <= 12; i++) {
				var tmp = i;
				if (i < 10) tmp = "0" + tmp;
				html += '<option value="' + tmp + '">' + tmp + '???</option>';
			}
			return html;
		},

		selectBoxDay : function() {
			var html = '';
			for (var i = 1; i <= 31; i++) {
				var tmp = i;
				if (i < 10) tmp = "0" + tmp;
				html += '<option value="' + tmp + '">' + tmp + '???</option>';
			}
			return html;
		},

		selectBoxHour : function() {
			var html = '';
			for (var i = 0; i <= 23; i++) {
				var tmp = i;
				if (i < 10) tmp = "0" + tmp;
				html += '<option value="' + tmp + '">' + tmp + '???</option>';
			}
			return html;
		},

		selectBoxMinute : function(flag) {
			var html = '';
			for (var i = 0; i <= 59; i++) {
				var tmp = i;
				if (i < 10) tmp = "0" + tmp;
				html += '<option value="' + tmp + '">' + tmp + '???</option>';
			}
			return html;
		},

		selectBoxYearTerm : function(start, end) {
			var html = '';
			for (var i = start; i <= end; i++) {
				html += '<option value="' + i + '">' + i + '</option>';
			}
			return html;
		},

		selectBoxMonTerm : function(year, startDate, term) {
			var date = new Date();
			date.setFullYear(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDate())
			var html = '';
			for (var i = 0; i <= term; i++) {
				date.setMonth(date.getMonth() + 1);

				if (year == date.getFullYear()) {
					var mon = date.getMonth() + 1;
					if (mon < 10) mon = "0" + mon;
					html += '<option value="' + mon + '">' + mon + '</option>';
				}
			}
			return html;
		},

		selectBoxDayTerm : function(year, mon) {
			var date = new Date(year, mon, 0);
			var day = date.getDate();
			var html = '';
			for (var i = 1; i <= day; i++) {
				var tmp = i;
				if (i < 10) tmp = "0" + tmp;
				html += '<option value="' + tmp + '">' + tmp + '</option>';
			}
			return html;
		},

		cokpitForm : function(html) {
			rCommon.cokpitCnt++;

			var result = {
				id : 'cokpit' + rCommon.cokpitCnt,
				html : '<div class="cokpit_wrap" id="cokpit' + rCommon.cokpitCnt + '">' + html + '</div>'
			};

			return result;
		},

		showCokpit : function(id) {
			$('#' + id).css('bottom', '-' + $(window).height()).stop().animate({
				'bottom' : 0
			}, 2000);
		},

		hideCokpit : function(id) {
			$('#' + id).stop().animate({
				'bottom' : '-' + $(window).height()
			}, 1200, function() {
				$('#' + id).remove();
			});
		},

		hideBtnCokpit : function(THIS) {
			rCommon.hideCokpit($(THIS).parent().parent().parent().attr('id'));
		},

		// -- ????????? ???????????????
		numberFilter : function(str) {
			return str.replace(/[^0-9]/gi, "");
		},

		// -- ?????? ??????
		dateFormat : function(str, type) {
			var rStr = '';

			if (str != null && str != "") {
				if (type.indexOf('yyyy') != -1) rStr += str.substring(0, 4);
				if (type.indexOf('MM') != -1) rStr += '.' + str.substring(4, 6);
				if (type.indexOf('dd') != -1) rStr += '.' + str.substring(6, 8);
				if (type.indexOf('HH') != -1) rStr += ' ' + str.substring(8, 10);
				if (type.indexOf('mm') != -1) rStr += ':' + str.substring(10, 12);
				if (type.indexOf('ss') != -1) rStr += ':' + str.substring(12, 14);
			}

			return rStr;
		},

		// Date ????????? ?????? ??????
		simpleDateFormat : function(v) {
			var date = new Date(v);
			var rVal = date.getFullYear() + '-';

			if ((date.getMonth() + 1) < 10) rVal += '0';
			rVal += date.getMonth() + 1 + '-';

			if (date.getDate() < 10) rVal += '0';
			rVal += date.getDate() + ' ';

			if (date.getHours() < 10) rVal += '0';
			rVal += date.getHours() + ':';

			if (date.getMinutes() < 10) rVal += '0';
			rVal += date.getMinutes() + ':';

			if (date.getSeconds() < 10) rVal += '0';
			rVal += date.getSeconds();

			return rVal;
		},

		// -- ????????? ?????? ??????
		dialog : function(width, height, Class) {
			$('.' + Class).dialog({
				create : function(event, ui) {
					$(".ui-widget-header").hide();
				},
				resizable : false,
				height : height,
				width : width,
				modal : true,
				dialogClass : Class
			});
		},

		// -- ????????? ?????? ??????
		closeDialog : function(id, Class) {
			if (id != null || id != undefined) {
				$('#' + id).closest('.ui-dialog-content').dialog('destroy');
			} else if (Class != null || Class != undefined) {
				$('.' + Class).closest('.ui-dialog-content').dialog('destroy');
			}
		},

		// -- ?????? ????????? ??????
		loading : function() {
			var html = '<div class="loding dn">';
			html += '<img src="' + $('#contextPath').val() + '/css/lib/images/loding.gif" style="margin-left:4px; margin-top:4px;"/>';
			html += '</div>';

			$('body').append(html);
			rCommon.dialog(210, 205, 'loding');
		},

		closeLoading : function() {
			$('.loding').closest('.ui-dialog-content').dialog('close');
			$('.loding').remove();
		},

		// -- ????????????
		/*datePicker : function(id) {
			$('#' + id).datepicker({
				showOn : 'button',
				buttonImage : $('#contextPath').val() + '/img/icon_calendar.png',
				buttonImageOnly : true,
				showMonthAfterYear : true,
				monthNames : [ '??? 1???', '??? 2???', '??? 3???', '??? 4???', '??? 5???', '??? 6???', '??? 7???', '??? 8???', '??? 9???', '??? 10???', '??? 11???', '??? 12???' ],
				monthNamesShort : [ '1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???' ],
				dayNamesMin : [ '???', '???', '???', '???', '???', '???', '???' ],
				weekHeader : 'Wk',
				dateFormat : 'yy-mm-dd'
			});

			rCommon.datePickerCss();
		},*/

		datePickerLimit : function(start, end, sFlag, eFlag) {
			if (sFlag) $('#' + start).datepicker('option', 'minDate', rCommon.simpleDateFormat(new Date()));
			$('#' + start).datepicker('option', 'maxDate', $('#' + end).val());
			$('#' + start).datepicker('option', 'onClose', function(selectedDate) {
				if (selectedDate != '') $('#' + end).datepicker('option', 'minDate', selectedDate);
				rCommon.datePickerCss();
			});

			if (eFlag) $('#' + end).datepicker('option', 'minDate', rCommon.simpleDateFormat(new Date()));
			else $('#' + end).datepicker('option', 'minDate', $('#' + start).val());
			$('#' + end).datepicker('option', 'onClose', function(selectedDate) {
				$('#' + start).datepicker('option', 'maxDate', selectedDate);
				rCommon.datePickerCss();
			});

			rCommon.datePickerCss();
		},

		datePickerCancel : function(id) {
			$('#' + id).datepicker('option', {
				showButtonPanel : true,
				closeText : 'clear',
				onClose : function() {
					if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
						$(this).val('');
					}
				}
			});

			rCommon.datePickerCss();
		},

		datePickerCss : function() {
			$('.ui-datepicker-trigger').addClass('cp');
			$('.ui-datepicker-trigger').css({
				'margin-left' : '5px'
			});
		},

		datePickerStr : function(id) {
			var val = $('#' + id).val()
			var rVal = '';

			$.each(val.split('-'), function(i, v) {
				rVal += v;
			});

			if (id.indexOf('start') != -1) rVal += '';
			if (id.indexOf('end') != -1) rVal += '';

			return rVal;
		},

		dateStr : function(str) {
			var result = '';

			$.each(str.split(' ')[0].split('-'), function(i, v) {
				result += v;
			});

			$.each(str.split(' ')[1].split(':'), function(i, v) {
				result += v;
			});

			result += '000';

			return result;
		},

		strCheck : function(key) {
			if (key == undefined || key == null) {
				return '';
			} else {
				return key;
			}
		},

		inputSpecialPrevent : function(obj) {
			obj.value = obj.value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '');
		},
		
		isMobile : function(){
			console.log("ostype = " + navigator.userAgent);
			return navigator.userAgent.match(/Android/i);
		},
		
		nameSetData : function(name, data){
			var grpl = $("[name="+name+"]").length;
			for(var i=0; i<grpl; i++){                          
				$("input[name="+name+"]").eq(i).val(data);
			}
		},
		
		dateStr : function (data){
			var today = new Date();
			if(data != null && data != "undefined"){
				 today = new Date(data);
			}
			var year = today.getFullYear(); // ??????
			var month = today.getMonth() + 1;  // ???
			var date = today.getDate();  // ??????
			var time = new Date();
			var hour = time.getHours(); // ???
			var minutes = time.getMinutes(); // ???
			var seconds = time.getSeconds(); // ???	
			
			var monthStr = Number(month) < 10 ? "0"+month :  month;
			var dateStr = Number(date) < 10 ? "0"+date :  date;
			var hourStr = Number(hour) < 10 ? "0"+hour :  hour;
			var minutesStr = Number(minutes) < 10 ? "0"+minutes :  minutes;
			var secondsStr = Number(seconds) < 10 ? "0"+seconds :  seconds;
			
			return year+"-"+monthStr+"-"+dateStr+" "+hourStr+":"+minutesStr+":"+secondsStr;
		},
		
		dateStr_ago12H : function (data){
			var today = new Date();
			if(data != null && data != "undefined"){
				 today = new Date(data);
			}
			var year = today.getFullYear(); // ??????
			var month = today.getMonth() + 1;  // ???
			var date = today.getDate();  // ??????
			var time = new Date();
			var hour = (time.getHours() - 12); // ???
			var minutes = time.getMinutes(); // ???
			var seconds = time.getSeconds(); // ???	
			
			if(time.getHours() < 12) {
				date = date - 1;
				hour = hour + 24;
			}
			
			var monthStr = Number(month) < 10 ? "0"+month :  month;
			var dateStr = Number(date) < 10 ? "0"+date :  date;
			var hourStr = Number(hour) < 10 ? "0"+hour :  hour;
			var minutesStr = Number(minutes) < 10 ? "0"+minutes :  minutes;
			var secondsStr = Number(seconds) < 10 ? "0"+seconds :  seconds;
			
			return year+"-"+monthStr+"-"+dateStr+" "+hourStr+":"+minutesStr+":"+secondsStr;
		},
		
		dateUTCStr : function (data){
			var today = new Date();
			var time = new Date();
			if(data != null && data != "undefined"){
				 today = new Date(data);
				 time = new Date(data);
			}
			var year = today.getFullYear(); // ??????
			var month = today.getUTCMonth() + 1;  // ???
			var date = today.getUTCDate();  // ??????
			var hour = time.getUTCHours(); // ???
			var minutes = time.getUTCMinutes(); // ???
			var seconds = time.getUTCSeconds(); // ???	
			
	 		var monthStr = Number(month) < 10 ? "0"+month :  month;
	 		var dateStr = Number(date) < 10 ? "0"+date :  date;
	 		var hourStr = Number(hour) < 10 ? "0"+hour :  hour;
	 		var minutesStr = Number(minutes) < 10 ? "0"+minutes :  minutes;
	 		var secondsStr = Number(seconds) < 10 ? "0"+seconds :  seconds;
			
			return year+"-"+monthStr+"-"+dateStr+" "+hourStr+":"+minutesStr+":"+secondsStr;
		}
	};
})(jQuery);

var rCommon = new Utils.Common();

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	if (originalOptions.error == undefined) {
//		jqXHR.error(function() {
//			alert('??????????????? ?????? ???????????????.');
//			rCommon.closeLoading();
//		});
	}
});

function jsonView(arg) {
	if (true && arg != null) {
		console.log(JSON.stringify(arg));
	}
}

function debug(message, json) {
	console.log('DEBUG>>> ' + message);
	jsonView(json);
}

function grantor() {
	$("#dimmed").show();
	$("#popup_container").show();
}

function popupClose() {
	$("#dimmed").hide();
	$("#popup_container").hide();
}

function getGrantor() {
	$.ajax({
	    type : "POST"
	    ,url : "/console/request/grantor.do"
	    ,data : $("#register_form").serialize()
	    ,success : function(data){
	      $("#tRs").empty();
	      var html;
	      if (data != null && data != "") {
	    	  html += '<tr>';
	    	  html += '	<td><input type="checkbox" name="checkbox" id="' + data.usrId + '" value="' + data.usrName + '" /></td>';
	          html += '	<td>' + data.dutyNm + '</td>';
	          html += '	<td>' + data.usrName + '</td>';
	          html += '	<td>' + data.usrId + '</td>';
	          html += '</tr>';
	      }
	      $("#tRs").html(html);
	    }  
	});  
}

function selectGrantor(category) {
	 var cnt = $("input[name=checkbox]:checkbox:checked").length;
	 if(cnt > 1) {
		 alert("???????????? ????????? ????????? ??? ????????????.");
		 return;
	 } else if(cnt == 0) {
		 alert("???????????? ?????? ??? ?????????.");
		 return;
	 }
	 
	 $('input[name=checkbox]:checked').each(function() { 
	        $("#appOrId").val($(this).attr("id"));
	        $("#appOrName").attr("value", $(this).val());
	 });
	 
	 $('#'+category).modal('hide');
}

function drawGraph(){
	$('#tree_list').on('select_node.jstree', function(e, data) {
		var nodeId = data.instance.get_node(data.selected[0]).id;
		var type = data.instance.get_node(data.selected[0]).type;
		
		$('#deptId').val(nodeId);
		getGrantor();
	}).jstree({
		/* 'plugins' : ['wholerow'], */
		'core' : {
			'themes' : {
				'name' : 'proton'
			},
			'data' : {
				"url" : $('#contextPath').val() + '/console/request/grantorList.do',
				'data' : function(node) {
					return {
						'id' : node.id,
						'type' : node.type
					};
				}
			}
		}
	});
}

function substrDate(date) {
	var year, month, day, hour, minute, time = "";
	year = date.substring(0,4);
	month = date.substring(4,6);
	day = date.substring(6,8);
	hour = date.substring(8,10);
	minute = date.substring(10,12);
	time = [year, month, day].join('.')+" "+[hour, minute].join(':') ;
	return time;
}

//yyyy-MM-dd TO yyyyMMdd  
function changeDateFormat(startDate, endDate, tgStrDate, tgEndDate) {
	var param = {
		startDate : rCommon.datePickerStr(startDate),
		endDate : rCommon.datePickerStr(endDate),
	};
	$('#'+tgStrDate).val(param.startDate);
	$('#'+tgEndDate).val(param.endDate);
}

function getTimeStamp(date) {
    //var d = new Date();
 
    var s =
        leadingZeros(date.getFullYear(), 4) + "-" + 
        leadingZeros(date.getMonth() + 1, 2) + "-" + 
        leadingZeros(date.getDate(), 2) + " " + 
        leadingZeros(date.getHours(), 2) + ":" + 
        leadingZeros(date.getMinutes(), 2) + ":" + 
        leadingZeros(date.getSeconds(), 2);
 
    return s;
}
 
function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
 
    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function menualDown() {
	if(confirm("?????? ???????????? ???????????? ???????????????????")) {
		location.href="/download.do?type=menual";
	}
}

function clientDown() {
	
	if(rCommon.isMobile()){
		console.log("mobile?????? ?????????????????????.");
		//location.href="http://play.google.com/store/apps/details?id=com.skt.smartgraphics";
		return;
	}
	
	if(confirm("Connector ??? ???????????? ???????????????????")) {
		location.href="/download.do?type=client";
	}
}

