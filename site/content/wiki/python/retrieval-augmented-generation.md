---
title: "Retrieval-augmented generation"
order: 2
---

Sources:

-   [https://medium.com/data-and-beyond/vector-databases-a-beginners-guide-b050cbbe9ca0](https://medium.com/data-and-beyond/vector-databases-a-beginners-guide-b050cbbe9ca0)
-   [https://mallahyari.github.io/rag-ebook/intro.html](https://mallahyari.github.io/rag-ebook/intro.html)

### Use Cases

-   Recommendation system: similarity search between user behavior (input, etc.) and vector space
-   Real-time fraud detection
-   Market research: customer feedback -> text embeddings -> sentiment analysis and trend spotting

### Retrieval Component

Responsible for searching and retrieving relevant information. Using indexing, ranking and query expansion

### Generation Component

After relevant information is retrieved LLMs process the retrieved information and generates coherent and contextually accurate response to user queries.

### Interaction Loop

Retrieval-Augmented Generation often involves an interaction loop between the retrieval and generation components. The initial retrieval may not always return the perfect answer, so the generation component can refine and enhance the response iteratively by referring back to the retrieval results.

### Fine-Tuning

Successful implementation of this approach often requires fine-tuning LLMs on domain-specific data. Fine-tuning adapts the model to understand and generate content relevant to the specific knowledge domain, improving the quality of responses.

### Latent Space Representations

Retrieval models often convert documents and queries into latent space representations, making it easier to compare and rank documents based on their relevance to a query. These representations are crucial for efficient retrieval.

### Attention Mechanisms

Both the retrieval and generation components typically employ attention mechanisms. Attention mechanisms help the model focus on the most relevant parts of the input documents and queries, improving the accuracy of responses.

## Embeddings and Vector Databases for Retrieval in RAG

### Vector Embeddings

> Vector embeddings represent words, phrases, sentences, or even entire documents as points in a high-dimensional vector space. The key idea is to map each textual element into a vector in such a way that semantically similar elements are located close to each other in this space, while dissimilar elements are further apart. This geometric representation facilitates similarity calculations, clustering, and other operations.

-   often complex neural network: translating data into high.dimensional numerical vectors and effectively encode the data’s essential characteristics into vector embeddings

Examples:

-   Word Embeddings (Word2Vec, GloVe): Word embeddings represent individual words as vectors. For example, “king” and “queen” may be represented as vectors that are close together in the vector space because they share similar semantic properties.
-   Document Embeddings (Doc2Vec, BERT): Document embeddings map entire documents (such as PDFs) into vectors. Two documents discussing similar topics will have embeddings that are close in the vector space.

[https://weaviate.io/blog/vector-embeddings-explained](https://weaviate.io/blog/vector-embeddings-explained)

-   Semantic/similarity search is key. And more advanced compared to common search methods like keyword searhc or synonym search
-   The process of generating a vector for a data object is called vectorization and is done by machine learning models
    -   Word2vec: family of model architectures with “dense” vectors (all values are non-zero). NN model to learn word associations from a large corpus of text. First creates vocabulary -> learns vector representation (typically 300 dimensions). Is context agnostic.
    -   Transformer models (state-of-the-art, BERT, ELMo)

### Vector Databases

-   Efficiently store, index, and search high-dimensional data points (i.e. vectors).
-   Each entry is represented as a vector in a multi-dimensional space.
-   Vector databases excel at retrieving semantically similar data points
-   Vector databases are computationally intensive but scaleable.
-   With similarity search relevant vectors are retrieved.

> Vector databases, also known as similarity search engines or vector index databases, play a crucial role in the retrieval component of RAG by efficiently storing and retrieving these vector embeddings. They are specialized databases designed for retrieving vectors based on similarity, making them well-suited for scenarios where similarity between data points needs to be calculated quickly and accurately.

## RAG Pipeline Implementation

### prepare PDF extract text

-   text extraction tools: pyPDF2, pdf2txt, PDFMiner
-   Scanned Documents: Optical Character Recognition (OCR) software
-   Quality Control

### Multiple Pages

-   page segmentation: segment into logical units(paragraphs, section) ensure context is preserved
-   metadata extraction: document titles, authors, page numbers, creation dates.

### Text Cleanup and Normalization

-   Whitespace and Punctuation
-   Formatting removal
-   Spellchecking

### Generation part

The query from a user is embedded with the same embedding model into the vector space. Next using similarity measures the nearest vectors are retrieved. This information is than passed into a LLM as context to provided an answer to the query.

### Impact of Text splitting on RAG quality

#### Splitting by character

Advantages:

-   Fine-grained context

Challenges:

-   Long Sequences, token limitations
-   Increased Inference time

#### Splitting by Token

Advantages:

-   Token Efficiency
-   Balanced Context (meaningful, granularity)
-   Scalability

Challgenges:

-   Contextual information

### Impact of Metadata

Back to top
