import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
if(process.env.NODE_ENV !== 'production'){
    app.use(errorHandler())
}

/**
 * Start Express server.
 */
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'dev'

const server = app.listen(port, () => {
    console.log(
        `App is running at http://localhost: ${port} in ${env} mode`,
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;