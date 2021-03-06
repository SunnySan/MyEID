var SAMPLE_LOYALTY_CARD_AID = 'F222222222';
var SELECT_APDU_HEADER = '00A40400';
var TRANSACTION_APDU = 'aa000000';
var SELECT_OK_SW = '9000';
var UNKNOWN_CMD_SW = '0000';
var SELECT_APDU = buildSelectApdu(SAMPLE_LOYALTY_CARD_AID);
var MYACCOUNT = "886986123101";
//var MYACCOUNT = $('#selectCardId').val();

function toPaddedHexString(i) {
    return ("00" + i.toString(16)).substr(-2);
}

function buildSelectApdu(aid) {
    // Format: [CLASS | INSTRUCTION | PARAMETER 1 | PARAMETER 2 | LENGTH | DATA]
    var aidByteLength = toPaddedHexString(aid.length / 2);
    var data = SELECT_APDU_HEADER + aidByteLength + aid;
    return data.toLowerCase();
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //alert('initialize');
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //alert('bindEvents');
    },
    onDeviceReady: function() {
    	//alert('ready 00');
        // register to receive APDU commands
	    hce.registerCommandCallback(app.onCommand);

        // register to for deactivated callback
        hce.registerDeactivatedCallback(app.onDeactivated);

        app.okCommand = hce.util.hexStringToByteArray(SELECT_OK_SW);
        app.unknownCommand = hce.util.hexStringToByteArray(UNKNOWN_CMD_SW);
        //alert('onDeviceReady');
    },
    // onCommand is called when an APDU command is received from the HCE reader
    // if the select apdu command is received, the loyalty card data is returned to the reader
    // otherwise unknown command is returned
    onCommand: function(command) {
        console.log(command);
        var commandAsBytes = new Uint8Array(command);
        var commandAsString = hce.util.byteArrayToHexString(commandAsBytes);

        //alert(commandAsString);
        console.log('received command ' + commandAsString);
        console.log('expecting        ' + SELECT_APDU);

        //var accountNumberAsBytes = hce.util.stringToBytes(accountNumber.value);
        MYACCOUNT = $('#selectCardId').val();
        var accountNumberAsBytes = hce.util.stringToBytes(MYACCOUNT);
        var data = hce.util.concatenateBuffers(accountNumberAsBytes, app.okCommand);

        if (SELECT_APDU === commandAsString) {

            console.log('Sending ' + hce.util.byteArrayToHexString(data));
            hce.sendResponse(data);
            
            //alert('OK CMD SW');
            console.log('OK CMD SW');
            //console.log('apdu=' + hce.util.byteArrayToHexString(app.okCommand));
            //hce.sendResponse(app.okCommand);
        } else if (TRANSACTION_APDU == commandAsString){
            hce.sendResponse(data);
        	console.log('Transaction CMD SW');
        	$('#secTapNFCReader').hide();
        	$('#secPaymentSuccess').show();
        } else {
            //alert('UNKNOWN CMD SW');
            console.log('UNKNOWN CMD SW');
            hce.sendResponse(app.unknownCommand);
        }

    },
    onDeactivated: function(reason) {
        console.log('Deactivated ' + reason);
    }

};


