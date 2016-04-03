class StatisticController {
  user: User;

  constructor(Auth, Page) {
    Page.setTitleAndNav('Statistik | Crucio', 'Lernen');

    this.user = Auth.getUser();
  }
}

angular.module('crucioApp').component('statisticcomponent', {
  templateUrl: 'views/statistic.html',
  controller: StatisticController,
});
