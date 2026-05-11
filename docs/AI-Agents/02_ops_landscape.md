# AI Agent Ops / 배포 생태계 (2026)

AI 에이전트를 **운영하는** 도구들. 모니터링·관찰성, 평가, 배포 인프라를 다룬다.

---

## 1. 모니터링 & 관찰성 (Observability) 도구

2026년 기준 에이전트 관찰성 플랫폼은 크게 **오픈소스 우선** vs **SaaS 우선** 두 축으로 나뉜다.

### 1.1 LangSmith (LangChain)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (관찰성 + 평가 + 배포) |
| **성숙도** | 높음 — LangChain 생태계 표준 |
| **배포 옵션** | 관리형 클라우드 / BYOC / 셀프호스트 |
| **가격** | Free (5,000 traces/월) / Plus $39/월 / Enterprise 문의 |

LangChain 생태계의 공식 관찰성·평가·배포 플랫폼. 프레임워크 불가지론적으로 설계되어 LangChain 이외 환경에서도 사용 가능하다.

핵심 기능:
- **트레이싱**: LLM 호출, 도구 실행, 에이전트 단계별 전체 추적. 측정 오버헤드가 거의 없음(업계 최저 수준)
- **평가(Evals)**: 인간 평가, 휴리스틱 체크, LLM-as-judge, 쌍비교, 커스텀 평가기 지원
- **에이전트 서버**: Assistants/Threads/Runs 모델로 상태 있는 장기 실행 에이전트 배포
- **데이터셋 관리**: 실패한 트레이스를 평가 데이터셋으로 직접 추가
- **프롬프트 허브**: 프롬프트 버전 관리 및 팀 공유

배포 옵션: 관리형 SaaS, BYOC(Bring Your Own Cloud), 완전 셀프호스트.

---

### 1.2 Langfuse

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (관찰성 + 평가 + 프롬프트 관리) |
| **성숙도** | 높음 — 24,600+ GitHub Stars, Fortune 500 63개사 도입 |
| **배포 옵션** | 셀프호스트 (MIT 라이선스) / 관리형 클라우드 |
| **특이사항** | 2026년 1월 ClickHouse Inc. 인수 ($400M Series D) |

오픈소스 LLM 엔지니어링 플랫폼의 사실상 표준. ClickHouse에 인수된 이후에도 MIT 라이선스와 자체 호스팅 경로는 변경 없이 유지된다.

핵심 기능:
- **트레이싱**: 멀티턴 대화, 에이전트 워크플로우를 그래프로 시각화
- **평가 프레임워크**: 커스텀 평가기, LLM-as-judge, 사람 평가, A/B 테스트
- **프롬프트 관리**: 버전 관리, 환경별 배포, 실험 연결
- **비용 추적**: 모델별 토큰 사용량 및 비용 분석
- **ClickHouse 기반**: 수십억 건 트레이스를 낮은 지연으로 분석

셀프호스트: Docker 또는 Kubernetes로 자체 인프라에 완전 배포 가능(무료).

---

### 1.3 Arize Phoenix

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (관찰성 + ML 수준 평가) |
| **성숙도** | 높음 — ML 모니터링 강점을 LLM으로 확장 |
| **배포 옵션** | 오픈소스 (로컬) / 클라우드 SaaS |

ML 모니터링 회사 Arize AI의 오픈소스 LLM 관찰성 플랫폼. OpenTelemetry 기반 계측(OpenInference)을 사용해 프레임워크 독립적이다.

핵심 기능:
- **50+ 평가 메트릭**: Faithfulness, Relevance, Hallucination, Safety, Toxicity 등 연구 기반 메트릭
- **에이전트 궤적 분석**: 멀티스텝 에이전트의 의사결정 경로 시각화
- **RAG 시각화**: 검색 관련성, 청크 품질 분석
- **OpenInference**: OTel 기반 프레임워크 독립 계측 (LangChain, LlamaIndex, Haystack, DSPy 지원)
- **클러스터 분석**: 트레이스 군집화로 이상 패턴 자동 감지

