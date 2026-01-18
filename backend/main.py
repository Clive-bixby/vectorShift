from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

class Node(BaseModel):
    id: str
    # Make other fields optional to accept React Flow node structure
    class Config:
        extra = "allow"  # Allow extra fields

class Edge(BaseModel):
    source: str
    target: str
    # Make other fields optional to accept React Flow edge structure
    class Config:
        extra = "allow"  # Allow extra fields

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # Handle empty graph
    if not nodes:
        return True
    
    adj = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        # Only process edges if both source and target exist in nodes
        if edge.source in adj and edge.target in indegree:
            adj[edge.source].append(edge.target)
            indegree[edge.target] += 1

    queue = [n for n in indegree if indegree[n] == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1
        for neighbor in adj.get(current, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag_result = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))