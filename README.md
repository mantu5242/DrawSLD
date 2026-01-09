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