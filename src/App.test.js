import {
  fireEvent,
  render,
  screen,
  cleanup,
  act,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import * as axios from "axios";
import booksJson from "./mock-data/books.json";

jest.mock("axios");

let container;

var mockJsonData = (serviceFails = false) => {
  if (serviceFails) {
    axios.get.mockImplementation(() => Promise.reject({}));
  } else {
    axios.get.mockImplementation(() => Promise.resolve({ data: booksJson }));
  }
};
beforeEach(() => {
  container = render(<App />);
});

afterEach(cleanup);

test("renders container", () => {
  expect(container).toBeTruthy();
});

test("renders learn react link", async () => {
  await act(async () => {
    mockJsonData();
    const searchBook = document.getElementsByTagName("input")[0];
    fireEvent.input(searchBook, {
      target: {
        value: "test",
      },
    });
    expect(searchBook).toBeTruthy();
  });
});

test("should trigger onBookSearch", async () => {
  await act(async () => {
    const searchButton = document.getElementsByTagName("button")[0];
    fireEvent.click(searchButton);
    expect(searchButton).toBeTruthy();
  });
});
test("should trigger on BookSearch with no data ", async () => {
  await act(async () => {
    mockJsonData(true);
    const searchButton = document.getElementsByTagName("button")[0];
    fireEvent.click(searchButton);
    expect(searchButton).toBeTruthy();
  });
});

test("should trigger addToList", async () => {
  await act(async () => {
    mockJsonData();
    const addButton = document.getElementsByTagName("button")[0];
    fireEvent.click(addButton);
    expect(addButton).toBeTruthy();
    await waitFor(() => container.queryByTestId("books-list-0"));
    fireEvent.click(container.queryByTestId("add-to-list-0"));
  });
});

test("should trigger removeFromTheList", async () => {
  await act(async () => {
    mockJsonData();
    const addButton = document.getElementsByTagName("button")[0];
    fireEvent.click(addButton);
    expect(addButton).toBeTruthy();
    await waitFor(() => container.queryByTestId("books-list-0"));
    fireEvent.click(container.queryByTestId("add-to-list-0"));
    await waitFor(() => container.queryByTestId("reading-wishlist-0"));
    fireEvent.click(container.queryByTestId("remove-from-list-0"));
  });
});
