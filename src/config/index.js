module.exports = {
  host: process.env.HOST || "https://feellife.joincare.com",
  qiniu_upload_host:
    process.env.QINIU_UPLOAD_HOST || "https://up-z0.qiniup.com",
  qiniu_display_domain:
    process.env.QINIU_DISPLAY_DOMAIN || "https://cdn.ibreathe.cn",
};
