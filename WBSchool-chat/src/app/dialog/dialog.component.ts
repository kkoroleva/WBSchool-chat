import { selectChatGroup } from './../store/selectors/groups.selectors';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroupsState } from '../store/reducers/groups.reducers';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  public chatGroup$: Observable<any> = this.store$.pipe(
    select(selectChatGroup)
  );

  constructor(private store$: Store<IGroupsState>) {}
}
