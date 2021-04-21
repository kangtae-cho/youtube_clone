const INSERT_USER = (user_id, pw) => `INSERT INTO youtube_user.user (user_id, user_pw) VALUES ('${user_id}', '${user_pw}')`;
const READ_ALL_USERS = () => `SELECT * FROM youtube_user.user`;
const READ_USER_BY_USER_ID = (user_id) => `SELECT * FROM youtube_user.user WHERE user_id='${user_id}'`;
