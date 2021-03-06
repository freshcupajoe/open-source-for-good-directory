import axios from 'axios';

import {
  GET_GITHUB_DATA,
  UPDATE_SEARCH_INPUT,
  CHECK_USER,
} from './types';

/**
 * get API info from GitHub
 * @param {string} repo name as '/user/repo' to get the data from Github
 * @return {object} containing all the repo information required for <Card /> creation
 */
export function getGithubData(repo) {
  return dispatch => axios.get(`https://api.github.com/repos/${repo}`)
    .then((response) => {
      const githubData = {
        title: response.data.name.replace(/-/g, ' '),
        description: response.data.description,
        full_name: response.data.full_name,
        stargazer_count: response.data.stargazers_count,
        open_issues: response.data.open_issues,
        subscribers_count: response.data.subscribers_count,
      };
      dispatch({
        type: GET_GITHUB_DATA,
        githubData,
      });
    });
}
/**
 * modify search based on search input
 * @param {string} value of our input
 * @return {string} the updated value
 */
export function updateSearchInput(value) {
  return {
    type: UPDATE_SEARCH_INPUT,
    input_value: value,
  };
}
/**
 * check if the user is logged on FreeCodeCamp website
 * @const {string} user -> the cookie with infos regarding the user
 * @return {boolean} true if userId exists, false if not
 */
export function checkUser() {
  const user = document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, '$1');
  return {
    type: CHECK_USER,
    isDev: !!(user),
  };
}
