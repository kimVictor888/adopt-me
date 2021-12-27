import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Details extends Component {
  constructor() {
    super();

    this.state = { loading: true };
  }

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
    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
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

export default withRouter(Details);
