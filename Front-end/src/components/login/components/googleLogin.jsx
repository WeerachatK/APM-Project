import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile as setReduxProfile, clearProfile } from '../../../redux/slices/profileSlice';

function LoginG(){
    const clientId = "13073497204-nqdf0845i6i512lpmurikfns0dbg707s.apps.googleusercontent.com";
    const dispatch = useDispatch();
    const [localProfile, setLocalProfile] = useState(null);  // ชื่อใหม่

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load("client:auth2", initClient);
    }, []);

    const onSuccess = (res) => {
        setLocalProfile(res.profileObj);  // ใช้ setLocalProfile
        dispatch(setReduxProfile(res.profileObj));  // ใช้ Redux เพื่อ set profile
        console.log("suc", res);
    };

    const onFailure = (res) => {
        console.log("fail", res);
    };

    const logOut = () => {
        setLocalProfile(null);
        dispatch(clearProfile());  // ใช้ Redux เพื่อ clear profile
    };

    return (
        <div>
            <br /><br />
            {localProfile ? ( 
                <div>
                    <br /><br />
                    <GoogleLogout clientId={clientId} buttonText='Log Out' onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Sign In With Google'
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}

export default LoginG;
