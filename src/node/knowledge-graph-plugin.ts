import { getDirname, path } from '@vuepress/utils'
import { App } from "vuepress";
const __dirname = getDirname(import.meta.url);
const knowledgeGraphPlugin = (app: App) => {
    return {
        name: 'vuepress-plugin-knowledge-graph',
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        onPrepared() {
            console.log('vuepress-plugin-knowledge-graph onPrepared')
        }
    }
}

export default knowledgeGraphPlugin;