//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require redux/dist/redux.min
//= require popper.js/dist/umd/popper.min
//= require argon/bootstrap.min
//= require argon/argon
//= require_tree ./provider
//= require_tree .

const state = {
    mix: Redux.createStore(Mix, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
};
