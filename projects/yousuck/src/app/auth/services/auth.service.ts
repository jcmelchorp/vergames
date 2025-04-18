import { inject, Injectable } from '@angular/core';

import {
  Auth,
  authState,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  idToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  user,
  UserCredential,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  DocumentData,
  Firestore,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User as AuthUser } from '../models/user.model';
import { from, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { firebaseSerialize } from '../models/firebase.model';
import { toSignal } from '@angular/core/rxjs-interop';

const assignTypes = () => {
  return {
    toFirestore(doc: AuthUser): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): AuthUser {
      return snapshot.data()! as AuthUser;
    },
  };
};

export interface Credential {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  /* Declarations */
  private readonly USERS = 'users';
  private readonly _fstore = inject(Firestore);
  private readonly _auth = inject(Auth);
  /* Asignments */
  authState$ = authState(this._auth);
  user$ = user(this._auth);
  idToken$ = idToken(this._auth);
  /* References */
  private userCollectionRef = collection(
    this._fstore,
    this.USERS,
  ).withConverter(assignTypes());
  authUserDocRef = (uid: string) =>
    doc(this._fstore, `${this.USERS}/${uid}`).withConverter(assignTypes());
  private userAuthProfile$ = user(this._auth).pipe(
    mergeMap((user) => {
      if (!user?.uid) {
        return of(null);
      }
      return docData(this.authUserDocRef(user?.uid)).pipe(
        map((userData) => {
          return { ...this._mergeAuthUser(user), ...userData };
        }),
      );
    }),
    tap((user) => console.log('userAuthProfile:', user)),
  );
  userAuthProfile = toSignal(this.userAuthProfile$!);
  /* Auth Methods */

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
      );
    } catch (error: any) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<void> {
    createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim(),
    ).then(async (result) => {
      let mergedUser = await this._mergeAuthUser(result.user);
      this.createUser(mergedUser).then(() => user);
    });
    const actionCodeSettings = {
      url: 'https://yousuck.web.app',
      iOS: {
        bundleId: 'com.yousuck.ios',
      },
      android: {
        packageName: 'com.yousuck.android',
        installApp: true,
        minimumVersion: '12',
      },
      handleCodeInApp: true,
    };
    await sendEmailVerification(this._auth.currentUser!, actionCodeSettings);
    // Obtain code from the user.
    //await applyActionCode(this._auth, code);
  }

  async logout(): Promise<void> {
    return await signOut(this._auth);
    // return await this.updateOnlineStatus(false)
    //   .then(() => signOut(this._auth))
    //   .catch(() => this.updateOnlineStatus(true));
  }

  async sendPasswordResetEmails(email: string): Promise<void> {
    sendPasswordResetEmail(this._auth, email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  private _mergeAuthUser(authUser: User): AuthUser {
    const user: AuthUser = {
      uid: authUser.uid!,
      id: authUser.providerData[0].uid,
      authPhotoURL: authUser.providerData[0].photoURL!,
      photoURL: authUser.photoURL!,
      displayName: authUser.providerData[0].displayName!,
      username: authUser.email!.split('@')[0],
      phoneNumber: authUser.providerData[0].phoneNumber!,
      email: authUser.email!,
      isVerified: authUser.emailVerified,
    };
    return user;
  }
  /* User Methods */
  checkAdminRole(uid: string): Promise<boolean> {
    return getDoc(this.authUserDocRef(uid)).then(
      (user: AuthUser) => user.isAdmin!,
    );
  }

  getUser(uid: string): Promise<AuthUser> {
    return getDoc(this.authUserDocRef(uid));
  }

  createUser(user: AuthUser): Promise<void> {
    return setDoc(this.authUserDocRef(user.uid!), firebaseSerialize(user));
  }

  updateUser(user: AuthUser): Promise<void> {
    return updateDoc(this.authUserDocRef(user.uid!), firebaseSerialize(user));
  }

  updateOnlineStatus(uid: string, status: boolean): Promise<void> {
    return updateDoc(this.authUserDocRef(uid), { isOnline: status });
  }

  updatePhotoURL(uid: string, url: string): Promise<void> {
    return updateDoc(this.authUserDocRef(uid), { avatarURL: url });
  }
}
