import React, { useEffect, useState } from "react";
import useFetchApi from "../../Custom Hooks/useFetchApi";
import classes from "./HomePage.module.css";
export default function HomePage() {
  const url = "https://www.omdbapi.com/?apikey=45f0782a&s=war";
  const { apiResults, isLoading } = useFetchApi(url);
  const [movieData, setMovieData] = useState(apiResults);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedData, setSearchedData] = useState("");
  //console.log(apiResults);
  useEffect(() => {
    setMovieData(apiResults);
  }, [apiResults]);

  useEffect(() => {
    setMovieData(searchedData);
  }, [searchedData]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchedValue(value);
    if (value.trim().length > 0) {
      const rawSearchedData = movieData.filter(({ Title }) => {
        if (Title.toLowerCase().includes(value.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setSearchedData(rawSearchedData);
      //setMovieData(searchedData);
      //console.log("value changed", value);
    } else {
      setMovieData(apiResults);
    }
  };
  return (
    <div>
      <h1 className={classes.heading}>The Movie App</h1>
      {isLoading ? (
        <h1 className={classes.loadingText}>Loading...</h1>
      ) : (
        <div>
          <div className={classes.searchWrapper}>
            <input
              type="text"
              value={searchedValue}
              onChange={handleSearch}
              className={classes.searchbox}
              placeholder="enter movie name"
            />
            {/* <button className={classes.searchBtn}>Search</button> */}
          </div>
          <div className={classes.homepageCardsWrapper}>
            {movieData.map((item) => {
              const { Poster, Title, Type, Year, imdbID } = item;
              return (
                <div className={classes.homepageCards}>
                  <div className={classes.overlay}>
                    <h2>{Title}</h2>
                    <h3>{Type}</h3>
                    <p>{Year}</p>
                  </div>
                  <img src={Poster} alt={Title} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
