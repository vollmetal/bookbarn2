
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import * as userCreators from './stores/creators/userCreators'
import * as bookCreators from './stores/creators/bookCreators'

function App(props) {

  useEffect(() => {
    
    getUser()
    
  }, [])

  const getUser = async () => {
    const token = localStorage.getItem('userToken')
    props.updateUserInfo(token)
    const userInfo = await fetch('http://localhost:4200/user/decode', {
      method: 'GET',
      headers: {
        'authorization': `IMPORTANT ${localStorage.getItem('userToken')}`
      }
    })
    const user = await userInfo.json()
    console.log(user)
    props.updateUserCart(user)
  }

  return (
    <div className="App">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    updateUserInfo: (user) => (userCreators.loginWithToken(user)),
    updateUserCart: (user) => (dispatch(bookCreators.loginCartSetup(user)))
  }

}

export default connect(null, mapDispatch)(App);
