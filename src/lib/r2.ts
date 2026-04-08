import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.CF_BUCKET_NAME || 'folhetos';

export async function getJsonFromR2(key: string): Promise<Record<string, unknown> | null> {
  try {
    const response = await r2.send(new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }));
    const body = await response.Body?.transformToString();
    return body ? JSON.parse(body) : null;
  } catch {
    return null;
  }
}

export async function putJsonToR2(key: string, data: Record<string, unknown>): Promise<void> {
  await r2.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: JSON.stringify(data, null, 2),
    ContentType: 'application/json',
  }));
}

export { r2, BUCKET };
