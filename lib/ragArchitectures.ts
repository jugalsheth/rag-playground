import {
  Search,
  Layers,
  Sparkles,
  RefreshCw,
  Network,
  GitBranch,
  Zap,
  Bot,
  LucideIcon,
} from "lucide-react";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type FlowStepType = "input" | "process" | "database" | "llm" | "output";

export interface FlowStep {
  id: string;
  label: string;
  type: FlowStepType;
  duration: number;
  description: string;
}

export interface RAGArchitecture {
  id: string;
  name: string;
  tagline: string;
  difficulty: Difficulty;
  description: string;
  useCases: string[];
  flowSteps: FlowStep[];
  codeSnippet: {
    python: string;
    typescript: string;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
  icon: LucideIcon;
  color: string;
}

export const ragArchitectures: RAGArchitecture[] = [
  {
    id: "naive-rag",
    name: "Naive RAG",
    tagline: "Simple vector similarity search",
    difficulty: "Beginner",
    description:
      "The simplest RAG approach: embed the query, search for similar vectors, and generate a response. Perfect for learning the fundamentals.",
    useCases: ["FAQ bots", "Simple knowledge bases", "Learning projects"],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question or request",
      },
      {
        id: "2",
        label: "Embed Query",
        type: "process",
        duration: 800,
        description: "Convert query to vector embedding",
      },
      {
        id: "3",
        label: "Search Vector DB",
        type: "database",
        duration: 1000,
        description: "Find similar documents using cosine similarity",
      },
      {
        id: "4",
        label: "Generate with LLM",
        type: "llm",
        duration: 1500,
        description: "LLM generates response using retrieved context",
      },
      {
        id: "5",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return final answer to user",
      },
    ],
    codeSnippet: {
      python: `from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# Initialize components
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)
llm = OpenAI()

# Create RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# Query
result = qa_chain.run("What is RAG?")`,
      typescript: `import { OpenAIEmbeddings } from "langchain/embeddings";
import { Chroma } from "langchain/vectorstores";
import { RetrievalQAChain } from "langchain/chains";

const embeddings = new OpenAIEmbeddings();
const vectorStore = await Chroma.fromDocuments(docs, embeddings);
const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());

const result = await chain.call({ query: "What is RAG?" });`,
    },
    pros: ["Easy to implement", "Fast", "Low cost", "Good for simple queries"],
    cons: [
      "Can miss context",
      "Limited reasoning",
      "No verification",
      "May retrieve irrelevant docs",
    ],
    bestFor: "Beginners learning RAG concepts and simple Q&A systems",
    icon: Search,
    color: "#00d4ff",
  },
  {
    id: "multimodal-rag",
    name: "Multimodal RAG",
    tagline: "Search across text, images, and more",
    difficulty: "Intermediate",
    description:
      "Extends RAG to handle multiple data types: text, images, audio, and video. Uses specialized encoders for each modality.",
    useCases: [
      "Image search",
      "Video understanding",
      "Product catalogs",
      "Medical imaging",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits text, image, or multimodal query",
      },
      {
        id: "2",
        label: "Multi-Modal Embedding",
        type: "process",
        duration: 1000,
        description: "Encode query using appropriate encoder (text/image/audio)",
      },
      {
        id: "3",
        label: "Search Image + Text DB",
        type: "database",
        duration: 1200,
        description: "Search across multiple vector stores",
      },
      {
        id: "4",
        label: "Generate Response",
        type: "llm",
        duration: 1500,
        description: "Vision-language model generates multimodal response",
      },
      {
        id: "5",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer with relevant media",
      },
    ],
    codeSnippet: {
      python: `from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from PIL import Image
import clip

# Encode image
image_encoder = clip.load("ViT-B/32")
image_features = image_encoder.encode_image(image)

# Encode text
text_encoder = OpenAIEmbeddings()
text_features = text_encoder.embed_query(query)

# Search multimodal vector store
results = multimodal_vectorstore.similarity_search(
    query_embedding=combined_features
)`,
      typescript: `import { OpenAIEmbeddings } from "langchain/embeddings";
import { CLIPModel } from "@xenova/transformers";

const imageEncoder = await CLIPModel.from_pretrained("openai/clip-vit-base-patch32");
const imageFeatures = await imageEncoder.encodeImage(image);

const textEncoder = new OpenAIEmbeddings();
const textFeatures = await textEncoder.embedQuery(query);

const results = await multimodalVectorStore.similaritySearch(combinedFeatures);`,
    },
    pros: [
      "Handles multiple data types",
      "Rich context",
      "Better for visual tasks",
    ],
    cons: [
      "More complex",
      "Higher compute cost",
      "Requires specialized models",
    ],
    bestFor: "Applications needing to search and understand images, videos, or audio",
    icon: Layers,
    color: "#a855f7",
  },
  {
    id: "hyde-rag",
    name: "HyDE RAG",
    tagline: "Hypothetical document embeddings",
    difficulty: "Intermediate",
    description:
      "Generates a hypothetical answer first, then uses that to search. Improves retrieval quality by better understanding query intent.",
    useCases: [
      "Complex queries",
      "Research assistance",
      "Technical documentation",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question",
      },
      {
        id: "2",
        label: "Generate Hypothetical Answer",
        type: "llm",
        duration: 1200,
        description: "LLM generates a hypothetical response",
      },
      {
        id: "3",
        label: "Embed Hypothetical Answer",
        type: "process",
        duration: 800,
        description: "Convert hypothetical answer to embedding",
      },
      {
        id: "4",
        label: "Search Vector DB",
        type: "database",
        duration: 1000,
        description: "Search using hypothetical answer embedding",
      },
      {
        id: "5",
        label: "Generate Final Response",
        type: "llm",
        duration: 1500,
        description: "Generate final answer with retrieved context",
      },
      {
        id: "6",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return final answer",
      },
    ],
    codeSnippet: {
      python: `from langchain.llms import OpenAI
from langchain.embeddings import OpenAIEmbeddings

# Step 1: Generate hypothetical answer
llm = OpenAI()
hypothetical_answer = llm.generate(
    f"Generate a hypothetical answer: {query}"
)

# Step 2: Embed the hypothetical answer
embeddings = OpenAIEmbeddings()
hypothetical_embedding = embeddings.embed_query(hypothetical_answer)

# Step 3: Search with hypothetical embedding
results = vectorstore.similarity_search_by_vector(hypothetical_embedding)

# Step 4: Generate final answer
final_answer = llm.generate(
    f"Context: {results}\\n\\nQuery: {query}"
)`,
      typescript: `const llm = new OpenAI();
const hypotheticalAnswer = await llm.generate(
  \`Generate a hypothetical answer: \${query}\`
);

const embeddings = new OpenAIEmbeddings();
const hypotheticalEmbedding = await embeddings.embedQuery(hypotheticalAnswer);

const results = await vectorStore.similaritySearchByVector(hypotheticalEmbedding);

const finalAnswer = await llm.generate(
  \`Context: \${results}\\n\\nQuery: \${query}\`
);`,
    },
    pros: [
      "Better retrieval quality",
      "Handles ambiguous queries",
      "More accurate results",
    ],
    cons: [
      "Slower (two LLM calls)",
      "Higher cost",
      "More complex pipeline",
    ],
    bestFor: "Complex queries where intent is unclear or ambiguous",
    icon: Sparkles,
    color: "#f59e0b",
  },
  {
    id: "corrective-rag",
    name: "Corrective RAG",
    tagline: "Self-correcting retrieval with feedback",
    difficulty: "Advanced",
    description:
      "Iteratively improves retrieval by using LLM feedback to refine search queries. Self-corrects when initial results are insufficient.",
    useCases: [
      "High-accuracy systems",
      "Research tools",
      "Legal/medical applications",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question",
      },
      {
        id: "2",
        label: "Initial Retrieval",
        type: "database",
        duration: 1000,
        description: "First search attempt",
      },
      {
        id: "3",
        label: "Evaluate Results",
        type: "llm",
        duration: 1200,
        description: "LLM checks if results are sufficient",
      },
      {
        id: "4",
        label: "Refine Query",
        type: "process",
        duration: 800,
        description: "Generate improved search query if needed",
      },
      {
        id: "5",
        label: "Re-retrieve",
        type: "database",
        duration: 1000,
        description: "Search again with refined query",
      },
      {
        id: "6",
        label: "Generate Response",
        type: "llm",
        duration: 1500,
        description: "Generate final answer",
      },
      {
        id: "7",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer",
      },
    ],
    codeSnippet: {
      python: `def corrective_rag(query, max_iterations=3):
    results = vectorstore.similarity_search(query)
    
    for i in range(max_iterations):
        # Evaluate if results are sufficient
        evaluation = llm.generate(
            f"Are these results sufficient? {results}"
        )
        
        if "sufficient" in evaluation.lower():
            break
            
        # Refine query
        refined_query = llm.generate(
            f"Refine this query for better results: {query}"
        )
        results = vectorstore.similarity_search(refined_query)
    
    return llm.generate(f"Context: {results}\\nQuery: {query}")`,
      typescript: `async function correctiveRAG(query: string, maxIterations = 3) {
  let results = await vectorStore.similaritySearch(query);
  
  for (let i = 0; i < maxIterations; i++) {
    const evaluation = await llm.generate(
      \`Are these results sufficient? \${results}\`
    );
    
    if (evaluation.toLowerCase().includes("sufficient")) break;
    
    const refinedQuery = await llm.generate(
      \`Refine this query for better results: \${query}\`
    );
    results = await vectorStore.similaritySearch(refinedQuery);
  }
  
  return await llm.generate(\`Context: \${results}\\nQuery: \${query}\`);
}`,
    },
    pros: [
      "Self-improving",
      "Higher accuracy",
      "Handles edge cases",
    ],
    cons: [
      "Slower (iterative)",
      "Higher cost",
      "Complex implementation",
    ],
    bestFor: "Applications requiring high accuracy and reliability",
    icon: RefreshCw,
    color: "#10b981",
  },
  {
    id: "graph-rag",
    name: "Graph RAG",
    tagline: "Knowledge graphs for structured retrieval",
    difficulty: "Advanced",
    description:
      "Uses knowledge graphs to understand relationships between entities. Better for complex, interconnected information.",
    useCases: [
      "Enterprise knowledge",
      "Scientific research",
      "Social networks",
      "Recommendation systems",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question",
      },
      {
        id: "2",
        label: "Extract Entities",
        type: "process",
        duration: 1000,
        description: "Identify entities and relationships in query",
      },
      {
        id: "3",
        label: "Query Knowledge Graph",
        type: "database",
        duration: 1200,
        description: "Traverse graph to find related entities",
      },
      {
        id: "4",
        label: "Retrieve Context",
        type: "database",
        duration: 800,
        description: "Get documents linked to graph entities",
      },
      {
        id: "5",
        label: "Generate Response",
        type: "llm",
        duration: 1500,
        description: "Generate answer using graph context",
      },
      {
        id: "6",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer with graph visualization",
      },
    ],
    codeSnippet: {
      python: `from neo4j import GraphDatabase
from langchain.graphs import Neo4jGraph

# Connect to knowledge graph
graph = Neo4jGraph(
    url="bolt://localhost:7687",
    username="neo4j",
    password="password"
)

# Query graph
cypher_query = """
MATCH (e:Entity)-[r:RELATES_TO]->(related:Entity)
WHERE e.name = $entity_name
RETURN e, r, related
"""

results = graph.query(cypher_query, {"entity_name": entity})

# Retrieve documents linked to entities
documents = graph.query(
    "MATCH (e:Entity)-[:HAS_DOCUMENT]->(d:Document) RETURN d"
)`,
      typescript: `import neo4j from "neo4j-driver";

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password"));
const session = driver.session();

const cypherQuery = \`
  MATCH (e:Entity)-[r:RELATES_TO]->(related:Entity)
  WHERE e.name = $entityName
  RETURN e, r, related
\`;

const results = await session.run(cypherQuery, { entityName: entity });

const documents = await session.run(
  "MATCH (e:Entity)-[:HAS_DOCUMENT]->(d:Document) RETURN d"
);`,
    },
    pros: [
      "Understands relationships",
      "Better for complex queries",
      "Structured knowledge",
    ],
    cons: [
      "Requires graph setup",
      "More complex",
      "Higher maintenance",
    ],
    bestFor: "Applications with rich entity relationships and structured knowledge",
    icon: Network,
    color: "#8b5cf6",
  },
  {
    id: "hybrid-rag",
    name: "Hybrid RAG",
    tagline: "Combine vector and keyword search",
    difficulty: "Intermediate",
    description:
      "Combines semantic (vector) search with keyword (BM25) search for better coverage. Best of both worlds.",
    useCases: [
      "General search",
      "E-commerce",
      "Documentation",
      "Enterprise search",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question",
      },
      {
        id: "2",
        label: "Vector Search",
        type: "database",
        duration: 1000,
        description: "Semantic similarity search",
      },
      {
        id: "3",
        label: "Keyword Search",
        type: "database",
        duration: 800,
        description: "BM25 keyword matching",
      },
      {
        id: "4",
        label: "Fuse Results",
        type: "process",
        duration: 600,
        description: "Combine and rank results (RRF)",
      },
      {
        id: "5",
        label: "Generate Response",
        type: "llm",
        duration: 1500,
        description: "Generate answer with fused context",
      },
      {
        id: "6",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer",
      },
    ],
    codeSnippet: {
      python: `from rank_bm25 import BM25Okapi
from langchain.vectorstores import Chroma

# Vector search
vector_results = vectorstore.similarity_search(query, k=10)

# Keyword search (BM25)
tokenized_docs = [doc.split() for doc in documents]
bm25 = BM25Okapi(tokenized_docs)
keyword_results = bm25.get_top_n(query.split(), documents, n=10)

# Reciprocal Rank Fusion (RRF)
def rrf(rank):
    return 1 / (60 + rank)

fused_results = fuse_results(vector_results, keyword_results, rrf)`,
      typescript: `import { BM25 } from "bm25";
import { Chroma } from "langchain/vectorstores";

const vectorResults = await vectorStore.similaritySearch(query, 10);

const bm25 = new BM25(documents);
const keywordResults = bm25.search(query, 10);

function rrf(rank: number): number {
  return 1 / (60 + rank);
}

const fusedResults = fuseResults(vectorResults, keywordResults, rrf);`,
    },
    pros: [
      "Best coverage",
      "Handles both semantic and exact matches",
      "Robust",
    ],
    cons: [
      "More complex",
      "Requires both systems",
      "Higher latency",
    ],
    bestFor: "General-purpose search where both semantic and keyword matching matter",
    icon: GitBranch,
    color: "#ec4899",
  },
  {
    id: "adaptive-rag",
    name: "Adaptive RAG",
    tagline: "Route queries intelligently",
    difficulty: "Advanced",
    description:
      "Intelligently routes queries: simple questions go directly to LLM, complex ones use RAG. Optimizes cost and latency.",
    useCases: [
      "Cost optimization",
      "Mixed complexity queries",
      "Production systems",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a question",
      },
      {
        id: "2",
        label: "Route Query",
        type: "process",
        duration: 800,
        description: "Classify query complexity",
      },
      {
        id: "3a",
        label: "Simple Path",
        type: "llm",
        duration: 1000,
        description: "Direct LLM response (no retrieval)",
      },
      {
        id: "3b",
        label: "Complex Path",
        type: "database",
        duration: 1000,
        description: "Retrieve context first",
      },
      {
        id: "4",
        label: "Generate Response",
        type: "llm",
        duration: 1500,
        description: "Generate answer",
      },
      {
        id: "5",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer",
      },
    ],
    codeSnippet: {
      python: `from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

def adaptive_rag(query):
    # Classify query complexity
    router = llm.generate(
        f"Classify this query as 'simple' or 'complex': {query}"
    )
    
    if "simple" in router.lower():
        # Direct LLM response
        return llm.generate(query)
    else:
        # Use RAG
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=vectorstore.as_retriever()
        )
        return qa_chain.run(query)`,
      typescript: `async function adaptiveRAG(query: string) {
  const router = await llm.generate(
    \`Classify this query as 'simple' or 'complex': \${query}\`
  );
  
  if (router.toLowerCase().includes("simple")) {
    return await llm.generate(query);
  } else {
    const qaChain = RetrievalQAChain.fromLLM(
      llm,
      vectorStore.asRetriever()
    );
    return await qaChain.call({ query });
  }
}`,
    },
    pros: [
      "Cost efficient",
      "Faster for simple queries",
      "Optimized routing",
    ],
    cons: [
      "Requires routing logic",
      "More complex",
      "Routing can fail",
    ],
    bestFor: "Production systems with mixed query complexity and cost constraints",
    icon: Zap,
    color: "#f97316",
  },
  {
    id: "agentic-rag",
    name: "Agentic RAG",
    tagline: "AI agents with tool use",
    difficulty: "Advanced",
    description:
      "Uses AI agents that can use tools, search multiple sources, and reason step-by-step. Most powerful but most complex.",
    useCases: [
      "Research assistants",
      "Complex problem solving",
      "Multi-step tasks",
      "Tool integration",
    ],
    flowSteps: [
      {
        id: "1",
        label: "User Query",
        type: "input",
        duration: 500,
        description: "User submits a complex task",
      },
      {
        id: "2",
        label: "Plan Steps",
        type: "llm",
        duration: 1200,
        description: "Agent creates execution plan",
      },
      {
        id: "3",
        label: "Execute Tools",
        type: "process",
        duration: 1500,
        description: "Agent uses tools (search, calculator, etc.)",
      },
      {
        id: "4",
        label: "Retrieve Context",
        type: "database",
        duration: 1000,
        description: "Search multiple sources",
      },
      {
        id: "5",
        label: "Reason & Generate",
        type: "llm",
        duration: 2000,
        description: "Agent reasons and generates response",
      },
      {
        id: "6",
        label: "Output",
        type: "output",
        duration: 300,
        description: "Return answer with reasoning trace",
      },
    ],
    codeSnippet: {
      python: `from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

tools = [
    Tool(
        name="Search",
        func=vectorstore.similarity_search,
        description="Search knowledge base"
    ),
    Tool(
        name="Calculator",
        func=calculator,
        description="Perform calculations"
    )
]

agent = initialize_agent(
    tools,
    llm,
    agent="zero-shot-react-description",
    verbose=True
)

result = agent.run(query)`,
      typescript: `import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicStructuredTool } from "langchain/tools";

const tools = [
  new DynamicStructuredTool({
    name: "Search",
    description: "Search knowledge base",
    func: async (input) => await vectorStore.similaritySearch(input.query),
  }),
  new DynamicStructuredTool({
    name: "Calculator",
    description: "Perform calculations",
    func: async (input) => calculate(input.expression),
  }),
];

const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  agentType: "zero-shot-react-description",
});

const result = await executor.call({ input: query });`,
    },
    pros: [
      "Most powerful",
      "Handles complex tasks",
      "Tool integration",
      "Reasoning capability",
    ],
    cons: [
      "Very complex",
      "Slower",
      "Higher cost",
      "Can hallucinate",
    ],
    bestFor: "Complex research tasks, multi-step problem solving, and tool-augmented applications",
    icon: Bot,
    color: "#06b6d4",
  },
];

export function getArchitectureById(id: string): RAGArchitecture | undefined {
  return ragArchitectures.find((arch) => arch.id === id);
}

