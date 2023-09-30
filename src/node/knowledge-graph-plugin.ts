import { fs, getDirname, path } from '@vuepress/utils'
import { App, Page } from "vuepress";
import { getTempContent } from '../util';
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
                const nodes = app.pages.filter((item: Page) => {
                    if (item.title.length === 0) return false;

                    if (Array.isArray(options.include) && options.include.length !== 0) {
                        const isInclude = options.include.some(pattern=>item.filePathRelative?.startsWith(pattern));
                        if (isInclude) return true;
                    }

                    if (Array.isArray(options.exclude) && options.exclude.length !== 0) {
                        return !options.exclude.some(pattern=>item.filePathRelative?.startsWith(pattern));
                    }
                    return true;
                }).map((item: any) => {
                    return {
                        id: item.title, label: item.title
                    }
                });
                await app.writeTemp('knowledge-graph-data.js', getTempContent({
                    name: 'docLinks', value: 'hh'
                }, {
                    name: 'docNodes', value: nodes
                }))
            }
        }
    }
}


export default knowledgeGraphPlugin;