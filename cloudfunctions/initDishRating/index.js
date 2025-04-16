// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        // 筛选没有 rating 字段和 ratings 数组的文档
        const noRatingRes = await db.collection('dishData').where({
            rating: _.exists(false),
            ratings: _.exists(false)
        }).get();

        const docs = noRatingRes.data;
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i];
            // 更新文档，添加 rating 字段和 ratings 数组
            await db.collection('dishData').doc(doc._id).update({
                data: {
                    rating: 0,
                    ratings: []
                }
            });
        }
        return {
            success: true,
            message: '批量添加 rating 字段和 ratings 数组成功'
        };
    } catch (err) {
        console.error('操作失败', err);
        return {
            success: false,
            message: '操作失败',
            error: err
        };
    }
};    