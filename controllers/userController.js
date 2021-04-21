'use strict';
import { readUserByUserID, readUserByIDPW, createUser } from "../models/user.js";

export const isLogined = (req, res, next) => {
    if (req.session.user) {
      res.send('you are already logined!!');
    } else {
      next();
    } 
};

export const userHome = function(req, res, next) {
    res.send('respond with a resource');
};

export const doLogin = (req, res) => {
    const user_id = req.body.user_id;
    const user_pw = req.body.user_pw;
  
    const user = readUserByIDPW(user_id, user_pw);
  
    if (user) {
      req.session.user = user;
      res.send('LOGIN SUCCESS');
    } else {
      res.send('LOGIN FAILED: 아이디와 비밀번호 중 틀린것이 있습니다.');
    }
  
  };

export const doJoin = async (req, res, next) => {
  const user_id = req.body.user_id;
  const user_pw = req.body.user_pw;


  try {
    const user = await readUserByUserID(user_id);
    console.log("thisline is executed1")
  } catch (err) {
    console.log(err)
    return res.send('JOIN FAILED');
  }

  if (!user) {
    try {
      console.log("thisline is executed2")
      const createUserRes = await createUser(user_id, user_pw);
    } catch (err) {
      console.log(err);
      //return res.json({});
      return res.send('JOIN FAILED');
    }

  }
  
  // 가입된 id 띄어주려면.
  //res.send('createUserRes.user_id');
  return res.send('JOIN SUCCESS');
}