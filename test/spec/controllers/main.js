'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('coinageApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


  // Test that input is sanitised to correct number of pennies and accepts all valid cases.
  it('should accept valid values to convert to pennies', function () {
	var aAcceptedValues = [
		{sInput:'4', iPennies:4},
		{sInput:'85', iPennies:85},
		{sInput:'197p', iPennies:197},
		{sInput:'2p', iPennies:2},
		{sInput:'1.87', iPennies:187},
		{sInput:'£1.23', iPennies:123},
		{sInput:'£2', iPennies:200},
		{sInput:'£10', iPennies:1000},
		{sInput:'£1.87', iPennies:187},
		{sInput:'£1p', iPennies:100},
		{sInput:'£1.p', iPennies:100},
		{sInput:'001.41p', iPennies:141},
		{sInput:'4.235p', iPennies:424},
		{sInput:'£1.257422457p', iPennies:126}
	];
	for (var v = 0, vl = aAcceptedValues.length; v < vl; v++) {
		var iPennies = scope.convertToPennies(aAcceptedValues[v].sInput);
		expect(iPennies).toBe(aAcceptedValues[v].iPennies);
	}
  });
  
  // Test that input is sanitised to reject invalid cases  
  it('should reject invalid values attempting to convert to pennies', function () {
	var aFailedValues = ['','1x','£1x.0p','£p'];
	for (var v = 0, vl = aFailedValues.length; v < vl; v++) {
		var iPennies = scope.convertToPennies(aFailedValues[v]);
		expect(iPennies).toBe(false);
	}
  });
  
  // Test that a valid input is converted to coins that can be added up to the correct total.
  // This approach has been used to support modifying the array of coins without breaking
  // the test
  it('should convert submitted values into coins that can be re-added into total', function () {
	var aInputValues = ['£1.23','£1.87','£4.24'];
	for (var v = 0, vl = aInputValues.length; v < vl; v++) {
		var iPennyValue = scope.convertToPennies(aInputValues[v]),
		iTotal = 0;
		scope.jValues.sCoinageInput = aInputValues[v];
		scope.handleSubmitValue();
		for (var c = 0, cl = scope.aCoins.length; c < cl; c++) {
			iTotal+=scope.aCoins[c].iPennies*scope.aCoins[c].iCoinCount;
		}
		expect(iTotal).toBe(iPennyValue);
	}
  });
  
  
});
