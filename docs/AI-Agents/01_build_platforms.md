# AI Agent 빌드 플랫폼 생태계 (2026)

AI 에이전트를 **만드는** 도구들의 전체 지형도. 코드 레벨 프레임워크부터 No-Code SaaS, 클라우드 관리형 서비스까지.

---

## 1. 코드 레벨 프레임워크 (Framework-level)

### 1.1 LangChain / LangGraph

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build (핵심) + 일부 Ops (LangSmith 연동) |
| **성숙도** | 높음 — 47M+ PyPI 다운로드, 가장 큰 생태계 |
| **주요 언어** | Python, TypeScript |

**LangChain** 은 LLM 앱 개발을 위한 구성 요소(체인, 에이전트, 도구, 메모리)를 제공하는 오픈소스 프레임워크. 현재는 LangGraph 위에서 에이전트 로직을 구성하는 방식이 표준화되었다.

**LangGraph** 는 LangChain 생태계 안의 그래프 기반 오케스트레이션 레이어. 노드(실행 단계)와 엣지(분기 조건)로 상태 머신을 정의해 복잡한 멀티-에이전트 워크플로우를 구현한다.

핵심 특징:
- **Stateful 실행**: 체크포인트 기반으로 중간 상태 저장 및 재개 가능
- **사이클 지원**: 루프와 분기를 명시적으로 표현 (React, Plan-and-Execute 등)
- **Human-in-the-loop**: 실행 중 인간 개입 지점을 그래프 엣지로 정의
- **스트리밍 우선**: 토큰/단계별 스트리밍 내장
- **LangSmith 네이티브**: 추적/평가 도구와 깊게 통합

언제 선택하나: **제어 흐름이 복잡하고**, 분기·루프·상태 유지가 필요한 프로덕션 에이전트.

---

### 1.2 AutoGen / AG2 (Microsoft)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 중간-높음 — v0.4(AG2) 아키텍처 리빌드 완료 |
| **주요 언어** | Python |

Microsoft Research가 개발한 멀티-에이전트 대화 프레임워크. 에이전트들이 서로 메시지를 주고받으며 목표를 달성하는 "대화형 프로그래밍" 패러다임을 사용한다.

v0.4(AG2)에서 이벤트 드리븐 코어, 비동기 우선 실행, 플러그인형 오케스트레이션으로 완전 재설계됨.

핵심 특징:
- **GroupChat 패턴**: 다중 에이전트가 라운드로빈/선택적으로 번갈아 응답
- **ConversableAgent**: 에이전트 간 대화를 1급 추상화로 처리
- **코드 실행**: 에이전트가 생성한 코드를 자동 실행하는 내장 샌드박스
- **Magentic-One**: 웹 브라우징·파일 조작 등 복합 작업을 위한 멀티-에이전트 아키텍처

언제 선택하나: 에이전트 간 **대화와 협력**이 중심인 연구용 워크플로우, 코드 생성/실행 루프.

---

### 1.3 CrewAI

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 중간-높음 — 비즈니스 워크플로우에서 채택 급증 |
| **주요 언어** | Python |

**역할 기반** 멀티-에이전트 프레임워크. 에이전트에게 역할(Role), 목표(Goal), 배경(Backstory)을 부여하고, 태스크를 분배해 팀처럼 협업시킨다.

핵심 특징:
- **Role-based 추상화**: 에이전트를 소프트웨어 팀 구성원처럼 정의 (Researcher, Writer, Reviewer 등)
- **태스크 의존성**: 태스크 간 순차/병렬 실행 체인 정의 가능
- **Tool 통합**: 검색, 코드 실행, 파일 I/O 등 다양한 도구 내장
- **낮은 러닝커브**: 비즈니스 로직을 자연어 수준으로 모델링

언제 선택하나: 명확한 **역할 분담**이 있는 비즈니스 자동화, 팀 구성 모델로 이해하기 쉬운 워크플로우.

---

### 1.4 LlamaIndex

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build (RAG/데이터 레이어 특화) |
| **성숙도** | 높음 — 데이터 파이프라인 영역에서 성숙 |
| **주요 언어** | Python, TypeScript |

원래 RAG(Retrieval-Augmented Generation) 데이터 프레임워크였으나, 에이전트 프리미티브를 추가하며 에이전트 프레임워크로 확장됨.

