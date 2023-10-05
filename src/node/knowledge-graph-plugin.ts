import { fs, getDirname, path } from '@vuepress/utils'
import { App, Page } from "vuepress";
import { getDocNodes, getTempContent } from '../utils';
import { KnowledgeGraphOption } from 'knowledge-graph-types';

const __dirname = getDirname(import.meta.url);
const knowledgeGraphPlugin = (options: KnowledgeGraphOption) => {
    return (app: App) => {
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
                await app.writeTemp('knowledge-graph-data.js', getTempContent({
                    name: 'docLinks', value: 'hh'
                }, {
                    name: 'docNodes', value: getDocNodes(app.pages,options)
                }))
            }
        }
    }
}


export default knowledgeGraphPlugin;