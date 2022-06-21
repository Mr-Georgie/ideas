import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint("https://linode.georgeisiguzo.xyz/v1") // Your API Endpoint Ip "http://188.166.110.93/v1"
  .setProject("62ad8f1b61a1aa4ac561"); // Your project ID

// const collectionId = "6271702a3a066954ffc0";
const userInfoId = "62b1e0136da3ecdebc65";
const bucketId = "62b1eccbb93aa0ff7f94";

export { sdk, userInfoId, bucketId };