핵심 특징:
- **인덱싱 우선**: 문서, 데이터베이스, API를 구조화된 인덱스로 변환
- **QueryEngine + Agent**: 검색 엔진과 에이전트 로직을 결합
- **멀티모달 지원**: 텍스트, 이미지, 표, PDF 등 다양한 데이터 형식
- **Workflows**: 이벤트 기반 비동기 파이프라인 추상화

언제 선택하나: **사내 문서·DB를 지식 베이스로 활용**하는 RAG 중심 에이전트.

---

### 1.5 Microsoft Agent Framework (Semantic Kernel + AutoGen 통합)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + 엔터프라이즈 Ops |
| **성숙도** | 높음 — 2026년 4월 v1.0 GA 출시 (LTS) |
| **주요 언어** | Python, C#/.NET |

2025년 10월, Microsoft는 Semantic Kernel과 AutoGen을 통합해 **Microsoft Agent Framework** 로 일원화했다. v1.0이 2026년 4월 GA 되며 .NET과 Python 양쪽에서 장기 지원(LTS)을 제공한다.

핵심 특징:
- **엔터프라이즈 미들웨어**: Semantic Kernel의 플러그인 아키텍처, 세션 기반 상태 관리, 타입 안전성 내장
- **그래프 기반 워크플로우**: 순차, 병렬, 핸드오프, GroupChat, Magentic-One 패턴 지원
- **OpenTelemetry 내장**: 마이크로소프트 표준 텔레메트리 통합
- **Azure AI Foundry 통합**: Azure 스택과 원클릭 연동

언제 선택하나: **Microsoft/Azure 스택** 기반 엔터프라이즈, C# .NET 환경, 강한 타입 안전성이 필요한 경우.

---

### 1.6 OpenAI Agents SDK

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 중간 — 실험적 Swarm을 프로덕션급으로 교체 |
| **주요 언어** | Python |

OpenAI가 기존 Swarm 실험 프레임워크를 대체해 출시한 공식 에이전트 SDK. Responses API, Assistants API와 깊이 통합된다.

핵심 특징:
- **핸드오프(Handoffs)**: 에이전트 간 제어 이전을 일급 추상화로 제공
- **내장 트레이싱**: OpenAI 플랫폼 내 실행 추적 가능
- **구조화 출력**: Pydantic 모델을 사용한 타입 안전 출력
- **도구 자동화**: 함수 스키마 자동 추출

언제 선택하나: **OpenAI 모델 전용** 스택, OpenAI 플랫폼 생태계 내에서 개발할 때.

---

### 1.7 Google Agent Development Kit (ADK)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 성장 중 — Q1 2026 기준 7M+ 다운로드 |
| **주요 언어** | Python, Java, Go, JavaScript |

Google이 출시한 에이전트 개발 키트. Vertex AI / Gemini 생태계와 깊이 통합된다.

핵심 특징:
- **4개 언어 지원**: 멀티-언어 SDK는 경쟁사 중 이례적
- **Agent2Agent (A2A) 프로토콜**: 에이전트 간 통신 표준화 프로토콜 제안
- **BigQuery·검색 통합**: GCP 서비스와 원클릭 연결
- **Vertex AI 네이티브**: 관리형 런타임으로 배포 가능

언제 선택하나: **GCP 스택**, Gemini 모델, BigQuery 데이터와 연동하는 에이전트.

---

### 1.8 Pydantic AI

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build (타입 안전성 특화) |
| **성숙도** | 중간 — 빠르게 성장 중 |
| **주요 언어** | Python |

LLM 호출을 타입이 있는 함수 호출처럼 다루는 Python 에이전트 프레임워크. Pydantic 모델로 입출력을 정의하면 프레임워크가 검증, 재시도, 스트리밍, 프로바이더 전환을 처리한다.

핵심 특징:
- **타입 안전성**: 모든 에이전트 입출력이 Pydantic 모델로 검증
- **멀티 프로바이더**: OpenAI, Anthropic, Google, Mistral, Groq, Bedrock 등 지원
- **Dependency Injection**: FastAPI 스타일의 의존성 주입
- **Logfire 통합**: Pydantic의 자체 관찰성 도구와 연동

