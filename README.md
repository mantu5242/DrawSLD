# DrawSLD

# Coordinates Systems
There are three Coordinate systems
1. Screen (DOM)  - relative the browser window
    (evt.clientX, evt.clientY)
2. Stage (Canvas World) - Relative to canvas
    stage.getPointerPosition()
3. Local(Node/Group) - Relative to its Parent
    like i have done for updating arrow -> arrow.x, arrow.y


# Stage Coordinates ----------------
when you zoom the stage(scale) , the screen position stays the same , but stage(world) coordinates changes



# Arrow Functionalities
1. Click on arrow to select
2. double click on arrow to add label

For Labeling the arrows ---->
Konva cannot be solely used, because the "Text" provided by the Konvajs is not editable, only it is readable.
So for Implementing, HTML is used, but there is one problem -> inside Konva, html cannot be render(DOM),
So the approach was to has textarea over the "text" of Conva.
And the HTML is written outside the Conva and positioned over the Konva Text (using Z- indexing);
Working -----------
1. on double click arrow, textarea will be visible and user give the label and Konva "text" will be updated with the written label.
json of - 
{
    id: `a${arrowCount++}`,
    start: { x: 240, y: 41, attachedTo: null },
    end: { x: 390, y: 41, attachedTo: null },
    stroke: "#000000",
    label: {
        text: "",
        t: 0.5, 
        offset: {x: 0, y: 0},  
        visible: false, 
        editing: false
    }
}



# Implementing a Feature of connecting two nodes via dragging a port of one node to another node port
1. first define the state and components
    eg - list  of nodes, connection(state), drawingLine(state), etc
2. Handle the Connection drag start
    -> initiate the line from the starting point
     get the absolute staring point
     start tracking the mouse movement and set the temporary line point
3. Draw the temporary line
4. Finalize or Cancel the connection



## Save/Load && Redo & Undo
If you want to save and load then you can use the konva methods like - for saving -> node.toJSON(), for Loading -> node.create()
** but this methods are usefull in very small apps.

# load json to produce SLD
It is very complex part to implement this using Konvajs inbuilt functions.
If one simple load the json of sld then it will produce the sld but it will be a snapshot because the javascript function cannot pass through, so...

BETTER APPROACH -----

shift from serializing the canvas stage to serializing the application stage.
Pattern -> state-driven pattern