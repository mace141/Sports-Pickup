import React from 'react';

class Spot extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { user: null };
  }

  componentDidMount() {
    const { spot, fetchUser, receiveUser, dispatch } = this.props;
    
    if (spot != 'empty') {
      fetchUser(spot).then(payload => {
        const user = payload.data[0];
        this.setState({ user });
        dispatch(receiveUser(payload));
      })
    }
  }

  render() {
    const user = this.state.user;
    if (!user) return <span>__________</span>;
    
    return (
      <span>{`${user.fname} ${user.lname}`}</span>
    )
  }
}

export default Spot;