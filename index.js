// var treeData = {
//   name: "Top Node 1",
//   children: [
//     {
//       name: "Node 2 A",
//       children: [
//         {
//           name: "Node 3 A",
//         },
//         {
//           name: "Node 3 B",
//         },
//       ],
//     },
//     {
//       name: "Node 2 B",
//     },
//   ],
// };
const svg = d3.select("svg");

const width = window.innerWidth;
const height = window.innerHeight;

const treeLayout = d3.tree().size([height, width]);

svg.attr("width", width).attr("height", height);
//   .append("rect")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("rx", 40);

d3.json("data.json").then((data) => {
  const root = d3.hierarchy(data);
  const links = treeLayout(root).links();

  svg
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  //   console.log(links);
  //   console.log(data);
});
