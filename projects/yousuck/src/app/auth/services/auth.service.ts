import { inject, Injectable } from '@angular/core';
import {
  Auth,
  AuthCredential,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  idToken,
  linkWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  user,
  UserCredential,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User as AuthUser } from '../../auth/models/user.model';
import { from, Observable, of, switchMap, take } from 'rxjs';
import { firebaseSerialize } from '../models/firebase.model';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _firestore = inject(Firestore);

  private _auth = inject(Auth);
  authState$ = authState(this._auth); // 👈👈👈
  user$ = user(this._auth);
  idToken$ = idToken(this._auth); // 👈👈👈

  loginByGoogle() {
    // you can simply change the Google for another provider here
    const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    return from(signInWithPopup(this._auth, provider)).pipe(
      take(1),
      switchMap((u) => this.user$),
    );
  }

  registerByGoogle() {
    // you can simply change the Google for another provider here
    const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    return from(signInWithPopup(this._auth, provider)).pipe(
      take(1),
      switchMap((u) => this.user$),
    );
  }

  signup(email: string, password: string) {
    createUserWithEmailAndPassword(this._auth, email.trim(), password.trim());
    return this.user$;
  }
  async sendEmailVerification() {
    //return await this._auth.currentUser.sendEmailVerification()
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    // return await this._auth.sendPasswordResetEmail(passwordResetEmail);
  }

  login(credential: Credential) {
    signInWithEmailAndPassword(
      this._auth,
      credential.email.trim(),
      credential.password.trim(),
    );
    return this.user$;
  }

  logOut(id?: string): Observable<void> {
    return from(this._auth.signOut());
  }

  checkAdminRole(uid: string): Observable<boolean> {
    const afsRef = doc(this._firestore, `users/${uid}`);
    return from(getDoc(afsRef).then((user) => user.get('isAdmin')));
  }

  saveUser(user: AuthUser) {
    const afsRef = doc(this._firestore, `users/${user.uid}`);
    return from(updateDoc(afsRef, firebaseSerialize(user)));
  }

  checkContest(uid: string, contestId: string): Observable<boolean> {
    const afsRef = doc(this._firestore, `users/${uid}/contests`);
    return from(getDoc(afsRef).then((user) => user.get(contestId)));
  }

  updateOnlineStatus(uid: string, status: boolean): Observable<void> {
    const afsRef = doc(this._firestore, `users/${uid}`);
    return from(updateDoc(afsRef, { isOnline: status }));
  }

  // private async _setUserData(auth: UserCredential): Promise<AuthUser> {
  //   // console.log(auth);
  //   let pict = '/assets/images/default_user.jpeg';
  //   pict = (await this.getBase64ImageFromUrl(
  //     auth.user.providerData[0].photoURL!
  //   )) as string;
  //   const user: AuthUser = {
  //     uid: auth.user.uid!,
  //     id: auth.user.providerData[0].uid,
  //     authPhotoUrl: auth.user.providerData[0].photoURL!,
  //     photoUrl: pict || '/assets/images/default_user.jpeg',
  //     displayName: auth.user.providerData[0].displayName!,
  //     username: auth.user.email!.split('@')[0],
  //     // name: { familyName:auth.user.providerData[1].displayName!, fullName: auth.user.providerData[0].displayName!},
  //     primaryEmail: auth.user.email!,
  //     isVerified: auth.user.emailVerified,
  //     contests: {},
  //     // custom ones
  //   };
  //   const userDocRef = doc(this._firestore, `users/${user.uid}`);
  //   return setDoc(userDocRef, user).then(() => user);
  // }

  async getBase64ImageFromUrl(imageUrl: string) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false,
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  isAuthenticated(): boolean {
    const user = this._auth.currentUser;
    // console.log(user);
    // console.log(user?.email);
    return user !== null;
  }

  //Send Password Reset Email
  async sendPasswordResetEmails(email: string) {
    sendPasswordResetEmail(this._auth, email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //  //Send Email Verification
  //  sendEmailVerification(){
  //    return sendEmailVerification(this._auth.currentUser as User );
  //  }
}
