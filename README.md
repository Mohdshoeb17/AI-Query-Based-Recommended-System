# AI-Query-Based-Recommended-System

# 🎬 AI Query-Based Movie Recommendation System

An AI-powered movie recommendation system that combines **Knowledge Graphs (Neo4j)**, **Vector Search (Pinecone)**, and **Google Gemini** to answer natural language movie queries with accurate, explainable, and context-aware responses.

Unlike traditional recommendation systems that rely only on embeddings, this project uses a **hybrid GraphRAG architecture**, enabling both **structured reasoning** and **semantic retrieval**.
---
# 🚀 Features

* 🧠 Natural language movie search
* 🔗 Knowledge Graph powered reasoning using Neo4j
* 🔍 Semantic similarity search using Pinecone
* 🤖 Google Gemini for entity extraction, query planning, and response generation
* ⚡ Hybrid Graph + Vector Retrieval (GraphRAG)
* 🎯 Accurate entity resolution with fuzzy matching
* 🔒 JWT Authentication
* 👤 User Login & Registration
* 📱 Responsive React Frontend
* ⚡ Redis integration for caching

---

# 🏗️ System Architecture

The project consists of two independent pipelines.

## 1. Offline Indexing Pipeline

The indexing pipeline runs only once while preparing the dataset.

```
Movie Dataset (PDF)
        │
        ▼
PDF Processing
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
Knowledge Graph   Vector Database
```

### Knowledge Graph Pipeline

```
Movie PDF
      │
      ▼
Google Gemini
(Entity Extraction)
      │
      ▼
Structured JSON
      │
      ▼
Neo4j Graph Builder
      │
      ▼
Knowledge Graph
```

Gemini extracts structured movie information such as

* Movies
* Actors
* Directors
* Genres
* Languages
* Ratings
* Relationships

The extracted JSON is converted into graph nodes and relationships using **MERGE**, preventing duplicate nodes.

---

### Vector Pipeline

```
Movie PDF
      │
      ▼
PDF Parser
      │
      ▼
Chunking
      │
      ▼
Gemini Embeddings
      │
      ▼
Pinecone Vector Store
```

Each movie chunk is converted into vector embeddings and stored inside Pinecone for semantic retrieval.

---

# 🧠 Query Pipeline

When a user asks a question, the following pipeline executes.

```
User Query
      │
      ▼
Entity Resolver
      │
      ▼
Resolved Entities
      │
      ▼
Query Classifier
      │
      ▼
 ┌──────────────┐
 │              │
 ▼              ▼
Graph Query   Similarity Query
 │              │
 ▼              ▼
Neo4j       Pinecone
 │              │
 └──────┬───────┘
        ▼
 Retrieved Context
        │
        ▼
Google Gemini
        │
        ▼
Final Response
```

---

# 🔍 Entity Resolution

Instead of directly executing a query, every entity is first resolved using the Knowledge Graph.

Example

User Query

```
Movies directed by Nolan
```

LLM extracts

```
"Nolan"
```

Graph Resolution

```
Christopher Nolan
Label : Director
```

The system now knows that **Nolan is a Director**, eliminating ambiguity before query execution.

Features

* Partial matching
* Exact match priority
* Multi-label search
* Graph-backed entity validation

---

# 🧠 Query Classification

After entity resolution, every query is classified into one of two categories.

## Graph Queries

Handled entirely using Neo4j.

Examples

* Movies directed by Christopher Nolan
* Action movies with Tom Hardy
* Tell me about Interstellar
* How is Leonardo DiCaprio related to Christopher Nolan?
* How many Sci-Fi movies exist?

---

## Similarity Queries

Handled using Pinecone Vector Search.

Examples

* Movies like Interstellar
* Recommend movies similar to Inception
* What should I watch after The Matrix?

---

# ⚡ Graph Query Engine

The graph engine performs

* Dynamic query planning
* Safe Cypher generation
* Read-only execution
* Relationship traversal
* Aggregation queries
* Multi-hop graph reasoning

Supported query types

* Factual
* Descriptive
* Relationship
* Aggregation
* Filtered search

---

# 🎯 Similarity Recommendation Engine

Similarity recommendations use both vector search and graph filtering.

Pipeline

```
Movie
   │
   ▼
Embedding
   │
   ▼
Pinecone Search
   │
   ▼
Top Similar Movies
   │
   ▼
Neo4j Genre Validation
   │
   ▼
Gemini Ranking
   │
   ▼
Top Recommendations
```

This significantly improves recommendation quality compared to pure vector search.

---

# 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Context API
* CSS

### Backend

* Node.js
* Express.js

### AI

* Google Gemini
* Gemini Embeddings

### Databases

* Neo4j
* Pinecone
* MongoDB

### Authentication

* JWT
* bcrypt

### Cache

* Redis

---

# 📂 Project Structure

```
AI-Query-Based-Recommended-System
│
├── frontend
│   ├── src
│   ├── context
│   └── package.json
│
├── backend
│   ├── auth
│   ├── data
│   ├── entity extraction
│   ├── graph builder
│   ├── vector store
│   ├── query classifier
│   ├── graph handler
│   ├── similarity handler
│   └── package.json
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Mohdshoeb17/AI-Query-Based-Recommended-System.git
```

Install frontend

```bash
cd frontend
npm install
npm run dev
```

Install backend

```bash
cd backend
npm install
npm start
```

Create a `.env` file containing

```
GEMINI_API_KEY=
PINECONE_API_KEY=
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=
MONGODB_URI=
JWT_SECRET=
REDIS_URL=
```

---

# 💡 Example Queries

* Movies directed by Christopher Nolan
* Sci-Fi movies starring Matthew McConaughey
* Movies similar to Inception
* Tell me about Interstellar
* Action movies released after 2018
* Leonardo DiCaprio movies
* Highest rated thriller movies
* Recommend movies like The Dark Knight

---

# ✨ Key Highlights

* Hybrid **GraphRAG** architecture
* Knowledge Graph + Vector Database integration
* Entity Resolution before query execution
* Dynamic Cypher generation
* Semantic Retrieval using Pinecone
* LLM-powered query planning
* Explainable recommendations
* Fuzzy entity matching
* Multi-hop graph reasoning
* Secure authentication using JWT
* Modular backend architecture

---

# 📈 Future Improvements

* Conversational memory
* Personalized recommendations
* Streaming responses
* Multi-language support
* Watch history analytics
* Collaborative filtering
* Hybrid ranking with user preferences

---

# 👨‍💻 Author

**Mohd Shoeb**

B.Tech, Electronics & Communication Engineering

National Institute of Technology (NIT) Srinagar

GitHub: https://github.com/Mohdshoeb17
