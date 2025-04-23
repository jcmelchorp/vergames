import {
  getState,
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Game } from './interfaces/game.interface';
import { GamesService } from './services/games.service';
import { computed, effect, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type GamesState = {
  games: Game[];
  isLoading: boolean;
  query: string;
  favorites: Game[];
};

const initialState: GamesState = {
  games: [],
  isLoading: false,
  query: '',
  favorites: [],
};

export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        effect(() => {
          const state = getState(store);
          console.log(`${name} state changed`, state);
        });
      },
    }),
  );
}

export const GamesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ query, favorites }) => ({
    gamesToShow: computed(() => {
      const filter = query();
      const games = favorites();

      if (!filter) {
        return games;
      }

      return games.filter((game) => {
        return game.title.toLowerCase().includes(filter.toLowerCase());
      });
    }),
  })),

  withMethods((store, gamesService = inject(GamesService)) => ({
    loadGames: rxMethod<void>(
      pipe(
        distinctUntilChanged(),

        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          gamesService.getGames().pipe(
            tapResponse({
              next: (games: Game[]) => {
                patchState(store, { games });
              },
              error: () => {},
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),

    addFavorite: (game: Game) => {
      const newGames = store.games().filter((b) => b.id !== game.id);
      // const newGames = store.games().map((b: Game) => {
      //   if (b.id === game.id) {
      //     return { ...b, isFavorite: true } as Game;
      //   } else {
      //     return b;
      //   }
      // });

      patchState(store, { games: newGames });

      patchState(store, (state) => ({
        favorites: [...state.favorites, { ...game, isFavorite: true }],
      }));
    },

    setQuery: (query: string) => patchState(store, { query }),
  })),
  withHooks({
    onInit: (store) => {
      store.loadGames();
      effect(() => {
        const state = getState(store);
        console.log(`${name} state changed`, state);
      });
    },
  }),
  // withLogger('GamesStore'),
);

// @Injectable()
// export class GamesStore {
//   readonly #gamesService = inject(GamesService);
//   readonly #state = signalState(initialState);

//   readonly games = this.#state.games;
//   readonly isLoading = this.#state.isLoading;

//   readonly loadGames = rxMethod<void>(
//     pipe(
//       tap(() => patchState(this.#state, { isLoading: true })),
//       exhaustMap(() => {
//         return this.#gamesService.getGames().pipe(
//           tapResponse({
//             next: (games) => patchState(this.#state, { games }),
//             error: console.error,
//             finalize: () => patchState(this.#state, { isLoading: false }),
//           }),
//         );
//       }),
//     ),
//   );
// }
