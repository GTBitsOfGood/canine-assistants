/*
{"_id":{"$oid":"65dce6ed3aad65db95a47afb"},"provider":"google","type":"oauth","providerAccountId":"103006411232413196222","access_token":"ya29.a0AfB_byCh8kRX_lP_cW0XuPLC5wMNNwixpFvBTWtuioDZStVgXdosZ_seCJU3rzFSt_DqWga6QiNE-f4Kd5Jm8gthpXhfjnWirfTr2VI9ikCOAMAWKSJyyGSiV6OvzmD4kyTKDsFIW4pQWuTvSiW-RtrsVabDWAuc7z6NaCgYKAewSARESFQHGX2MiQQPDFcuaZEot_doe9Uv8pA0171","expires_at":{"$numberInt":"1708979451"},"scope":"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOTc3N2E2ODU5MDc3OThlZjc5NDA2MmMwMGI2NWQ2NmMyNDBiMWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNDM2ODI1NzMxNTQtazdla3E4M3Y2dHV0Z3JqY2QzMTA4MGlxMTlocmIyMG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNDM2ODI1NzMxNTQtazdla3E4M3Y2dHV0Z3JqY2QzMTA4MGlxMTlocmIyMG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMwMDY0MTEyMzI0MTMxOTYyMjIiLCJlbWFpbCI6ImxhdXIzbm05MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkxhTWoyMG10NjFhd2Vua2prM21MWVEiLCJuYW1lIjoiTGF1cmVuIE1jUGV0ZXJzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xTaDZZQm84N2hmbmNZcEFja2VuelV3YmN1MTJXN28yQ2JtOFptVExodD1zOTYtYyIsImdpdmVuX25hbWUiOiJMYXVyZW4iLCJmYW1pbHlfbmFtZSI6Ik1jUGV0ZXJzIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MDg5NzU4NTIsImV4cCI6MTcwODk3OTQ1Mn0.cmSmogu04WXlBA5aLlPs5Qo-Vh_Sq0-i9aujQiD3Si6glICDseoFLZb-aD56Y_DLSUfQGG9zMuOJdr8UtjZPZIarPbSus761nbIZBmVmONOEaCMJrAV_OkJAgGu5yzDcGqDFvAY3sb6zStHy3sol--_5Qs12y6gDtoX1G1RsLjG74WAlP9YhWlmrQBCWqoh5-NwM2SgimUYr_F_pf9YcZ96sUvtsPR0ibBzcQW8olidIBRDlqstg4jlDbNxNnnzNzjYuXVjQqqZS4spiZZBQ38-B85ToWEpUhMTlZyqz29gbvgGoj8Sqwbu7E2dMEcXcyhCR5-CewmkzHVCIA2sJoQ","userId":{"$oid":"65dce6ec3aad65db95a47af7"}}


*/
import mongoose from "mongoose";
const { Schema } = mongoose;

const AccountSchema = new Schema({}, { strict: false });

export default mongoose.models?.Account ??
  mongoose.model("Account", AccountSchema);