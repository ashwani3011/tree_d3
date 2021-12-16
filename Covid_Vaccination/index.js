const svg = d3.select("svg");

const width = window.innerWidth;
const height = window.innerHeight;
const margin = { top: 50, right: 350, bottom: 50, left: 350 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

d3.json("data.json").then((data) => {
  const treeLayout = d3.tree().size([innerHeight, innerWidth]);

  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const root = d3.hierarchy(data);

  treeLayout(root);
  const links = root.links();
  const descendants = root.descendants();

  g.selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    )
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", "#b7cbeb");

  g.selectAll("text")
    .data(descendants)
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("dy", "0.32em")
    .attr("dx", "0.92em")
    // .attr("text-anchor", "middle")
    .attr("text-anchor", (d) => (d.children ? "left" : "start"))
    .attr("y", (d) => d.x)
    .text((d) => `${d.data.name} : ${d.data.tv}`)
    .attr("font-size", 18)
    .attr("font-weight", "bold");

  g.selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      console.log(d);
      return d.y;
    })
    .attr("cy", (d) => d.x)
    .attr("r", 5)
    .attr("fill", "#b7cbeb")
    .attr("stroke", "black")
    .attr("stroke-width", 2);
});
