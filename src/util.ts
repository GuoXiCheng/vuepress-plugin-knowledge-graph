import { TempFileKey } from "@temp/knowledge-graph-data";

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