언제 선택하나: **타입 안전성**과 코드 품질이 중요한 프로덕션 파이썬 프로젝트.

---

### 1.9 Haystack (deepset)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build (NLP/RAG 파이프라인 특화) |
| **성숙도** | 높음 — 초기 세대 프레임워크, 검색·NLP 도메인 강점 |
| **주요 언어** | Python |

NLP 파이프라인과 검색 시스템 구축에 특화된 프레임워크. Haystack 2.x에서 컴포넌트 기반 파이프라인 아키텍처로 재설계되었다.

핵심 특징:
- **Document Store 추상화**: Elasticsearch, OpenSearch, Weaviate, Pinecone 등 연결
- **Pipeline 컴포넌트**: 모듈식 컴포넌트를 연결해 RAG 파이프라인 구성
- **검색 특화**: BM25, DPR, ColBERT 등 다양한 검색 전략 지원

언제 선택하나: 기업 내 문서 검색, **NLP 파이프라인**이 핵심인 RAG 시스템.

---

## 2. Low-code / No-code 플랫폼

### 2.1 n8n

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 높음 — 50,000+ GitHub Stars, Series B 완료 |
| **배포** | Self-hosted (오픈소스) / 클라우드 |

워크플로우 자동화 플랫폼에 LLM 노드와 AI 에이전트 프리미티브를 추가한 형태. 400+ 통합을 보유하며 엔터프라이즈 자동화에 강점이 있다.

핵심 특징:
- **비주얼 워크플로우**: 드래그앤드롭으로 자동화 플로우 설계
- **AI Agent 노드**: 도구를 가진 에이전트를 노드로 삽입 가능
- **에러 핸들링**: 재시도, 폴백, 조건 분기 등 프로덕션급 자동화
- **웹훅·스케줄러**: 다양한 트리거 방식 내장

적합한 대상: 기존 SaaS 도구 연결 + LLM 보강이 필요한 팀, IT/운영 자동화.

---

### 2.2 Flowise

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build |
| **성숙도** | 중간 — AI 프로토타이핑에 강점 |
| **배포** | Self-hosted (오픈소스) / 클라우드 |

LLM 체인과 AI 에이전트를 시각적으로 구성하는 오픈소스 빌더. AI 전용 도구로 RAG 파이프라인, 챗봇, 에이전트 프로토타이핑에 최적화되어 있다.

핵심 특징:
- **LangChain 기반**: LangChain 컴포넌트를 드래그앤드롭으로 조립
- **AI 전용 UI**: Vector Store, Embedding, LLM 노드 특화
- **API 엔드포인트**: 완성된 플로우를 REST API로 즉시 배포
- **Human-in-the-loop**: 2026 버전에서 HITL 내장

적합한 대상: AI 챗봇·RAG 프로토타이핑, 코딩 없이 빠른 PoC.

---

### 2.3 Dify

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + 기본 Ops |
| **성숙도** | 높음 — 가장 많은 Star를 받은 오픈소스 LLM 앱 플랫폼 |
| **배포** | Self-hosted (오픈소스) / 클라우드 SaaS |

에이전트 빌딩, RAG 관리, 프롬프트 엔지니어링을 하나의 플랫폼에 통합. 가장 세련된 UI와 완성도 높은 프로덕션 기능을 제공한다.

핵심 특징:
- **통합 플랫폼**: 에이전트 빌더 + RAG 파이프라인 + 프롬프트 관리
- **Workflow 편집기**: 복잡한 조건 분기와 루프 지원
- **RAG 관리**: 문서 업로드, 청킹, 임베딩, 검색 품질 테스트 내장
- **기본 관찰성**: 실행 로그, 비용 추적, 기본 모니터링

적합한 대상: 에이전트/LLM 앱을 처음부터 끝까지 플랫폼 내에서 완결하고 싶은 팀.

---

### 2.4 Zapier (AI 기능)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build (자동화 + AI 보강) |
| **성숙도** | 높음 — 6,000+ 앱 통합, 비즈니스 사용자 중심 |
| **배포** | SaaS 전용 |

6,000+ 앱 통합을 보유한 자동화 플랫폼에 AI 기능을 추가. AI Zap 생성(자연어로 자동화 설명)과 AI Actions를 지원한다.

