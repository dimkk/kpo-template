'use strict';

(function() {

class AdminController {
  users: Object[];

  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('serverApp.admin')
  .controller('AdminController', AdminController);

})();
