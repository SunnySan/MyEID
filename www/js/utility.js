/**********�o���ɮ׸̬O�@�Ǥ��Ϊ����**********/

/**********�����ܼ�**********/
var sServerBaseURL = "http://cms.gslssd.com/MyEIDServer/";	//Server�ݱ��� request �� URL ���|

var fingerprintClientID = "MyEID2";
var fingerprintUserName = "886986123101";
var fingerprintPassword = "0000";


/**********�R�� Android key store���o�����ε{�������**********/
function deleteFingerprintKey(){
	FingerprintAuth.delete({
		clientId: fingerprintClientID,
		username: fingerprintUserName,
		password: fingerprintPassword
	}, successCallback, errorCallback);
	
	function successCallback(result) {
		console.log("Successfully deleted cipher: " + JSON.stringify(result));
	}
	
	function errorCallback(error) {
		console.log(error);
	}
}	//function deleteFingerprintKey(){

/**********���o server API �� base URL**********/
function getServerBaseURL(){
	return sServerBaseURL;
}	//function getServerBaseURL(){

/**********�P�_�r��O�_���ŭ�**********/
function beEmpty(s){
	return (s==null || s=='undefined' || s.length<1);
}	//function scrollToTop(){

/**********�P�_�r��O�_����**********/
function notEmpty(s){
	return (s!=null && s!='undefined' && s.length>0);
}	//function scrollToTop(){

/**********�N���B�r��[�W�d�쪺�r�I**********/
function toCurrency(s){
	if (beEmpty(s)) return "";	//�r�ꬰ��
	if (isNaN(s))	return s;	//���O�Ʀr�A�^�Э�r��
	
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;
	var s2 = "";
	s = trim(s);
	i = s.length;			//i���r�����
	if (i<4) return s;		//���פӵu�A���Υ[�r�I�A�����^�Э�r��
	j = Math.floor(i/3);	//j���r����װ��H3���Ӽ�
	k = i % 3;				//k���r����װ��H3���l��
	s2 = "";
	if (k>0) s2 = s.substring(0, k);
	for (l=0;l<j;l++){
		s2 = s2 + (s2==""?"":",") + s.substring(k+(l*3), k+(l+1)*3);
	}
	return s2;
}

