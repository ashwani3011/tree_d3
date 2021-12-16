const svg = d3
  .select("svg")
  .attr("height", 500)
  .attr("width", 800)
  .attr("transform", "translate(50,50)");

d3.json("data.json").then((data) => {
  const root = d3.hierarchy(data);

  const descendants = root.descendants();

  const links = root.links();

  const myTree = d3.tree().size([700, 450]);
  myTree(root);

  //Generating Nodes
  svg
    .selectAll(".node")
    .data(descendants)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .attr("fill", "black")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y + 5);

  svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr(
      "d",
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
    )
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  svg
    .selectAll("text")
    .data(descendants)
    .enter()
    .append("text")
    .attr("class", "name")
    .text((d) => d.data.name)
    .attr("dy", "0.72em")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("font-size", 18);
});
