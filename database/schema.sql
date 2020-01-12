DROP DATABASE IF EXISTS nextlens;

CREATE DATABASE nextlens;

USE nextlens;

CREATE TABLE mounts
(
  id SMALLSERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  frameSize TEXT
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  email TEXT,
  password TEXT,
  mount INT REFERENCES mounts (id),
  about TEXT,
  place INT DEFAULT 0,
  profileImgUrl TEXT
)

CREATE TABLE categories
(
  id SMALLSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  relatedCategory SMALLINT
)

CREATE TABLE photos
(
  id SERIAL PRIMARY KEY,
  unsplashId TEXT NOT NULL UNIQUE,
  photographerName TEXT NOT NULL,
  downloadUrl TEXT NOT NULL,
  profileUrl TEXT NOT NULL,
  profileImageUrl TEXT NOT NULL,
  regularUrl TEXT NOT NULL,
  smallUrl TEXT NOT NULL,
  thumbUrl TEXT NOT NULL,
  category INT REFERENCES categories (id)
);

CREATE TABLE lenses
(
  id SMALLSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  focalStart DECIMAL(5, 2) NOT NULL,
  focalEnd DECIMAL(5, 2),
  aperatureStart DECIMAL(4, 2) NOT NULL,
  aperatureEnd DECIMAL(4, 2),
  flickrPoolUrl TEXT,
  amazonUrl TEXT,
  ebayUrl TEXT,
  prime BOOLEAN NOT NULL,
  mountId INT REFERENCES mounts (id)
);

CREATE TABLE user_likes
(
  userId INT NOT NULL REFERENCES users (id),
  photoId INT NOT NULL REFERENCES photos (id),
  liked BOOLEAN NOT NULL,
  category INT NOT NULL REFERENCES categories (id),
);

CREATE TABLE user_lenses
(
  userId INT NOT NULL REFERENCES users (id),
  lensId INT NOT NULL REFERENCES lenses (id)
);

CREATE TABLE lens_reviews
(
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users (id),
  lensId INT NOT NULL REFERENCES lenses (id),
  review TEXT NOT NULL,
  rating DECIMAL (1, 0) NOT NULL
);

INSERT into categories
  (name)
Values
  ('portrait'),
  ('wide'),
  ('aerial'),
  ('street');

INSERT into mounts
  (name, frameSize)
Values
  ('canon ef', 'full frame'),
  ('canon ef-s', 'APS-C'),
  ('nikon f fx', 'full frame'),
  ('nikon f dx', 'APS-C'),
  ('sony fe', 'full frame'),
  ('sony e', 'APS-C'),
  ('fuji x', 'APS-C');

INSERT into users
  (email, firstName, password, mount, about, profileImgUrl)
Values
  (
    'admin@gmail.com',
    'Admin Account',
    '123456',
    3,
    'Im the admin, create, designer, developer of this app!',
    'https://devonyu.com/images/pf2.jpg'
);

INSERT into photos
  (unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category)
Values
  (
    'Mn1Uopx7if8',
    'Pete Bellis',
    'https://unsplash.com/photos/Mn1Uopx7if8/download',
    'https://unsplash.com/@petebellis',
    'https://images.unsplash.com/profile-1499675345563-1d3df1bc26d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=5c8edc9350d4394a6e320c5445137524',
    'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=0b2e5a0516091883846c4ea32ec78490',
    'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=275eefe6f702362fb50b801f57885a30',
    'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=e03331431be01644c3368c79c51f9358',
    1
);

INSERT into lenses
  (name, mountId, brand, prime, focalStart, focalEnd, aperatureStart, aperatureEnd, flickrPoolUrl, amazonUrl, ebayUrl)
Values
  (
    'Canon 50mm F1.8 STM',
    2,
    'Canon',
    TRUE,
    50,
    NULL,
    1.8,
    NULL,
    'https://www.flickr.com/groups/2796512@N24/',
    'https://www.amazon.com/Canon-50mm-1-8-STM-Lens/dp/B00X8MRBCW',
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=canon+50mm+stm&_sacat=0'
);

INSERT into user_likes
  (userId, photoId, liked)
Values
  (1, 1, true);

INSERT into user_lenses
  (userId, lensId)
Values
  (1, 1);

INSERT into lens_reviews
  (userId, lensId, review, rating)
Values
  (1, 1, 'The lens is light, quiet, and has incredible build quality.  A vast improvement from the 50MM F1.8 II Nifty Fifty!', 9);

