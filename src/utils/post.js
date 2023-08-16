const metadata = {
  // valid metadata
}

// upload metadata to ipfs or arweave - upload is your custom function that returns contentURI
const contentURI = await upload(metadata)

// create a post via dispatcher, you need to have the dispatcher enabled for the profile
const viaDispatcherResult = await lensClient.publication.createPostViaDispatcher({
  profileId,
  contentURI,
  collectModule: {
    revertCollectModule: true // collect disabled
  },
  referenceModule: {
    followerOnlyReferenceModule: false // anybody can comment or mirror
  }
})

// or with typedData that require signature and broadcasting
const typedDataResult = await lensClient.publication.createPostTypedData({
  profileId,
  contentURI,
  collectModule: {
    revertCollectModule: true // collect disabled
  },
  referenceModule: {
    followerOnlyReferenceModule: false // anybody can comment or mirror
  }
})

// sign and broadcast
