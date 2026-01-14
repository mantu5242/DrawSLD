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