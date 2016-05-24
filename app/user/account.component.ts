class AccountController {
  API: API;
  Auth: Auth;
  $scope: any;
  user: User;
  isWorking: boolean;
  isSaved: boolean;
  hasError: boolean;
  wrongPassword: boolean;
  oldPassword: string;
  newPassword: string;
  newPasswordC: string;

  constructor(Page, Auth, API, $scope) {
    this.API = API;
    this.Auth = Auth;
    this.$scope = $scope;

    Page.setTitleAndNav('Account | Crucio', 'Name');

    this.user = this.Auth.getUser();
  }

  formChanged(): void {
    this.$scope.form.passwordc.$setValidity('confirm', this.newPassword === this.newPasswordC);
  }

  saveUser(): void {
    this.isSaved = false;
    this.hasError = false;

    this.isWorking = true;

    const data = {
      course_id: this.user.course_id,
      semester: this.user.semester,
      current_password: this.oldPassword,
      password: this.newPassword,
    };
    this.API.put(`users/${this.user.user_id}/account`, data, true).then(result => {
      if (result.data.status) {
        this.Auth.setUser(this.user);
      } else {
        this.user = this.Auth.getUser();
        this.hasError = true;
      }

      this.isSaved = result.data.status;
      this.wrongPassword = (result.data.error === 'error_incorrect_password');
      this.isWorking = false;
    });
  }
}

angular.module('crucioApp').component('accountcomponent', {
  templateUrl: 'app/user/account.html',
  controller: AccountController,
});