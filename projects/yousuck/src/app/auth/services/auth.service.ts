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
import { map, of, switchMap } from 'rxjs';
import { firebaseSerialize } from '../models/firebase.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
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

  assignTypes = () => {
    return {
      toFirestore(doc: AuthUser): DocumentData {
        return doc;
      },
      fromFirestore(snapshot: QueryDocumentSnapshot): AuthUser {
        return snapshot.data()! as AuthUser;
      },
    };
  };
  /* Asignments */
  authState$ = authState(this._auth);
  user$ = user(this._auth);
  idToken$ = idToken(this._auth);

  /* References */
  private userCollectionRef = collection(
    this._fstore,
    this.USERS,
  ).withConverter(this.assignTypes());

  authUserDocRef(uid: string) {
    return doc(this._fstore, `${this.USERS}/${uid}`).withConverter(
      this.assignTypes(),
    );
  }
  private userAuthProfile$ = user(this._auth).pipe(
    switchMap((user) => {
      if (!user?.uid) {
        return of(null);
      } else {
        return docData(this.authUserDocRef(user?.uid)).pipe(
          map((userData) => {
            // console.log('fsUser', userData);
            // console.log('authUser', this._mergeAuthUser(user));
            return { ...userData, ...this._mergeAuthUser(user) } as AuthUser;
          }),
        );
      }
    }),
    // tap((user) => console.log('userAuthProfile$', user)),
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
    return await signInWithPopup(this._auth, provider).then(() => {});
  }

  login(credential: Credential): Promise<void> {
    try {
      return signInWithEmailAndPassword(
        this._auth,
        credential.email.trim(),
        credential.password.trim(),
      ).then(() => {});
    } catch (error: any) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(
      this._auth,
      email.trim(),
      password.trim(),
    ).then(async (result) => {
      let mergedUser = await this._mergeAuthUser(result.user);
      await this.createUser(mergedUser);
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
    return await sendEmailVerification(
      this._auth.currentUser!,
      actionCodeSettings,
    );
    // Obtain code from the user.
    //await applyActionCode(this._auth, code);
  }

  async logout(): Promise<void> {
    return await signOut(this._auth);
    // const res = () =>
    //   signOut(this._auth).then(() => {
    //     this.destroy$.next(); // Emits signal to unsubscribe
    //     this.destroy$.complete();
    //     return true;
    //   });
    // // catch error and return false if needed
    // return defer(res);
  }

  async sendPasswordResetEmails(email: string): Promise<void> {
    sendPasswordResetEmail(this._auth, email);
  }

  private _mergeAuthUser(authUser: User): AuthUser {
    // let pict = '/assets/images/default_user.jpeg';
    // pict = (await this.getBase64ImageFromUrl(
    //   authUser.providerData[0].photoURL!,
    // )) as string;
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
      creationTime: authUser.metadata.creationTime,
      lastLoginTime: authUser.metadata.lastSignInTime,
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

  private async getBase64ImageFromUrl(imageUrl: string) {
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
}
