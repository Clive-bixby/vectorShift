import { useStore } from './store';

export const SubmitButton = () => {
    // Get nodes and edges directly from the store
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            // Extract only the necessary data for the backend
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id
                })),
                edges: edges.map(edge => ({
                    source: edge.source,
                    target: edge.target
                }))
            };

            console.log("Sending pipeline data:", pipelineData); // Debug log

            const response = await fetch("http://localhost:8000/pipelines/parse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received response:", data); // Debug log

            alert(
                `Pipeline Analysis:\n\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? "Yes" : "No"}`
            );
        } catch (error) {
            console.error("Error details:", error);
            alert("Failed to submit pipeline: " + error.message);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
                onClick={handleSubmit}
                type="button"
            >
                Submit
            </button>
        </div>
    );
};