/**********�N�r�ꪺ�ťեh��**********/
function trim(stringToTrim){
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

/**********�P�_�r��}�Y�O�_�����w���r**********/
String.prototype.startsWith = function(prefix)
{
    return (this.substr(0, prefix.length) === prefix);
}
 
/**********�P�_�r�굲���O�_�����w���r**********/
String.prototype.endsWith = function(suffix)
{
    return (this.substr(this.length - suffix.length) === suffix);
}
 
/**********�P�_�r��O�_�]�t���w���r**********/
String.prototype.contains = function(txt)
{
    return (this.indexOf(txt) >= 0);
}

/**********���o�Y�� URL �Ѽƪ��ȡA�Ҧp http://target.SchoolID/set?text=abc **********/
function getParameterByName( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**********�ˬdemail�榡�O�_���T**********/
function isEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**********���loading����BlockUI**********/
function showBlockUI(){
/*
	$.blockUI({
		message: '<img src="images/loading.gif">��Ƨ�s���A�еy��...</img>',
		css: {
			border: 'none',
			background: 'none',
			color: '#00FF00'
		},
		overlayCSS:{
			backgroundColor: '#000000',
			opacity:         0.5,
			cursor:          'wait'
		}
	});
*/
	
	$.blockUI({ 
		message: '<img src="images/loading.gif">Please wait...</img>',
		css:{
			border: 'none',
			padding: '15px',
			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: 0.95,
			color: '#00FF00'
		}
	}); 

	//$('.blockOverlay').attr('title','�H�ƹ��I���Ǧ�ϰ�i�^��D�e��').click($.unblockUI);	//�Y�[�o�@��B���ϥ�JQuery UI Tooltip�A�h�o�@��r�bBlockUI�����ᤴ�|�ݯd�bIE�e���W(Chrome���|)
	//$('.blockOverlay').click($.unblockUI);	//�Y�[�o�@��B���ϥ�JQuery UI Tooltip�A�h�o�@��r�bBlockUI�����ᤴ�|�ݯd�bIE�e���W(Chrome���|)

}

/**********�Ѱ�BlockUI**********/
function unBlockUI(){
	$.unblockUI();
}

/**********�P�_�O�_�qAPP���ϥΥ�����**********/
function isRunInApp(){
	var wl = window.location.href;
	var mob = (wl.indexOf("http://")<0 && wl.indexOf("https://")<0);
	return mob;
}

function getPlatformName(){
	var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iOS" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iOS" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "";
	return deviceType;
}

/**********���o���Ѥ���A�榡���G2013/10/3**********/
function getCurrentDate(){
	var currDate = new Date();	//�ثe�ɶ�
	var txtCurrDate = currDate.getFullYear() + "/" + (currDate.getMonth()+1) + "/" + currDate.getDate();	//���Ѥ���A�榡���G2013/10/3
	return txtCurrDate;
}

/**********���o�x�s�bclient�ݪ��ܼƭ�(�qPC cookie�Τ��storage���o)**********/
function getLocalValue(key){
	var value = "";
	if (isRunInApp()){	//PhoneGap�A�ϥ� local storage
		value = window.localStorage.getItem(key);
	}else{
		value = $.cookie(key);	//Browser�A�ϥ� cookie for JQuery
	}
	if (beEmpty(value)) value="";
	return value;
}

/**********�N�ܼƭ��x�s�bclient��(PC cookie�Τ��storage)**********/
function setLocalValue(key, value){
	if (beEmpty(key)) return;
	if (isRunInApp()){	//PhoneGap�A�ϥ� local storage
		window.localStorage.setItem(key, value);
	}else{
		$.cookie(key, value, { expires: 30, path: '/' });	//Browser�A�ϥ� cookie for JQuery�A�w�]�x�s30��
	}
	return;
}

/**********�������alert��message box**********/
function MsgBox(msg, callbackClose){
	alert(msg);
	return;
	if (callbackClose==null){
		$(document).simpledialog2({ blankContent : "<p class='msgbox-text'>" + msg + "</p>" + "<a rel='close' data-role='button' href='#' class='msgbox-button'>Close</a>", headerText: 'Notification', mode: 'blank', showModal: true, headerClose: true, animate: false, themeDialog: 'f'});
	}else{
		$(document).simpledialog2({ blankContent : "<p class='msgbox-text'>" + msg + "</p>" + "<a rel='close' data-role='button' href='#' class='msgbox-button'>Close</a>", headerText: 'Notification', mode: 'blank', showModal: true, headerClose: true, animate: false, themeDialog: 'f', callbackClose: callbackClose });
	}
}

/**********��� multi page�����Y��page**********/
function showPage(pageId){
	$.mobile.changePage(pageId,{transition: 'slide'});
}


/**********�q Server �^�����**********/
function getDataFromServer(sProgram, sData, sResponseType, SuccessCallback, bBlockUI){
	/*****************************************************************
	sProgram		server�ݵ{���W�١A�Ҧp xxx.jsp
	sData			�npost��server�����
	sResponseType	�Ʊ�server�ݦ^�Ъ���������A�i�� json �� xml
	SuccessCallback	���\�qserver���o��Ʈɪ��B�z�{��(function)
	bBlockUI		�O�_���BlockUI�A�Y����J���Ѽƫh�w�]�����BlockUI
	*****************************************************************/
	if (beEmpty(bBlockUI)) bBlockUI = true;
	//if (beEmpty(sData)) sData = "ResponseType=" + sResponseType; else sData += "&ResponseType=" + sResponseType;
	/*
		alert(sServerBaseURL + sProgram);
		alert(sData);
		alert(sResponseType);
	*/
	$.ajax({
		url: sServerBaseURL + sProgram,
		type: 'POST', //�ھڹ�ڱ��p�A�i�H�O'POST'�Ϊ�'GET'
		beforeSend : (bBlockUI==true?showBlockUI:null),
		complete   : (bBlockUI==true?unBlockUI:null),
		data: sData,
		dataType: sResponseType, //���w�ƾ������A�`�Nserver�n���@��Gresponse.setContentType("text/xml;charset=utf-8");
		timeout: 60000, //�]�mtimeout�ɶ��A�H�d�����@�����A1000 = 1��
		error: function (xhr, status, error){	//���~����
			//var err = eval("(" + xhr.responseText + ")");
			alert(status);
			alert(error);
			alert(xhr.responseText);
  			alert('System error, please try again later.');
		},
		success: function (data){ //ajax�ШD���\��do something with response data
			SuccessCallback(data);
		}	//success: function (data){ //ajax�ШD���\��do something with response data
	});	//$.ajax({
	return false;
}	//function sServerBaseURL(sProgram, sData, sResponseType, SuccessCallback){

