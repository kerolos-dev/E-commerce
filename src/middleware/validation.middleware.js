import { Types } from "mongoose";
import { AppError } from "../utils/appError.js";

const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            { ...req.params, ...req.body, ...req.query },
            { abortEarly: false }
        );

        if (!error) {
            next(); // إذا لم تكن هناك أخطاء، انتقل إلى الميدل وير التالي
        } else {
            let errMsg = [];
            error.details.forEach((val) => {
                errMsg.push(val.message);
            });

            // إرسال الخطأ إلى ميدل وير معالجة الأخطاء
            next(new AppError(errMsg));
            // قم بإزالة السطر التالي لأنه غير ضروري
            // res.json(errMsg);
        }
    };
};

const isValidObjectId = (value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;
    return helper.message("id is not valid");
};

export { validation, isValidObjectId };
