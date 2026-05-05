# Interactive Personal Wiki — 개발 계획

## 목표

GitHub 기반의 개인 위키를 구축한다.
- 마크다운 문서를 Confluence 스타일로 렌더링해 GitHub Pages로 배포
- 권한이 있는 사용자가 웹에서 직접 편집하고, 저장 시 자동 커밋 생성

---

## 기술 스택

| 역할 | 선택 | 이유 |
|------|------|------|
| Static Site Generator | **VitePress** | 마크다운 중심, 빠른 빌드, 깔끔한 기본 테마 |
| 웹 에디터 | **Decap CMS** | 오픈소스, GitHub 백엔드 지원, 자동 커밋 내장 |
| 인증 | **GitHub OAuth** | 프로젝트 collaborator 기반 접근 제어 |
| OAuth 프록시 | **Netlify** (무료) | 서버 없이 OAuth 콜백 처리 |
| 배포 | **GitHub Actions → GitHub Pages** | 푸시 시 자동 빌드·배포 |

---

## 아키텍처 개요

```
사용자 (웹)
  │
  ├─ 읽기: GitHub Pages (VitePress 정적 사이트)
  │
  └─ 편집: Decap CMS 에디터 (/admin)
       │
       ├─ GitHub OAuth 인증 (Netlify 프록시)
       └─ GitHub API → 마크다운 파일 커밋 → GitHub Actions 트리거 → 재배포
```

---

## 디렉터리 구조

```
wiki/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 스크립트
├── docs/                       # 마크다운 문서 루트
│   ├── index.md                # 홈페이지
│   ├── .vitepress/
│   │   └── config.ts           # VitePress 설정
│   └── [카테고리]/
│       └── [문서].md
└── public/
    └── admin/
        ├── index.html          # Decap CMS 진입점
        └── config.yml          # Decap CMS 설정 (GitHub 백엔드, 컬렉션 정의)
```

---

## 개발 단계

### Phase 1 — 기본 사이트 구축 (1~2일)

**목표**: VitePress로 마크다운을 렌더링하고 GitHub Pages에 배포

1. GitHub 리포지토리 생성 (`wiki`, Public 또는 Private)
2. VitePress 초기화
   ```bash
   npm init -y
   npm install -D vitepress
   npx vitepress init
   ```
3. 기본 문서 구조 설계 및 샘플 마크다운 작성
4. GitHub Actions 워크플로우 작성 (`deploy.yml`)
   - `main` 브랜치 푸시 시 `vitepress build` 실행
   - `gh-pages` 브랜치로 정적 파일 배포
5. GitHub Pages 설정 (Settings → Pages → Source: `gh-pages`)

**완료 기준**: `https://{username}.github.io/wiki` 에서 사이트 확인

---

### Phase 2 — Confluence 스타일 커스터마이징 (1~2일)

**목표**: Confluence처럼 보이도록 테마와 네비게이션 구성

1. **홈 페이지** — 스페이스(카테고리)를 카드형으로 나열
2. **사이드바** — 트리형 구조, 카테고리별 문서 목록
3. **브레드크럼** — 현재 위치를 상단에 표시
4. **우측 ToC** — 문서 내 목차 고정 표시 (VitePress 기본 기능 활용)
5. **색상/폰트** — 흰 배경, 파랑·회색 계열 중성 색상, 고정폭 아닌 가독성 폰트
6. **마크다운 플러그인** — 수식, 코드 하이라이트 등 필요 시 추가

**완료 기준**: 사이드바·브레드크럼·ToC가 Confluence처럼 동작하고 홈이 카드형 스페이스 목록으로 표시됨

---

### Phase 3 — 웹 에디터 통합 (2~3일)

**목표**: 웹에서 마크다운을 편집하고 저장 시 자동 커밋

1. **Decap CMS 설정**
   - `public/admin/index.html` 생성 (CMS HTML 진입점)
   - `public/admin/config.yml` 작성
     - 백엔드: `github`, 리포지토리 지정
     - 컬렉션: 각 카테고리를 폴더 컬렉션으로 정의
     - 필드: 제목, 날짜, 태그, 본문(마크다운)

2. **GitHub OAuth 앱 등록**
   - GitHub Settings → Developer Settings → OAuth Apps → New OAuth App
   - Authorization callback URL: `https://api.netlify.com/auth/done`

3. **Netlify OAuth 프록시 설정** (서버 없이 OAuth 처리)
   - Netlify에 빈 사이트 생성 (배포 불필요, 프록시 역할만)
   - Site Settings → Access control → OAuth → GitHub 앱 자격증명 입력

4. **Decap CMS config.yml 에 인증 설정 추가**
   ```yaml
   backend:
     name: github
     repo: {username}/wiki
     branch: main
     base_url: https://api.netlify.com
     auth_endpoint: auth
   ```

5. 에디터 접근 경로: `https://{username}.github.io/wiki/admin/`

**완료 기준**: 웹에서 문서 편집 후 저장 시 GitHub에 커밋이 생성되고 자동 재배포됨

---

### Phase 4 — 권한 관리 및 마무리 (0.5일)

**목표**: 접근 권한 설정 및 UX 개선

1. GitHub 리포지토리 Collaborators 추가
   - Settings → Collaborators → 편집 권한을 줄 사용자 초대
   - Decap CMS는 GitHub 로그인 기반이므로 collaborator = 편집 가능
2. 에디터 링크를 사이트 상단/하단에 노출 (로그인 상태에서만 보이게 처리 가능)
3. 최종 동작 검증
   - 편집 → 저장 → 커밋 확인 → 사이트 재배포 확인

---

## 주요 고려사항

- **비용**: 모든 구성 요소 무료 (GitHub Free + Netlify Free)
- **보안**: Decap CMS는 GitHub 토큰을 브라우저 메모리에만 보관, 서버에 저장하지 않음
- **Private 리포지토리**: GitHub Pages는 Free 플랜에서 Public 리포만 무료 배포 가능. Private이면 GitHub Pro 필요 또는 Cloudflare Pages로 대체
- **빌드 시간**: 문서가 많아질수록 VitePress 빌드 시간 증가 → 필요 시 incremental build 고려

---

## 향후 확장 가능성

- 검색 기능: VitePress 내장 검색 또는 Algolia DocSearch 연동
- 댓글: giscus (GitHub Discussions 기반)
- 태그/카테고리 페이지 자동 생성
- 초안(draft) 관리: Decap CMS의 Editorial Workflow 활성화
