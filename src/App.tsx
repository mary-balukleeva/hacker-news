import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { NewsList } from "./components/NewsList";
import { fetchComments, fetchNewInfo, fetchNewsList, fetchArray } from "./api/fetchNews";
import { CommentsList } from "./components/CommentsList";

const App: React.FunctionComponent = () => {
  const [news, setNews] = useState<any[]>([])
  const [visibleNews, setVisibleNews] = useState<any[]>([])
  const [newsInfo, setNewsInfo] = useState<any[]>([]);
  const [commentsList, setCommentsList] = useState<any[]>([])

  const [showComments, setShowComments] = useState<boolean>(false)

  useEffect(() => {
    fetchNewsList()
      .then(data => {
        setNews(data)
        data = data.splice(0, 20)

        data.forEach((newsId: number) => {
          fetchNewInfo(newsId)
            .then(data => {
              setVisibleNews(prev => (
                [...prev, data]
              ))
            })
            .catch(() => setNewsInfo([]))
        })
      })
      .catch(() => setNews([]))
  }, [])

  const toggleComments = (commentsId: number[] | null = null): void => {
    if (showComments) {
      document.body.style.overflow = "auto"
      setCommentsList([]);

      setShowComments(false);
    } else {
      commentsId = commentsId || [];

      commentsId.forEach(commentId => {
        fetchComments(commentId)
          .then(data => {
            setCommentsList(prev => (
              [...prev, {
                text: data.text,
                time: data.time,
              }]
            ))
            setShowComments(true);
            document.body.style.overflow = "hidden"
          })
          .catch(() => setCommentsList([]))
      })
    }
  }

  const showMoreNews = (countPage: number = 20) => {
    let countShowingNews = visibleNews.length + countPage;
    countShowingNews = countShowingNews > news.length
      ? news.length
      : countShowingNews;

    const newVisibleNews = [...news].splice(0, countShowingNews);

    fetchArray(newVisibleNews)
      .then(data => {
        setVisibleNews(data)
      })
      .catch(err => console.log('Err: ', err));
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <NewsList newsList={news} newsInfo={visibleNews} toggleComments={toggleComments} />

        <button onClick={() => showMoreNews()} className="btn btn-primary block-center my-1">SHOW MORE</button>

        {showComments ?
          <div className="modal" onClick={() => toggleComments()}>
            <CommentsList commentsList={commentsList} />
          </div> : null}
      </div>
    </>
  )
}

export default App;
