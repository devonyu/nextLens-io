# NextLens.io
> Camera and Lens recommendations based on user's likes on pre-sorted and pre-screened images.  
>
[![Build Status][travis-image]][travis-url]

So you just started your photography journey by either purchasing your own DSLR or was generously gifted one!  You're beginning to master the basic functions of your favorite new toy but upon viewing images on Instagram/Flickr/Unsplash/etc, a lingering question burns into your mind:  "Why aren't my photos as aesthetic as theirs!? What camera and lens setup are they using for these exposures?!?".

Enter NextLens.io!  This app's primary objective will be to find camera and lens recommendations to our users.  By showcasing photos taken by specific metrics, the algorithm will suggest the optimal lens (camera would be the next feat on road map) to the user and showcase example photos taken with the recommended lens!

![MockupImage](https://devonyu.github.io/images/nextLensmockup.jpg)

## Usage example

New photographer is tired of their kit lens that came with the camera.  Although it is decent generalist lens, our user wants to create a more unique look.  Typical kit lens are normal zoom lenses that range from a 18-55mm (crop sensor) with average/slow variable apertures (Typically f/3.5-5.6).  For more 'bokeh' (focus on a specific subject with an intense blur of everything else - portraits are great for this), a lens with a faster aperture is needed (E.g. 1.4, 1.8, 2.8).  A lens with a longer focal length will increase the 'bokeh' and separation from subject and its background.  The app will give a user images to Like || Dislike to determine specific types of photos that a user maybe prefer (EXIF Data).  These images are very high quality as they are coming from the Unsplash API.  After collecting enough data (subject to the creation of the algorithm), the app will return a list of suggested lenses for the user.  This is the MVP portion of the project.

_For more examples and usage, please refer to the [Wiki][wiki]._

## Roadmap
See the [open issues](#bugs) for smaller things to work on.

### Currently Implemented:
- React styled with Semantic-UI React components rendering.
- NodeJS server basic setup with Express.
- NavBar set up.
- Calls to Unsplash Api for current splash page images.
- About Me section.
- Travis CI integration for automatic deployment on pushes to the master branch.
- Deployed to Heroku (The web app is a WIP, excuse the bugs for now).

### Planned:
- Create a full step by step wire framing / storyboard to optimize UX/UI to break down features.
- Create Tests for everything - TDD! (Mocha/Chai).  Travis CI will use these tests.
- Create Trello board to break down features to make it more manageable.
- Create algorithm to determine best lens for user (first with dummy data) - IMPORTANT.
- Create dummy data to test on Algorithm.
- Setup a sign-in process to persist data/likes for a user.
- Setup a PostgreSQL DB server with Heroku.
- Change the app's url away from the Herokuapp URL.
- Possible OAUTH integration with Facebook/Google for quick sign-ins.
- Possible Instagram integration to find photos base off of specific #hashtags.
- Flickr integration for gathering images for specific lenses and camera via their group pool images.
- Filtering system to limit price and specific metrics of lenses a user may want in their perceived recommendations.
- Sharing the web app to social media (FB/Google+/Instagram/Snapchat?/others).

### Possible Improvements on Current Features:
- Currently using 30 random images from Unsplash API for likes (some images dont have EXIF Data), By sorting images that do have EXIF data, we can filter the amount of calls needed to their API and not waste anytime/clicks.
- Alternatively, we can use an external API (IBM Watson / Microsoft Computer Vision /etc) to scan images for key terms on their likes and dislikes.  A NoSQL DB may be useful for this as the data may vary from image to image.

### Future features and goals:
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
- Rendering of images at current state depends on the users connection speeds - we can optimize the downloads based off of what device they are using (smaller images for phones vs larger for desktops).
- Rendering of images only occur when a Like || Dislike is clicked. Cache or Preload images can fix this immensely (How to optimize?)

## Local Development setup

Fork and clone the repo down to your local dev machine.  Npm install the dependencies from the package.json file.

```sh
npm install
```

Start the NodeJS server by going to the root folder and run the following.
We use nodemon to continuously watch the server index file for changes:

```sh
nodemon server
```

React Client UI - cd into the react-ui folder and run have webpack watch and compile a rendered page of the React App:

```sh
npm start
```


## Release History

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

- [nextLens.io](https://www.nextLens.io)
- [@nextlens](https://twitter.com/nextlens) 
- [Facbook.com/nextlens.io](https://www.facebook.com/nextlens.io)
- [Instagram.com/nextlens.io](https://www.instagram.com/nextlens.io/)
- [Flickr.com/photos/nextlens](https://www.flickr.com/photos/nextlens)
- [Tumblr.com/blog/nextlens](https://www.tumblr.com/blog/nextlens)

## Contact Information

 Devon Yu 
 
- [devonyu415@gmail.com](mailto:devonyu415@gmail.com?subject=Hello)
- [Twitter](https://twitter.com/devonyu_) 
- [Github](https://github.com/devonyu/)
- [LinkedIn](https://linkedin.com/in/devonyu)
- [Facebook](https://facebook.com/devonyu)
- [Instagram](https://instagram.com/devonyu)

## Contributing

1. Fork it (<https://github.com/devonyu/nextLens-io#fork-destination-box>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/devonyu/nextLens-io
[wiki]: https://github.com/devonyu/nextLens-io/wiki