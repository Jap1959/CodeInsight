const Userschema = require("../Schemas");
const bcrypt = require("bcrypt");
const Adduser = async (email, password, Codechef, Codeforces, Leetcode) => {
  const result = await Userschema.User.find({ Email: email });
  if (result.length !== 0) {
    return { status: 422, message: "User Already Exists" };
  } else {
    const saltRounds = 10;
    const hashed = bcrypt.hashSync(password, saltRounds);
    if (hashed != null) {
      try {
        const newuser = new Userschema.User({
          Email: email,
          userName: email.slice(0, 7),
          Password: hashed,
          codechef: Codechef,
          codeforces: Codeforces,
          leetocde: Leetcode,
        });
        const result = await newuser.save();
        if (result != null) {
          return { status: 200, message: "data added sucessfully" };
        } else {
          return { status: 422, message: "Some Error ocuured" };
        }
      } catch (err) {
        console.log(err);
        return { status: 422, message: err };
      }
    } else {
      return { status: 422, message: "Try again later" };
    }
  }
};
const AddFlag = async (UserName, ContestName) => {
  try {
    const res = await Userschema.Standing.findOne({
      userName: UserName,
      ContestName: ContestName,
    });
    if (res!== null) {
      const result = await Userschema.Standing.findOneAndUpdate(
        { UserName: UserName, ContestName: ContestName },
        {
          $set: {
            flag: 1, // Set flag as 1
          },
        },
        {
          new: true,
        }
      );
      if (result != null) {
        return { status: 200, message: "data added sucessfully" };
      } else {
        return { status: 422, message: "Some Error ocuured" };
      }
    } else {
      const newuser = new Userschema.Standing({
        UserName: UserName,
        ContestName: ContestName,
        flag: 1,
      });
      const result = await newuser.save();
      if (result != null) {
        return { status: 200, message: "data added sucessfully" };
      } else {
        return { status: 422, message: "Some Error ocuured" };
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { Adduser, AddFlag };
