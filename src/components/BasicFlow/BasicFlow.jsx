import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import "../../App.css"
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge
} from "reactflow";

import "reactflow/dist/style.css"
import { ApiNode, ConditionNode, OutputNode, PhonePrompt, StartNode, TemplateNode, TextNode } from "../CustomNodes/AllNodes/AllNodes"
import axios from "axios"
import { useSelector } from "react-redux";


const initialNodes = []
const initialEdges = []

export const BasicFlow = () => {
    const nodeTypes = useMemo(() => ({
        apiNode: ApiNode, conditionNode: ConditionNode, startNode: StartNode,
        textNode: TextNode, outputNode: OutputNode, templateNode: TemplateNode, phonePrompt: PhonePrompt
    }), [])

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const [workflowName, setWorkflowName] = useState('')
    const [workflowData, setWorkflowData] = useState([])
    const [nodesOrder, setNodesOrder] = useState([])
    const [username, setUsername] = useState("")

    const store = useSelector((store) => store)

    const handleStartNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'startNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
        }
        setNodes([...nodes, payload])

    }

    const handleTextNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'textNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: ""
        }
        setNodes([...nodes, payload])
    }

    const handleApiNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'apiNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
        }
        setNodes([...nodes, payload])
    }

    const handleConditionNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'conditionNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
            // execute: makeDecison()
        }
        setNodes([...nodes, payload])

    }

    const handleOutputNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'outputNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
        }
        setNodes([...nodes, payload])
    }

    const handleTemplateNode = () => {
        const payload = {
            id: uuidv4(),
            type: 'templateNode',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
        }
        setNodes([...nodes, payload])
    }

    const handlePhonePrompt = () => {
        const payload = {
            id: uuidv4(),
            type: 'phonePrompt',
            position: { x: 150, y: 120 },
            isAdded: false,
            data: {}
        }
        setNodes([...nodes, payload])
    }

    const saveWorkflow = () => {

        const flow = {
            id: uuidv4(),
            name: workflowName,
            initialEdges: edges,
            initialNodes: nodes,

        }

        axios.post('http://localhost:3001/addWorkflow', flow)
            .then(() => {
                getWorkflowData()
                    .then(() => loadWorkflow())
            })
    }

    const getWorkflowData = () => {
        axios.get("http://localhost:3001/allworkflows")
            .then((res) => {
                setWorkflowData(res.data)
            })
    }



    const loadWorkflow = (id) => {

        workflowData.forEach((el) => {
            if (el.db_id === id) {
                //camelcase converted to smallcase in postgres
                setNodes(el.initialnodes)
                setEdges(el.initialedges)


                // runWorkflow(el.nodesorder)
            }
        })
    }

    const runWorkflow = () => {
        console.log(nodes, edges)
        const payload = {
            nodes,
            edges,
            username,
            idx: 1
        }
        axios.post("http://localhost:3001/runWorkflowByOrder", payload)
    }

    const handleInput = (e) => {
        setWorkflowName(e.target.value)
    }

    const getNodesOrder = () => {
        edges.forEach((edgeEl, index) => {
            nodes.forEach((n1) => {

                if (edgeEl.target === n1.id && !n1.isAdded) {
                    const payload = {
                        id: n1.id,
                        type: n1.type,
                        data: n1.data,
                        status: ""
                    }
                    nodesOrder.push(payload)
                    setNodesOrder([...nodesOrder])
                    n1.isAdded = true
                    setNodes([...nodes])
                }
            })

            if (index === edges.length - 1) {
                nodes.forEach((n2) => {

                    if (edgeEl.source === n2.id && !n2.isAdded) {
                        const payload = {
                            id: n2.id,
                            type: n2.type,
                            data: n2.data,
                            status: ""
                        }
                        nodesOrder.push(payload)
                        setNodesOrder([...nodesOrder])
                        n2.isAdded = true
                        setNodes([...nodes])
                    }
                })
            }
        })
    }

    const handleNodeData = () => {
        nodes.forEach((el) => {
            if (el.selected === true && el.type === "textNode") {
                el.data = store.textNodeData
                console.log(el.data, "elData")
                setNodes([...nodes])
                nodesOrder.forEach((el2) => {
                    if (el.id === el2.id) {
                        el2.data = el.data
                        setNodesOrder([...nodesOrder])
                    }
                })
            }
        })

    }

    useEffect(() => {
        handleNodeData()
    }, [onNodesChange, store])

    // useEffect(() => {

    //     getNodesOrder()
    //     console.log("nodes", nodes)
    //     console.log("edges", edges)
    //     console.log("nodesOrder", nodesOrder)
    // }, [edges, onNodesChange])

    useEffect(() => {
        getWorkflowData()
    }, [])



    return <div className="basic-flow">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
        >
            <MiniMap />
            <Controls />
            <Background />
        </ReactFlow>
        <button
            onClick={handleStartNode}>Add start node
        </button>
        <button
            onClick={handleTextNode}>Add text node
        </button>
        <button
            onClick={handleApiNode}>Add Api node
        </button>
        <button
            onClick={handleConditionNode}>Add Condition node
        </button>
        <button onClick={handleTemplateNode}>Add list node</button>
        <button onClick={handlePhonePrompt}>Add Phone prompt</button>
        {/* <button onClick={handleOutputNode}>Add Output node</button> */}

        <div>
            <input type="text" placeholder="Name of workflow"
                onChange={handleInput} />
            <button onClick={saveWorkflow}>Save workflow</button>
        </div>
        <div>

            <input type="text" placeholder="enter username" onChange={(e) => { setUsername(e.target.value) }} />
            <button
                onClick={() => {
                    runWorkflow()
                }}>Run current flow

            </button>

            <br /> <br />
            <b>List of the workflows</b>

            {workflowData.map((el) => <p key={el.db_id} className="link"
                onClick={() => loadWorkflow(el.db_id)}>{el.name}
            </p>)}

        </div>

    </div>

}