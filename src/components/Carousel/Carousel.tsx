import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}
class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-omages.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;

    return (
      <div className="w-full flex justify-between items-center">
        <img className="rounded-3xl w-4/12" src={images[active]} alt="animal" />
        <div className="w-7/12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {images.map((photo, i) => (
            // eslint-disable-next-line
            <img
              className={`${
                i === active ? "rounded-full" : "rounded-md"
              } transform transition ease-in-out duration-100 hover:opacity-90 cursor-pointer`}
              key={photo}
              src={photo}
              data-index={i}
              onClick={this.handleIndexClick}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
