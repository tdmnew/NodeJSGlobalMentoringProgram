/* Controller Response */

export const CREDENTIALS_INCORRECT = "Username or Password Incorrect";
export const LOGIN_SUCCESSFUL = "Successfully logged in";
export const USER_NOT_FOUND = "User not found";
export const USERS_NOT_FOUND =
  "Users could not be found with the given arguements";
export const GROUPS_NOT_FOUND =
  "Groups could not be found with the given arguements";
export const GROUP_NOT_FOUND = "Group not found";

/* Validation */

// Users
export const LOGIN_FIELD_EMPTY = "Please enter a login";

export const PASSWORD_FIELD_EMPTY = "Please enter a password";
export const PASSWORD_PATTERN_INCORRECT =
  "Password must contain a letter and number";

export const AGE_FIELD_EMTPY = "Please enter an age";
export const AGE_PATTERN_INCORRECT = "Age must be between 4 and 130";

// Auto Suggestions
export const AUTO_SUGGESTIONS_SUBSTRING = "";
export const AUTO_SUGGESTIONS_LIMIT = 10;

// Groups
export const NAME_FIELD_EMPTY = "Please enter a group name";
export const PERMISSIONS_FIELD_EMPTY =
  "Please enter one or more permissions for this group";
export const PERMISSIONS_PATTERN_INCORRECT =
  "Permissions must be between 1 and 5, and contain a valid type";
export const GROUP_ID_EMPTY = "Please enter a valid group id";
export const USER_IDS_PATTERN_INCORRECT = "Please enter one more or user ids";
