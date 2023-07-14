const User = require('../models/userModal');
const {
  hashPassword,
  comparePassword,
  createJSONToken,
  validateJSONToken,
} = require('../helpers/utils');
const s3 = require('../awsConfig');
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto = require('crypto');
const transporter = require('../helpers/email');

exports.addNewUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    // Check username & email
    const existingEmail = await User.findOne({
      email: email,
    });
    const existingUsername = await User.findOne({
      username: username,
    });

    if (existingEmail) {
      throw new Error(
        `${email} is already registered in this website. Are you a current user?`
      );
    }

    if (existingUsername) {
      throw new Error(
        `${username} is already registered in this website. Are you a current user?`
      );
    }

    const newUser = new User(req.body);
    const rawPassword = newUser.password;
    const hashedPassword = await hashPassword(rawPassword);
    newUser.password = hashedPassword;

    const result = await newUser.save();

    const token = createJSONToken(result._id);

    return res.status(201).json({
      status: 'success',
      message: 'Saving to database success.',
      user: result,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = req.body;
    let user;
    if (data.username) {
      user = await User.findOne({ username: data.username });
    } else {
      user = await User.findOne({ email: data.email });
    }

    if (!user) {
      throw new Error('Username or email address wrong.');
    }

    const passwordIsValid = await comparePassword(data.password, user.password);
    if (!passwordIsValid) {
      throw new Error('Password is  incorrect');
    }

    const token = createJSONToken(user._id);

    const tokenValidity = validateJSONToken(token);
    // tokenValidity : { userId: '648c102fcf2b8b5996df02fe', iat: 1686937459, exp: 1686941059 }
    return res.status(200).json({
      status: 'success',
      token,
      user: user,
    });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error('Something went wrong.');
    }

    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('Something went wrong.');
    }

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const field = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, field, {
      returnDocument: 'after',
    });
    if (!user) {
      throw new Error('Something went wrong.');
    }

    return res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  const paramsUserId = req.params.userId;
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    // Check is the user is existing user and matching the id sent from frontend
    if (paramsUserId !== userId) {
      throw new Error(
        "Different user ID. You can not change other user's password."
      );
    }

    if (newPassword.length < 6) {
      throw new Error('Password need to have 6 minimum letters');
    }

    // Check whether is existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) throw new Error("User doesn't exist.");

    // Compare current password
    const passwordIsCorrect = await comparePassword(
      currentPassword,
      existingUser.password
    );

    if (passwordIsCorrect === false) {
      throw new Error('Current password is not correct');
    }

    // Hashed New password
    const hashedPassword = await hashPassword(newPassword);

    const result = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      {
        returnDocument: 'after',
      }
    );
    if (!result) {
      throw new Error('Updating new password failed.');
    }

    return res.status(200).json({
      status: 'success',
      result,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'money-tracker',
    acl: 'bucket-owner-full-control', // Set the appropriate access control level
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      // console.log('req: ', req);
      console.log('file: ', file);
      cb(null, `${req.userId}/` + `${file.originalname}`); // Use a unique key for the uploaded file
    },
  }),
});

exports.updateUserImage = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Updating new image failed.');
    }
    console.log('req.file: ', req.file);
    const userId = req.userId;
    const { originalname, size, mimetype } = req.file;

    const result = await User.findOneAndUpdate(
      { _id: userId },
      { profileImage: originalname },
      {
        returnDocument: 'after',
      }
    );

    // Access the uploaded file information

    return res.status(200).json({
      status: 'success',
      file: req.file,
      user: result,
      imgURL: req.file.location,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getProfileImage = async (req, res) => {
  const { userId, key } = req.params;
  try {
    const fileStream = s3
      .getObject({
        Bucket: 'money-tracker',
        Key: userId + '/' + key,
      })
      .createReadStream();
    // .promise();
    // const file = await fileStream;
    fileStream.pipe(res);
  } catch (error) {
    return null;
  }
};

async function deleteOldImage(req, res, next) {
  const formData = req.body;
  const oldImage = formData.oldImage;
  console.log('oldImage: ', oldImage);

  const result = await s3
    .deleteObject({
      Bucket: 'money-tracker',
      Key: req.userId + '/' + oldImage,
    })
    .promise();
  console.log('Result: ', result);
  next();
}

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return res.status(400).json({
      status: 'failed',
      message: "User doesn't exist",
    });
  }

  // Generate password reset token
  const randomBytes = crypto.randomBytes(32);
  const passwordResetToken = randomBytes.toString('hex');

  // Hash the token
  const hash = crypto.createHash('sha256');
  hash.update(passwordResetToken);
  const hashedString = hash.digest('hex');

  existingUser.passwordResetHashedToken = hashedString;
  existingUser.passwordResetHashedTokenExpires = Date.now() + 1000 * 60 * 10;
  await existingUser.save();

  const serverAddress = `${req.protocol}://${req.get('host')}`;
  const apiRoute = `${serverAddress}/api/v1/user/${passwordResetToken}`;

  await transporter.sendMail({
    from: '"Pro Money Tracker 👻" <moneytrackerpro@service.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Password Reset Token', // Subject line
    text: `Go to ${apiRoute} to reset your password`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  return res.status(200).json({
    status: 'success',
    message: `Your password reset token has been sent to email`,
  });
};

exports.renewPasswordWithToken = async (req, res) => {
  const { resetToken, newPassword, confirmNewPassword } = req.body;
  console.log(req.body);
  // check if new Password and confirm password the same:
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      status: 'failed',
      message: `New password is different with confirm new password.`,
    });
  }

  // Check if reset token is matched:
  const hash = crypto.createHash('sha256');
  hash.update(resetToken);
  const hashedResetToken = hash.digest('hex');

  const resetTokenMatched = await User.findOne({
    passwordResetHashedToken: hashedResetToken,
  });

  if (!resetTokenMatched) {
    return res.status(400).json({
      status: 'failed',
      message: `Password Reset Token doesn't match, please make sure you copy the correct token.`,
    });
  }

  if (resetTokenMatched.passwordResetHashedTokenExpires < Date.now()) {
    return res.status(400).json({
      status: 'failed',
      message: `Reset Token expired. Please try to reset password again.`,
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      status: 'failed',
      message: `Password need to have 6 minimum letters.`,
    });
  }

  const hashedPassword = await hashPassword(newPassword);
  resetTokenMatched.password = hashedPassword;
  const result = await resetTokenMatched.save();

  return res.status(200).json({
    status: 'success',
    message: `Password successfully renewed.`,
    result,
  });
};

exports.deleteOldImage = deleteOldImage;
exports.upload = upload;
