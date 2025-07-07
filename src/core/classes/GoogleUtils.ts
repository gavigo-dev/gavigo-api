import { google, drive_v3 } from 'googleapis'
import { GoogleAuth, JWT } from 'google-auth-library'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

export class GoogleUtils {
    private static _auth: GoogleAuth | null = null

    private static get credentialsJSON(): any {
        const base64 = process.env.GOOGLE_CREDENTIALS_BASE64
        if (!base64) throw new Error('Missing GOOGLE_CREDENTIALS_BASE64')
        return JSON.parse(Buffer.from(base64, 'base64').toString())
    }

    static get auth(): GoogleAuth {
        if (!this._auth) {
            this._auth = new google.auth.GoogleAuth({
                credentials: this.credentialsJSON,
                scopes: ['https://www.googleapis.com/auth/drive']
            })
        }
        return this._auth
    }

    static Drive = class {
        private static _drive: drive_v3.Drive | null = null

        private static async getDrive(): Promise<drive_v3.Drive> {
            if (!this._drive) {
                const authClient =
                    (await GoogleUtils.auth.getClient()) as unknown as GoogleAuth
                this._drive = google.drive({ version: 'v3', auth: authClient })
            }
            return this._drive
        }

        static async upload(
            filePath: string,
            fileName: string,
            mimeType: string,
            folderId?: string
        ): Promise<{
            fileId: string
            name: string
            webViewLink: string
            webContentLink: string
        }> {
            const drive = await this.getDrive()

            const metadata: drive_v3.Schema$File = { name: fileName }
            if (folderId) metadata.parents = [folderId]

            const media = {
                mimeType,
                body: fs.createReadStream(filePath)
            }

            const res = await drive.files.create({
                requestBody: metadata,
                media,
                fields: 'id, name'
            })

            const fileId = res.data.id!
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })

            const { data } = await drive.files.get({
                fileId,
                fields: 'webViewLink, webContentLink'
            })

            return {
                fileId,
                name: res.data.name!,
                webViewLink: data.webViewLink!,
                webContentLink: data.webContentLink!
            }
        }

        static async list(folderId?: string): Promise<drive_v3.Schema$File[]> {
            const drive = await this.getDrive()
            const q = folderId ? `'${folderId}' in parents` : undefined

            const res = await drive.files.list({
                q,
                pageSize: 100,
                fields: 'files(id, name, mimeType, webViewLink, webContentLink)'
            })

            return res.data.files || []
        }

        static async download(
            fileId: string,
            destination: string
        ): Promise<string> {
            const drive = await this.getDrive()
            const dest = fs.createWriteStream(destination)

            const res = await drive.files.get(
                { fileId, alt: 'media' },
                { responseType: 'stream' }
            )

            return new Promise((resolve, reject) => {
                res.data
                    .on('end', () => resolve(destination))
                    .on('error', reject)
                    .pipe(dest)
            })
        }

        static async remove(fileId: string): Promise<void> {
            const drive = await this.getDrive()
            await drive.files.delete({ fileId })
        }
    }
}
