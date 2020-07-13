import React from "react";

type INewsProps = {
  newsList: any[];
  newsInfo: any[];
  toggleComments: (commentsId: number[]) => void;
}

export const NewsList: React.FC<INewsProps> = ({ newsList, newsInfo, toggleComments }) => {
  return (
    <ul>
      {newsInfo.map((item, index) => (
        <li className="news" key={index}>
          ({item.score})
          <a href={item.url} target="_blank" className="link">
            {item.title}
          </a>
          <button className="btn blue open-comments ml" onClick={() => toggleComments(item.kids)}>
            Open comments
          </button>
        </li>
      ))}
    </ul>
  )
}

