import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store, USER_RUNTIME_CHECKS } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserData } from 'src/interfaces/auth-interface';
import { IUser } from 'src/interfaces/user.groups-interface';
import { selectUser } from '../store/selectors/auth.selectors';
import { IFeedBackMessage } from './feedBack';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  imgInput = false;
  feedbackForm!: FormGroup;
  imageOrFile = '';
  imageName = 'Click to add files to the message.';

  public user$: Observable<IUserData> = this.store$.pipe(
    select(selectUser)
  );


  arrFeedBack: IFeedBackMessage[] = [{
    user: "pasha",
    email: "pasha@gmail.com",
    text: "helllo world 2022 wbschool"
  }];


  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.user$.subscribe(
      (user)=>{
        this.feedbackForm = new FormGroup({
          nameUser: new FormControl(user.username,[
          Validators.required,
          ]
          ),
          emailUser: new FormControl(user.email, [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*\.?[a-zA-Z0-9а-яёА-ЯЁ]*$'
            ),
          ]),
          textUser: new FormControl('', [
            Validators.minLength(10),
          ]),
        })
      }
    )
  }
  onImgAdd(event: Event) {
    console.log(event)
    this.imgInput = true
  }


  sendFeedBack() {
    console.log(this.arrFeedBack)

    if (this.feedbackForm.value.emailUser.trim()
      || (this.feedbackForm.value.textUser.trim()
        && this.imageOrFile.length > 0)) {

      let feedBack: IFeedBackMessage = {
        user: this.feedbackForm.value.nameUser,
        email: this.feedbackForm.value.emailUser,
        text: this.feedbackForm.value.textUser,
      }
      this.arrFeedBack.push(feedBack)
      this.feedbackForm.reset()
    }
  }
}

