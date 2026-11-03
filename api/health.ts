export default function handler(req: any, res: any) {
  res.status(200).json({
    status: "healthy",
    consultant: "Aniket Dubey",
    service: "Business Consulting & Managed IT Services",
    recipients: ["email@aniketdubey.com", "aniketdubey.2012@gmail.com"],
  });
}
