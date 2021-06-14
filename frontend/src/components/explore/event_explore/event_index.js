import React from "react";
import { withRouter } from "react-router-dom";
import EventIndexItemContainer from "./event_index_item_container";

class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvents: null,
    };
  }

  componentDidMount() {
    const { park, fetchParksEvents } = this.props;
    fetchParksEvents(park._id);
  }

  render() {
    // debugger;
    const { park, errors, parksEvents, isCurrentUser, openModal } = this.props;
    if (Object.keys(parksEvents).length === 0) {
      return (
        <>
          <h1 className="side-window-header">
            No events found for {park.name}
          </h1>
          {isCurrentUser ? (
            <div className="explore-index-item">
              <button
                className="host-a-game"
                onClick={() => openModal("newEvent")}
              >
                Host your own?
              </button>
            </div>
          ) : (
            <div className="explore-index-item">
              <button
                className="join-game-btn"
                onClick={() => openModal("login")}
              >
                Host your own?
              </button>
              {/* <>Sign in to host your own</> */}
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <h1 className="side-window-header">Events for {park.name}</h1>
          {Object.entries(parksEvents).map((key) => (
            <EventIndexItemContainer key={key} event={key[1]} park={park} />
          ))}
          {isCurrentUser ? (
            <div className="explore-index-item">
              <button
                className="host-a-game"
                onClick={
                  isCurrentUser
                    ? () => openModal("newEvent")
                    : () => openModal("login")
                }
              >
                Host your own
              </button>
            </div>
          ) : null}
        </>
      );
    }
  }
}
export default withRouter(EventIndex);
