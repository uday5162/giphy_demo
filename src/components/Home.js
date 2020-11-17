import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import GifPlayer from "react-gif-player";
import { Container, Col, Row } from "react-bootstrap";

let i = 0;

class HomePre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifsList: [],
      hasNextPage: true,
      offset: 0,
      isSearch: false,
      searchText: "",
    };
  }

  componentDidMount() {
    this.getGiphyList();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.filterText !== this.props.filterText) {
      this.setState(
        {
          isSearch: true,
          searchText: this.props.filterText,
          offset: 0,
        },
        () => {
          this.getFilterGiphyList();
        }
      );
    }
  }

  getFilterGiphyList = () => {
    const { offset } = this.state;
    const { filterText } = this.props;
    fetch(
      "https://api.giphy.com/v1/gifs/search?api_key=TyJzsxyZ6ixFUYfQlF23hQz6vO9aDfev&q=" +
        filterText +
        "&limit=20&offset=" +
        offset,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          gifsList: res.data,
          hasNextPage: true,
          offset: 20,
        });
      });
  };

  getGiphyList = () => {
    const { offset } = this.state;
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=TyJzsxyZ6ixFUYfQlF23hQz6vO9aDfev&limit=20&offset=" +
        offset,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          gifsList: res.data,
          hasNextPage: true,
          offset: 20,
        });
      });
  };

  getMoreGifs = () => {
    const { offset, isSearch, searchText } = this.state;
    const url = !isSearch
      ? "https://api.giphy.com/v1/gifs/trending?api_key=TyJzsxyZ6ixFUYfQlF23hQz6vO9aDfev&limit=20&offset=" +
        offset
      : "https://api.giphy.com/v1/gifs/search?api_key=TyJzsxyZ6ixFUYfQlF23hQz6vO9aDfev&q=" +
        searchText +
        "&limit=20&offset=" +
        offset;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          gifsList: this.state.gifsList.concat(res.data),
          offset: offset + 20,
          hasNextPage: res.pagination.total_count > offset + 20,
        });
      });
  };

  render() {
    const { gifsList, hasNextPage } = this.state;
    if (!gifsList) return <p id="asdasdsa">Loading..</p>;
    return (
      <Container className="m4">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreGifs}
          hasMore={hasNextPage}
          loader={<p id={i++}>Loading...</p>}
        >
          <Row className="justify-content-md-center">
            {gifsList.map((gif) => (
              <Col id={gif.id}>
                <p>{gif.title}</p>
                <GifPlayer
                  gif={gif.images.downsized.url}
                  pauseRef={(pause) => (this.pauseGif = pause)}
                  style={{ width: 200, height: 200 }}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const Home = connect(mapStateToProps, {})(HomePre);

export { Home };
