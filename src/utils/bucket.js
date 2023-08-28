// const axios = require("axios");
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const bucket = {
  client: null,
  setClient(apiKey, apiSecret) {
    this.client = new S3({
      endpoint: 'https://endpoint.4everland.co',
      region: 'eu-west-2',
      credentials: {
        accessKeyId: apiKey,
        secretAccessKey: apiSecret
      }
    })
  },
  checkClient() {
    if (!this.client) throw new Error('Please login first')
  },
  uploadFile(params, opts = {}) {
    const task = new Upload({
      client: this.client,
      queueSize: 3,
      params
    })
    task.on('httpUploadProgress', (e) => {
      e.perc = ((e.loaded / e.total) * 100) | 0
      // console.log(e.perc);
      const fn = opts.onProgress
      fn && fn(e)
    })
    return task.done()
  },
  getPathInfo(name) {
    const mat = /^([^\/]+)(\/.+)?/.exec(name)
    if (!mat) throw new Error('illegal Bucket path')
    const Bucket = mat[1]
    const Prefix = (mat[2] || '').replace('/', '')
    return {
      Bucket,
      Prefix
    }
  },
  async listBuckets() {
    const res = await this.client.listBuckets({})
    // console.log(res.Buckets); // [{Name, CreationDate}]
    return res.Buckets
  },
  async listObjects(params) {
    const res = await this.client.listObjectsV2({
      Delimiter: '/',
      MaxKeys: 30,
      ...params
    })
    // console.log(res);
    return res
  }
}

export default bucket

// bucket.listBuckets();
