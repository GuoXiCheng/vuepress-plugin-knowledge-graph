import { TempFileKey } from "@temp/knowledge-graph-data";
import { KnowledgeGraphOption } from "knowledge-graph-types";
import { Page } from "vuepress";

export function getTempContent(...contents: Array<{ name: TempFileKey, value: any }>) {
    const temp = [];
    for (const content of contents) {
        let typeValue = content.value;
        switch(typeof content.value) {
            case 'string':
                typeValue = `'${content.value}'`;
                break;
            case 'object':
                typeValue = JSON.stringify(content.value);
                break;
            default:
                typeValue = content.value;
                break;
        }
        temp.push(`export const ${content.name} = ${typeValue}`);
    }
    return temp.join('\n');
}

export function getDocNodes(pages: Page[], options: KnowledgeGraphOption) {
    const regexPattern = /\/([^/]+)\.md$/;
    const nodes = pages.filter((item: Page) => {

        if (typeof (options.excludeReadme) === 'boolean'
            && options.excludeReadme === true
            && item.filePath?.toLowerCase().endsWith('readme.md')) {
            return false;
        }

        const match = item.filePath?.match(regexPattern);
        if (match == null) {
            return false;
        }

        if (Array.isArray(options.include) && options.include.length !== 0) {
            const isInclude = options.include.some(pattern => item.filePath?.startsWith(pattern));
            if (isInclude) return true;
        }

        if (Array.isArray(options.exclude) && options.exclude.length !== 0) {
            return !options.exclude.some(pattern => item.filePath?.includes(pattern));
        }
        return true;
    }).map((item: Page) => {
        const match = item.filePath?.match(regexPattern) as RegExpMatchArray;
        return {
            id: match[1], label: match[1]
        }
    });
    return nodes;
}