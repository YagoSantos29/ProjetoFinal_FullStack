import User from "./User.js";
import Student from "./Student.js";
import Class from "./Class.js";
import Enrollment from "./Enrollments.js";
import Grade from "./Grade.js"










User.hasOne(Student, {
    foreignKey: "userId",
    as: "student"
});

Student.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});








Student.hasMany(Enrollment, {
    foreignKey: "studentId",
    as: "enrollments"
});

Enrollment.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student"
});







Class.hasMany(Enrollment, {
    foreignKey: "classId",
    as: "enrollments"
});

Enrollment.belongsTo(Class, {
    foreignKey: "classId",
    as: "class"
});








Student.hasMany(Grade, {
    foreignKey: "studentId",
    as: "grades"
});

Grade.belongsTo(Student, {
    foreignKey: "studentId",
    as: "student"
});






Class.hasMany(Grade, {
    foreignKey: "classId",
    as: "grades"
});

Grade.belongsTo(Class, {
    foreignKey: "classId",
    as: "class"
});

export {
    User,
    Student,
    Class,
    Enrollment,
    Grade
};