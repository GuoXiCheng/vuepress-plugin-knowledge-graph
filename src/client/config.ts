import { defineClientConfig } from '@vuepress/client'
import TestComponent from './components/test.vue';
import GraphContainer from './components/GraphContainer.vue';
import { createApp, onMounted } from 'vue';
import ForceDirectedGraph from './force-directed-graph';
import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { foo } from '@temp/foo'
export interface DocNode extends SimulationNodeDatum {
    id: string;
    label: string;
}

export interface DocLink extends SimulationLinkDatum<DocNode> {
    
}
export default defineClientConfig({
    enhance({ app }) {

    },
    setup() {
        // 在组件挂载后执行 DOM 操作
        onMounted(() => {
            const headerElement = document.getElementsByTagName('header')[0];
            const newElement = document.createElement('div');
            headerElement.appendChild(newElement);

            // 在新元素上创建子组件
            const instance = createApp(GraphContainer);
            instance.mount(newElement);


            const graphNodeContainer = document.getElementById("graph-node-container");
            const nodes = foo;

            const links: DocLink[] = [
                // { source: "note1", target: "note2" },
                // { source: "note2", target: "note3" },
                // { source: "note1", target: "note3" }
            ];

            if (graphNodeContainer) {
                const forceDirectedGraph = new ForceDirectedGraph(graphNodeContainer, nodes, links).initialize();
                if (forceDirectedGraph) {
                    document.getElementById("graph-node")?.appendChild(forceDirectedGraph);
                }
            }
        });
    }
});
