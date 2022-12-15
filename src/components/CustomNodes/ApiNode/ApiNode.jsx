import { Handle, Position } from "reactflow"
import { BiCodeAlt } from "react-icons/bi"
import "./ApiNode.css"
const successHandleStyle = { top: 10 }
const fialureHandleStyle = { bottom: 10 }
export function ApiNode() {
    return (
        <>
            <Handle position={Position.Left} type='source'></Handle>
            <div className="apiNode">
                <label htmlFor="text"><BiCodeAlt /> Api:</label>
                {/* <input type='number' placeholder="lattitude" /> */}
                {/* <input type='number' placeholder="longitude" /> */}
                {/* <button >Go</button> */}
                <br />
                <select>
                    <option> . </option>
                    <option>Check new user</option>
                    <option>Check response</option>
                </select>
            </div>
            <Handle position={Position.Right} id="a" style={successHandleStyle} type='target'>Success</Handle>
            <Handle position={Position.Right} id="b" style={fialureHandleStyle} type='target'>Fail</Handle>
        </>
    )
}