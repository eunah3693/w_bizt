import React, { useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import Parser from "html-react-parser";

import { onResponseSuccess, requestBiztApi } from "utility/connectivity";

import ImageBanner from "pages/User/Home/ImageBanner";
import OfficeBanner from "pages/User/Home/OfficeBanner";
import FloatingActionButtons from "pages/User/Home/FloatingButton";
import InfoFooter from "appComponents/InfoFooter";

import "css/Home.css";

function homeBannerRenderer(bannerDataList) {
  if (!bannerDataList) {
    return null;
  }
  return bannerDataList.map((bannerData, index) => {
    if (!bannerData) {
      return null;
    }
    switch (bannerData.type) {
      case "image":
        return <ImageBanner key={index} bannerData={bannerData} />;
      case "office":
        return <OfficeBanner key={index} bannerData={bannerData} />;
      case "html":
        return (
          <Box key={index} m={1}>
            {Parser(bannerData.contents)}
          </Box>
        );
      default:
        console.error(`banner data of invalid type: ${bannerData.type}`);
        return null;
    }
  });
}

function Home() {
  const [mainBanner, setMainBanner] = useState(null);
  const [bannerDataList, setBannerDataList] = useState(null);

  useEffect(() => {
    requestBiztApi("/api/banner", null, onResponseSuccess(setMainBanner));
    requestBiztApi("/api/home/display", null, setBannerDataList);
  }, []);

  return (
    <Box>
      <ImageBanner
        title="Visit! BIZT!"
        desc="집중이 필요한 순간, 방문하세요."
        contents={mainBanner}
      />
      {homeBannerRenderer(bannerDataList)}
      {/* <DialogPaper
        buttonName="비밀번호 변경 알림"
        modalTitle="비밀번호 변경 알림"
        modalContents={
          <text> 비밀번호를 설정한 지 180일이 지나 변경이 권장됩니다.</text>
        }
        cancel="다음에 할게요"
        next="변경하기"
        nextClick={`/mypage/setting/password`}
      ></DialogPaper>
      <AccessDenied></AccessDenied> */}
      <FloatingActionButtons />
      <InfoFooter />
    </Box>
  );
}

export default Home;
