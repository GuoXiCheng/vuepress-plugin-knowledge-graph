import { App } from "vuepress";

const knowledgeGraphPlugin = (app: App) => {
    return {
        name: 'vuepress-plugin-knowledge-graph',
        onPrepared() {
            console.log('vuepress-plugin-knowledge-graph onPrepared')
        }
    }
}

export default knowledgeGraphPlugin;