핵심 특징:
- **최대 통합 생태계**: 경쟁자 대비 가장 많은 앱 연결
- **AI Zap 생성**: 원하는 자동화를 자연어로 설명하면 AI가 플로우 생성
- **비즈니스 사용자 친화적**: 코딩 지식 불필요
- **엔터프라이즈 보안**: SSO, 권한 관리, 감사 로그

적합한 대상: 기술 지식 없는 비즈니스 사용자, 기존 SaaS 스택 자동화.

---

## 3. 클라우드 관리형 서비스

### 3.1 AWS Bedrock AgentCore

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + Ops (관리형 런타임) |
| **성숙도** | 높음 — 2026년 초 GA |
| **모델 지원** | 200+ (Anthropic, Meta, Mistral, AI21 등) |

AWS가 제공하는 관리형 에이전트 런타임. 어떤 프레임워크(LangChain, LlamaIndex, 커스텀)로 만든 에이전트도 호스팅하고 실행할 수 있다.

핵심 특징:
- **프레임워크 불가지론**: LangChain, LlamaIndex, 커스텀 에이전트 모두 지원
- **최대 모델 마켓플레이스**: 단일 클라우드 최다 200+ 모델
- **Knowledge Bases**: S3, RDS 등을 자동으로 RAG 지식 베이스화
- **Guardrails**: 콘텐츠 필터링, PII 보호, 주제 차단 내장
- **Action Groups**: Lambda 함수를 에이전트 도구로 연결

적합한 대상: AWS 스택 기반 기업, 모델 불가지론적 멀티모델 전략.

---

### 3.2 Google Vertex AI Agent Builder / Agent Engine

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + Ops (관리형 런타임) |
| **성숙도** | 높음 — 2026년 초 GA, ADK 7M+ 다운로드 |
| **모델 지원** | Gemini 계열 중심, 타사 모델 지원 |

Google Cloud의 에이전트 개발 및 배포 플랫폼. Agent Builder(저코드)와 Agent Engine(관리형 런타임)으로 구성된다.

핵심 특징:
- **Vertex AI Agent Builder**: 자연어로 목표를 설명하면 에이전트 자동 생성 (저코드)
- **Agent Engine**: ADK로 만든 에이전트의 관리형 실행 환경
- **BigQuery 통합**: 기업 데이터 직접 질의
- **Agent2Agent 프로토콜**: 에이전트 간 표준 통신 프로토콜
- **관찰성 대시보드**: 2025년 말 추가, 실행 추적 및 거버넌스

적합한 대상: GCP 스택, BigQuery/Search/Workspace 데이터와 연동, 저코드 에이전트 필요.

---

### 3.3 Azure AI Foundry Agent Service

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + Ops (관리형 런타임) |
| **성숙도** | 높음 — GA, 10,000+ 고객 |
| **모델 지원** | GPT-5, o3, SLM(Vesta), 오픈소스 모델 |

Microsoft Azure의 관리형 에이전트 서비스. Microsoft Agent Framework와 깊이 통합되며, Microsoft 365 / Teams 원클릭 배포가 강점이다.

핵심 특징:
- **Microsoft 365 통합**: Teams 원클릭 배포 — 경쟁사가 따라올 수 없는 차별점
- **Copilot Studio**: 저코드 에이전트 빌더 포함
- **엔터프라이즈 보안**: Azure AD, Entra, Purview 통합
- **SLM(Vesta)**: 레이턴시 민감한 LOB 앱을 위한 소형 특화 모델

적합한 대상: Microsoft/Office 365 스택 기업, Teams 중심 조직.

---

## 4. 엔터프라이즈 SaaS 플랫폼

### 4.1 Salesforce Agentforce

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + Ops (CRM 도메인 특화) |
| **성숙도** | 높음 — Salesforce 생태계 내 GA |

Salesforce CRM 생태계 안에서 에이전트를 구축하고 배포하는 플랫폼. Einstein Trust Layer로 강한 거버넌스와 감사 기능을 제공한다.

핵심 특징:
- **CRM 통합**: Salesforce 데이터(Account, Opportunity, Case 등)에 네이티브 접근
- **Einstein Trust Layer**: 데이터 마스킹, 감사 로그, 콘텐츠 필터링
- **MuleSoft 연동**: 외부 시스템 연결 확장
- **IBM watsonx 파트너십**: 2026년 IBM과 파트너십으로 상호 에이전트 지원

