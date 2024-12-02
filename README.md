SignifyCRM Project:

What is the use of this Repo:

This repository contains a SignifyCRM project that serves as a basic template or starting point for building React applications.

Prerequisites: Before you start, ensure you have the following installed:

Node.js: Refer to nodejs.org to install Node.js
Installation Instructions:

Install dependencies:

npm install

This command installs all the necessary dependencies required for the project.

Configuration: Before building the project for production, ensure URLs are configured correctly:

1. development URL:
  In your development environment, typically found in "webpack.config.js" or a similar component file, set your development URL:
   const urlDev = "https://localhost:3000/";
   
2. Production URL:
   Before deploying to production, replace the placeholder production URL (urlProd) with your actual production deployment location. This can be done similarly in the same      
   "webpack.config.js" or a configuration file specific to your setup:
   const urlProd = "https://aamirhusnain.github.io/signifycrm/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
   
Ensure this change is made before building for production.
Open Dialog Redirect URL:

 Before deploying to production, replace the URL. This can be done similarly in the same "src\taskpane\components\SignifyCRM_Pages\LoginPage\SignifySignin.tsx".

    //  const redirectURL = "https://localhost:3000/assets/redirectLogin.html"
    const redirectURL = "https://aamirhusnain.github.io/signifycrm/assets/redirectLogin.html" // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT
Usage:

1. Start the application:

     npm start

This command runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

The page will automatically reload if you make changes to the source code.
You will also see any lint errors in the console.
Build the application for production:

npm run build

This command builds the app for production to the build folder. It optimizes the build for the best performance, minifies the files, and appends hashes to the filenames. Your app is now ready to be deployed to your production environment using the configured urlProd.