특징: 기존 ML 모니터링 경험을 갖춘 팀에게 가장 친숙한 인터페이스.

---

### 1.4 Helicone

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (프록시 기반 간단 모니터링) |
| **성숙도** | 중간 — 2026년 유지보수 모드 진입 |
| **배포 옵션** | 프록시 SaaS |

LLM API 앞에 놓이는 역방향 프록시 방식의 관찰성 도구. SDK 없이 base URL 한 줄 변경으로 설치된다.

핵심 기능:
- **드롭인 설치**: API 엔드포인트 URL만 변경하면 즉시 작동
- **비용 대시보드**: 모델별, 사용자별, 요청별 비용 추적
- **캐싱**: 동일 요청 캐싱으로 비용 절감
- **속도 제한**: 사용자/팀별 요청 제한

주의: 2026년 기준 유지보수 모드. 신규 프로젝트에는 Langfuse나 LangSmith 권장.

---

### 1.5 Datadog LLM Observability

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (엔터프라이즈 통합 관찰성) |
| **성숙도** | 높음 — 기존 Datadog 고객 자동 채택 |

기존 Datadog APM/인프라 관찰성을 LLM/에이전트 레이어로 확장한 제품. 이미 Datadog을 사용하는 엔터프라이즈의 기본 선택지.

핵심 기능:
- **전체 스택 통합**: LLM 트레이스를 인프라·앱 메트릭과 단일 뷰로 통합
- **LLM 특화 메트릭**: 토큰 비용, 지연, 오류율, 모델별 성능
- **알림**: 기존 Datadog 알림 인프라 재사용
- **감사 로그**: 엔터프라이즈 컴플라이언스를 위한 불변 로그

적합한 대상: 이미 Datadog을 사용 중인 엔터프라이즈.

---

### 1.6 AgentOps (Python SDK)

| 항목 | 내용 |
|------|------|
| **포지셔닝** | Ops (에이전트 특화 모니터링) |
| **성숙도** | 중간 |

에이전트 실행 추적에 특화된 Python SDK. LangChain, AutoGen, CrewAI 등 주요 프레임워크와 통합된다.

핵심 기능:
- **에이전트 세션 추적**: 에이전트 실행 세션 전체를 하나의 단위로 추적
- **도구 호출 기록**: 어떤 도구를 어떤 순서로 호출했는지 기록
- **비용·레이턴시 추적**: 세션별 비용 집계
- **재생**: 실패한 세션을 디버깅하기 위해 실행 순서 재생

---

## 2. 평가(Evaluation) 프레임워크

AI 에이전트 평가는 전통적인 소프트웨어 테스트와 본질적으로 다르다. 같은 입력에 대해 출력이 달라지는 비결정론적 특성 때문에 "통과/실패" 단위 테스트가 의미 없다.

### 2.1 핵심 평가 지표

**레이턴시 & 비용**
- 요청당 지연 시간, 토큰 수, 비용
- 동일 정확도 기준 최대 50x 비용 차이가 존재

**태스크 성공률 (Task Success Rate)**
- 에이전트가 목표를 달성했는지 여부
- 중요: 단일 실행 성공률(60%)이 8회 실행 기준 25%로 급락하는 신뢰성 문제 존재

**궤적 정확도 (Trajectory Accuracy)**
- 에이전트가 올바른 순서로 올바른 도구를 사용했는지
- 최종 출력만 보는 것이 아닌 의사결정 경로 전체를 평가

**LLM-as-Judge**
- 별도의 LLM이 주 에이전트의 출력을 평가하는 패턴
- 2026년 기준 에이전트 QA의 표준 설계 패턴으로 자리잡음

**도메인별 메트릭 (Faithfulness, Relevance, Groundedness)**
- RAG 특화: 검색된 컨텍스트에 기반한 답변인지 (Faithfulness)
- 답변이 질문과 관련 있는지 (Relevance)

