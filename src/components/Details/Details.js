import { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const { data } = await axios.get(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    this.setState({
      loading: false,
      ...data.pets[0],
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
