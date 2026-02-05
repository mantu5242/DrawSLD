// import Node_def from '../Hooks/UseNode'

const Node_def = {  
    PRS : {width:80, height: 50},
    QPS : {width: 100, height: 50},
    ESDV : {width: 60, height: 30},
    CONSUMER: {width: 50, height: 40},
    // BRANCH: {radius: 20},
    BRANCH: {width: 30, height:30},
    VALVE: {width:60, height: 30},
    SENSOR: {width:50, height: 30}
  }


export function ConvertSematicToLayout(input){
    // console.log(input)
    const nodes = input.nodes.map(n => ({...n}));
    const arrows = input.arrows.map(a => ({...a}));

    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

    // build graph....

    const adj = new Map();
    const indeg = new Map();

    nodes.forEach(n => {
        adj.set(n.id, [])
        indeg.set(n.id, 0)
    })

    arrows.forEach(a => {
        const v = a.start.attachedTo.nodeId;
        const u = a.end.attachedTo.nodeId;
        adj.get(u).push(v);
        indeg.set(v,indeg.get(u) + 1);
    });

    // find root of the graph
    const roots = nodes.filter(n => indeg.get(n.id) === 0).map(n => n.id)

    // BFS Layering
    const layer = new Map()
    const q = []
    roots.forEach(r => {layer.set( r, 0 )
        q.push(r)
    })

    while(q.length){
        const u = q.shift();
        for(const v of adj.get(u)){
            if(!layer.has(v)){
                layer.set(v,layer.get(u) + 1)
                q.push(v)
            }
        }
    }

    // console.log("layer -> ",layer)

    // assign width and height

    nodes.forEach(n => {
        const size = Node_def[n.type];
        n.width = size.width;
        n.height = size.height;
    })


    // computer x,y for nodes

    const layers = {}
    layer.forEach((l, id) => {
        layers[l] ??= []
        layers[l].push(id)
    })

    console.log(layers)
    const H_GAP = 200
    const V_GAP = 120
    const START_X = 100
    const START_Y = 300

    Object.entries(layers).forEach(([l, ids]) => {
        let y = START_Y - ((ids.length - 1) * V_GAP) / 2
        ids.forEach(id => {
        const n = nodeMap[id]
        n.x = START_X + l * H_GAP
        n.y = y
        y += V_GAP
        })
    })

    // resolving arrow sides and snap point

    arrows.forEach(a => {
        const from = nodeMap[a.start.attachedTo.nodeId]
        const to = nodeMap[a.end.attachedTo.nodeId]

        const dx = to.x - from.x
        const dy = to.y - from.y

        let startSide, endSide  

        if (Math.abs(dx) >= Math.abs(dy)) {
            startSide = dx >= 0 ? "right" : "left"
            endSide = dx >= 0 ? "left" : "right"
            } else {
            startSide = dy >= 0 ? "bottom" : "top"
            endSide = dy >= 0 ? "top" : "bottom"
            }

            const startPt = portPoint(from, startSide)
            const endPt = portPoint(to, endSide)

            a.start.x = startPt.x
            a.start.y = startPt.y
            a.start.attachedTo.side = startSide

            a.end.x = endPt.x
            a.end.y = endPt.y
            a.end.attachedTo.side = endSide
        })

        console.log({nodes, arrows})
    return { nodes, arrows }
}

function portPoint(node, side) {
  switch (side) {
    case "left":
      return { x: node.x, y: node.y + node.height / 2 }
    case "right":
      return { x: node.x + node.width, y: node.y + node.height / 2 }
    case "top":
      return { x: node.x + node.width / 2, y: node.y }
    case "bottom":
      return { x: node.x + node.width / 2, y: node.y + node.height }
  }
}