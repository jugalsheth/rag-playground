export interface MockDocument {
  id: number;
  title: string;
  content: string;
  relevance: number;
}

export interface SampleQuery {
  query: string;
  context: string;
  expectedOutput: string;
  relevantDocs: number[];
}

export const mockDocuments: MockDocument[] = [
  {
    id: 1,
    title: "Introduction to RAG",
    content:
      "Retrieval Augmented Generation (RAG) is a technique that enhances LLM responses by retrieving relevant context from a knowledge base before generating answers. This improves accuracy and reduces hallucinations.",
    relevance: 0.95,
  },
  {
    id: 2,
    title: "Vector Embeddings Explained",
    content:
      "Vector embeddings are numerical representations of text that capture semantic meaning. Similar concepts are close together in vector space, enabling similarity search.",
    relevance: 0.87,
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    content:
      "Machine learning is a subset of AI that enables systems to learn from data without explicit programming. It includes supervised, unsupervised, and reinforcement learning.",
    relevance: 0.82,
  },
  {
    id: 4,
    title: "Neural Networks Overview",
    content:
      "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information.",
    relevance: 0.79,
  },
  {
    id: 5,
    title: "Transformer Architecture",
    content:
      "Transformers revolutionized NLP with attention mechanisms. They process sequences in parallel and capture long-range dependencies effectively.",
    relevance: 0.91,
  },
  {
    id: 6,
    title: "Knowledge Graphs",
    content:
      "Knowledge graphs represent information as entities and relationships. They enable structured querying and relationship traversal for complex queries.",
    relevance: 0.76,
  },
  {
    id: 7,
    title: "Hybrid Search Strategies",
    content:
      "Hybrid search combines semantic (vector) and keyword (BM25) search. Reciprocal Rank Fusion merges results for better coverage and accuracy.",
    relevance: 0.88,
  },
  {
    id: 8,
    title: "LLM Fine-tuning",
    content:
      "Fine-tuning adapts pre-trained models to specific tasks. It requires labeled data and computational resources but improves task-specific performance.",
    relevance: 0.73,
  },
];

export const sampleQueries: SampleQuery[] = [
  {
    query: "What is RAG?",
    context: "Technical explanation needed",
    expectedOutput:
      "RAG (Retrieval Augmented Generation) is a technique that enhances LLM responses by retrieving relevant context from a knowledge base before generating answers. This improves accuracy and reduces hallucinations by grounding responses in factual information.",
    relevantDocs: [1, 2, 5],
  },
  {
    query: "How do vector embeddings work?",
    context: "Understanding semantic search",
    expectedOutput:
      "Vector embeddings are numerical representations of text that capture semantic meaning. Similar concepts are close together in vector space, enabling similarity search. They're created using neural networks trained on large text corpora.",
    relevantDocs: [2, 5],
  },
  {
    query: "Explain neural networks",
    context: "Beginner-friendly explanation",
    expectedOutput:
      "Neural networks are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information. Each connection has a weight that adjusts during training to learn patterns.",
    relevantDocs: [3, 4],
  },
  {
    query: "What's the difference between vector and keyword search?",
    context: "Comparing search methods",
    expectedOutput:
      "Vector search uses semantic similarity in embedding space, finding conceptually similar content even without exact keyword matches. Keyword search (like BM25) matches exact terms. Hybrid search combines both for optimal results.",
    relevantDocs: [2, 7],
  },
  {
    query: "How do knowledge graphs improve RAG?",
    context: "Advanced RAG techniques",
    expectedOutput:
      "Knowledge graphs improve RAG by representing information as entities and relationships. They enable structured querying and relationship traversal, allowing systems to understand connections between concepts and retrieve more contextually relevant information.",
    relevantDocs: [6, 1],
  },
];

export function getRandomQuery(): SampleQuery {
  return sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
}

export function getDocumentsByIds(ids: number[]): MockDocument[] {
  return mockDocuments.filter((doc) => ids.includes(doc.id));
}

