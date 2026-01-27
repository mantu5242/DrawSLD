import Konva from "konva"
import { useRef } from "react"

export const useHistory =({stageRef}) =>{
    const undoStack = useRef([])
    const redoStack = useRef([])

    const saveSnapshot = () => {
        console.log("save")
        if(!stageRef.current) return ;
        const json = stageRef.current.toJSON();
        undoStack.current.push(json);
        redoStack.current = []
    }

    const undo = () => {
        try{
            console.log(undoStack.current.length)
            if(undoStack.current.length === 0 || !stageRef.current) return;
            console.log("undo")
            const current = stageRef.current.toJSON();
            redoStack.current.push(current);
            const prev = undoStack.current.pop();
            stageRef.current.destroyChildren();
            const container = stageRef.current.container();
            Konva.Node.create(prev,container);
        }
        catch(error){
            console.log(error)
        }
    }

    const redo = () => {
        console.log("redo")
        if (redoStack.current.length === 0 || !stageRef.current) return;
        const current = stageRef.current.toJSON();
        undoStack.current.push(current);
        const next = redoStack.current.pop();
        stageRef.current.destroyChildren();
        const container = stageRef.current.container();
        Konva.Node.create(next, container);
    };

    return { saveSnapshot, undo, redo };

}
