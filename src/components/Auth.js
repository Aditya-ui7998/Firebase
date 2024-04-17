import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth';
import { useState } from 'react';


export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // console.log(auth?.currentUser?.email);
    // console.log(auth?.currentUser?.photoURL);

    const signIn = async () => {
        try{
        await createUserWithEmailAndPassword(auth, email, password);
    }
    catch(err){
 console.error(err);
    }
    };

    const signInWithGoogle= async () => {
        try{
        await signInWithPopup(auth, googleProvider);
    }
    catch(err){
 console.error(err);
    }
    };

    const logOut= async () => {
        try{
        await signOut(auth);
    }
    catch(err){
 console.error(err);
    }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <input type="email" placeholder='email' value={email} onChange={handleEmailChange} />
            <input type="password" placeholder='password' value={password} onChange={handlePasswordChange} />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In With google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}
