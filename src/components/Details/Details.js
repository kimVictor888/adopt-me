import { Component, lazy } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ThemeContext from "../../Context/ThemeContext";

const Modal = lazy(() => import("../Modal/Modal"));

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const { data } = await axios.get(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    this.setState({
      loading: false,
      ...data.pets[0],
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adopt = () => {
    window.location = "http://bit.ly/pet-adopt";
  };

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="mx-auto w-10/12">
        <Carousel images={images} />
        <div className="my-5 bg-gray-200 bg-opacity-80 p-5 rounded-xl text-center font-serif">
          <h1 className="text-3xl">{name}</h1>
          <h2 className="my-2 text-xl">
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                className="my-2 px-6 py-2 rounded text-white hover:opacity-50 border-none"
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="my-2 text-lg">{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1 className="text-lg">Would you like to adopt {name}?</h1>
                <div className="mt-2 flex justify-between items-center">
                  <button
                    className="my-2 px-6 py-2 w-5/12 rounded bg-blue-400 text-white hover:opacity-50 border-none"
                    onClick={this.adopt}
                  >
                    Yes
                  </button>
                  <button
                    className="my-2 px-6 py-2 w-5/12 rounded bg-red-400 text-white hover:opacity-50 border-none"
                    onClick={this.toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
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
