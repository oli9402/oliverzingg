---
title: "Retrieval-augmented generation"
order: 2
format: "html"
---
<p>Sources:</p>
<ul>
<li><a href="https://medium.com/data-and-beyond/vector-databases-a-beginners-guide-b050cbbe9ca0" class="uri" target="_blank" rel="noopener">https://medium.com/data-and-beyond/vector-databases-a-beginners-guide-b050cbbe9ca0</a></li>
<li><a href="https://mallahyari.github.io/rag-ebook/intro.html" class="uri" target="_blank" rel="noopener">https://mallahyari.github.io/rag-ebook/intro.html</a></li>
</ul>
<section id="use-cases" class="level2">
<h3 class="anchored" data-anchor-id="use-cases">Use Cases</h3>
<ul>
<li>Recommendation system: similarity search between user behavior (input, etc.) and vector space</li>
<li>Real-time fraud detection</li>
<li>Market research: customer feedback -&gt; text embeddings -&gt; sentiment analysis and trend spotting</li>
</ul>
</section>
<section id="key-components" class="level1">

<section id="retrieval-component" class="level2">
<h3 class="anchored" data-anchor-id="retrieval-component">Retrieval Component</h3>
<p>Responsible for searching and retrieving relevant information. Using indexing, ranking and query expansion</p>
</section>
<section id="generation-component" class="level2">
<h3 class="anchored" data-anchor-id="generation-component">Generation Component</h3>
<p>After relevant information is retrieved LLMs process the retrieved information and generates coherent and contextually accurate response to user queries.</p>
</section>
<section id="interaction-loop" class="level2">
<h3 class="anchored" data-anchor-id="interaction-loop">Interaction Loop</h3>
<p>Retrieval-Augmented Generation often involves an interaction loop between the retrieval and generation components. The initial retrieval may not always return the perfect answer, so the generation component can refine and enhance the response iteratively by referring back to the retrieval results.</p>
</section>
<section id="fine-tuning" class="level2">
<h3 class="anchored" data-anchor-id="fine-tuning">Fine-Tuning</h3>
<p>Successful implementation of this approach often requires fine-tuning LLMs on domain-specific data. Fine-tuning adapts the model to understand and generate content relevant to the specific knowledge domain, improving the quality of responses.</p>
</section>
<section id="latent-space-representations" class="level2">
<h3 class="anchored" data-anchor-id="latent-space-representations">Latent Space Representations</h3>
<p>Retrieval models often convert documents and queries into latent space representations, making it easier to compare and rank documents based on their relevance to a query. These representations are crucial for efficient retrieval.</p>
</section>
<section id="attention-mechanisms" class="level2">
<h3 class="anchored" data-anchor-id="attention-mechanisms">Attention Mechanisms</h3>
<p>Both the retrieval and generation components typically employ attention mechanisms. Attention mechanisms help the model focus on the most relevant parts of the input documents and queries, improving the accuracy of responses.</p>
</section>
</section>
<section id="embeddings-and-vector-databases-for-retrieval-in-rag" class="level1">
<h2>Embeddings and Vector Databases for Retrieval in RAG</h2>
<section id="vector-embeddings" class="level2">
<h3 class="anchored" data-anchor-id="vector-embeddings">Vector Embeddings</h3>
<blockquote class="blockquote">
<p>Vector embeddings represent words, phrases, sentences, or even entire documents as points in a high-dimensional vector space. The key idea is to map each textual element into a vector in such a way that semantically similar elements are located close to each other in this space, while dissimilar elements are further apart. This geometric representation facilitates similarity calculations, clustering, and other operations.</p>
</blockquote>
<ul>
<li>often complex neural network: translating data into high.dimensional numerical vectors and effectively encode the data’s essential characteristics into vector embeddings</li>
</ul>
<p>Examples:</p>
<ul>
<li>Word Embeddings (Word2Vec, GloVe): Word embeddings represent individual words as vectors. For example, “king” and “queen” may be represented as vectors that are close together in the vector space because they share similar semantic properties.</li>
<li>Document Embeddings (Doc2Vec, BERT): Document embeddings map entire documents (such as PDFs) into vectors. Two documents discussing similar topics will have embeddings that are close in the vector space.</li>
</ul>
<p><a href="https://weaviate.io/blog/vector-embeddings-explained" class="uri" target="_blank" rel="noopener">https://weaviate.io/blog/vector-embeddings-explained</a></p>
<ul>
<li>Semantic/similarity search is key. And more advanced compared to common search methods like keyword searhc or synonym search</li>
<li>The process of generating a vector for a data object is called vectorization and is done by machine learning models
<ul>
<li>Word2vec: family of model architectures with “dense” vectors (all values are non-zero). NN model to learn word associations from a large corpus of text. First creates vocabulary -&gt; learns vector representation (typically 300 dimensions). Is context agnostic.</li>
<li>Transformer models (state-of-the-art, BERT, ELMo)</li>
</ul></li>
</ul>
</section>
<section id="vector-databases" class="level2">
<h3 class="anchored" data-anchor-id="vector-databases">Vector Databases</h3>
<ul>
<li>Efficiently store, index, and search high-dimensional data points (i.e.&nbsp;vectors).</li>
<li>Each entry is represented as a vector in a multi-dimensional space.</li>
<li>Vector databases excel at retrieving semantically similar data points</li>
<li>Vector databases are computationally intensive but scaleable.</li>
<li>With similarity search relevant vectors are retrieved.</li>
</ul>
<blockquote class="blockquote">
<p>Vector databases, also known as similarity search engines or vector index databases, play a crucial role in the retrieval component of RAG by efficiently storing and retrieving these vector embeddings. They are specialized databases designed for retrieving vectors based on similarity, making them well-suited for scenarios where similarity between data points needs to be calculated quickly and accurately.</p>
</blockquote>
</section>
</section>
<section id="rag-pipeline-implementation" class="level1">
<h2>RAG Pipeline Implementation</h2>
<section id="prepare-pdf-extract-text" class="level2">
<h3 class="anchored" data-anchor-id="prepare-pdf-extract-text">prepare PDF extract text</h3>
<ul>
<li>text extraction tools: pyPDF2, pdf2txt, PDFMiner</li>
<li>Scanned Documents: Optical Character Recognition (OCR) software</li>
<li>Quality Control</li>
</ul>
</section>
<section id="multiple-pages" class="level2">
<h3 class="anchored" data-anchor-id="multiple-pages">Multiple Pages</h3>
<ul>
<li>page segmentation: segment into logical units(paragraphs, section) ensure context is preserved</li>
<li>metadata extraction: document titles, authors, page numbers, creation dates.</li>
</ul>
</section>
<section id="text-cleanup-and-normalization" class="level2">
<h3 class="anchored" data-anchor-id="text-cleanup-and-normalization">Text Cleanup and Normalization</h3>
<ul>
<li>Whitespace and Punctuation</li>
<li>Formatting removal</li>
<li>Spellchecking</li>
</ul>
</section>
<section id="generation-part" class="level2">
<h3 class="anchored" data-anchor-id="generation-part">Generation part</h3>
<p>The query from a user is embedded with the same embedding model into the vector space. Next using similarity measures the nearest vectors are retrieved. This information is than passed into a LLM as context to provided an answer to the query.</p>
</section>
<section id="impact-of-text-splitting-on-rag-quality" class="level2">
<h3 class="anchored" data-anchor-id="impact-of-text-splitting-on-rag-quality">Impact of Text splitting on RAG quality</h3>
<section id="splitting-by-character" class="level3">
<h4 class="anchored" data-anchor-id="splitting-by-character">Splitting by character</h4>
<p>Advantages:</p>
<ul>
<li>Fine-grained context</li>
</ul>
<p>Challenges:</p>
<ul>
<li>Long Sequences, token limitations</li>
<li>Increased Inference time</li>
</ul>
</section>
<section id="splitting-by-token" class="level3">
<h4 class="anchored" data-anchor-id="splitting-by-token">Splitting by Token</h4>
<p>Advantages:</p>
<ul>
<li>Token Efficiency</li>
<li>Balanced Context (meaningful, granularity)</li>
<li>Scalability</li>
</ul>
<p>Challgenges:</p>
<ul>
<li>Contextual information</li>
</ul>
</section>
</section>
<section id="impact-of-metadata" class="level2">
<h3 class="anchored" data-anchor-id="impact-of-metadata">Impact of Metadata</h3>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
