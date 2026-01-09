import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Building2,
  LayoutGrid,
  BookOpen,
  MessageCircleQuestion,
  LifeBuoy,
  LogIn,
  Shield,
  ChevronRight,
  Filter,
  Star,
  Clock,
  BadgeCheck,
  Settings,
  Wallet,
  Plus,
  CheckCircle2,
  XCircle,
} from "lucide-react";

/**
 * Try Catch — 흐름도 기반 웹 UI 프로토타입
 * - 단일 파일 / 간단 라우팅 (react-router 없이)
 * - 개인/기업/관리자 역할 전환
 */

const routes = {
  home: { label: "메인", icon: LayoutGrid },
  programs: { label: "실습 프로그램", icon: BadgeCheck },
  blog: { label: "기술 블로그", icon: BookOpen },
  qna: { label: "커뮤니티 Q&A", icon: MessageCircleQuestion },
  companies: { label: "기업 정보", icon: Building2 },
  support: { label: "고객센터", icon: LifeBuoy },
};

const roleRoutes = {
  guest: ["home", "programs", "blog", "qna", "companies", "support"],
  personal: ["home", "programs", "blog", "qna", "companies", "support", "mypage"],
  company: ["home", "programs", "blog", "qna", "companies", "support", "companypage"],
  admin: ["home", "programs", "blog", "qna", "companies", "support", "admin"],
};

const extraRoutes = {
  mypage: { label: "마이페이지", icon: User },
  companypage: { label: "기업 페이지", icon: Building2 },
  admin: { label: "Admin", icon: Shield },
  login: { label: "로그인", icon: LogIn },
};

const samplePrograms = [
  {
    id: "p1",
    title: "백엔드 과제: REST API 설계 & 구현",
    company: "TryCatch Labs",
    level: "초급",
    reward: 500,
    applicants: 124,
    status: "모집중",
    summary: "CRUD + 인증/인가 + 테스트를 포함한 실무형 과제",
    tags: ["Spring", "Node", "Auth"],
  },
  {
    id: "p2",
    title: "프론트 과제: 대시보드 UI 구축",
    company: "Orbit Studio",
    level: "중급",
    reward: 800,
    applicants: 73,
    status: "모집중",
    summary: "차트/테이블/필터가 있는 관리자 대시보드",
    tags: ["React", "UI", "Charts"],
  },
  {
    id: "p3",
    title: "데이터 과제: 로그 기반 지표 설계",
    company: "Pulse Analytics",
    level: "중급",
    reward: 900,
    applicants: 45,
    status: "마감임박",
    summary: "정의-수집-대시보드까지 지표 파이프라인 설계",
    tags: ["SQL", "Metric", "ETL"],
  },
  {
    id: "p4",
    title: "시스템 과제: 캐싱/성능 튜닝",
    company: "Nimbus",
    level: "고급",
    reward: 1500,
    applicants: 22,
    status: "모집중",
    summary: "병목 분석, 캐싱 전략, 부하 테스트 리포트 작성",
    tags: ["Cache", "Perf", "LoadTest"],
  },
];

const samplePosts = [
  {
    id: "b1",
    title: "실습형 플랫폼에서 과제 평가 루브릭 만들기",
    author: "TryCatch Labs",
    type: "기업",
    time: "5분 전",
    likes: 38,
    excerpt: "평가 기준을 명확히 하면 참가자의 만족도와 재도전률이 올라갑니다…",
  },
  {
    id: "b2",
    title: "리액트에서 상태를 단순화하는 3가지 패턴",
    author: "개발자 민수",
    type: "개인",
    time: "2시간 전",
    likes: 112,
    excerpt: "Context 남발을 줄이고, 도메인 중심으로 상태를 나누는 법…",
  },
  {
    id: "b3",
    title: "API 속도 2배 개선: 캐시 키 설계와 무효화",
    author: "Nimbus",
    type: "기업",
    time: "어제",
    likes: 64,
    excerpt: "캐시는 넣는 것보다 ‘어떻게 지울지’가 더 어렵습니다…",
  },
];

