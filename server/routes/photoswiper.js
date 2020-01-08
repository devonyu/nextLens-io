const express = require("express");
const db = require("../../database/db");

const router = express.Router();
const categories = ["portrait", "landscape", "aerial", "street"];

async function getPhotosForSwiper(category, index, amount) {
  const info = { category, amount, index };
  const photosFromDB = await db.getPhotosFromIndex(info);
  if (photosFromDB.status === false) {
    console.log("Error in getting photos for PS");
  } else if (photosFromDB) {
    // console.log(`Recieved ${photosFromDB.length} images for PS`);
    return photosFromDB;
  } else {
    console.log("error in retrieving photos for PS!");
  }
  return null;
}

async function getLatestUserAffinities(userId) {
  const info = { userId };
  const userAffinitiesFromDB = await db.getLastSeenImages(info);
  if (!userAffinitiesFromDB) {
    console.log("Error in getting photos for PS");
  } else if (userAffinitiesFromDB) {
    console.log(`Recieved ${userAffinitiesFromDB.length} affinities for PS`);
    return userAffinitiesFromDB;
  } else {
    console.log("error in retrieving photos for PS!");
  }
  return null;
}

router
  .get("/", (req, res) => {
    console.log(req.params);
    res.send(
      "You have reached the users route, supply ID and authentication to continue"
    );
  })
  .get("/:id", (req, res) => {
    console.log(
      "userId ===>",
      req.session.key,
      " Authenticated? ===>",
      req.session.auth === true
    );
    res.send({ "Getting PhotoSwiper Data for user": req.params.id });
  })
  .get("/:id/getphotos", async (req, res) => {
    const userId = (await req.session.key) || req.params.id;
    const userData = await getLatestUserAffinities(userId);
    console.log(`User Latestest Affinities: ${userData}`);
    const resultPromises = userData.map(async userAffinty => {
      const category = categories[userAffinty.category - 1];
      const promise = await getPhotosForSwiper(
        category,
        userAffinty.indexlastseen,
        10
      );
      return [promise, category];
    });
    Promise.all(resultPromises)
      .then(finalImages => {
        const formatedData = finalImages.reduce(
          (result, imageArr) => ({
            ...result,
            [imageArr[1]]: imageArr[0]
          }),
          {}
        );
        res.status(200).send(formatedData);
      })
      .catch(e => {
        console.log("there were errors ==>", e);
        res.status(400).send({ status: false });
      });
  });

module.exports = router;
