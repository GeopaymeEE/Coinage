'use strict';

angular.module('coinageApp', []).controller('MainCtrl', function($scope) {
	// JSON style data model can be modified to include any coins 
	// (eg. 5p and 10p coins missing from initial spec) 
	// could be loaded from restful service
	$scope.aCoins = [
		{sCoin: '1p', bEnabled: true},
		{sCoin: '2p', bEnabled: true},
		{sCoin: '5p', bEnabled: false},
		{sCoin: '10p', bEnabled: false},
		{sCoin: '20p', bEnabled: true},
		{sCoin: '50p', bEnabled: true},
		{sCoin: '£1', bEnabled: true},
		{sCoin: '£2', bEnabled: true}
	];

	$scope.jValues = {// App values for binding
		iDisplayCount: 0, // Number of coins to display in final result
		iPennyValue: 0, // Current model penny value
		sCoinageInput: '', // Text input value
		sCoinageMessage: '', // User feedback message
		bShowEnhancements: false
	};

	$scope.year = new Date().getFullYear(); // Year for copyright display

	// Utility used to cache the 'pennified' version of coins
	$scope.pennifyModel = function() {
		var aCoins = $scope.aCoins, cl = aCoins.length;
		while (cl--) {
			aCoins[cl].iPennies = $scope.convertToPennies(aCoins[cl].sCoin);
		}
		$scope.bPennified = true;
	};

	// Event handler used to capture the submission of the form
	$scope.handleSubmitValue = function() {
		var iPennies = $scope.convertToPennies($scope.jValues.sCoinageInput), iAmount;
		if (iPennies) {
			iAmount = $scope.splitCoins(iPennies);
			$scope.jValues.iPennyValue = iPennies;
			$scope.jValues.sCoinageMessage = 'Converting ' + iPennies + ' pennies into coins.  ';
			if (iAmount) {
				$scope.jValues.sCoinageMessage = 'Unable to convert ' + iAmount + ' out of ' + iPennies + ' pennies using existing configuration.';
			}
		} else {
			$scope.jValues.sCoinageMessage = 'Sorry, you have entered an incorrect format';
		}
	};

	// Used to update the data model for split coins from the user input.
	$scope.splitCoins = function(iAmount) {
		// Cache pennified values if neccesary
		if (!$scope.bPennified) {
			$scope.pennifyModel();
		}
		// Update data model with specified number of coins
		var aCoins = $scope.aCoins, cl = aCoins.length;
		while (cl--) {
			if (aCoins[cl].bEnabled) {
				// Get highest coin count and store in data model
				aCoins[cl].iCoinCount = Math.floor(iAmount / aCoins[cl].iPennies);
				// Pass remainder for next coin
				iAmount = iAmount % aCoins[cl].iPennies;
			} else {
				aCoins[cl].iCoinCount = 0;
			}
		}
		// Check if there are any unspent pennies
		return iAmount;
	};

	// Used to sanitise any string and convert to 'pennified' amount.
	$scope.convertToPennies = function(sInput) {
		var regexp = /^£?\d+(\.\d*)?p?$/;
		if (regexp.test(sInput)) {
			if (sInput.indexOf('£') > -1 || sInput.indexOf('.') > -1) {
				// Parse pounds
				return Math.round(parseFloat(sInput.indexOf('£') > -1 ? sInput.slice(1) : sInput).toFixed(2) * 100);
			} else {
				// Parse pennies
				return parseInt(sInput);
			}
		} else {
			return false;
		}
	};
	
	$scope.toggleEnhancements = function() {
		$scope.jValues.bShowEnhancements = !$scope.jValues.bShowEnhancements;
	};

});
