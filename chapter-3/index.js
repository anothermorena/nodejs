/* 
The difference between node common core modules and node package modules is that npm modules
are built,shared and maintained by the community of developers while the common core modules are
embedded into node directly.

NPM Packages naming conventions and an example:

^6.9.6

The first number is the major version number
The second number is the minor version number
The third number is a patch version
The carrot symbol means go ahead and update the minor and patch version. if you ommit the carrot symbol e.g. 6.9.6 
It basically says use only the specified version no upddates to it.

The tilda i.e. ~ like ~6.9.6 is saying go ahead and update a patch version only. It does not update the major and minor versions

An artirsk i.e. * means you can go ahead and update everything. Use the absolute latest version everytime. 
This is not too safe but you may see it being used.


Keep in mind that when you uninstall a package, it does not remove it from your scripts e.g. uninstalling nodemon as a dev dependency
and leaving the script that runs it might cause issues for you. So you should also remove any script that is associated with a dev
dependency as npm will only remove it from dev dependencies.
*/

const { format } = require('date-fns'); //fns here means date functions
const { v4: uuid } = require('uuid'); //this basically translates to import v4 from uuid as uuid

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid()); //this generates a new unique ID each time it is ran
