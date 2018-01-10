module.exports = {
    secret: process.env.NODE_ENV === 'production' ? 'smallscreen' : 'smallscreen',
    MONGODB_URI: process.env.NODE_ENV === 'production' ? 'mongodb://sscreen:sscreen@ds137686.mlab.com:37686/smallscreenprod' : 'mongodb://sscreen:sscreen@ds137256.mlab.com:37256/smallscreen',
    serverUrl: process.env.NODE_ENV === 'production' ? 'http://smallscreen.herokuapp.com/' : 'http://localhost:4200/',
};