const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
    static init(app) {
        this.app = app;
        this.initLoadRouters();
        this.loadConfig();
    }

    static loadConfig(path = '') {
        const configPath = path || '../config/config.js';
        const config = require(configPath);
        global.config = config;
    }

    static initLoadRouters() {
        requireDirectory(module, '../app/api', {
            visit: (obj) => {
                if (obj instanceof Router) {
                    InitManager.app.use(obj.routes());
                }
            }
        });
    }
}

module.exports = InitManager;
