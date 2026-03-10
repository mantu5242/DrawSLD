  const objectType = {
    1: "QPS",
    2: "OUTLETPIPE",
    3: "METER",
    4: "GB",
    5: "JOINT",
    6: "STREETREGULATOR",
    7: "REGULATOR",
    8: "CONSUMER",
    9: "FILLER",
    10: "REDUCER",
    11: "EVS",
    12: "PRESSURESENSOR",
    13: "TEMPERATURESENSOR"
  }

export function convertJson(rows){
    const nodes = []
    const arrows = []
    const nodeMap = {}
    const adj = {}
    let counter = 0;
    let countArrow = 1;

    rows.forEach(row => {
      const objType = Number(row.obj_ref_id);
      console.log(objType)
      if(objType !== 9 && objType >= -1 && objType !== 11){
        const nodeId = 'n' + row.id;
        console.log(row.temperature);
        const node = {
          id: nodeId,
          type: objectType[objType] || "unknown",
          x : 0,
          y : 0,
          width: 0,
          height: 0,
          readings: {
            pressure: row.pressure ? Number(row.pressure) : 1e9,
            
            temperature: row.temperature ? Number(row.temperature) : 1e9,
            volume: row.volume ? Number(row.volume) : 1e9,
          }
        };
        console.log(node)
        nodes.push(node);
        nodeMap[nodeId] = node;
        adj[nodeId] = [];
      }
    })
 

    rows.forEach(row => {
      // console.log(row)
      const objType = Number(row.obj_ref_id)
      if(objType !== 9){
        const parentId = "n" + row.parent_id;
        const childId = "n" + row.id;
        // console.log(parentId)
        if(adj[parentId] && nodeMap[childId]){
          adj[parentId].push(childId);
        }
      }
    })

    Object.entries(adj).forEach(([parent, children]) => {
      children.forEach(childId => {
        if(!nodeMap[parent] || !nodeMap[childId] ) return ;
        arrows.push({
          id: "a" + countArrow,
          start: {
            x : 0,
            y : 0,
            attachedTo: {
              nodeId : parent,
              side : "",
              index : 0
            }
          },
          end: {
            x : 0,
            y : 0, 
            attachedTo : {
              nodeId : childId,
              side: "",
              index: 0
            }
          },
          stroke: "#000",
          label: {
            text: "",
            t: 0.5,
            offset: { x: 0, y: 0 },
            visible: false,
            editing: false
          } 
        })
        countArrow++;
      })
    })

    return {nodes, arrows}
}