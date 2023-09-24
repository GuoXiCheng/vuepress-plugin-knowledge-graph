import { defineClientConfig } from '@vuepress/client'
import TestComponent from './components/test.vue';
import GraphContainer from './components/GraphContainer.vue';
import { createApp, onMounted } from 'vue';
import * as d3 from "d3";
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
            const rect = graphNodeContainer!.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const nodes = [
                { id: "note1", label: "Note 1" },
                { id: "note2", label: "Note 2" },
                { id: "note3", label: "Note 3" },
                { id: "note4", label: "Note 4" },
                { id: "note5", label: "Note 5" }
            ];

            const links = [
                { source: "note1", target: "note2" },
                { source: "note2", target: "note3" },
            ];
            const svg = d3.create('svg').attr('width', '100%').attr('height', '100%');
            svg.select('*').remove();

            const simulation = d3.forceSimulation(nodes as any)
                .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));

            const link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(links)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-width", 2);

            const node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("r", 10)
                .attr("fill", "#bababa");

            const nodeText = svg.selectAll(null)
                .data(nodes)
                .enter()
                .append("text")
                .text(d => d.label)
                .style("text-anchor", "middle")
                .style("font-size", 12)
                .style("fill", "black");

            node.call(d3.drag()
                .on("start", dragstarted as any)
                .on("drag", dragged as any)
                .on("end", dragended as any) as any);

            // 鼠标悬浮事件
            node.on("mouseover", function () {
                d3.select(this).style("cursor", "pointer");
            })

            node.on("mouseout", function () {
                d3.select(this).style("cursor", "default");
            })

            simulation.on("tick", ticked);

            function ticked() {
                link
                    .attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y)
                    .attr("x2", (d: any) => d.target.x)
                    .attr("y2", (d: any) => d.target.y);

                node
                    .attr("cx", (d: any) => d.x)
                    .attr("cy", (d: any) => d.y);

                nodeText
                    .attr("x", (d: any) => d.x as number)
                    .attr("y", (d: any) => d.y as number + 20)
            }

            function dragstarted(event: { active: any; }, d: { fx: any; x: any; fy: any; y: any; }) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event: { x: any; y: any; }, d: { fx: any; fy: any; }) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event: { active: any; }, d: { fx: null; fy: null; }) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            document.getElementById("graph-node")?.appendChild(svg.node() as Node);
        });
    }
});
