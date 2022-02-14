const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const hairstyleRoute = require('./hairstyle.route');
const packageRoute = require('./package.route');
const photoRoute = require('./photo.route');
const purchasedPackageRoute = require('./purchasedPackage.route');
const categoryRoute = require('./category.route');
const colorRoute = require('./color.route');
const transactionRoute = require('./transaction.route');
const docsRoute = require('./docs.route');
const appRoute = require('./app.route');
const modelRoute = require('./model.route');
const documentsRoute = require('./documents.route');
const settingsRoute = require('./settings.route');
const tutorialRoute = require('./tutorial.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  }, 
  {
    path: '/categorys',
    route: categoryRoute,
  }, 
  {
    path: '/transactions',
    route: transactionRoute,
  }, {
    path: '/colors',
    route: colorRoute,
  }, 
  {
    path: '/purchasedPackages',
    route: purchasedPackageRoute,
  }, 
  {
    path: '/packages',
    route: packageRoute,
  }, 
  {
    path: '/photos',
    route: photoRoute,
  }, 
 {
    path: '/tutorials',
    route: tutorialRoute,
  },  
  {
    path: '/hairstyles',
    route: hairstyleRoute,
  }, 
  {
    path: '/documents',
    route: documentsRoute,
  },
  {
    path: '/apps',
    route: appRoute,
  }, 
  {
    path: '/models',
    route: modelRoute,
  }, 
  {
    path:'/settings',
    route:settingsRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  }); 
}

module.exports = router;
