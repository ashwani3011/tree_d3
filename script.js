var treeData = {
  name: "Top Node 1",
  children: [
    {
      name: "Node 2 A",
      children: [
        {
          name: "Node 3 A",
        },
        {
          name: "Node 3 B",
        },
      ],
    },
    {
      name: "Node 2 B",
    },
  ],
};

let margin = { top: "50", right: "90", bottom: "50", left: "90" };
let height = 500;
let width = 800;

let svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("x", 100)
  .attr("y", 100);

var i = 0;
let duration = 750;
let root;

var treemap = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, function (d) {
  return d.children;
});

root.x0 = height / 2;
root.y0 = 0;

console.log("root", root);
treemap(root);

// update function - will wrap all the function

let update = (source) => {
  let treeData = treemap(root);

  //nodes
  var nodes = treeData.descendants();
  nodes.forEach(function (d) {
    d.y = d.depth * 180;
  });
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });
  //transition expanding from parrent
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on("click", click);
  nodeEnter
    .append("circle")
    .attr("class", "node")
    .attr("r", 1)
    .attr("fill", function (d) {
      return d._children ? "red" : "#fff";
    });

  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function (d) {
      return d.data.name;
    });

  var nodeUpdate = nodeEnter.merge(node);

  nodeUpdate
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  nodeUpdate
    .select("circle.node")
    .attr("r", 10)
    .style("fill", function (d) {
      return d._children ? "red" : "black";
    })
    .attr("cursor", "pointer");

  //remove node
  nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();
  //remove circle
  nodeExit.select("circle").attr("r", 0);
  nodeExit.select("text").style("fill-opacity", 0);

  //link

  function diagonal(s, d) {
    path = `M ${(s.y + d.y) / 2} ${s.x}
      C ${(s.y + d.y) / 2} ${d.x}
      ${d.y} ${d.x}
      `;
    return path;
  }
  var links = treeData.descendants().slice(1);
  var link = svg.selectAll("path.link").data(links, function (d) {
    return d.id;
  });
  var linkEnter = link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("d", function (d) {
      var o = {
        x: source.x0,
        y: source.y,
      };
      return diagonal(o, o);
    });

  var linkUpdate = linkEnter.merge(link);
  linkUpdate
    .transition()
    .duration(duration)
    .attr("d", function (d) {
      return diagonal(d, d.parent);
    });
  //storing old position for back transition collapse

  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

  function click(e, d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
};
update(root);
