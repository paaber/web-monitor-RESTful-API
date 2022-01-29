/*
* Create and export confoguration variables
*
*/

// Conatiner for all environment 

const environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort':3000,
    'httpsPort':3001,
    'envName': 'staging'
};

// Production environment
environments.production = {
    'httpPort':5000,
    'httpsPort':5001,
    'envName': 'production'
};

// Determine which environment was passed at command-line argument

let currentEnvironment =  typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that thet current env is one of the envts above, if not, default to staging
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;