import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [searchKey, setsearchKey] = useState("");
  const [allAvailableBooks, setAllAvailableBooks] = useState({ items: [] });

  const [addlist, setAddList] = useState([]);
  const [flag, setFlag] = useState(false);
  const previousTimeStamp = 0;
  const onKeyChange = (event) => {
    setsearchKey(event.target.value);

    var diff = event.timeStamp - previousTimeStamp;

    if (diff > 500 && event.target.value.length > 0) {
      onBookSearch();
    }
  };

  useEffect(() => {
    let data = new Set(addlist);
    data = Array.from(data);
    if (flag) {
      setAddList(data);
      setFlag(false);
    }
  }, [flag, addlist]);

  const onBookSearch = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchKey}`
      );
      setAllAvailableBooks(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToList = (val, ind) => {
    setFlag(true);
    setAddList((addlist) => [...addlist, val]);
  };

  const removeFromList = (val, ind) => {
    const value = addlist.filter((val, i) => i !== ind);
    setAddList((addlist) => [...value]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="search-results col-sm-12 col-md-8">
          <div className="search-bar input-group md-form form-sm form-2 pl-0">
            <input
              className="form-control my-0 py-1 amber-border"
              placeholder="Search Books"
              value={searchKey}
              onInput={onKeyChange}
              autoFocus
            />
            <div className="input-group-append">
              <Button onClick={onBookSearch}>Search</Button>
            </div>
          </div>

          {allAvailableBooks.items.map((books, i) => {
            return (
              <div data-testid={`books-list-${i}`} className="books" key={i}>
                <div className="name row">
                  <div className="book-img col-12 col-sm-12 col-md-4">
                    <img
                      alt={`${books.volumeInfo.title} book`}
                      src={`http://books.google.com/books/content?id=${books.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                    />
                  </div>
                  <div className="book-details col-12 col-sm-8">
                    <h3>{books.volumeInfo.title}</h3>
                    <p>
                      <b>Author</b>:{books.volumeInfo.authors}
                    </p>
                    <p>
                      <b>Publisher</b>:{books.volumeInfo.publisher}
                    </p>
                    <p>
                      <b>Published Date</b> :{books.volumeInfo.publishedDate}
                    </p>
                  </div>
                </div>

                <div className="book-paragraph">
                  {books.volumeInfo.description && (
                    <p>
                      <b>Description</b> :{books.volumeInfo.description}
                    </p>
                  )}
                </div>
                <div className="addlist-btns">
                  <Button
                    data-testid={`add-to-list-${i}`}
                    onClick={() => addToList(books, i)}
                  >
                    Add to list
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right-content col-sm-4">
          <div className="border-box">
            <h2>My Reading Wishlist {addlist.length}</h2>
            {addlist &&
              addlist.map((val, i) => {
                return (
                  <div
                    key={i}
                    className="reading-wishlist"
                    data-testid={`reading-wishlist-${i}`}
                  >
                    <h1>
                      {val.volumeInfo.title}
                      <Button
                        data-testid={`remove-from-list-${i}`}
                        onClick={() => removeFromList(val, i)}
                      >
                        x
                      </Button>
                    </h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
