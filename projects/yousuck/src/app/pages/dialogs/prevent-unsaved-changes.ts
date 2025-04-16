import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from './confirm-dialog.component';
import { map } from 'rxjs';
import HomeGamesComponent from '../games/home/home-games.component';

export const preventUnsavedChanges: CanDeactivateFn<
  HomeGamesComponent
> = () => {
  const matDialog = inject(MatDialog);
  // if (!levels.pristine) {
  const dialogRef = matDialog.open<
    ConfirmDialogComponent,
    ConfirmDialogData,
    ConfirmDialogResult
  >(ConfirmDialogComponent, {
    data: {
      title: 'Deseas salir?',
      content: 'Podrás volver a este concurso después.',
    },
    disableClose: true,
  });
  return dialogRef.afterClosed().pipe(map((v) => !!v));
  // }
  return true;
};
