import { HiOutlineTemplate } from "react-icons/hi"
import { Handle, Position } from "reactflow"
import "./TemplateNode.css"

const successHandleStyle = { top: 10 }
const fialureHandleStyle = { bottom: 10 }

export function TemplateNode() {
    return (
        <>
            <Handle position={Position.Left} type='source' />
            <div className="templateNode">
                <label htmlFor="text" >
                    <HiOutlineTemplate /> Whatsapp List :
                    <select>
                        <option>.</option>
                        <option>Product category</option>
                        <option>Vegetable</option>
                        <option>Groceries</option>
                    </select>
                </label>
            </div>
            <Handle position={Position.Right} id="a" style={successHandleStyle} type='target'>Success</Handle>
            <Handle position={Position.Right} id="b" style={fialureHandleStyle} type='target'>Fail</Handle>
        </>
    )
}