"use client";

import { useMemo, useState } from "react";

const movies = [
  {
    id: 1,
    title: "Past Lives",
    koreanTitle: "패스트 라이브즈",
    year: "2023",
    director: "Celine Song",
    country: "USA / Korea",
    runtime: "106min",
    poster:
      "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    curatorNote:
      "사랑보다 인연, 선택보다 남겨진 가능성에 가까운 영화. 조용한 대화 속에서 지나간 시간의 무게를 느끼게 한다.",
    awards: ["Academy Awards Best Picture Nominee", "Golden Globe Nominee"],
    tags: ["회고적", "인연", "잔잔한 슬픔", "말하지 못한 감정"],
    axis: ["Memory", "Relationship", "Silence"],
  },
  {
    id: 2,
    title: "Decision to Leave",
    koreanTitle: "헤어질 결심",
    year: "2022",
    director: "Park Chan-wook",
    country: "Korea",
    runtime: "138min",
    poster:
      "https://image.tmdb.org/t/p/w500/zD5v1E4joAzFvmAEytt7fM3ivyT.jpg",
    curatorNote:
      "사랑과 의심의 경계가 무너지는 영화. 직접 말하지 않는 감정이 안개처럼 화면 전체에 번진다.",
    awards: ["Cannes Best Director"],
    tags: ["불완전한 관계", "안개 같은 감정", "절제된 로맨스", "미장센"],
    axis: ["Obsession", "Gaze", "Distance"],
  },
  {
    id: 3,
    title: "Aftersun",
    koreanTitle: "애프터썬",
    year: "2022",
    director: "Charlotte Wells",
    country: "UK / USA",
    runtime: "101min",
    poster:
      "https://image.tmdb.org/t/p/w500/evKz85EKouVbIr51zy5fOtpNRPg.jpg",
    curatorNote:
      "그때는 이해하지 못했던 사랑을 뒤늦게 바라보는 영화. 기억은 선명하지만, 감정은 끝내 완전히 설명되지 않는다.",
    awards: ["Academy Awards Best Actor Nominee"],
    tags: ["기억", "가족", "상실", "뒤늦은 이해"],
    axis: ["Family", "Memory", "Loss"],
  },
];

const posts = [
  {
    id: 1,
    user: "afterblue",
    movie: "Past Lives",
    text: "이 영화는 첫사랑의 이야기가 아니라, 선택하지 않은 삶에 대한 조용한 애도처럼 느껴졌다.",
    tags: ["회고적", "인연", "후회"],
    likes: 184,
    saves: 52,
    comments: 18,
  },
  {
    id: 2,
    user: "slowcut",
    movie: "Decision to Leave",
    text: "사랑한다고 말하지 않아서 더 사랑처럼 느껴지는 영화. 감정이 직접 드러나지 않을 때 오히려 선명해진다.",
    tags: ["절제", "안개", "관계"],
    likes: 142,
    saves: 41,
    comments: 11,
  },
  {
    id: 3,
    user: "framezero",
    movie: "Aftersun",
    text: "아버지를 이해하는 건 늘 너무 늦게 도착하는 일 같다. 이 영화는 그 늦음의 감정을 붙잡는다.",
    tags: ["가족", "기억", "상실"],
    likes: 119,
    saves: 47,
    comments: 9,
  },
];

