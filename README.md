coinage
=======

Coinage webapp used to split monetary amounts into coins.
Used Yeoman, Bower, Grunt, AngularJS, Jasmine/Karma. Scalable array of accepted coins used.

Unit tests from requirements:
- Accepted inputs are correctly sanitised and converted to pennies.
- Invalid inputs are correctly rejected.
- Valid inputs are converted to a number of pennies which can be re-totalled to initial amount.

Suggested enhancements with more time to spend on project:
- Use checkbox interface to allow/disallow certain coins.
- Use BDD tools to automate testing of behaviour of the interface.
- Correct ordering of coins to be numeric instead of alphabetic (not specified in requirements)
- Fix bug caused by floating point issue - Convert £4.89 for evidence of JavaScript floating point error http://stackoverflow.com/questions/588004/is-floating-point-math-broken
