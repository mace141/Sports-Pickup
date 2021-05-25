import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';

const UserDetail = ({ user, park, openModal }) => {
  if (!user) return null;
  return (
    <div>
      <div>
        <img src={user.avatarUrl} alt="Avatar"/>
      </div>
      <div>
        <p>{`${user.fname} ${user.lname}`}</p>
        {/* <p>Favorite Sport{user.sports.length > 1 ? 's' : ''}: {user.sports.length ? user.sports.join(', ') : 'None'}</p> */}
        <p>Favorite Sports: {user.favorite_sports}</p>
        {/* <p>Home Court{parks.length > 1 ? 's' : ''}: {parks.length ? parks.join(', ') : 'None'}</p> */}
        {/* <p>Home Court: {park.name}</p> */}
        <button onClick={() => openModal('editUser')}>Edit</button>
      </div>
    </div>
  )
}

const mapSTP = ({ entities: { users, parks }, session: { user } }) => {
  const showUser = users[user];
  
  if (showUser) {
    return ({
      // park: parks[showUser.home_court],
      user: showUser
    })
  } else {
    return {
      park: null
    }
  }
};

const mapDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default connect(mapSTP, mapDTP)(UserDetail);