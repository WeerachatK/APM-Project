import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import IndexHomePage from './components/homePage/index';
import IndexSchedulePage from './components/competitionPage/index';
import Root from './routes/root';
import { useEffect } from 'react';

function Main() {
    // useEffect(() => {
    //     const script = document.createElement('script');
    
    //     script.src = "https://cdn.userway.org/widget.js";
    //     script.setAttribute("data-account", "wYYQPFqczm");
    //     script.async = true;
    
    //     document.body.appendChild(script);
    
    //     return () => {
    //       document.body.removeChild(script);
    //     }
    //   }, []);
    return (<Provider store={store}>
        <Router>
                <App />
        </Router>
    </Provider>
    );

}

ReactDOM.render(<Main />, document.getElementById('root'));
