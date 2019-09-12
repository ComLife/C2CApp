/**
 * S3Policy
 */
import CryptoJS from 'crypto-js';
const Buffer = global.Buffer || require('buffer').Buffer;
import { dateToString } from './DateUtils';

const FIVE_MINUTES = 5 * (60 * 1000);

const AWS_ACL = 'public-read';
const AWS_SERVICE_NAME = 's3';
const AWS_REQUEST_POLICY_VERSION = 'aws4_request';
const AWS_ALGORITHM = 'AWS4-HMAC-SHA256';

const DEFAULT_SUCCESS_ACTION_STATUS = '201';
//@ts-ignore
const assert = (object, message) => {
  if (object == null) throw new Error(message);
};

//@ts-ignore
const formatPolicyForRequestBody = (base64EncodedPolicy, signature, options) => ({
  key: options.key,
  acl: options.acl,
  // eslint-disable-next-line @typescript-eslint/camelcase
  success_action_status: options.successActionStatus,
  'Content-Type': options.contentType,
  'X-Amz-Credential': options.credential,
  'X-Amz-Algorithm': options.algorithm,
  'X-Amz-Date': options.amzDate,
  Policy: base64EncodedPolicy,
  'X-Amz-Signature': signature,
});
//@ts-ignore
const formatPolicyForEncoding = policy => ({
  expiration: policy.expirationDate,
  conditions: [
    { bucket: policy.bucket },
    { key: policy.key },
    { acl: policy.acl },
    // eslint-disable-next-line @typescript-eslint/camelcase
    { success_action_status: policy.successActionStatus },
    { 'Content-Type': policy.contentType },
    { 'x-amz-credential': policy.credential },
    { 'x-amz-algorithm': policy.algorithm },
    { 'x-amz-date': policy.amzDate },
  ],
});
//@ts-ignore
const getSignatureKey = options => {
  const kDate = CryptoJS.HmacSHA256(options.yyyymmddDate, `AWS4${options.secretKey}`);
  const kRegion = CryptoJS.HmacSHA256(options.region, kDate);
  const kService = CryptoJS.HmacSHA256(AWS_SERVICE_NAME, kRegion);
  const kSigning = CryptoJS.HmacSHA256(AWS_REQUEST_POLICY_VERSION, kService);

  return kSigning;
};
//@ts-ignore
const getEncodedPolicy = policy => Buffer.from(JSON.stringify(policy), 'utf-8').toString('base64');
//@ts-ignore
const getSignature = (base64EncodedPolicy, options) => CryptoJS.HmacSHA256(base64EncodedPolicy, getSignatureKey(options)).toString(CryptoJS.enc.Hex);

export class S3Policy {
  //@ts-ignore
  static generate(options) {
    options || (options = {});

    assert(options.key, 'Must provide `key` option with the object key');
    assert(options.bucket, 'Must provide `bucket` option with your AWS bucket name');
    assert(options.contentType, 'Must provide `contentType` option with the object content type');
    assert(options.region, 'Must provide `region` option with your AWS region');
    assert(options.date, 'Must provide `date` option with the current date');
    assert(options.accessKey, 'Must provide `accessKey` option with your AWSAccessKeyId');
    assert(options.secretKey, 'Must provide `secretKey` option with your AWSSecretKey');

    const { date } = options;
    const timeDelta = options.timeDelta || 0;
    const policyExpiresIn = FIVE_MINUTES - timeDelta;
    const expirationDate = new Date(date.getTime() + policyExpiresIn);

    const policyParams = {
      ...options,
      acl: options.acl || AWS_ACL,
      algorithm: AWS_ALGORITHM,
      amzDate: dateToString(date, 'amz-iso8601'),
      yyyymmddDate: dateToString(date, 'yyyymmdd'),
      expirationDate: dateToString(expirationDate, 'iso8601'),
      successActionStatus: String(options.successActionStatus || DEFAULT_SUCCESS_ACTION_STATUS),
    };

    policyParams.credential = [policyParams.accessKey, policyParams.yyyymmddDate, policyParams.region, AWS_SERVICE_NAME, AWS_REQUEST_POLICY_VERSION].join('/');
    //@ts-ignore
    const policy = formatPolicyForEncoding(policyParams);
    //@ts-ignore
    const base64EncodedPolicy = getEncodedPolicy(policy);
    //@ts-ignore
    const signature = getSignature(base64EncodedPolicy, policyParams);
    //@ts-ignore
    return formatPolicyForRequestBody(base64EncodedPolicy, signature, policyParams);
  }
}
