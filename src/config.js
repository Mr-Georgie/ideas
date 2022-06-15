import { Appwrite } from "appwrite";

/**
 * Digital ocean config
 */

const sdk = new Appwrite()

sdk
   .setEndpoint("https://appwrite.georgeisiguzo.xyz/v1") // Your API Endpoint Ip "http://188.166.110.93/v1"
   .setProject('6271a55fc848d4a07753') // Your project ID
;

const collectionId = "6271702a3a066954ffc0"
const questionsCollectionId = "6271720fe9ea03bc27be"
// const old_spacesCollectionId = "627172b4e8854a25d653"
const bucketId = "6276bc698382d791a207"

export { sdk, collectionId, questionsCollectionId, bucketId }





/**
 * Gitpod config
 * 
 * sdk
    .setEndpoint("http://8080-appwrite-integrationfor-ghw26ygqb0r.ws-eu43.gitpod.io/v1") // Your API Endpoint
    .setProject('626cf93661b59bdb8f3b') // Your project ID
    ;
 * 
 *  const collectionId = "626cf9c5709e1b288e1e"
    const questionsCollectionId = "626fdd0c71c45daab351"

    export { sdk, collectionId, questionsCollectionId }
 * 
 */