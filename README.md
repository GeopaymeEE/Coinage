Coinage v1.01
=======

Coinage webapp used to split monetary amounts into coins.
Used Yeoman, Bower, Grunt, AngularJS, Jasmine/Karma. Scalable array of accepted coins used.

Unit tests from requirements:
- Accepted inputs are correctly sanitised and converted to pennies.
- Invalid inputs are correctly rejected.
- Valid inputs are converted to a number of pennies which can be re-totalled to initial amount.

v1.01
- Use checkbox interface to allow/disallow certain coins. Use [?] icon to toggle.
- Correct ordering of coins to be numeric instead of alphabetic (not specified in requirements)
- Fixed floating point bug

Suggested enhancements with more time to spend on project:

- Use BDD tools to automate testing of behaviour of the interface.
- Allow for multiple currencies controlled via configuration.
