"use client";

import { useMemo, useState } from "react";

const curatedMovies = [
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
    tasteTags: ["회고적", "인연", "잔잔한 슬픔", "말하지 못한 감정"],
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
    tasteTags: ["불완전한 관계", "안개 같은 감정", "절제된 로맨스", "미장센"],
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
    tasteTags: ["기억", "가족", "상실", "뒤늦은 이해"],
    axis: ["Family", "Memory", "Loss"],
  },
  {
    id: 4,
    title: "In the Mood for Love",
    koreanTitle: "화양연화",
    year: "2000",
    director: "Wong Kar-wai",
    country: "Hong Kong",
    runtime: "98min",
    poster:
      "https://image.tmdb.org/t/p/w500/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg",
    curatorNote:
      "가장 가까이 있으면서도 닿을 수 없는 마음에 관한 영화. 색감, 음악, 시선만으로 감정의 밀도를 만든다.",
    awards: ["Cannes Best Actor"],
    tasteTags: ["절제된 감정", "색감", "금지된 마음", "여운"],
    axis: ["Desire", "Time", "Restraint"],
  },
];

const communityPosts = [
  {
    id: 1,
    user: "afterblue",
    movie: "Past Lives",
    text: "이 영화는 첫사랑의 이야기가 아니라, 선택하지 않은 삶에 대한 조용한 애도처럼 느껴졌다.",
    tags: ["회고적", "인연", "후회"],
    likes: 184,
    saves: 52,
  },
  {
    id: 2,
    user: "slowcut",
    movie: "Decision to Leave",
    text: "사랑한다고 말하지 않아서 더 사랑처럼 느껴지는 영화. 감정이 직접 드러나지 않을 때 오히려 선명해진다.",
    tags: ["절제", "안개", "관계"],
    likes: 142,
    saves: 41,
  },
  {
    id: 3,
    user: "framezero",
    movie: "Aftersun",
    text: "아버지를 이해하는 건 늘 너무 늦게 도착하는 일 같다. 이 영화는 그 늦음의 감정을 붙잡는다.",
    tags: ["가족", "기억", "상실"],
    likes: 119,
    saves: 47,
  },
];

