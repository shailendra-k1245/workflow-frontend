
import { useState } from "react"
import { BiText } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { Handle, Position } from "reactflow"
import { saveTextNodeData } from "../../../Redux/action"
import "./TextNode.css"
export function TextNode() {
    const [text, setText] = useState("")
    const dispatch = useDispatch()
 
    // const onChange = useCallback((evt) => {
    //     console.log(evt.target.value);
    // }, []);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleClick = () => {
        dispatch(saveTextNodeData(text))
    }

    return (
        <>
            <Handle position={Position.Left} type='source'></Handle>
            <div className="textNode">
                <label htmlFor="text"><BiText /> <u>Text</u> </label>
                <input type='text' placeholder={'Show on output node'}
                    onChange={handleChange} />
                <button
                    onClick={handleClick}>Go</button>
            </div>
            <Handle position={Position.Right} type='target'></Handle>
        </>
    )
}