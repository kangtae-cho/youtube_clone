'use strict';
import AWS from 'aws-sdk';
import { createVideo, finishVideoByS3Path, readVideoById, readVideos, updateVideoByS3Path } from '../models/video.js';
const sts = new AWS.STS();

export const uploadVideo = (req, res) => {
    console.log(req.body);
}

export const getVideo = async (req, res) => {
    const video_id = req.query.video_id;
    const return_rows = await readVideoById(video_id);

    return res.json(return_rows);
}

export const getVideoList = async (req, res) => {
    const return_rows = await readVideos();
    return res.json(return_rows);
}

export const clickVideo = (req, res, next) => {
    const S3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region : 'ap-northeast-2'
    });

    const video_id = req.query.video_id;
    var now = new Date();

    var param = {
        'Bucket':'youtube.kangtae.log',
        'Key': `logs/${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}/${now.getHours()}/${now.getMinutes()}/${now.getSeconds()}.${now.getMilliseconds()}_${video_id}`,
        'Body': ""
    }
    S3.upload(param, function(err, data){
        res.send("OK");
    });
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
    // 3. returnㄸ 1,2

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var today_str = yyyy + '/' + mm + '/' + dd;

    var file_name = getRandomString(256) + '.mp4';

    var final_file_name = today_str + '/' + file_name;

    console.log(final_file_name)

    var insert_res = createVideo(req.body.user_id, final_file_name);

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
    const video_name = req.body.video_name;
    const description = req.body.description;
    const s3_path = req.body.s3_path;
    
    var result = updateVideoByS3Path(video_name, description, s3_path);

    res.send(200);

}

export const finishVideo = (req, res) => {
    const s3_path = req.body.s3_path;

    var result = finishVideoByS3Path(s3_path);

    res.send(200);

}