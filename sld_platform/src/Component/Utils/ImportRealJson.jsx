// import Node_def from '../Hooks/UseNode'

const Node_def = {  
    PRS : {width:80, height: 50},
    QPS : {width: 100, height: 50},
    ESDV : {width: 60, height: 30},
    CONSUMER: {width: 50, height: 40},
    REGULATOR: {width:60, height: 30},
    STREETREGULATOR: {width:60, height: 30},
    REDUCER: {width:60, height: 30},
    METER: {width:60, height: 30},
    GB: {width:60, height: 30},
    REGULATOR: {width:60, height: 30},
    BRANCH: {width: 30, height:30},
    VALVE: {width:60, height: 30},
    SENSOR: {width:50, height: 30},
    JOINT: {width: 30, height:30},
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
        adj.get(v).push(u);
        indeg.set(u,indeg.get(u)+1);
    });

    // console.log("adjency list = ",adj)
    // find root of the graph
    // console.log("indegree - ", indeg)
    const roots = nodes.filter(n => indeg.get(n.id) === 0).map(n => n.id)
    // console.log("rootNode - ",roots);

    // BFS Layering
    const layer = new Map()
    const q = []
    roots.forEach(r => {layer.set( r, 0 )
        q.push(r)
    })

    // console.log("queue",q);

    while(q.length){
        const u = q.shift();
        for(const v of adj.get(u)){
            if(!layer.has(v)){
                layer.set(v,layer.get(u) + 1)
                q.push(v)
            }
        }
    }


    // assign width and height
    // console.log(nodes)

    nodes.forEach(n => {
        const size = Node_def[n.type];
        // console.log("node width",n.type)
        // console.log("acutal", size.width)
        n.width = size.width;
        n.height = size.height;
    })


    // computer x,y for nodes

    const layers = {}
    layer.forEach((l, id) => {
        layers[l] ??= []
        layers[l].push(id)
    })

    // console.log("Layers - ",layers)
    const H_GAP = 200
    const V_GAP = 120
    const START_X = 100
    const START_Y = 300

    Object.entries(layers).forEach(([l, ids]) => {
        // console.log("l - ",l,"ids ",ids)
        let y = START_Y - ((ids.length - 1) * V_GAP) / 2
        // console.log("y",y);
        ids.forEach(id => {
            const n = nodeMap[id]
            n.x = START_X + l * H_GAP;
            n.y = y
            y += V_GAP
            // console.log("coordinates ",n.x,n.y)
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
        }
    )

    // resolve the position of the label of arrow
    arrows.forEach(a => {
        if(!a.label) return;
        const {x,y} = computeArrowLabelPosition(a);
        a.label.x = x;
        a.label.y = y;
        a.label.visible = true;
    })
    // console.log({nodes, arrows})
    return { nodes, arrows }
}

const portPoint = (node, side) => {
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


const computeArrowLabelPosition = (arrow) => {
    const x1 = arrow.start.x;
    const y1 = arrow.start.y;
    const x2 = arrow.end.x;
    const y2 = arrow.end.y;

    const t = arrow.label?.t ?? 0.5;
    const offset = arrow.label?.offset ?? {x:0 ,y:0};

    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const len = Math.hypot(dy,dx) || 1;

    const nx = -dy / len;
    const ny = dx / len;

    return {
        x : px + nx * offset.y + offset.x,
        y : py + ny * offset.y + offset.x
    }
}