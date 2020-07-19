// const GooglePlusTokenStrategy = require('passport-google-plus-token');
// const GooglePlusTokenStrategy = require('passport-google-oauth20').Strategy;
// const GooglePlusTokenStrategy = require('passport-google-oauth').OAuthStrategy;

// const mongoose = require('mongoose');
// const User = require('../models/user');

// module.exports = function (passport) {
//   passport.use(new GooglePlusTokenStrategy({
//     clientID: '169647833877-are73fof36hcua7a51tq1lqq0tbbr9o9.apps.googleusercontent.com',
//     clientSecret: 'co5fHw2CzYAoqonYKRME2SRw',
//     callbackURL: 'auth/google/callback'
//   },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('AccessToken ' + accessToken)
//       console.log('RefreshToken ' + refreshToken)
//       console.log('Profile ' + profile)
//     }))

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });

// }


