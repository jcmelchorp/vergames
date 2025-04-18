import { inject, Injectable } from '@angular/core';
import {
  Auth,
  AuthProvider,
  authState,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  idToken,
  linkWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  QueryDocumentSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { User as AuthUser } from '../models/user.model';
import { from, map, Observable, switchMap, take } from 'rxjs';
import { firebaseSerialize } from '../models/firebase.model';

// const assignTypes = () => {
//   return {
//     toFirestore(doc: User): DocumentData {
//       return doc;
//     },
//     fromFirestore(snapshot: QueryDocumentSnapshot): User {
//       return snapshot.data()! as User;
//     },
//   };
// };

export interface Credential {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly PATH = 'users';
  private readonly _firestore = inject(Firestore);
  private readonly _auth = inject(Auth);
  // private readonly userCollection = collection(
  //   this._firestore,
  //   this.PATH,
  // ).withConverter(assignTypes());

  authState$: Observable<User | null> = authState(this._auth);
  user$: Observable<User | null> = user(this._auth).pipe(
    map((user) => {
      return user;
    }),
  );
  idToken$: Observable<string | null> = idToken(this._auth);

  private setSessionStoragePersistence(): void {
    setPersistence(this._auth, browserSessionPersistence);
  }

  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(this._auth, provider);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async login(credential: Credential): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(
        this._auth,
        credential.email.trim(),
        credential.password.trim(),
      ).then((result) => console.log(result));
    } catch (error: any) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }

  async handleLogin3rdParty(target: string) {
    let currentUser;
    let provider: AuthProvider | null = null;

    if (target === 'gmail') {
      provider = new GoogleAuthProvider();
    } else if (target === 'fb') {
      provider = new FacebookAuthProvider();
    } else if (target === 'github') {
      provider = new GithubAuthProvider();
    } else if (target === 'mail') {
      provider = new EmailAuthProvider();
    }
    if (provider) {
      await signInWithPopup(this._auth, provider)
        .then((result) => {
          currentUser = result.user;
        })

        .catch(async (error) => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            await fetchSignInMethodsForEmail(
              this._auth,
              error.customData.email,
            ).then(async (result) => {
              let registeredProvider: AuthProvider | null = null;

              if (result[0] === 'google.com') {
                registeredProvider = new GoogleAuthProvider();
              } else if (result[0] === 'facebook.com') {
                registeredProvider = new FacebookAuthProvider();
              } else if (result[0] === 'github.com') {
                registeredProvider = new GithubAuthProvider();
              } else if (result[0] === 'password') {
                registeredProvider = new EmailAuthProvider();
              }

              if (registeredProvider) {
                await signInWithPopup(this._auth, registeredProvider).then(
                  (result) => {
                    linkWithPopup(this._auth.currentUser!, provider)
                      .then((result) => {
                        console.log('AT LAST IT WORKS');
                      })

                      .catch((error) => {});
                  },
                );
              }
            });
          }
        });
    }
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

  async signup(email: string, password: string) {
    await createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim(),
    );

    const actionCodeSettings = {
      url: 'https://yousuck.web.app',
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      handleCodeInApp: true,
    };
    await sendEmailVerification(this._auth.currentUser!, actionCodeSettings);
    // Obtain code from the user.
    // await applyActionCode(this._auth, code);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    // return await this._auth.sendPasswordResetEmail(passwordResetEmail);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
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