const people = [
  {
    id: 1,
    name: "afterblue",
    sentence: "해피엔딩보다 오래 남는 침묵을 좋아합니다.",
    match: 93,
    tags: ["느린 호흡", "열린 결말", "불완전한 관계"],
  },
  {
    id: 2,
    name: "slowcut",
    sentence: "장면보다 장면 이후의 감정을 오래 기억합니다.",
    match: 87,
    tags: ["미장센", "고독한 인물", "잔잔한 슬픔"],
  },
  {
    id: 3,
    name: "cinememory",
    sentence: "말로 설명되지 않는 감정에 오래 머무릅니다.",
    match: 81,
    tags: ["기억", "관계의 거리", "회고"],
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("films");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [review, setReview] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const myTaste = useMemo(
    () => ({
      line: "사건보다 감정의 잔상을 오래 바라보는 타입",
      tags: ["느린 호흡", "여운", "불완전한 관계", "기억", "미장센"],
      dna: [
        { label: "감정 중심", value: 89 },
        { label: "미장센 민감도", value: 78 },
        { label: "열린 결말 선호", value: 74 },
        { label: "대중성 선호", value: 34 },
      ],
      sources: [
        "내가 본 영화",
        "관심작",
        "내가 쓴 리뷰",
        "좋아요/저장한 글",
        "팔로우한 유저/평론가",
      ],
    }),
    []
  );

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation("");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedMovie,
          review,
          userTaste: myTaste,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRecommendation(data.error || "추천 생성 중 오류가 발생했습니다.");
      } else {
        setRecommendation(data.result);
      }
    } catch {
      setRecommendation(
        "API 연결에 실패했습니다. .env.local 또는 Vercel 환경변수를 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="site">
        <header className="navbar">
          <div className="logo">
            CinePa<span>Z</span>e
          </div>

          <nav className="navTabs">
            <button
              className={activeTab === "films" ? "active" : ""}
              onClick={() => setActiveTab("films")}
            >
              영화정보
            </button>
            <button
              className={activeTab === "community" ? "active" : ""}
              onClick={() => setActiveTab("community")}
            >
              커뮤니티
            </button>
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              내 프로필
            </button>
            <button
              className={activeTab === "recommend" ? "active" : ""}
              onClick={() => setActiveTab("recommend")}
            >
              추천/매칭
            </button>
          </nav>

          <button className="loginBtn">로그인 / 가입</button>
        </header>

        <section className="hero">
          <div className="heroText">
            <p className="eyebrow">FILM TASTE SOCIAL NETWORK</p>
            <h1>
              영화의 새로운 축을 만들다,
              <br />
              CinePa<span>Z</span>e
            </h1>
            <p>
              운영자가 큐레이션한 영화 정보에서 시작해, 감상글·관심작·저장한
              글·팔로우 데이터를 바탕으로 나만의 취향 프로필과 사람 매칭을
              만듭니다.
            </p>
          </div>

          <div className="heroPreview">
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div>
              <p className="eyebrow">NOW CURATED</p>
              <h2>{selectedMovie.title}</h2>
              <p>
                {selectedMovie.year} · {selectedMovie.director}
              </p>
              <div className="tagRow">
                {selectedMovie.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {activeTab === "films" && (
          <section className="pageGrid">
            <div>
              <div className="sectionHeader">
                <p className="eyebrow">OPERATOR CURATED</p>
                <h2>운영자 큐레이션 영화정보</h2>
                <p>
                  영화 정보는 API 검색형이 아니라 운영자가 직접 선별해 올리는
                  큐레이션 페이지입니다.
                </p>
              </div>

              <div className="movieGrid">
                {movies.map((movie) => (
                  <button
                    key={movie.id}
                    className={`movieCard ${
                      selectedMovie.id === movie.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img src={movie.poster} alt={movie.title} />
                    <div>
                      <p>{movie.koreanTitle}</p>
                      <h3>{movie.title}</h3>
                      <span>{movie.director}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <aside className="detailPanel">
              <p className="eyebrow">FILM PAGE</p>
              <h2>{selectedMovie.title}</h2>
              <p className="muted">
                {selectedMovie.koreanTitle} · {selectedMovie.year} ·{" "}
                {selectedMovie.country} · {selectedMovie.runtime}
              </p>

              <div className="detailBody">
                <img src={selectedMovie.poster} alt={selectedMovie.title} />
                <div>
                  <h3>Curator's Note</h3>
                  <p>{selectedMovie.curatorNote}</p>
                </div>
              </div>

              <div className="infoBlock">
                <h3>수상 / 노미네이트</h3>
                {selectedMovie.awards.map((award) => (
                  <p key={award}>• {award}</p>
                ))}
              </div>

              <div className="infoBlock">
                <h3>CinePaZe Axis</h3>
                <div className="axisRow">
                  {selectedMovie.axis.map((axis) => (
                    <span key={axis}>{axis}</span>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        )}

        {activeTab === "community" && (
          <section className="pageGrid">
            <div>
              <div className="sectionHeader">
                <p className="eyebrow">COMMUNITY</p>
                <h2>영화로 자기 이야기를 쓰는 피드</h2>
                <p>
                  단순 리뷰가 아니라 영화로 자기 취향, 감정, 기억을 드러내는
                  공간입니다.
                </p>
              </div>

              <div className="composer">
                <div>
                  <strong>오늘 어떤 영화가 남았나요?</strong>
                  <p>장면, 대사, 인물, 분위기, 내 기억 중 하나로 시작하세요.</p>
                </div>
                <button>글쓰기</button>
              </div>

              <div className="postList">
                {posts.map((post) => (
                  <article className="postCard" key={post.id}>
                    <div className="postTop">
                      <strong>@{post.user}</strong>
                      <span>{post.movie}</span>
                    </div>
                    <p>{post.text}</p>
                    <div className="tagRow">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="meta">
                      <span>좋아요 {post.likes}</span>
                      <span>저장 {post.saves}</span>
                      <span>댓글 {post.comments}</span>
                      <span>같은 감상</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="sidePanel">
              <h2>글쓰기 프롬프트</h2>
              <div className="promptList">
                <p>이 영화에서 가장 오래 남은 장면은?</p>
                <p>이 인물에게 공감한 이유는?</p>
                <p>이 영화가 내 삶과 닮은 부분은?</p>
                <p>나만 이렇게 느꼈나 싶은 해석은?</p>
              </div>
            </aside>
          </section>
        )}

        {activeTab === "profile" && (
          <section className="profileGrid">
            <div className="profileMain">
              <p className="eyebrow">MY TASTE PROFILE</p>
              <h2>@my_paze</h2>
              <p className="profileSentence">“{myTaste.line}”</p>

              <div className="posterRow">
                {movies.map((movie) => (
                  <img key={movie.id} src={movie.poster} alt={movie.title} />
                ))}
              </div>

              <div className="tagRow">
                {myTaste.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="sidePanel">
              <h2>취향 DNA</h2>
              {myTaste.dna.map((item) => (
                <div className="dnaItem" key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="bar">
                    <div style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="sidePanel">
              <h2>프로필 데이터 소스</h2>
              <ul className="sourceList">
                {myTaste.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === "recommend" && (
          <section className="pageGrid">
            <div>
              <div className="sectionHeader">
                <p className="eyebrow">AI RECOMMENDATION</p>
                <h2>추천은 API로 연결</h2>
                <p>
                  영화 정보는 운영자가 관리하고, 추천은 OpenRouter API로 취향과
                  감상문을 분석해 생성합니다.
                </p>
              </div>

              <div className="recommendBox">
                <div className="selectedMini">
                  <img src={selectedMovie.poster} alt={selectedMovie.title} />
                  <div>
                    <p>현재 기준 영화</p>
                    <strong>{selectedMovie.title}</strong>
                  </div>
                </div>

                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="최근 좋았던 영화 감상이나 취향을 적어보세요."
                />

                <button className="mainBtn" onClick={getRecommendation}>
                  {loading ? "추천 생성 중..." : "AI 추천 받기"}
                </button>

                {recommendation && (
                  <div className="aiResult">
                    <h3>AI Recommendation</h3>
                    <p>{recommendation}</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="sidePanel">
              <h2>취향이 맞는 사람</h2>
              <div className="peopleList">
                {people.map((person) => (
                  <article className="personCard" key={person.id}>
                    <div className="match">{person.match}%</div>
                    <h3>@{person.name}</h3>
                    <p>“{person.sentence}”</p>
                    <div className="tagRow">
                      {person.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button>팔로우</button>
                  </article>
                ))}
              </div>
            </aside>
          </section>
        )}
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #f7f7f4;
          color: #111;
          font-family: Arial, Helvetica, sans-serif;
        }

        button,
        textarea {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .site {
          min-height: 100vh;
          background: #f7f7f4;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 88px;
          display: grid;
          grid-template-columns: 220px 1fr 180px;
          align-items: center;
          padding: 0 9.5vw;
          background: rgba(247, 247, 244, 0.92);
          border-bottom: 1px solid #e7e4dc;
          backdrop-filter: blur(16px);
        }

        .logo {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.06em;
        }

        .logo span,
        .hero h1 span {
          color: #2563eb;
        }

        .navTabs {
          display: flex;
          justify-content: center;
          gap: 34px;
        }

        .navTabs button {
          border: 0;
          background: transparent;
          color: #666;
          font-size: 15px;
          font-weight: 800;
          padding: 8px 2px;
        }

        .navTabs button.active {
          color: #111;
          outline: 1px solid #111;
          outline-offset: 3px;
        }

        .loginBtn {
          justify-self: end;
          border: 0;
          background: #050505;
          color: white;
          border-radius: 999px;
          padding: 14px 24px;
          font-weight: 900;
          font-size: 15px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 60px;
          align-items: center;
          padding: 72px 9.5vw 56px;
        }

        .eyebrow {
          margin: 0 0 18px;
          color: #9a9a9a;
          font-size: 13px;
          letter-spacing: 0.34em;
          font-weight: 900;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(48px, 6vw, 82px);
          line-height: 0.98;
          letter-spacing: -0.08em;
        }

        .heroText > p:last-child {
          max-width: 760px;
          margin-top: 24px;
          color: #6c6c6c;
          font-size: 18px;
          line-height: 1.8;
        }

        .heroPreview {
          display: grid;
          grid-template-columns: 190px 1fr;
          gap: 24px;
          align-items: end;
          padding: 20px;
          border-radius: 34px;
          background: white;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid #ece8df;
        }

        .heroPreview img {
          width: 100%;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          border-radius: 24px;
        }

        .heroPreview h2 {
          margin: 0;
          font-size: 34px;
          letter-spacing: -0.05em;
        }

        .heroPreview p {
          color: #777;
        }

        .pageGrid {
          display: grid;
          grid-template-columns: 1fr 0.88fr;
          gap: 32px;
          padding: 0 9.5vw 80px;
          align-items: start;
        }

        .sectionHeader {
          margin-bottom: 30px;
        }

        .sectionHeader h2 {
          margin: 0;
          font-size: 52px;
          letter-spacing: -0.07em;
        }

        .sectionHeader p {
          color: #777;
          line-height: 1.7;
        }

        .movieGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .movieCard {
          overflow: hidden;
          padding: 0;
          border: 1px solid #ece8df;
          border-radius: 32px;
          background: white;
          text-align: left;
          transition: 0.2s ease;
        }

        .movieCard:hover,
        .movieCard.selected {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.09);
          border-color: #2563eb;
        }

        .movieCard img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
        }

        .movieCard div {
          padding: 24px;
        }

        .movieCard p {
          display: inline-block;
          margin: 0 0 14px;
          padding: 8px 14px;
          border-radius: 999px;
          background: #f2f2ef;
          color: #444;
          font-weight: 700;
          font-size: 13px;
        }

        .movieCard h3 {
          margin: 0 0 10px;
          font-size: 28px;
          letter-spacing: -0.05em;
        }

        .movieCard span {
          color: #777;
        }

        .detailPanel,
        .sidePanel,
        .profileMain,
        .recommendBox {
          background: white;
          border: 1px solid #ece8df;
          border-radius: 34px;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
        }

        .detailPanel h2,
        .sidePanel h2,
        .profileMain h2 {
          margin: 0;
          font-size: 42px;
          letter-spacing: -0.06em;
        }

        .muted {
          color: #777;
          line-height: 1.7;
        }

        .detailBody {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 22px;
          margin: 28px 0;
        }

        .detailBody img {
          width: 100%;
          border-radius: 22px;
          aspect-ratio: 2 / 3;
          object-fit: cover;
        }

        .detailBody h3,
        .infoBlock h3 {
          margin: 0 0 10px;
        }

        .detailBody p,
        .infoBlock p {
          color: #666;
          line-height: 1.8;
        }

        .infoBlock {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }

        .axisRow,
        .tagRow {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .axisRow span,
        .tagRow span {
          padding: 8px 12px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 13px;
          font-weight: 800;
        }

        .composer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 24px;
          border-radius: 30px;
          background: #111;
          color: white;
          margin-bottom: 24px;
        }

        .composer p {
          color: #bbb;
        }

        .composer button,
        .mainBtn,
        .personCard button {
          border: 0;
          border-radius: 999px;
          background: #050505;
          color: white;
          padding: 14px 22px;
          font-weight: 900;
        }

        .composer button {
          background: white;
          color: #111;
        }

        .postList,
        .peopleList,
        .promptList {
          display: grid;
          gap: 18px;
        }

        .postCard,
        .personCard,
        .promptList p {
          background: white;
          border: 1px solid #ece8df;
          border-radius: 28px;
          padding: 24px;
        }

        .postTop {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .postTop span {
          color: #2563eb;
          font-weight: 800;
        }

        .postCard p,
        .personCard p {
          color: #333;
          line-height: 1.8;
          font-size: 17px;
        }

        .meta {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          color: #777;
          margin-top: 18px;
          font-size: 14px;
        }

        .profileGrid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          padding: 0 9.5vw 80px;
        }

        .profileMain {
          grid-row: span 2;
        }

        .profileSentence {
          font-size: 28px;
          line-height: 1.55;
        }

        .posterRow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: 24px 0;
        }

        .posterRow img {
          width: 100%;
          aspect-ratio: 2 / 3;
          object-fit: cover;
          border-radius: 24px;
        }

        .dnaItem {
          margin-top: 20px;
        }

        .dnaItem > div:first-child {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: #666;
        }

        .bar {
          height: 9px;
          border-radius: 999px;
          background: #eee;
          overflow: hidden;
        }

        .bar div {
          height: 100%;
          background: #2563eb;
        }

        .sourceList {
          color: #555;
          line-height: 2;
        }

        .selectedMini {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
        }

        .selectedMini img {
          width: 72px;
          border-radius: 14px;
          aspect-ratio: 2 / 3;
          object-fit: cover;
        }

        textarea {
          width: 100%;
          min-height: 180px;
          border: 1px solid #ddd;
          border-radius: 24px;
          padding: 18px;
          resize: vertical;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .aiResult {
          margin-top: 20px;
          padding: 22px;
          border-radius: 24px;
          background: #eff6ff;
          color: #123;
        }

        .aiResult p {
          white-space: pre-wrap;
          line-height: 1.8;
        }

        .match {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-weight: 900;
          margin-bottom: 16px;
        }

        @media (max-width: 1000px) {
          .navbar {
            grid-template-columns: 1fr;
            height: auto;
            gap: 16px;
            padding: 20px;
          }

          .navTabs {
            justify-content: flex-start;
            flex-wrap: wrap;
          }

          .loginBtn {
            justify-self: start;
          }

          .hero,
          .pageGrid,
          .profileGrid {
            grid-template-columns: 1fr;
            padding-left: 24px;
            padding-right: 24px;
          }

          .movieGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .hero h1 {
            font-size: 42px;
          }

          .heroPreview,
          .detailBody {
            grid-template-columns: 1fr;
          }

          .sectionHeader h2 {
            font-size: 36px;
          }

          .posterRow {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}