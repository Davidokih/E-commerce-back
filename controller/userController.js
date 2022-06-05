const userModel = require('../model/userModel');
// const verifiedModel = require('../model/verifideModel');
// const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
// const crypto = require('crypto');
require('dotenv').config();

// const transport = nodemailer.createTransport({
//     service: process.env.SERVICE,
//     auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//     }
// });

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const getOneUser = async (req, res) => {
    try {
        const users = await userModel.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const users = await userModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const image = await cloudinary.uploader.upload(req.file.path);

        const user = await userModel.create({
            email,
            userName,
            password: hashed,
            // avatar: req.file.path,
            avatar: image.secure_url,
            avatarID: image.public_id,
        });

        // const dataToken = crypto.randomBytes(64).toString('hex');

        // const token = jwt.sign({ dataToken }, process.env.SECRET, { expiresIn: process.env.MINUTE });

        // const mailOptions = {
        //     from: "no-reply@gmail.com",
        //     to: email,
        //     subject: "Account verification",
        //     html: `<h3>
        //     This is to verify your account.
        //     <a href="http://localhost:1111/api/user/${user._id}/${token}">Link></a> to countinue
        //     </h3>`
        // };

        // transport.sendMail(mailOptions, (err, info) => {
        //     if (err) {
        //         console.log(err.message);
        //     } else {
        //         console.log("Email sent: " + info.response);
        //     }
        // });

        res.status(201).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
        console.log(error);
    }
};

// const verifyUser = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.params);
//         if (user) {
//             if (user.verifiedToken !== "") {
//                 await userModel.findByIdAndUpdate(user._id, {
//                     verified: true,
//                     verifiedToken: "",
//                 }, { new: true });

//                 await userModel.findByIdAndUpdate(user._id, {
//                     userID: user._id,
//                     token: ""
//                 }, { new: true });

//                 res.status(201).json({
//                     message: "Verification complete, you can go sign in now!",
//                 });
//             } else {
//                 res.status(400).json({
//                     message: error.message
//                 });
//             }
//         } else {
//             res.status(400).json({
//                 message: "User does not exit"
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: users,
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: error.message,
//         });
//     }
// };

const signInUser = async (req, res) => {
    try {
        const { email, password, userName } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            const check = await bcrypt.compare(password, user.password);
            if (check) {
                const token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET, { expiresIn: process.env.DATE });

                const { password, ...info } = user._doc;

                res.status(200).json({
                    status: 'success',
                    data: { token, ...info }
                });
            } else {
                res.status(400).json({
                    message: "Password do not match"
                });
            }
        } else {
            res.status(400).json({
                message: "User does not exit"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error,
        });
        console.log(error);
    }
};
module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    createUser,
    signInUser
};