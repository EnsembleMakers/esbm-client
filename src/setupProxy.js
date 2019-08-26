const proxy = require("http-proxy-middleware");
const backend_host = process.env.REACT_APP_BACKEND_HOST;

module.exports = function(app) {
    app.use(
            proxy("/api", {
                target: backend_host,
                changeOrigin: true
            })
           );
    app.use(
            proxy("/auth", {
                target: backend_host,
                changeOrigin: true
            })
           );
    app.use(
            proxy("/img", {
                target: backend_host,
                changeOrigin: true
            })
           );
    };
