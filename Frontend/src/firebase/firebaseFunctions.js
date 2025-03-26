import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithEmailAndPassword,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";

async function doSignInWithEmailAndPassword(email, password) {
    let auth = getAuth();
    console.log(email, password);
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential;
}

async function doChangePassword(email, oldPassword, newPassword) {
    console.log(email);
    const auth = getAuth();
    let credential = EmailAuthProvider.credential(email, oldPassword);
    console.log(credential);
    await reauthenticateWithCredential(auth.currentUser, credential);

    await updatePassword(auth.currentUser, newPassword);
    await doSignOut();
}

async function doSignOut() {
    let auth = getAuth();
    await signOut(auth);
}

async function doSendPasswordResetEmail(email) {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
}

export {
    doSignInWithEmailAndPassword,
    doChangePassword,
    doSendPasswordResetEmail,
};