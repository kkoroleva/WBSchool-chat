import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { IFeedBackMessage } from '../../interfaces/feedBack-interface';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  imgInput = false;
  feedBackForm!: FormGroup;
  imageOrFile = '';
  
  test:IFeedBackMessage[] = [{
    user:"pasha", 
    email:"pasha@gmail.com", 
    text:"helllo world 2022 wbschool"
  }];


  constructor() { }

  ngOnInit(): void {
    this.feedBackForm = new FormGroup({
      nameUser: new FormControl(''),
      emailUser: new FormControl('',[
        Validators.pattern(
          '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*\.?[a-zA-Z0-9а-яёА-ЯЁ]*$'
        ),
      ]), 
      textUser: new FormControl('', [
        Validators.minLength(10),
      ]),
    })
  }
  onImgAdd() {
    this.imgInput = true
  }
  closeWindow(){
 
  }
  sendFeedBack(){
    console.log(this.test)

    if (this.feedBackForm.value.emailUser.trim() || (this.feedBackForm.value.textUser.trim() && this.imageOrFile.length > 0)) {
     
      let feedBack: IFeedBackMessage = {
        user: this.feedBackForm.value.nameUser,
        email: this.feedBackForm.value.emailUser,
        text: this.feedBackForm.value.textUser,
      }
      this.test.push(feedBack)
      this.feedBackForm.reset()
    }
  }
}

