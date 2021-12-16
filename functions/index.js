const svg = d3
  .select("svg")
  .attr("height", 500)
  .attr("width", 800)
  .attr("transform", "translate(50,50)");

d3.json("data.json").then((data) => {
  console.log(data);
  const root = d3.hierarchy(data);
  console.log(root);
  const descendants = root.descendants();
  console.log(descendants);
  const links = root.links();
  console.log(links);
  const myTree = d3.tree().size([700, 450]);
  myTree(root);
  console.log(root.descendants());
});
