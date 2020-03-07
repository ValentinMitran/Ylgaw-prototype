import React from 'react';
import {Redirect} from 'react-router-dom';
function Logout(){
    return(

        <div>
            {localStorage.clear()}
            <Redirect to="/"/>
        </div>
    );
}

export default Logout;