const express = require("express");
const cors = require("cors");
const app = express();

const sample = require("./testServer/dataSample");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/api/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

// accountJsonFormat
app.get("/api/account", (req, res) => {
  res.send(sample.accountData);
});

app.get("/api/posting", (req, res) => {
  res.send([
    sample.postData,
    sample.postData,
    sample.postData,
    sample.postData,
  ]);
});

app.get("/api/report/list", (req, res) => {
  res.send([
    sample.reportData,
    sample.reportData,
    sample.reportData,
    sample.reportData,
  ]);
});

app.get("/api/report", (req, res) => {
  res.send({
    responseCode: 200,
    error: "",
  });
});

// messageJsonFormat
app.get("/api/message/room", (req, res) => {
  res.send([
    sample.chatRoomData,
    sample.chatRoomData,
    sample.chatRoomData,
    sample.chatRoomData,
  ]);
});

app.get("/api/message/chat", (req, res) => {
  res.send([
    sample.chatData,
    sample.chatData,
    sample.chatData,
    sample.chatData,
    sample.chatData,
    sample.chatData,
  ]);
});

app.get("/api/notification", (req, res) => {
  res.send([
    sample.notificationData,
    sample.notificationData,
    sample.notificationData,
    sample.notificationData,
  ]);
});

// officeJsonFormat

app.get("/api/office/seatType", (req, res) => {
  res.send([
    sample.seatTypeData,
    sample.seatTypeData,
    sample.seatTypeData,
    sample.seatTypeData,
  ]);
});

app.get("/api/office", (req, res) => {
  res.send([
    sample.officeData,
    sample.officeData,
    sample.officeData,
    sample.officeData,
  ]);
});

// paymentJsonFormat
app.get("/api/payment-method", (req, res) => {
  res.send([
    sample.paymentMethodData,
    sample.paymentMethodData,
    sample.paymentMethodData,
    sample.paymentMethodData,
  ]);
});

app.post("/api/payment-method", (req, res) => {
  res.send({
    responseCode: 200,
    error: "",
    ...req.body,
  });
});

app.get("/api/reservation", (req, res) => {
  res.send([
    sample.reservationData,
    sample.reservationData,
    sample.reservationData,
    sample.reservationData,
    sample.reservationData,
  ]);
});

//reviewJsonFormat
app.get("/api/reviews", (req, res) => {
  res.send([
    sample.reviewData,
    sample.reviewData,
    sample.reviewData,
    sample.reviewData,
  ]);
});

//userMainPageFormat
app.get("/api/dashboard", (req, res) => {
  res.send({
    settlements: [
      sample.settlementData,
      sample.settlementData,
      sample.settlementData,
      sample.settlementData,
    ],
    pendingPayments: [
      sample.paymentData,
      sample.paymentData,
      sample.paymentData,
      sample.paymentData,
    ],
  });
});
app.get("/api/home/display", (req, res) => {
  res.send([
    sample.bannerData,
    sample.officeBannerData,
    sample.officeBannerData,
    sample.htmlBannerData,
  ]);
});

app.listen(8080, () => console.log("API is running on http://localhost:8080"));
