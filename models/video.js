import pg_pool from '../pg/db.js';

const cloneObj = obj => JSON.parse(JSON.stringify(obj))

const video_scheme = {
    'video_id': 'int',
    'user_id': 'string',
    'video_name': 'string',
    'description': 'string',
    's3_path': 'string'
}

export const createVideo = async (user_id, s3_path) => {
    const res = await pg_pool.query(`INSERT INTO youtube_user.video (user_id, s3_path) VALUES ('${user_id}', '${s3_path}')`);
    
    var return_value = cloneObj(video_scheme);

    return_value.video_id = res.video_id;
    return_value.user_id = res.user_id;
    return_value.video_name = res.video_name;
    return_value.description = res.description;
    return_value.s3_path = res.s3_path;

    return return_value;
};

export const createVideoWithInfo = async (user_id, video_name, description, s3_path) => {
    const res = await pg_pool.query(`INSERT INTO youtube_user.video (user_id, video_name, description, s3_path) VALUES ('${user_id}', '${video_name}', '${description}', '${s3_path}')`);

    var return_value = cloneObj(video_scheme);

    return_value.video_id = res.video_id;
    return_value.user_id = res.user_id;
    return_value.video_name = res.video_name;
    return_value.description = res.description;
    return_value.s3_path = res.s3_path;

    return return_value;
};

export const updateVideoByS3Path = async(video_name, description, s3_path) => {
    const res = await pg_pool.query(`UPDATE youtube_user.video SET video_name = '${video_name}', description = '${description}' WHERE s3_path ='${s3_path}'`);

    var return_value = cloneObj(video_scheme);

    return_value.video_id = res.video_id;
    return_value.user_id = res.user_id;
    return_value.video_name = res.video_name;
    return_value.description = res.description;
    return_value.s3_path = res.s3_path;

    return return_value;
}