const sampleQuestions = [
  {
    id: "q1",
    title: "JWT 리프레시 토큰 저장 위치는 보통 어디가 안전할까요?",
    author: "junior_dev",
    answers: 6,
    reward: 80,
    solved: false,
    time: "10분 전",
  },
  {
    id: "q2",
    title: "대시보드 필터 설계를 도메인 기준으로 나누는 팁이 있나요?",
    author: "ui_builder",
    answers: 3,
    reward: 50,
    solved: true,
    time: "오늘",
  },
  {
    id: "q3",
    title: "실습 과제 제출물(깃헙) 평가 자동화는 어떤 방식이 좋을까요?",
    author: "teamlead",
    answers: 9,
    reward: 120,
    solved: false,
    time: "2일 전",
  },
];

function cn(...args) {
  return args.filter(Boolean).join(" ");
}

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
    brand: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
    dark: "bg-zinc-900 text-white border-zinc-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
        tones[tone] || tones.neutral
      )}
    >
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, desc, right }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-zinc-900">{title}</div>
        {desc ? (
          <div className="mt-1 text-sm text-zinc-600">{desc}</div>
        ) : null}
      </div>
      {right}
    </div>
  );
}

function ListItem({ title, metaLeft, metaRight, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left transition hover:bg-zinc-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-900">
            {title}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {metaLeft}
          </div>
          {desc ? (
            <div className="mt-2 line-clamp-2 text-sm text-zinc-600">
              {desc}
            </div>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {metaRight}
          <ChevronRight className="h-4 w-4 text-zinc-400" />
        </div>
      </div>
    </button>
  );
}

function TopBar({ role, setRole, query, setQuery, onGoLogin, notifications }) {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
            tc
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Try Catch</div>
            <div className="text-xs text-zinc-500">
              실습 · 블로그 · 커뮤니티
            </div>
          </div>
        </div>

        <div className="hidden w-[420px] items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="프로그램/글/Q&A 검색…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              aria-label="역할 선택"
            >
              <option value="guest">게스트</option>
              <option value="personal">개인</option>
              <option value="company">기업</option>
              <option value="admin">관리자</option>
            </select>
          </div>
          <button className="relative rounded-xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50" aria-label="알림">
            <Bell className="h-5 w-5 text-zinc-700" />
            {notifications > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[11px] text-white">
                {notifications}
              </span>
            ) : null}
          </button>
          {role === "guest" ? (
            <button
              onClick={onGoLogin}
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              로그인
            </button>
          ) : (
            <button className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
              {role === "personal" ? "민수" : role === "company" ? "Nimbus" : "Admin"}
            </button>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </div>
        <div className="mt-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
            aria-label="역할 선택"
          >
            <option value="guest">게스트</option>
            <option value="personal">개인</option>
            <option value="company">기업</option>
            <option value="admin">관리자</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ role, current, setCurrent }) {
  const items = useMemo(() => {
    const keys = roleRoutes[role] || roleRoutes.guest;
    return keys.map((k) => {
      const base = routes[k] || extraRoutes[k];
      return { key: k, ...base };
    });
  }, [role]);

  return (
    <div className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white md:block">
      <div className="p-4">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="text-xs text-zinc-500">현재 역할</div>
          <div className="mt-1 text-sm font-semibold text-zinc-900">
            {role === "guest"
              ? "게스트"
              : role === "personal"
              ? "개인"
              : role === "company"
              ? "기업"
              : "관리자"}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill tone="brand">실습</Pill>
            <Pill tone="info">블로그</Pill>
            <Pill tone="neutral">커뮤니티</Pill>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          {items.map((it) => {
            const Icon = it.icon;
            const active = current === it.key;
            return (
              <button
                key={it.key}
                onClick={() => setCurrent(it.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-zinc-600")} />
                <span className="font-medium">{it.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto border-t border-zinc-200 p-4">
        <div className="flex items-center justify-between rounded-2xl bg-white p-3">
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <Wallet className="h-4 w-4" />
            <span>포인트</span>
          </div>
          <span className="text-sm font-semibold text-zinc-900">
            {role === "personal" ? "1,120" : role === "company" ? "—" : "0"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PageShell({ title, subtitle, actions, children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-zinc-900">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-sm text-zinc-600">{subtitle}</div>
          ) : null}
        </div>
        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

function Home({ onGoPrograms, onGoBlog, onGoQna }) {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="grid gap-4 md:grid-cols-12">
          <Card className="md:col-span-8">
            <div className="p-6">
              <Pill tone="dark">실무로 증명하는 성장</Pill>
              <div className="mt-4 text-3xl font-semibold leading-tight text-zinc-900 md:text-4xl">
                실습으로 성장하고,
                <br />
                콘텐츠로 공유하고,
                <br />
                커뮤니티로 연결하세요.
              </div>
              <div className="mt-3 max-w-xl text-sm text-zinc-600">
                기업 연계 실습 프로그램 + 기술 블로그 + Q&A 포인트 보상.
                지금 시작해서 포트폴리오와 실력을 동시에 쌓아보세요.
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={onGoPrograms}
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  실습 프로그램 둘러보기
                </button>
                <button
                  onClick={onGoBlog}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  기술 블로그 보기
                </button>
                <button
                  onClick={onGoQna}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Q&A 참여하기
                </button>
              </div>
            </div>
          </Card>

          <Card className="md:col-span-4">
            <div className="p-6">
              <SectionTitle
                title="이번 주 하이라이트"
                desc="가장 많이 참여 중인 흐름"
              />
              <div className="space-y-3">
                <div className="rounded-xl bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <Star className="h-4 w-4" /> 인기 실습
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    REST API 설계 과제 · 참여 124명
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <Clock className="h-4 w-4" /> 새 글
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    캐시 키 설계와 무효화 · Nimbus
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <MessageCircleQuestion className="h-4 w-4" /> Q&A
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    JWT 리프레시 토큰 저장 위치 · 6답변
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <BadgeCheck className="h-4 w-4" /> 단계별 실습
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                초급 → 고급까지. 기업이 만든 과제로 실무 역량을 쌓아요.
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <BookOpen className="h-4 w-4" /> 기술 블로그
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                기업/개인이 함께. 학습 로그를 포트폴리오로 남겨요.
              </div>
            </div>
          </Card>
          <Card>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <Wallet className="h-4 w-4" /> 포인트 보상
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                실습 완료·답변 채택으로 포인트를 모아 혜택을 받아요.
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="p-6">
              <SectionTitle
                title="인기 실습 프로그램"
                desc="지금 가장 많이 참여 중"
                right={
                  <button
                    onClick={onGoPrograms}
                    className="text-sm font-semibold text-zinc-900 hover:underline"
                  >
                    더보기
                  </button>
                }
              />
              <div className="space-y-2">
                {samplePrograms.slice(0, 3).map((p) => (
                  <ListItem
                    key={p.id}
                    title={p.title}
                    desc={p.summary}
                    metaLeft={
                      <>
                        <Pill tone="brand">{p.level}</Pill>
                        <Pill>{p.company}</Pill>
                        <Pill tone={p.status === "마감임박" ? "warn" : "neutral"}>
                          {p.status}
                        </Pill>
                      </>
                    }
                    metaRight={<Pill tone="dark">+{p.reward}P</Pill>}
                    onClick={onGoPrograms}
                  />
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <SectionTitle
                title="기술 블로그"
                desc="최신 인기 글"
                right={
                  <button
                    onClick={onGoBlog}
                    className="text-sm font-semibold text-zinc-900 hover:underline"
                  >
                    더보기
                  </button>
                }
              />
              <div className="space-y-2">
                {samplePosts.map((b) => (
                  <ListItem
                    key={b.id}
                    title={b.title}
                    desc={b.excerpt}
                    metaLeft={
                      <>
                        <Pill tone={b.type === "기업" ? "info" : "neutral"}>
                          {b.type}
                        </Pill>
                        <Pill>{b.author}</Pill>
                        <Pill>{b.time}</Pill>
                      </>
                    }
                    metaRight={
                      <div className="flex items-center gap-1 text-sm text-zinc-700">
                        <Star className="h-4 w-4" /> {b.likes}
                      </div>
                    }
                    onClick={onGoBlog}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Programs({ query }) {
  const [level, setLevel] = useState("전체");
  const [sort, setSort] = useState("인기");
  const filtered = useMemo(() => {
    let list = [...samplePrograms];
    if (level !== "전체") list = list.filter((p) => p.level === level);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q)
      );
    }
    if (sort === "인기") list.sort((a, b) => b.applicants - a.applicants);
    if (sort === "최신") list.sort((a, b) => (a.id < b.id ? 1 : -1));
    if (sort === "보상") list.sort((a, b) => b.reward - a.reward);
    return list;
  }, [query, level, sort]);

  return (
    <PageShell
      title="실습 프로그램"
      subtitle="기업 연계 실무 과제를 단계별로 수행하고 포인트를 획득하세요."
      actions={
        <>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm">
            <Filter className="h-4 w-4 text-zinc-500" />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-transparent outline-none"
              aria-label="난이도 필터"
            >
              <option>전체</option>
              <option>초급</option>
              <option>중급</option>
              <option>고급</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent outline-none"
              aria-label="정렬"
            >
              <option>인기</option>
              <option>최신</option>
              <option>보상</option>
            </select>
          </div>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle
                title="프로그램 목록"
                desc={`총 ${filtered.length}개`}
              />
              <div className="space-y-2">
                {filtered.map((p) => (
                  <ProgramRow key={p.id} p={p} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <SectionTitle title="참여 가이드" desc="흐름도 기반 사용자 동선" />
              <ol className="space-y-3 text-sm text-zinc-700">
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                    1
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">프로그램 선택</div>
                    <div className="mt-1 text-zinc-600">
                      난이도/기업/보상으로 필터링
                    </div>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                    2
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">신청 & 수행</div>
                    <div className="mt-1 text-zinc-600">
                      일정에 맞춰 과제 수행
                    </div>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                    3
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-900">제출 & 평가</div>
                    <div className="mt-1 text-zinc-600">
                      제출물(링크/파일) 등록 후 승인
                    </div>
                  </div>
                </li>
              </ol>
              <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="font-semibold text-zinc-900">팁</div>
                <div className="mt-1 text-zinc-600">
                  실습 결과를 기술 블로그로 정리하면 포트폴리오에 좋아요.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function ProgramRow({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-900">
              {p.title}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Pill tone="brand">{p.level}</Pill>
              <Pill>{p.company}</Pill>
              <Pill tone={p.status === "마감임박" ? "warn" : "neutral"}>
                {p.status}
              </Pill>
              <Pill>{p.applicants}명 참여</Pill>
              <Pill tone="dark">+{p.reward}P</Pill>
            </div>
            <div className="mt-2 line-clamp-2 text-sm text-zinc-600">
              {p.summary}
            </div>
          </div>
          <ChevronRight
            className={cn(
              "mt-1 h-5 w-5 text-zinc-400 transition",
              open ? "rotate-90" : "rotate-0"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-200"
          >
            <div className="grid gap-4 px-4 py-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-zinc-900">상세</div>
                <div className="mt-2 text-sm text-zinc-600">
                  • 요구사항: 기능 구현 + README + 테스트(선택)
                  <br />• 제출: GitHub 링크
                  <br />• 평가: 루브릭 기반(완성도/품질/문서)
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Pill key={t} tone="info">
                      {t}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-900">액션</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                    신청하기
                  </button>
                  <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                    상세 보기
                  </button>
                  <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                    문의하기
                  </button>
                </div>
                <div className="mt-4 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-700">
                  <div className="font-semibold text-zinc-900">예상 소요</div>
                  <div className="mt-1 text-zinc-600">4~8시간</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Blog({ query }) {
  const [tab, setTab] = useState("전체");
  const filtered = useMemo(() => {
    let list = [...samplePosts];
    if (tab !== "전체") list = list.filter((p) => p.type === tab);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tab, query]);

  return (
    <PageShell
      title="기술 블로그"
      subtitle="기업/개인의 기술 공유를 한 곳에서 읽고, 작성하고, 저장하세요."
      actions={
        <>
          <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
            작성하기
          </button>
        </>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {["전체", "기업", "개인"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold",
              tab === t
                ? "bg-zinc-900 text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="글 목록" desc={`총 ${filtered.length}개`} />
              <div className="space-y-2">
                {filtered.map((b) => (
                  <ListItem
                    key={b.id}
                    title={b.title}
                    desc={b.excerpt}
                    metaLeft={
                      <>
                        <Pill tone={b.type === "기업" ? "info" : "neutral"}>
                          {b.type}
                        </Pill>
                        <Pill>{b.author}</Pill>
                        <Pill>{b.time}</Pill>
                      </>
                    }
                    metaRight={
                      <div className="flex items-center gap-1 text-sm text-zinc-700">
                        <Star className="h-4 w-4" /> {b.likes}
                      </div>
                    }
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <SectionTitle title="추천 주제" desc="흐름도: 메인 프로필/획득 뱃지" />
              <div className="flex flex-wrap gap-2">
                {[
                  "API 설계",
                  "테스트",
                  "대시보드",
                  "캐싱",
                  "인증/인가",
                  "SQL",
                  "성능",
                ].map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="font-semibold text-zinc-900">작성 가이드</div>
                <div className="mt-1 text-zinc-600">
                  실습 후기(문제-해결-배운점)를 템플릿으로 제공하면 품질이 올라가요.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function QnA({ query }) {
  const [showSolved, setShowSolved] = useState("전체");
  const filtered = useMemo(() => {
    let list = [...sampleQuestions];
    if (showSolved === "미해결") list = list.filter((q) => !q.solved);
    if (showSolved === "해결") list = list.filter((q) => q.solved);
    if (query.trim()) {
      const qq = query.toLowerCase();
      list = list.filter((q) => q.title.toLowerCase().includes(qq));
    }
    return list;
  }, [showSolved, query]);

  return (
    <PageShell
      title="커뮤니티 Q&A"
      subtitle="질문하고 답변하면 포인트를 받는 개발 커뮤니티."
      actions={
        <>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm">
            <select
              value={showSolved}
              onChange={(e) => setShowSolved(e.target.value)}
              className="bg-transparent outline-none"
              aria-label="해결 상태"
            >
              <option>전체</option>
              <option>미해결</option>
              <option>해결</option>
            </select>
          </div>
          <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
            질문 작성
          </button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="질문 목록" desc={`총 ${filtered.length}개`} />
              <div className="space-y-2">
                {filtered.map((q) => (
                  <ListItem
                    key={q.id}
                    title={q.title}
                    desc={"질문 상세로 들어가면 답변/채택/포인트 흐름을 진행합니다."}
                    metaLeft={
                      <>
                        <Pill tone={q.solved ? "brand" : "warn"}>
                          {q.solved ? "해결" : "미해결"}
                        </Pill>
                        <Pill>{q.author}</Pill>
                        <Pill>{q.time}</Pill>
                        <Pill>{q.answers} 답변</Pill>
                      </>
                    }
                    metaRight={<Pill tone="dark">+{q.reward}P</Pill>}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <SectionTitle title="포인트 규칙" desc="흐름도: 알림 목록/설정" />
              <div className="space-y-3 text-sm text-zinc-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-semibold text-zinc-900">답변 채택</div>
                    <div className="mt-1 text-zinc-600">
                      채택 시 보상 포인트가 지급됩니다.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-semibold text-zinc-900">좋은 답변</div>
                    <div className="mt-1 text-zinc-600">
                      추천/신뢰도에 따라 추가 보상(선택).
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4" />
                  <div>
                    <div className="font-semibold text-zinc-900">스팸/신고</div>
                    <div className="mt-1 text-zinc-600">
                      신고 누적 시 제재 및 포인트 회수.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function Companies() {
  const list = [
    {
      name: "Nimbus",
      desc: "캐싱/성능 튜닝 과제 운영",
      jobs: "백엔드/플랫폼",
    },
    { name: "Orbit Studio", desc: "대시보드 UI 과제 운영", jobs: "프론트" },
    { name: "Pulse Analytics", desc: "지표/데이터 과제 운영", jobs: "데이터" },
  ];

  return (
    <PageShell
      title="기업 정보"
      subtitle="프로그램을 운영하는 기업을 살펴보고, 연계 정보(채용/과제)를 확인하세요."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {list.map((c) => (
          <Card key={c.name}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-zinc-900">{c.name}</div>
                <Pill tone="info">기업</Pill>
              </div>
              <div className="mt-2 text-sm text-zinc-600">{c.desc}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>{c.jobs}</Pill>
                <Pill tone="brand">프로그램 운영</Pill>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                  기업 상세
                </button>
                <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                  프로그램 보기
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

function Support() {
  return (
    <PageShell
      title="고객센터"
      subtitle="문의/신고/공지사항을 확인하세요."
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="1:1 문의" desc="개인/기업 선택 후 문의 접수" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">개인</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    계정/포인트/실습 참여 문의
                  </div>
                  <button className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                    문의하기
                  </button>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">기업</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    프로그램 운영/승인/정산 문의
                  </div>
                  <button className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <SectionTitle title="공지사항" desc="서비스 안내" />
              <div className="space-y-2 text-sm text-zinc-700">
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="font-semibold text-zinc-900">포인트 정책 업데이트</div>
                  <div className="mt-1 text-zinc-600">채택 보상 조정 안내</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="font-semibold text-zinc-900">프로그램 제출 가이드</div>
                  <div className="mt-1 text-zinc-600">깃헙/배포 링크 예시</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function MyPage() {
  return (
    <PageShell
      title="마이페이지"
      subtitle="신청/활동/알림/설정을 한 곳에서 관리합니다."
      actions={
        <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
          <Settings className="mr-2 inline h-4 w-4" />
          설정
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">개인</div>
                  <div className="text-lg font-semibold text-zinc-900">개발자 민수</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">진행 중</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">2</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">완료</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">5</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">포인트</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">1,120</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">뱃지</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">3</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill tone="brand">실습러</Pill>
                <Pill tone="info">기술 기록</Pill>
                <Pill>답변러</Pill>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="나의 활동" desc="신청 내역 · 활동 내역 · 알림" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">신청 내역</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    프로그램 신청/승인 상태 확인
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">활동 내역</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    블로그/댓글/Q&A 참여 기록
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">알림</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    승인/채택/멘션 알림 모아보기
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">계정 설정</div>
                  <div className="mt-1 text-sm text-zinc-600">
                    개인정보/비밀번호/알림 설정
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function CompanyPage() {
  return (
    <PageShell
      title="기업 페이지"
      subtitle="프로그램 운영 · 참여자 관리 · 팀 관리"
      actions={
        <button className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
          <Plus className="mr-2 inline h-4 w-4" />
          프로그램 등록
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">기업</div>
                  <div className="text-lg font-semibold text-zinc-900">Nimbus</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">운영 중</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">3</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">신청자</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">215</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">승인 대기</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">18</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">팀원</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">4</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill tone="info">담당자 관리</Pill>
                <Pill tone="brand">승인/탈락</Pill>
                <Pill>프로필</Pill>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="운영 중 프로그램" desc="신청자 승인/탈락, 제출물 확인" />
              <div className="space-y-2">
                {samplePrograms.slice(0, 2).map((p) => (
                  <ListItem
                    key={p.id}
                    title={p.title}
                    desc={"신청자 목록 → 승인/탈락 처리 → 제출물 리뷰"}
                    metaLeft={
                      <>
                        <Pill tone="brand">{p.level}</Pill>
                        <Pill>{p.status}</Pill>
                        <Pill>{p.applicants} 신청</Pill>
                      </>
                    }
                    metaRight={<Pill tone="dark">운영</Pill>}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function Admin() {
  return (
    <PageShell
      title="Admin"
      subtitle="회원/기업/프로그램/신고/문의/뱃지·포인트 관리"
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <div className="p-6">
              <SectionTitle title="대시보드" desc="운영 지표" />
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">회원</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">12,340</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">기업</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">84</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">프로그램</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">156</div>
                </div>
                <div className="rounded-xl bg-zinc-50 p-3">
                  <div className="text-xs text-zinc-500">신고</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900">7</div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="font-semibold text-zinc-900">처리 우선순위</div>
                <div className="mt-1 text-zinc-600">
                  신고/문의 → 기업 승인 → 프로그램 검수
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card>
            <div className="p-6">
              <SectionTitle title="처리 대기" desc="승인/신고/문의" />
              <div className="space-y-2">
                <ListItem
                  title="기업 승인 요청: Orbit Studio"
                  desc="기업 인증 서류 제출 — 승인/반려"
                  metaLeft={
                    <>
                      <Pill tone="warn">대기</Pill>
                      <Pill>기업 승인</Pill>
                    </>
                  }
                  metaRight={<Pill tone="dark">검토</Pill>}
                  onClick={() => {}}
                />
                <ListItem
                  title="신고: Q&A 스팸 의심"
                  desc="반복 게시/링크 도배 — 조치 필요"
                  metaLeft={
                    <>
                      <Pill tone="warn">대기</Pill>
                      <Pill>신고</Pill>
                    </>
                  }
                  metaRight={<Pill tone="dark">조치</Pill>}
                  onClick={() => {}}
                />
                <ListItem
                  title="문의: 포인트 정산 관련"
                  desc="기업 정산 문의 — 정책 안내"
                  metaLeft={
                    <>
                      <Pill tone="neutral">신규</Pill>
                      <Pill>문의</Pill>
                    </>
                  }
                  metaRight={<Pill tone="dark">답변</Pill>}
                  onClick={() => {}}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function Login({ onLogin }) {
  const [mode, setMode] = useState("개인");
  return (
    <PageShell
      title="로그인"
      subtitle="아이디/비밀번호 또는 소셜 로그인 (카카오 등)"
    >
      <div className="mx-auto max-w-xl">
        <Card>
          <div className="p-6">
            <div className="flex gap-2">
              {["개인", "기업"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 rounded-xl px-4 py-2 text-sm font-semibold",
                    mode === m
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  )}
                >
                  {m} 로그인
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                placeholder="아이디"
              />
              <input
                type="password"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                placeholder="비밀번호"
              />
              <button
                onClick={() => onLogin(mode === "개인" ? "personal" : "company")}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                로그인
              </button>

              <div className="grid gap-2 md:grid-cols-2">
                <button className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                  아이디/비밀번호 찾기
                </button>
                <button className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                  회원가입
                </button>
              </div>

              <div className="mt-2 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="font-semibold text-zinc-900">소셜 로그인</div>
                <div className="mt-1 text-zinc-600">카카오/구글 등 연결 가능</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function MobileNav({ role, current, setCurrent }) {
  const keys = roleRoutes[role] || roleRoutes.guest;
  const items = keys
    .filter((k) => ["home", "programs", "blog", "qna", "mypage", "companypage", "admin"].includes(k))
    .slice(0, 5)
    .map((k) => {
      const base = routes[k] || extraRoutes[k];
      return { key: k, ...base };
    });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-200 bg-white md:hidden">
      <div className="mx-auto flex max-w-6xl justify-around px-2 py-2">
        {items.map((it) => {
          const Icon = it.icon;
          const active = current === it.key;
          return (
            <button
              key={it.key}
              onClick={() => setCurrent(it.key)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs",
                active ? "text-zinc-900" : "text-zinc-500"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-zinc-900" : "text-zinc-500")} />
              <span className={cn("font-semibold", active ? "" : "font-medium")}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("guest");
  const [current, setCurrent] = useState("home");
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(3);

  // 역할 바뀌면 접근 가능한 메뉴로 자동 이동
  React.useEffect(() => {
    const allowed = new Set(roleRoutes[role] || roleRoutes.guest);
    if (!allowed.has(current)) {
      setCurrent("home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const goLogin = () => setCurrent("login");

  const onLogin = (newRole) => {
    setRole(newRole);
    setCurrent(newRole === "personal" ? "mypage" : "companypage");
    setNotifications(5);
  };

  const page = useMemo(() => {
    switch (current) {
      case "home":
        return (
          <Home
            onGoPrograms={() => setCurrent("programs")}
            onGoBlog={() => setCurrent("blog")}
            onGoQna={() => setCurrent("qna")}
          />
        );
      case "programs":
        return <Programs query={query} />;
      case "blog":
        return <Blog query={query} />;
      case "qna":
        return <QnA query={query} />;
      case "companies":
        return <Companies />;
      case "support":
        return <Support />;
      case "mypage":
        return <MyPage />;
      case "companypage":
        return <CompanyPage />;
      case "admin":
        return <Admin />;
      case "login":
        return <Login onLogin={onLogin} />;
      default:
        return <Home onGoPrograms={() => setCurrent("programs")} onGoBlog={() => setCurrent("blog")} onGoQna={() => setCurrent("qna")} />;
    }
  }, [current, query]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <TopBar
        role={role}
        setRole={(r) => {
          setRole(r);
          if (r === "guest") setCurrent("home");
          if (r === "admin") setCurrent("admin");
          if (r === "personal") setCurrent("mypage");
          if (r === "company") setCurrent("companypage");
        }}
        query={query}
        setQuery={setQuery}
        onGoLogin={goLogin}
        notifications={notifications}
      />

      <div className="mx-auto flex max-w-6xl">
        <Sidebar role={role} current={current} setCurrent={setCurrent} />
        <main className="w-full pb-20 md:pb-8">{page}</main>
      </div>

      <MobileNav role={role} current={current} setCurrent={setCurrent} />

      <div className="mx-auto max-w-6xl px-4 pb-24 md:pb-10">
        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700">
          <div className="font-semibold text-zinc-900">이 프로토타입에서 가능한 것</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-600">
            <li>흐름도 기반 메뉴 구조(메인/실습/블로그/Q&A/기업/고객센터/마이/기업/어드민)</li>
            <li>검색창으로 목록 필터링(프로그램/블로그/Q&A)</li>
            <li>역할 전환(게스트/개인/기업/관리자)으로 화면 동선 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
