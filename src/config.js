import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint("https://linode.georgeisiguzo.xyz/v1") // Your API Endpoint Ip "http://188.166.110.93/v1"
  .setProject("62ad8f1b61a1aa4ac561"); // Your project ID

const collectionId = "6271702a3a066954ffc0";
const questionsCollectionId = "6271720fe9ea03bc27be";
const bucketId = "6276bc698382d791a207";

export { sdk, collectionId, questionsCollectionId, bucketId };
