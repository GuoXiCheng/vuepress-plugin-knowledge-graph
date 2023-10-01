declare module '@temp/knowledge-graph-data' {
    import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
    export interface DocNode extends SimulationNodeDatum {
        id: string;
        label: string;
    }
    export interface DocLink extends SimulationLinkDatum<DocNode> {
    
    }
    export type TempFileKey = 'docNodes' | 'docLinks';
    export const docNodes: DocNode[];
    export const docLinks: DocLink[];
}

declare module 'knowledge-graph-types' { 
    export type KnowledgeGraphOption = {
        include?: string[],
        exclude?: string[],
        excludeReadme?: boolean
    }
}

