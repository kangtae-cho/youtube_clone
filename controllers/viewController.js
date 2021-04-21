export const renderHomeView = (req, res, next) => {
    res.render('login', { 
        title: 'Youtube Clone' });
}

export const renderJoinView = (req, res, next) => {
    console.log("render join")
    res.render('join',  { 
        title: '가입 페이지'})
};

export const renderVideosView = (req, res, next) => {
    res.render('videos', {
        title: 'Videos'
    });
}

export const renderVideoUploaderView = (req, res, next) => {
    res.render('videoUploader', {
        title: 'Video Uploader'
    });
}