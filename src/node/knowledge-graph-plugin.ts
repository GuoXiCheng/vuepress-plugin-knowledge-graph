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
                const regexPattern = /\/([^/]+)\.md$/;
                const nodes = app.pages.filter((item: Page) => {
                    const match = item.filePath?.match(regexPattern);
                    if (match == null) return false;

                    if (Array.isArray(options.include) && options.include.length !== 0) {
                        const isInclude = options.include.some(pattern=>item.filePath?.startsWith(pattern));
                        if (isInclude) return true;
                    }

                    if (Array.isArray(options.exclude) && options.exclude.length !== 0) {
                        console.log(item.filePath)
                        console.log(options.exclude.some(pattern=>item.filePath?.includes(pattern)))
                        return !options.exclude.some(pattern=>item.filePath?.includes(pattern));
                    }
                    return true;
                }).map((item: Page) => {
                    const match = item.filePath?.match(regexPattern) as RegExpMatchArray;
                    return {
                        id: match[1], label: match[1]
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