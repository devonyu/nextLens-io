# NextLens.io
-----------------------------------------------

> Lens recommendations based on user's likes on pre-sorted and pre-screened images.
>

[![Build Status][travis-image]][travis-url] 
[![Coverage Status](https://coveralls.io/repos/github/devonyu/nextLens-io/badge.svg?branch=master)](https://coveralls.io/github/devonyu/nextLens-io?branch=master)

So you just started your photography journey by either purchasing your own DSLR or was generously gifted one!  You're beginning to master the basic functions of your favorite new toy but upon viewing images on Instagram/Flickr/Unsplash/etc, a lingering question burns into your mind:  "Why aren't my photos as aesthetic as theirs!? What camera and lens setup are they using for these exposures?!?".

Enter NextLens.io!  This app's primary objective will be to find camera and lens recommendations to our users.  By showcasing photos taken by specific metrics, the algorithm will suggest the optimal lens (camera would be the next feat on road map) to the user and showcase example photos taken with the recommended lens!

![MockupImage](https://devonyu.github.io/images/nextLensmockup.jpg)

## Usage example
-----------------------------------------------

New photographer is tired of their kit lens that came with the camera.  Although it is decent generalist lens, our user wants to create a more unique look.  Typical kit lens are normal zoom lenses that range from a 18-55mm (crop sensor) with average/slow variable apertures (Typically f/3.5-5.6).  For more 'bokeh' (focus on a specific subject with an intense blur of everything else - portraits are great for this), a lens with a faster aperture is needed (E.g. 1.4, 1.8, 2.8).  A lens with a longer focal length will increase the 'bokeh' and separation from subject and its background.  The app will give a user images to Like || Dislike to determine specific types of photos that a user maybe prefer (EXIF Data).  These images are very high quality as they are coming from the Unsplash API.  After collecting enough data (subject to the creation of the algorithm), the app will return a list of suggested lenses for the user.  This is the MVP portion of the project.

_For more examples and usage, please refer to the [Wiki][wiki]._

## Roadmap
-----------------------------------------------
See the [open issues](#bugs) for smaller things to work on.


## Flowchart
-----------------------------------------------
![FlowchartImage](https://github.com/devonyu/nextLens-io/blob/master/images/flowchart.jpg)



## Schema Design
-----------------------------------------------

![Schema](https://github.com/devonyu/nextLens-io/blob/master/images/schema.jpg)



## Tech Stack: 

-----------------------------------------------

- JavaScript ES6
- React
- NodeJS + Express
- PostgreSQL
- Semantic UI React
- Heroku
- Travis CI
- Unsplash API


### Currently Implemented:
-----------------------------------------------
- React Components styled with Semantic-UI
- NodeJS with Express running as our serverside logic
- PostgreSQL Database retaining user data
- Redis Store for saving user sessions based on cookies and a session store upon log-in/out
- Travis CI integration for automatic deployment on pushes to the master branch.
- Deployed to Heroku.
- MVP recommendation system running via Database queries and a simple ratio analysis on affinities
- Links to FlickR pages, eBay/Amazon links for sample lens recommendations added to API
- Profile page that lets user update their information
- Liked Images component that renders past likes


### Planned:
-----------------------------------------------
- Let users upload their own images for others to rate
- Create a dashboard for the platforms top likes, categories, lenses, reviews
- Let users add lenses to their collection and be able to write reviews
- Possible OAUTH integration with Facebook/Google for quick sign-ins.
- Possible Instagram integration to find photos base off of specific #hashtags.
- Filtering system to limit price and specific metrics of lenses a user may want in their perceived recommendations.
- Sharing the web app to social media (FB/Google+/Instagram/Snapchat?/others).



### Possible Improvements on Current Features:
-----------------------------------------------
- Currently using 30 random images from Unsplash API for likes (some images dont have EXIF Data), By sorting images that do have EXIF data, we can filter the amount of calls needed to their API and not waste anytime/clicks.
- Alternatively, we can use an external API (IBM Watson / Microsoft Computer Vision /etc) to scan images for key terms on their likes and dislikes.  A NoSQL DB may be useful for this as the data may vary from image to image.


### Future features and goals:
-----------------------------------------------
- Learn React Native and port the general functionality of web app to a mobile experience.
- Ability to upload user images to add to photos a user can 'Like || Dislike'.
- With the above feature, have a leaderboard (Daily/Weekly/Monthly/etc) for most user submitted likes.
- Ability to scale the app for when more users join and server load increases (Node Clustering/Message Bussing/Docker Images/Horizontal scaling/Load balancing).
- Implement caching for commonly liked images to show users top images.
- Implement a like to dislike ratio for images (see above).
- Monetization of app by creating affiliated links to the lens and camera recommendations (Basically to pay for Heroku costs).
- Implement AWS features like S3 to store user images or message bussing to prevent bottle necks.
- SOA Micro service architecture in the back-end to decouple the components.
- APM implementation to see where bottlenecks/issues are occurring before they bring down the entire system.



### Bugs:
-----------------------------------------------

- Rendering of images at current state depends on the users connection speeds - we can optimize the downloads based off of what device they are using (smaller images for phones vs larger for desktops).

-----------------------------------------------

## Local Development setup

-----------------------------------------------

Tools recommended for developing on this project include:

- NodeJS
- Yarn
- NPM
- NVM
- PostgresQL
- Redis
- React
- Code Editor (VS CODE Recommended)

### First install Xcode on your Mac via AppStore:
Once installed, agree to the terms
Install the command line tools for your OSX version + Xcode version (10.14, Xcode 10.1 Beta 2)

### Install Node via NVM:
(curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash)
Once NVM is installed, (check with nvm list)
Install LTS of Node 10.11
$ nvm install 10.11.0
$ nvm use 10.11.0
$ nvm alias default 10.11.0
Check installed with $ node -v

(Create a bash profile to persists information - touch ~/.bash_profile)

### Install latest NPM
$ npm install -g npm
Check installed with npm -v

### Install [Brew](https://brew.sh/) 
Requires the command line tools above
Check brew is installed brew -v

### Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) 
brew install yarn

(Optional to use iTerm2) https://iterm2.com/

### GIT SECTION.  Git should be installed once Xcode has been installed
Go to https://github.com/devonyu/nextLens-io
Fork the repo and clone your forked repo
Open your terminal and type
Git clone https://github.com/devonyu/nextLens-io.git || your forked version

Cd into the root nextLens-io folder and run ‘yarn install’ to install dependencies for back-end code

Open a new terminal window to set up the react UI client
Cd to react-ui folder
Run yarn install to install dependencies for front-end client
Run yarn start to set up react client, it will open a new window to display next lens 
If not, you can go to localhost:3000 in a browser (Chrome recommended).  You can also load it on different devices, (check the ‘On Your Network’ address and type that in on your wifi connected devices like mobile and tablet)

###  Install nodemon to continuously work on server code (it watches for any changes to server code)
(npm install -g nodemon)
Run nodemon on the root folder to set up the backend (will required additional steps first to work)

### Install Postgres
1. Install Postgres server
(https://postgresapp.com/) recommended - Postgres.app with PostgreSQL 11 (MAYBE)
Install and run it, click initialize. Heroku is running 10.5
Create a server that is running on Postgres 10.5


2. Install Postical and add credentials

### Install [Redis](https://medium.com/@djamaldg/install-use-redis-on-macos-sierra-432ab426640e)

Brew update
Brew install redis

Redis-server 
Redis-cli
Test if it working, type ping to the cli (should return pong)

- Tables
- Create in order
- Mounts
- Lenses
- Users
- Categories
- Userlikes
- Lens review
- User lens

Then load CSV files to import mock data (create a helper to do this with fake data)

Ensure all tables are created and sample data from csv are loaded to ensure working code.
Run the node utils.js in server folder to load sample images of 4 categories to DB photos table

### Install [VS CODE](https://code.visualstudio.com/)
Open up to the nextLens folder

### Create ENV file for links to API keys and secrets, Postgres heroku address and local DB addresses (Postgres port default is 5432)

### Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
brew install heroku/brew/heroku

### PROBLEM IN LOCAL DEV WAS WRONG POSTGRES ADDRESS AND SEQUENCE ID WAS OUT OF SYNC FOR USER ID
https://hcmc.uvic.ca/blogs/index.php?blog=22&p=8105&more=1&c=1&tb=1&pb=1
postgres://localhost:5432/nextlens'
// Use TEST_DATABASE for local development DB || DATABASE_URL for heroku DB

### Install Jest for testing

### Coveralls and Travis CI
Make sure Coveralls token is added, create a .coveralls.yml file and add your token to fix 

### Loadtesting
![LoadTest](https://github.com/devonyu/nextLens-io/blob/master/images/loadtest.png)

## Release History

-----------------------------------------------

<!-- * 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()` -->

* 0.0.4
    * Sign-in/Login Page MVP implemented
    * Option to toggle between landing page and photoliker
    * Env variables setup with Heroku and for Local development
    * README updates
* 0.0.3
    * README Major Update
    * Splash Page Implemented with about page
* 0.0.2
    * Travis CI integration completed for automatic deployment to Heroku with basic tests
* 0.0.1
    * Begin project

## Social Media

-----------------------------------------------

- [nextLens.io](https://www.nextLens.io)
- [@nextlens](https://twitter.com/nextlens) 
- [Facbook.com/nextlens.io](https://www.facebook.com/nextlens.io)
- [Instagram.com/nextlens.io](https://www.instagram.com/nextlens.io/)
- [Flickr.com/photos/nextlens](https://www.flickr.com/photos/nextlens)
- [Tumblr.com/blog/nextlens](https://www.tumblr.com/blog/nextlens)

## Contact Information

-----------------------------------------------

 Devon Yu 
 
- [devonyu415@gmail.com](mailto:devonyu415@gmail.com?subject=Hello)
- [Twitter](https://twitter.com/devonyu_) 
- [Github](https://github.com/devonyu/)
- [LinkedIn](https://linkedin.com/in/devonyu)
- [Facebook](https://facebook.com/devonyu)
- [Instagram](https://instagram.com/devonyu)

## Contributing

-----------------------------------------------

1. Fork it (<https://github.com/devonyu/nextLens-io#fork-destination-box>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/devonyu/nextLens-io
[wiki]: https://github.com/devonyu/nextLens-io/wiki