const people = [
  {
    id: 1,
    name: "afterblue",
    sentence: "해피엔딩보다 오래 남는 침묵을 좋아합니다.",
    match: 93,
    tags: ["느린 호흡", "열린 결말", "불완전한 관계"],
    films: ["Past Lives", "Decision to Leave", "Aftersun"],
  },
  {
    id: 2,
    name: "slowcut",
    sentence: "장면보다 장면 이후의 감정을 오래 기억합니다.",
    match: 87,
    tags: ["미장센", "고독한 인물", "잔잔한 슬픔"],
    films: ["In the Mood for Love", "Perfect Days", "Aftersun"],
  },
  {
    id: 3,
    name: "cinememory",
    sentence: "말로 설명되지 않는 감정에 오래 머무릅니다.",
    match: 81,
    tags: ["기억", "관계의 거리", "회고"],
    films: ["Past Lives", "Drive My Car", "Her"],
  },
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(curatedMovies[0]);
  const [review, setReview] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const myTaste = useMemo(
    () => ({
      line: "당신은 사건보다 감정의 잔상을 오래 바라보는 타입입니다.",
      tags: ["느린 호흡", "여운", "불완전한 관계", "기억", "미장센"],
      dna: [
        { label: "감정 중심", value: 89 },
        { label: "미장센 민감도", value: 78 },
        { label: "열린 결말 선호", value: 74 },
        { label: "대중성 선호", value: 34 },
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
    } catch (error) {
      setRecommendation("API 연결에 실패했습니다. .env.local 파일을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <nav className="nav">
          <div className="brand">
            CinePa<span>Z</span>e
          </div>

          <div className="navLinks">
            <a href="#films">Films</a>
            <a href="#community">Community</a>
            <a href="#profile">Profile</a>
            <a href="#match">Match</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Film Taste Social Network</p>
            <h1>
              영화의 새로운 축을 만들다,
              <br />
              CinePa<span>Z</span>e
            </h1>
            <p className="heroDesc">
              운영자가 큐레이션한 영화 정보 위에 사용자의 감상, 관심작,
              저장한 글, 팔로우 데이터를 쌓아 나만의 영화 취향 프로필을
              만드는 SNS입니다.
            </p>

            <div className="heroActions">
              <button className="primaryBtn">취향 프로필 만들기</button>
              <button className="ghostBtn">커뮤니티 둘러보기</button>
            </div>
          </div>

          <div className="heroMovieCard">
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div className="heroMovieInfo">
              <p className="smallText">Curated Film</p>
              <h2>{selectedMovie.title}</h2>
              <p>
                {selectedMovie.year} · {selectedMovie.director}
              </p>
              <div className="tagWrap">
                {selectedMovie.tasteTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="films" className="section twoColumns">
        <div>
          <div className="sectionTitle">
            <p className="eyebrow">Operator Curated</p>
            <h2>운영자 큐레이션 영화 정보</h2>
            <p>
              영화 정보는 사용자가 API에 묻는 방식이 아니라, 운영자가 직접
              선별한 영화 페이지로 제공합니다.
            </p>
          </div>

          <div className="movieGrid">
            {curatedMovies.map((movie) => (
              <button
                key={movie.id}
                className={`movieCard ${
                  selectedMovie.id === movie.id ? "active" : ""
                }`}
                onClick={() => setSelectedMovie(movie)}
              >
                <img src={movie.poster} alt={movie.title} />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.koreanTitle}</p>
                  <span>{movie.director}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="detailPanel">
          <p className="eyebrow">Film Page</p>
          <h2>{selectedMovie.title}</h2>
          <p className="subInfo">
            {selectedMovie.koreanTitle} · {selectedMovie.year} ·{" "}
            {selectedMovie.country} · {selectedMovie.runtime}
          </p>

          <div className="posterDetail">
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div>
              <h4>Curator's Note</h4>
              <p>{selectedMovie.curatorNote}</p>
            </div>
          </div>

          <div className="infoBlock">
            <h4>수상 / 노미네이트</h4>
            {selectedMovie.awards.map((award) => (
              <p key={award}>• {award}</p>
            ))}
          </div>

          <div className="infoBlock">
            <h4>취향 태그</h4>
            <div className="tagWrap">
              {selectedMovie.tasteTags.map((tag) => (
                <span className="tag blueTag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="infoBlock">
            <h4>CinePaZe Axis</h4>
            <div className="axisList">
              {selectedMovie.axis.map((axis) => (
                <span key={axis}>{axis}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="section recommendSection">
        <div className="sectionTitle">
          <p className="eyebrow">AI Recommendation</p>
          <h2>추천은 API로 연결</h2>
          <p>
            영화 정보는 운영자가 업로드하고, AI API는 사용자의 취향과 감상문을
            바탕으로 다음에 볼 영화와 추천 이유를 생성합니다.
          </p>
        </div>

        <div className="recommendBox">
          <div className="selectedMini">
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div>
              <p>현재 선택한 영화</p>
              <strong>{selectedMovie.title}</strong>
            </div>
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="최근 좋았던 영화 감상이나 취향을 적어보세요. 예: 조용하고 여운이 긴 영화가 좋고, 설명이 많은 결말보다는 열린 결말을 좋아한다."
          />

          <button className="primaryBtn" onClick={getRecommendation}>
            {loading ? "추천 생성 중..." : "AI 추천 받기"}
          </button>

          {recommendation && (
            <div className="aiResult">
              <h4>AI Recommendation</h4>
              <p>{recommendation}</p>
            </div>
          )}
        </div>
      </section>

      <section id="community" className="section twoColumns">
        <div>
          <div className="sectionTitle">
            <p className="eyebrow">Community</p>
            <h2>영화로 자기 이야기를 쓰는 피드</h2>
          </div>

          <div className="postList">
            {communityPosts.map((post) => (
              <article className="postCard" key={post.id}>
                <div className="postTop">
                  <strong>@{post.user}</strong>
                  <span>{post.movie}</span>
                </div>
                <p>{post.text}</p>
                <div className="tagWrap">
                  {post.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="postMeta">
                  <span>좋아요 {post.likes}</span>
                  <span>저장 {post.saves}</span>
                  <span>같은 감상</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside id="profile" className="profilePanel">
          <p className="eyebrow">Taste Profile</p>
          <h2>@my_paze</h2>
          <p className="profileLine">“{myTaste.line}”</p>

          <div className="posterRow">
            {curatedMovies.map((movie) => (
              <img key={movie.id} src={movie.poster} alt={movie.title} />
            ))}
          </div>

          <div className="tagWrap">
            {myTaste.tags.map((tag) => (
              <span className="tag blueTag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="dnaList">
            {myTaste.dna.map((item) => (
              <div className="dnaItem" key={item.label}>
                <div className="dnaText">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="bar">
                  <div style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="match" className="section">
        <div className="sectionTitle">
          <p className="eyebrow">Taste Matching</p>
          <h2>취향이 맞는 사람</h2>
        </div>

        <div className="matchGrid">
          {people.map((person) => (
            <article className="matchCard" key={person.id}>
              <div className="matchScore">{person.match}%</div>
              <h3>@{person.name}</h3>
              <p>“{person.sentence}”</p>

              <div className="tagWrap">
                {person.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="filmList">
                {person.films.map((film) => (
                  <span key={film}>{film}</span>
                ))}
              </div>

              <button className="followBtn">팔로우</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}