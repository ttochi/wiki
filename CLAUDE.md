# Wiki Project — CLAUDE.md

## 프로젝트 개요

GitHub Pages 기반의 개인 위키 사이트.
마크다운 문서를 블로그처럼 렌더링하고, 권한 있는 사용자가 웹에서 직접 편집해 자동 커밋되는 구조.

자세한 계획은 `plan.md` 참고.

## 기술 스택

- **VitePress** — 정적 사이트 생성 (마크다운 → HTML)
- **Decap CMS** — 웹 기반 마크다운 에디터, GitHub API로 자동 커밋
- **GitHub OAuth + Netlify** — 인증 및 OAuth 프록시 (서버 불필요)
- **GitHub Actions** — 빌드 및 GitHub Pages 자동 배포

## 디렉터리 구조

```
wiki/
├── .github/workflows/deploy.yml   # GitHub Actions 배포
├── docs/                          # 마크다운 문서 루트
│   ├── index.md                   # 홈페이지
│   ├── .vitepress/config.ts       # VitePress 설정
│   └── [카테고리]/[문서].md
└── docs/public/admin/
    ├── index.html                 # Decap CMS 진입점
    └── config.yml                 # Decap CMS 설정
```

## 주요 명령어

```bash
npm run docs:dev      # 로컬 개발 서버 시작
npm run docs:build    # 정적 사이트 빌드
npm run docs:preview  # 빌드 결과 미리보기
```

## 개발 단계

- [ ] Phase 1 — VitePress 초기화 + GitHub Actions 배포
- [ ] Phase 2 — 블로그 스타일 테마/네비게이션
- [ ] Phase 3 — Decap CMS 웹 에디터 연동
- [ ] Phase 4 — 권한 관리 및 최종 검증

## 주의사항

- GitHub Pages 무료 배포는 **Public 리포지토리** 필요
- Decap CMS 편집 권한은 GitHub **Collaborator** 초대로 관리
- OAuth 콜백은 Netlify 무료 사이트를 프록시로 사용 (별도 배포 불필요)
