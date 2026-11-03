export default function handler(req: any, res: any) {
  const data = {
    status: "healthy",
    consultant: "Aniket Dubey",
    service: "Business Consulting & Managed IT Services",
    recipients: ["email@aniketdubey.com"],
  };

  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(200).json(data);
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}
