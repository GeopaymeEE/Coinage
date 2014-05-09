coinage
=======

Coinage webapp used to split monetary amounts into coins.
Used Yeoman, Bower, Grunt, AngularJS, Jasmine/Karma. Scalable array of accepted coins used.

Unit tests from requirements:
- Accepted inputs are correctly sanitised and converted to pennies.
- Invalid inputs are correctly rejected.
- Valid inputs are converted to a number of pennies which can be re-totalled to initial amount.

Suggested enhancements:
- Use checkbox interface to allow/disallow certain coins.
- USe BDD tools to automate testing of behaviour of the interface.