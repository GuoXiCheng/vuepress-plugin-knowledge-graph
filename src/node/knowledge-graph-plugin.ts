import { fs, getDirname, path } from '@vuepress/utils'
import { App } from "vuepress";
const __dirname = getDirname(import.meta.url);
const knowledgeGraphPlugin = (app: App) => {
    return {
        name: 'vuepress-plugin-knowledge-graph',
        clientConfigFile: path.resolve(__dirname, '../client/config.js'),
        async onPrepared(app: App) {
            // const nodes = [
            //     { id: "note1", label: "Note 1" },
            //     { id: "note2", label: "Note 2" },
            //     { id: "note3", label: "Note 3" },
            //     { id: "note4", label: "Note 4" },
            //     { id: "note5", label: "Note 5" }
            // ];
            const nodes = app.pages.filter(item=>item.title.length !== 0).map(item=>({
                id: item.title, label: item.title
            }))
            await app.writeTemp('foo.js', `
                export const foo = ${JSON.stringify(nodes)}
            `);
        }
    }
}

export default knowledgeGraphPlugin;