'use strict';

oCoinageApp.controller('MainCtrl', function($scope) {
	
	// aCoins array can be modified to include any coins (eg. 5p and 10p coins missing from initial spec)
	$scope.aCoins = ['1p', '2p', '20p', '50p', '£1', '£2'];
	$scope.oPennySplits = {}; // Data model for view is built based on user input
	$scope.aPennyCoins = []; // Cached 'pennified' version of aCoins
	$scope.jValues = { // App values for binding
		iPennyValue: 0,
		sCoinageInput: '',
		sCoinageMessage: ''
	};
	$scope.year = new Date().getFullYear(); // Year for copyright display

	// Utility used to cache the 'pennified' version of coins array
	$scope.updatePennyCoinsArray = function() {
		$scope.aPennyCoins = [];
		for (var c = 0, cl = $scope.aCoins.length; c < cl; c++) {
			$scope.aPennyCoins.push($scope.convertToPennies($scope.aCoins[c]));
		}
	};

	// Event handler used to capture the submission of the form
	$scope.submitValue = function() {
		var iPennies = $scope.convertToPennies($scope.jValues.sCoinageInput);
		if (iPennies) {
			$scope.splitCoins(iPennies);
			$scope.jValues.iPennyValue = iPennies;
			$scope.jValues.sCoinageMessage = 'Converting ' + iPennies + ' pennies into coins.';
		} else {
			$scope.jValues.sCoinageMessage = 'Sorry, you have entered an incorrect format';
		}
	};

	// Used to create the data model for split coins from the user input.
	$scope.splitCoins = function(iAmount) {
		if (!$scope.aPennyCoins.length) { // Cache pennified array if neccesary
			$scope.updatePennyCoinsArray();
		}
		$scope.oPennySplits = {}; // reset data model
		var pcl = $scope.aPennyCoins.length;
		while (pcl--) {
			// Get highest coin count and store in data model
			var iCurrentCoinCount = Math.floor(iAmount / $scope.aPennyCoins[pcl]);
			if (iCurrentCoinCount) {
				$scope.oPennySplits[$scope.aCoins[pcl]] = iCurrentCoinCount;
			}
			// Pass remainder for next coin
			iAmount = iAmount % $scope.aPennyCoins[pcl];
		}
	};

	// Used to sanitise any string and convert to 'pennified' amount.
	$scope.convertToPennies = function(sInput) {
		var regexp = /^£?\d+(\.\d*)?p?$/, iNum;
		if (regexp.test(sInput)) {
			if (sInput.indexOf('£') > -1 || sInput.indexOf('.') > -1) {
				// Parse pounds
				return parseFloat(sInput.indexOf('£') > -1 ? sInput.slice(1) : sInput).toFixed(2) * 100;
			} else {
				// Parse pennies
				return parseInt(sInput);
			}
		} else {
			return false;
		}
	};

});
