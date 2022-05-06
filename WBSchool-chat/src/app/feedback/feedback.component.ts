import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  imageName = ' Нажмите чтобы добавить файлы к сообщению.';


  arrFeedBack: IFeedBackMessage[] = [{
    user: "pasha",
    email: "pasha@gmail.com",
    text: "helllo world 2022 wbschool"
  }];


  constructor() { }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      nameUser: new FormControl(''),
      emailUser: new FormControl('', [
        Validators.pattern(
          '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*\.?[a-zA-Z0-9а-яёА-ЯЁ]*$'
        ),
      ]),
      textUser: new FormControl('', [
        Validators.minLength(10),
      ]),
    })
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

