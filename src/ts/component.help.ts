class HelpController {
  API: API;
  user: User;
  question_id: number;
  subject: string;
  isWorking: boolean;
  text: string;
  question: any;
  emailSend: boolean;

  constructor(Auth, Page, API, $location) {
    this.API = API;

    Page.setTitleAndNav('Hilfe | Crucio', '');

    this.user = Auth.getUser();

    this.question_id = $location.search().question_id;
    this.subject = $location.search().s;

    if (this.question_id) {
      this.API.get(`questions/${this.question_id}`).then(result => {
        this.question = result.data.question;
      });
    }
  }

  sendMail() {
    const validation = this.text;

    if (validation) {
      this.isWorking = true;

      if (this.question_id) {
        const data = {
          text: this.text,
          name: this.user.username,
          email: this.user.email,
          question_id: this.question_id,
          author: this.question.username,
          question: this.question.question,
          exam_id: this.question.exam_id,
          subject: this.question.subject,
          date: this.question.date,
          author_email: this.question.email,
          mail_subject: this.subject,
        };
        this.API.post('contact/send-mail-question', data).then(() => {
          this.isWorking = false;
          this.emailSend = true;
        });
      } else {
        const data = {
          text: this.text,
          name: this.user.username,
          email: this.user.email,
        };
        this.API.post('contact/send-mail', data).then(() => {
          this.isWorking = false;
          this.emailSend = true;
        });
      }
    }
  }
}

angular.module('crucioApp').component('helpcomponent', {
  templateUrl: 'views/help.html',
  controller: HelpController,
});
