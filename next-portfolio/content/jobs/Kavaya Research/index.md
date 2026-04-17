---
date: '2025-04-01'
title: 'Junior Data Scientist'
company: 'Kavaya Research'
range: 'Apr 2025 – Sep 2025'
---

- Built a tweet preprocessing pipeline to study how crypto-related discussions on Twitter affect short-term price movement.
- Designed and implemented a sentiment analysis model using Qwen-7B, prompting it to classify tweets as bullish, neutral, or bearish. Converted it into a lighter supervised model by removing the LLM head and adding a linear layer for direct three-class prediction.
- Used the sentiment outputs to identify credible Twitter accounts by correlating 4-hour price movements with each user’s aggregated sentiment. This helped remove redundant and low-signal data from tracking.
- Later proposed using a BERT-based model for faster inference and built a proof of concept using the same dataset. Achieved comparable accuracy (F1 ≈ 0.90 vs 0.91) while cutting inference latency by ~55% and GPU usage by ~80%.
- The optimized model and ingestion strategy were adopted by the engineering team, improving data quality and downstream predictive performance.