### 2.2 주요 평가 도구

| 도구 | 특징 |
|------|------|
| **LangSmith Eval** | 인간 평가·LLM-as-judge·휴리스틱 통합, 데이터셋 관리 |
| **Langfuse Eval** | 커스텀 평가기, A/B 프롬프트 테스트 내장 |
| **Arize Phoenix Evals** | 50+ 연구 기반 메트릭, RAG 평가 특화 |
| **Braintrust** | 실험 추적, 프롬프트 버전 비교 |
| **DeepEval** | 오픈소스 단위 테스트 스타일 평가 프레임워크 |
| **Ragas** | RAG 파이프라인 특화 평가 라이브러리 |
| **Galileo** | 엔터프라이즈 에이전트 평가, 헬루시네이션 감지 |

---

## 3. 배포 인프라

### 3.1 관리형 에이전트 런타임

| 플랫폼 | 제공 기능 |
|--------|---------|
| AWS Bedrock AgentCore | 관리형 실행 환경, 메모리, 세션, 도구 호출 |
| Azure AI Foundry Agent Service | 상태 있는 에이전트 호스팅, Teams 통합 |
| Google Vertex AI Agent Engine | ADK 에이전트 관리형 실행, 자동 스케일링 |
| LangSmith Deployment | Assistants/Threads/Runs 모델 기반 배포 |

### 3.2 에이전트 메모리 & 상태 관리

에이전트 운영에서 상태 관리는 독립적인 인프라 관심사가 되고 있다.

**주요 패턴:**
- **단기 메모리 (In-context)**: 현재 대화/실행 컨텍스트 내 메모리
- **장기 메모리 (External Store)**: Redis, PostgreSQL, 벡터 DB에 영구 저장
- **에피소딕 메모리**: 과거 상호작용 기록 (Mem0, Letta 등)
- **공유 메모리**: 멀티에이전트 시스템에서 에이전트 간 공유 상태

**메모리 관련 도구:**
- **Mem0**: 에이전트용 메모리 레이어 (개인화된 장기 기억)
- **Letta (MemGPT 후속)**: 자기 편집 가능한 장기 메모리를 가진 에이전트
- **Zep**: LLM 앱용 메모리 스토어

### 3.3 에이전트 보안 & 가드레일

| 도구/기능 | 역할 |
|----------|------|
| **AWS Guardrails** | PII 보호, 콘텐츠 필터, 주제 차단 |
| **Prompt Injection 감지** | 악의적 프롬프트 삽입 탐지 (Rebuff, LakeShelter 등) |
| **NeMo Guardrails** | NVIDIA, 대화 흐름 및 안전 규칙 제어 |
| **Llama Guard** | Meta 오픈소스 콘텐츠 안전 분류기 |

---

## 요약: 2026 Ops 도구 매핑

```
관찰성
  ├── 오픈소스 우선: Langfuse (셀프호스트), Arize Phoenix
  ├── SaaS 우선:    LangSmith, Datadog LLM Obs
  └── 단순 설치:    [Helicone - 유지보수 모드]

평가
  ├── 통합 플랫폼:  LangSmith Eval, Langfuse Eval, Galileo
  ├── 특화 라이브러리: Ragas (RAG), DeepEval (단위 테스트)
  └── 메트릭 라이브러리: Arize Phoenix Evals (50+ 메트릭)

배포 런타임
  ├── 클라우드 관리형: Bedrock AgentCore, Vertex Agent Engine, Azure Foundry
  └── 프레임워크 네이티브: LangSmith Deployment

메모리
  └── 특화 도구: Mem0, Letta, Zep

가드레일/보안
  └── AWS Guardrails, NeMo Guardrails, Llama Guard
```

---

> 관련 문서: [AI Agent 빌드 플랫폼](./01_build_platforms.md) · [Build vs Ops 갭 분석](./03_build_vs_ops_gap.md)
