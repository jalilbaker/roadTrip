

(function(){

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBFJfhRZXMnD2Vq-_X0WOKo7LZp5ZaFyoU",
    authDomain: "roam-1222d.firebaseapp.com",
    databaseURL: "https://roam-1222d.firebaseio.com",
    projectId: "roam-1222d",
    storageBucket: "roam-1222d.appspot.com",
    messagingSenderId: "662204217511"
  };
  firebase.initializeApp(config);

  // Get elements
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const signup = document.getElementById('signup');
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');

  // Add login event
  login.addEventListener('click', e => {
    // Get email and pass
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  signup.addEventListener('click', e => {

    // Get email and pass
    // TODO: CHECK 4 REAL EMAILZ
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(user => console.log(user));
      // .catch(e => console.log(e.message));

  });


  logout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // firebase.auth().onAuthStateChanged(firebaseUser => {
  //     if(firebaseUser){
  //       console.log(firebaseUser);
  //     } else{
  //       console.log('not logged in');
  //     }
  // });


} ());








// inputEmail

// inputPassword

// signup

// login

// logout