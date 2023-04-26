const { Router } = require("express");

const { loginRequired } = require("../middlewares/login-required");
const { asyncHandler } = require("../utils/async-handler");
const { userService } = require("../services/user-service");

const userRouter = Router();

// 회원가입 api
userRouter.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { email, password, fullName, phoneNumber, address } = req.body;

    /** 신규사용자 정보 */
    const newUser = await userService.addUser({
      email,
      password,
      fullName,
      phoneNumber,
      address,
    });

    res.status(201).json(newUser);
  })
);

// 로그인 api
userRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    res.status(200).json(userToken);
  })
);

// 사용자 정보 조회
userRouter.get(
  "/info",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    /** jwt 토큰으로 검증된 id(from loginRequired) */
    const userId = req.currentUserId;

    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  })
);

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.put(
  "/info",
  loginRequired,
  asyncHandler(async function (req, res, next) {
    /** loginRequired 미들웨어에서 저장된 currentUserId 사용(jwt토큰으로 검증된 id) */
    const userId = req.currentUserId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { 
      fullName, 
      currentPassword, 
      passwordToChange, 
      phoneNumber, 
      postalCode, 
      addressMain, 
      addressDetail 
    } = req.body;

    // 채영님께서 입력값이 없으면 버튼이 눌리지 않게 한다고 하셔서 프론트에서 넘어오지 않을텐데 이 에러처리가 필요할까?
    // if (!currentPassword) {
    //   const err = new Error(403, "정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    //   throw err;
    // }

    // 사용자가 수정 요청한 정보
    const infoToUpdate = {
      fullName, 
      currentPassword, 
      passwordToChange, 
      phoneNumber, 
      postalCode, 
      addressMain, 
      addressDetail
    };

    // 사용자 정보를 업데이트
    // 보낼 응답값이 없다면 굳이 변수를 선언할 필요 없을 듯
    // const updatedUserInfo = 
    await userService.setUser(userId, infoToUpdate);

    res.status(200).json({ message: "요청하신 수정이 완료되었습니다." });
    // 업데이트된 데이터를 응답값으로 보낼 필요가 있을까? 
    //.json(updatedUserInfo);
  })
);

// 사용자 정보 삭제
userRouter.delete("/info", loginRequired, async (req, res, next) => {
  /** loginRequired 미들웨어에서 저장된 currentUserId 사용(jwt토큰으로 검증된 id) */
  const userId = req.currentUserId;

  // 삭제하려면 비밀번호 입력값을 받을 것임. 이는 body값으로 올터!
  const { currentPassword } = req.body;

  await userService.deleteUser(userId, currentPassword);

    res
      .status(204)
      .json({ message: "탈퇴 완료되었습니다." });
  }
);

module.exports = { userRouter };
