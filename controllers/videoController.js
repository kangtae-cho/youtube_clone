'use strict';
import AWS from 'aws-sdk';
import { createVideo } from '../models/video.js';
const sts = new AWS.STS();

export const uploadVideo = (req, res) => {
    console.log(req.body);
}

export const getVideo = (req, res) => {

}

export const getVideoList = (req, res) => {

}

export const deleteVideo = (req, res) => {

}

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


export const initVideo = (req, res) => {
    // 1. s3 경로 생성
    // 2. access_key 생성
    // 3. returnn 1,2

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today_str = yyyy + '/' + mm + '/' + dd;

    var file_name = getRandomString(256) + '.mp4';

    var final_file_name = today_str + '/' + file_name;

    console.log(final_file_name)

    var insert_res = createVideo(req.user_id, final_file_name);

    sts.assumeRole({
        DurationSeconds: 3600,
        ExternalId: '1234-1234-1234-1234-1234',
        RoleArn: "arn:aws:iam::397760389012:role/youtubeUploadRole",
        RoleSessionName: 'abc'
      }, (err, data) => {
        if (err) throw err;
        res.json({
            file_name: final_file_name,
            access_key_info: data
        });
        }
      )
};

export const saveVideo = (req, res) => {

}

export const finishVideo = (req, res) => {

}