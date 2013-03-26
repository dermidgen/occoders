occoders
========

ABOUT
========
OC Coders is a community of developers living and/or working in Orange County, California. 

The intent of this community is to:

* Enable fellow developers to be aware of other developers
* Provide a discussion forum for news, events and relevant topics
* Help members in finding ideal projects or full time positions
* Help members in recruiting ideal vetted candidates

JOINING
========
In order to join the community, you will need to authenticate in with your github or bitbucket account. When you initially join you will have limited access until a senior member vets your ability to write code (not markup).

#Builds
The build system for the www uses jekyll to produce compressed, minified, static html/css/js for the site and client application.  There is also a Guard file that allows using guard to launch a local dev environment, monitor for changes, and restart dev components as needed. Guard may also be integrated with the LiveReload chrome extension to automatically reload the browser when needed.

##Requirements
 * jekyll
 * jekyll-press
 * guard
 * guard-shell
 * guard-livereload
 * rb-inotify