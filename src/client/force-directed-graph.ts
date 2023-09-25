import * as d3 from "d3";

export default class ForceDirectedGraph {

    private width: number;
    private height: number;
    private nodes: Array<{id: string; label: string}>;
    private links: Array<{ source: string; target: string }>;


    constructor(
        container: HTMLElement,
        nodes: Array<{id: string; label: string}>,
        links: Array<{ source: string; target: string }>) {
        this.nodes = nodes;
        this.links = links;

        const react = container.getBoundingClientRect();
        this.width = react.width;
        this.height = react.height;
    }

    initialize() {
        const svg = d3.create('svg').attr('width', '100%').attr('height', '100%');
        svg.select('*').remove();

        const simulation = d3.forceSimulation(this.nodes as any)
            .force("link", d3.forceLink(this.links).id((d: any) => d.id).distance(100))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-width", 2);

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes)
            .enter().append("circle")
            .attr("r", 10)
            .attr("fill", "#bababa");

        const nodeText = svg.selectAll(null)
            .data(this.nodes)
            .enter()
            .append("text")
            .text((d: any) => d.label)
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

        return svg.node();
    }
}