적합한 대상: Salesforce 기반 영업·서비스 자동화, 규제 준수가 중요한 엔터프라이즈.

---

### 4.2 IBM watsonx Orchestrate

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + Ops (엔터프라이즈 거버넌스 특화) |
| **성숙도** | 높음 — 엔터프라이즈 거버넌스 분야 성숙 |

AI 에이전트와 어시스턴트를 구축·배포·관리하는 IBM의 플랫폼. 150+ 엔터프라이즈 도구 커넥터와 내장 거버넌스 대시보드가 특징이다.

핵심 특징:
- **멀티-에이전트 슈퍼바이저**: IBM, 서드파티, 오픈소스 에이전트 오케스트레이션
- **150+ 커넥터**: Salesforce, Workday, ServiceNow 등 연결
- **거버넌스 대시보드**: 에이전트 행동 감사, 정책 준수 모니터링
- **규제 산업 특화**: 의료, 금융, 정부 등 고규제 산업 레퍼런스

적합한 대상: 규제 준수, 감사, 거버넌스가 핵심인 엔터프라이즈.

---

### 4.3 Langbase

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Build + 기본 Ops |
| **성숙도** | 중간 — 빠르게 성장 중인 SaaS |

600+ LLM에 대한 통합 API를 제공하는 서버리스 에이전트 플랫폼. AI Studio, 버저닝, 비용 분석 도구를 포함한다.

핵심 특징:
- **통합 LLM API**: 600+ 모델에 단일 API로 접근
- **Pipe 추상화**: 프롬프트 + 모델 + 도구를 하나의 배포 단위로 관리
- **버저닝**: 프롬프트와 에이전트 구성의 버전 관리
- **비용 분석**: 모델·에이전트별 토큰 비용 추적

적합한 대상: 빠른 에이전트 프로토타이핑, 멀티모델 실험, 서버리스 배포.

---

## 비교 요약표

| 플랫폼 | 유형 | 포지셔닝 | 성숙도 | 적합 케이스 |
|--------|------|---------|-------|------------|
| LangGraph | 프레임워크 | Build | 높음 | 복잡한 상태 기반 워크플로우 |
| AutoGen / AG2 | 프레임워크 | Build | 중-높 | 대화형 멀티에이전트, 코드 실행 |
| CrewAI | 프레임워크 | Build | 중-높 | 역할 기반 팀 자동화 |
| LlamaIndex | 프레임워크 | Build | 높음 | RAG 중심 데이터 에이전트 |
| MS Agent Framework | 프레임워크 | Build+Ops | 높음 | Azure/Microsoft 스택 |
| OpenAI Agents SDK | SDK | Build | 중간 | OpenAI 전용 스택 |
| Google ADK | SDK | Build | 성장중 | GCP/Gemini 스택 |
| Pydantic AI | 프레임워크 | Build | 중간 | 타입 안전 Python 프로젝트 |
| Haystack | 프레임워크 | Build | 높음 | NLP/검색 파이프라인 |
| n8n | Low-code | Build | 높음 | SaaS 자동화 + AI 보강 |
| Flowise | No-code | Build | 중간 | AI 프로토타이핑 |
| Dify | Low-code | Build+Ops | 높음 | 통합 LLM 앱 플랫폼 |
| Zapier AI | No-code | Build | 높음 | 비즈니스 사용자 자동화 |
| AWS Bedrock AgentCore | 클라우드 | Build+Ops | 높음 | AWS 스택, 멀티모델 |
| Google Vertex AI | 클라우드 | Build+Ops | 높음 | GCP 스택 |
| Azure AI Foundry | 클라우드 | Build+Ops | 높음 | Microsoft 스택 |
| Salesforce Agentforce | 엔터프라이즈 | Build+Ops | 높음 | CRM 기반 자동화 |
| IBM watsonx Orchestrate | 엔터프라이즈 | Build+Ops | 높음 | 고규제 산업 거버넌스 |
| Langbase | SaaS | Build+Ops | 중간 | 서버리스 에이전트 |

---

> 관련 문서: [AI Agent Ops 생태계](./02_ops_landscape.md) · [Build vs Ops 갭 분석](./03_build_vs_ops_gap.md)
