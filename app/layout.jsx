import "./globals.css";

export const metadata = {
  title: "CinePaZe | 영화의 새로운 축을 만들다",
  description:
    "영화 정보, 취향 프로필, 커뮤니티, AI 추천이 연결되는 영화 기반 SNS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}