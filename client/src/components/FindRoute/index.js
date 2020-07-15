import React, { Component } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
  InfoWindow,
  Marker,
  InfoBox,
  LoadScript,
} from "@react-google-maps/api";
// import ModalComment from "../ModalComment";
import {ModalComment} from "../Modal";
// import { InfoBoxString2, ModalCommentContainer } from "../InfoBoxString2";
import InfoBoxString from "../InfoBoxString";
import M from "materialize-css";
import "../../assets/css/style.css";

// const mapContainerStyle = {
//   height: "400px",
//   width: "800px"
// }

//Toronto, ON
const center = {
  lat: 43.65107,
  lng: -79.347015,
};

const position = {
  lat: 43.6426,
  lng: -79.3871,
};

const divStyle = {
  background: `white`,
  border: `1px solid white`,
  padding: 15,
};

// const onLoad = marker => {
// = infoWindow => {
//   console.log('infoWindow: ', infoWindow)
// }

class FindRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "BICYCLING",
      origin: "", // input origin
      destination: "", // input destination
      originAddress: "Submit request...", // full origin address from google
      destinationAddress: "Submit request...", // full destination address from google
      distance: "", // distance in km
      duration: "", // time in hours and minutes
      showInfoWindow: false,
      infoWindowPosition: {},
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.distancesCallback = this.distancesCallback.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  directionsCallback(response) {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log("response: ", response);
      }
    }
  }

  distancesCallback(results) {
    if (
      results !== null &&
      results.rows[0].elements[0].distance !== null &&
      results.rows[0].elements[0].duration !== null
    ) {
      console.log("results " + JSON.stringify(results));
      this.setState(() => ({
        originAddress: results.originAddresses[0],
        destinationAddress: results.destinationAddresses[0],
        distance: results.rows[0].elements[0].distance.text,
        duration: results.rows[0].elements[0].duration.text,
      }));
    }
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick(e) {
    e.preventDefault();
    if (this.origin.value !== "" && this.destination.value !== "") {
      this.setState(() => ({
        //Grabbing the origin and destination from the user inputs
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  }

  render() {
    return (
      <div>
        <GoogleMap
          // Map container
          id="map-canvas"
          // Initial zoom
          zoom={10}
          // Map initial center in Toronto
          center={center}
          // onClick={() => console.log("Map clicked!")}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {this.state.duration === "" &&
            this.state.destination !== "" &&
            this.state.origin !== "" && (
              <DirectionsService
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode,
                }}
                // required
                callback={this.directionsCallback}
                // optional
                onLoad={(directionsService) => {
                  console.log(
                    "DirectionsService onLoad directionsService: ",
                    directionsService
                  );
                }}
                // optional
                onUnmount={(directionsService) => {}}
              />
            )}
          <Marker
            position={position}
            // onLoad={onLoad}
            onClick={() => this.setState({
              showInfoWindow: true,
              infoWindowPosition: position,
            })}
          />
          {this.state.showInfoWindow === true && (
          <InfoWindow 
          // onLoad={onLoad} 
          onCloseClick={() => this.setState({
            showInfoWindow: false,
          })}
          position={position}>
            <div style={divStyle}>
              <InfoBoxString />
            </div>
          </InfoWindow>
          )}
          <ModalComment addComment={this.addComment}/>
          {/* <ModalCommentContainer /> */}
          {this.state.response !== null && (
            <DirectionsRenderer
              // required
              options={{
                // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                directions: this.state.response,
              }}
              // optional
              onLoad={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              // optional
              onUnmount={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
            />
          )}
          {this.state.destination !== "" &&
            this.state.origin !== "" &&
            this.state.distance === "" && (
              <DistanceMatrixService
                // required
                // required
                options={{
                  // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destinations: [this.state.destination],
                  origins: [this.state.origin],
                  travelMode: this.state.travelMode,
                }}
                // required
                callback={this.distancesCallback}
                // optional
                onLoad={(distanceMatrixService) => {
                  console.log(
                    "DirectionsRenderer onLoad directionsRenderer: ",
                    distanceMatrixService
                  );
                }}
                // optional
                onUnmount={(distanceMatrixService) => {
                  console.log(
                    "DirectionsRenderer onUnmount directionsRenderer: ",
                    distanceMatrixService
                  );
                }}
              />
            )}
        </GoogleMap>
        <div id="right-panel" className="center-align">
          <div className="row z-depth-5">
            <div className="col s12">
              <div className="form-group">
                <label className="white-text" htmlFor="ORIGIN">
                  Origin
                </label>
                <br />
                <input
                  id="ORIGIN"
                  className="white"
                  type="text"
                  ref={this.getOrigin}
                  defaultValue="CN Tower"
                />
              </div>
            </div>

            <div className="col s12">
              <div className="form-group">
                <label className="white-text" htmlFor="DESTINATION">
                  Destination
                </label>
                <br />
                <input
                  id="DESTINATION"
                  className="white"
                  type="text"
                  ref={this.getDestination}
                  defaultValue="University of Toronto"
                />
              </div>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light z-depth-5 mapButton"
            type="button"
            onClick={this.onClick}
          >
            Build Route
          </button>
          <table className="row z-depth-5">
            <thead className="thead">
              <tr>
                <th colSpan="2">Origin</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td colSpan="2">{this.state.originAddress}</td>
              </tr>
            </tbody>
            <thead className="thead">
              <tr>
                <th colSpan="2">Destination</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td colSpan="2">{this.state.destinationAddress}</td>
              </tr>
            </tbody>
            <thead className="thead">
              <tr>
                <th>Distance</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody className="white">
              <tr>
                <td>{this.state.distance}</td>
                <td>{this.state.duration}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn waves-effect waves-light z-depth-5 mapButton"
            type="button"
            onClick={this.onClick}
          >
            Find parking
          </button>
        </div>
      </div>
    );
  }
}

export default FindRoute;
