import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

const apiKey = "6afd80ac0cb843d1974f525398eb4145";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
const delay = 3000;

function SlideShow() {
  const [newsData, setNewsData] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  async function fetchNews() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNewsData(data.articles.slice(0, 4)); // Get the first 4 articles only
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, newsData]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  return (
    <div className=" overflow-hidden min-w-[100%]  relative">
      {/* ... (ตามด้วยส่วนอื่นๆของโค้ดของคุณ) */}
      <div
        className="SliderShow whitespace-nowrap transition-transform duration-1000 top-0 left-0 w-full h-full "
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {newsData.map((article, idx) => (
          <div className="inline-block w-full " key={idx}>
            <div className=" relative">
              <div >
                <div className='Shadows h-full w-full  absolute truncate' />
                <div
                  className="Title w-[60%] absolute text-5xl text-white font-inter font-bold 
              leading-normal  bottom-[240px] left-[77px]  truncate "
                >
                  {article.title}
                </div>
                <a target="_blank" href={article.url}>
                  <button
                    className="flex w-[251px] h-[76px] mb-[9%] px-4 justify-center items-center space-x-1 flex-shrink-0 
              rounded-lg border border-white absolute bottom-[0px] left-[192px]"
                  >
                    <div class="text-[#FC563D] font-inter text-[30px] font-semibold leading-normal">
                      Read more . . .
                    </div>
                  </button>
                </a>
                <img
                  className="inline-block h-screen-nav w-full object-cover object-top Shadow"
                  src={article.urlToImage}
                  alt={article.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="Tap flex justify-center space-x-4 absolute bottom-2 left-1/2 transform -translate-x-1/2 py-2 ">
        {newsData.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 w-20 rounded-full cursor-pointer  ${index === idx ? "bg-[#FB3D21]" : " bg-[#707070]"}`}
            onClick={() => setIndex(idx)}
          ></div>
        ))}
      </div>
    </div>

  );
}

export default SlideShow;
