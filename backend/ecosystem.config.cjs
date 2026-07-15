module.exports = {
    apps: [
        {
            name: "blog-api",
            script: "server.js",
            cwd: __dirname,
            instances: 1,
            exec_mode: "fork",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
