// const pg_client = require('../pg/db');
import pg_pool from '../pg/db.js';

const user_scheme = {
    'user_id': 'string',
    'user_pw': 'string'
}


// django <- python
// spring boot

// (input) => { body } (1)
// function(input) { body } (2)
// (input) => ret (3)
// function(input) { return ret; } (4)
// (1) == (2), (3) == (4)



const cloneObj = obj => JSON.parse(JSON.stringify(obj))

export const createUser = async (user_id, user_pw) => {
    const res = await pg_pool.query(`INSERT INTO youtube_user.user (user_id, user_pw) VALUES ('${user_id}', '${user_pw}')`);

    console.log(res);
    
    var return_value = cloneObj(user_scheme);

    return_value.user_id = res.user_id;
    return_value.user_pw = res.user_pw;

    return return_value;
}


export const readAllUser = async () => {
    const res = await pg_pool.query(`SELECT * FROM youtube_user.user`);
    return res;
}

export const readUserByUserID = async (user_id) => {
    console.log(`SELECT * FROM youtube_user.user WHERE user_id='${user_id}'`);
    try{
        const res = await pg_pool.query(`SELECT * FROM youtube_user.user WHERE user_id='${user_id}'`);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const readUserByIDPW = async (user_id, user_pw) => {
    const res = await pg_pool.query(`SELECT * FROM youtube_user.user WHERE user_id='${user_id}' AND user_pw='${user_pw}'`);
    return res;
}

export const updateUserPassword = async (user_id, user_pw) => {
    await pg_pool.query(`UPDATE youtube_user.user SET user_pw = ${user_pw} WHERE user_id = ${user_id}`);
    return res;
}

export const deleteAllUser = async () => {
    const res = await pg_pool.query(`DELETE FROM youtube_user.user`);
    return res;
}


export const deleteUser = async (user_id) => {
    const res = await pg_pool.query(`DELETE FROM youtube_user.user WHERE user_id=${user_id}`);    
    return res;
}