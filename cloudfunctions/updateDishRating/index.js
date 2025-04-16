// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const { dishId, userRating } = event;

        if (dishId && userRating) {
            // 更新指定菜品文档，将用户打分数据添加到 ratings 数组中
            await db.collection('dishData').doc(dishId).update({
                data: {
                    ratings: _.push(userRating)
                }
            });

            // 获取更新后的菜品文档
            const res = await db.collection('dishData').doc(dishId).get();
            const ratings = res.data.ratings || [];
            const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
            const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;

            // 更新菜品的平均评分
            await db.collection('dishData').doc(dishId).update({
                data: {
                    rating: averageRating
                }
            });

            return {
                success: true,
                message: '用户打分数据上传成功，平均评分更新成功',
                averageRating
            };
        } else {
            return {
                success: false,
                message: '缺少 dishId 或 userRating 参数'
            };
        }
    } catch (err) {
        console.error('操作失败', err);
        return {
            success: false,
            message: '操作失败',
            error: err
        };
    }
}; 